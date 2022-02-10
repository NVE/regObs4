import { catchError, map, switchMap, tap } from 'rxjs/operators';
import {
  HttpRequest,
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
  HttpEventType
} from '@angular/common/http';
import { EMPTY, from, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { settings } from '../../../settings';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import {
  RegobsAuthService,
  TOKEN_RESPONSE_FULL_KEY
} from 'src/app/modules/auth/services/regobs-auth.service';
import { StorageBackend } from '@openid/appauth';

/**
 * Sender innloggings-token med kall til Regobs API der kallene krever at man er logget inn.
 * Hvis api-kallet feiler pga. innloggingsfeil (HTTP 401), prøver vi å fornye tokenet og kjører kallet en gang til
 */
@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(
    private regobsAuthService: RegobsAuthService,
    private loggerService: LoggingService,
    private storage: StorageBackend
  ) {}

  //return true if given url belongs to any of the protected Regobs API urls in any environment
  private isRegObsApiThatRequireLogin(url: string): boolean {
    const apiUrls = settings.services.regObs.apiUrl;
    for (const environment of Object.keys(apiUrls)) {
      const server = apiUrls[environment];
      for (const service of ['Search/MyRegistrations', 'Registration', 'Account', 'Trip']) {
        if (url.startsWith(`${server}/${service}`)) {
          return true;
        }
      }
    }
    return false;
  }

  private isB2cApi(url: string): boolean {
    return url.indexOf('/token') > -1;
  }

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.isB2cApi(req.url)) {
      return next.handle(req).pipe(
        tap((response) => {
          if (response.type === HttpEventType.Response) {
            this.storage.setItem(
              TOKEN_RESPONSE_FULL_KEY,
              JSON.stringify(response.body)
            );
          }
        })
      );
    }
    if (this.isRegObsApiThatRequireLogin(req.url) && !req.headers.has('Authorization')) {
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

  private addAuthHeader(
    request: HttpRequest<unknown>
  ): Observable<HttpRequest<unknown>> {
    return this.regobsAuthService.loggedInUser$.pipe(
      catchError((err) => {
        this.loggerService.debug(
          'Could not get valid token',
          'API interceptor',
          err
        );
        this.regobsAuthService.signIn();
        return EMPTY; //TODO: Why this?
      }),
      map((user) => {
        const headers = request.headers.set(
          'Authorization',
          `Bearer ${user.token}`
        );
        return request.clone({ headers });
      })
    );
  }

  private handleResponseError(
    error,
    request,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (error.status === 401) {
      // Vi er ikke autorisert, trolig fordi tokenet ikke er gyldig
      this.loggerService.debug(
        'Got 401 from API, trying to refresh token and repeat API-call...'
      );
      return from(this.regobsAuthService.refreshToken()).pipe(
        switchMap(() => this.addAuthHeader(request)),
        switchMap((req) => next.handle(req))
      );
    }
    throw error;
  }
}
