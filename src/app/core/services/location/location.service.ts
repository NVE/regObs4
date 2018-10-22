import { Injectable } from '@angular/core';
import { UserSettingService } from '../user-setting/user-setting.service';
import * as RegobsApi from '../../../modules/regobs-api/services';
import { settings } from '../../../../settings';
import { AppMode } from '../../models/app-mode.enum';
import { nSQL } from 'nano-sql';
import { NanoSql } from '../../../../nanosql';
import { ObsLocationsResponseDtoV2 } from '../../../modules/regobs-api/models';
import { GeoHazard } from '../../models/geo-hazard.enum';
import { switchMap, debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private userSettingService: UserSettingService, private apiLocationService: RegobsApi.LocationService) { }

  async updateLocationWithinRadius(lat: number, lng: number, radius: number) {
    const userSettings = await this.userSettingService.getUserSettings();
    const params: RegobsApi.LocationService.LocationWithinRadiusParams = {
      geoHazardTypeIds: [userSettings.currentGeoHazard],
      radius,
      latitude: lat,
      longitude: lng,
      returnCount: 1000,
    };
    this.apiLocationService.rootUrl = settings.services.regObs.apiUrl[userSettings.appMode];
    const result = await this.apiLocationService.LocationWithinRadius(params).toPromise();
    console.log(result);

    NanoSql.getInstance(NanoSql.TABLES.LOCATION.name, userSettings.appMode)
      .loadJS(NanoSql.TABLES.LOCATION.name, result, true);
  }

  getCurrentGeoHazardLocationsAsObservable() {
    return this.userSettingService.userSettingObservable$.pipe(switchMap((userSetting) =>
      this.getLocationsAsObservable(userSetting.appMode, userSetting.currentGeoHazard))
      , debounceTime(200));
  }

  getLocationsAsObservable(appMode: AppMode, geoHazard: GeoHazard) {
    return nSQL().observable<ObsLocationsResponseDtoV2[]>(() => {
      return NanoSql.getInstance(NanoSql.TABLES.LOCATION.name, appMode)
        .table(NanoSql.TABLES.LOCATION.name).query('select')
        .where(['GeoHazardId', '=', geoHazard]).emit();
    }).toRxJS();
  }
}
