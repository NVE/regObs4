import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Router, RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy, NavController, Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { BackgroundGeolocationNativeService } from './core/services/background-geolocation/background-geolocation-native.service';
import { BackgroundGeolocationWebService } from './core/services/background-geolocation/background-geolocation-web.service';
import { BackgroundGeolocationService } from './core/services/background-geolocation/background-geolocation.service';
import { File } from '@ionic-native/file/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { BackgroundDownloadService } from './core/services/background-download/background-download.service';
// import { BackgroundDownloadWebService } from './core/services/background-download/background-download-web.service';
// import { BackgroundDownloadNativeService } from './core/services/background-download/background-download-native.service';
import { Zip } from '@ionic-native/zip/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { UserSettingService } from './core/services/user-setting/user-setting.service';
import {
  ErrorHandler,
  Provider,
  forwardRef,
  LOCALE_ID,
  APP_INITIALIZER,
  NgZone
} from '@angular/core';
import { AppErrorHandler } from './core/error-handler/error-handler.class';
import { HTTP } from '@ionic-native/http/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Camera } from '@ionic-native/camera/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { StartWizardGuard } from './core/guards/start-wizard.guard';
import { DataMarshallService } from './core/services/data-marshall/data-marshall.service';
import { AuthGuard } from './core/guards/auth.guard';
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
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { SafariViewController } from '@ionic-native/safari-view-controller/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { initTranslateService } from './custom-translate.loader';
import { DeviceOrientation } from '@ionic-native/device-orientation/ngx';
import { initDeepLinks } from './core/app-init/deep-links-initializer';
import { AuthService } from 'ionic-appauth';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { API_KEY_TOKEN, IRegobsApiKeyProvider } from '@varsom-regobs-common/regobs-api';
import {
  IRegistrationModuleOptions,
  FOR_ROOT_OPTIONS_TOKEN as COMMON_REGISTRATION_FOR_ROOT_OPTIONS_TOKEN,
  OfflineDbService,
  NewAttachmentService,
  OfflineDbNewAttachmentService
} from '@varsom-regobs-common/registration';
import { AppModeService } from '@varsom-regobs-common/core';
import { addRxPlugin } from 'rxdb';
import { ApiInterceptor } from './core/http-interceptor/ApiInterceptor';
import { HttpClientDownloadService } from './core/services/background-download/http-client-download.service';
import { AttachmentService } from './core/services/attachment/attachment.service';

// export const API_INTERCEPTOR_PROVIDER: Provider = {
//   provide: HTTP_INTERCEPTORS,
//   useExisting: forwardRef(() => ApiInterceptor),
//   multi: true
// };

export class DynamicLocaleId extends String {
  constructor(protected service: TranslateService) {
    super('');
  }
  toString(): string {
    return this.service.currentLang;
  }
}

function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

export function initCommonApiKey(): IRegobsApiKeyProvider {
  return { apiKey: require('../assets/apikey.json').apiKey };
}

export function initAppModeService(userSettingService: UserSettingService): any {
  return { appMode$: userSettingService.appMode$  };
}

// export function initCommonApiOptions(
//   appConfig: IAppConfig
// ): RegobsApiConfigurationInterface {
//   return { rootUrl: appConfig.api.baseUrl };
// }
export function initCommonRegistrationOptions(
): IRegistrationModuleOptions {
  const options = {
    autoSync: false,
    adapter: 'idb',
    attachmentsSupported: false
  };
  return options;
}

export function initDb(dbService: OfflineDbService) {
  return (): Promise<void> =>  {
    return import('pouchdb-adapter-idb').then(addRxPlugin).then(() => dbService.initDatabase('idb'));
  };
}

// export function initAppMode(userSettings: UserSettingService, appModeService: AppModeService){
//   return () => {
//     userSettings.appMode$.subscribe((appMode) => appModeService.setAppMode(appMode));
//   }
// }

export const APP_PROVIDERS = [
  StatusBar,
  SplashScreen,
  StartWizardGuard,
  AuthGuard,
  { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  {
    provide: LOCALE_ID,
    useClass: DynamicLocaleId,
    deps: [TranslateService]
  },
  Geolocation,
  DeviceOrientation,
  File,
  AndroidPermissions,
  Zip,
  Clipboard,
  Camera,
  InAppBrowser,
  SafariViewController,
  HTTP,
  WebView,
  EmailComposer,
  Keyboard,
  SQLite,
  SocialSharing,
  Network,
  ScreenOrientation,
  Diagnostic,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptor, // TODO: Move to auth module
    multi: true
  },
  // API_INTERCEPTOR_PROVIDER,
  // { provide: RegobsApiConfiguration, useClass: ApiConfiguration },

  { provide: ErrorHandler, useClass: AppErrorHandler },
  {
    provide: LoggingService,
    useClass: environment.production ? SentryService : ConsoleLoggingService
  },
  {
    provide: TranslateLoader,
    useFactory: createTranslateLoader,
    deps: [HttpClient]
  },

  // APP initializers
  {
    provide: APP_INITIALIZER,
    useFactory: initTranslateService,
    deps: [TranslateService, UserSettingService],
    multi: true
  },
  {
    provide: APP_INITIALIZER,
    useFactory: initDeepLinks,
    deps: [Platform, NgZone, AuthService, NavController, Router],
    multi: true
  },

  // @varsom-regobs-common providers
  {
    provide: API_KEY_TOKEN,
    useFactory: initCommonApiKey,
  },
  {
    provide: AppModeService,
    useFactory: initAppModeService,
    deps: [UserSettingService]
  },
  // {
  //   provide: FOR_ROOT_OPTIONS_TOKEN,
  //   useFactory: initCommonApiOptions,
  //   deps: [APP_CONFIG]
  // },
  {
    provide: COMMON_REGISTRATION_FOR_ROOT_OPTIONS_TOKEN,
    useFactory: initCommonRegistrationOptions,
    deps: []
  },
  {
    provide: APP_INITIALIZER,
    useFactory: initDb,
    multi: true,
    deps: [OfflineDbService]
  },
  // {
  //   provide: APP_INITIALIZER,
  //   useFactory: initAppMode,
  //   multi: true,
  //   deps: [UserSettingService, AppModeService]
  // },
  {
    provide: NewAttachmentService,
    // TODO: useClass: window.hasOwnProperty('cordova') ? AttachmentService : OfflineDbNewAttachmentService
    useClass: AttachmentService
  },

  // Interface implementations
  { provide: 'OnReset', useExisting: DataMarshallService, multi: true },
  { provide: 'OnReset', useExisting: UserSettingService, multi: true },
  { provide: 'OnReset', useExisting: OfflineMapService, multi: true },

  // Custom native/web providers
  {
    provide: BackgroundGeolocationService,
    useClass: window.hasOwnProperty('cordova')
      ? BackgroundGeolocationNativeService
      : BackgroundGeolocationWebService
  },
  {
    provide: BackgroundDownloadService,
    // useClass: window.hasOwnProperty('cordova')
    //   ? BackgroundDownloadNativeService
    //   : BackgroundDownloadWebService
    // TODO: Implement Download Manager for Android
    useClass: HttpClientDownloadService
  }
];
