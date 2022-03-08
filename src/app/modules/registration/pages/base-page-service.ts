import { Injectable, NgZone } from '@angular/core';
import { RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { getRegistrationName, isArrayType } from 'src/app/modules/common-registration/registration.helpers';
import { NewAttachmentService } from 'src/app/modules/common-registration/registration.services';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LoggingService } from '../../shared/services/logging/logging.service';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { RegistrationDraft } from 'src/app/core/services/draft/draft-model';

const DEBUG_TAG = 'BasePageService';
@Injectable({
  providedIn: 'root'
})
export class BasePageService {

  // TODO: Hvorfor alle disse getters?
  get Zone() {
    return this.ngZone;
  }

  get AlertController() {
    return this.alertController;
  }

  get TranslateService() {
    return this.translateService;
  }

  get DraftService() {
    return this.draftService;
  }

  get NewAttachmentService() {
    return this.newAttachmentService;
  }

  constructor(
    private draftService: DraftRepositoryService,
    private newAttachmentService: NewAttachmentService,
    private ngZone: NgZone,
    private alertController: AlertController,
    private translateService: TranslateService,
    private loggingService: LoggingService
  ) {}

  async confirmLeave(draft: RegistrationDraft, registrationTid: RegistrationTid, onReset?: () => void) {
    const leaveText = await this.translateService.get('REGISTRATION.REQUIRED_FIELDS_MISSING').toPromise();
    return this.createResetDialog(leaveText, draft, registrationTid, onReset);
  }

  async confirmReset(draft: RegistrationDraft, registrationTid: RegistrationTid, onReset?: () => void) {
    const leaveText = await this.translateService.get('REGISTRATION.CONFIRM_RESET').toPromise();
    return this.createResetDialog(leaveText, draft, registrationTid, onReset);
  }

  private async createResetDialog(
    message: string,
    draft: RegistrationDraft,
    registrationTid: RegistrationTid,
    onReset?: () => void
  ) {
    const translations = await this.translateService.get(['DIALOGS.CANCEL', 'DIALOGS.YES']).toPromise();
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
    if (reset) {
      await this.reset(draft, registrationTid, onReset);
    }
    return reset;
  }

  // TODO: Test how ng zone works here
  async reset(draft: RegistrationDraft, registrationTid: RegistrationTid, onReset?: () => void) {
    if (registrationTid) {
      const draftReset: RegistrationDraft = {
        ...draft,
        registration: {
          ...draft.registration,
          [getRegistrationName(registrationTid)]: this.getDefaultValue(registrationTid)
        }
      };

      await this.resetImages(draftReset);
      await this.draftService.save(draftReset);
    }
    this.ngZone.run(() => {
      if (onReset) {
        onReset();
      }
    });
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

  // TODO: Test if reset images works ok
  async resetImages(draft: RegistrationDraft) {
    try {
      await this.newAttachmentService.removeAttachments(draft.uuid);
      this.loggingService.debug('Reset images complete', DEBUG_TAG);
    } catch (error) {
      this.loggingService.error(error, DEBUG_TAG, 'Could not reset images');
    }
  }
}
