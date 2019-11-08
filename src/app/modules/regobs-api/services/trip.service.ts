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
@Injectable({
  providedIn: 'root',
})
class TripService extends __BaseService {
  static readonly TripPutPath = '/Trip';
  static readonly TripPostPath = '/Trip';

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
}

module TripService {
}

export { TripService }
