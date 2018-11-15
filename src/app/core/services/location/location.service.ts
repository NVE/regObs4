import { Injectable } from '@angular/core';
import { UserSettingService } from '../user-setting/user-setting.service';
import * as RegobsApi from '../../../modules/regobs-api/services';
import { settings } from '../../../../settings';
import { AppMode } from '../../models/app-mode.enum';
import { nSQL } from 'nano-sql';
import { NanoSql } from '../../../../nanosql';
import { ObsLocationsResponseDtoV2 } from '../../../modules/regobs-api/models';
import { GeoHazard } from '../../models/geo-hazard.enum';
import { switchMap, debounceTime, map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import * as L from 'leaflet';
import { MapService } from '../../../modules/map/services/map/map.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private userSettingService: UserSettingService,
    private apiLocationService: RegobsApi.LocationService,
    private mapService: MapService) { }

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

    const tableName = NanoSql.getInstanceName(NanoSql.TABLES.LOCATION.name, userSettings.appMode);
    nSQL(tableName).loadJS(tableName, result, true);
  }

  getLocationsInViewAsObservable() {
    return combineLatest(
      this.userSettingService.userSettingObservable$,
      this.mapService.mapViewObservable$
    )
      .pipe(switchMap(([userSetting, mapView]) =>
        this.getLocationsAsObservable(
          userSetting.appMode,
          userSetting.currentGeoHazard,
          mapView.bounds))
        , debounceTime(200));
  }

  getLocationsAsObservable(appMode: AppMode, geoHazard: GeoHazard, bounds: L.LatLngBounds) {
    return nSQL().observable<ObsLocationsResponseDtoV2[]>(() => {
      return NanoSql.getInstance(NanoSql.TABLES.LOCATION.name, appMode)
        .query('select').where((item: ObsLocationsResponseDtoV2) => item.GeoHazardId === geoHazard
          && bounds.contains(L.latLng(item.LatLngObject.Latitude, item.LatLngObject.Longitude))).emit();
    }).toRxJS();
  }
}
