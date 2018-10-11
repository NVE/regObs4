import { ErrorHandler } from '@angular/core';

export class AppErrorHandler extends ErrorHandler {
    handleError(error) {
        // TODO: Log to sentry
        console.error(error);
    }
}

