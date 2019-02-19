/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { RegobsApiConfiguration as __Configuration } from '../regobs-api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { GeneralObservationEditModel } from '../models/general-observation-edit-model';
@Injectable({
  providedIn: 'root',
})
class DangersignService extends __BaseService {
  static readonly PutDangerSignPath = '/Dangersign/{regId}';
  static readonly PostDangerSignPath = '/Dangersign/{regId}';
  static readonly DeleteDangerSignPath = '/Dangersign/{regId}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `DangersignService.PutDangerSignParams` containing the following parameters:
   *
   * - `regId`:
   *
   * - `dto`:
   */
  PutDangerSignResponse(params: DangersignService.PutDangerSignParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.dto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/Dangersign/${params.regId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `DangersignService.PutDangerSignParams` containing the following parameters:
   *
   * - `regId`:
   *
   * - `dto`:
   */
  PutDangerSign(params: DangersignService.PutDangerSignParams): __Observable<null> {
    return this.PutDangerSignResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `DangersignService.PostDangerSignParams` containing the following parameters:
   *
   * - `regId`:
   *
   * - `dto`:
   *
   * @return OK
   */
  PostDangerSignResponse(params: DangersignService.PostDangerSignParams): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.dto;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Dangersign/${params.regId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param params The `DangersignService.PostDangerSignParams` containing the following parameters:
   *
   * - `regId`:
   *
   * - `dto`:
   *
   * @return OK
   */
  PostDangerSign(params: DangersignService.PostDangerSignParams): __Observable<{}> {
    return this.PostDangerSignResponse(params).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param regId undefined
   * @return OK
   */
  DeleteDangerSignResponse(regId: number): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/Dangersign/${regId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param regId undefined
   * @return OK
   */
  DeleteDangerSign(regId: number): __Observable<{}> {
    return this.DeleteDangerSignResponse(regId).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module DangersignService {

  /**
   * Parameters for PutDangerSign
   */
  export interface PutDangerSignParams {
    regId: number;
    dto: GeneralObservationEditModel;
  }

  /**
   * Parameters for PostDangerSign
   */
  export interface PostDangerSignParams {
    regId: number;
    dto: GeneralObservationEditModel;
  }
}

export { DangersignService }
