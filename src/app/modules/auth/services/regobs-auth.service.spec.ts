import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { AuthorizationServiceConfiguration, Requestor, StorageBackend, TokenResponseJson } from '@openid/appauth';
import { provideTestLogger } from '../../shared/services/logging/test-logging.service';
import { RegobsAuthService, TOKEN_RESPONSE_FULL_KEY, TOKEN_RESPONSE_KEY } from './regobs-auth.service';
import { AuthService, Browser, DefaultBrowser } from 'ionic-appauth';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { httpFactory } from '../factories/http-factory';
import { TokenResponseFullJson } from './token-response-full';
import { filter, firstValueFrom } from 'rxjs';
import { RegobsAuthServiceOverride } from './regobs-auth-service-override';
import { inject } from '@angular/core';
import { ApiInterceptor } from 'src/app/core/http-interceptor/ApiInterceptor';

const TOKEN_INFO = { email: 'test@test.no' };
const TOKEN = `test.${btoa(JSON.stringify(TOKEN_INFO))}`;
const TOKEN_RESPONSE: Partial<TokenResponseJson> = {
  id_token: TOKEN,
  refresh_token: TOKEN,
  scope: 'offline_access openid',
  // NB! I Response fra b2c er token_type Bearer med stor B
  token_type: 'bearer',
  issued_at: 1764750552,
};
const TOKEN_RESPONSE_FULL: Partial<TokenResponseFullJson> = {
  id_token: TOKEN,
  // NB! I Response fra b2c er token_type Bearer med stor B
  token_type: 'bearer',
  // "not_before": 1764688915,
  // "id_token_expires_in": 86400,
  // "profile_info": "profileInfoTest",
  scope: 'offline_access openid',
  refresh_token: TOKEN,
  refresh_token_expires_in: 1182,
};

class InMemoryStorageBackend extends StorageBackend {
  db: any = {};

  override async getItem(name: string): Promise<string | null> {
    return this.db[name];
  }
  override async removeItem(name: string): Promise<void> {
    delete this.db[name];
  }
  override async clear(): Promise<void> {
    this.db = {};
  }
  override async setItem(name: string, value: string): Promise<void> {
    this.db[name] = value;
  }
}

