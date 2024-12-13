import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  EnvironmentProviders,
  ErrorHandler,
  LOCALE_ID,
  NgZone,
  Provider,
  inject,
  provideAppInitializer,
} from '@angular/core';
import { Router, RouteReuseStrategy } from '@angular/router';
import { DeviceOrientation } from '@awesome-cordova-plugins/device-orientation/ngx';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';
import { SafariViewController } from '@awesome-cordova-plugins/safari-view-controller/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
// import { BackgroundDownloadWebService } from './core/services/background-download/background-download-web.service';
// import { BackgroundDownloadNativeService } from './core/services/background-download/background-download-native.service';
import { IonicRouteStrategy, isPlatform, NavController, Platform } from '@ionic/angular';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthService } from 'ionic-appauth';
import { environment } from '../environments/environment';
import { initDeepLinks } from './core/app-init/deep-links-initializer';
import { AppErrorHandler } from './core/error-handler/error-handler.class';
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
import { SearchService } from './modules/common-regobs-api';
import { ConsoleLoggingService } from './modules/shared/services/logging/console-logging.service';
import { LoggingService } from './modules/shared/services/logging/logging.service';
import { SentryService } from './modules/shared/services/logging/sentry.service';
import { OfflineMapTestService } from './core/services/offline-map/offline-map-test.service';

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

// export function initAppMode(userSettings: UserSettingService, appModeService: AppModeService){
//   return () => {
//     userSettings.appMode$.subscribe((appMode) => appModeService.setAppMode(appMode));
//   }
// }

export const APP_PROVIDERS: (Provider | EnvironmentProviders)[] = [
  { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  {
    provide: LOCALE_ID,
    useClass: DynamicLocaleId,
    deps: [TranslateService],
  },
  DeviceOrientation,
  File,
  InAppBrowser,
  SafariViewController,
  HTTP,
  WebView,
  EmailComposer,
  SQLite,
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
  provideAppInitializer(() => {
    const initializerFn = initTranslateService(inject(TranslateService), inject(UserSettingService));
    return initializerFn();
  }),
  provideAppInitializer(() => {
    const initializerFn = initDeepLinks(
      inject(Platform),
      inject(NgZone),
      inject(AuthService),
      inject(NavController),
      inject(Router)
    );
    return initializerFn();
  }),

  // @varsom-regobs-common providers
  {
    provide: COMMON_REGISTRATION_FOR_ROOT_OPTIONS_TOKEN,
    useFactory: initCommonRegistrationOptions,
    deps: [],
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
    useClass: HttpClientDownloadService,
  },
  {
    provide: SearchService,
    useClass: isPlatform('hybrid') ? OfflineCapableSearchService : SearchService,
  },
  {
    provide: OfflineMapService,
    useClass: isPlatform('hybrid') ? OfflineMapService : OfflineMapTestService,
  },
];
