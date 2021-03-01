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

import { RegistrationViewModel } from '../models/registration-view-model';
import { SearchCriteriaRequestDto } from '../models/search-criteria-request-dto';
import { SearchCountResponseDto } from '../models/search-count-response-dto';
import { SearchSideBarDto } from '../models/search-side-bar-dto';
import { SearchSideBarRequestDto } from '../models/search-side-bar-request-dto';
import { AtAGlanceViewModel } from '../models/at-aglance-view-model';
@Injectable({
  providedIn: 'root'
})
class SearchService extends __BaseService {
  static readonly SearchSearchPath = '/Search';
  static readonly SearchCountPath = '/Search/Count';
  static readonly SearchSearchCriteriaPath = '/Search/SearchCriteria';
  static readonly SearchAtAGlancePath = '/Search/AtAGlance';

  constructor(config: __Configuration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Example critera for returning the 10 newest registrations:
   * <code>
   *     { "NumberOfRecords": 10 }
   * </code>
   * @param criteria Search criteria.
   * @return OK
   */
  SearchSearchResponse(
    criteria: SearchCriteriaRequestDto
  ): __Observable<__StrictHttpResponse<Array<RegistrationViewModel>>> {
    const __params = this.newParams();
    const __headers = new HttpHeaders();
    let __body: any = null;
    __body = criteria;
    const req = new HttpRequest<any>('POST', this.rootUrl + '/Search', __body, {
      headers: __headers,
      params: __params,
      responseType: 'json'
    });

    return this.http.request<any>(req).pipe(
      __filter((_r) => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<RegistrationViewModel>>;
      })
    );
  }
  /**
   * Example critera for returning the 10 newest registrations:
   * <code>
   *     { "NumberOfRecords": 10 }
   * </code>
   * @param criteria Search criteria.
   * @return OK
   */
  SearchSearch(
    criteria: SearchCriteriaRequestDto
  ): __Observable<Array<RegistrationViewModel>> {
    return this.SearchSearchResponse(criteria).pipe(
      __map((_r) => _r.body as Array<RegistrationViewModel>)
    );
  }

  /**
   * @param criteria Search criteria
   * @return OK
   */
  SearchCountResponse(
    criteria: SearchCriteriaRequestDto
  ): __Observable<__StrictHttpResponse<SearchCountResponseDto>> {
    const __params = this.newParams();
    const __headers = new HttpHeaders();
    let __body: any = null;
    __body = criteria;
    const req = new HttpRequest<any>(
      'POST',
      this.rootUrl + '/Search/Count',
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
        return _r as __StrictHttpResponse<SearchCountResponseDto>;
      })
    );
  }
  /**
   * @param criteria Search criteria
   * @return OK
   */
  SearchCount(
    criteria: SearchCriteriaRequestDto
  ): __Observable<SearchCountResponseDto> {
    return this.SearchCountResponse(criteria).pipe(
      __map((_r) => _r.body as SearchCountResponseDto)
    );
  }

  /**
   * @param request
   * @return OK
   */
  SearchSearchCriteriaResponse(
    request: SearchSideBarRequestDto
  ): __Observable<__StrictHttpResponse<SearchSideBarDto>> {
    const __params = this.newParams();
    const __headers = new HttpHeaders();
    let __body: any = null;
    __body = request;
    const req = new HttpRequest<any>(
      'POST',
      this.rootUrl + '/Search/SearchCriteria',
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
        return _r as __StrictHttpResponse<SearchSideBarDto>;
      })
    );
  }
  /**
   * @param request
   * @return OK
   */
  SearchSearchCriteria(
    request: SearchSideBarRequestDto
  ): __Observable<SearchSideBarDto> {
    return this.SearchSearchCriteriaResponse(request).pipe(
      __map((_r) => _r.body as SearchSideBarDto)
    );
  }

  /**
   * @param criteria Search criteria
   * @return OK
   */
  SearchAtAGlanceResponse(
    criteria: SearchCriteriaRequestDto
  ): __Observable<__StrictHttpResponse<Array<AtAGlanceViewModel>>> {
    const __params = this.newParams();
    const __headers = new HttpHeaders();
    let __body: any = null;
    __body = criteria;
    const req = new HttpRequest<any>(
      'POST',
      this.rootUrl + '/Search/AtAGlance',
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
        return _r as __StrictHttpResponse<Array<AtAGlanceViewModel>>;
      })
    );
  }
  /**
   * @param criteria Search criteria
   * @return OK
   */
  SearchAtAGlance(
    criteria: SearchCriteriaRequestDto
  ): __Observable<Array<AtAGlanceViewModel>> {
    return this.SearchAtAGlanceResponse(criteria).pipe(
      __map((_r) => _r.body as Array<AtAGlanceViewModel>)
    );
  }
}

namespace SearchService {}

export { SearchService };
