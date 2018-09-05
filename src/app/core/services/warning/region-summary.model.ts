import { AvalancheWarningSimple } from './avalanche-warning-simple.model';

export interface RegionSummary {
    Id: string;
    Name: string;
    TypeId: number;
    TypeName: string;
    AvalancheWarningList: Array<AvalancheWarningSimple>;
}
