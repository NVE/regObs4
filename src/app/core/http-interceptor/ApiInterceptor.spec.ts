import { TestBed } from '@angular/core/testing';
import { ApiInterceptor } from './ApiInterceptor';
import { HttpHandler, HttpRequest, HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { RegobsAuthService } from 'src/app/modules/auth/services/regobs-auth.service';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { StorageBackend } from '@openid/appauth';
import { ApiVersionService } from '../services/api-version/api-version.service';

describe('ApiInterceptor', () => {
  let interceptor: ApiInterceptor;
  let regobsAuthService: jasmine.SpyObj<RegobsAuthService>;
  let loggerService: jasmine.SpyObj<LoggingService>;
  let storage: jasmine.SpyObj<StorageBackend>;
  let apiVersionService: jasmine.SpyObj<ApiVersionService>;

  beforeEach(() => {
    regobsAuthService = jasmine.createSpyObj('RegobsAuthService', ['loggedInUser$', 'refreshToken', 'signIn'], {
      loggedInUser$: of({ token: 'token1' }),
    });
    regobsAuthService.refreshToken.and.returnValue(Promise.resolve());

    loggerService = jasmine.createSpyObj('LoggingService', ['debug']);
    storage = jasmine.createSpyObj('StorageBackend', ['setItem']);
    apiVersionService = jasmine.createSpyObj('ApiVersionService', ['setSunsetDate']);

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

  it('should refresh token and retry request on 401 from Regobs API', (done) => {
    // Arrange
    const url = 'https://api.nve.no/regobs/v6/Search/MyRegistrations';
    const req = new HttpRequest('GET', url);

    // Lag en spy for handle
    const handleSpy = jasmine.createSpy('handle').and.callFake((request: HttpRequest<any>) => {
      // Første kall gir 401, andre kall gir suksess
      if (handleSpy.calls.count() === 1) {
        return throwError(() => new HttpErrorResponse({ status: 401, statusText: 'Unauthorized' }));
      }
      return of(new HttpResponse({ status: 200, body: { ok: true } }));
    });

    const handler: HttpHandler = { handle: handleSpy };

    // Act
    interceptor.intercept(req, handler).subscribe({
      next: (event: HttpEvent<any>) => {
        // Assert
        expect(regobsAuthService.refreshToken).toHaveBeenCalled();
        expect(handleSpy).toHaveBeenCalledTimes(2);
        expect(event).toEqual(jasmine.objectContaining({ status: 200, body: { ok: true } }));
        done();
      },
      error: (err) => {
        fail('Should not error: ' + err);
        done();
      },
    });
  });

  it('should fail if API keeps returning 401 even after token refresh', (done) => {
    // Arrange
    const url = 'https://api.nve.no/regobs/v6/Search/MyRegistrations';
    const req = new HttpRequest('GET', url);

    // Spy som alltid returnerer 401
    const handleSpy = jasmine.createSpy('handle').and.callFake(() => {
      return throwError(() => new HttpErrorResponse({ status: 401, statusText: 'Unauthorized' }));
    });

    const handler: HttpHandler = { handle: handleSpy };

    // Act
    interceptor.intercept(req, handler).subscribe({
      next: () => {
        fail('Should not succeed when API always returns 401');
        done();
      },
      error: (err) => {
        // Assert
        expect(regobsAuthService.refreshToken).toHaveBeenCalled();
        expect(handleSpy).toHaveBeenCalledTimes(2); // Første forsøk + ett retry
        expect(err).toEqual(jasmine.objectContaining({ status: 401 }));
        done();
      },
    });
  });
});