describe('RegobsAuthService', () => {
  let service: RegobsAuthService;
  let authService: AuthService;
  let httpTesting: HttpTestingController;
  let storage: StorageBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([]),
        provideTranslateService(),
        provideTestLogger(),
        {
          provide: StorageBackend,
          useFactory: () => {
            const storage = new InMemoryStorageBackend();
            storage.db[TOKEN_RESPONSE_KEY] = JSON.stringify(TOKEN_RESPONSE);
            storage.db[TOKEN_RESPONSE_FULL_KEY] = JSON.stringify(TOKEN_RESPONSE_FULL);
            return storage;
          },
        },
        {
          provide: Browser,
          useClass: DefaultBrowser,
        },
        {
          // Requestor håndterer http kall på vegne av openId app auth
          provide: Requestor,
          useFactory: httpFactory,
        },
        {
          // authFactory initialiserer RegobsAuthServiceOverride over Ionic App Auth sin Auth Service
          provide: AuthService,
          useFactory: () => {
            const browser = inject(Browser);
            const storage = inject(StorageBackend);
            const requestor = inject(Requestor);
            const service = new RegobsAuthServiceOverride(browser, storage, requestor);
            service.authConfig = {
              server_host: '/test',
              client_id: 'test-client-id',
              redirect_url: '',
              end_session_redirect_url: '',
              scopes: '',
              pkce: true,
            };
            return service;
          },
        },
        // We rely on the HTTP_INTERCEPTORS token to register the AuthInterceptor as an HttpInterceptor
        { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
      ],
    });
    service = TestBed.inject(RegobsAuthService);
    authService = TestBed.inject(AuthService);
    httpTesting = TestBed.inject(HttpTestingController);
    storage = TestBed.inject(StorageBackend);
  });

  it('token age check should work', () => {
    const nowInSeconds = Date.now() / 1000;
    const tokenIssuedAt = nowInSeconds - 300; //5 minutes ago
    expect(service.isTokenOlderThan(tokenIssuedAt, 0)).toBeTrue();
    expect(service.isTokenOlderThan(tokenIssuedAt, 60)).toBeTrue();
    expect(service.isTokenOlderThan(tokenIssuedAt, 600)).toBeFalse();
  });

  it('auth service has token on startup', async () => {
    await authService.init();
    await firstValueFrom(authService.initComplete$.pipe(filter((v) => v === true)));
    const token = await firstValueFrom(authService.token$);
    expect(token.idToken).toBe(TOKEN_RESPONSE.id_token);
  });

  it('has loggedInUser$ on startup', async () => {
    await authService.init();
    const loggedInUser = await firstValueFrom(service.loggedInUser$);
    expect(loggedInUser.email).toBe(TOKEN_INFO.email);
  });

  it('http response 401 during tokenRefresh resets token', fakeAsync(async () => {
    // Returner testconfig for get authService.configuration
    spyOnProperty(authService, 'configuration', 'get').and.callFake(
      async () =>
        new AuthorizationServiceConfiguration({
          authorization_endpoint: '',
          token_endpoint: `/token`,
          revocation_endpoint: '',
        })
    );

    // Initialiser service
    await authService.init();

    const refreshTokenPromise = service.refreshToken();

    // OpenId AppAuth bruker nok noe async håndtering av token henting som krever at vi avanserer tiden
    // for å få API-kallet til å kjøre.
    flush();

    // Simuler at /token-kallet gir status 401
    httpTesting.expectOne('/token').flush({}, { status: 401, statusText: 'Unauthorized' });

    // Vent på refreshToken
    await refreshTokenPromise;

    // Sjekk at alle relevante token-håndterings-ting er nullstilt
    expect(await storage.getItem(TOKEN_RESPONSE_KEY)).toBe(undefined);
    expect(await firstValueFrom(authService.isAuthenticated$)).toBe(false);
    expect(await firstValueFrom(authService.token$)).toBe(undefined);
    const user = await firstValueFrom(service.loggedInUser$);
    expect(user.isLoggedIn).toBe(false);
  }));

  it('failing to fetch b2c config should not reset token', async () => {
    // Siden bare henting av b2c-config feiler, så forventer vi at shouldTokensBeCleared skal returnere false.
    // Spioner på denne så vi kan sjekke det.
    const shouldTokensBeClearedSpy = spyOn(
      authService as RegobsAuthServiceOverride,
      'shouldTokensBeCleared'
    ).and.callThrough();

    await authService.init();

    // Trigg token refresh som igjen trigger henting av config
    const refreshTokenPromise = service.refreshToken();

    // Simuler en nettverksfeil under henting av config. Dette fungerer litt som å hente config uten nett, feks.
    const req = httpTesting.expectOne('/test/.well-known/openid-configuration');
    req.error(new ProgressEvent('network error!'));

    // TODO! Bør dette gå an, eller bør det feile? - ApiInterceptoren fortsetter sånn som det er nå
    await refreshTokenPromise;

    expect(shouldTokensBeClearedSpy).toHaveBeenCalled();
    const shouldTokensBeCleared = await shouldTokensBeClearedSpy.calls.first().returnValue;
    expect(shouldTokensBeCleared).toBe(false);

    // Sjekk at innlogging fortsatt er gyldig
    expect(await storage.getItem(TOKEN_RESPONSE_KEY)).toBeDefined();
    expect(await firstValueFrom(authService.isAuthenticated$)).toBe(true);
    const token = await firstValueFrom(authService.token$);
    expect(token.idToken).toBe(TOKEN);
    const user = await firstValueFrom(service.loggedInUser$);
    expect(user.isLoggedIn).toBe(true);
  });
});
