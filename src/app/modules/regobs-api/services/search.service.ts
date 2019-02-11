/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { RegobsApiConfiguration as __Configuration } from '../regobs-api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { RegistrationViewModel } from '../models/registration-view-model';
import { SearchCriteriaRequestDto } from '../models/search-criteria-request-dto';
import { SearchCountResponseDto } from '../models/search-count-response-dto';
import { SearchSideBarDto } from '../models/search-side-bar-dto';
import { AtAGlanceViewModel } from '../models/at-aglance-view-model';
@Injectable({
  providedIn: 'root',
})
class SearchService extends __BaseService {
  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param criteria undefined
   * @return OK
   */
  SearchSearchResponse(criteria: SearchCriteriaRequestDto): __Observable<__StrictHttpResponse<Array<RegistrationViewModel>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = criteria;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Search`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<RegistrationViewModel>>;
      })
    );
  }
  /**
   * @param criteria undefined
   * @return OK
   */
  SearchSearch(criteria: SearchCriteriaRequestDto): __Observable<Array<RegistrationViewModel>> {
    return this.SearchSearchResponse(criteria).pipe(
      __map(_r => _r.body as Array<RegistrationViewModel>)
    );
  }

  /**
   * @param criteria undefined
   * @return OK
   */
  SearchCountResponse(criteria: SearchCriteriaRequestDto): __Observable<__StrictHttpResponse<SearchCountResponseDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = criteria;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Search/Count`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<SearchCountResponseDto>;
      })
    );
  }
  /**
   * @param criteria undefined
   * @return OK
   */
  SearchCount(criteria: SearchCriteriaRequestDto): __Observable<SearchCountResponseDto> {
    return this.SearchCountResponse(criteria).pipe(
      __map(_r => _r.body as SearchCountResponseDto)
    );
  }

  /**
   * @param params The `SearchService.SearchSearchCriteriaParams` containing the following parameters:
   *
   * - `geoHazard`:
   *
   * - `langKey`:
   *
   * @return OK
   */
  SearchSearchCriteriaResponse(params: SearchService.SearchSearchCriteriaParams): __Observable<__StrictHttpResponse<SearchSideBarDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.geoHazard != null) __params = __params.set('geoHazard', params.geoHazard.toString());
    if (params.langKey != null) __params = __params.set('langKey', params.langKey.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Search/SearchCriteria`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<SearchSideBarDto>;
      })
    );
  }
  /**
   * @param params The `SearchService.SearchSearchCriteriaParams` containing the following parameters:
   *
   * - `geoHazard`:
   *
   * - `langKey`:
   *
   * @return OK
   */
  SearchSearchCriteria(params: SearchService.SearchSearchCriteriaParams): __Observable<SearchSideBarDto> {
    return this.SearchSearchCriteriaResponse(params).pipe(
      __map(_r => _r.body as SearchSideBarDto)
    );
  }

  /**
   * @param dto undefined
   * @return OK
   */
  SearchAtAGlanceResponse(dto: SearchCriteriaRequestDto): __Observable<__StrictHttpResponse<Array<AtAGlanceViewModel>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = dto;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Search/AtAGlance`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<AtAGlanceViewModel>>;
      })
    );
  }
  /**
   * @param dto undefined
   * @return OK
   */
  SearchAtAGlance(dto: SearchCriteriaRequestDto): __Observable<Array<AtAGlanceViewModel>> {
    return this.SearchAtAGlanceResponse(dto).pipe(
      __map(_r => _r.body as Array<AtAGlanceViewModel>)
    );
  }
}

module SearchService {

  /**
   * Parameters for SearchSearchCriteria
   */
  export interface SearchSearchCriteriaParams {
    geoHazard: 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 100 | 110 | 200 | 999;
    langKey?: 1 | 2;
  }
}

export { SearchService }
