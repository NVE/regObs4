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

  private checkIfAnalyticsLoaded = () => {
    return new Promise((resolve, reject) => {
      const timeStart = Date.now();
      const TIMEOUT = 3000;
      const _isLoaded = function () {
        if (Date.now() - timeStart > TIMEOUT) {
          reject('Timeout. Google analytics not injected!');
          return;
        }
        if ((<any>window).ga && (<any>window).ga.create) {
          resolve(ga);
          return;
        } else {
          setTimeout(_isLoaded, 500);
        }
      };
      _isLoaded();
    });
  }


  async init() {
    if (environment.production) {
      await this.checkIfAnalyticsLoaded();
      this.internalInit();
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
        this.ga('set', 'checkProtocolTask', null);
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
