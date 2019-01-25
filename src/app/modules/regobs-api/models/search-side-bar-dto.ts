/* tslint:disable */
import { ForecastRegionDto } from './forecast-region-dto';
import { RegistrationTypeDto } from './registration-type-dto';
import { ObserverCompetenceLevelDto } from './observer-competence-level-dto';
import { CountryDto } from './country-dto';
export interface SearchSideBarDto {
  ForecastRegions?: Array<ForecastRegionDto>;
  RegistrationTypes?: Array<RegistrationTypeDto>;
  ObserverCompetenceLevels?: Array<ObserverCompetenceLevelDto>;
  Countries?: Array<CountryDto>;
}
