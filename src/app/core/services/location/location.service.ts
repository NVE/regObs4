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
import { MapService } from '../../../modules/map/services/map/map.service';
import * as turf from '@turf/turf';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private userSettingService: UserSettingService,
    private apiLocationService: RegobsApi.LocationService,
    private mapService: MapService) { }

  async updateLocationWithinRadius(geoHazard: GeoHazard, lat: number, lng: number, radius: number) {
    const userSettings = await this.userSettingService.getUserSettings();
    const params: RegobsApi.LocationService.LocationWithinRadiusParams = {
      geoHazardTypeIds: [geoHazard],
      radius,
      latitude: lat,
      longitude: lng,
      returnCount: 10000, // If this is too small, delete locations no longer in result might clean up too much
    };
    this.apiLocationService.rootUrl = settings.services.regObs.apiUrl[userSettings.appMode];
    const result = await this.apiLocationService.LocationWithinRadius(params).toPromise();
    console.log('[INFO][LocationService] Got new locations: ', result);

    const tableName = NanoSql.getInstanceName(NanoSql.TABLES.LOCATION.name, userSettings.appMode);
    await nSQL(tableName).loadJS(tableName, result, true);
    // Cleanup deleted records. This also triggers change
    await this.deleteLocationsNoLongerInResult(userSettings.appMode, geoHazard, lat, lng, radius, result);
  }

  getLocationsAsObservable(geoHazard: GeoHazard) {
    return this.userSettingService.userSettingObservable$
      .pipe(switchMap((userSetting) =>
        this.getLocationsFromDbAsObservable(
          userSetting.appMode,
          geoHazard)), debounceTime(200));
  }

  private async deleteLocationsNoLongerInResult(
    appMode: AppMode, geoHazard: GeoHazard, lat: number, lng: number, radius: number, result: ObsLocationsResponseDtoV2[]) {
    const deleteResult = await NanoSql.getInstance(NanoSql.TABLES.LOCATION.name, appMode)
      .query('delete').where((item: ObsLocationsResponseDtoV2) => item.GeoHazardId === geoHazard
        && this.withinRadius(item, lat, lng, radius) && !result.find((x) => x.Id === item.Id)).exec();
    console.log('[INFO][LocationService] Deleted locations no longer in results: ', deleteResult);
  }

  private withinRadius(item: ObsLocationsResponseDtoV2, lat: number, lng: number, radius: number) {
    const buffered = turf.buffer(turf.point([lng, lat]), radius, { units: 'meters' });
    return turf.inside(turf.point([item.LatLngObject.Longitude, item.LatLngObject.Latitude]), buffered);
  }

  // getLocationsAsObservable(appMode: AppMode, geoHazard: GeoHazard, bounds: L.LatLngBounds) {
  //   return nSQL().observable<ObsLocationsResponseDtoV2[]>(() => {
  //     return NanoSql.getInstance(NanoSql.TABLES.LOCATION.name, appMode)
  //       .query('select').where((item: ObsLocationsResponseDtoV2) => item.GeoHazardId === geoHazard
  //         && bounds.contains(L.latLng(item.LatLngObject.Latitude, item.LatLngObject.Longitude))).emit();
  //   }).toRxJS();
  // }

  getLocationsFromDbAsObservable(appMode: AppMode, geoHazard: GeoHazard) {
    return nSQL().observable<ObsLocationsResponseDtoV2[]>(() => {
      return NanoSql.getInstance(NanoSql.TABLES.LOCATION.name, appMode)
        .query('select').where(['GeoHazardId', '=', geoHazard]).emit();
    }).toRxJS();
  }
}
