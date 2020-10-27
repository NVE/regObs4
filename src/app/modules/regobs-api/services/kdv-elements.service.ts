/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { RegobsApiConfiguration as __Configuration } from '../regobs-api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { KdvElementsResponseDto } from '../models/kdv-elements-response-dto';
@Injectable({
  providedIn: 'root',
})
class KdvElementsService extends __BaseService {
  static readonly KdvElementsGetKdvsPath = '/KdvElements';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `KdvElementsService.KdvElementsGetKdvsParams` containing the following parameters:
   *
   * - `sortOrder`:
   *
   * - `langkey`: 1 = norwegian, 2 = english
   *
   * - `isActive`:
   *
   * @return OK
   */
  KdvElementsGetKdvsResponse(params: KdvElementsService.KdvElementsGetKdvsParams): __Observable<__StrictHttpResponse<KdvElementsResponseDto>> {
    let __params = this.newParams();
    const __headers = new HttpHeaders();
    const __body: any = null;
    if (params.sortOrder != null) {__params = __params.set('sortOrder', params.sortOrder.toString());}
    if (params.langkey != null) {__params = __params.set('langkey', params.langkey.toString());}
    if (params.isActive != null) {__params = __params.set('isActive', params.isActive.toString());}
    const req = new HttpRequest<any>(
      'GET',
      this.rootUrl + '/KdvElements',
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<KdvElementsResponseDto>;
      })
    );
  }
  /**
   * @param params The `KdvElementsService.KdvElementsGetKdvsParams` containing the following parameters:
   *
   * - `sortOrder`:
   *
   * - `langkey`: 1 = norwegian, 2 = english
   *
   * - `isActive`:
   *
   * @return OK
   */
  KdvElementsGetKdvs(params: KdvElementsService.KdvElementsGetKdvsParams): __Observable<KdvElementsResponseDto> {
    return this.KdvElementsGetKdvsResponse(params).pipe(
      __map(_r => _r.body as KdvElementsResponseDto)
    );
  }
}

namespace KdvElementsService {

  /**
   * Parameters for KdvElementsGetKdvs
   */
  export interface KdvElementsGetKdvsParams {
    sortOrder?: boolean;

    /**
     * 1 = norwegian, 2 = english
     */
    langkey?: number;
    isActive?: boolean;
  }
}

export { KdvElementsService };
