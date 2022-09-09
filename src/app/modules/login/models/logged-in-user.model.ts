export interface LoggedInUser {
  isLoggedIn: boolean;
  email?: string;
  token?: string;
  tokenIssuedAt?: number; //unix time
}
