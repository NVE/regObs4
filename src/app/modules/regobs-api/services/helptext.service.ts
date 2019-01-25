/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { RegobsApiConfiguration as __Configuration } from '../regobs-api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { HelptextDto } from '../models/helptext-dto';
@Injectable({
  providedIn: 'root',
})
class HelptextService extends __BaseService {
  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param langKey undefined
   * @return OK
   */
  HelptextGetResponse(langKey: number): __Observable<__StrictHttpResponse<Array<HelptextDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (langKey != null) __params = __params.set('langKey', langKey.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/HelpText`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<HelptextDto>>;
      })
    );
  }
  /**
   * @param langKey undefined
   * @return OK
   */
  HelptextGet(langKey: number): __Observable<Array<HelptextDto>> {
    return this.HelptextGetResponse(langKey).pipe(
      __map(_r => _r.body as Array<HelptextDto>)
    );
  }
}

module HelptextService {
}

export { HelptextService }
