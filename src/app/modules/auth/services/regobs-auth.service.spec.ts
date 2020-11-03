import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SafariViewController } from '@ionic-native/safari-view-controller/ngx';
import { AlertController, NavController } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserSettingService } from '../../../core/services/user-setting/user-setting.service';
import { LoggingService } from '../../shared/services/logging/logging.service';
import { SharedModule } from '../../shared/shared.module';

import { RegobsAuthService } from './regobs-auth.service';

describe('RegobsAuthService', () => {
  let service: RegobsAuthService;
  let userSettingService: jasmine.SpyObj<UserSettingService>;
  let httpClient: jasmine.SpyObj<HttpClient>;
  let logger: jasmine.SpyObj<LoggingService>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, HttpClientModule, TranslateModule.forRoot(), RouterModule.forRoot([])],
      providers: [{ provide: LoggingService, useClass: logger }, SafariViewController, InAppBrowser]
    });
    userSettingService = TestBed.inject(UserSettingService) as jasmine.SpyObj<UserSettingService>;
    httpClient = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    logger = TestBed.inject(LoggingService) as jasmine.SpyObj<LoggingService>;
    service = TestBed.inject(RegobsAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
