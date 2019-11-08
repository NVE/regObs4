/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { RegobsApiConfiguration as __Configuration } from '../regobs-api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { GeoLocationInfo } from '../models/geo-location-info';
@Injectable({
  providedIn: 'root',
})
class GeoCodeService extends __BaseService {
  static readonly GeoCodeLocationInfoPath = '/GeoCode/LocationInfo';

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
}

export { GeoCodeService }
