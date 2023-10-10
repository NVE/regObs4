import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserSettingService } from '../services/user-setting/user-setting.service';
import { firstValueFrom } from 'rxjs';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class StartWizardGuard implements CanActivate {
  constructor(private router: Router, private userSettingService: UserSettingService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const shouldShowStartWizard = Capacitor.isNativePlatform();
    if (!shouldShowStartWizard) {
      return true;
    }

    const userSetting = await firstValueFrom(this.userSettingService.userSetting$);
    if (!userSetting.completedStartWizard) {
      setTimeout(() => {
        this.router.navigate(['start-wizard']);
      }, 200); // Added 200ms timeout because of white screen on startup, this seems to help.
    }

    return userSetting.completedStartWizard;
  }
}
