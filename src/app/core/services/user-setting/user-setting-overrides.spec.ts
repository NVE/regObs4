import { UserSetting } from '../../models/user-settings.model';
import { applyUserSettingOverrides, parseLastOverriden, UserSettingOverrides } from './user-setting-overrides';

describe('parseLastOverriden', () => {
  it('should parse to number if it is undefined', () => {
    const userSettings = {} as UserSetting;
    const lastOverriden = parseLastOverriden(userSettings);
    expect(lastOverriden).toBe(0);
  });

  it('should parse to number if it is invalid Date', () => {
    const userSettings = { lastOverridden: new Date('test') } as unknown as UserSetting;
    const lastOverriden = parseLastOverriden(userSettings);
    expect(lastOverriden).toBe(0);
  });

  it('should parse to number if it is Date', () => {
    const date = new Date('2023-09-07T12:00:00');
    const ms = date.getTime();
    const userSettings = { lastOverridden: date } as unknown as UserSetting;
    const lastOverriden = parseLastOverriden(userSettings);
    expect(lastOverriden).toBe(ms);
  });

  it('should just return value if it is number', () => {
    const ms = Date.now();
    const userSettings = { lastOverridden: ms } as UserSetting;
    const lastOverriden = parseLastOverriden(userSettings);
    expect(lastOverriden).toBe(ms);
  });
});

describe('applyUserSettingOverrides', () => {
  it('should apply overrides if override has newer date-number', () => {
    const userSettings = { showMapCenter: false } as UserSetting;
    const overrides: UserSettingOverrides = [[Date.now(), 'showMapCenter', true]];
    const updatedUserSettings = applyUserSettingOverrides(userSettings, overrides);
    expect(updatedUserSettings.showMapCenter).toBe(true);
  });

  it('should not apply overrides if override has older date than usersettings', () => {
    const now = Date.now();
    const userSettings = { showMapCenter: false, lastOverridden: now } as UserSetting;
    const overrides: UserSettingOverrides = [[now - 1000, 'showMapCenter', true]];
    const updatedUserSettings = applyUserSettingOverrides(userSettings, overrides);
    expect(updatedUserSettings.showMapCenter).toBe(false);
  });

  it('should apply one of many overrides if one override has newer date than usersettings', () => {
    const now = Date.now();
    const userSettings = { showMapCenter: false, lastOverridden: now - 1000, showGeoSelectInfo: false } as UserSetting;
    const overrides: UserSettingOverrides = [
      [now - 2000, 'showMapCenter', true],
      [now, 'showGeoSelectInfo', true],
    ];
    const updatedUserSettings = applyUserSettingOverrides(userSettings, overrides);
    expect(updatedUserSettings.showMapCenter).toBe(false);
    expect(updatedUserSettings.showGeoSelectInfo).toBe(true);
    expect(updatedUserSettings.lastOverridden).toBe(now);
  });

  it('should update lastOverriden to ms if it is Date', () => {
    const date = new Date('2023-09-07 12:00');
    const now = Date.now();
    const userSettings = {
      lastOverridden: date,
      showGeoSelectInfo: false,
    } as unknown as UserSetting;
    const overrides: UserSettingOverrides = [[now, 'showGeoSelectInfo', true]];
    const updatedUserSettings = applyUserSettingOverrides(userSettings, overrides);
    expect(updatedUserSettings.lastOverridden).toBe(now);
  });

  it('should update lastOverriden to ms if it is Date', () => {
    const date = new Date('2025-02-14 12:00');
    const overrideTime = date.getTime() - 1000;
    const userSettings = {
      lastOverridden: date,
      showGeoSelectInfo: false,
    } as unknown as UserSetting;
    const overrides: UserSettingOverrides = [[overrideTime, 'showGeoSelectInfo', true]];
    const updatedUserSettings = applyUserSettingOverrides(userSettings, overrides);
    expect(updatedUserSettings.lastOverridden).toBe(date.getTime());
  });
});
