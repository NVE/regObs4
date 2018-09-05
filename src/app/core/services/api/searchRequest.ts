import { RegistrationType } from './registrationType';
import { LangKey } from '../../models/langKey';

export interface SearchRequest {
  RegId?: number;
  LangKey?: LangKey;
  LocationId?: number;
  ObserverId?: number;
  ObserverGuid?: string;
  GroupId?: number;
  FromDate?: Date;
  ToDate?: Date;
  NumberOfRecords?: number;
  Offset?: number;
  SelectedRegistrationTypes?: RegistrationType[];
  SelectedRegions?: number[];
  SelectedGeoHazards?: number[];
  ObserverCompetence?: number[];
  ObserverNickName?: string;
  TextSearch?: string;
}



