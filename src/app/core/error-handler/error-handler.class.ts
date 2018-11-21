import { ErrorHandler } from '@angular/core';
import * as Sentry from 'sentry-cordova';

export class AppErrorHandler extends ErrorHandler {
    handleError(error) {
        super.handleError(error);
        try {
            Sentry.captureException(error.originalError || error);
        } catch (e) {
            console.error(e);
        }
    }
}

