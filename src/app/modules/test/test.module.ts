import { NgModule, APP_INITIALIZER } from '@angular/core';
import { LoggingService } from '../shared/services/logging/logging.service';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { initTranslateService } from '../../custom-translate.loader';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TestLoggingService } from '../shared/services/logging/test-logging.service';

function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}
@NgModule({
  exports: [SharedModule],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    TranslateModule.forRoot(),
    AngularSvgIconModule.forRoot(),
    SharedModule,
  ],
  providers: [
    {
      provide: TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [HttpClient],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initTranslateService,
      deps: [TranslateService, UserSettingService],
      multi: true,
    },
    { provide: LoggingService, useClass: TestLoggingService },
    provideHttpClient(withInterceptorsFromDi()),
    provideHttpClientTesting(),
  ],
})
export class TestModule {}
