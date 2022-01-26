import { Injectable, Optional } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(@Optional() private logger: NGXLogger) { }

  log(message: unknown, ...additional: unknown[]) {
    if (this.logger) {
      this.logger.log(message, additional);
    }
  }

  trace(message: unknown, ...additional: unknown[]) {
    if (this.logger) {
      this.logger.trace(message, additional);
    }
  }

  debug(message: unknown, ...additional: unknown[]) {
    if (this.logger) {
      this.logger.debug(message, additional);
    }
  }

  info(message: unknown, ...additional: unknown[]) {
    if (this.logger) {
      this.logger.info(message, additional);
    }
  }

  warn(message: unknown, ...additional: unknown[]) {
    if (this.logger) {
      this.logger.warn(message, additional);
    }
  }

  error(message: unknown, ...additional: unknown[]) {
    if (this.logger) {
      this.logger.error(message, additional);
    }
  }

  fatal(message: unknown, ...additional: unknown[]) {
    if (this.logger) {
      this.logger.fatal(message, additional);
    }
  }
}
