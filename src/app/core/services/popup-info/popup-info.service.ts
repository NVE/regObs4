import { Injectable } from '@angular/core';
import { UserSettingService } from '../user-setting/user-setting.service';
import { map, take, filter, switchMap, delay } from 'rxjs/operators';
import moment from 'moment';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of, from } from 'rxjs';
import { settings } from '../../../../settings';

@Injectable({
  providedIn: 'root'
})
export class PopupInfoService {

  constructor(private userSettingService: UserSettingService, private alertController: AlertController, private translateService: TranslateService) { }

  checkObservationInfoPopup(delayMs = 2000) {
    return this.userSettingService.userSetting$.pipe(
      take(1),
      delay(delayMs),
      filter((us) => this.checkLastTimestamp(settings.popupDisclamerRefreshTimeMs, us.infoAboutObservationsRecievedTimestamp)),
      switchMap(() => this.geAlertTranslations(
        'POPUP_DISCLAMER.ABOUT_OBSERVATIONS.HEADER',
        'POPUP_DISCLAMER.ABOUT_OBSERVATIONS.MESSAGE',
        'POPUP_DISCLAMER.OK_I_UNDERSTAND'
      )),
      switchMap((translations) => from(this.showAlert(translations.header, translations.message, translations.okText))),
      switchMap(() => from(this.saveInfoAboutObservationsRecievedTimestamp())));
  }

  checkSupportMapInfoPopup(delayMs = 2000) {
    return this.userSettingService.userSetting$.pipe(
      take(1),
      delay(delayMs),
      filter((us) => this.checkLastTimestamp(settings.popupDisclamerRefreshTimeMs, us.infoAboutSupportMapsRecievedTimestamp)),
      switchMap(() => this.geAlertTranslations(
        'POPUP_DISCLAMER.ABOUT_SUPPORT_MAPS.HEADER',
        'POPUP_DISCLAMER.ABOUT_SUPPORT_MAPS.MESSAGE',
        'POPUP_DISCLAMER.OK_I_UNDERSTAND'
      )),
      switchMap((translations) => from(this.showAlert(translations.header, translations.message, translations.okText))),
      switchMap(() => from(this.saveInfoAboutSupportMapsRecievedTimestamp())));
  }

  checkLastTimestamp(limitMs: number, lastTimestamp?: number, showWhenNull = true): boolean {
    if (lastTimestamp === undefined || lastTimestamp === null) {
      return showWhenNull;
    }
    const limit = moment().subtract(limitMs, 'milliseconds');
    return moment.unix(lastTimestamp).isBefore(limit);
  }

  async showAlert(header: string, message: string, okText: string): Promise<void> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [okText]
    });
    await alert.present();
  }

  geAlertTranslations(headerKey: string, messageKey: string, okKey: string): Observable<{ header: string, message: string, okText: string }> {
    return this.translateService
      .get([headerKey, messageKey, okKey])
      .pipe(map((translations) => ({
        header: translations[headerKey],
        message: translations[messageKey],
        okText: translations[okKey]
      })));
  }

  async saveInfoAboutObservationsRecievedTimestamp() {
    const userSettings = await this.userSettingService.userSetting$.pipe(take(1)).toPromise();
    this.userSettingService.saveUserSettings({
      ...userSettings,
      infoAboutObservationsRecievedTimestamp: moment().unix()
    });
  }

  async saveInfoAboutSupportMapsRecievedTimestamp() {
    const userSettings = await this.userSettingService.userSetting$.pipe(take(1)).toPromise();
    this.userSettingService.saveUserSettings({
      ...userSettings,
      infoAboutSupportMapsRecievedTimestamp: moment().unix()
    });
  }
}
