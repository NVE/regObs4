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

@Injectable({
  providedIn: 'root'
})
class AttachmentService extends __BaseService {
  static readonly AttachmentPostPath = '/Upload';

  constructor(config: __Configuration, http: HttpClient) {
    super(config, http);
  }

  /**
   * @param file Attachment to upload
   * @return OK
   */
  AttachmentPostResponse(
    file: Blob
  ): __Observable<__StrictHttpResponse<string>> {
    const __params = this.newParams();
    const __headers = new HttpHeaders();
    let __body: any = null;
    const __formData = new FormData();
    __body = __formData;
    if (file != null) {
      __formData.append('file', file as string | Blob);
    }
    const req = new HttpRequest<any>('POST', this.rootUrl + '/Upload', __body, {
      headers: __headers,
      params: __params,
      responseType: 'text'
    });

    return this.http.request<any>(req).pipe(
      __filter((_r) => _r instanceof HttpResponse),
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
      __map((_r) => _r.body as string)
    );
  }
}

namespace AttachmentService {}

export { AttachmentService };
