import { Municipality } from './municipality.model';

export interface County {
  Id: string;
  Name: string;
  MunicipalityList: Municipality[];
}
