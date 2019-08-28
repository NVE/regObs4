/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { RegobsApiConfiguration as __Configuration } from '../regobs-api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { RegistrationViewModel } from '../models/registration-view-model';
import { CreateRegistrationRequestDto } from '../models/create-registration-request-dto';
import { CreateRegistrationResponseDto } from '../models/create-registration-response-dto';
@Injectable({
  providedIn: 'root',
})
class RegistrationService extends __BaseService {
  static readonly RegistrationGetPath = '/Registration/{regId}/{langKey}';
  static readonly RegistrationGetCaamlPath = '/Registration/Caaml/{regId}';
  static readonly RegistrationPlotPreviewPngPath = '/Registration/PlotPreviewPng';
  static readonly RegistrationInsertPath = '/Registration';
  static readonly RegistrationValidatePath = '/Registration/Validate';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `RegistrationService.RegistrationGetParams` containing the following parameters:
   *
   * - `regId`: Registration Id
   *
   * - `langKey`: 1 = norwegian, 2 = english
   *
   * @return OK
   */
  RegistrationGetResponse(params: RegistrationService.RegistrationGetParams): __Observable<__StrictHttpResponse<RegistrationViewModel>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Registration/${params.regId}/${params.langKey}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RegistrationViewModel>;
      })
    );
  }
  /**
   * @param params The `RegistrationService.RegistrationGetParams` containing the following parameters:
   *
   * - `regId`: Registration Id
   *
   * - `langKey`: 1 = norwegian, 2 = english
   *
   * @return OK
   */
  RegistrationGet(params: RegistrationService.RegistrationGetParams): __Observable<RegistrationViewModel> {
    return this.RegistrationGetResponse(params).pipe(
      __map(_r => _r.body as RegistrationViewModel)
    );
  }

  /**
   * CAAML (Canadian Avalanche Association Markup Language) is a standard
   * for the electronic representation of information pertinent to avalanche
   * safety operations. See http://caaml.org/.
   * @param regId Registration Id
   * @return OK
   */
  RegistrationGetCaamlResponse(regId: number): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Registration/Caaml/${regId}`,
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
   * CAAML (Canadian Avalanche Association Markup Language) is a standard
   * for the electronic representation of information pertinent to avalanche
   * safety operations. See http://caaml.org/.
   * @param regId Registration Id
   * @return OK
   */
  RegistrationGetCaaml(regId: number): __Observable<{}> {
    return this.RegistrationGetCaamlResponse(regId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param params The `RegistrationService.RegistrationPlotPreviewPngParams` containing the following parameters:
   *
   * - `width`:
   *
   * - `registration`: Snow profile registration
   *
   * - `height`:
   *
   * - `format`:
   *
   * - `langKey`: 1 = norwegian, 2 = english
   *
   * @return OK
   */
  RegistrationPlotPreviewPngResponse(params: RegistrationService.RegistrationPlotPreviewPngParams): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.width != null) __params = __params.set('width', params.width.toString());
    __body = params.registration;
    if (params.height != null) __params = __params.set('height', params.height.toString());
    if (params.format != null) __params = __params.set('format', params.format.toString());
    if (params.langKey != null) __params = __params.set('langKey', params.langKey.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Registration/PlotPreviewPng`,
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
   * @param params The `RegistrationService.RegistrationPlotPreviewPngParams` containing the following parameters:
   *
   * - `width`:
   *
   * - `registration`: Snow profile registration
   *
   * - `height`:
   *
   * - `format`:
   *
   * - `langKey`: 1 = norwegian, 2 = english
   *
   * @return OK
   */
  RegistrationPlotPreviewPng(params: RegistrationService.RegistrationPlotPreviewPngParams): __Observable<{}> {
    return this.RegistrationPlotPreviewPngResponse(params).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param registration Registration data
   * @return OK
   */
  RegistrationInsertResponse(registration: CreateRegistrationRequestDto): __Observable<__StrictHttpResponse<CreateRegistrationResponseDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = registration;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Registration`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CreateRegistrationResponseDto>;
      })
    );
  }
  /**
   * @param registration Registration data
   * @return OK
   */
  RegistrationInsert(registration: CreateRegistrationRequestDto): __Observable<CreateRegistrationResponseDto> {
    return this.RegistrationInsertResponse(registration).pipe(
      __map(_r => _r.body as CreateRegistrationResponseDto)
    );
  }

  /**
   * @param registration Registration data
   * @return OK
   */
  RegistrationValidateResponse(registration: CreateRegistrationRequestDto): __Observable<__StrictHttpResponse<CreateRegistrationResponseDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = registration;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Registration/Validate`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CreateRegistrationResponseDto>;
      })
    );
  }
  /**
   * @param registration Registration data
   * @return OK
   */
  RegistrationValidate(registration: CreateRegistrationRequestDto): __Observable<CreateRegistrationResponseDto> {
    return this.RegistrationValidateResponse(registration).pipe(
      __map(_r => _r.body as CreateRegistrationResponseDto)
    );
  }
}

module RegistrationService {

  /**
   * Parameters for RegistrationGet
   */
  export interface RegistrationGetParams {

    /**
     * Registration Id
     */
    regId: number;

    /**
     * 1 = norwegian, 2 = english
     */
    langKey: 1 | 2;
  }

  /**
   * Parameters for RegistrationPlotPreviewPng
   */
  export interface RegistrationPlotPreviewPngParams {
    width: number;

    /**
     * Snow profile registration
     */
    registration: CreateRegistrationRequestDto;
    height: number;
    format: number;

    /**
     * 1 = norwegian, 2 = english
     */
    langKey?: 1 | 2;
  }
}

export { RegistrationService }
