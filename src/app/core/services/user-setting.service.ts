import { Injectable } from '@angular/core';
import { UserSetting } from '../models/user-settings.model';
import { Storage } from '@ionic/storage';
const STORAGE_KEY_NAME = 'UserSettings';
const DEFAULT_SETTINGS: UserSetting = { appMode: 'PROD' };

@Injectable({
  providedIn: 'root'
})
export class UserSettingService {

  constructor(private storage: Storage) {
  }

  async getUserSettings(): Promise<UserSetting> {
    await this.storage.ready();
    const userSettings: UserSetting = await this.storage.get(STORAGE_KEY_NAME);
    if (userSettings !== null) {
      return userSettings;
    } else {
      return DEFAULT_SETTINGS;
    }
  }

  async saveUserSettings(userSetting: UserSetting): Promise<UserSetting> {
    await this.storage.ready();
    return await this.storage.set(STORAGE_KEY_NAME, userSetting);
  }
}
