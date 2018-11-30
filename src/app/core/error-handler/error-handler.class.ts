import { ErrorHandler } from '@angular/core';
import * as Sentry from 'sentry-cordova';

export class AppErrorHandler extends ErrorHandler {
    handleError(error) {
        if (error) {
            super.handleError(error);
            try {
                const err = error.originalError || error;
                if (err) {
                    Sentry.captureException(err);
                }
            } catch (e) {
                console.error(e);
            }
        }
    }
}

