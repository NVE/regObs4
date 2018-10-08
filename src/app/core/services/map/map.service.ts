import { Injectable } from '@angular/core';
import { nSQL } from 'nano-sql';
import * as L from 'leaflet';
import { IMapView } from './map-view.interface';
import { NanoSql } from '../../../../nanosql';
import { Observable, combineLatest, Observer } from 'rxjs';
import { ITypedWorker, createWorker } from 'typed-web-workers';
import { GeoHazard } from '../../models/geo-hazard.enum';
import { UserSettingService } from '../user-setting/user-setting.service';
import { switchMap, share, shareReplay, debounce, debounceTime } from 'rxjs/operators';
import { IMapViewAndArea } from './map-view-and-area.interface';
import { IMapViewArea } from './map-view-area.interface';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private _mapViewObservable: Observable<IMapView>;
  private _mapViewAndAreaObservable: Observable<IMapViewAndArea>;

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
    featureGeoJson: string,
    featureName: string,
    center: [number, number],
    bbox: [number, number, number, number]
  },
    callback: (_: IMapViewArea) => void) {
    const that = <any>self;
    const start = new Date();
    that.importScripts(`${input.url}/turf/turf.min.js`);
    that.importScripts(`${input.url}${input.featureGeoJson}`);
    const currentViewAsPolygon = that.turf.bboxPolygon(input.bbox);
    const featuresInViewBounds = that.regions.features.filter((f) => {
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
    callback({ regionInCenter, regionsInViewBounds });
    const runtime = new Date().getTime() - start.getTime();
    console.log(`[INFO][MapService] - Calculate regions took ${runtime} milliseconds`);
    that.close();
  }

  private getRegionInViewObservable(mapView: IMapView, geoHazard: GeoHazard): Observable<IMapViewAndArea> {
    console.log('getRegionInViewObservable', mapView, geoHazard);
    return Observable.create((observer: Observer<IMapViewAndArea>) => {
      const typedWorker = createWorker(this.workFunc, (msg) => {
        observer.next({ ...mapView, ...msg });
        observer.complete();
      });
      typedWorker.postMessage(
        {
          url: document.location.protocol + '//' + document.location.host,
          featureGeoJson: (geoHazard === GeoHazard.Snow ? '/assets/avalancheregions.js'
            : '/assets/countygeojson.js'),
          featureName: geoHazard === GeoHazard.Snow ? 'OMRAADEID' : 'fylkesnummer',
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
