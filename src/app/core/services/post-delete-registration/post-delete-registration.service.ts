import { Injectable } from '@angular/core';
import { LangKey } from 'src/app/modules/common-core/models';
import { AttachmentUploadEditModel, IRegistration } from 'src/app/modules/common-registration/registration.models';
import { RegistrationViewModel } from 'src/app/modules/common-regobs-api';

/**
 * Service for posting a new or updated registration to regobs, or deleting an existing registration.
 *
 * If the registration contains attachments, this service sends the attachments to the api before posting registration
 * data. This service will also request an update of attachment metadata after a successful attachment upload.
 */
@Injectable({
  providedIn: 'root'
})
export class PostOrDeleteRegistrationService {

  /**
   * Create or update a registration in regobs.
   *
   * Uploads attachments, requests a local attachment metadata update, sets attachment ids on the registration, and
   * then sends a POST request to regobs with new or updated registration data.
   *
   * @param registration Registration object
   * @param langKey Language key
   * @param ignoreVersionCheck If true, overwrite changes to the registration posted by another client
   * @throws {HttpErrorResponse} If the operation is unsuccessful
   */
  async post(
    registration: IRegistration,
    langKey: LangKey,
    ignoreVersionCheck?: boolean
  ): Promise<RegistrationViewModel> {
    throw new Error('Not implemented');
  }

  /**
   * Delete a registration
   *
   * @param regId Registration id (not registration guid)
   * @throws {HttpErrorResponse} If the operation is unsuccessful
   */
  async delete(regId: number): Promise<void> {
    throw new Error('Not implemented');
  }

  /**
   * Upload attachments
   *
   * When we upload attachments, we get an attachment id back. The attachment ids are later used to "join" the
   * uploaded attachments to the registration.
   *
   * After attachments are uploaded, we request an update of local attachment metadata so that we do not need to update
   * the attachments again later if the post/put registration request fails.
   *
   * @param id Registration guid
   * @returns Attachments with attachment ids from upload response
   * @throws {HttpErrorResponse} If the attachment upload fails
   */
  protected async uploadAttachments(id: string): Promise<AttachmentUploadEditModel[]> {
    // Skip upload if attachment.id is already there.
    // After successful uploads - call this.newAttachmentService.saveAttachmentMeta$(reg.id, attachmentUpload) to update
    // attachment metadata.
    throw new Error('Not implemented');
  }

  /**
   * Add uploaded attachment to registration
   *
   * If the attachment is a WaterLevelMeasurementAttachment or a DamageObsAttachment, the attachment are added to the
   * respective sub form, water level or damage obs.
   *
   * Otherwise, attachments are added to the root Attachments property.
   *
   * @param attachment Attachment to add to the registration
   * @param registration Registration object
   */
  protected addUploadedAttachmentToRegistration(attachment: AttachmentUploadEditModel, registration: IRegistration) {
    throw new Error('Not implemented');
  }


}
