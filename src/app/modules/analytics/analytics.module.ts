import { NgModule, ModuleWithProviders, Injector, inject, provideAppInitializer } from '@angular/core';
import { AnalyticService } from './services/analytic.service';

@NgModule({
  imports: [],
  declarations: [],
  exports: [],
  providers: [
    AnalyticService,
    provideAppInitializer(() => {
      const initializerFn = initializeAnalyticService(inject(AnalyticService));
      return initializerFn();
    }),
  ],
})
export class AnalyticsModule {
  static forRoot(): ModuleWithProviders<AnalyticsModule> {
    return {
      ngModule: AnalyticsModule,
    };
  }
}

export function initializeAnalyticService(analyticService: AnalyticService) {
  return () => analyticService.init();
}
