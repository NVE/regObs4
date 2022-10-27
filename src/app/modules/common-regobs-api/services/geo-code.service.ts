/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { RegobsApiConfiguration as __Configuration } from '../regobs-api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { GeoLocationInfo } from '../models/geo-location-info';
import { GeoLocationSummary } from '../models/geo-location-summary';
@Injectable({
  providedIn: 'root',
})
class GeoCodeService extends __BaseService {
  static readonly GeoCodeLocationInfoPath = '/GeoCode/LocationInfo';
  static readonly GeoCodeLocationSummaryPath = '/GeoCode/LocationSummary';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `GeoCodeService.GeoCodeLocationInfoParams` containing the following parameters:
   *
   * - `longitude`:
   *
   * - `latitude`:
   *
   * - `geoHazardId`:
   *
   * @return OK
   */
  GeoCodeLocationInfoResponse(params: GeoCodeService.GeoCodeLocationInfoParams): __Observable<__StrictHttpResponse<GeoLocationInfo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.longitude != null) __params = __params.set('longitude', params.longitude.toString());
    if (params.latitude != null) __params = __params.set('latitude', params.latitude.toString());
    if (params.geoHazardId != null) __params = __params.set('geoHazardId', params.geoHazardId.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/GeoCode/LocationInfo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GeoLocationInfo>;
      })
    );
  }
  /**
   * @param params The `GeoCodeService.GeoCodeLocationInfoParams` containing the following parameters:
   *
   * - `longitude`:
   *
   * - `latitude`:
   *
   * - `geoHazardId`:
   *
   * @return OK
   */
  GeoCodeLocationInfo(params: GeoCodeService.GeoCodeLocationInfoParams): __Observable<GeoLocationInfo> {
    return this.GeoCodeLocationInfoResponse(params).pipe(
      __map(_r => _r.body as GeoLocationInfo)
    );
  }

  /**
   * Get preformatted geolocation info.
   *
   * The response contains a header and one to three lines of geolocation info, depending on what kind of geolocation info the API has available.
   * The header may be empty if no geolocation info is available, but at least the position is always returned (line 1).
   *
   * Example JSON response:
   *
   * ```json
   * {
   *     "Header": "Lom",
   *     "Lines": [
   *         "61,636°N, 8,313°Ø, 2469 moh",
   *         "Lom kommune",
   *         "Varslingsregion Jotunheimen"
   *     ]
   * }
   * ```
   * @param params The `GeoCodeService.GeoCodeLocationSummaryParams` containing the following parameters:
   *
   * - `longitude`: Longitude
   *
   * - `latitude`: Latitude
   *
   * - `langKey`: Language key, 1 = NO, 2 = EN etc
   *
   * - `geoHazardId`: Geohazard id, eg. 10 = Snow/Avalanche
   *
   * @return OK
   */
  GeoCodeLocationSummaryResponse(params: GeoCodeService.GeoCodeLocationSummaryParams): __Observable<__StrictHttpResponse<GeoLocationSummary>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.longitude != null) __params = __params.set('longitude', params.longitude.toString());
    if (params.latitude != null) __params = __params.set('latitude', params.latitude.toString());
    if (params.langKey != null) __params = __params.set('langKey', params.langKey.toString());
    if (params.geoHazardId != null) __params = __params.set('geoHazardId', params.geoHazardId.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/GeoCode/LocationSummary`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GeoLocationSummary>;
      })
    );
  }
  /**
   * Get preformatted geolocation info.
   *
   * The response contains a header and one to three lines of geolocation info, depending on what kind of geolocation info the API has available.
   * The header may be empty if no geolocation info is available, but at least the position is always returned (line 1).
   *
   * Example JSON response:
   *
   * ```json
   * {
   *     "Header": "Lom",
   *     "Lines": [
   *         "61,636°N, 8,313°Ø, 2469 moh",
   *         "Lom kommune",
   *         "Varslingsregion Jotunheimen"
   *     ]
   * }
   * ```
   * @param params The `GeoCodeService.GeoCodeLocationSummaryParams` containing the following parameters:
   *
   * - `longitude`: Longitude
   *
   * - `latitude`: Latitude
   *
   * - `langKey`: Language key, 1 = NO, 2 = EN etc
   *
   * - `geoHazardId`: Geohazard id, eg. 10 = Snow/Avalanche
   *
   * @return OK
   */
  GeoCodeLocationSummary(params: GeoCodeService.GeoCodeLocationSummaryParams): __Observable<GeoLocationSummary> {
    return this.GeoCodeLocationSummaryResponse(params).pipe(
      __map(_r => _r.body as GeoLocationSummary)
    );
  }
}

module GeoCodeService {

  /**
   * Parameters for GeoCodeLocationInfo
   */
  export interface GeoCodeLocationInfoParams {
    longitude: number;
    latitude: number;
    geoHazardId: number;
  }

  /**
   * Parameters for GeoCodeLocationSummary
   */
  export interface GeoCodeLocationSummaryParams {

    /**
     * Longitude
     */
    longitude: number;

    /**
     * Latitude
     */
    latitude: number;

    /**
     * Language key, 1 = NO, 2 = EN etc
     */
    langKey: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

    /**
     * Geohazard id, eg. 10 = Snow/Avalanche
     */
    geoHazardId: number;
  }
}

export { GeoCodeService }
