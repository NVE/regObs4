import { Injectable } from '@angular/core';
import { nSQL } from 'nano-sql';
import * as L from 'leaflet';
import { MapView } from './map-view.model';
import { NanoSql } from '../../../../nanosql';
import { Observable, combineLatest } from 'rxjs';
import { ITypedWorker, createWorker } from 'typed-web-workers';
import { Feature } from 'geojson';
import { Point } from '@turf/turf';
import { UserSetting } from '../../models/user-settings.model';
import { MapViewArea } from './map-view-area.model';
import { GeoHazard } from '../../models/geo-hazard.enum';
import { UserSettingService } from '../user-setting/user-setting.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private userSettingService: UserSettingService) { }

  updateMapView(mapView: MapView) {
    const boundsArray = [
      [mapView.bounds.getSouthWest().lat, mapView.bounds.getSouthWest().lng],
      [mapView.bounds.getNorthEast().lat, mapView.bounds.getNorthEast().lng]
    ];
    console.log('[MapService] Update map view', mapView);
    return nSQL(NanoSql.TABLES.MAP_SERVICE.name)
      .query('upsert', { id: 'lastupdate', bounds: boundsArray, center: [mapView.center.lat, mapView.center.lng] })
      .exec();
  }

  getMapViewObservable() {
    return nSQL().observable<MapView>(() => {
      return nSQL(NanoSql.TABLES.MAP_SERVICE.name).query('select').emit();
    }).map((result) => {
      const firstItem: { id: string, bounds: L.LatLngExpression[], center: L.LatLngExpression } = result[0];
      return { bounds: L.latLngBounds(firstItem.bounds), center: L.latLng(firstItem.center) };
    }).debounce(500).toRxJS();
  }

  getMapViewAreaObservable() {
    return combineLatest(this.getMapViewObservable(), this.userSettingService.getUserSettingsAsObservable())
      .pipe(
        switchMap(([mapView, userSetting]) =>
          this.getRegionInViewObservable(mapView, userSetting.currentGeoHazard))
      );
  }

  private workFunc(input: { url: string, mapView: MapView, geoHazard: GeoHazard },
    callback: (_: MapViewArea) => void) {
    (<any>self).importScripts(`${input.url}/turf/turf.min.js`);
    (<any>self).importScripts(`${input.url}/assets/countygeojson.js`);

    const featureInCenter = (<any>self).countyGeoJSON.features.find((f) => {
      return (<any>self).turf.inside([input.mapView.center.lng, input.mapView.center.lat], f.geometry);
    });
    const regionInCenter = featureInCenter ? featureInCenter.properties.fylkesnummer : null;
    callback(Object.assign({}, input.mapView, { regionInCenter, regionsInViewBounds: [] }));
  }

  getRegionInViewObservable(mapView: MapView, geoHazard: GeoHazard): Observable<MapViewArea> {
    return Observable.create((observer) => {
      const typedWorker: ITypedWorker<{ url: string, mapView: MapView }, MapViewArea>
        = createWorker(this.workFunc, (msg) => {
          observer.next(msg);
          observer.complete();
        });
      typedWorker.postMessage({ url: document.location.protocol + '//' + document.location.host, mapView });
    });
  }
}
