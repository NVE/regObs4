import { NgModule, InjectionToken, ModuleWithProviders } from '@angular/core';
import { RegobsApiConfigurationInterface, RegobsApiConfiguration } from './regobs-api-configuration';
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