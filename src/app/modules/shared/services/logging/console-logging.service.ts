/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { Injectable, Optional } from '@angular/core';
import { LogLevel } from './log-level.model';
import { LoggingService } from './logging.service';
import { AppMode } from '../../../../core/models/app-mode.enum';
import { LoggedInUser } from '../../../login/models/logged-in-user.model';

@Injectable({
  providedIn: 'root'
})
export class ConsoleLoggingService implements LoggingService {

  constructor() {}

  enable(): void {}

  disable(): void {}

  configureLogging(appMode: AppMode): void {}

  setUser(user: LoggedInUser): void {}

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

  log(
    message?: string,
    error?: Error,
    level?: LogLevel,
    tag?: string,
    ...optionalParams: any[]
  ) {
    const msg = `[${level.toUpperCase()}]${
      tag ? '[' + tag + ']' : ''
    } ${message}`;
    optionalParams.length > 0
      ? console.log(msg, optionalParams)
      : console.log(msg);
    if (error) {
      console.error(error);
    }
  }
}
