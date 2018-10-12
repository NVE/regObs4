import { GeoHazard } from '../../models/geo-hazard.enum';
import { WarningGroupKey } from './warning-group-key.interface';
import { LangKey } from '../../models/langKey';

export interface IWarning {
    warningLevel: number;
    publishTime: Date;
    validFrom: Date;
    validTo: Date;
    mainText: string;
    language: LangKey;
}
