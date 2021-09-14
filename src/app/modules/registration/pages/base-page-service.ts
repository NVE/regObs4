import { Injectable, NgZone } from '@angular/core';
import { IRegistration, RegistrationTid } from 'src/app/modules/common-registration/registration.models';
import { getPropertyName, isArrayType } from 'src/app/modules/common-registration/registration.helpers';
import { NewAttachmentService, RegistrationService as CommonRegistrationService } from 'src/app/modules/common-registration/registration.services';
import { RegistrationService } from '../services/registration.service';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { LoggingService } from '../../shared/services/logging/logging.service';

const DEBUG_TAG = 'BasePageService';
@Injectable({
  providedIn: 'root'
})
export class BasePageService {
  get Zone() {
    return this.ngZone;
  }

  get RegistrationService() {
    return this.registrationService;
  }

  get AlertController() {
    return this.alertController;
  }

  get TranslateService() {
    return this.translateService;
  }

  get CommonRegistrationService() {
    return this.commonRegistrationService;
  }

  constructor(
    private registrationService: RegistrationService,
    private newAttachmentService: NewAttachmentService,
    private commonRegistrationService: CommonRegistrationService,
    private ngZone: NgZone,
    private alertController: AlertController,
    private translateService: TranslateService,
    private loggingService: LoggingService,
  ) {}

  async confirmLeave(
    registration: IRegistration,
    registrationTid: RegistrationTid,
    onReset?: () => void
  ) {
    const leaveText = await this.translateService
      .get('REGISTRATION.REQUIRED_FIELDS_MISSING')
      .toPromise();
    return this.createResetDialog(
      leaveText,
      registration,
      registrationTid,
      onReset
    );
  }

  async confirmReset(
    registration: IRegistration,
    registrationTid: RegistrationTid,
    onReset?: () => void
  ) {
    const leaveText = await this.translateService
      .get('REGISTRATION.CONFIRM_RESET')
      .toPromise();
    return this.createResetDialog(
      leaveText,
      registration,
      registrationTid,
      onReset
    );
  }

  private async createResetDialog(
    message: string,
    registration: IRegistration,
    registrationTid: RegistrationTid,
    onReset?: () => void
  ) {
    const translations = await this.translateService
      .get(['DIALOGS.CANCEL', 'DIALOGS.YES'])
      .toPromise();
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
      await this.reset(registration, registrationTid, onReset);
    }
    return reset;
  }

  async reset(
    registration: IRegistration,
    registrationTid: RegistrationTid,
    onReset?: () => void
  ) {
    this.Zone.run(() => {
      if (registrationTid) {
        registration.request[
          getPropertyName(registrationTid)
        ] = this.getDefaultValue(registrationTid);
        this.resetImages(registration, registrationTid);
      }
      if (onReset) {
        onReset();
      }
    });
    await this.registrationService.saveRegistrationAsync(registration);
  }

  createDefaultProps(
    registration: IRegistration,
    registrationTid: RegistrationTid
  ) {
    const propName = getPropertyName(registrationTid);
    if (!registration.request[propName]) {
      // Init to new object if null
      registration.request[propName] = this.getDefaultValue(registrationTid);
    }
  }

  getDefaultValue(registrationTid: RegistrationTid) {
    if (isArrayType(registrationTid)) {
      return [];
    } else {
      return {};
    }
  }

  resetImages(registration: IRegistration, registrationTid: RegistrationTid) {
    this.newAttachmentService.getUploadedAttachments(registration.id).pipe(switchMap((attachments) => 
      forkJoin(attachments.map((a) => this.newAttachmentService.removeAttachment(registration.id, a.id))))).subscribe(() => {
        this.loggingService.debug('Reset images complete', DEBUG_TAG);
      }, (error) => {
        this.loggingService.error(error, DEBUG_TAG, 'Could not reset images');
      });
  }
}
