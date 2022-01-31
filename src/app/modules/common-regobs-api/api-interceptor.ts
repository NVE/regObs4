import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRegobsApiKeyProvider } from './regobs-api-with-config.module';
import { RegobsApiConfiguration } from './regobs-api-configuration';

export class ApiInterceptor implements HttpInterceptor {
    constructor(private apiKeyProvider: IRegobsApiKeyProvider, private regobsApiConfiguration: RegobsApiConfiguration) {
    }

    private isRegObsApi(url: string) {
        return url.startsWith(this.regobsApiConfiguration.rootUrl);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Apply the headers
        if (this.isRegObsApi(req.url)) {
            req = req.clone({
                setHeaders: {
                    regObs_apptoken: this.apiKeyProvider.apiKey
                }
            });
        }

        return next.handle(req);
    }
}
