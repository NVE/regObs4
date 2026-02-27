import type { MockedObject } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { ApiInterceptor } from './ApiInterceptor';
import { HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { RegobsAuthService } from 'src/app/modules/auth/services/regobs-auth.service';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { StorageBackend } from '@openid/appauth';
import { ApiVersionService } from '../services/api-version/api-version.service';

describe('ApiInterceptor retry logic', () => {
  let interceptor: ApiInterceptor;
  let regobsAuthService: MockedObject<RegobsAuthService>;
  let loggerService: MockedObject<LoggingService>;
  let storage: MockedObject<StorageBackend>;
  let apiVersionService: MockedObject<ApiVersionService>;

  beforeEach(() => {
    regobsAuthService = {
      refreshToken: vi.fn().mockName('RegobsAuthService.refreshToken'),
      signIn: vi.fn().mockName('RegobsAuthService.signIn'),
      loggedInUser$: of({ token: 'token1' }),
    };
    regobsAuthService.refreshToken.mockReturnValue(Promise.resolve());

    loggerService = {
      debug: vi.fn().mockName('LoggingService.debug'),
    };
    storage = {
      setItem: vi.fn().mockName('StorageBackend.setItem'),
    };
    apiVersionService = {
      setSunsetDate: vi.fn().mockName('ApiVersionService.setSunsetDate'),
    };

    TestBed.configureTestingModule({
      providers: [
        ApiInterceptor,
        { provide: RegobsAuthService, useValue: regobsAuthService },
        { provide: LoggingService, useValue: loggerService },
        { provide: StorageBackend, useValue: storage },
        { provide: ApiVersionService, useValue: apiVersionService },
      ],
    });

    interceptor = TestBed.inject(ApiInterceptor);
  });

  it('sjekk at vi bare prøver å kjøre kall på nytt EN gang hvis vi får 401 fra Regobs-API', async () => {
    const url = 'https://api.regobs.no/v6/Search/MyRegistrations';
    const req = new HttpRequest('GET', url);

    // Spy som alltid returnerer 401
    const handleSpy = vi.fn().mockImplementation(() => {
      return throwError(() => new HttpErrorResponse({ status: 401, statusText: 'Unauthorized' }));
    });

    const handler: HttpHandler = { handle: handleSpy };

    interceptor.intercept(req, handler).subscribe({
      next: () => {
        throw new Error('Skal feile hvis vi får 401 fra Regobs-API på nytt hvis vi gjentar kallet');
      },
      error: (err) => {
        // Forventet: kun to forsøk (original + ett retry)
        expect(regobsAuthService.refreshToken).toHaveBeenCalledTimes(1);
        expect(handleSpy).toHaveBeenCalledTimes(2);
        expect(err).toEqual(expect.objectContaining({ status: 401 }));
      },
    });
  });

  it('sjekk at vi ikke kjører kall på nytt hvis api returnerer 200 OK', async () => {
    const url = 'https://api.regobs.no/v6/Search/MyRegistrations';
    const req = new HttpRequest('GET', url);

    // Spy som returnerer 200 OK på første forsøk
    const handleSpy = vi.fn().mockReturnValue(of(new HttpResponse({ status: 200, body: { ok: true } })));

    const handler: HttpHandler = { handle: handleSpy };

    interceptor.intercept(req, handler).subscribe({
      next: (event) => {
        expect(event).toEqual(expect.objectContaining({ status: 200, body: { ok: true } }));
        expect(handleSpy).toHaveBeenCalledTimes(1);
        expect(regobsAuthService.refreshToken).not.toHaveBeenCalled();
      },
      error: (err) => {
        throw new Error('Skal ikke feile: ' + err);
      },
    });
  });
});
