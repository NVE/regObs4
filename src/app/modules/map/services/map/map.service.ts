import { Injectable } from '@angular/core';
import { nSQL } from 'nano-sql';
import * as L from 'leaflet';
import { IMapView } from './map-view.interface';
import { Observable, combineLatest, Observer } from 'rxjs';
import { createWorker } from 'typed-web-workers';
import { switchMap, shareReplay, debounceTime, filter } from 'rxjs/operators';
import { IMapViewAndArea } from './map-view-and-area.interface';
import { IMapViewArea } from './map-view-area.interface';
import { NanoSql } from '../../../../../nanosql';
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
  private _mapViewObservable: Observable<IMapView>;
  private _mapViewAndAreaObservable: Observable<IMapViewAndArea>;
  private _avalancheRegions: any;
  private _regions: any;
  private _tilesInNorwayCache: LRUMap<string, boolean>;

  get mapViewObservable$() {
    return this._mapViewObservable;
  }

  get mapViewAndAreaObservable$() {
    return this._mapViewAndAreaObservable;
  }

  constructor(private userSettingService: UserSettingService) {
    this._mapViewObservable = this.getMapViewObservable();
    this._mapViewAndAreaObservable = this.getMapViewAreaObservable();
    this._tilesInNorwayCache = new LRUMap(10000);
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
    const boundsArray = [
      [mapView.bounds.getSouthWest().lat, mapView.bounds.getSouthWest().lng],
      [mapView.bounds.getNorthEast().lat, mapView.bounds.getNorthEast().lng]
    ];
    if (boundsArray[0][0] !== boundsArray[1][0] && boundsArray[0][1] !== boundsArray[1][1]) {
      console.log('[MapService] Update map view', mapView);
      return nSQL(NanoSql.TABLES.MAP_SERVICE.name)
        .query('upsert', {
          id: 'lastupdate',
          bounds: boundsArray,
          center: [mapView.center.lat, mapView.center.lng],
          zoom: mapView.zoom,
        }).exec();
    } else {
      console.log('[MapService] SouthWest and NorthEast is the same, do not update...', mapView);
    }
  }

  private getMapViewObservable() {
    return nSQL().observable<IMapView>(() => {
      return nSQL(NanoSql.TABLES.MAP_SERVICE.name).query('select').emit();
    }).map((result) => {
      const firstItem: {
        id: string,
        bounds: L.LatLngExpression[],
        center: L.LatLngExpression,
        zoom: number
      } = result[0];
      if (firstItem && firstItem.bounds && firstItem.center) {
        const mapView: IMapView = {
          bounds: L.latLngBounds(firstItem.bounds),
          center: L.latLng(firstItem.center),
          zoom: firstItem.zoom
        };
        return mapView;
      } else {
        return null;
      }
    }).debounce(50).toRxJS().pipe(shareReplay(1));
  }

  private getMapViewAreaObservable() {
    return combineLatest(this.mapViewObservable$.pipe(
      filter((x) => x !== null), debounceTime(200)),
      this.userSettingService.currentGeoHazardObservable$)
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
    const start = new Date();
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
    const runtime = new Date().getTime() - start.getTime();
    console.log(`[INFO][MapService] - Calculate regions took ${runtime} milliseconds`, result);
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
    console.log('getRegionInViewObservable', mapView, geoHazards);
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
