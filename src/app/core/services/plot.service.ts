import { inject, Injectable } from '@angular/core';
import { UserSettingService } from './user-setting/user-setting.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { settings } from 'src/settings';

/**
 * Beregner url-er til bruk av plot.regobs.no
 */
@Injectable({
  providedIn: 'root',
})
export class PlotService {
  private settings = inject(UserSettingService);

  private plotApi = toSignal(this.settings.appMode$.pipe(map((x) => settings.services.regObs.plotUrl[x])), {
    initialValue: settings.services.regObs.plotUrl.PROD,
  });

  getIceThicknessUrl(regid: string | number) {
    return `${this.plotApi()}/IceThickness/${regid}`;
  }
}
