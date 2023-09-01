import { Injectable } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { SafariViewController } from '@awesome-cordova-plugins/safari-view-controller/ngx';
import { Platform } from '@ionic/angular';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';
import { LogLevel } from '../../../modules/shared/services/logging/log-level.model';

const DEBUG_TAG = 'ExternalLinkService';
const VALID_URL_PROTOCOLS = ['http', 'https'];
export const SAFARI_TINT_COLOR = '#ffffff';
export const SAFARI_BAR_COLOR = '#044962';
export const SAFARI_TOOLBAR_COLOR = '#044962';
export const SAFARI_CONTROL_TINT_COLOR = '#ffffff';

@Injectable({
  providedIn: 'root',
})
export class ExternalLinkService {
  constructor(
    private inAppBrowser: InAppBrowser,
    private safariViewController: SafariViewController,
    private loggingService: LoggingService,
    private platform: Platform
  ) {}

  async openExternalLink(url: string) {
    const validatedUrl = this.ensureCorrectUrl(url);
    if (!this.platform.is('hybrid')) {
      this.openExternalLinkFallback(validatedUrl);
      return;
    }
    const available = await this.safariViewController.isAvailable();
    if (!available) {
      this.loggingService.debug(
        'Safari ViewController or Chrome Custom Tabs not available. Fallback to ianAppBrowser.',
        DEBUG_TAG
      );
      this.openExternalLinkFallback(validatedUrl);
      return;
    }
    this.safariViewController
      .show({
        url: validatedUrl,
        tintColor: SAFARI_TINT_COLOR,
        barColor: SAFARI_BAR_COLOR,
        toolbarColor: SAFARI_TOOLBAR_COLOR,
        controlTintColor: SAFARI_CONTROL_TINT_COLOR,
      })
      .subscribe(
        () => {
          this.loggingService.debug('External url opened in Safari ViewController or Chrome Custom Tabs', DEBUG_TAG);
        },
        (error) => {
          // tslint:disable-next-line:max-line-length
          this.loggingService.log(
            'Could not open external url in Safari ViewController or Chrome Custom Tabs. Fallback to ianAppBrowser.',
            error,
            LogLevel.Warning,
            DEBUG_TAG
          );
          this.openExternalLinkFallback(validatedUrl);
        }
      );
  }

  openExternalLinkFallback(url: string) {
    // we need to wrap inappbrowser in setTimeout to force browser to run on the main thread
    // because Safari blocks the request if it runs from an async call
    setTimeout(() => {
      this.inAppBrowser.create(url, '_system', 'location=yes,hardwareback=yes');
    });
  }

  private ensureCorrectUrl(url: string) {
    if (url !== null) {
      if (VALID_URL_PROTOCOLS.some((validProtocol) => url.toLowerCase().startsWith(validProtocol))) {
        return url;
      }
      return `http://${url}`;
    }
    return url;
  }
}
