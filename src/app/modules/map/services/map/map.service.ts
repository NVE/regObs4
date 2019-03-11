import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { IMapView } from './map-view.interface';
import { Observable, combineLatest, Observer, BehaviorSubject, Subject, from, of } from 'rxjs';
import { createWorker } from 'typed-web-workers';
import {
  switchMap,
  shareReplay,
  debounceTime,
  distinctUntilChanged,
  tap,
  pairwise,
  map,
  bufferWhen,
  scan,
  skipWhile,
  take,
} from 'rxjs/operators';
import { IMapViewAndArea } from './map-view-and-area.interface';
import { IMapViewArea } from './map-view-area.interface';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';
import { LRUMap } from 'lru_map';
import { BorderHelper } from '../../../../core/helpers/leaflet/border-helper';
import { settings } from '../../../../../settings';
import { Feature, Polygon } from '@turf/turf';
import { LoggingService } from '../../../shared/services/logging/logging.service';

const DEBUG_TAG = 'MapService';

export const NORWEGIAN_BORDER = L.geoJSON(require('../../../../../assets/json/norway-borders.json')).getBounds();

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private _mapViewAndAreaObservable: Observable<IMapViewAndArea>;
  private _avalancheRegions: any;
  private _regions: any;
  private _tilesInNorwayCache: LRUMap<string, boolean>;
  private _followModeSubject: BehaviorSubject<boolean>;
  private _followModeObservable: Observable<boolean>;
  private _centerMapToUserSubject: Subject<void>;
  private _centerMapToUserObservable: Observable<void>;
  private _mapViewSubject: Subject<IMapView>;
  private _mapView$: Observable<IMapView>;
  private _relevantMapChange$: Observable<IMapView>;

  get mapView$() {
    return this._mapView$;
  }

  get mapViewAndAreaObservable$() {
    return this._mapViewAndAreaObservable;
  }

  get relevantMapChange$() {
    return this._relevantMapChange$;
  }

  get followMode$() {
    return this._followModeObservable;
  }

  get centerMapToUser$() {
    return this._centerMapToUserObservable;
  }

  set followMode(val: boolean) {
    this._followModeSubject.next(val);
  }

  constructor(private userSettingService: UserSettingService, private loggingService: LoggingService) {
    this._tilesInNorwayCache = new LRUMap(10000);
    this._followModeSubject = new BehaviorSubject<boolean>(true);
    this._followModeObservable = this._followModeSubject.asObservable().pipe(distinctUntilChanged(), shareReplay(1));
    this._centerMapToUserSubject = new Subject<void>();
    this._centerMapToUserObservable = this._centerMapToUserSubject.asObservable().pipe(shareReplay(1));
    this._mapViewSubject = new BehaviorSubject<IMapView>(null);
    this._mapView$ = this._mapViewSubject.asObservable().pipe(
      debounceTime(200),
      tap((val) => this.loggingService.debug('MapView updated', DEBUG_TAG, val)),
      shareReplay(1));
    this._relevantMapChange$ = this.getMapViewThatHasRelevantChange();
    this._mapViewAndAreaObservable = this.getMapViewAreaObservable();
  }

  centerMapToUser() {
    this.followMode = true;
    this._centerMapToUserSubject.next();
  }

  private isInNorwayCached(coords: { x: number, y: number, z: number }, isParent: boolean) {
    if (coords.z < 1) {
      return undefined;
    }
    const id = this.getCacheId(coords);
    const inNorway = this._tilesInNorwayCache.get(id);
    if (inNorway === undefined) {
      const z = coords.z - 1;
      const x = Math.floor(coords.x / 2);
      const y = Math.floor(coords.y / 2);
      return this.isInNorwayCached({ x, y, z }, true);
    }
    if (isParent) {
      // Do not return false for parent, bacause child is only in norway
      // if parent is in Norway, but parent can be outside border of border when child is not.
      return inNorway === true ? true : undefined;
    }
    return inNorway;
  }

  private getCacheId(coords: { x: number, y: number, z: number }) {
    return `${coords.z}_${coords.x}_${coords.y}`;
  }

  async isTileInsideNorway(coords: { x: number, y: number, z: number }, bounds: L.LatLngBounds) {
    let inNorway = this.isInNorwayCached(coords, false);
    if (inNorway === undefined) {
      inNorway = await BorderHelper.isBoundsInNorway(bounds);
    }
    this._tilesInNorwayCache.set(this.getCacheId(coords), inNorway);
    return inNorway;
  }

  updateMapView(mapView: IMapView) {
    if (mapView) {
      this._mapViewSubject.next(mapView);
    }
  }

  private getMapMetersChanged() {
    return this.mapView$.pipe(
      pairwise(),
      map(([prev, next]) => {
        if (!prev) {
          return 9999;
        }
        return prev.center.distanceTo(next.center);
      }),
      scan((acc, val) => acc + val, 0));
  }


  private triggerWhenMetersReached(metersBuffer: number = 10) {
    return this.getMapMetersChanged()
      .pipe(skipWhile((val) => {
        return val < metersBuffer;
      }));
  }

  private getMapViewThatHasRelevantChange(metersBuffer: number = 10) {
    return this.mapView$.pipe(
      bufferWhen(() => this.triggerWhenMetersReached(metersBuffer)),
      switchMap((buffer) => (buffer.length > 0 && !!buffer[buffer.length - 1]) ?
        of(buffer[buffer.length - 1]) : this.mapView$.pipe(take(1))),
      tap((val) => this.loggingService.debug('MapView has relevant change!', DEBUG_TAG, val)),
      shareReplay(1),
    );
  }

  private getMapViewAreaObservable() {
    return combineLatest(
      this.relevantMapChange$,
      this.userSettingService.currentGeoHazardObservable$)
      .pipe(
        switchMap(([mapView, currentGeoHazard]) =>
          this.getRegionInViewObservable(mapView, currentGeoHazard)),
        tap((val) => this.loggingService.debug('MapViewArea changed', DEBUG_TAG, val)),
        shareReplay(1)
      );
  }

  // NOTE! This code is running as a web worker and cannot have external dependencies!
  private workFunc(input: {
    url: string,
    featureGeoJson: GeoJSON.FeatureCollection<Polygon>,
    featureName: string,
    center: [number, number],
    bbox: [number, number, number, number]
  },
    callback: (_: IMapViewArea) => void) {
    const that = <any>self;
    // const start = new Date();
    that.importScripts(`${input.url}/turf/turf.min.js`);
    const currentViewAsPolygon: Feature<Polygon> = that.turf.bboxPolygon(input.bbox);

    const isInsideOrIntersects = function (firstGeometry: Polygon, secondGeometry: Polygon): boolean {
      return that.turf.intersect(firstGeometry, secondGeometry) ||
        that.turf.booleanContains(firstGeometry, secondGeometry) ||
        that.turf.booleanContains(secondGeometry, firstGeometry);
    };

    // Geojosn features that is inide or intersects with current view bounds
    const featuresInViewBounds = input.featureGeoJson.features.filter((f) =>
      isInsideOrIntersects(f.geometry, currentViewAsPolygon.geometry));
    const regionsInViewBounds: string[] = featuresInViewBounds
      .map((f) => f.properties[input.featureName].toString());

    // Region that center view point is inside
    const featureInCenter = featuresInViewBounds.find((f) => {
      return that.turf.inside(input.center, f.geometry);
    });
    const regionInCenter: string = featureInCenter ? featureInCenter.properties[input.featureName].toString() : null;

    // Geojson features that intersects or is inside a buffer of 150 km
    const buffer: Feature<Polygon> = that.turf.buffer(that.turf.point(input.center), 150, { units: 'kilometers' });
    const regionsInViewBuffer: string[] = input.featureGeoJson.features.filter((f) =>
      isInsideOrIntersects(f.geometry, buffer.geometry))
      .map((f) => f.properties[input.featureName].toString());

    const result: IMapViewArea = { regionInCenter, regionsInViewBounds, regionsInViewBuffer };
    // const runtime = new Date().getTime() - start.getTime();
    // console.log(`[INFO][MapService] - Calculate regions took ${runtime} milliseconds`, result);
    callback(result);
  }

  // Loading regions in memory
  private loadReagions(geoHazards: GeoHazard[]) {
    if (geoHazards[0] === GeoHazard.Snow) {
      if (!this._avalancheRegions) {
        this._avalancheRegions = require('../../../../../assets/json/varslingsomraader.json');
      }
    } else {
      if (!this._regions) {
        this._regions = require('../../../../../assets/json/regions-simple-polygons.json');
      }
    }
  }

  private getRegionInViewObservable(mapView: IMapView, geoHazards: GeoHazard[]): Observable<IMapViewAndArea> {
    this.loadReagions(geoHazards);
    const regions = (geoHazards[0] === GeoHazard.Snow ? this._avalancheRegions
      : this._regions);
    const featureName = geoHazards[0] === GeoHazard.Snow ?
      settings.services.warning.Snow.featureName : settings.services.warning.Dirt.featureName;

    return Observable.create((observer: Observer<IMapViewAndArea>) => {
      const typedWorker = createWorker(this.workFunc, (msg) => {
        observer.next({ ...mapView, ...msg });
        observer.complete();
      });
      typedWorker.postMessage(
        {
          url: document.location.protocol + '//' + document.location.host,
          featureGeoJson: regions,
          featureName,
          center: [mapView.center.lng, mapView.center.lat],
          bbox: [
            mapView.bounds.getSouthWest().lng, // minx
            mapView.bounds.getSouthWest().lat, // miny
            mapView.bounds.getNorthEast().lng, // maxx
            mapView.bounds.getNorthEast().lat, // maxy
          ],
        });

      return () => typedWorker ? typedWorker.terminate() : null;
    });
  }
}
