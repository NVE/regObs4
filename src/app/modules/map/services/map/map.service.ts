import { Injectable } from '@angular/core';
import { nSQL } from 'nano-sql';
import * as L from 'leaflet';
import { IMapView } from './map-view.interface';
import { Observable, combineLatest, Observer } from 'rxjs';
import { ITypedWorker, createWorker } from 'typed-web-workers';
import { switchMap, share, shareReplay, debounce, debounceTime } from 'rxjs/operators';
import { IMapViewAndArea } from './map-view-and-area.interface';
import { IMapViewArea } from './map-view-area.interface';
import { NanoSql } from '../../../../../nanosql';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private _mapViewObservable: Observable<IMapView>;
  private _mapViewAndAreaObservable: Observable<IMapViewAndArea>;
  private _avalancheRegions: any;
  private _regions: any;

  get mapViewObservable$() {
    return this._mapViewObservable;
  }

  get mapViewAndAreaObservable$() {
    return this._mapViewAndAreaObservable;
  }

  constructor(private userSettingService: UserSettingService) {
    this._mapViewObservable = this.getMapViewObservable();
    this._mapViewAndAreaObservable = this.getMapViewAreaObservable();
  }

  updateMapView(mapView: IMapView) {
    const boundsArray = [
      [mapView.bounds.getSouthWest().lat, mapView.bounds.getSouthWest().lng],
      [mapView.bounds.getNorthEast().lat, mapView.bounds.getNorthEast().lng]
    ];
    console.log('[MapService] Update map view', mapView);
    return nSQL(NanoSql.TABLES.MAP_SERVICE.name)
      .query('upsert', { id: 'lastupdate', bounds: boundsArray, center: [mapView.center.lat, mapView.center.lng] })
      .exec();
  }

  private getMapViewObservable() {
    return nSQL().observable<IMapView>(() => {
      return nSQL(NanoSql.TABLES.MAP_SERVICE.name).query('select').emit();
    }).map((result) => {
      const firstItem: { id: string, bounds: L.LatLngExpression[], center: L.LatLngExpression } = result[0];
      return { bounds: L.latLngBounds(firstItem.bounds), center: L.latLng(firstItem.center) };
    }).debounce(50).toRxJS().pipe(shareReplay(1));
  }

  private getMapViewAreaObservable() {
    return combineLatest(this.mapViewObservable$, this.userSettingService.userSettingObservable$)
      .pipe(
        switchMap(([mapView, userSetting]) =>
          this.getRegionInViewObservable(mapView, userSetting.currentGeoHazard)),
        shareReplay(1)
      );
  }

  // NOTE! This code is running as a web worker!
  private workFunc(input: {
    url: string,
    featureGeoJson: any,
    featureName: string,
    center: [number, number],
    bbox: [number, number, number, number]
  },
    callback: (_: IMapViewArea) => void) {
    const that = <any>self;
    const start = new Date();
    that.importScripts(`${input.url}/turf/turf.min.js`);
    // that.importScripts(`${input.url}${input.featureGeoJson}`);
    const currentViewAsPolygon = that.turf.bboxPolygon(input.bbox);
    const featuresInViewBounds = input.featureGeoJson.features.filter((f) => {
      return that.turf.intersect(f.geometry, currentViewAsPolygon.geometry) ||
        that.turf.booleanContains(f.geometry, currentViewAsPolygon.geometry) ||
        that.turf.booleanContains(currentViewAsPolygon.geometry, f.geometry);
    });
    const featureInCenter = featuresInViewBounds.find((f) => {
      return that.turf.inside(input.center, f.geometry);
    });
    const regionsInViewBounds = featuresInViewBounds
      .map((f) => f.properties[input.featureName].toString());
    const regionInCenter = featureInCenter ? featureInCenter.properties[input.featureName].toString() : null;
    const runtime = new Date().getTime() - start.getTime();
    console.log(`[INFO][MapService] - Calculate regions took ${runtime} milliseconds`);
    callback({ regionInCenter, regionsInViewBounds });
    // that.close();
  }

  // Loading regions in memory
  private loadReagions(geoHazard: GeoHazard) {
    if (geoHazard === GeoHazard.Snow) {
      if (!this._avalancheRegions) {
        this._avalancheRegions = require('../../../../../assets/varslingsomraader.json'); // TODO: Add to settings
      }
    } else {
      if (!this._regions) {
        this._regions = require('../../../../../assets/regions-simple.json'); // TODO: Add to settings
      }
    }
  }

  private getRegionInViewObservable(mapView: IMapView, geoHazard: GeoHazard): Observable<IMapViewAndArea> {
    console.log('getRegionInViewObservable', mapView, geoHazard);
    this.loadReagions(geoHazard);
    const regions = (geoHazard === GeoHazard.Snow ? this._avalancheRegions
      : this._regions);
    const featureName = geoHazard === GeoHazard.Snow ? 'OMRAADEID' : 'fylkesnummer'; // TODO: Add to settings

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
