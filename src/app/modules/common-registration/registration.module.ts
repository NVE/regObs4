import { NgModule, ModuleWithProviders } from '@angular/core';
import { CoreModule } from 'src/app/modules/common-core/core.module';
import { KdvElementsService, HelptextService as HelpTextApiService } from 'src/app/modules/common-regobs-api/services';
import { OfflineDbServiceOptions } from './services/offline-db/offline-db-service.options';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConnectivityInterceptor } from 'ngx-connectivity';
import { NewAttachmentService } from './services/add-new-attachment/new-attachment.service';
import { throwError } from 'rxjs';
import { RegobsRegistrationPipesModule } from './registration.pipes';
import { FOR_ROOT_OPTIONS_TOKEN, IRegistrationModuleOptions } from './module.options';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import FileAttachmentService from './services/add-new-attachment/file-attachment.service';
import { isPlatform } from '@ionic/angular';
import { RegobsApiModuleWithConfig } from '../common-regobs-api';
import { LocalStorageAttachmentService } from './services/add-new-attachment/local-storage.attachment.service';

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
  const fakeService = { KdvElementsGetKdvs: () => throwError(() => new Error('Fake service')) };
  return fakeService;
}

export function getFakeHelpTextApiService(): unknown {
  const fakeService = { HelptextGet: () => throwError(() => new Error('Fake service')) };
  return fakeService;
}

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const translateModuleForRoot = TranslateModule.forRoot({
  loader: {
    provide: TranslateLoader,
    useFactory: createTranslateLoader,
    deps: [HttpClient],
  },
});

@NgModule({
  imports: [CoreModule, RegobsApiModuleWithConfig, translateModuleForRoot],
  declarations: [],
  exports: [RegobsRegistrationPipesModule],
})
export class RegistrationModule {
  static forRoot(options?: IRegistrationModuleOptions): ModuleWithProviders<RegistrationModule> {
    return {
      ngModule: RegistrationModule,
      providers: [
        {
          provide: FOR_ROOT_OPTIONS_TOKEN,
          useValue: options,
        },
        {
          provide: OfflineDbServiceOptions,
          useFactory: offlineDbServiceOptionsFactory,
          deps: [FOR_ROOT_OPTIONS_TOKEN],
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpConnectivityInterceptor,
          multi: true,
        },
        {
          provide: NewAttachmentService,
          useClass: isPlatform('hybrid') ? FileAttachmentService : LocalStorageAttachmentService,
        },
        TranslateService,
      ],
    };
  }

  static forChild(options?: IRegistrationModuleOptions): ModuleWithProviders<RegistrationModule> {
    return RegistrationModule.forRoot(options);
  }

  static forTesting(): ModuleWithProviders<RegistrationModule> {
    return {
      ngModule: RegistrationModule,
      providers: [
        {
          provide: FOR_ROOT_OPTIONS_TOKEN,
          useValue: { adapter: 'memory' },
        },
        {
          provide: OfflineDbServiceOptions,
          useValue: { adapter: 'memory' },
        },
        {
          provide: NewAttachmentService,
          useClass: LocalStorageAttachmentService,
        },
        { provide: KdvElementsService, useFactory: getFakeKdvElementsService },
        { provide: HelpTextApiService, useFactory: getFakeHelpTextApiService },
      ],
    };
  }
}
