import { Injectable } from '@angular/core';
import { UserSettingService } from '../user-setting/user-setting.service';
import { map, take, filter, switchMap, delay } from 'rxjs/operators';
import moment from 'moment';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of, from } from 'rxjs';
import { settings } from '../../../../settings';

@Injectable({
  providedIn: 'root',
})
export class PopupInfoService {
  constructor(
    private userSettingService: UserSettingService,
    private alertController: AlertController,
    private translateService: TranslateService
  ) {}

  checkObservationInfoPopup(_: string = null, delayMs = 2000) {
    return this.checkInfoPopup(
      delayMs,
      'infoAboutObservationsRecievedTimestamps',
      'static',
      'POPUP_DISCLAMER.ABOUT_OBSERVATIONS.HEADER',
      'POPUP_DISCLAMER.ABOUT_OBSERVATIONS.MESSAGE',
      'POPUP_DISCLAMER.OK_I_UNDERSTAND'
    );
  }

  checkSupportMapInfoPopup(_: string = null, delayMs = 2000) {
    return this.checkInfoPopup(
      delayMs,
      'infoAboutSupportMapsRecievedTimestamps',
      'static',
      'POPUP_DISCLAMER.ABOUT_SUPPORT_MAPS.HEADER',
      'POPUP_DISCLAMER.ABOUT_SUPPORT_MAPS.MESSAGE',
      'POPUP_DISCLAMER.OK_I_UNDERSTAND'
    );
  }

  checkOfflineSupportMapInfoPopup(name: string, delayMs = 2000) {
    return this.checkInfoPopup(
      delayMs,
      'infoAboutOfflineSupportMapsRecievedTimestamps',
      name,
      'POPUP_DISCLAMER.ABOUT_OFFLINE_SUPPORT_MAPS.HEADER',
      'POPUP_DISCLAMER.ABOUT_OFFLINE_SUPPORT_MAPS.MESSAGE',
      'POPUP_DISCLAMER.OK_I_UNDERSTAND'
    );
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
      buttons: [okText],
    });
    await alert.present();
  }

  geAlertTranslations(
    headerKey: string,
    messageKey: string,
    okKey: string
  ): Observable<{ header: string; message: string; okText: string }> {
    return this.translateService.get([headerKey, messageKey, okKey]).pipe(
      map((translations) => ({
        header: translations[headerKey],
        message: translations[messageKey],
        okText: translations[okKey],
      }))
    );
  }

  async saveInfoAboutRecievedTimestamp(timestampType: string, timestampName: string) {
    let userSettings = await this.userSettingService.userSetting$.pipe(take(1)).toPromise();
    userSettings = {
      ...userSettings,
      [timestampType]:
        timestampType in userSettings
          ? {
              ...userSettings[timestampType],
              [timestampName]: moment().unix(),
            }
          : { [timestampName]: moment().unix() },
    };
    this.userSettingService.saveUserSettings(userSettings);
  }

  private checkInfoPopup(
    delayMs = 2000,
    timestampType: string,
    timestampName: string,
    header: string,
    msg: string,
    ok_txt: string,
    refreshTimeMs: number = settings.popupDisclamerRefreshTimeMs
  ) {
    return this.userSettingService.userSetting$.pipe(
      take(1),
      delay(delayMs),
      filter((us) =>
        this.checkLastTimestamp(refreshTimeMs, timestampType in us ? us[timestampType][timestampName] : null)
      ),
      switchMap(() => this.geAlertTranslations(header, msg, ok_txt)),
      switchMap((translations) => from(this.showAlert(translations.header, translations.message, translations.okText))),
      switchMap(() => from(this.saveInfoAboutRecievedTimestamp(timestampType, timestampName)))
    );
  }
}
