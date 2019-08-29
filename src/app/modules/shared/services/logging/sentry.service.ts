import { Injectable } from '@angular/core';
import { AppMode } from '../../../../core/models/app-mode.enum';
import * as Sentry from '@sentry/browser';
import { AppVersionService } from '../../../../core/services/app-version/app-version.service';
import { settings } from '../../../../../settings';
import { environment } from '../../../../../environments/environment';
import { LoggedInUser } from '../../../login/models/logged-in-user.model';
import { LoggingService } from './logging.service';
import { LogLevel } from './log-level.model';

@Injectable({
  providedIn: 'root'
})
export class SentryService implements LoggingService {

  constructor(private appVersionService: AppVersionService) {
  }

  error(error: Error, tag?: string, message?: string, ...optionalParams: any[]) {
    this.log(message, error, LogLevel.Error, tag, ...optionalParams);
  }

  debug(message: string, tag?: string, ...optionalParams: any[]) {
    this.log(message, null, LogLevel.Debug, tag, ...optionalParams);
  }


  configureLogging(appMode: AppMode) {
    const appVersion = this.appVersionService.getAppVersion();
    Sentry.init(
      {
        dsn: environment.production ? settings.sentryDsn : null,
        transport: Sentry.Transports.FetchTransport,
        environment: appMode === AppMode.Prod ? 'regObs' : (appMode === AppMode.Demo ? 'demo regObs' : 'test regObs'),
        enabled: environment.production,
        release: appVersion.version,
        dist: appVersion.revision
      });
  }

  enable() {
    Sentry.init({
      dsn: environment.production ? settings.sentryDsn : null,
      enabled: environment.production
    });
  }

  disable() {
    Sentry.init({
      dsn: null,
      enabled: false
    });
  }

  setUser(user: LoggedInUser) {
    if (user && user.email) {
      Sentry.configureScope((scope) => {
        scope.setUser({ email: user.email });
      });
    }
  }

  log(message?: string, error?: Error, level?: LogLevel, tag?: string, ...optionalParams: any[]) {
    // Skipping other log levels than Error for performance, so we are not sending a lot of debug messages over the network
    if (level === LogLevel.Error) {
      if (message) {
        Sentry.addBreadcrumb({
          category: tag,
          data: optionalParams,
          message,
          level: <any>level,
        });
      }
      if (error) {
        Sentry.captureException(error);
      }
    }
  }
}
