import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn } from '@angular/router';
import { UserSettingService } from '../services/user-setting/user-setting.service';
import { map, switchMap, take } from 'rxjs/operators';
import { timer, of } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const canActivateStartWizard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const userSettingService = inject(UserSettingService);
  const router = inject(Router);

  return userSettingService.userSetting$.pipe(
    take(1),
    map((userSetting) => !userSetting.completedStartWizard),
    switchMap((notCompletedStartWizard) => {
      if (notCompletedStartWizard) {
        // Redirect router navigation to start wizard
        // Added 200ms timeout because of white screen on startup, this seems to help.
        return timer(200).pipe(map(() => router.parseUrl('/start-wizard')));
      }
      // Proceed with router navigation
      return of(true);
    })
  );
};
