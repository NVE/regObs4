import { RegistrationTid } from './registration-tid.enum';

export interface IRegistrationType {
  registrationTid: RegistrationTid;
  name: string;
  subTypes: IRegistrationType[];
  sortOrder: number;
}