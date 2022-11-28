import { Injectable } from '@angular/core';
import { AppVersion } from '../../models/app-version.model';

@Injectable({
  providedIn: 'root',
})
export class AppVersionService {
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
        date: new Date().toISOString(),
      };
    }
  }
}
