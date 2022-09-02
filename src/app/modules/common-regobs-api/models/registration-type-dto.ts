/* eslint-disable */
import { RegistrationTypeSubTypeDto } from './registration-type-sub-type-dto';
export interface RegistrationTypeDto {
  Id?: number;
  Name?: string;
  SortOrder?: number;
  SubTypes?: Array<RegistrationTypeSubTypeDto>;
}
