import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { IMapView } from './map-view.interface';
import { Observable, combineLatest, Observer, BehaviorSubject, Subject } from 'rxjs';
import { createWorker } from 'typed-web-workers';
import { switchMap, shareReplay, debounceTime, filter, distinctUntilChanged } from 'rxjs/operators';
import { IMapViewAndArea } from './map-view-and-area.interface';
import { IMapViewArea } from './map-view-area.interface';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';
import { LRUMap } from 'lru_map';
import { BorderHelper } from '../../../../core/helpers/leaflet/border-helper';
import { settings } from '../../../../../settings';
import { Feature, Polygon } from '@turf/turf';

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

  get mapView$() {
    return this._mapView$;
  }

  get mapViewAndAreaObservable$() {
    return this._mapViewAndAreaObservable;
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

  constructor(private userSettingService: UserSettingService) {
    this._tilesInNorwayCache = new LRUMap(10000);
    this._followModeSubject = new BehaviorSubject<boolean>(true);
    this._followModeObservable = this._followModeSubject.asObservable().pipe(distinctUntilChanged(), shareReplay(1));
    this._centerMapToUserSubject = new Subject<void>();
    this._centerMapToUserObservable = this._centerMapToUserSubject.asObservable().pipe(shareReplay(1));
    this._mapViewSubject = new BehaviorSubject<IMapView>(null);
    this._mapView$ = this._mapViewSubject.asObservable().pipe(debounceTime(200), shareReplay(1));
    this._mapViewAndAreaObservable = this.getMapViewAreaObservable();
  }

  centerMapToUser() {
    this.followMode = true;
    this._centerMapToUserSubject.next();
  }

  async isTileInsideNorway(coords: { x: number, y: number, z: number }, bounds: L.LatLngBounds) {
    const id = `${coords.z}_${coords.x}_${coords.y}`;
    const inCahce = this._tilesInNorwayCache.get(id);
    if (inCahce !== undefined) {
      return inCahce;
    } else {
      const inNorway = await BorderHelper.isBoundsInNorway(bounds);
      this._tilesInNorwayCache.set(id, inNorway);
      return inNorway;
    }
  }

  updateMapView(mapView: IMapView) {
    this._mapViewSubject.next(mapView);
  }

  private getMapViewAreaObservable() {
    return combineLatest(this.mapView$.pipe(filter((val) => val !== null)), this.userSettingService.currentGeoHazardObservable$)
      .pipe(
        switchMap(([mapView, currentGeoHazard]) =>
          this.getRegionInViewObservable(mapView, currentGeoHazard)),
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
