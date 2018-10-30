import { Component, OnInit, Input } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { IRegistration } from '../../models/registration.model';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';

@Component({
  selector: 'app-send-button',
  templateUrl: './send-button.component.html',
  styleUrls: ['./send-button.component.scss']
})
export class SendButtonComponent implements OnInit {

  @Input() registration: IRegistration;

  constructor(
    private registrationService: RegistrationService,
    private alertController: AlertController,
    private userSettingService: UserSettingService,
    private translateService: TranslateService,
    private navController: NavController) { }

  ngOnInit() {
  }

  send() {
    const clone = { ...this.registration };
    this.registrationService.sendRegistration(clone);
    this.registration = null;
  }

  async delete() {
    const userSetting = await this.userSettingService.getUserSettings();
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
            await this.registrationService.deleteRegistrationById(userSetting.appMode, this.registration.Id);
            this.navController.navigateRoot('');
          }
        }
      ]
    });
    await alert.present();
  }

}
