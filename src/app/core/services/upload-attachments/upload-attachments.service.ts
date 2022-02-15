import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, firstValueFrom, map, Observable, tap } from 'rxjs';
import { AttachmentUploadEditModel, IRegistration } from 'src/app/modules/common-registration/registration.models';
import { NewAttachmentService, ProgressService } from 'src/app/modules/common-registration/registration.services';
import { AttachmentService as ApiAttachmentService } from 'src/app/modules/common-regobs-api';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';

const DEBUG_TAG = 'UploadAttachmentsService';

export class UploadAttachmentError extends Error {
  registrationId: string;
  attachmentIds: string[];

  constructor(registrationId: string, attachmentIds: string[]) {
    super(`Failed to upload ${attachmentIds.length} attachments for registrationId '${registrationId}'`);
    this.name = 'UploadAttachmentError';
    this.registrationId = registrationId;
    this.attachmentIds = attachmentIds;
  }
}

/**
 * Upload registration attachments (only images yet)
 */
@Injectable({
  providedIn: 'root'
})
export class UploadAttachmentsService {

  constructor(
    private httpClient: HttpClient,
    private progressService: ProgressService,
    private newAttachmentService: NewAttachmentService,
    private apiAttachmentService: ApiAttachmentService,
    private loggingService: LoggingService
  ) {}

  /**
   * Upload attachments
   *
   * When we upload attachments, we get an attachment id back. The attachment ids are later used to "join" the
   * uploaded attachments to the registration.
   *
   * After attachments are uploaded, we request an update of local attachment metadata so that we do not need to update
   * the attachments again later if the post/put registration request fails.
   *
   * @param registration Registration object
   * @returns Attachments with attachment ids from upload response
   * @throws {UploadAttachmentError} If the attachment upload fails
   */
  async uploadAllAttachments(registration: IRegistration): Promise<AttachmentUploadEditModel[]> {
    const attachments = await firstValueFrom(this.newAttachmentService.getAttachments(registration.id));

    // Some attachments may already be uploaded
    const alreadyUploaded = attachments.filter(a => a.AttachmentUploadId != null);
    const attachmentsToUpload = attachments.filter(a => a.AttachmentUploadId == null);

    const failedAttachmentIds = [];
    const uploadAttachmentAndHandleErrors = async (a: AttachmentUploadEditModel) => {
      try {
        return await this.uploadAttachment(a, registration);
      } catch (error) {
        this.loggingService.error(error, DEBUG_TAG, 'Failed to upload attachment', a.AttachmentId);
        failedAttachmentIds.push(a.AttachmentId);
      }
    };

    // Upload all attachments concurrently
    const uploadedAttachments = await Promise.all(attachmentsToUpload.map(uploadAttachmentAndHandleErrors));

    if (failedAttachmentIds.length) {
      throw new UploadAttachmentError(registration.id, failedAttachmentIds);
    }

    return [
      ...alreadyUploaded,
      ...uploadedAttachments
    ];
  }

  private onHttpEvent(event: HttpEvent<any>, attachment: AttachmentUploadEditModel) {
    this.loggingService.debug('Attachment upload http event', DEBUG_TAG, event);
    if (event.type === HttpEventType.UploadProgress) {
      this.progressService.setAttachmentProgress(attachment.id, event.total, event.loaded);
    }
  }

  private onHttpResponseEvent(event: HttpResponse<string>) {
    if (event instanceof HttpErrorResponse) {
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
      reportProgress: true,
      observe: 'events',
      headers: { 'ngsw-bypass': '' }
    }) as Observable<HttpEvent<string>>;
  }

  private async uploadAttachment(
    attachment: AttachmentUploadEditModel,
    registration: IRegistration
  ): Promise<AttachmentUploadEditModel> {
    const blob = await firstValueFrom(this.newAttachmentService.getBlob(registration.id, attachment.id));

    const request = this.sendPostRequestWithImageBlob(blob)
      .pipe(
        // tap(e => {
        //   this.loggingService.debug('tap', 'test', e);
        // }),
        tap((event) => this.onHttpEvent(event, attachment)),
        filter((event) => event.type === HttpEventType.Response || event instanceof HttpErrorResponse),
        map((event: HttpResponse<string>) => this.onHttpResponseEvent(event)),
        tap((result) => this.loggingService.debug(`Attachment uploaded with attachment id: ${result}`)),
      );

    const response = await firstValueFrom(request);
    // if (response instanceof Error) {
    //   throw response;
    // }

    const uploadedAttachment = {
      ...attachment,
      AttachmentUploadId: response as string
    };

    // Update metadata
    await firstValueFrom(this.newAttachmentService.saveAttachmentMeta$(registration.id, uploadedAttachment));

    return uploadedAttachment;
  }
}
