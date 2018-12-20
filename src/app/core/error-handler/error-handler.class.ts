import { ErrorHandler, Injectable } from '@angular/core';
import * as Sentry from '@sentry/browser';
import { environment } from '../../../environments/environment';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
    constructor() {
    }

    handleError(error) {
        if (environment.production) {
            Sentry.captureException(error.originalError || error);
        }
        throw error;
    }
}

