import { Component, OnInit, Input, NgZone } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { IRegistration } from '../../models/registration.model';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-send-button',
  templateUrl: './send-button.component.html',
  styleUrls: ['./send-button.component.scss'],
})
export class SendButtonComponent implements OnInit {

  @Input() registration: IRegistration;

  get isEmpty(): boolean {
    return this.registrationService.isRegistrationEmpty(this.registration);
  }

  get isDisabled(): boolean {
    return this.isEmpty || this.isSending;
  }

  isSending = false;

  constructor(
    private registrationService: RegistrationService,
    private alertController: AlertController,
    private userSettingService: UserSettingService,
    private translateService: TranslateService,
    private ngZone: NgZone,
    private navController: NavController) { }

  ngOnInit(): void {
    this.isSending = false;
  }

  send(): void {
    if (!this.isSending) {
      this.isSending = true;
      setTimeout(async () => {
        try {
          const userSettings = await this.userSettingService.userSetting$.pipe(take(1)).toPromise();
          await this.registrationService.sendRegistration(userSettings.appMode, this.registration);
        } finally {
          this.ngZone.run(() => {
            this.isSending = false;
          });
        }
      }, 200);
    }
  }

  async delete(): Promise<void> {
    const userSettings = await this.userSettingService.userSetting$.pipe(take(1)).toPromise();
    const translations = await this.translateService
      .get(['REGISTRATION.DELETE', 'REGISTRATION.DELETE_CONFIRM', 'ALERT.OK', 'ALERT.CANCEL']).toPromise();
    const alert = await this.alertController.create({
      header: translations['REGISTRATION.DELETE'],
      message: translations['REGISTRATION.DELETE_CONFIRM'],
      buttons: [
        {
          text: translations['ALERT.CANCEL'],
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: translations['ALERT.OK'],
          handler: async () => {
            await this.registrationService.deleteRegistrationById(userSettings.appMode, this.registration.id);
            this.navController.navigateRoot('');
          }
        }
      ]
    });
    await alert.present();
  }

}
