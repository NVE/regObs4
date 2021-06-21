import { LocationName } from './location-name.model';
import { Point } from '@arcgis/core/geometry';

export interface ViewInfo {
  location?: LocationName;
  elevation?: number;
  steepness?: number;
  latLng: Point;
}
