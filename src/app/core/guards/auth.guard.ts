import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { RegobsAuthService } from '../../modules/auth/services/regobs-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: RegobsAuthService) {}

  async canActivate(
    _: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const loggedInUser = await this.authService.getLoggedInUserAsPromise();
    if (!loggedInUser.isLoggedIn) {
      this.authService.signIn();
    }
    return loggedInUser.isLoggedIn;
  }
}
