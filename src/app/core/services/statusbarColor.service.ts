// import { UserSettingService } from './user-setting/user-setting.service';
// import { inject, Injectable } from '@angular/core';
// import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { getHeaderThemeColor as getHeaderThemeColor } from 'src/app/utils/color-utils';
// import { EdgeToEdge } from '@capawesome/capacitor-android-edge-to-edge-support';
import { AppMode } from 'src/app/modules/common-core/models';

/**
 * Setter bakgrunnsfarge på statuslinja i OS'et til det samme som menylinja øverst
 *
 * NB: Det virker som farger definert i android/app/src/main/res/values/styles.xml også har en effekt,
 * i alle fall inntil setBackgroundColor kalles første gang.
 *
 * Det virker også som setBackgroundColor ikke har noen effekt om den kalles for tidlig under oppstarten.
 */
export async function setBackgroundColor(appMode: AppMode = AppMode.Prod) {
  const themeColor = getHeaderThemeColor(appMode);

  // Henter hex-verdien for fargen fra CSS
  const documentStyle = getComputedStyle(document.body);
  const colorValue = documentStyle.getPropertyValue(`--ion-color-${themeColor}`);

  // await EdgeToEdge.enable();
  // await EdgeToEdge.setBackgroundColor({ color: '#c0ffee' });
  await StatusBar.setBackgroundColor({ color: colorValue });
  await StatusBar.setStyle({ style: Style.Dark }); // Lys tekst
}

// /**
//  * Setter bakgrunnsfarge på statuslinja i OS'et til det samme som menylinja øverst
//  * Fargen på menylinja endres når appMode endres.
//  */
// @Injectable({
//   providedIn: 'root',
// })
// export class StatusbarColorService {
//   private userSettingService = inject(UserSettingService);

//   constructor() {
//     if (Capacitor.isNativePlatform()) {
//       // Setter bakgrunnsfarge på statuslinja i OS'et til det samme som "menylinja" øverst
//       this.userSettingService.appMode$.subscribe((appMode) => {
//         const themeColor = getHeaderThemeColor(appMode);

//         // Henter hex-verdien for fargen fra CSS
//         const documentStyle = getComputedStyle(document.body);
//         const colorValue = documentStyle.getPropertyValue(`--ion-color-${themeColor}`);

//         EdgeToEdge.setBackgroundColor({ color: '#ffffff' });
//         StatusBar.setBackgroundColor({ color: colorValue });
//         StatusBar.setStyle({ style: Style.Dark }); // Lys tekst
//       });
//     }
//   }
// }
