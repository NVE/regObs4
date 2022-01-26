/* tslint:disable */
import { RegistrationTypeSubTypeDto } from './registration-type-sub-type-dto';
export interface RegistrationTypeDto {
  Id?: number;
  Name?: string;
  SubTypes?: Array<RegistrationTypeSubTypeDto>;
  SortOrder?: number;
}
