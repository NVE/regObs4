import { GeoHazard } from './geo-hazard.enum';

export interface ObservationsWithinRadiusRequest {
    GeoHazards: Array<GeoHazard>;
    Latitude: number;
    Longitude: number;
    Radius: number;
    FromDate: string;
    LangKey: string;
    ReturnCount: number;
}
