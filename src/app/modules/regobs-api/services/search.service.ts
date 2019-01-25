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
import { SearchCountDto } from '../models/search-count-dto';
import { SearchSideBarDto } from '../models/search-side-bar-dto';
import { NearByRegistrationRequestDto } from '../models/near-by-registration-request-dto';
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
   * @param params The `SearchService.SearchRssParams` containing the following parameters:
   *
   * - `geoHazard`:
   *
   * - `criteria`:
   *
   * @return OK
   */
  SearchRssResponse(params: SearchService.SearchRssParams): __Observable<__StrictHttpResponse<Array<RegistrationViewModel>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.geoHazard != null) __params = __params.set('geoHazard', params.geoHazard.toString());
    __body = params.criteria;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Search/Rss`,
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
   * @param params The `SearchService.SearchRssParams` containing the following parameters:
   *
   * - `geoHazard`:
   *
   * - `criteria`:
   *
   * @return OK
   */
  SearchRss(params: SearchService.SearchRssParams): __Observable<Array<RegistrationViewModel>> {
    return this.SearchRssResponse(params).pipe(
      __map(_r => _r.body as Array<RegistrationViewModel>)
    );
  }

  /**
   * @param criteria undefined
   * @return OK
   */
  SearchCountResponse(criteria: SearchCriteriaRequestDto): __Observable<__StrictHttpResponse<SearchCountDto>> {
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
        return _r as __StrictHttpResponse<SearchCountDto>;
      })
    );
  }
  /**
   * @param criteria undefined
   * @return OK
   */
  SearchCount(criteria: SearchCriteriaRequestDto): __Observable<SearchCountDto> {
    return this.SearchCountResponse(criteria).pipe(
      __map(_r => _r.body as SearchCountDto)
    );
  }

  /**
   * @param criteria undefined
   * @return OK
   */
  SearchAllResponse(criteria: SearchCriteriaRequestDto): __Observable<__StrictHttpResponse<Array<RegistrationViewModel>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = criteria;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Search/All`,
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
  SearchAll(criteria: SearchCriteriaRequestDto): __Observable<Array<RegistrationViewModel>> {
    return this.SearchAllResponse(criteria).pipe(
      __map(_r => _r.body as Array<RegistrationViewModel>)
    );
  }

  /**
   * @param criteria undefined
   * @return OK
   */
  SearchLandSlideResponse(criteria: SearchCriteriaRequestDto): __Observable<__StrictHttpResponse<Array<RegistrationViewModel>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = criteria;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Search/LandSlide`,
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
  SearchLandSlide(criteria: SearchCriteriaRequestDto): __Observable<Array<RegistrationViewModel>> {
    return this.SearchLandSlideResponse(criteria).pipe(
      __map(_r => _r.body as Array<RegistrationViewModel>)
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
   * @param criteria undefined
   * @return OK
   */
  SearchIceResponse(criteria: SearchCriteriaRequestDto): __Observable<__StrictHttpResponse<Array<RegistrationViewModel>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = criteria;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Search/Ice`,
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
  SearchIce(criteria: SearchCriteriaRequestDto): __Observable<Array<RegistrationViewModel>> {
    return this.SearchIceResponse(criteria).pipe(
      __map(_r => _r.body as Array<RegistrationViewModel>)
    );
  }

  /**
   * @param criteria undefined
   * @return OK
   */
  SearchFloodResponse(criteria: SearchCriteriaRequestDto): __Observable<__StrictHttpResponse<Array<RegistrationViewModel>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = criteria;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Search/Flood`,
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
  SearchFlood(criteria: SearchCriteriaRequestDto): __Observable<Array<RegistrationViewModel>> {
    return this.SearchFloodResponse(criteria).pipe(
      __map(_r => _r.body as Array<RegistrationViewModel>)
    );
  }

  /**
   * @param criteria undefined
   * @return OK
   */
  SearchAvalancheResponse(criteria: SearchCriteriaRequestDto): __Observable<__StrictHttpResponse<Array<RegistrationViewModel>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = criteria;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Search/Avalanche`,
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
  SearchAvalanche(criteria: SearchCriteriaRequestDto): __Observable<Array<RegistrationViewModel>> {
    return this.SearchAvalancheResponse(criteria).pipe(
      __map(_r => _r.body as Array<RegistrationViewModel>)
    );
  }

  /**
   * @param dto undefined
   * @return OK
   */
  SearchWithinRadiusResponse(dto: NearByRegistrationRequestDto): __Observable<__StrictHttpResponse<Array<RegistrationViewModel>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = dto;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Search/WithinRadius`,
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
   * @param dto undefined
   * @return OK
   */
  SearchWithinRadius(dto: NearByRegistrationRequestDto): __Observable<Array<RegistrationViewModel>> {
    return this.SearchWithinRadiusResponse(dto).pipe(
      __map(_r => _r.body as Array<RegistrationViewModel>)
    );
  }
}

module SearchService {

  /**
   * Parameters for SearchRss
   */
  export interface SearchRssParams {
    geoHazard: number;
    criteria: SearchCriteriaRequestDto;
  }

  /**
   * Parameters for SearchSearchCriteria
   */
  export interface SearchSearchCriteriaParams {
    geoHazard: 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 100 | 110 | 200 | 999;
    langKey?: number;
  }
}

export { SearchService }
