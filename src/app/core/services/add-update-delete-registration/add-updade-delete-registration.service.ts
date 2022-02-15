import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { LangKey } from 'src/app/modules/common-core/models';
import { IRegistration } from 'src/app/modules/common-registration/registration.models';
import { RegistrationEditModel, RegistrationService, RegistrationViewModel } from 'src/app/modules/common-regobs-api';
import { UploadAttachmentsService } from '../upload-attachments/upload-attachments.service';
import { addAttachmentToDraft } from './attachmentHelpers';

/**
 * Service for posting a new or updated registration to regobs, or deleting an existing registration.
 *
 * If the registration contains attachments, this service sends the attachments to the api before posting registration
 * data. This service will also request an update of attachment metadata after a successful attachment upload.
 */
@Injectable({
  providedIn: 'root'
})
export class AddUpdateDeleteRegistrationService {

  constructor(
    private uploadAttachmentsService: UploadAttachmentsService,
    private regobsApiRegistrationService: RegistrationService,
  ) {}

  /**
   * Create a registration in regobs.
   *
   * Uploads attachments, requests a local attachment metadata update, sets attachment ids on the registration, and
   * then sends a POST request to regobs with new registration data.
   *
   * @param registration Registration object
   * @param langKey Language key
   * @throws {HttpErrorResponse} If the operation is unsuccessful
   * @throws {UploadAttachmentError} If uploading attachments fails
   */
  async post(
    registration: IRegistration,
    langKey: LangKey,
  ): Promise<RegistrationViewModel> {
    const draft = await this.uploadAttachments(registration);

    // Send registration to regobs
    return firstValueFrom(this.regobsApiRegistrationService.RegistrationInsert({
      registration: draft,
      langKey,
      externalReferenceId: registration.id
    }));
  }

  /**
   * Update a registration in regobs.
   *
   * Uploads attachments, requests a local attachment metadata update, sets attachment ids on the registration, and
   * then sends a PUT request to regobs with updated registration data.
   *
   * @param registration Registration object
   * @param langKey Language key
   * @param ignoreVersionCheck If true, overwrite changes to the registration posted by another client
   * @throws {Error} If no regId are avalable
   * @throws {HttpErrorResponse} If the operation is unsuccessful
   * @throws {UploadAttachmentError} If uploading attachments fails
   */
  async put(
    registration: IRegistration,
    langKey: LangKey,
    ignoreVersionCheck = false
  ): Promise<RegistrationViewModel> {
    if (!registration.response?.RegId) {
      throw new Error('Needs regid to update');
    }

    const draft = await this.uploadAttachments(registration);

    // Send registration to regobs
    return firstValueFrom(this.regobsApiRegistrationService.RegistrationInsertOrUpdate({
      registration: draft,
      langKey,
      externalReferenceId: registration.id,
      id: registration.response.RegId,
      ignoreVersionCheck: ignoreVersionCheck
    }));
  }

  /**
   * Delete a registration
   *
   * @param regId Registration id (not registration guid)
   * @throws {Error} If regId parameter is null
   * @throws {HttpErrorResponse} If the operation is unsuccessful
   */
  async delete(regId: number): Promise<void> {
    if (regId == null) {
      throw new Error('regId required');
    }
    return firstValueFrom(this.regobsApiRegistrationService.RegistrationDelete(regId));
  }

  /**
   * @returns A draft / RegistrationEditModel with updated attachment info
   */
  private async uploadAttachments(registration: IRegistration): Promise<RegistrationEditModel> {
    const uploadedAttachments = await this.uploadAttachmentsService.uploadAllAttachments(registration);

    // Add attachment info to draft
    let draft = registration.request;
    for (const attachment of uploadedAttachments) {
      draft = addAttachmentToDraft(attachment, draft);
    }

    return draft;
  }

}
