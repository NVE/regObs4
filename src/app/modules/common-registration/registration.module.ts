import { NgModule, ModuleWithProviders } from '@angular/core';
import { CoreModule } from '@varsom-regobs-common/core';
import { FakeItemSyncCallbackService } from './services/item-sync-callback/fake-item-sync-callback.service';
import { RegobsApiSyncCallbackService } from './services/item-sync-callback/regobs-api-sync-callback.service';
import { RegobsApiModuleWithConfig, KdvElementsService, HelptextService as HelpTextApiService } from '@varsom-regobs-common/regobs-api';
import { OfflineDbServiceOptions } from './services/offline-db/offline-db-service.options';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { GeneralObservationSummaryProvider } from './services/summary-providers/general-observation/general-observation.summary-provider';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConnectivityInterceptor } from 'ngx-connectivity';
import { NewAttachmentService } from './services/add-new-attachment/new-attachment.service';
import { throwError } from 'rxjs';
import { WeatherSummaryProvider } from './services/summary-providers/snow/weather/weather.summary-provider';
import { RegobsRegistrationPipesModule } from './registration.pipes';
import { OfflineDbNewAttachmentService } from './services/add-new-attachment/offline-db-new-attachment.service';
import { FOR_ROOT_OPTIONS_TOKEN, IRegistrationModuleOptions, SUMMARY_PROVIDER_TOKEN } from './module.options';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function offlineDbServiceOptionsFactory(options?: IRegistrationModuleOptions): OfflineDbServiceOptions {
  const offlineDbServiceOptions = new OfflineDbServiceOptions();
  // If the optional options were provided via the .forRoot() static method, then apply
  // them to the MyServiceOptions Type provider.
  if (options) {
    if (options.adapter) {
      offlineDbServiceOptions.adapter = options.adapter;
    }
  }
  return offlineDbServiceOptions;
}

export function getFakeKdvElementsService(): unknown {
  const fakeService = { KdvElementsGetKdvs: () => throwError(Error('Fake service')) };
  return fakeService;
}

export function getFakeHelpTextApiService(): unknown {
  const fakeService = { HelptextGet: () => throwError(Error('Fake service')) };
  return fakeService;
}

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader  {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const translateModuleForRoot = TranslateModule.forRoot({
  loader: {
    provide: TranslateLoader,
    useFactory: createTranslateLoader,
    deps: [HttpClient]
  }
});

@NgModule({
  imports: [
    CoreModule,
    RegobsApiModuleWithConfig,
    translateModuleForRoot,
  ],
  declarations: [],
  exports: [
    RegobsRegistrationPipesModule,
  ]
})
export class RegistrationModule {
  static forRoot(options?: IRegistrationModuleOptions): ModuleWithProviders<RegistrationModule> {
    return ({
      ngModule: RegistrationModule,
      providers: [
        {
          provide: FOR_ROOT_OPTIONS_TOKEN,
          useValue: options
        },
        {
          provide: OfflineDbServiceOptions,
          useFactory: offlineDbServiceOptionsFactory,
          deps: [FOR_ROOT_OPTIONS_TOKEN]
        },
        {
          provide: 'OfflineRegistrationSyncService', useClass: RegobsApiSyncCallbackService
        },
        {
          provide: SUMMARY_PROVIDER_TOKEN, useClass: GeneralObservationSummaryProvider, multi: true
        },
        {
          provide: SUMMARY_PROVIDER_TOKEN, useClass: WeatherSummaryProvider, multi: true
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpConnectivityInterceptor,
          multi: true
        },
        {
          provide: NewAttachmentService, useClass: OfflineDbNewAttachmentService
        },
        TranslateService,
      ]
    });
  }

  static forChild(options?: IRegistrationModuleOptions): ModuleWithProviders<RegistrationModule> {
    return RegistrationModule.forRoot(options);
  }

  static forTesting(): ModuleWithProviders<RegistrationModule> {
    return ({
      ngModule: RegistrationModule,
      providers: [
        {
          provide: FOR_ROOT_OPTIONS_TOKEN,
          useValue: { adapter: 'memory' }
        },
        {
          provide: OfflineDbServiceOptions,
          useValue: { adapter: 'memory' },
        },
        {
          provide: 'OfflineRegistrationSyncService', useClass: FakeItemSyncCallbackService
        },
        {
          provide: SUMMARY_PROVIDER_TOKEN, useClass: GeneralObservationSummaryProvider, multi: true
        },
        {
          provide: SUMMARY_PROVIDER_TOKEN, useClass: WeatherSummaryProvider, multi: true
        },
        {
          provide: NewAttachmentService, useClass: OfflineDbNewAttachmentService
        },
        { provide: KdvElementsService, useFactory: getFakeKdvElementsService },
        { provide: HelpTextApiService, useFactory: getFakeHelpTextApiService },
      ]
    });
  }
}
