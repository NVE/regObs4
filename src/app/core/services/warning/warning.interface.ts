import { GeoHazard } from '../../models/geo-hazard.enum';
import { WarningGroupKey } from './warning-group-key.interface';

export interface IWarning extends WarningGroupKey {
    id: string;
    warningLevel: number;
    publishTime: Date;
    validFrom: Date;
    validTo: Date;
    mainText: string;
}
