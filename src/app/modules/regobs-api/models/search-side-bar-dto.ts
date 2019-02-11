/* tslint:disable */
import { RegistrationTypeDto } from './registration-type-dto';
import { ObserverCompetenceLevelDto } from './observer-competence-level-dto';
import { AreasDto } from './areas-dto';
export interface SearchSideBarDto {
  RegistrationTypes?: Array<RegistrationTypeDto>;
  ObserverCompetenceLevels?: Array<ObserverCompetenceLevelDto>;
  Areas?: Array<AreasDto>;
}
