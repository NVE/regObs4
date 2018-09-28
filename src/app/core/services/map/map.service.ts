import { Injectable } from '@angular/core';
import { nSQL } from 'nano-sql';
import * as L from 'leaflet';
import { MapView } from './map-view.model';
import { NanoSql } from '../../../../nanosql';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() { }

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
}
