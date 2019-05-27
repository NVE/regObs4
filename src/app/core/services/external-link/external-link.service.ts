import { Injectable } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SafariViewController } from '@ionic-native/safari-view-controller/ngx';
import { Platform } from '@ionic/angular';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';
import { LogLevel } from '../../../modules/shared/services/logging/log-level.model';

const DEBUG_TAG = 'ExternalLinkService';

@Injectable({
  providedIn: 'root'
})
export class ExternalLinkService {

  constructor(
    private inAppBrowser: InAppBrowser,
    private safariViewController: SafariViewController,
    private loggingService: LoggingService,
    private platform: Platform) { }

  async openExternalLink(url: string) {
    if (!this.platform.is('cordova')) {
      this.openExternalLinkFallback(url);
      return;
    }
    const available = await this.safariViewController.isAvailable();
    if (!available) {
      this.loggingService.debug('Safari ViewController or Chrome Custom Tabs not available. Fallback to ianAppBrowser.', DEBUG_TAG);
      this.openExternalLinkFallback(url);
      return;
    }
    this.safariViewController.show({
      url,
      tintColor: '#ffffff',
      barColor: '#044962',
      controlTintColor: '#ffffff',
    }).subscribe((result) => {
      this.loggingService.debug('External url opened in Safari ViewController or Chrome Custom Tabs', DEBUG_TAG);
    }, (error) => {
      // tslint:disable-next-line:max-line-length
      this.loggingService.log('Could not open external url in Safari ViewController or Chrome Custom Tabs. Fallback to ianAppBrowser.',
        error, LogLevel.Warning, DEBUG_TAG);
      this.openExternalLinkFallback(url);
    });
  }

  openExternalLinkFallback(url: string) {
    this.inAppBrowser.create(url, '_system', 'location=yes,hardwareback=yes');
  }
}
