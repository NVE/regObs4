import * as L from 'leaflet';

export interface MapView {
    bounds: L.LatLngBounds;
    center: L.LatLng;
}
