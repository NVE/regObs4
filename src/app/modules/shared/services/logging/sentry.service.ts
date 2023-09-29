import { Injectable } from '@angular/core';
import { AppMode } from 'src/app/modules/common-core/models';
import * as Sentry from '@sentry/browser';
import version from '../../../../../environments/version.json';
import { settings } from '../../../../../settings';
import { environment } from '../../../../../environments/environment';
import { LoggedInUser } from '../../../login/models/logged-in-user.model';
import { LoggingService } from './logging.service';
import { LogLevel } from './log-level.model';
import { FileLoggingService } from './file-logging.service';
import { makeFetchTransport } from '@sentry/browser';

@Injectable({
  providedIn: 'root',
})
export class SentryService implements LoggingService {
  constructor(private fileLoggingService: FileLoggingService) {}

  error(error: Error, tag?: string, message?: string, optionalParams?: { [key: string]: any }) {
    this.log(message, error, LogLevel.Error, tag, optionalParams);
  }

  debug(message: string, tag?: string, optionalParams?: { [key: string]: any }) {
    this.log(message, null, LogLevel.Debug, tag, optionalParams);
  }

  configureLogging(appMode: AppMode) {
    Sentry.init({
      dsn: environment.production ? settings.sentryDsn : null,
      transport: makeFetchTransport,
      environment: appMode === AppMode.Prod ? 'regObs' : appMode === AppMode.Demo ? 'demo regObs' : 'test regObs',
      enabled: environment.production,
      release: version.version,
      dist: version.revision,
    });
  }

  enable() {
    Sentry.init({
      dsn: environment.production ? settings.sentryDsn : null,
      enabled: environment.production,
    });
  }

  disable() {
    Sentry.init({
      dsn: null,
      enabled: false,
    });
  }

  setUser(user: LoggedInUser) {
    if (user && user.email) {
      Sentry.configureScope((scope) => {
        scope.setUser({ email: user.email });
      });
    }
  }

  log(message?: string, error?: Error, level?: LogLevel, tag?: string, optionalParams?: { [key: string]: any }) {
    this.fileLoggingService.log(message, error, level, tag, optionalParams);
    if (message && (level === LogLevel.Warning || level === LogLevel.Info || level === LogLevel.Error)) {
      const breadcrumb: Sentry.Breadcrumb = {
        category: tag,
        message,
        level: level as unknown as Sentry.SeverityLevel,
      };

      if (optionalParams != null) {
        breadcrumb.data = { ...optionalParams };
      }

      Sentry.addBreadcrumb(breadcrumb);
    }
    if (error && level === LogLevel.Error) {
      if (error) {
        Sentry.captureException(error);
      }
    }
  }
}
