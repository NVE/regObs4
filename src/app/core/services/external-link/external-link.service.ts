import { Injectable, inject } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';
import { LogLevel } from '../../../modules/shared/services/logging/log-level.model';

const DEBUG_TAG = 'ExternalLinkService';
const VALID_URL_PROTOCOLS = ['http', 'https'];
const BROWSER_TOOLBAR_COLOR = '#044962';

@Injectable({
  providedIn: 'root',
})
export class ExternalLinkService {
  private loggingService = inject(LoggingService);

  async openExternalLink(url: string) {
    const validatedUrl = this.ensureCorrectUrl(url);
    try {
      await Browser.open({ url: validatedUrl, toolbarColor: BROWSER_TOOLBAR_COLOR });
      this.loggingService.debug('External url opened in browser', DEBUG_TAG);
    } catch (error) {
      this.loggingService.log('Could not open external url in browser.', error, LogLevel.Warning, DEBUG_TAG);
    }
  }

  ensureCorrectUrl(url: string) {
    if (url !== null) {
      if (VALID_URL_PROTOCOLS.some((validProtocol) => url.toLowerCase().startsWith(validProtocol))) {
        return url;
      }
      return `http://${url}`;
    }
    return url;
  }
}
