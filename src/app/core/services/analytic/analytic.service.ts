import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router, NavigationStart } from '@angular/router';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';
import { settings } from '../../../../settings';
import { AppVersionService } from '../app-version/app-version.service';
import { filter, map, distinctUntilChanged } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

const DEBUG_TAG = 'AnalyticService';

@Injectable({
  providedIn: 'root'
})
export class AnalyticService {

  constructor(
    private platform: Platform,
    private router: Router,
    private ga: GoogleAnalytics,
    private loggingService: LoggingService,
    private appVersionService: AppVersionService,
  ) {
  }

  get enabled() {
    return this.platform.isAndroidOrIos() && environment.production;
  }

  async init() {
    const appVersion = await this.appVersionService.getAppVersion();
    this.loggingService.debug(`Starting GA tracking. setAnonymizeIp:
      ${settings.googleAnalytics.anonymizeIp}. setAppVersion: ${appVersion.version}`, DEBUG_TAG);

    if (this.enabled) {
      await this.ga.setAnonymizeIp(settings.googleAnalytics.anonymizeIp);
      await this.ga.setAppVersion(appVersion.version);
      await this.ga.startTrackerWithId(settings.googleAnalytics.trackerId);
    }
    this.trackView(this.router.url);

    this.loggingService.debug('Subscribing to route changes', DEBUG_TAG);
    this.router.events.pipe(filter((event) => event instanceof NavigationStart))
      .pipe(map((val: NavigationStart) => val.url), distinctUntilChanged())
      .subscribe((url: string) => {
        this.trackView(url);
      });
  }

  private trackView(url: string) {
    this.loggingService.debug(`Track view: ${url}. Enabled: ${this.enabled}`, DEBUG_TAG);
    if (this.enabled) {
      this.ga.trackView(url);
    }
  }
}
