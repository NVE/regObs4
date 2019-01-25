/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { RegobsApiConfiguration as __Configuration } from '../regobs-api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ObserverResponseDto } from '../models/observer-response-dto';
import { ObserverGroupDto } from '../models/observer-group-dto';
import { CreateAccountRequest } from '../models/create-account-request';
@Injectable({
  providedIn: 'root',
})
class AccountService extends __BaseService {
  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return OK
   */
  AccountLoginResponse(): __Observable<__StrictHttpResponse<ObserverResponseDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Account/Login`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ObserverResponseDto>;
      })
    );
  }
  /**
   * @return OK
   */
  AccountLogin(): __Observable<ObserverResponseDto> {
    return this.AccountLoginResponse().pipe(
      __map(_r => _r.body as ObserverResponseDto)
    );
  }

  /**
   * @return OK
   */
  AccountGetObserverResponse(): __Observable<__StrictHttpResponse<ObserverResponseDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Account/GetObserver`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ObserverResponseDto>;
      })
    );
  }
  /**
   * @return OK
   */
  AccountGetObserver(): __Observable<ObserverResponseDto> {
    return this.AccountGetObserverResponse().pipe(
      __map(_r => _r.body as ObserverResponseDto)
    );
  }

  /**
   * @param guid undefined
   * @return Observer Groups
   */
  AccountGetObserverGroupsResponse(guid: string): __Observable<__StrictHttpResponse<Array<ObserverGroupDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Account/Groups/${guid}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ObserverGroupDto>>;
      })
    );
  }
  /**
   * @param guid undefined
   * @return Observer Groups
   */
  AccountGetObserverGroups(guid: string): __Observable<Array<ObserverGroupDto>> {
    return this.AccountGetObserverGroupsResponse(guid).pipe(
      __map(_r => _r.body as Array<ObserverGroupDto>)
    );
  }

  /**
   * @param dto undefined
   * @return Account created
   */
  AccountCreateAccountResponse(dto: CreateAccountRequest): __Observable<__StrictHttpResponse<ObserverResponseDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = dto;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Account/Create`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ObserverResponseDto>;
      })
    );
  }
  /**
   * @param dto undefined
   * @return Account created
   */
  AccountCreateAccount(dto: CreateAccountRequest): __Observable<ObserverResponseDto> {
    return this.AccountCreateAccountResponse(dto).pipe(
      __map(_r => _r.body as ObserverResponseDto)
    );
  }

  /**
   * @param langKey undefined
   * @return OK
   */
  AccountGetMyPageDataResponse(langKey?: 1 | 2): __Observable<__StrictHttpResponse<ObserverResponseDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (langKey != null) __params = __params.set('langKey', langKey.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Account/Mypage`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ObserverResponseDto>;
      })
    );
  }
  /**
   * @param langKey undefined
   * @return OK
   */
  AccountGetMyPageData(langKey?: 1 | 2): __Observable<ObserverResponseDto> {
    return this.AccountGetMyPageDataResponse(langKey).pipe(
      __map(_r => _r.body as ObserverResponseDto)
    );
  }
}

module AccountService {
}

export { AccountService }
