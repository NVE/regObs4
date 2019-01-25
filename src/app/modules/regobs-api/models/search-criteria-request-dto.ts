/* tslint:disable */
import { RegistrationTypeCriteriaDto } from './registration-type-criteria-dto';
export interface SearchCriteriaRequestDto {
  NumberOfRecords?: number;
  RegId?: number;
  LocationId?: number;
  ObserverId?: number;
  ObserverGuid?: string;
  GroupId?: number;
  FromDate?: string;
  ToDate?: string;
  LangKey?: number;
  Offset?: number;
  SelectedRegistrationTypes?: Array<RegistrationTypeCriteriaDto>;
  SelectedRegions?: Array<number>;
  SelectedGeoHazards?: Array<number>;
  ObserverCompetence?: Array<number>;
  ObserverNickName?: string;
  Countries?: Array<number>;
  TextSearch?: string;
}
