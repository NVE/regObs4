import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  NgZone
} from '@angular/core';
import { IRegistration } from '../../models/registration.model';
import { RegistrationStatus } from '../../models/registrationStatus.enum';
import { RegistrationService } from '../../services/registration.service';
import {
  EmailComposer,
  EmailComposerOptions
} from '@ionic-native/email-composer/ngx';
import { TranslateService } from '@ngx-translate/core';
import { settings } from '../../../../../settings';
const stringify = require('json-stringify-safe');

@Component({
  selector: 'app-failed-registration',
  templateUrl: './failed-registration.component.html',
  styleUrls: ['./failed-registration.component.scss']
})
export class FailedRegistrationComponent implements OnInit {
  @Input() registration: IRegistration;
  @Output() registrationChange = new EventEmitter();

  constructor(
    private registrationService: RegistrationService,
    private emailComposer: EmailComposer,
    private translateService: TranslateService,
    private ngZone: NgZone
  ) {}

  ngOnInit() {}

  async openForEdit() {
    this.registration.status = RegistrationStatus.Draft;
    await this.registrationService.saveRegistrationAsync(this.registration);
    this.ngZone.run(() => {
      this.registrationChange.emit(this.registration);
    });
  }

  async sendEmail() {
    const translations = await this.translateService
      .get(['REGISTRATION.EMAIL.SUBJECT', 'REGISTRATION.EMAIL.BODY'])
      .toPromise();
    const pictures = this.registrationService
      .getAllPictures(this.registration.request)
      .filter(
        (p) => p.PictureImageBase64 && !p.PictureImageBase64.startsWith('data')
      )
      .map((p) => p.PictureImageBase64);
    const base64string = btoa(stringify(this.registration));
    const attachments = ['base64:registration.json//' + base64string].concat(
      pictures
    );
    const email: EmailComposerOptions = {
      to: settings.errorEmailAddress,
      attachments,
      subject: translations['REGISTRATION.EMAIL.SUBJECT'],
      body: translations['REGISTRATION.EMAIL.BODY'],
      isHtml: true
    };
    this.emailComposer.open(email);
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
