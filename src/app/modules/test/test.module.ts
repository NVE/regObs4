import { NgModule, APP_INITIALIZER } from '@angular/core';
import { LoggingService } from '../shared/services/logging/logging.service';
import { ConsoleLoggingService } from '../shared/services/logging/console-logging.service';
import { SharedModule } from '../shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { CustomTranslateLoader } from '../../custom-translate.loader';
import { IonicModule } from '@ionic/angular';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

export function initTranslateService(translateService: TranslateService) {
  return () => {
    translateService.addLangs(['nb', 'en']);
    translateService.setDefaultLang('nb');
  };
}

@NgModule({
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    HttpClientTestingModule,
    IonicModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoader
      }
    }),
    AngularSvgIconModule.forRoot(),
    SharedModule,
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: initTranslateService, deps: [TranslateService], multi: true },
    { provide: LoggingService, useClass: ConsoleLoggingService }
  ],
})
export class TestModule { }