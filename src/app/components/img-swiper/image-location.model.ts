import * as L from 'leaflet';
import { GeoHazard } from 'src/app/modules/common-core/models';

export interface ImageLocation {
  latLng: L.LatLng;
  geoHazard: GeoHazard;
  startStopLocation?: ImageLocationStartStop;
  damageLocations?: Array<L.LatLng>;
}

export interface ImageLocationStartStop {
  start?: L.LatLng;
  stop?: L.LatLng;
  totalPolygon?: L.Polygon;
  startPolygon?: L.Polygon;
  endPolygon?: L.Polygon;
}
