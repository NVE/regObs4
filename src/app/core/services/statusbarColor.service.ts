import { UserSettingService } from './user-setting/user-setting.service';
import { inject, Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { getHeaderThemeColor as getHeaderThemeColor } from 'src/app/utils/color-utils';

/**
 * Setter bakgrunnsfarge på statuslinja i OS'et til det samme som menylinja øverst
 * Fargen på menylinja endres når appMode endres.
 */
@Injectable({
  providedIn: 'root',
})
export class StatusbarColorService {
  private userSettingService = inject(UserSettingService);

  constructor() {
    if (Capacitor.isNativePlatform()) {
      // Setter bakgrunnsfarge på statuslinja i OS'et til det samme som "menylinja" øverst
      this.userSettingService.appMode$.subscribe((appMode) => {
        const themeColor = getHeaderThemeColor(appMode);

        // Henter hex-verdien for fargen fra CSS
        const documentStyle = getComputedStyle(document.body);
        const colorValue = documentStyle.getPropertyValue(`--ion-color-${themeColor}`);

        StatusBar.setBackgroundColor({ color: colorValue });
        StatusBar.setStyle({ style: Style.Dark }); // Lys tekst
      });
    }
  }
}
