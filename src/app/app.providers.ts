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
import { File } from '@ionic-native/file/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { BackgroundDownloadService } from './core/services/background-download/background-download.service';
import { BackgroundDownloadWebService } from './core/services/background-download/background-download-web.service';
import { BackgroundDownloadNativeService } from './core/services/background-download/background-download-native.service';
import { Zip } from '@ionic-native/zip/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { UserSettingService } from './core/services/user-setting/user-setting.service';
import { WarningService } from './core/services/warning/warning.service';
import { ErrorHandler, Provider, APP_INITIALIZER, forwardRef } from '@angular/core';
import { AppErrorHandler } from './core/error-handler/error-handler.class';
import { LoginService } from './core/services/login/login.service';
import { HTTP } from '@ionic-native/http/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './core/http-interceptor/ApiInterceptor';
import { MapService } from './modules/map/services/map/map.service';
import { Camera } from '@ionic-native/camera/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { StartWizardGuard } from './core/guards/start-wizard.guard';
import { DataMarshallService } from './core/services/data-marshall/data-marshall.service';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { LoginGuard } from './core/guards/login.guard';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { OfflineMapService } from './core/services/offline-map/offline-map.service';

export const API_INTERCEPTOR_PROVIDER: Provider = {
    provide: HTTP_INTERCEPTORS,
    useExisting: forwardRef(() => ApiInterceptor),
    multi: true
};

export const APP_PROVIDERS = [
    StatusBar,
    SplashScreen,
    StartWizardGuard,
    LoginGuard,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Geolocation,
    Deeplinks,
    BackgroundFetch,
    BackgroundGeolocation,
    File,
    AndroidPermissions,
    Zip,
    Clipboard,
    Camera,
    InAppBrowser,
    HTTP,
    WebView,
    ApiInterceptor,
    EmailComposer,
    AppVersion,
    LocalNotifications,
    Keyboard,
    SQLite,
    API_INTERCEPTOR_PROVIDER,
    { provide: ErrorHandler, useClass: AppErrorHandler },
    // Singleton services
    UserSettingService,
    MapService,
    WarningService,
    LoginService,
    DataMarshallService,
    OfflineMapService,
    // Custom native/web providers
    {
        provide: BackgroundGeolocationService, useClass: window.hasOwnProperty('cordova') ?
            BackgroundGeolocationNativeService : BackgroundGeolocationWebService
    },
    {
        provide: BackgroundDownloadService, useClass: window.hasOwnProperty('cordova') ?
            BackgroundDownloadNativeService : BackgroundDownloadWebService
    }
];
