/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { RegobsApiConfiguration as __Configuration } from '../regobs-api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
class AttachmentService extends __BaseService {
  static readonly AttachmentPostPath = '/Attachment/Upload';
  static readonly AttachmentGetPath = '/Attachment/{format}/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param file Attachment to upload
   * @return OK
   */
  AttachmentPostResponse(file: Blob): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let __formData = new FormData();
    __body = __formData;
    if (file != null) { __formData.append('file', file as string | Blob);}
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Attachment/Upload`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<string>;
      })
    );
  }
  /**
   * @param file Attachment to upload
   * @return OK
   */
  AttachmentPost(file: Blob): __Observable<string> {
    return this.AttachmentPostResponse(file).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * @param params The `AttachmentService.AttachmentGetParams` containing the following parameters:
   *
   * - `id`: Attachment id
   *
   * - `format`: Image format. For video, use Raw. Possible image formats: Raw, Original, Large, Medium, Thumbnail
   */
  AttachmentGetResponse(params: AttachmentService.AttachmentGetParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Attachment/${params.format}/${params.id}`,
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
   * @param params The `AttachmentService.AttachmentGetParams` containing the following parameters:
   *
   * - `id`: Attachment id
   *
   * - `format`: Image format. For video, use Raw. Possible image formats: Raw, Original, Large, Medium, Thumbnail
   */
  AttachmentGet(params: AttachmentService.AttachmentGetParams): __Observable<null> {
    return this.AttachmentGetResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module AttachmentService {

  /**
   * Parameters for AttachmentGet
   */
  export interface AttachmentGetParams {

    /**
     * Attachment id
     */
    id: number;

    /**
     * Image format. For video, use Raw. Possible image formats: Raw, Original, Large, Medium, Thumbnail
     */
    format: string;
  }
}

export { AttachmentService }
