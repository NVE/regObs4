/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { AppMode } from 'src/app/modules/common-core/models';
import { LoggedInUser } from '../../../login/models/logged-in-user.model';
import { LogLevel } from './log-level.model';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root',
})
export class TestLoggingService implements LoggingService {
  configureLogging(appMode: AppMode) {}
  setUser(user: LoggedInUser) {}
  error(error: Error, tag?: string, message?: string, ...optionalParams: any[]) {}
  debug(message: string, tag?: string, ...optionalParams: any[]) {}
  log(message?: string, error?: Error, level?: LogLevel, tag?: string, ...optionalParams: any[]) {}
  enable() {}
  disable() {}
}
