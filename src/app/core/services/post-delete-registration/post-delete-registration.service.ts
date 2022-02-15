import { Injectable } from '@angular/core';
import { LangKey } from 'src/app/modules/common-core/models';
import { IRegistration } from 'src/app/modules/common-registration/registration.models';
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

}
