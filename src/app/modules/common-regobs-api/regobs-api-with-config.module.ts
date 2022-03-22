import { NgModule, InjectionToken, ModuleWithProviders } from '@angular/core';
import { AppModeService } from 'src/app/modules/common-core/services';
import { RegobsApiConfigurationInterface, RegobsApiConfiguration } from './regobs-api-configuration';
import { RegObsApiConfigurationProvider } from './regobs-api-configuration-provider';
import { HttpClientModule } from '@angular/common/http';

export const FOR_ROOT_OPTIONS_TOKEN = new InjectionToken<RegobsApiConfigurationInterface>('forRoot() Module configuration');


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
