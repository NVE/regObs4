import { GeoHazard } from '@varsom-regobs-common/core';
import * as L from 'leaflet';

export interface ImageLocation {
  latLng: L.LatLng;
  geoHazard: GeoHazard;
  startStopLocation?: { start?: L.LatLng; stop?: L.LatLng };
  damageLocations?: Array<L.LatLng>;
}
