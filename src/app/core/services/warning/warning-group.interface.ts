import { GeoHazard } from '../../models/geo-hazard.enum';
import { IWarning } from './warning.interface';

export interface IWarningGroup {
    id: string;
    regionId: string;
    regionName: string;
    url?: string;
    lastUpdate?: Date;
    counties: Array<string>;
    geoHazard: GeoHazard;
    warnings: IWarning[];
}
