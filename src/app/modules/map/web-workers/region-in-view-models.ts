import { GeoHazard } from 'src/app/modules/common-core/models';

export interface IRegionInViewInput {
  bounds: number[];
  center: { lat: number; lng: number };
  geoHazards: GeoHazard[];
}

export interface IRegionInViewOutput {
  regionInCenter: string;
  regionsInViewBounds: string[];
  regionsInViewBuffer: string[];
}
