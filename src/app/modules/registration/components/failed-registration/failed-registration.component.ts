import { Component, Input } from '@angular/core';
import { SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { EmailComposer, EmailComposerOptions } from '@ionic-native/email-composer/ngx';
import { TranslateService } from '@ngx-translate/core';
import { settings } from '../../../../../settings';
import stringify from 'json-stringify-safe';
import { RegistrationDraft, RegistrationDraftErrorCode } from 'src/app/core/services/draft/draft-model';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { firstValueFrom } from 'rxjs';
import { Platform } from '@ionic/angular';
import { isAndroidOrIos } from '../../../../core/helpers/ionic/platform-helper';

@Component({
  selector: 'app-failed-registration',
  templateUrl: './failed-registration.component.html',
  styleUrls: ['./failed-registration.component.scss'],
})
export class FailedRegistrationComponent {
  @Input() draft: RegistrationDraft;

  constructor(
    private draftService: DraftRepositoryService,
    private emailComposer: EmailComposer,
    private translateService: TranslateService,
    private platform: Platform
  ) {}

  get networkError() {
    return this.draft.error.code === RegistrationDraftErrorCode.NoNetworkOrTimedOut;
  }

  get conflictError() {
    return this.draft.error.code === RegistrationDraftErrorCode.ConflictError;
  }

  get goneError() {
    return this.draft.error.code === RegistrationDraftErrorCode.GoneError;
  }

  get registrationError() {
    return this.draft.error.code === RegistrationDraftErrorCode.RegistrationError;
  }

  get unknownError() {
    return (
      this.draft.error.code === RegistrationDraftErrorCode.AttachmentError ||
      this.draft.error.code === RegistrationDraftErrorCode.Unknown
    );
  }

  get serverError() {
    return this.draft.error.code === RegistrationDraftErrorCode.ServerError;
  }

  get unauthorizedError() {
    return this.draft.error.code === RegistrationDraftErrorCode.Unauthorized;
  }

  async openForEdit() {
    await this.draftService.save({
      ...this.draft,
      syncStatus: SyncStatus.Draft,
    });
  }

  async sendEmail() {
    if (isAndroidOrIos(this.platform)) {
      const translations = await firstValueFrom(
        this.translateService.get(['REGISTRATION.EMAIL.SUBJECT', 'REGISTRATION.EMAIL.BODY'])
      );
      // const pictures = this.registrationService
      //   .getAllPictures(this.registration.request)
      //   .filter(
      //     (p) => p.PictureImageBase64 && !p.PictureImageBase64.startsWith('data')
      //   )
      //   .map((p) => p.PictureImageBase64);
      const base64string = btoa(stringify(this.draft));
      const attachments = ['base64:registration.json//' + base64string];
      // const attachments = ['base64:registration.json//' + base64string].concat(
      //   pictures
      // );
      const email: EmailComposerOptions = {
        to: settings.errorEmailAddress,
        attachments,
        subject: translations['REGISTRATION.EMAIL.SUBJECT'],
        body: translations['REGISTRATION.EMAIL.BODY'],
        isHtml: true,
      };
      this.emailComposer.open(email);
    } else {
      window.location.href = 'mailto:regobs@nve.no';
    }
  }

  // private async getEmailAddress() {
  //   const userSetting = await this.userSettingService.getUserSettings();
  //   switch (userSetting.currentGeoHazard) {
  //     case GeoHazard.Snow:
  //       return 'snoskredvarsling@nve.no';
  //     case GeoHazard.Ice:
  //       return 'isvarsling@nve.no';
  //     case GeoHazard.Water:
  //       return 'flomvarsling@nve.no';
  //     case GeoHazard.Dirt:
  //       return 'jordskredvarsling@nve.no';
  //   }
  // }
}
