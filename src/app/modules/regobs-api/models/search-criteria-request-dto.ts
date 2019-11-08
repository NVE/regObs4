/* tslint:disable */
import { RegistrationTypeCriteriaDto } from './registration-type-criteria-dto';
import { WithinRadiusCriteriaDto } from './within-radius-criteria-dto';
import { WithinExtentCriteriaDto } from './within-extent-criteria-dto';
export interface SearchCriteriaRequestDto {
  RegId?: number;
  LangKey?: number;
  LocationId?: number;
  ObserverId?: number;
  ObserverGuid?: string;
  GroupId?: number;
  FromDate?: string;
  ToDate?: string;
  FromDtObsTime?: string;
  ToDtObsTime?: string;
  FromDtChangeTime?: string;
  ToDtChangeTime?: string;
  NumberOfRecords?: number;
  Offset?: number;
  TimeZone?: string;
  SelectedRegistrationTypes?: Array<RegistrationTypeCriteriaDto>;
  SelectedRegions?: Array<number>;
  SelectedGeoHazards?: Array<number>;
  ObserverCompetence?: Array<number>;
  ObserverNickName?: string;
  Countries?: Array<number>;
  Counties?: Array<string>;
  TextSearch?: string;
  Radius?: WithinRadiusCriteriaDto;
  Extent?: WithinExtentCriteriaDto;
}
