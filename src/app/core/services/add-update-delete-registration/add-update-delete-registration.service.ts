import { Injectable } from '@angular/core';
import { firstValueFrom, Observable, Subject, tap, timeout } from 'rxjs';
import { AppCustomDimension } from 'src/app/modules/analytics/enums/app-custom-dimension.enum';
import { AnalyticService } from 'src/app/modules/analytics/services/analytic.service';
import { LangKey } from 'src/app/modules/common-core/models';
import { removeEmptyRegistrations } from 'src/app/modules/common-registration/registration.helpers';
import { AttachmentUploadEditModel } from 'src/app/modules/common-registration/registration.models';
import { RegistrationEditModel, RegistrationService, RegistrationViewModel } from 'src/app/modules/common-regobs-api';
import { RegistrationDraft, RegistrationEditModelWithRemoteOrLocalAttachments } from '../draft/draft-model';
import { UploadAttachmentsService } from '../upload-attachments/upload-attachments.service';
import { UserSettingService } from '../user-setting/user-setting.service';
import { addAttachmentToRegistration } from './attachmentHelpers';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';

const DEBUG_TAG = 'AddUpdateDeleteRegistrationService';

/**
 * Service for adding or updating a registration in regobs, or deleting an existing registration.
 *
 * If the registration contains attachments, this service sends the attachments to the api before posting registration
 * data. Underlying services will also request an update of attachment metadata after a successful attachment upload.
 */
@Injectable({
  providedIn: 'root',
})
export class AddUpdateDeleteRegistrationService {
  constructor(
    private uploadAttachmentsService: UploadAttachmentsService,
    private regobsApiRegistrationService: RegistrationService,
    private userSettings: UserSettingService,
    private analytics: AnalyticService,
    private logger: LoggingService
  ) {}

  private changedRegistrations = new Subject<{ reg: RegistrationViewModel; langKey: LangKey }>();
  private deletedRegistrationIds = new Subject<number>();

  /**
   * Emits uploaded registrations.
   */
  get changedRegistrations$(): Observable<{ reg: RegistrationViewModel; langKey: LangKey }> {
    return this.changedRegistrations.asObservable();
  }

  /**
   * Emits regId's of deleted registrations.
   */
  get deletedRegistrationIds$(): Observable<number> {
    return this.deletedRegistrationIds.asObservable();
  }

  /**
   * Create a registration in regobs.
   *
   * Uploads attachments, requests a local attachment metadata update, sets attachment ids on the registration, and
   * then sends a POST request to regobs with new registration data.
   * Empty registrations will be removed before upload.
   *
   * @throws {HttpErrorResponse} If the request is unsuccessful
   * @throws {UploadAttachmentError} If uploading attachments fails
   */
  async add(draft: RegistrationDraft): Promise<RegistrationViewModel> {
    this.logger.debug('Add registration', DEBUG_TAG, { draft });

    draft = removeEmptyRegistrations(draft);
    const uploadedAttachments = await this.uploadAttachments(draft);

    const registration = this.addAttachmentToRegistration(uploadedAttachments, draft.registration);
    const langKey = await firstValueFrom(this.userSettings.language$);
    const registrationWithMeta = this.addMetadata(registration, draft);

    const data: RegistrationService.RegistrationInsertParams = {
      registration: registrationWithMeta,
      langKey,
      externalReferenceId: draft.uuid,
    };

    this.logger.debug('RegistrationInsert', DEBUG_TAG, data);

    // Send registration to regobs
    const result = await firstValueFrom(this.regobsApiRegistrationService.RegistrationInsert(data));

    this.logger.debug('RegistrationInsert result', DEBUG_TAG, { result, externalReferenceId: draft.uuid });

    // Track observation type in plausible
    this.analytics.trackDimension(AppCustomDimension.observationType, draft.simpleMode ? 'simple' : 'normal');

    this.changedRegistrations.next({ reg: result, langKey });
    return result;
  }

