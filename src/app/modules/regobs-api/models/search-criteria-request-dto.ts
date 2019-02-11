/* tslint:disable */
import { RegistrationTypeCriteriaDto } from './registration-type-criteria-dto';
import { WithinRadiusCriteriaDto } from './within-radius-criteria-dto';
import { WithinExtentCriteriaDto } from './within-extent-criteria-dto';
export interface SearchCriteriaRequestDto {
  Offset?: number;
  RegId?: number;
  LocationId?: number;
  ObserverId?: number;
  ObserverGuid?: string;
  GroupId?: number;
  FromDate?: string;
  ToDate?: string;
  NumberOfRecords?: number;
  LangKey?: number;
  SelectedRegistrationTypes?: Array<RegistrationTypeCriteriaDto>;
  SelectedRegions?: Array<number>;
  SelectedGeoHazards?: Array<number>;
  ObserverCompetence?: Array<number>;
  ObserverNickName?: string;
  Countries?: Array<number>;
  TextSearch?: string;
  Radius?: WithinRadiusCriteriaDto;
  Extent?: WithinExtentCriteriaDto;
}
