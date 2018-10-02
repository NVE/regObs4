import { User } from '../../models/user.model';

export interface LoggedInUser {
    id?: string;
    user?: User;
    isLoggedIn: boolean;
    email?: string;
}
