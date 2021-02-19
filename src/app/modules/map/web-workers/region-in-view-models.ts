import { Point } from '@arcgis/core/geometry';
import { GeoHazard } from '../../../core/models/geo-hazard.enum';

export interface IRegionInViewInput {
  bounds: number[];
  center: Point;
  geoHazards: GeoHazard[];
}

export interface IRegionInViewOutput {
  regionInCenter: string;
  regionsInViewBounds: string[];
  regionsInViewBuffer: string[];
}
