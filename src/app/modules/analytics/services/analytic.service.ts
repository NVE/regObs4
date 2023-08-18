import { Injectable, Injector } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map, distinctUntilChanged } from 'rxjs/operators';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';
import { LogLevel } from '../../../modules/shared/services/logging/log-level.model';
import { environment } from '../../../../environments/environment';
import { AppCustomDimension } from '../enums/app-custom-dimension.enum';
import { AppEventAction } from '../enums/app-event-action.enum';
import { AppEventCategory } from '../enums/app-event-category.enum';
import { removeOauthTokenFromUrl } from '../../shared/services/logging/url-utils';
import { Capacitor } from '@capacitor/core';

// In order to have IntelliSense on the custom events we need to declare Plausible on the global window element.
// This code comes from https://www.lekoarts.de/garden/how-to-add-plausible-analytics-to-gatsby#typescript
declare global {
  interface Window {
    plausible: (
      name: string,
      options?: { callback?: () => void; props?: { [key: string]: string | number | boolean } }
    ) => void;
  }
}

const DEBUG_TAG = 'AnalyticService';
@Injectable({
  providedIn: 'root',
})
export class AnalyticService {
  get router() {
    return this.injector.get(Router);
  }

  constructor(private injector: Injector, private loggingService: LoggingService) {}

  private isTrackingOn(): boolean {
    return window.plausible && environment.production;
  }

  trackView(url: string) {
    if (!this.isTrackingOn()) return;
    const safeUrl = removeOauthTokenFromUrl(url);
    this.loggingService.debug(`Tracking pageview ${safeUrl}`, DEBUG_TAG);
    window.plausible('Track view', { props: { safeUrl } });
  }

  trackDimension(dimension: AppCustomDimension, value: string | number | boolean) {
    if (!this.isTrackingOn()) return;
    this.loggingService.debug(`Tracking dimension ${dimension}: ${value}`, DEBUG_TAG);
    window.plausible('Track dimension', { props: { [dimension]: value } });
  }

  trackEvent(eventCategory: AppEventCategory, eventAction: AppEventAction, eventLabel?: string, eventValue?: number) {
    if (!this.isTrackingOn()) return;
    this.loggingService.debug(
      `Tracking event eventCategory:${eventCategory}, eventAction:${eventAction},` +
        ` eventLabel:${eventLabel || ''}, eventValue: ${eventValue || ''}`,
      DEBUG_TAG
    );

    window.plausible('Track event', { props: { eventCategory, eventAction, eventLabel, eventValue } });
  }

  init() {
    if (!window.plausible) {
      this.loggingService.log(
        'Could not load Plausible script. Probably ad blocker installed.',
        null,
        LogLevel.Warning,
        DEBUG_TAG
      );
      return;
    }
    if (!this.isTrackingOn()) {
      this.loggingService.debug('Init Plausible (DEV-MODE! Analytics data is not sent to server!)', DEBUG_TAG);
      return;
    }
    this.loggingService.debug('Init Plausible', DEBUG_TAG);
    this.startTrackingPageViews();
    // track platform
    this.trackDimension(AppCustomDimension.platform, Capacitor.isNativePlatform() ? 'app' : 'web');
    this.loggingService.debug('Plausible setup completed', DEBUG_TAG);
  }

  private startTrackingPageViews() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(
        map((val: NavigationEnd) => val.urlAfterRedirects),
        distinctUntilChanged()
      )
      .subscribe((url: string) => {
        const safeUrl = removeOauthTokenFromUrl(url);
        this.trackView(safeUrl);
      });
  }
}
