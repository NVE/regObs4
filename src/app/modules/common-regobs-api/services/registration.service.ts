/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { RegobsApiConfiguration as __Configuration } from '../regobs-api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { RegistrationViewModel } from '../models/registration-view-model';
import { RegistrationEditModel } from '../models/registration-edit-model';
@Injectable({
  providedIn: 'root',
})
class RegistrationService extends __BaseService {
  static readonly RegistrationGetPath = '/Registration/{regId}/{langKey}';
  static readonly RegistrationGetCaamlPath = '/Registration/Caaml/{regId}';
  static readonly RegistrationPlotPreviewPngPath = '/Registration/PlotPreviewPng';
  static readonly RegistrationInsertOrUpdatePath = '/Registration/{id}';
  static readonly RegistrationDeletePath = '/Registration/{id}';
  static readonly RegistrationInsertPath = '/Registration';
  static readonly RegistrationValidatePath = '/Registration/Validate/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `RegistrationService.RegistrationGetParams` containing the following parameters:
   *
   * - `regId`: Registration Id
   *
   * - `langKey`: 1 = norwegian, 2 = english, 3 = german, 4 = slovenian, 5 = swedish, 6 = italian, 7 = norwegian nynorsk.
   *
   * @return OK
   */
  RegistrationGetResponse(params: RegistrationService.RegistrationGetParams): __Observable<__StrictHttpResponse<RegistrationViewModel>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Registration/${params.regId}/${params.langKey}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RegistrationViewModel>;
      })
    );
  }
  /**
   * @param params The `RegistrationService.RegistrationGetParams` containing the following parameters:
   *
   * - `regId`: Registration Id
   *
   * - `langKey`: 1 = norwegian, 2 = english, 3 = german, 4 = slovenian, 5 = swedish, 6 = italian, 7 = norwegian nynorsk.
   *
   * @return OK
   */
  RegistrationGet(params: RegistrationService.RegistrationGetParams): __Observable<RegistrationViewModel> {
    return this.RegistrationGetResponse(params).pipe(
      __map(_r => _r.body as RegistrationViewModel)
    );
  }

  /**
   * CAAML (Canadian Avalanche Association Markup Language) is a standard
   * for the electronic representation of information pertinent to avalanche
   * safety operations. See http://caaml.org/.
   * @param regId Registration Id
   * @return OK
   */
  RegistrationGetCaamlResponse(regId: number): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Registration/Caaml/${regId}`,
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
   * CAAML (Canadian Avalanche Association Markup Language) is a standard
   * for the electronic representation of information pertinent to avalanche
   * safety operations. See http://caaml.org/.
   * @param regId Registration Id
   * @return OK
   */
  RegistrationGetCaaml(regId: number): __Observable<{}> {
    return this.RegistrationGetCaamlResponse(regId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param params The `RegistrationService.RegistrationPlotPreviewPngParams` containing the following parameters:
   *
   * - `width`:
   *
   * - `registration`: Snow profile registration
   *
   * - `height`:
   *
   * - `format`:
   *
   * - `langKey`: 1 = norwegian, 2 = english, 3 = german, 4 = slovenian, 5 = swedish, 6 = italian, 7 = norwegian nynorsk.
   *
   * @return OK
   */
  RegistrationPlotPreviewPngResponse(params: RegistrationService.RegistrationPlotPreviewPngParams): __Observable<__StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.width != null) __params = __params.set('width', params.width.toString());
    __body = params.registration;
    if (params.height != null) __params = __params.set('height', params.height.toString());
    if (params.format != null) __params = __params.set('format', params.format.toString());
    if (params.langKey != null) __params = __params.set('langKey', params.langKey.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Registration/PlotPreviewPng`,
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
   * @param params The `RegistrationService.RegistrationPlotPreviewPngParams` containing the following parameters:
   *
   * - `width`:
   *
   * - `registration`: Snow profile registration
   *
   * - `height`:
   *
   * - `format`:
   *
   * - `langKey`: 1 = norwegian, 2 = english, 3 = german, 4 = slovenian, 5 = swedish, 6 = italian, 7 = norwegian nynorsk.
   *
   * @return OK
   */
  RegistrationPlotPreviewPng(params: RegistrationService.RegistrationPlotPreviewPngParams): __Observable<{}> {
    return this.RegistrationPlotPreviewPngResponse(params).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param params The `RegistrationService.RegistrationInsertOrUpdateParams` containing the following parameters:
   *
   * - `registration`: Registration data
   *
   * - `id`: Set to regId if update existing registration, else leave blank
   *
   * - `langKey`: 1 = norwegian, 2 = english, 3 = german, 4 = slovenian, 5 = swedish, 6 = italian, 7 = norwegian nynorsk.
   *
   * - `ignoreVersionCheck`: Set this to true if you want to replace the last saved version of this registration even if your copy is outdated
   *
   * - `externalReferenceId`: External reference id, must be unique for application and in GUID format
   *
   * @return OK
   */
  RegistrationInsertOrUpdateResponse(params: RegistrationService.RegistrationInsertOrUpdateParams): __Observable<__StrictHttpResponse<RegistrationViewModel>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.registration;

    if (params.langKey != null) __params = __params.set('langKey', params.langKey.toString());
    if (params.ignoreVersionCheck != null) __params = __params.set('ignoreVersionCheck', params.ignoreVersionCheck.toString());
    if (params.externalReferenceId != null) __params = __params.set('externalReferenceId', params.externalReferenceId.toString());
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/Registration/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RegistrationViewModel>;
      })
    );
  }
  /**
   * @param params The `RegistrationService.RegistrationInsertOrUpdateParams` containing the following parameters:
   *
   * - `registration`: Registration data
   *
   * - `id`: Set to regId if update existing registration, else leave blank
   *
   * - `langKey`: 1 = norwegian, 2 = english, 3 = german, 4 = slovenian, 5 = swedish, 6 = italian, 7 = norwegian nynorsk.
   *
   * - `ignoreVersionCheck`: Set this to true if you want to replace the last saved version of this registration even if your copy is outdated
   *
   * - `externalReferenceId`: External reference id, must be unique for application and in GUID format
   *
   * @return OK
   */
  RegistrationInsertOrUpdate(params: RegistrationService.RegistrationInsertOrUpdateParams): __Observable<RegistrationViewModel> {
    return this.RegistrationInsertOrUpdateResponse(params).pipe(
      __map(_r => _r.body as RegistrationViewModel)
    );
  }

  /**
   * @param id undefined
   */
  RegistrationDeleteResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/Registration/${id}`,
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
   * @param id undefined
   */
  RegistrationDelete(id: number): __Observable<null> {
    return this.RegistrationDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Example critera for creating a new registration with one form.
   *
   *     {
   *         "GeoHazardTID": 20,
   *         "ObsLocation": {
   *         "DtObsTime": "2021-06-25T13:18:00.000Z",
   *             "Latitude": 60.919917123811992,
   *             "Longitude": 7.210167614875667,
   *         },
   *         "LandSlideObs": {
   *             "LandSlideTID": 2,
   *             "LandSlideTriggerTID": 0,
   *             "LandSlideSizeTID": 0,
   *             "Comment": "Flomskred på FV5627 løsnet fra vegskjæring 0-50m. Anslått skredvolum på veg: mindre enn 10m^3.Blokkert veglengde: Kun i grøft.",
   *             "GeoHazardTID": 20,
   *             "ActivityInfluencedTID": 220,
   *             "ForecastAccurateTID": 0,
   *             "DamageExtentTID": 0,
   *             "DtLandSlideTime": "2021-06-25T08:10:00+02:00",
   *         }
   *     }
   * @param params The `RegistrationService.RegistrationInsertParams` containing the following parameters:
   *
   * - `registration`: ObsLocation, GeoHazardTID and DtObsTime are mandatory.
   *
   * - `langKey`: 1 = norwegian, 2 = english, 3 = german, 4 = slovenian, 5 = swedish, 6 = italian, 7 = norwegian nynorsk.
   *
   * - `externalReferenceId`: Unique identifier for registration (must be in GUID format).
   *
   * @return OK
   */
  RegistrationInsertResponse(params: RegistrationService.RegistrationInsertParams): __Observable<__StrictHttpResponse<RegistrationViewModel>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.registration;
    if (params.langKey != null) __params = __params.set('langKey', params.langKey.toString());
    if (params.externalReferenceId != null) __params = __params.set('externalReferenceId', params.externalReferenceId.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Registration`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RegistrationViewModel>;
      })
    );
  }
  /**
   * Example critera for creating a new registration with one form.
   *
   *     {
   *         "GeoHazardTID": 20,
   *         "ObsLocation": {
   *         "DtObsTime": "2021-06-25T13:18:00.000Z",
   *             "Latitude": 60.919917123811992,
   *             "Longitude": 7.210167614875667,
   *         },
   *         "LandSlideObs": {
   *             "LandSlideTID": 2,
   *             "LandSlideTriggerTID": 0,
   *             "LandSlideSizeTID": 0,
   *             "Comment": "Flomskred på FV5627 løsnet fra vegskjæring 0-50m. Anslått skredvolum på veg: mindre enn 10m^3.Blokkert veglengde: Kun i grøft.",
   *             "GeoHazardTID": 20,
   *             "ActivityInfluencedTID": 220,
   *             "ForecastAccurateTID": 0,
   *             "DamageExtentTID": 0,
   *             "DtLandSlideTime": "2021-06-25T08:10:00+02:00",
   *         }
   *     }
   * @param params The `RegistrationService.RegistrationInsertParams` containing the following parameters:
   *
   * - `registration`: ObsLocation, GeoHazardTID and DtObsTime are mandatory.
   *
   * - `langKey`: 1 = norwegian, 2 = english, 3 = german, 4 = slovenian, 5 = swedish, 6 = italian, 7 = norwegian nynorsk.
   *
   * - `externalReferenceId`: Unique identifier for registration (must be in GUID format).
   *
   * @return OK
   */
  RegistrationInsert(params: RegistrationService.RegistrationInsertParams): __Observable<RegistrationViewModel> {
    return this.RegistrationInsertResponse(params).pipe(
      __map(_r => _r.body as RegistrationViewModel)
    );
  }

  /**
   * @param params The `RegistrationService.RegistrationValidateParams` containing the following parameters:
   *
   * - `registration`: Registration data
   *
   * - `id`: RegId if existing registration else null if new
   *
   * - `externalReferenceId`: External reference id, must be unique for application and in GUID format
   *
   * @return OK
   */
  RegistrationValidateResponse(params: RegistrationService.RegistrationValidateParams): __Observable<__StrictHttpResponse<RegistrationEditModel>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.registration;

    if (params.externalReferenceId != null) __params = __params.set('externalReferenceId', params.externalReferenceId.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Registration/Validate/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RegistrationEditModel>;
      })
    );
  }
  /**
   * @param params The `RegistrationService.RegistrationValidateParams` containing the following parameters:
   *
   * - `registration`: Registration data
   *
   * - `id`: RegId if existing registration else null if new
   *
   * - `externalReferenceId`: External reference id, must be unique for application and in GUID format
   *
   * @return OK
   */
  RegistrationValidate(params: RegistrationService.RegistrationValidateParams): __Observable<RegistrationEditModel> {
    return this.RegistrationValidateResponse(params).pipe(
      __map(_r => _r.body as RegistrationEditModel)
    );
  }
}

