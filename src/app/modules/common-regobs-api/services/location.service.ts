/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { RegobsApiConfiguration as __Configuration } from '../regobs-api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ObsLocationsResponseDtoV2 } from '../models/obs-locations-response-dto-v2';
@Injectable({
  providedIn: 'root',
})
class LocationService extends __BaseService {
  static readonly LocationWithinRadiusPath = '/Location/WithinRadius';
  static readonly LocationGetPath = '/Location/{locationId}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `LocationService.LocationWithinRadiusParams` containing the following parameters:
   *
   * - `radius`:
   *
   * - `longitude`:
   *
   * - `latitude`:
   *
   * - `returnCount`:
   *
   * - `geoHazardTypeIds`:
   *
   * @return OK
   */
  LocationWithinRadiusResponse(params: LocationService.LocationWithinRadiusParams): __Observable<__StrictHttpResponse<Array<ObsLocationsResponseDtoV2>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.radius != null) __params = __params.set('radius', params.radius.toString());
    if (params.longitude != null) __params = __params.set('longitude', params.longitude.toString());
    if (params.latitude != null) __params = __params.set('latitude', params.latitude.toString());
    if (params.returnCount != null) __params = __params.set('returnCount', params.returnCount.toString());
    (params.geoHazardTypeIds || []).forEach(val => {if (val != null) __params = __params.append('geoHazardTypeIds', val.toString())});
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Location/WithinRadius`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ObsLocationsResponseDtoV2>>;
      })
    );
  }
  /**
   * @param params The `LocationService.LocationWithinRadiusParams` containing the following parameters:
   *
   * - `radius`:
   *
   * - `longitude`:
   *
   * - `latitude`:
   *
   * - `returnCount`:
   *
   * - `geoHazardTypeIds`:
   *
   * @return OK
   */
  LocationWithinRadius(params: LocationService.LocationWithinRadiusParams): __Observable<Array<ObsLocationsResponseDtoV2>> {
    return this.LocationWithinRadiusResponse(params).pipe(
      __map(_r => _r.body as Array<ObsLocationsResponseDtoV2>)
    );
  }

  /**
   * @param params The `LocationService.LocationGetParams` containing the following parameters:
   *
   * - `locationId`:
   *
   * - `langKey`:
   *
   * @return OK
   */
  LocationGetResponse(params: LocationService.LocationGetParams): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.langKey != null) __params = __params.set('langKey', params.langKey.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Location/${params.locationId}`,
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
   * @param params The `LocationService.LocationGetParams` containing the following parameters:
   *
   * - `locationId`:
   *
   * - `langKey`:
   *
   * @return OK
   */
  LocationGet(params: LocationService.LocationGetParams): __Observable<{}> {
    return this.LocationGetResponse(params).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module LocationService {

  /**
   * Parameters for LocationWithinRadius
   */
  export interface LocationWithinRadiusParams {
    radius: number;
    longitude: number;
    latitude: number;
    returnCount?: number;
    geoHazardTypeIds?: Array<number>;
  }

  /**
   * Parameters for LocationGet
   */
  export interface LocationGetParams {
    locationId: number;
    langKey?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  }
}

export { LocationService }
