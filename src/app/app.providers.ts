import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { RouteReuseStrategy, Routes } from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { BackgroundFetchService } from './core/services/background-fetch/background-fetch.service';
import { BackgroundFetchWebService } from './core/services/background-fetch/background-fetch-web.service';
import { BackgroundFetchNativeService } from './core/services/background-fetch/background-fetch-native.service';
import { BackgroundGeolocationService } from './core/services/background-geolocation/background-geolocation.service';
import { BackgroundGeolocationWebService } from './core/services/background-geolocation/background-geolocation-web.service';
import { BackgroundGeolocationNativeService } from './core/services/background-geolocation/background-geolocation-native.service';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';

export class AppProviders {
    public static getProviders() {
        return [
            StatusBar,
            SplashScreen,
            { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
            Geolocation,
            Deeplinks,
            ...(window.hasOwnProperty('cordova') ? this.getNativeProviders() : this.getWebProviders()),
        ];
    }

    private static getWebProviders() {
        return [
            { provide: BackgroundFetchService, useClass: BackgroundFetchWebService },
            { provide: BackgroundGeolocationService, useClass: BackgroundGeolocationWebService },
        ];
    }

    private static getNativeProviders() {
        return [
            { provide: BackgroundFetchService, useClass: BackgroundFetchNativeService },
            { provide: BackgroundGeolocationService, useClass: BackgroundGeolocationNativeService },
        ];
    }

}
