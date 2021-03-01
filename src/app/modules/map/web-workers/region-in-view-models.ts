import { GeoHazard } from '@varsom-regobs-common/core';

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
