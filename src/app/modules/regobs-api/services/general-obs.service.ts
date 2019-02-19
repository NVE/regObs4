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
class GeneralObsService extends __BaseService {
  static readonly GetGeneralObsPath = '/GeneralObs/{regId}';
  static readonly PutGeneralObsPath = '/GeneralObs/{regId}';
  static readonly PostGeneralObsPath = '/GeneralObs/{regId}';
  static readonly DeleteGeneralObsPath = '/GeneralObs/{regId}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param regId undefined
   */
  GetGeneralObsResponse(regId: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/GeneralObs/${regId}`,
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
   * @param regId undefined
   */
  GetGeneralObs(regId: number): __Observable<null> {
    return this.GetGeneralObsResponse(regId).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `GeneralObsService.PutGeneralObsParams` containing the following parameters:
   *
   * - `regId`:
   *
   * - `dto`:
   */
  PutGeneralObsResponse(params: GeneralObsService.PutGeneralObsParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.dto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/GeneralObs/${params.regId}`,
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
   * @param params The `GeneralObsService.PutGeneralObsParams` containing the following parameters:
   *
   * - `regId`:
   *
   * - `dto`:
   */
  PutGeneralObs(params: GeneralObsService.PutGeneralObsParams): __Observable<null> {
    return this.PutGeneralObsResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `GeneralObsService.PostGeneralObsParams` containing the following parameters:
   *
   * - `regId`:
   *
   * - `dto`:
   *
   * @return OK
   */
  PostGeneralObsResponse(params: GeneralObsService.PostGeneralObsParams): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.dto;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/GeneralObs/${params.regId}`,
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
   * @param params The `GeneralObsService.PostGeneralObsParams` containing the following parameters:
   *
   * - `regId`:
   *
   * - `dto`:
   *
   * @return OK
   */
  PostGeneralObs(params: GeneralObsService.PostGeneralObsParams): __Observable<{}> {
    return this.PostGeneralObsResponse(params).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param regId undefined
   * @return OK
   */
  DeleteGeneralObsResponse(regId: number): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/GeneralObs/${regId}`,
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
  DeleteGeneralObs(regId: number): __Observable<{}> {
    return this.DeleteGeneralObsResponse(regId).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module GeneralObsService {

  /**
   * Parameters for PutGeneralObs
   */
  export interface PutGeneralObsParams {
    regId: number;
    dto: GeneralObservationEditModel;
  }

  /**
   * Parameters for PostGeneralObs
   */
  export interface PostGeneralObsParams {
    regId: number;
    dto: GeneralObservationEditModel;
  }
}

export { GeneralObsService }
