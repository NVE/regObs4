/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { RegobsApiConfiguration as __Configuration } from '../regobs-api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { RegistrationViewModel } from '../models/registration-view-model';
import { CreateRegistrationResponseDto } from '../models/create-registration-response-dto';
import { CreateRegistrationRequestDto } from '../models/create-registration-request-dto';
@Injectable({
  providedIn: 'root',
})
class RegistrationService extends __BaseService {
  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `RegistrationService.RegistrationGetParams` containing the following parameters:
   *
   * - `regId`:
   *
   * - `langKey`:
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
   * - `regId`:
   *
   * - `langKey`:
   *
   * @return OK
   */
  RegistrationGet(params: RegistrationService.RegistrationGetParams): __Observable<RegistrationViewModel> {
    return this.RegistrationGetResponse(params).pipe(
      __map(_r => _r.body as RegistrationViewModel)
    );
  }

  /**
   * @param params The `RegistrationService.RegistrationGetCaamlParams` containing the following parameters:
   *
   * - `regId`:
   *
   * - `langKey`:
   *
   * @return OK
   */
  RegistrationGetCaamlResponse(params: RegistrationService.RegistrationGetCaamlParams): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Registration/GetCaaml/${params.regId}/${params.langKey}`,
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
   * @param params The `RegistrationService.RegistrationGetCaamlParams` containing the following parameters:
   *
   * - `regId`:
   *
   * - `langKey`:
   *
   * @return OK
   */
  RegistrationGetCaaml(params: RegistrationService.RegistrationGetCaamlParams): __Observable<{}> {
    return this.RegistrationGetCaamlResponse(params).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param registration undefined
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
   * @param registration undefined
   * @return OK
   */
  RegistrationInsert(registration: CreateRegistrationRequestDto): __Observable<CreateRegistrationResponseDto> {
    return this.RegistrationInsertResponse(registration).pipe(
      __map(_r => _r.body as CreateRegistrationResponseDto)
    );
  }

  /**
   * @param registration undefined
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
   * @param registration undefined
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
    regId: number;
    langKey: 1 | 2;
  }

  /**
   * Parameters for RegistrationGetCaaml
   */
  export interface RegistrationGetCaamlParams {
    regId: number;
    langKey: 1 | 2;
  }
}

export { RegistrationService }
