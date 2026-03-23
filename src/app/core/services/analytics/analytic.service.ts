import { computed, inject, Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { CustomProperties, init, PlausibleRequestPayload } from '@plausible-analytics/tracker';
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

  private transformRequest(payload: PlausibleRequestPayload) {
    // https://plausible.io/docs/stop-tracking-utm-tags
    payload.u = queryStrippedUrl(); // Remove query params
    return payload;
  }

  private addCustomProps(_eventName: string): CustomProperties {
    return {
      appMode: this.appMode(),
      lang: this.langKey(),
      geohazard: this.geoHazardProps(),
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
        transformRequest: (payload) => this.transformRequest(payload),
      });
    }
  }
}

function queryStrippedUrl() {
  return location.href.split('?')[0];
}
