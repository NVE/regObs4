import { Injectable, Injector } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map, distinctUntilChanged } from 'rxjs/operators';
import { settings } from '../../../../settings';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';
import { LogLevel } from '../../../modules/shared/services/logging/log-level.model';
import { environment } from '../../../../environments/environment';
import { AppVersionService } from '../../../core/services/app-version/app-version.service';
import { AppCustomDimension } from '../enums/app-custom-dimension.enum';
import { AppEventAction } from '../enums/app-event-action.enum';
import { AppEventCategory } from '../enums/app-event-category.enum';

const DEBUG_TAG = 'AnalyticService';
@Injectable({
  providedIn: 'root'
})
export class AnalyticService {
  get router() {
    return this.injector.get(Router);
  }

  constructor(
    private injector: Injector,
    private loggingService: LoggingService,
    private appVersionService: AppVersionService
  ) {}

  trackView(url: string) {
    if (ga) {
      this.loggingService.debug(`Tracking pageview ${url}`, DEBUG_TAG);
      ga('set', 'page', url);
      ga('send', 'pageview');
    }
  }

  trackDimension(
    dimension: AppCustomDimension,
    value: string | number | boolean
  ) {
    if (ga) {
      this.loggingService.debug(
        `Tracking dimension ${dimension}: ${value}`,
        DEBUG_TAG
      );
      ga('set', dimension, value);
      ga('send', 'pageview');
    }
  }

  trackEvent(
    eventCategory: AppEventCategory,
    eventAction: AppEventAction,
    eventLabel?: string,
    eventValue?: number
  ) {
    if (ga) {
      this.loggingService.debug(
        `Tracking event eventCategory:${eventCategory}, eventAction:${eventAction},` +
          ` eventLabel:${eventLabel || ''}, eventValue: ${eventValue || ''}`,
        DEBUG_TAG
      );
      ga('send', 'event', {
        eventCategory,
        eventAction,
        eventLabel,
        eventValue
      });
    }
  }

  disable() {
    this.loggingService.debug('Disable Google Analytics', DEBUG_TAG);
    window[`ga-disable-${settings.googleAnalytics.trackerId}`] = true;
  }

  enable() {
    this.loggingService.debug(
      `Enable Google Analytics ${
        environment.production
          ? ''
          : '(DEV-MODE! Analytics data is not sent to server!)'
      }`,
      DEBUG_TAG
    );
    if (environment.production) {
      window[`ga-disable-${settings.googleAnalytics.trackerId}`] = false;
    }
  }

  init() {
    if (!ga) {
      this.loggingService.log(
        'Could not load Google Analytics script. Probably ad blocker installed.',
        null,
        LogLevel.Warning,
        DEBUG_TAG
      );
      return;
    }
    this.loggingService.debug(
      `Init Google Analytics ${
        environment.production
          ? ''
          : '(DEV-MODE! Analytics data is not sent to server!)'
      }`,
      DEBUG_TAG
    );
    if (!environment.production) {
      // Disable sending events unless production build
      this.disable();
    }

    this.loggingService.debug('Setup google analytics', DEBUG_TAG);
    if (window.localStorage) {
      ga('create', settings.googleAnalytics.trackerId, 'auto', {
        storage: 'none',
        clientId: window.localStorage.getItem('ga_clientId')
      });
      ga('set', 'checkProtocolTask', null);
      ga(function (tracker) {
        window.localStorage.setItem('ga_clientId', tracker.get('clientId'));
      });
    } else {
      ga('create', settings.googleAnalytics.trackerId, 'auto');
    }

    const appVersion = this.appVersionService.getAppVersion();
    ga('set', 'appName', 'regObs4');
    ga('set', 'anonymizeIp', settings.googleAnalytics.anonymizeIp);
    ga('set', 'appVersion', appVersion.version);
    ga('send', 'pageview');

    this.startTrackingPageViews();
    this.loggingService.debug('Google analytics setup completed', DEBUG_TAG);
  }

  private startTrackingPageViews() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(
        map((val: NavigationEnd) => val.urlAfterRedirects),
        distinctUntilChanged()
      )
      .subscribe((url: string) => {
        this.trackView(url);
      });
  }
}
