import { GeoHazard } from '../../../core/models/geo-hazard.enum';

export interface IRegionInViewInput {
    bounds: number[];
    center: {lat: number, lng: number};
    geoHazards: GeoHazard[];
}

export interface IRegionInViewOutput {
    regionInCenter: string;
    regionsInViewBounds: string[];
    regionsInViewBuffer: string[];
}
