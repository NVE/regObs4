import { LocationName } from './location-name.model';
import * as L from 'leaflet';

export interface ViewInfo {
    location?: LocationName;
    elevation?: number;
    latLng: L.LatLng;
}
