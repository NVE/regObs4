import { Injectable } from '@angular/core';
import { UserSettingService } from '../user-setting/user-setting.service';
import { AlertController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';

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

  private async showConsentForSendingAnalyticsDialog() {
    const translations = await firstValueFrom(this.translateService.get([
      ALLOW_ANALYTICS_HEADER,
      ALLOW_ANALYTICS_DESCRIPTION,
      ALLOW_ANALYTICS_DESCRIPTION_LINE_2,
      READ_MORE_TEXT,
      OK,
      NO_THANKS
    ], {legalUrl: this.userSettingService.legalUrl}));

    const cssClass = this.platform.is('ios') ? ['normal-weight', 'full-width'] : [];

    // Put this in a promise so we can await the answer and save it
    const showAlertAndGetAnswer: () => Promise<boolean> = () => new Promise((resolve) => {
      const buttonOK = {
        cssClass,
        text: translations[OK],
        handler: () => resolve(true)
      };
      const buttonNo = {
        cssClass,
        text: translations[NO_THANKS],
        handler: () => resolve(false)
      };
      const buttons = this.platform.is('ios') ? [buttonOK, buttonNo] : [buttonNo, buttonOK];
      this.alertController.create({
        header: translations[ALLOW_ANALYTICS_HEADER],
        message: `
          ${translations[ALLOW_ANALYTICS_DESCRIPTION]}
          <br />
          <br />
          ${translations[ALLOW_ANALYTICS_DESCRIPTION_LINE_2]}
          <br />
          <br />
          ${translations[READ_MORE_TEXT]}
        `,
        buttons,
        backdropDismiss: false // Prevent from closing without choosing
      }).then(alert => alert.present());
    });
    const yesNo = await showAlertAndGetAnswer();
    await this.saveSettings(yesNo);
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
