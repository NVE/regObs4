import { NgModule, APP_INITIALIZER } from '@angular/core';
import { LoggingService } from '../shared/services/logging/logging.service';
import { ConsoleLoggingService } from '../shared/services/logging/console-logging.service';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { initTranslateService } from '../../custom-translate.loader';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}
@NgModule({
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    HttpClientTestingModule,
    TranslateModule.forRoot(),
    AngularSvgIconModule.forRoot(),
    SharedModule,
  ],
  exports: [
    SharedModule
  ],
  providers: [
    { provide: TranslateLoader, useFactory: createTranslateLoader, deps: [HttpClient] },
    { provide: APP_INITIALIZER, useFactory: initTranslateService, deps: [TranslateService, UserSettingService], multi: true },
    { provide: LoggingService, useClass: ConsoleLoggingService }
  ],
})
export class TestModule { }