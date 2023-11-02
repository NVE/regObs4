/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { Injectable, Optional } from '@angular/core';
import { LogLevel } from './log-level.model';
import { LoggingService } from './logging.service';
import { AppMode } from 'src/app/modules/common-core/models';
import { LoggedInUser } from '../../../login/models/logged-in-user.model';

@Injectable({
  providedIn: 'root',
})
export class ConsoleLoggingService implements LoggingService {
  constructor() {}

  enable(): void {}

  disable(): void {}

  configureLogging(appMode: AppMode): void {}

  setUser(user: LoggedInUser): void {}

  error(error: Error, tag?: string, message?: string, optionalParams?: { [key: string]: any }) {
    this.log(message, error, LogLevel.Error, tag, optionalParams);
  }

  debug(message: string, tag?: string, optionalParams?: { [key: string]: any }) {
    this.log(message, null, LogLevel.Debug, tag, optionalParams);
  }

  log(message?: string, error?: Error, level?: LogLevel, tag?: string, optionalParams?: { [key: string]: any }) {
    const logLevel = level || LogLevel.Debug;
    const msg = `[${logLevel.toUpperCase()}]${tag ? '[' + tag + ']' : ''} ${message}`;
    const hasOptionalParams = Object.keys(optionalParams || {}).length > 0;

    let logger: Console['error'] | Console['warn'] | Console['log'];
    switch (logLevel) {
      case LogLevel.Error:
        logger = console.error;
        break;
      case LogLevel.Warning:
        logger = console.warn;
        break;
      case LogLevel.Debug:
        logger = console.debug;
        break;
      default:
        logger = console.log;
        break;
    }

    if (hasOptionalParams) {
      logger(msg, optionalParams);
    } else {
      logger(msg);
    }

    if (error) {
      logger(error);
    }
  }
}
