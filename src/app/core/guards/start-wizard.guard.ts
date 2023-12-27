import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn, Router } from '@angular/router';
import { UserSettingService } from '../services/user-setting/user-setting.service';
import { map, switchMap, take } from 'rxjs/operators';
import { of, timer } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const canActivateStartWizard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(UserSettingService).userSetting$.pipe(
    take(1),
    map((userSetting) => !userSetting.completedStartWizard),
    switchMap((notCompletedStartWizard) => {
      if (notCompletedStartWizard) {
        // Redirect router navigation to start wizard
        // Added 200ms timeout because of white screen on startup, this seems to help.
        return timer(200).pipe(map(() => inject(Router).parseUrl('/start-wizard')));
      }
      // Proceed with router navigation
      return of(true);
    })
  );
};
