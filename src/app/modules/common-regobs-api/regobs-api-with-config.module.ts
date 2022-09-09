import { NgModule, InjectionToken, ModuleWithProviders } from '@angular/core';
import { RegobsApiConfigurationInterface, RegobsApiConfiguration } from './regobs-api-configuration';
import { HttpClientModule } from '@angular/common/http';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { RegObsApiConfigurationProvider } from './regobs-api-configuration-provider';

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
          deps: [UserSettingService, FOR_ROOT_OPTIONS_TOKEN]
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

export function regObsConfigurationFactory(
  userSettingService: UserSettingService,
  options?: RegobsApiConfigurationInterface
) {
  return options ? options : new RegObsApiConfigurationProvider(userSettingService);
}
