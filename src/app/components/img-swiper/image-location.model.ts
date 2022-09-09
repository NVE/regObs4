import { GeoHazard } from 'src/app/modules/common-core/models';
import * as L from 'leaflet';

export interface ImageLocation {
  latLng: L.LatLng;
  geoHazard: GeoHazard;
  startStopLocation?: { start?: L.LatLng; stop?: L.LatLng };
  damageLocations?: Array<L.LatLng>;
}
