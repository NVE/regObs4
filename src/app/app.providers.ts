import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { RouteReuseStrategy, Routes } from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { BackgroundFetch } from '@ionic-native/background-fetch/ngx';

export class AppProviders {
    public static getProviders() {
        return [
            StatusBar,
            SplashScreen,
            { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
            Geolocation,
            Deeplinks,
            BackgroundFetch
            // ...(window.hasOwnProperty('cordova') ? this.getNativeProviders() : this.getWebProviders()),
        ];
    }

    // private static getWebProviders() {
    //     return [
    //         { provide: BackgroundFetchService, useClass: BackgroundFetchWebService },
    //         { provide: BackgroundGeolocationService, useClass: BackgroundGeolocationWebService },
    //     ];
    // }

    // private static getNativeProviders() {
    //     return [
    //         { provide: BackgroundFetchService, useClass: BackgroundFetchNativeService },
    //         { provide: BackgroundGeolocationService, useClass: BackgroundGeolocationNativeService },
    //     ];
    // }

}
