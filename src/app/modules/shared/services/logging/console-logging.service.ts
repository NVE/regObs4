import { Injectable } from '@angular/core';
import { LogLevel } from './log-level.model';
import { LoggingService } from './logging.service';
import { AppMode } from '../../../../core/models/app-mode.enum';
import { LoggedInUser } from '../../../login/models/logged-in-user.model';
const stringify = require('json-stringify-safe');

@Injectable({
  providedIn: 'root'
})
export class ConsoleLoggingService implements LoggingService {

  constructor() {
  }

  configureLogging(appMode: AppMode) { }

  setUser(user: LoggedInUser) { }

  error(error: Error, tag?: string, message?: string, ...optionalParams: any[]) {
    this.log(message, error, LogLevel.Error, tag, ...optionalParams);
  }

  debug(message: string, tag?: string, ...optionalParams: any[]) {
    this.log(message, null, LogLevel.Debug, tag, ...optionalParams);
  }

  log(message?: string, error?: Error, level?: LogLevel, tag?: string, ...optionalParams: any[]) {
    const msg = `[${level.toUpperCase()}]${tag ? '[' + tag + ']' : ''} ${message}`;
    switch (level) {
      case LogLevel.Warning:
      case LogLevel.Error:
        optionalParams.length > 0 ? console.log(msg, optionalParams) : console.log(msg);
        throw (error);
      default:
        optionalParams.length > 0 ? console.log(msg, optionalParams) : console.log(msg);
        break;
    }
  }
}
