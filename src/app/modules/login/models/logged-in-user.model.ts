// import { ObserverResponseDto } from '@varsom-regobs-common/regobs-api';

export interface LoggedInUser {
  // id?: string;
  // user?: ObserverResponseDto;
  tokenIssuedAt?: number; //unix time
  isLoggedIn: boolean;
  email?: string;
}
