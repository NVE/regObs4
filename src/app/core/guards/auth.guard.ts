import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn } from '@angular/router';
import { RegobsAuthService } from '../../modules/auth/services/regobs-auth.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const isUserLoggedIn: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(RegobsAuthService);
  const loggedInUser = await authService.getLoggedInUserAsPromise();
  if (!loggedInUser.isLoggedIn) {
    authService.signIn();
  }
  return loggedInUser.isLoggedIn;
};
