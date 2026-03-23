import { computed, inject, Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { CustomProperties, init } from '@plausible-analytics/tracker';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { AppMode, GeoHazard } from 'src/app/modules/common-core/models';
import { getLangKeyString } from 'src/app/modules/common-core/helpers';
import { environment } from 'src/environments/environment';

const platform = Capacitor.getPlatform();

@Injectable({
  providedIn: 'root',
})
export class AnalyticService {
  private settings = inject(UserSettingService);

  private appMode = toSignal(this.settings.appMode$, { initialValue: AppMode.Prod });
  private langKeyNumber = toSignal(this.settings.language$);
  private langKey = computed(() => {
    const lk = this.langKeyNumber();
    if (lk) {
      return getLangKeyString(lk);
    }
    return 'init';
  });
  private geoHazard = toSignal(this.settings.currentGeoHazard$, { initialValue: [GeoHazard.NotSpecified] });
  private geoHazardProps = computed(() => this.geoHazard().toSorted().join(','));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addCustomProps(eventName: string): CustomProperties {
    return {
      appMode: this.appMode(),
      lang: this.langKey(),
      gh: this.geoHazardProps(),
      platform,
    };
  }

  init() {
    if (environment.production) {
      init({
        domain: 'regobs.no',
        customProperties: (eventName) => this.addCustomProps(eventName),
        outboundLinks: true,
        captureOnLocalhost: true,
      });
    }
  }
}
