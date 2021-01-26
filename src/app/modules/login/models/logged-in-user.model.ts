import { ObserverResponseDto } from '../../regobs-api/models';

export interface LoggedInUser {
  id?: string;
  user?: ObserverResponseDto;
  isLoggedIn: boolean;
  email?: string;
}
