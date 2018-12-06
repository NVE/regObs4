import { ErrorHandler } from '@angular/core';
import * as Sentry from 'sentry-cordova';
import { environment } from '../../../environments/environment';

export class AppErrorHandler extends ErrorHandler {
    handleError(error) {
        try {
            const err = error.originalError || error;
            if (err) {
                if (environment.production) {
                    Sentry.captureException(err);
                } else {
                    console.error(err);
                }
            }
        } catch (e) {
            console.error(e);
        }
    }
}

