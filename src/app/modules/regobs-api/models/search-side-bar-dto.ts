/* tslint:disable */
import { RegistrationTypeDto } from './registration-type-dto';
import { ObserverCompetenceLevelDto } from './observer-competence-level-dto';
import { AreasDto } from './areas-dto';
export interface SearchSideBarDto {
  RegistrationTypes?: {NotSpecified?: Array<RegistrationTypeDto>, Avalanche?: Array<RegistrationTypeDto>, EarthFlow?: Array<RegistrationTypeDto>, LandSlide?: Array<RegistrationTypeDto>, RockFall?: Array<RegistrationTypeDto>, IceFall?: Array<RegistrationTypeDto>, Flooding?: Array<RegistrationTypeDto>, Ice?: Array<RegistrationTypeDto>, EventOnGlacier?: Array<RegistrationTypeDto>, Jøkulhaup?: Array<RegistrationTypeDto>, Drought?: Array<RegistrationTypeDto>, Unknown?: Array<RegistrationTypeDto>};
  ObserverCompetenceLevels?: {NotSpecified?: Array<ObserverCompetenceLevelDto>, Avalanche?: Array<ObserverCompetenceLevelDto>, EarthFlow?: Array<ObserverCompetenceLevelDto>, LandSlide?: Array<ObserverCompetenceLevelDto>, RockFall?: Array<ObserverCompetenceLevelDto>, IceFall?: Array<ObserverCompetenceLevelDto>, Flooding?: Array<ObserverCompetenceLevelDto>, Ice?: Array<ObserverCompetenceLevelDto>, EventOnGlacier?: Array<ObserverCompetenceLevelDto>, Jøkulhaup?: Array<ObserverCompetenceLevelDto>, Drought?: Array<ObserverCompetenceLevelDto>, Unknown?: Array<ObserverCompetenceLevelDto>};
  Areas?: Array<AreasDto>;
}
