import { StatusBar, Style } from '@capacitor/status-bar';
import { AppMode } from '../modules/common-core/models';

/**
 * Returnerer tema-fargenavn for header på bakgrunn av valgt appmodus.
 * Vi har CSS-variable for bakgrunnsfarge i header som passer med tema-fargenavnet.
 * Eksempel: Hvis appMode er Demo, returneres 'danger'. CSS-variabelen som styrer fargen blir da --ion-color-danger.
 */
export const getHeaderThemeColor = (appMode: AppMode | undefined): string => {
  switch (appMode) {
    case AppMode.Demo:
      return 'danger';
    case AppMode.Test:
      return 'success';
  }
  return 'primary';
};

/**
 * Setter bakgrunnsfarge på statuslinja i OS'et til det samme som menylinja øverst
 *
 * NB: Det virker som farger definert i android/app/src/main/res/values/styles.xml også har en effekt,
 * i alle fall inntil setBackgroundColor kalles første gang.
 *
 * Det virker også som setBackgroundColor ikke har noen effekt om den kalles for tidlig under oppstarten.
 */
export async function setStatusBarBackgroundColor(appMode: AppMode = AppMode.Prod) {
  const themeColor = getHeaderThemeColor(appMode);

  // Henter hex-verdien for fargen fra CSS
  const documentStyle = getComputedStyle(document.body);
  const colorValue = documentStyle.getPropertyValue(`--ion-color-${themeColor}`);

  await StatusBar.setBackgroundColor({ color: colorValue });
  await StatusBar.setStyle({ style: Style.Dark }); // Lys tekst
}
