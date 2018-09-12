import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { RouteReuseStrategy, Routes } from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { BackgroundFetch } from '@ionic-native/background-fetch/ngx';
import { BackgroundGeolocationNativeService } from './core/services/background-geolocation/background-geolocation-native.service';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation/ngx';
import { BackgroundGeolocationWebService } from './core/services/background-geolocation/background-geolocation-web.service';
import { BackgroundGeolocationService } from './core/services/background-geolocation/background-geolocation.service';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClientService } from './core/services/http-client-service/http-client.service';
import { HttpClientWebService } from './core/services/http-client-service/http-client-web.service';
import { HttpClientNativeService } from './core/services/http-client-service/http-client-native.service';

export class AppProviders {
    public static getProviders() {
        return [
            StatusBar,
            SplashScreen,
            { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
            Geolocation,
            Deeplinks,
            BackgroundFetch,
            BackgroundGeolocation,
            HTTP,
            ...(window.hasOwnProperty('cordova') ? this.getNativeProviders() : this.getWebProviders()),
        ];
    }

    private static getWebProviders() {
        return [
            { provide: HttpClientService, useClass: HttpClientWebService },
            { provide: BackgroundGeolocationService, useClass: BackgroundGeolocationWebService },
        ];
    }

    private static getNativeProviders() {
        return [
            { provide: HttpClientService, useClass: HttpClientWebService },
            { provide: BackgroundGeolocationService, useClass: BackgroundGeolocationNativeService },
        ];
    }

}
