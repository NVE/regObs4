import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-send-button',
  templateUrl: './send-button.component.html',
  styleUrls: ['./send-button.component.scss']
})
export class SendButtonComponent implements OnInit {
  constructor(
    private registrationService: RegistrationService,
    private alertController: AlertController,
    private translateService: TranslateService,
    private navController: NavController) { }

  ngOnInit() {
  }

  async delete() {
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
            await this.registrationService.deleteCurrentRegistration();
            this.navController.navigateRoot('');
          }
        }
      ]
    });
    await alert.present();
  }

}
