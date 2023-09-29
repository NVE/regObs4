import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { AttachmentUploadEditModel } from 'src/app/modules/common-registration/registration.models';
import { NewAttachmentService } from 'src/app/modules/common-registration/registration.services';
import { DateHelperService } from 'src/app/modules/shared/services/date-helper/date-helper.service';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { RegistrationDraft } from '../draft/draft-model';
import { UserSettingService } from '../user-setting/user-setting.service';
import { UploadSingleAttachmentService } from './upload-single-attachment.service';

const DEBUG_TAG = 'UploadAttachmentsService';

export interface FailedAttachment extends Pick<AttachmentUploadEditModel, 'id'> {
  error: Error;
}

export class UploadAttachmentError extends Error {
  registrationUuid: string;
  attachments: FailedAttachment[];

  constructor(registrationUuid: string, attachments: FailedAttachment[]) {
    super(`Failed to upload ${attachments.length} attachments for registration '${registrationUuid}'`);
    this.name = 'UploadAttachmentError';
    this.registrationUuid = registrationUuid;
    this.attachments = attachments;
  }
}

/**
 * Upload registration attachments (only images yet)
 */
@Injectable({
  providedIn: 'root',
})
export class UploadAttachmentsService {
  constructor(
    private newAttachmentService: NewAttachmentService,
    private uploadSingleAttachmentService: UploadSingleAttachmentService,
    private translateService: TranslateService,
    private dateHelperService: DateHelperService,
    private loggingService: LoggingService,
    private userSettings: UserSettingService,
    private alertController: AlertController
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
   * @throws {HttpErrorResponse} If any upload requests fails with http status = 0, probably no network
   */
  async uploadAllAttachments(draft: RegistrationDraft): Promise<AttachmentUploadEditModel[]> {
    const attachments = await firstValueFrom(this.newAttachmentService.getAttachments(draft.uuid));

    // TODO: What about existing attachments? Do we need to set default metadata on those as well?
    const attachmentsWithDefaultSettingsMetadata = await this.setCopyrightAndPhotographer(attachments);

    // Some attachments may already be uploaded
    const alreadyUploaded = attachmentsWithDefaultSettingsMetadata.filter((a) => a.AttachmentUploadId != null);
    const attachmentsToUpload = attachmentsWithDefaultSettingsMetadata.filter((a) => a.AttachmentUploadId == null);

    this.loggingService.debug('Attachment upload state', DEBUG_TAG, {
      nAlreadyUploaded: alreadyUploaded.length,
      nToUpload: attachmentsToUpload.length,
    });

    // Error handling
    // wrap this.uploadAttachment in a function that saves exceptions so that we can handle those that fail later
    const failedAttachments: FailedAttachment[] = [];
    const uploadAttachmentAndHandleErrors = async (attachment: AttachmentUploadEditModel) => {
      try {
        return await this.uploadAttachment(attachment, draft);
      } catch (error) {
        this.uploadAttachmentHandleError(attachment, error, failedAttachments);
      }
    };

    // Upload all attachments concurrently
    const uploadedAttachments = await Promise.all(attachmentsToUpload.map(uploadAttachmentAndHandleErrors));

    if (failedAttachments.length) {
      // If one of the attachment uploads fails we keep on sending the registration, tho we inform the user with a toast
      this.showCouldnotUploadAllImagesAlert(failedAttachments.length, draft.registration.DtObsTime);
    }

    return [...alreadyUploaded, ...uploadedAttachments];
  }

  private uploadAttachmentHandleError(
    attachment: AttachmentUploadEditModel,
    error: Error,
    failedAttachments: FailedAttachment[]
  ) {
    if (error instanceof HttpErrorResponse && error.status === 0) {
      // Probably no network, stop trying to upload any attachments
      throw error;
    }

    this.loggingService.error(error, DEBUG_TAG, 'Failed to upload attachment', {
      attachmentId: attachment.AttachmentId,
    });
    failedAttachments.push({
      id: attachment.id,
      error,
    });
  }

  private async showCouldnotUploadAllImagesAlert(failedAttachmentsCount: number, date: string) {
    const dateProperFormat = await this.dateHelperService.formatDateString(date);
    const translations = await firstValueFrom(
      this.translateService.get(['REGISTRATION.IMAGE_UPLOAD_ERROR', 'ALERT.OK'], {
        failedAttachmentsCount: failedAttachmentsCount,
        obsTime: dateProperFormat,
      })
    );
    const alert = await this.alertController.create({
      message: translations['REGISTRATION.IMAGE_UPLOAD_ERROR'],
      buttons: [
        {
          text: translations['ALERT.OK'],
        },
      ],
    });
    alert.present();
  }

  // TODO: Add test
  private async setCopyrightAndPhotographer(attachments: AttachmentUploadEditModel[]) {
    const userSettings = await firstValueFrom(this.userSettings.userSetting$);

    const setCopyright =
      userSettings.copyright == null
        ? (a) => a
        : (attachment: AttachmentUploadEditModel): AttachmentUploadEditModel => {
            if (attachment.Copyright == null) {
              return {
                ...attachment,
                Copyright: userSettings.copyright,
              };
            }
          };

    const setPhotographer =
      userSettings.photographer == null
        ? (a) => a
        : (attachment: AttachmentUploadEditModel): AttachmentUploadEditModel => {
            if (attachment.Photographer == null) {
              return {
                ...attachment,
                Photographer: userSettings.photographer,
              };
            }
          };

    return attachments.map((a) => setPhotographer(setCopyright(a)));
  }

  private async uploadAttachment(
    attachment: AttachmentUploadEditModel,
    draft: RegistrationDraft
  ): Promise<AttachmentUploadEditModel> {
    const blob = await firstValueFrom(this.newAttachmentService.getBlob(draft.uuid, attachment.id));
    const uploadedAttachment = await this.uploadSingleAttachmentService.upload(attachment, blob);

    // Update metadata
    await firstValueFrom(this.newAttachmentService.saveAttachmentMeta$(draft.uuid, uploadedAttachment));

    return uploadedAttachment;
  }
}
