import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { RouteReuseStrategy, Routes } from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
// import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { BackgroundFetch } from '@ionic-native/background-fetch/ngx';
import { BackgroundGeolocationNativeService } from './core/services/background-geolocation/background-geolocation-native.service';
// import { BackgroundGeolocation } from '@ionic-native/background-geolocation/ngx';
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
import { ErrorHandler, Provider, forwardRef, LOCALE_ID } from '@angular/core';
import { AppErrorHandler } from './core/error-handler/error-handler.class';
import { HTTP } from '@ionic-native/http/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './core/http-interceptor/ApiInterceptor';
import { Camera } from '@ionic-native/camera/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { StartWizardGuard } from './core/guards/start-wizard.guard';
import { DataMarshallService } from './core/services/data-marshall/data-marshall.service';
import { LoginGuard } from './core/guards/login.guard';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Network } from '@ionic-native/network/ngx';
import { LoggingService } from './modules/shared/services/logging/logging.service';
import { SentryService } from './modules/shared/services/logging/sentry.service';
import { ConsoleLoggingService } from './modules/shared/services/logging/console-logging.service';
import { environment } from '../environments/environment';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { OfflineMapService } from './core/services/offline-map/offline-map.service';
import { TranslateService } from '@ngx-translate/core';
import { ApiConfiguration } from './core/http-interceptor/api-configuration';
import { RegobsApiConfiguration } from './modules/regobs-api/regobs-api-configuration';
import { SafariViewController } from '@ionic-native/safari-view-controller/ngx';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';

export const API_INTERCEPTOR_PROVIDER: Provider = {
    provide: HTTP_INTERCEPTORS,
    useExisting: forwardRef(() => ApiInterceptor),
    multi: true
};

export class DynamicLocaleId extends String {
    constructor(protected service: TranslateService) {
        super('');
    }
    toString() {
        return this.service.currentLang;
    }
}

export const APP_PROVIDERS = [
    StatusBar,
    SplashScreen,
    StartWizardGuard,
    LoginGuard,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
        provide: LOCALE_ID,
        useClass: DynamicLocaleId,
        deps: [TranslateService]
    },
    Geolocation,
    Deeplinks,
    BackgroundFetch,
    // BackgroundGeolocation,
    File,
    AndroidPermissions,
    Zip,
    Clipboard,
    Camera,
    InAppBrowser,
    SafariViewController,
    HTTP,
    WebView,
    ApiInterceptor,
    EmailComposer,
    Keyboard,
    SQLite,
    SocialSharing,
    Network,
    ScreenOrientation,
    Diagnostic,
    API_INTERCEPTOR_PROVIDER,
    { provide: RegobsApiConfiguration, useClass: ApiConfiguration },
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: LoggingService, useClass: environment.production ? SentryService : ConsoleLoggingService },

    // Interface implementations
    { provide: 'OnReset', useClass: DataMarshallService, multi: true },
    { provide: 'OnReset', useClass: UserSettingService, multi: true },
    { provide: 'OnReset', useClass: OfflineMapService, multi: true },

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
