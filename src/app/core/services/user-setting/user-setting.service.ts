import { Injectable } from '@angular/core';
import { UserSetting } from '../../models/user-settings.model';
import { TranslateService } from '@ngx-translate/core';
import { GeoHazard } from '../../models/geo-hazard.enum';
import { AppMode } from '../../models/app-mode.enum';
import { settings } from '../../../../settings';
import { Events } from '@ionic/angular';
import { NanoSql } from '../../../../nanosql';
import { nSQL } from 'nano-sql';
import { Observable } from 'rxjs';
import { map, take, share, shareReplay, distinctUntilChanged } from 'rxjs/operators';
import { LangKey } from '../../models/langKey';
import { AppCountry } from '../../models/app-country.enum';

@Injectable({
  providedIn: 'root'
})
export class UserSettingService {

  // Setting this observable to be a shared instance since
  // UserSettingService is a singleton service.
  // The observable will be shared with many services
  private _userSettingObservable: Observable<UserSetting>;
  private _currentGeoHazardObservable: Observable<GeoHazard>;

  get userSettingObservable$() {
    return this._userSettingObservable;
  }

  get currentGeoHazardObservable$() {
    return this._currentGeoHazardObservable;
  }

  constructor(private translate: TranslateService, private events: Events) {
    this._userSettingObservable = this.getUserSettingsAsObservable();
    this._currentGeoHazardObservable = this._userSettingObservable.pipe(
      map((val) => val.currentGeoHazard),
      distinctUntilChanged(),
      shareReplay(1));
  }

  private getDefaultSettings(): UserSetting {
    return {
      appMode: AppMode.Prod,
      language: LangKey.no,
      country: AppCountry.norway,
      currentGeoHazard: GeoHazard.Snow,
      observationDaysBack: [
        { geoHazard: GeoHazard.Snow, daysBack: 2 },
        { geoHazard: GeoHazard.Ice, daysBack: 7 },
        { geoHazard: GeoHazard.Dirt, daysBack: 3 },
        { geoHazard: GeoHazard.Water, daysBack: 3 },
      ],
      completedStartWizard: false,
      supportTiles: settings.map.tiles.supportTiles,
      showMapCenter: false,
    };
  }

  getUserSettings(): Promise<UserSetting> {
    return this.userSettingObservable$.pipe(take(1)).toPromise();
  }

  private getUserSettingsAsObservable(): Observable<UserSetting> {
    return nSQL().observable<UserSetting[]>(() => {
      return nSQL(NanoSql.TABLES.USER_SETTINGS.name).query('select').emit();
    }).toRxJS().pipe(
      map((val: UserSetting[]) => val.length > 0 ? val[0] : this.getDefaultSettings()),
      shareReplay(1)
    );
  }

  async saveUserSettings(userSetting: UserSetting) {
    // await this.storage.ready();
    // const newSettings = await this.storage.set(STORAGE_KEY_NAME, userSetting);
    await nSQL(NanoSql.TABLES.USER_SETTINGS.name).query('upsert', { id: 'usersettings', ...userSetting }).exec();

    // TODO: Subscribe to observable instead
    this.translate.use(LangKey[userSetting.language]);
    this.events.publish(settings.events.userSettingsChanged, userSetting);
  }
}
