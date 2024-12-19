import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn } from '@angular/router';
import { RegobsAuthService } from '../../modules/auth/services/regobs-auth.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const isUserLoggedIn: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(RegobsAuthService);
  return authService.getLoggedInUserAsPromise().then((loggedInUser) => {
    if (!loggedInUser.isLoggedIn) {
      authService.signIn();
    }

    return loggedInUser.isLoggedIn;
  });
};
