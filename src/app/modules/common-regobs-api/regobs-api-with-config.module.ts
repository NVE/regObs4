import { NgModule, InjectionToken, ModuleWithProviders } from '@angular/core';
import { AppModeService } from 'src/app/modules/common-core/services';
import { RegobsApiConfigurationInterface, RegobsApiConfiguration } from './regobs-api-configuration';
import { RegObsApiConfigurationProvider } from './regobs-api-configuration-provider';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiInterceptor } from './api-interceptor';

export const FOR_ROOT_OPTIONS_TOKEN = new InjectionToken<RegobsApiConfigurationInterface>('forRoot() Module configuration');
export const API_KEY_TOKEN = new InjectionToken<IRegobsApiKeyProvider>('forRoot() Module configuration');

export interface IRegobsApiKeyProvider {
  apiKey: string;
}

@NgModule({
  providers: [],
  imports: [HttpClientModule],
  exports: [HttpClientModule]
})
export class RegobsApiModuleWithConfig {
  static forRoot(options?: RegobsApiConfigurationInterface): ModuleWithProviders<RegobsApiModuleWithConfig> {
    return {
      ngModule: RegobsApiModuleWithConfig,
      providers: [
        {
          provide: FOR_ROOT_OPTIONS_TOKEN,
          useValue: options
        },
        {
          provide: RegobsApiConfiguration,
          useFactory: regObsConfigurationFactory,
          deps: [AppModeService, FOR_ROOT_OPTIONS_TOKEN]
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ApiInterceptor,
          deps: [API_KEY_TOKEN, RegobsApiConfiguration],
          multi: true
        }
      ]
    };
  }
  // static forTesting(): ModuleWithProviders {
  //   return ({
  //     ngModule: RegobsApiModuleWithConfig,
  //     providers: []
  //   });
  // }
}

export function regObsConfigurationFactory(appModeService: AppModeService, options?: RegobsApiConfigurationInterface) {
  return options ? options : new RegObsApiConfigurationProvider(appModeService);
}
