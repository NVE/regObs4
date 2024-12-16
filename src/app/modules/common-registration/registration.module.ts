import { NgModule, ModuleWithProviders } from '@angular/core';
import { KdvElementsService, HelptextService as HelpTextApiService } from 'src/app/modules/common-regobs-api/services';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { NewAttachmentService } from './services/add-new-attachment/new-attachment.service';
import { throwError } from 'rxjs';
import { RegobsRegistrationPipesModule } from './registration.pipes';
import { FOR_ROOT_OPTIONS_TOKEN, IRegistrationModuleOptions } from './module.options';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import FileAttachmentService from './services/add-new-attachment/file-attachment.service';
import { isPlatform } from '@ionic/angular/standalone';
import { RegobsApiModuleWithConfig } from '../common-regobs-api';
import { LocalStorageAttachmentService } from './services/add-new-attachment/local-storage.attachment.service';
import { WebAttachmentService } from './services/add-new-attachment/web-attachment.service';

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
  imports: [RegobsApiModuleWithConfig, translateModuleForRoot],
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
          provide: NewAttachmentService,
          useClass: isPlatform('hybrid') ? FileAttachmentService : WebAttachmentService,
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
          provide: NewAttachmentService,
          useClass: LocalStorageAttachmentService,
        },
        { provide: KdvElementsService, useFactory: getFakeKdvElementsService },
        { provide: HelpTextApiService, useFactory: getFakeHelpTextApiService },
      ],
    };
  }
}
