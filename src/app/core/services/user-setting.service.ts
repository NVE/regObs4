import { Injectable } from '@angular/core';
import { UserSetting } from '../models/user-settings.model';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { GeoHazard } from '../models/geo-hazard.enum';
import { AppMode } from '../models/app-mode.enum';

const STORAGE_KEY_NAME = 'UserSettings';
const DEFAULT_SETTINGS: UserSetting = {
  appMode: AppMode.Prod,
  language: 'no',
  currentGeoHazard: GeoHazard.Snow,
  observationDaysBack: [
    { geoHazard: GeoHazard.Snow, daysBack: 2 },
    { geoHazard: GeoHazard.Ice, daysBack: 7 },
    { geoHazard: GeoHazard.Dirt, daysBack: 3 },
    { geoHazard: GeoHazard.Water, daysBack: 3 },
  ]
};

@Injectable({
  providedIn: 'root'
})
export class UserSettingService {

  constructor(private storage: Storage, private translate: TranslateService) {
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
    const newSettings = await this.storage.set(STORAGE_KEY_NAME, userSetting);
    this.translate.use(userSetting.language);
    return newSettings;
  }
}
