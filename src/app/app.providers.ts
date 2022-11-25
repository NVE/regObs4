import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, LOCALE_ID, NgZone, Provider } from '@angular/core';
import { Router, RouteReuseStrategy } from '@angular/router';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { DeviceOrientation } from '@ionic-native/device-orientation/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { File } from '@ionic-native/file/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Network } from '@ionic-native/network/ngx';
import { SafariViewController } from '@ionic-native/safari-view-controller/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
// import { BackgroundDownloadWebService } from './core/services/background-download/background-download-web.service';
// import { BackgroundDownloadNativeService } from './core/services/background-download/background-download-native.service';
import { Zip } from '@ionic-native/zip/ngx';
import { IonicRouteStrategy, isPlatform, NavController, Platform } from '@ionic/angular';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthService } from 'ionic-appauth';
import { addRxPlugin } from 'rxdb';
import { environment } from '../environments/environment';
import { initDeepLinks } from './core/app-init/deep-links-initializer';
import { AppErrorHandler } from './core/error-handler/error-handler.class';
import { AuthGuard } from './core/guards/auth.guard';
import { StartWizardGuard } from './core/guards/start-wizard.guard';
import { ApiInterceptor } from './core/http-interceptor/ApiInterceptor';
import { BackgroundDownloadService } from './core/services/background-download/background-download.service';
import { HttpClientDownloadService } from './core/services/background-download/http-client-download.service';
import { BackgroundGeolocationNativeService } from './core/services/background-geolocation/background-geolocation-native.service';
import { BackgroundGeolocationWebService } from './core/services/background-geolocation/background-geolocation-web.service';
import { BackgroundGeolocationService } from './core/services/background-geolocation/background-geolocation.service';
import { DataMarshallService } from './core/services/data-marshall/data-marshall.service';
import { OfflineMapService } from './core/services/offline-map/offline-map.service';
import { OfflineCapableSearchService } from './core/services/search-registration/offline-capable-search-service';
import { UserSettingService } from './core/services/user-setting/user-setting.service';
import { initTranslateService } from './custom-translate.loader';
import {
  FOR_ROOT_OPTIONS_TOKEN as COMMON_REGISTRATION_FOR_ROOT_OPTIONS_TOKEN,
  IRegistrationModuleOptions,
} from './modules/common-registration/module.options';
import { OfflineDbService } from './modules/common-registration/registration.services';
import { SearchService } from './modules/common-regobs-api';
import { ConsoleLoggingService } from './modules/shared/services/logging/console-logging.service';
import { LoggingService } from './modules/shared/services/logging/logging.service';
import { SentryService } from './modules/shared/services/logging/sentry.service';

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

export function initAppModeService(userSettingService: UserSettingService): any {
  return { appMode$: userSettingService.appMode$ };
}

// export function initCommonApiOptions(
//   appConfig: IAppConfig
// ): RegobsApiConfigurationInterface {
//   return { rootUrl: appConfig.api.baseUrl };
// }
export function initCommonRegistrationOptions(): IRegistrationModuleOptions {
  const options = {
    autoSync: false,
    adapter: 'idb',
    attachmentsSupported: false,
  };
  return options;
}

export function initDb(dbService: OfflineDbService) {
  return (): Promise<void> => {
    return import('pouchdb-adapter-idb').then(addRxPlugin).then(() => dbService.initDatabase('idb'));
  };
}

// export function initAppMode(userSettings: UserSettingService, appModeService: AppModeService){
//   return () => {
//     userSettings.appMode$.subscribe((appMode) => appModeService.setAppMode(appMode));
//   }
// }

export const APP_PROVIDERS: Provider[] = [
  StartWizardGuard,
  AuthGuard,
  { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  {
    provide: LOCALE_ID,
    useClass: DynamicLocaleId,
    deps: [TranslateService],
  },
  DeviceOrientation,
  File,
  AndroidPermissions,
  Zip,
  InAppBrowser,
  SafariViewController,
  HTTP,
  WebView,
  EmailComposer,
  SQLite,
  Network,
  ScreenOrientation,
  Diagnostic,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptor, // TODO: Move to auth module
    multi: true,
  },
  { provide: ErrorHandler, useClass: AppErrorHandler },
  {
    provide: LoggingService,
    useClass: environment.production ? SentryService : ConsoleLoggingService,
  },
  {
    provide: TranslateLoader,
    useFactory: createTranslateLoader,
    deps: [HttpClient],
  },

  // APP initializers
  {
    provide: APP_INITIALIZER,
    useFactory: initTranslateService,
    deps: [TranslateService, UserSettingService],
    multi: true,
  },
  {
    provide: APP_INITIALIZER,
    useFactory: initDeepLinks,
    deps: [Platform, NgZone, AuthService, NavController, Router],
    multi: true,
  },

  // @varsom-regobs-common providers
  {
    provide: COMMON_REGISTRATION_FOR_ROOT_OPTIONS_TOKEN,
    useFactory: initCommonRegistrationOptions,
    deps: [],
  },
  {
    provide: APP_INITIALIZER,
    useFactory: initDb,
    multi: true,
    deps: [OfflineDbService],
  },
  // {
  //   provide: APP_INITIALIZER,
  //   useFactory: initAppMode,
  //   multi: true,
  //   deps: [UserSettingService, AppModeService]
  // },

  // Interface implementations
  { provide: 'OnReset', useExisting: DataMarshallService, multi: true },
  { provide: 'OnReset', useExisting: UserSettingService, multi: true },
  { provide: 'OnReset', useExisting: OfflineMapService, multi: true },

  // Custom native/web providers
  {
    provide: BackgroundGeolocationService,
    useClass: isPlatform('hybrid') ? BackgroundGeolocationNativeService : BackgroundGeolocationWebService,
  },
  {
    provide: BackgroundDownloadService,
    // useClass: window.hasOwnProperty('cordova')
    //   ? BackgroundDownloadNativeService
    //   : BackgroundDownloadWebService
    // TODO: Implement Download Manager for Android
    useClass: HttpClientDownloadService,
  },
  {
    provide: SearchService,
    useClass: isPlatform('hybrid') ? OfflineCapableSearchService : SearchService,
  },
];
