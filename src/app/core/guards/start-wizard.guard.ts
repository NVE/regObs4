import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserSettingService } from '../services/user-setting/user-setting.service';

@Injectable({
  providedIn: 'root'
})
export class StartWizardGuard implements CanActivate {
  constructor(private router: Router, private userSettingService: UserSettingService) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {

    const userSettings = await this.userSettingService.getUserSettings();
    if (!userSettings.completedStartWizard) {
      this.router.navigate(['start-wizard']);
    }

    return userSettings.completedStartWizard;
  }
}
