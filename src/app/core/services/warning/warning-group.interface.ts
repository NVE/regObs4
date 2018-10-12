import { GeoHazard } from '../../models/geo-hazard.enum';
import { IWarning } from './warning.interface';

export interface IWarningGroup {
    id: string;
    regionId: string;
    regionName: string;
    geoHazard: GeoHazard;
    warnings: IWarning[];
}