module RegistrationService {

  /**
   * Parameters for RegistrationGet
   */
  export interface RegistrationGetParams {

    /**
     * Registration Id
     */
    regId: number;

    /**
     * 1 = norwegian, 2 = english, 3 = german, 4 = slovenian, 5 = swedish, 6 = italian, 7 = norwegian nynorsk.
     */
    langKey: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  }

  /**
   * Parameters for RegistrationPlotPreviewPng
   */
  export interface RegistrationPlotPreviewPngParams {
    width: number;

    /**
     * Snow profile registration
     */
    registration: RegistrationEditModel;
    height: number;
    format: number;

    /**
     * 1 = norwegian, 2 = english, 3 = german, 4 = slovenian, 5 = swedish, 6 = italian, 7 = norwegian nynorsk.
     */
    langKey?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  }

  /**
   * Parameters for RegistrationInsertOrUpdate
   */
  export interface RegistrationInsertOrUpdateParams {

    /**
     * Registration data
     */
    registration: RegistrationEditModel;

    /**
     * Set to regId if update existing registration, else leave blank
     */
    id: number;

    /**
     * 1 = norwegian, 2 = english, 3 = german, 4 = slovenian, 5 = swedish, 6 = italian, 7 = norwegian nynorsk.
     */
    langKey?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

    /**
     * Set this to true if you want to replace the last saved version of this registration even if your copy is outdated
     */
    ignoreVersionCheck?: boolean;

    /**
     * External reference id, must be unique for application and in GUID format
     */
    externalReferenceId?: string;
  }

  /**
   * Parameters for RegistrationInsert
   */
  export interface RegistrationInsertParams {

    /**
     * ObsLocation, GeoHazardTID and DtObsTime are mandatory.
     */
    registration: RegistrationEditModel;

    /**
     * 1 = norwegian, 2 = english, 3 = german, 4 = slovenian, 5 = swedish, 6 = italian, 7 = norwegian nynorsk.
     */
    langKey?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

    /**
     * Unique identifier for registration (must be in GUID format).
     */
    externalReferenceId?: string;
  }

  /**
   * Parameters for RegistrationValidate
   */
  export interface RegistrationValidateParams {

    /**
     * Registration data
     */
    registration: RegistrationEditModel;

    /**
     * RegId if existing registration else null if new
     */
    id: number;

    /**
     * External reference id, must be unique for application and in GUID format
     */
    externalReferenceId?: string;
  }
}

export { RegistrationService }
