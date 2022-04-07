import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { removeEmptyRegistrations } from 'src/app/modules/common-registration/registration.helpers';
import { RegistrationService, RegistrationViewModel } from 'src/app/modules/common-regobs-api';
import { RegistrationDraft } from '../draft/draft-model';
import { UploadAttachmentsService } from '../upload-attachments/upload-attachments.service';
import { UserSettingService } from '../user-setting/user-setting.service';
import { addAttachmentToRegistration } from './attachmentHelpers';

/**
 * Service for adding or updating a registration in regobs, or deleting an existing registration.
 *
 * If the registration contains attachments, this service sends the attachments to the api before posting registration
 * data. Underlying services will also request an update of attachment metadata after a successful attachment upload.
 */
@Injectable({
  providedIn: 'root'
})
export class AddUpdateDeleteRegistrationService {

  constructor(
    private uploadAttachmentsService: UploadAttachmentsService,
    private regobsApiRegistrationService: RegistrationService,
    private userSettings: UserSettingService
  ) {}

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
    const draftWithoutEmptyRegistrations = removeEmptyRegistrations(draft);
    const { registration } = await this.uploadAttachments(draftWithoutEmptyRegistrations);
    const langKey = await firstValueFrom(this.userSettings.language$);

    // Send registration to regobs
    return firstValueFrom(this.regobsApiRegistrationService.RegistrationInsert({
      registration,
      langKey,
      externalReferenceId: draft.uuid
    }));
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
  async update(
    draft: RegistrationDraft,
    ignoreVersionCheck = false
  ): Promise<RegistrationViewModel> {
    if (!draft.regId) {
      throw new Error('Update operation needs regid');
    }

    const langKey = await firstValueFrom(this.userSettings.language$);
    const draftWithoutEmptyRegistrations = removeEmptyRegistrations(draft);
    const { registration } = await this.uploadAttachments(draftWithoutEmptyRegistrations);

    // Send registration to regobs
    return firstValueFrom(this.regobsApiRegistrationService.RegistrationInsertOrUpdate({
      registration,
      langKey,
      externalReferenceId: draft.uuid,
      id: draft.regId,
      ignoreVersionCheck: ignoreVersionCheck
    }));
  }

  /**
   * Delete a registration
   *
   * @param regId Registration id (not registration guid)
   * @throws {Error} If regId parameter is null
   * @throws {HttpErrorResponse} If the request is unsuccessful
   */
  async delete(regId: number): Promise<void> {
    if (regId == null) {
      throw new Error('regId required');
    }
    return firstValueFrom(this.regobsApiRegistrationService.RegistrationDelete(regId));
  }

  /**
   * @returns A new draft with updated attachment info
   */
  private async uploadAttachments(draft: RegistrationDraft): Promise<RegistrationDraft> {
    const uploadedAttachments = await this.uploadAttachmentsService.uploadAllAttachments(draft);

    // Add attachment info to draft
    let registration = draft.registration;
    for (const attachment of uploadedAttachments) {
      registration = addAttachmentToRegistration(attachment, registration);
    }

    return {
      ...draft,
      registration
    };
  }

}
