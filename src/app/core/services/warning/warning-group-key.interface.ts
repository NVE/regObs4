import { GeoHazard } from '../../models/geo-hazard.enum';

export interface WarningGroupKey {
    geoHazard: GeoHazard;
    groupId: string;
    groupName: string;
    language: string;
}
