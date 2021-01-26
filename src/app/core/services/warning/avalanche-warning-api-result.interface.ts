import { IAvalancheWarningSimple } from './avalanche-warning-simple.interface';

export interface IAvalancheWarningApiResult {
  Id: number;
  Name: string;
  TypeId: number;
  TypeName: string;
  AvalancheWarningList: IAvalancheWarningSimple[];
}
