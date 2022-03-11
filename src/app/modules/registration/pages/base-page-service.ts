import { Injectable } from '@angular/core';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { getRegistrationName, isArrayType } from 'src/app/modules/common-registration/registration.helpers';
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
   * @returns true if operator confirms to reset registration form
   */
  async confirmReset(): Promise<boolean> {
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
   * Reset or delete the registrations with given registrationTids and save the draft.
   * The attachments that belong to the registrations will be de removed.
   * @param draft the draft the registrations belong to
   * @param registrationTids type ID's of the registrations
   * @param doDelete use this if you like to delete instead of reset
   */
  async reset(draft: RegistrationDraft, registrationTids: RegistrationTid[], doDelete = false) {
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
        if (doDelete) {
          delete draftCopy.registration[registrationName];
        } else {
          draftCopy.registration[registrationName] = this.getDefaultValue(registrationTid); //reset field
        }
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

      await this.draftRepository.save(draftCopy);
    }
  }

  createDefaultProps(draft: RegistrationDraft, registrationTid: RegistrationTid): RegistrationDraft {
    const propName = getRegistrationName(registrationTid);
    if (!draft.registration[propName]) {
      return {
        ...draft,
        registration: {
          ...draft.registration,
          [propName]: this.getDefaultValue(registrationTid)
        }
      };
    }
    return draft;
  }

  getDefaultValue(registrationTid: RegistrationTid) {
    if (isArrayType(registrationTid)) {
      return [];
    } else {
      return {};
    }
  }
}

