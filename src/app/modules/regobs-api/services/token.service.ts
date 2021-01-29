/* tslint:disable */
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpHeaders
} from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { RegobsApiConfiguration as __Configuration } from '../regobs-api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { GetTokenResponseDto } from '../models/get-token-response-dto';
import { GetTokenRequestDto } from '../models/get-token-request-dto';
@Injectable({
  providedIn: 'root'
})
class TokenService extends __BaseService {
  static readonly TokenGetPath = '/Token/Get';

  constructor(config: __Configuration, http: HttpClient) {
    super(config, http);
  }

  /**
   * @param dto undefined
   * @return OK
   */
  TokenGetResponse(
    dto: GetTokenRequestDto
  ): __Observable<__StrictHttpResponse<GetTokenResponseDto>> {
    const __params = this.newParams();
    const __headers = new HttpHeaders();
    let __body: any = null;
    __body = dto;
    const req = new HttpRequest<any>(
      'POST',
      this.rootUrl + '/Token/Get',
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      }
    );

    return this.http.request<any>(req).pipe(
      __filter((_r) => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GetTokenResponseDto>;
      })
    );
  }
  /**
   * @param dto undefined
   * @return OK
   */
  TokenGet(dto: GetTokenRequestDto): __Observable<GetTokenResponseDto> {
    return this.TokenGetResponse(dto).pipe(
      __map((_r) => _r.body as GetTokenResponseDto)
    );
  }
}

namespace TokenService {}

export { TokenService };
