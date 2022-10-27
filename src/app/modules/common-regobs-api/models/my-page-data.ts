/* tslint:disable */
import { ObserverCompetenceDto } from './observer-competence-dto';
import { ObserverGroupDto } from './observer-group-dto';
export interface MyPageData {
  Adrnr?: number;
  Competence?: Array<ObserverCompetenceDto>;
  DefaultMunicipality?: string;
  DtRegTime?: string;
  Email?: string;
  FirstName?: string;
  Guid?: string;
  LastName?: string;
  LastRegistrationDate?: string;
  MainGeohazardTID?: number;
  MemberOfGroups?: Array<ObserverGroupDto>;
  MobPhoneNr?: string;
  NickName?: string;
  NumberOfObservations?: number;
  PendingInvitationsToGroups?: Array<ObserverGroupDto>;
  Roles?: Array<string>;
  WorkPlace?: string;
}
