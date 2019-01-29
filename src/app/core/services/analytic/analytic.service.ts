import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map, distinctUntilChanged } from 'rxjs/operators';
import { settings } from '../../../../settings';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';
import { LogLevel } from '../../../modules/shared/services/logging/log-level.model';
import { environment } from '../../../../environments/environment';

const DEBUG_TAG = 'AnalyticService';
@Injectable({
  providedIn: 'root'
})
export class AnalyticService {

  ga: any;

  constructor(
    private router: Router,
    private loggingService: LoggingService,
  ) {
  }

  async init() {
    if (environment.production) {
      if ((<any>window).ga) {
        this.internalInit();
      } else {
        setTimeout(() => this.internalInit(), 2000);
      }
    }
  }

  private internalInit() {
    this.ga = (<any>window).ga;
    if (this.ga) {
      if (window.localStorage) {
        this.ga('create', settings.googleAnalytics.trackerId, 'auto', {
          'storage': 'none',
          'clientId': window.localStorage.getItem('ga_clientId')
        });
        this.ga(function (tracker) {
          window.localStorage.setItem('ga_clientId', tracker.get('clientId'));
        });
      } else {
        this.ga('create', settings.googleAnalytics.trackerId, 'auto');
      }
      this.ga('set', 'appName', 'regObs4');
      this.ga('set', 'anonymizeIp', settings.googleAnalytics.anonymizeIp);
      this.ga('send', 'pageview');

      this.router.events.pipe(filter((event) => event instanceof NavigationEnd))
        .pipe(map((val: NavigationEnd) => val.urlAfterRedirects), distinctUntilChanged())
        .subscribe((url: string) => {
          this.trackView(url);
        });
    } else {
      this.loggingService.log('Could not load Google Analytics script', null, LogLevel.Warning, DEBUG_TAG);
    }
  }

  private trackView(url: string) {
    this.ga('set', 'page', url);
    this.ga('send', 'pageview');
  }
}
