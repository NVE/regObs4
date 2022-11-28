import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SafariViewController } from '@ionic-native/safari-view-controller/ngx';
import { TranslateModule } from '@ngx-translate/core';
import { StorageBackend } from '@openid/appauth';
import { UserSettingService } from '../../../core/services/user-setting/user-setting.service';
import { LoggingService } from '../../shared/services/logging/logging.service';
import { TestLoggingService } from '../../shared/services/logging/test-logging.service';
import { SharedModule } from '../../shared/shared.module';

import { RegobsAuthService } from './regobs-auth.service';

describe('RegobsAuthService', () => {
  let service: RegobsAuthService;
  const httpClient = jasmine.createSpyObj('HttpClient', ['post']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientModule,
        TranslateModule.forRoot(),
        RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }),
      ],
      providers: [{ provide: LoggingService, useClass: TestLoggingService }, SafariViewController, InAppBrowser],
    });
    TestBed.inject(UserSettingService) as jasmine.SpyObj<UserSettingService>;
    TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    service = TestBed.inject(RegobsAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('token age check should work', () => {
    const nowInSeconds = Date.now() / 1000;
    const tokenIssuedAt = nowInSeconds - 300; //5 minutes ago
    expect(service.isTokenOlderThan(tokenIssuedAt, 0)).toBeTrue();
    expect(service.isTokenOlderThan(tokenIssuedAt, 60)).toBeTrue();
    expect(service.isTokenOlderThan(tokenIssuedAt, 600)).toBeFalse();
  });
});