  /**
   * Update a registration in regobs.
   *
   * Uploads attachments, requests a local attachment metadata update, sets attachment ids on the registration, and
   * then sends a PUT request to regobs with updated registration data.
   * Empty registrations will be removed before upload.
   *
   * @param ignoreVersionCheck If true, overwrite changes to the registration posted by another client
   * @throws {Error} If no regId are avalable on the draft
   * @throws {HttpErrorResponse} If the request is unsuccessful
   * @throws {UploadAttachmentError} If uploading attachments fails
   */
  async update(draft: RegistrationDraft, ignoreVersionCheck = false): Promise<RegistrationViewModel> {
    this.logger.debug('Update registration', DEBUG_TAG, { draft, ignoreVersionCheck });

    if (!draft.regId) {
      throw new Error('Update operation needs regid');
    }

    const langKey = await firstValueFrom(this.userSettings.language$);
    draft = removeEmptyRegistrations(draft);
    const uploadedAttachments = await this.uploadAttachments(draft);
    const registration = this.addAttachmentToRegistration(uploadedAttachments, draft.registration);
    const registrationWithMeta = this.addMetadata(registration, draft);

    const data: RegistrationService.RegistrationInsertOrUpdateParams = {
      registration: registrationWithMeta,
      langKey,
      externalReferenceId: draft.uuid,
      id: draft.regId,
      ignoreVersionCheck: ignoreVersionCheck,
    };

    this.logger.debug('RegistrationInsertOrUpdate', DEBUG_TAG, data);

    // Send registration to regobs
    const result = await firstValueFrom(this.regobsApiRegistrationService.RegistrationInsertOrUpdate(data));

    this.logger.debug('RegistrationInsertOrUpdate result', DEBUG_TAG, { result, externalReferenceId: draft.uuid });

    this.changedRegistrations.next({ reg: result, langKey });
    return result;
  }

  /**
   * Delete a registration
   * You may get notified when registrations is deleted, see deletedRegistrationIds$
   *
   * @param regId Registration id (not registration guid)
   * @param timeoutInMillis timout in millis
   * @throws {Error} If regId parameter is null
   * @throws {HttpErrorResponse} If the request is unsuccessful
   * @throws {TimeoutError} if the request timed out
   */
  async delete(regId: number, timeoutInMillis = 10000): Promise<void> {
    this.logger.debug('Delete registration', DEBUG_TAG, { regId, timeoutInMillis });

    if (regId == null) {
      throw new Error('regId required');
    }
    return firstValueFrom(
      this.regobsApiRegistrationService.RegistrationDelete(regId).pipe(
        timeout(timeoutInMillis),
        tap(() => this.deletedRegistrationIds.next(regId))
      )
    );
  }

  /**
   * @returns A new draft with updated attachment info
   */
  private async uploadAttachments(draft: RegistrationDraft): Promise<AttachmentUploadEditModel[]> {
    this.logger.debug('Upload all attachments', DEBUG_TAG, { draft });
    const uploadedAttachments = await this.uploadAttachmentsService.uploadAllAttachments(draft);
    this.logger.debug('Attachments uploaded', DEBUG_TAG, { draft: draft.uuid, uploadedAttachments });
    return uploadedAttachments;
  }

  private addAttachmentToRegistration(attachments: AttachmentUploadEditModel[], registration: RegistrationEditModel) {
    let updatedRegistration = { ...registration };
    for (const attachment of attachments) {
      if (attachment) {
        // Legg til fotograf / copyright info her ?
        updatedRegistration = addAttachmentToRegistration(attachment, updatedRegistration);
      }
    }
    this.logger.debug('Added attachments to registration', DEBUG_TAG, { updatedRegistration });
    return updatedRegistration;
  }

  private addMetadata(registration: RegistrationEditModelWithRemoteOrLocalAttachments, draft: RegistrationDraft) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const metadata: any = {};

    // Track if a registration has been edited/created using simple mode
    // See https://nveprojects.atlassian.net/browse/RO-1779
    if (draft.simpleMode) {
      metadata.__is_simple_obs = true;
    }

    const regWithMeta = {
      ...registration,
      ...metadata,
    };

    return regWithMeta as RegistrationEditModelWithRemoteOrLocalAttachments;
  }
}
