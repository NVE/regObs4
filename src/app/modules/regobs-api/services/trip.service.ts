/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { RegobsApiConfiguration as __Configuration } from '../regobs-api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { FinishTripDto } from '../models/finish-trip-dto';
import { CreateTripDto } from '../models/create-trip-dto';
import { ObsLocationElements } from '../models/obs-location-elements';
@Injectable({
  providedIn: 'root',
})
class TripService extends __BaseService {
  static readonly TripPutPath = '/Trip';
  static readonly TripPostPath = '/Trip';
  static readonly TripGetObsLocationElementsPath = '/Trip/GetObsLocationElements';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param trip undefined
   */
  TripPutResponse(trip: FinishTripDto): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = trip;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/Trip`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param trip undefined
   */
  TripPut(trip: FinishTripDto): __Observable<null> {
    return this.TripPutResponse(trip).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param trip undefined
   * @return OK
   */
  TripPostResponse(trip: CreateTripDto): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = trip;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Trip`,
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
   * @param trip undefined
   * @return OK
   */
  TripPost(trip: CreateTripDto): __Observable<{}> {
    return this.TripPostResponse(trip).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param params The `TripService.TripGetObsLocationElementsParams` containing the following parameters:
   *
   * - `utmNorth`:
   *
   * - `utmEast`:
   *
   * - `offset`:
   *
   * - `geoHazardID`:
   *
   * @return OK
   */
  TripGetObsLocationElementsResponse(params: TripService.TripGetObsLocationElementsParams): __Observable<__StrictHttpResponse<ObsLocationElements>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.utmNorth != null) __params = __params.set('utmNorth', params.utmNorth.toString());
    if (params.utmEast != null) __params = __params.set('utmEast', params.utmEast.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.geoHazardID != null) __params = __params.set('geoHazardID', params.geoHazardID.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Trip/GetObsLocationElements`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ObsLocationElements>;
      })
    );
  }
  /**
   * @param params The `TripService.TripGetObsLocationElementsParams` containing the following parameters:
   *
   * - `utmNorth`:
   *
   * - `utmEast`:
   *
   * - `offset`:
   *
   * - `geoHazardID`:
   *
   * @return OK
   */
  TripGetObsLocationElements(params: TripService.TripGetObsLocationElementsParams): __Observable<ObsLocationElements> {
    return this.TripGetObsLocationElementsResponse(params).pipe(
      __map(_r => _r.body as ObsLocationElements)
    );
  }
}

module TripService {

  /**
   * Parameters for TripGetObsLocationElements
   */
  export interface TripGetObsLocationElementsParams {
    utmNorth: number;
    utmEast: number;
    offset: number;
    geoHazardID: number;
  }
}

export { TripService }
