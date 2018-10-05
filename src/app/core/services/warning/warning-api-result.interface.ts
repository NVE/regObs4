import { County } from '../../models/county.model';

export interface IWarningApiResult {
    Version: number;
    ActivityLevel: string;
    ValidFrom: string;
    ValidTo: string;
    PublishTime: string;
    MainText: string;
    CountyList: County[];
}
