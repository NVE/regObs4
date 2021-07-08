import { catchError, switchMap, tap } from 'rxjs/operators';
import {
  HttpRequest,
  HttpInterceptor,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { EMPTY, from, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { settings } from '../../../settings';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { RegobsAuthService } from 'src/app/modules/auth/services/regobs-auth.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private regobsAuthService: RegobsAuthService, private loggerService: LoggingService) {
  }

  private isRegObsApi(url: string) {
    return (
      url.startsWith(`${settings.services.regObs.apiUrl['TEST']}/Registration`) ||
      url.startsWith(`${settings.services.regObs.apiUrl['DEMO']}/Registration`) ||
      url.startsWith(`${settings.services.regObs.apiUrl['PROD']}/Registration`) ||
      url.startsWith(`${settings.services.regObs.apiUrl['TEST']}/Account`) ||
      url.startsWith(`${settings.services.regObs.apiUrl['DEMO']}/Account`) ||
      url.startsWith(`${settings.services.regObs.apiUrl['PROD']}/Account`)
    );
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Apply the headers
    if (this.isRegObsApi(req.url) && !req.headers.has('Authorization')) {
      return from(this.regobsAuthService.getValidToken()).pipe(catchError((err) => {
        // TODO: Route to login
        this.loggerService.debug('Could not get valid token', 'API interceptor', err);
        this.regobsAuthService.signIn();
        return EMPTY;
      }), switchMap((result) => {
          const headers = req.headers.set(
            'Authorization',
            `Bearer ${result.idToken}`
          );

          const requestClone = req.clone({ headers });
          return next.handle(requestClone);
      }));
    }

    return next.handle(req);
  }
}
