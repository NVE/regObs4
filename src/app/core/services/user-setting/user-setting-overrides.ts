import { Capacitor } from '@capacitor/core';
import { UserSetting } from '../../models/user-settings.model';

export type UserSettingOverrides = [number, keyof UserSetting, any][];

export const USER_SETTINGS_OVERRIDES: UserSettingOverrides = [
  // 2023-09-07 12:00
  [1694080800000, 'showMapCenter', Capacitor.isNativePlatform()],
];

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
