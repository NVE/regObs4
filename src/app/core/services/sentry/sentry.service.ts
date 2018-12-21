import { Injectable } from '@angular/core';
import { AppMode } from '../../models/app-mode.enum';
import * as Sentry from '@sentry/browser';
import { AppVersionService } from '../app-version/app-version.service';
import { settings } from '../../../../settings';
import { environment } from '../../../../environments/environment';
import { LoggedInUser } from '../../../modules/login/models/logged-in-user.model';

@Injectable({
  providedIn: 'root'
})
export class SentryService {

  constructor(private appVersionService: AppVersionService) { }


  configureSentry(appMode: AppMode) {
    const version = this.appVersionService.getAppVersion();

    Sentry.init(
      {
        dsn: settings.sentryDsn,
        environment: appMode === AppMode.Prod ? 'regObs' : (appMode === AppMode.Demo ? 'demo regObs' : 'test regObs'),
        enabled: environment.production,
        release: version.version,
        dist: `${version.branch}-${version.revision}-${version.date}`
      });
  }

  setUser(user: LoggedInUser) {
    if (user && user.email) {
      Sentry.configureScope((scope) => {
        scope.setUser({ email: user.email });
      });
    }
  }
}
