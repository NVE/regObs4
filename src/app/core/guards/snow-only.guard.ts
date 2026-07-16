import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { UserSettingService } from '../services/user-setting/user-setting.service';

/**
 * Allow activation only when the current geohazard selection includes Snow.
 * Other geohazards are redirected to root.
 */
export const snowOnlyGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const userSettingService = inject(UserSettingService);

  const geoHazards = await firstValueFrom(userSettingService.currentGeoHazard$);
  if (geoHazards?.includes(GeoHazard.Snow)) {
    return true;
  }
  router.navigate(['/']);
  return false;
};
