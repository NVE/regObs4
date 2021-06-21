import { Injectable } from '@angular/core';
import { AppMode } from '../../../../core/models/app-mode.enum';
import * as Sentry from '@sentry/browser';
import { AppVersionService } from '../../../../core/services/app-version/app-version.service';
import { settings } from '../../../../../settings';
import { environment } from '../../../../../environments/environment';
import { LoggedInUser } from '../../../login/models/logged-in-user.model';
import { LoggingService } from './logging.service';
import { LogLevel } from './log-level.model';
import { FileLoggingService } from './file-logging.service';

@Injectable({
  providedIn: 'root'
})
export class SentryService implements LoggingService {
  constructor(private appVersionService: AppVersionService, private fileLoggingService: FileLoggingService) {}

  error(
    error: Error,
    tag?: string,
    message?: string,
    ...optionalParams: any[]
  ) {
    this.log(message, error, LogLevel.Error, tag, ...optionalParams);
  }

  debug(message: string, tag?: string, ...optionalParams: any[]) {
    this.log(message, null, LogLevel.Debug, tag, ...optionalParams);
  }

  configureLogging(appMode: AppMode) {
    const appVersion = this.appVersionService.getAppVersion();
    Sentry.init({
      beforeSend: (event, hint) => {
        try {
          if (this.fileLoggingService.isReady()) {
            this.fileLoggingService.log('Sentry beforeSend', null, LogLevel.Debug, null, event, hint);        
          }
        } catch (error) {}
        return event
      },
      dsn: environment.production ? settings.sentryDsn : null,
      transport: Sentry.Transports.FetchTransport,
      environment:
        appMode === AppMode.Prod
          ? 'regObs'
          : appMode === AppMode.Demo
          ? 'demo regObs'
          : 'test regObs',
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

  log(
    message?: string,
    error?: Error,
    level?: LogLevel,
    tag?: string,
    ...optionalParams: any[]
  ) {
    if (this.fileLoggingService.isReady()) {
      this.fileLoggingService.log(message, error, level, tag, optionalParams, error);        
    }
    if (
      message &&
      (level === LogLevel.Warning ||
        level === LogLevel.Info ||
        level === LogLevel.Error)
    ) {
      Sentry.addBreadcrumb({
        category: tag,
        data: optionalParams,
        message,
        level: (level as unknown) as Sentry.Severity
      });
    }
    if (error && level === LogLevel.Error) {
      if (error) {
        Sentry.captureException(error);
      }
    }
  }
}
