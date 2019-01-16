import { LocationName } from './location-name.model';
import * as L from 'leaflet';

export interface ViewInfo {
    location?: LocationName;
    elevation?: number;
    steepness?: number;
    latLng: L.LatLng;
}
