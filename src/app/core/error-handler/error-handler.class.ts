import { ErrorHandler, Injectable } from '@angular/core';
import * as Sentry from 'sentry-cordova';
import { environment } from '../../../environments/environment';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
    handleError(error: any) {
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

