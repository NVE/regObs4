import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { RouteReuseStrategy, Routes } from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';
import { DeviceOrientation, DeviceOrientationCompassOptions, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Observable, of } from 'rxjs';

class DeviceOrientationMock {
    watchHeading(options?: DeviceOrientationCompassOptions): Observable<DeviceOrientationCompassHeading> {
        const testData: DeviceOrientationCompassHeading = { magneticHeading: 90, headingAccuracy: 50, trueHeading: 90, timestamp: new Date().getTime() };
        return of(testData);
    }
}

export class AppProviders {

    public static getProviders() {

        let providers;

        if (document.URL.includes('https://') || document.URL.includes('http://')) {

            // Use browser providers
            providers = [
                StatusBar,
                SplashScreen,
                { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
                Geolocation,
                { provide: DeviceOrientation, useClass: DeviceOrientationMock },
            ];

        } else {

            // Use device providers
            providers = [
                StatusBar,
                SplashScreen,
                { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
                Geolocation,
                DeviceOrientation,
            ];

        }

        return providers;

    }

}