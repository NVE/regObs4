import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { RouteReuseStrategy, Routes } from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';
import { DeviceOrientation, DeviceOrientationCompassOptions, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Observable, of } from 'rxjs';
import { BackgroundFetchService } from './core/services/background-fetch/background-fetch.service';
import { BackgroundFetchWebService } from './core/services/background-fetch/background-fetch-web.service';
import { BackgroundFetchNativeService } from './core/services/background-fetch/background-fetch-native.service';

class DeviceOrientationMock {
    watchHeading(options?: DeviceOrientationCompassOptions): Observable<DeviceOrientationCompassHeading> {
        const testData: DeviceOrientationCompassHeading = {
            magneticHeading: 90,
            headingAccuracy: 50,
            trueHeading: 90,
            timestamp: new Date().getTime(),
        };
        return of(testData);
    }
}

export class AppProviders {
    public static getProviders() {
        return [
            StatusBar,
            SplashScreen,
            { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
            Geolocation,
            ...(window.hasOwnProperty('cordova') ? this.getNativeProviders() : this.getWebProviders()),
        ];
    }

    private static getWebProviders() {
        return [
            { provide: BackgroundFetchService, useClass: BackgroundFetchWebService }
        ];
    }

    private static getNativeProviders() {
        return [
            { provide: BackgroundFetchService, useClass: BackgroundFetchNativeService }
        ];
    }

}
