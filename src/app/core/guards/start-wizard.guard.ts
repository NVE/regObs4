import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { UserSettingService } from '../services/user-setting/user-setting.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StartWizardGuard implements CanActivate {
  constructor(
    private router: Router,
    private userSettingService: UserSettingService
  ) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const userSetting = await this.userSettingService.userSetting$
      .pipe(take(1))
      .toPromise();
    if (!userSetting.completedStartWizard) {
      setTimeout(() => {
        this.router.navigate(['start-wizard']);
      }, 200);
    }

    return userSetting.completedStartWizard;
  }
}
