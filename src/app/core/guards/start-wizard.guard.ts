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

    await this.userSettingService.userSettingsReadyAsync();
    if (!this.userSettingService.currentSettings.completedStartWizard) {
      this.router.navigate(['start-wizard']);
    }

    return this.userSettingService.currentSettings.completedStartWizard;
  }
}
