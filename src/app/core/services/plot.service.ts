import { computed, inject, Injectable } from '@angular/core';
import { UserSettingService } from './user-setting/user-setting.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { settings } from 'src/settings';
import { BreakpointService } from './breakpoint.service';

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

  getSnowProfileSvgUrl(regId: number | undefined, changeTime: string | undefined): string | undefined {
    // Nettleseren cacher i utgangspunktet svg-ene. For å fremprovosere den til å hente nytt plott ved endring av obs
    // legger vi på lastMod= med endret dato. Da caches fortsatt plotet inntil obsen er endra.
    if (!regId) return undefined;
    return `${this.plotApi()}/SnowProfile/svg/${regId}/${this.preferredSnowProfileType()}?lastMod=${changeTime}`;
  }
}
