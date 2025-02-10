import { ErrorHandler, Injectable, inject } from '@angular/core';
import { LoggingService } from '../../modules/shared/services/logging/logging.service';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
  private loggingService = inject(LoggingService);

  handleError(error: Error) {
    this.loggingService.error(error, 'UnhandledException', 'Unhandled exception occurred in app.');
    throw error;
  }
}
