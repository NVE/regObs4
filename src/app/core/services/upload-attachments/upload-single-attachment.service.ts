import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, firstValueFrom, map, Observable, tap } from 'rxjs';
import { AttachmentUploadEditModel } from 'src/app/modules/common-registration/registration.models';
import { AttachmentService as ApiAttachmentService } from 'src/app/modules/common-regobs-api';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';

const DEBUG_TAG = 'UploadSingleAttachmentService';

export type HttpEventClb = (ev: HttpEvent<any>) => void;

/**
 * Upload a single registration attachment (only images yet)
 */
@Injectable({
  providedIn: 'root',
})
export class UploadSingleAttachmentService {
  constructor(
    private httpClient: HttpClient,
    private apiAttachmentService: ApiAttachmentService,
    private loggingService: LoggingService
  ) {}

  private onHttpEvent(event: HttpEvent<any>, attachment: AttachmentUploadEditModel, clb: HttpEventClb) {
    this.loggingService.debug('Attachment upload http event', DEBUG_TAG, event);
    // Here we can keep track of upload progress if we want to
    // if (event.type === HttpEventType.UploadProgress) {
    //   // Track upload progress
    // }
    clb(event);
  }

  private onHttpResponseEvent(event: HttpResponse<string>) {
    if (event instanceof HttpErrorResponse) {
      // This is already an error and contains useful info, so we can just throw it
      throw event;
    }
    if (!event.ok) {
      throw new Error(`Could not upload attachment: Status: ${event.statusText}`);
    }
    return event.body;
  }

  private sendPostRequestWithImageBlob(blob: Blob) {
    const attachmentPostPath = `${this.apiAttachmentService.rootUrl}${ApiAttachmentService.AttachmentPostPath}`;

    const formData = new FormData();
    formData.append('file', blob);

    return this.httpClient.post(attachmentPostPath, formData, {
      responseType: 'json',
      // reportProgress makes this a stream that returns HttpEvents, not just the final response.
      // We can use the events to track the upload progress.
      reportProgress: true,
      observe: 'events',
      headers: { 'ngsw-bypass': '' },
    }) as Observable<HttpEvent<string>>;
  }

  async upload(attachment: AttachmentUploadEditModel, blob: Blob, onHttpEvent?: HttpEventClb) {
    this.loggingService.debug('Uploading attachment', DEBUG_TAG, { attachment, size: blob.size });
    // TODO: Add error handling

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const clb: HttpEventClb = onHttpEvent || (() => {});

    const request = this.sendPostRequestWithImageBlob(blob).pipe(
      tap((event) => this.onHttpEvent(event, attachment, clb)),
      filter((event) => event.type === HttpEventType.Response || event instanceof HttpErrorResponse),
      map((event: HttpResponse<string>) => this.onHttpResponseEvent(event)),
      tap((result) => this.loggingService.debug(`Attachment uploaded with attachment id: ${result}`))
    );

    const uploadedAttachment = {
      ...attachment,
      // The response body contains only the AttachmentUploadId
      AttachmentUploadId: await firstValueFrom(request),
    };

    return uploadedAttachment;
  }
}
