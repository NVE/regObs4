import { Injectable } from '@angular/core';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { AppVersion } from '../../models/app-version.model';

const DEBUG_TAG = 'AppVersionService';

@Injectable({
  providedIn: 'root'
})
export class AppVersionService {
  constructor(private loggingService: LoggingService) {
    const version = this.getAppVersion();
    this.loggingService.debug(`Version = ${version.version}, build = ${version.buildNumber}`, DEBUG_TAG);
  }

  getAppVersion(): AppVersion {
    try {
      // tslint:disable-next-line:no-var-requires
      return require('../../../../environments/version.json');
    } catch {
      return {
        version: '0.0.0',
        buildNumber: 0,
        revision: '',
        branch: '',
        date: new Date().toISOString()
      };
    }
  }
}
