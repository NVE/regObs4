import { ErrorHandler, Injectable } from '@angular/core';
import * as Sentry from 'sentry-cordova';
import { environment } from '../../../environments/environment';
import { Network } from '@ionic-native/network/ngx';
import { Platform } from '@ionic/angular';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
    constructor(private network: Network, private platform: Platform) {

    }

    handleError(error: any) {
        try {
            const err = error.originalError || error;
            if (err) {
                if (environment.production) {
                    // TODO: Remove this line when plugin issue is resolved
                    // https://github.com/getsentry/sentry-cordova/issues/56
                    const isOsAndOffline = this.platform.is('cordova') && this.platform.is('ios')
                        && (this.network.type === this.network.Connection.NONE || this.network.type === this.network.Connection.UNKNOWN);
                    if (!isOsAndOffline) {
                        Sentry.captureException(err);
                    }
                } else {
                    console.error(err);
                }
            }
        } catch (e) {
            console.error(e);
        }
    }
}

