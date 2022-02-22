import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, firstValueFrom, map, Observable, tap } from 'rxjs';
import { AttachmentUploadEditModel } from 'src/app/modules/common-registration/registration.models';
import { NewAttachmentService, ProgressService } from 'src/app/modules/common-registration/registration.services';
import { AttachmentService as ApiAttachmentService } from 'src/app/modules/common-regobs-api';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { RegistrationDraft } from '../draft/draft-model';

const DEBUG_TAG = 'UploadAttachmentsService';

export class UploadAttachmentError extends Error {
  registrationUuid: string;
  attachmentIds: string[];

  constructor(registrationUuid: string, attachmentIds: string[]) {
    super(`Failed to upload ${attachmentIds.length} attachments for registration '${registrationUuid}'`);
    this.name = 'UploadAttachmentError';
    this.registrationUuid = registrationUuid;
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
   * @returns Attachments with attachment ids from upload response
   * @throws {UploadAttachmentError} If the attachment upload fails
   */
  async uploadAllAttachments(draft: RegistrationDraft): Promise<AttachmentUploadEditModel[]> {
    const attachments = await firstValueFrom(this.newAttachmentService.getAttachments(draft.uuid));

    // Some attachments may already be uploaded
    const alreadyUploaded = attachments.filter(a => a.AttachmentUploadId != null);
    const attachmentsToUpload = attachments.filter(a => a.AttachmentUploadId == null);

    // Error handling
    // wrap this.uploadAttachment in a function that saves exceptions so that we can handle those that fail later
    const failedAttachmentIds = [];
    const uploadAttachmentAndHandleErrors = async (attachment: AttachmentUploadEditModel) => {
      try {
        return await this.uploadAttachment(attachment, draft);
      } catch (error) {
        this.loggingService.error(error, DEBUG_TAG, 'Failed to upload attachment', attachment.AttachmentId);
        failedAttachmentIds.push(attachment.AttachmentId);
      }
    };

    // Upload all attachments concurrently
    const uploadedAttachments = await Promise.all(attachmentsToUpload.map(uploadAttachmentAndHandleErrors));

    if (failedAttachmentIds.length) {
      throw new UploadAttachmentError(draft.uuid, failedAttachmentIds);
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
      headers: { 'ngsw-bypass': '' }
    }) as Observable<HttpEvent<string>>;
  }

  private async uploadAttachment(
    attachment: AttachmentUploadEditModel,
    draft: RegistrationDraft
  ): Promise<AttachmentUploadEditModel> {
    const blob = await firstValueFrom(this.newAttachmentService.getBlob(draft.uuid, attachment.id));

    const request = this.sendPostRequestWithImageBlob(blob)
      .pipe(
        tap((event) => this.onHttpEvent(event, attachment)),
        filter((event) => event.type === HttpEventType.Response || event instanceof HttpErrorResponse),
        map((event: HttpResponse<string>) => this.onHttpResponseEvent(event)),
        tap((result) => this.loggingService.debug(`Attachment uploaded with attachment id: ${result}`)),
      );

    const uploadedAttachment = {
      ...attachment,
      // The response body contains only the AttachmentUploadId
      AttachmentUploadId: await firstValueFrom(request)
    };

    // Update metadata
    await firstValueFrom(this.newAttachmentService.saveAttachmentMeta$(draft.uuid, uploadedAttachment));

    return uploadedAttachment;
  }
}