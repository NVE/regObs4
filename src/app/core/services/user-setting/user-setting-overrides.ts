/**
 * Overstyring av brukerinnstillinger.
 *
 * Ble opprinnelig lagt til for å håndtere at kartsenteret skulle være default på for alle brukere.
 * Dette har vi senere moderert til å gjelde alle brukere på ios / android.
 *
 * Koden ble flytta til denne fila for å rydde opp + fikse en feil.
 */
import { Capacitor } from '@capacitor/core';
import { UserSetting } from '../../models/user-settings.model';

/**
 * Hver overstyring er en tuple som inneholder:
 * - Et tidsstempel (nummer) for datoen for overstyringen (ms siden epoch).
 * - En nøkkel (keyof UserSetting) for innstillingen som skal overstyres.
 * - Ny verdien for innstillingen (any).
 */
export type UserSettingOverrides = [number, keyof UserSetting, any][];

/**
 * Liste over overstyringer av brukerinnstillinger.
 *
 * Eksempel:
 * - 2023-09-07 12:00: Overstyr 'showMapCenter' innstillingen basert på om appen kjører på en native plattform.
 *   Altså: Kjører appen på ios/android, sett showMapCenter til true.
 *
 * Skal du legge til en ny overstyring er det her du gjør det..
 */
export const USER_SETTINGS_OVERRIDES: UserSettingOverrides = [
  // 2023-09-07 12:00
  [1694080800000, 'showMapCenter', Capacitor.isNativePlatform()],
];

/**
 * Henter tidsstempel for siste overstyring fra brukerinnstillingene.
 *
 * Funksjonen ble lagt til for å håndtere at lastOverridden opprinnelig var et
 * dato-objekt, men når dette parses på web blir det til "Invalid Date".
 * Nummer er tryggere.
 *
 * @param userSettings - Brukerinnstillingene.
 * @returns Tidsstempelet for siste overstyring som et nummer.
 */
export function parseLastOverriden(userSettings: UserSetting): number {
  let { lastOverridden } = userSettings;
  if (typeof lastOverridden !== 'number') {
    if (
      typeof lastOverridden === 'object' &&
      <any>lastOverridden instanceof Date &&
      !isNaN((<Date>lastOverridden).getTime())
    ) {
      lastOverridden = (<Date>lastOverridden).getTime();
    } else {
      lastOverridden = 0;
    }
  }
  return lastOverridden;
}

/**
 * Returnerer brukerinnstillinger med oversyrte verdier.
 *
 * @param userSettings - De nåværende brukerinnstillingene.
 * @param overrides - Listen over overstyringer som skal anvendes.
 * @returns De oppdaterte brukerinnstillingene med overstyrte verdier.
 */
export function applyUserSettingOverrides(userSettings: UserSetting, overrides: UserSettingOverrides): UserSetting {
  const lastOverridden = parseLastOverriden(userSettings);

  const overridesToApply = overrides.filter(([date]) => date > lastOverridden);
  if (overridesToApply.length > 0) {
    const overrideSettings = Object.fromEntries(overridesToApply.map(([, key, value]) => [key, value]));
    return {
      ...userSettings,
      ...overrideSettings,
      lastOverridden: Math.max(...overrides.map(([date]) => date)),
    };
  }

  return {
    ...userSettings,
    lastOverridden,
  };
}
