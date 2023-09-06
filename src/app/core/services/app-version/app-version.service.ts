import { Injectable } from '@angular/core';
import { AppVersion } from '../../models/app-version.model';
import { Observable, from, of, shareReplay, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppVersionService {
  get appVersion$(): Observable<AppVersion> {
    const appVersion = this.getAppVersion();
    return of(appVersion).pipe(take(1), shareReplay());
  }

  private getAppVersion(): AppVersion {
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
