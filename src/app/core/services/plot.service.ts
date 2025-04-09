import { computed, inject, Injectable } from '@angular/core';
import { UserSettingService } from './user-setting/user-setting.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { settings } from 'src/settings';
import { BreakpointService } from './breakpoint.service';
import { RegistrationViewModel } from 'src/app/modules/common-regobs-api';

/**
 * Beregner url-er til bruk av plot.regobs.no
 */
@Injectable({
  providedIn: 'root',
})
export class PlotService {
  private settings = inject(UserSettingService);
  private isDesktop = inject(BreakpointService).isDesktop;

  private plotApi = toSignal(this.settings.appMode$.pipe(map((x) => settings.services.regObs.plotUrl[x])), {
    initialValue: settings.services.regObs.plotUrl.PROD,
  });

  private preferredSnowProfileType = computed(() => {
    if (this.isDesktop()) {
      return 'SimpleProfile';
    }
    return 'MobileProfile';
  });

  getIceThicknessUrl(regid: string | number) {
    return `${this.plotApi()}/IceThickness/${regid}`;
  }

  getSnowProfileSvgUrl(registration: RegistrationViewModel) {
    const { RegId, DtChangeTime } = registration;
    // Nettleseren cacher i utgangspunktet svg-ene. For å fremprovosere den til å hente nytt plott ved endring av obs
    // legger vi på lastMod= med endret dato. Da caches fortsatt plotet inntil obsen er endra.
    return `${this.plotApi()}/SnowProfile/svg/${RegId}/${this.preferredSnowProfileType()}?lastMod=${DtChangeTime}`;
  }
}
