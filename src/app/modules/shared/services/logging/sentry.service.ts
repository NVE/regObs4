import { Injectable, inject } from '@angular/core';
import { AppMode } from 'src/app/modules/common-core/models';
import * as Sentry from '@sentry/browser';
import { Capacitor } from '@capacitor/core';
import version from '../../../../../environments/version.json';
import { settings } from '../../../../../settings';
import { environment } from '../../../../../environments/environment';
import { LoggedInUser } from '../../../login/models/logged-in-user.model';
import { LoggingService } from './logging.service';
import { LogLevel } from './log-level.model';
import { FileLoggingService } from './file-logging.service';
import { makeFetchTransport } from '@sentry/browser';
import { HttpErrorResponse } from '@angular/common/http';
import { getHttpErrorResponseMessageAndCode } from 'src/app/core/helpers/http-error-response-helper';
import { RegistrationDraftErrorCode } from 'src/app/core/services/draft/draft-model';
import type { CaptureContext } from '@sentry/types';

@Injectable({
  providedIn: 'root',
})
export class SentryService implements LoggingService {
  private fileLoggingService = inject(FileLoggingService);

  private getReleaseWithPlatform(): string {
    const platform = Capacitor.getPlatform();
    const prefix = platform === 'web' ? 'web' : 'app';
    return `${prefix}@${version.version}`;
  }

  // Protected wrapper methods for easier testing
  protected sentryAddBreadcrumb(breadcrumb: Sentry.Breadcrumb): void {
    Sentry.addBreadcrumb(breadcrumb);
  }

  protected sentryCaptureMessage(message: string, context?: CaptureContext): void {
    Sentry.captureMessage(message, context);
  }

  protected sentryCaptureException(exception: unknown, context?: CaptureContext): void {
    Sentry.captureException(exception, context);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error(error: Error, tag?: string, message?: string, optionalParams?: { [key: string]: any }) {
    this.log(message, error, LogLevel.Error, tag, optionalParams);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  debug(message: string, tag?: string, optionalParams?: { [key: string]: any }) {
    this.log(message, null, LogLevel.Debug, tag, optionalParams);
  }

  configureLogging(appMode: AppMode) {
    Sentry.init({
      dsn: environment.production ? settings.sentryDsn : undefined,
      transport: makeFetchTransport,
      environment: appMode === AppMode.Prod ? 'regObs' : appMode === AppMode.Demo ? 'demo regObs' : 'test regObs',
      enabled: environment.production,
      release: this.getReleaseWithPlatform(),
      dist: version.revision,
    });
  }

  enable() {
    Sentry.init({
      dsn: environment.production ? settings.sentryDsn : undefined,
      enabled: environment.production,
    });
  }

  disable() {
    Sentry.init({
      dsn: undefined,
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  log(message?: string, error?: unknown, level?: LogLevel, tag?: string, optionalParams?: { [key: string]: any }) {
    this.fileLoggingService.log(message, error as Error, level, tag, optionalParams);
    if (message && (level === LogLevel.Warning || level === LogLevel.Info || level === LogLevel.Error)) {
      const breadcrumb: Sentry.Breadcrumb = {
        category: tag,
        message,
        level: level as Sentry.SeverityLevel,
      };

      if (optionalParams != null) {
        breadcrumb.data = { ...optionalParams };
      }

      this.sentryAddBreadcrumb(breadcrumb);
    }

    // Handle HttpErrorResponse separately for both Error and Warning levels
    if (error instanceof HttpErrorResponse && (level == LogLevel.Warning || level == LogLevel.Error)) {
      // Angular HttpErrorResponses are not instance of Error and are just logged as
      // "Object captured as exception with keys: error, headers, message, name, ok" in Sentry.
      // See https://github.com/getsentry/sentry-javascript/issues/2292.
      // Here we turn the HttpErrorResponse into useful info for Sentry.
      const { message: errorMessage, code } = getHttpErrorResponseMessageAndCode(error);

      const context: CaptureContext = {
        level: code === RegistrationDraftErrorCode.NoNetworkOrTimedOut ? 'warning' : level,
        extra: {
          status: error.status,
          statusText: error.statusText,
          error: error.error,
          message: error.message,
          url: error.url,
        },
      };

      // If the HttpErrorResponse contains an actual Error object, use captureException for better stack traces
      if (error.error instanceof Error) {
        this.sentryCaptureException(error.error, context);
      } else {
        this.sentryCaptureMessage(errorMessage, context);
      }
    } else if (error && level === LogLevel.Error) {
      // Assume instance of error, we can add additional if checks if we see that we more custom error objects are
      // thrown and we are getting more "Object captured as exception with keys" events in Sentry
      this.sentryCaptureException(error);
    }
  }
}
