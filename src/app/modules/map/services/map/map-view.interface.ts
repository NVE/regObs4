import * as L from 'leaflet';

export interface IMapView {
  bounds: L.LatLngBounds;
  center: L.LatLng;
  zoom: number;
}
