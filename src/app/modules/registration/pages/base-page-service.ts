import { Injectable } from '@angular/core';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { getRegistrationName } from 'src/app/modules/common-registration/registration.helpers';
import { NewAttachmentService } from 'src/app/modules/common-registration/registration.services';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LoggingService } from '../../shared/services/logging/logging.service';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';
import { firstValueFrom } from 'rxjs';

const DEBUG_TAG = 'BasePageService';
@Injectable({
  providedIn: 'root'
})
export class BasePageService {

  get draftRepository(): DraftRepositoryService {
    return this.draftRepositoryService;
  }

  constructor(
    private draftRepositoryService: DraftRepositoryService,
    private newAttachmentService: NewAttachmentService,
    private alertController: AlertController,
    private translateService: TranslateService,
    private loggingService: LoggingService
  ) {}

  /**
   * @returns true if operator confirms to leave an invalid registration form (and lose the data)
   */
  async confirmLeave(): Promise<boolean> {
    const leaveText = await firstValueFrom(this.translateService.get('REGISTRATION.REQUIRED_FIELDS_MISSING'));
    return this.askForResetConfirmation(leaveText);
  }

  /**
   * @returns true if user confirms to delete registration form
   */
  async confirmDelete(): Promise<boolean> {
    const leaveText = await firstValueFrom(this.translateService.get('REGISTRATION.CONFIRM_RESET'));
    return this.askForResetConfirmation(leaveText);
  }

  private async askForResetConfirmation(message: string): Promise<boolean> {
    const translations = await firstValueFrom(this.translateService.get(['DIALOGS.CANCEL', 'DIALOGS.YES']));
    const alert = await this.alertController.create({
      message,
      buttons: [
        {
          text: translations['DIALOGS.CANCEL'],
          role: 'cancel'
        },
        {
          text: translations['DIALOGS.YES']
        }
      ]
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    const reset: boolean = result.role !== 'cancel';
    return reset;
  }

  /**
   * Delete the registrations with given registrationTids
   * The attachments that belong to the registrations will be de removed.
   * You must save the returned draft yourself.
   * @param draft the draft the registrations belong to
   * @param registrationTids type ID's of the registrations
   * @return the draft without the registrations
   */
  async delete(draft: RegistrationDraft, registrationTids: RegistrationTid[]): Promise<RegistrationDraft> {
    if (registrationTids?.length > 0) {
      const draftCopy: RegistrationDraft = {
        ...draft,
        registration: {
          ...draft.registration,
        }
      };

      const attachments = await firstValueFrom(this.newAttachmentService.getAttachments(draft.uuid));

      for (const registrationTid of registrationTids) {
        const registrationName = getRegistrationName(registrationTid);
        delete draftCopy.registration[registrationName];
        for (const attachment of attachments) {
          if (attachment.RegistrationTID === registrationTid) {
            try {
              this.newAttachmentService.removeAttachment(draft.uuid, attachment.id);
            } catch (error) {
              this.loggingService.error(error, DEBUG_TAG,
                `Remove image failed, attachmentId = ${attachment.id}, registration ID = ${draft.uuid}`);
            }
          }
        }
      }

      //await this.draftRepository.save(draftCopy);
      return draftCopy;
    }
    return draft;
  }

}

