import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { SafariViewController } from '@awesome-cordova-plugins/safari-view-controller/ngx';
import { provideTranslateService } from '@ngx-translate/core';
import { LocalStorageBackend, Requestor, StorageBackend } from '@openid/appauth';
import { LoggingService } from '../../shared/services/logging/logging.service';
import { TestLoggingService } from '../../shared/services/logging/test-logging.service';

import { RegobsAuthService } from './regobs-auth.service';
import { AuthService, Browser, DefaultBrowser } from 'ionic-appauth';
import { authFactory } from '../factories/auth-factory';
import { httpFactory } from '../factories/http-factory';

describe('RegobsAuthService', () => {
  let service: RegobsAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideTranslateService(),
        { provide: LoggingService, useClass: TestLoggingService },
        SafariViewController,
        InAppBrowser,
        provideHttpClient(withInterceptorsFromDi()),
        {
          provide: StorageBackend,
          useFactory: () => new LocalStorageBackend(),
        },
        {
          provide: Browser,
          useClass: DefaultBrowser,
        },
        {
          provide: Requestor,
          useFactory: httpFactory,
        },
        {
          provide: AuthService,
          useFactory: authFactory,
        },
      ],
    });
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
