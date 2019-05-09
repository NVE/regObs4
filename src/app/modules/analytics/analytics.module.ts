import { NgModule, ModuleWithProviders, APP_INITIALIZER, Injector } from '@angular/core';
import { AnalyticService } from './services/analytic.service';

@NgModule({
    imports: [
    ],
    declarations: [

    ],
    exports: [

    ],
    providers: [
        AnalyticService,
        {
            provide: APP_INITIALIZER,
            useFactory: initializeAnalyticService,
            multi: true,
            deps: [AnalyticService]
        },
    ]
})
export class AnalyticsModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AnalyticsModule,
        };
    }
}

function initializeAnalyticService(analyticService: AnalyticService) {
    return () => analyticService.init();
}
