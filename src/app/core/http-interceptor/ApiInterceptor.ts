import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';
import { EMPTY, from, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { settings } from '../../../settings';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { RegobsAuthService, TOKEN_RESPONSE_FULL_KEY } from 'src/app/modules/auth/services/regobs-auth.service';
import { StorageBackend } from '@openid/appauth';

/**
 * Sender innloggings-token med kall til Regobs API der kallene krever at man er logget inn.
 * Hvis api-kallet feiler pga. innloggingsfeil (HTTP 401), prøver vi å fornye tokenet og kjører kallet en gang til
 */
@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private regobsAuthService: RegobsAuthService, private loggerService: LoggingService, private storage: StorageBackend) {}

  private isRegObsApi(url: string): boolean {
    return (
      url.startsWith(`${settings.services.regObs.apiUrl['TEST']}/Registration`) ||
      url.startsWith(`${settings.services.regObs.apiUrl['DEMO']}/Registration`) ||
      url.startsWith(`${settings.services.regObs.apiUrl['PROD']}/Registration`) ||
      url.startsWith(`${settings.services.regObs.apiUrl['TEST']}/Account`) ||
      url.startsWith(`${settings.services.regObs.apiUrl['DEMO']}/Account`) ||
      url.startsWith(`${settings.services.regObs.apiUrl['PROD']}/Account`) ||
      url.startsWith(`${settings.services.regObs.apiUrl['TEST']}/Location/WithinRadius`) ||
      url.startsWith(`${settings.services.regObs.apiUrl['DEMO']}/Location/WithinRadius`) ||
      url.startsWith(`${settings.services.regObs.apiUrl['PROD']}/Location/WithinRadius`) ||
      url.startsWith(`${settings.services.regObs.apiUrl['TEST']}/Search/MyRegistrations`) ||
      url.startsWith(`${settings.services.regObs.apiUrl['DEMO']}/Search/MyRegistrations`) ||
      url.startsWith(`${settings.services.regObs.apiUrl['PROD']}/Search/MyRegistrations`) ||
      url.startsWith(`${settings.services.regObs.apiUrl['TEST']}/Trip`) ||
      url.startsWith(`${settings.services.regObs.apiUrl['DEMO']}/Trip`) ||
      url.startsWith(`${settings.services.regObs.apiUrl['PROD']}/Trip`)
    );
  }

  private isB2cApi(url: string): boolean {
    return url.indexOf('/token') > -1;
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.isB2cApi(req.url)) {
      return next.handle(req).pipe(
        tap((response) => {
          if (response.type === HttpEventType.Response) {
            this.storage.setItem(TOKEN_RESPONSE_FULL_KEY, JSON.stringify(response.body));
          }
        })
      );
    }
    if (this.isRegObsApi(req.url) && !req.headers.has('Authorization')) {
      return this.addAuthHeader(req).pipe(
        switchMap((requestWithAuthHeader) => {
          return next.handle(requestWithAuthHeader).pipe(
            catchError((err) => {
              return this.handleResponseError(err, requestWithAuthHeader, next);
            })
          );
        })
      );
    }
    return next.handle(req);
  }

  private addAuthHeader(request: HttpRequest<unknown>): Observable<HttpRequest<unknown>> {
    return this.regobsAuthService.loggedInUser$.pipe(
      catchError((err) => {
        this.loggerService.debug('Could not get valid token', 'API interceptor', err);
        this.regobsAuthService.signIn();
        return EMPTY; //TODO: Why this?
      }),
      map((user) => {
        const headers = request.headers.set('Authorization', `Bearer ${user.token}`);
        return request.clone({ headers });
      })
    );
  }

  private handleResponseError(error, request, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (error.status === 401) {
      // Vi er ikke autorisert, trolig fordi tokenet ikke er gyldig
      this.loggerService.debug('Got 401 from API, trying to refresh token and repeat API-call...');
      return from(this.regobsAuthService.refreshToken()).pipe(
        switchMap(() => this.addAuthHeader(request)),
        switchMap((req) => next.handle(req))
      );
    }
    throw error;
  }
}
