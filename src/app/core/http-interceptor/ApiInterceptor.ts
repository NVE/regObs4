import { tap } from 'rxjs/operators';
import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { settings } from '../../../settings';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

    private isRegObsApi(url: string) {
        return url.startsWith(settings.services.regObs.apiUrl['TEST'])
            || url.startsWith(settings.services.regObs.apiUrl['DEMO'])
            || url.startsWith(settings.services.regObs.apiUrl['PROD']);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Apply the headers
        if (this.isRegObsApi(req.url)) {
            req = req.clone({
                setHeaders: {
                    regObs_apptoken: require('../../../assets/apiKey.json').apiKey,
                    ApiJsonVersion: settings.services.regObs.apiJsonVersion
                }
            });
        }

        return next.handle(req);
    }
}
