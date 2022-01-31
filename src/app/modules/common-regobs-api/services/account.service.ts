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
import { MyPageData } from '../models/my-page-data';
import { ObserverPatchRequestDto } from '../models/observer-patch-request-dto';
@Injectable({
  providedIn: 'root',
})
class AccountService extends __BaseService {
  static readonly AccountGetObserverPath = '/Account/GetObserver';
  static readonly AccountGetObserverGroupsPath = '/Account/Groups';
  static readonly AccountGetAccountGroupsByGuidPath = '/Account/Groups/{guid}';
  static readonly AccountGetMyPageDataPath = '/Account/Mypage';
  static readonly AccountUpdateObserverPath = '/Account/UpdateObserver';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
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
   * @return Observer Groups
   */
  AccountGetObserverGroupsResponse(): __Observable<__StrictHttpResponse<Array<ObserverGroupDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Account/Groups`,
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
   * @return Observer Groups
   */
  AccountGetObserverGroups(): __Observable<Array<ObserverGroupDto>> {
    return this.AccountGetObserverGroupsResponse().pipe(
      __map(_r => _r.body as Array<ObserverGroupDto>)
    );
  }

  /**
   * @param guid undefined
   * @return Observer Groups
   */
  AccountGetAccountGroupsByGuidResponse(guid: string): __Observable<__StrictHttpResponse<Array<ObserverGroupDto>>> {
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
  AccountGetAccountGroupsByGuid(guid: string): __Observable<Array<ObserverGroupDto>> {
    return this.AccountGetAccountGroupsByGuidResponse(guid).pipe(
      __map(_r => _r.body as Array<ObserverGroupDto>)
    );
  }

  /**
   * @param langKey undefined
   * @return OK
   */
  AccountGetMyPageDataResponse(langKey?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8): __Observable<__StrictHttpResponse<MyPageData>> {
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
        return _r as __StrictHttpResponse<MyPageData>;
      })
    );
  }
  /**
   * @param langKey undefined
   * @return OK
   */
  AccountGetMyPageData(langKey?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8): __Observable<MyPageData> {
    return this.AccountGetMyPageDataResponse(langKey).pipe(
      __map(_r => _r.body as MyPageData)
    );
  }

  /**
   * @param observerPatchRequestDto undefined
   * @return OK
   */
  AccountUpdateObserverResponse(observerPatchRequestDto: ObserverPatchRequestDto): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = observerPatchRequestDto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/Account/UpdateObserver`,
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
   * @param observerPatchRequestDto undefined
   * @return OK
   */
  AccountUpdateObserver(observerPatchRequestDto: ObserverPatchRequestDto): __Observable<{}> {
    return this.AccountUpdateObserverResponse(observerPatchRequestDto).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module AccountService {
}

export { AccountService }
