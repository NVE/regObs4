import { Injectable } from '@angular/core';
import { UserSettingService } from '../user-setting/user-setting.service';
import { AlertController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs/operators';

const ALLOW_ANALYTICS_HEADER = 'SETTINGS.ALLOW_ANALYTICS_HEADER';
const ALLOW_ANALYTICS_DESCRIPTION = 'SETTINGS.ALLOW_ANALYTICS_DESCRIPTION';
const ALLOW_ANALYTICS_DESCRIPTION_LINE_2 =
  'SETTINGS.ALLOW_ANALYTICS_DESCRIPTION_LINE2';
const READ_MORE_TEXT = 'SETTINGS.READ_MORE_IN_LICENSE_AGREEMENT';
const OK = 'ALERT.FINE';
const NO_THANKS = 'ALERT.NO_THANKS';

@Injectable({
  providedIn: 'root'
})
export class UsageAnalyticsConsentService {
  constructor(
    private userSettingService: UserSettingService,
    private alertController: AlertController,
    private platform: Platform,
    private translateService: TranslateService
  ) {}

  async checkUserDataConsentDialog() {
    const userSettings = await this.userSettingService.userSetting$
      .pipe(take(1))
      .toPromise();
    if (!userSettings.consentForSendingAnalyticsDialogCompleted) {
      await this.showConsentForSendingAnalyticsDialog();
    }
  }

  async showConsentForSendingAnalyticsDialog() {
    return new Promise<void>(async (resolve) => {
      const translations = await this.translateService
        .get([
          ALLOW_ANALYTICS_HEADER,
          ALLOW_ANALYTICS_DESCRIPTION,
          ALLOW_ANALYTICS_DESCRIPTION_LINE_2,
          READ_MORE_TEXT,
          OK,
          NO_THANKS
        ])
        .toPromise();
      const cssClass = this.platform.is('ios')
        ? ['normal-weight', 'full-width']
        : [];
      const buttonOK = {
        cssClass,
        text: translations[OK],
        handler: () => this.saveSettings(true).then(() => resolve())
      };
      const buttonNo = {
        cssClass,
        text: translations[NO_THANKS],
        handler: () => this.saveSettings(false).then(() => resolve())
      };
      const buttons = this.platform.is('ios')
        ? [buttonOK, buttonNo]
        : [buttonNo, buttonOK];
      const alert = await this.alertController.create({
        header: translations[ALLOW_ANALYTICS_HEADER],
        message: `${translations[ALLOW_ANALYTICS_DESCRIPTION]}<br /><br />${translations[ALLOW_ANALYTICS_DESCRIPTION_LINE_2]}<br /><br />${translations[READ_MORE_TEXT]}`,
        buttons,
        backdropDismiss: false // Prevent from closing without choosing
      });
      await alert.present();
    });
  }

  async saveSettings(accepted: boolean) {
    const currentSettings = await this.userSettingService.userSetting$
      .pipe(take(1))
      .toPromise();
    this.userSettingService.saveUserSettings({
      ...currentSettings,
      consentForSendingAnalytics: accepted,
      consentForSendingAnalyticsDialogCompleted: true
    });
  }
}
