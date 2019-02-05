import { Injectable } from '@angular/core';
import { UserSettingService } from '../user-setting/user-setting.service';
import * as RegobsApi from '../../../modules/regobs-api/services';
import { settings } from '../../../../settings';
import { AppMode } from '../../models/app-mode.enum';
import { NanoSql } from '../../../../nanosql';
import { ObsLocationsResponseDtoV2 } from '../../../modules/regobs-api/models';
import { GeoHazard } from '../../models/geo-hazard.enum';
import { switchMap, debounceTime, map, tap } from 'rxjs/operators';
import * as turf from '@turf/turf';
import { LoginService } from '../../../modules/login/services/login.service';
import { DbHelperService } from '../db-helper/db-helper.service';
import { NanoSqlObservableHelper } from '../../helpers/nano-sql/nanoObserverToRxjs';
import { BehaviorSubject, from, Observable, combineLatest } from 'rxjs';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private changeTrigger: BehaviorSubject<void>;

  constructor(
    private userSettingService: UserSettingService,
    private loginService: LoginService,
    private loggingService: LoggingService,
    private dbHelperService: DbHelperService,
    private apiLocationService: RegobsApi.LocationService) {
    this.changeTrigger = new BehaviorSubject<void>(null);
  }

  async updateLocationWithinRadius(geoHazard: GeoHazard, lat: number, lng: number, radius: number) {
    const userSettings = await this.userSettingService.getUserSettings();
    const loggedInUser = await this.loginService.getLoggedInUser();
    const params: RegobsApi.LocationService.LocationWithinRadiusParams = {
      geoHazardTypeIds: [geoHazard],
      radius,
      latitude: lat,
      longitude: lng,
      observerGuid: loggedInUser.isLoggedIn ? loggedInUser.user.Guid : null,
      returnCount: 10000, // If this is too small, delete locations no longer in result might clean up too much
    };
    this.apiLocationService.rootUrl = settings.services.regObs.apiUrl[userSettings.appMode];
    const result = await this.apiLocationService.LocationWithinRadius(params).toPromise();
    const tableName = NanoSql.getInstanceName(NanoSql.TABLES.LOCATION.name, userSettings.appMode);
    await this.dbHelperService.fastInsert(tableName, result, (loc) => loc.Id, false);
    // Cleanup deleted records. This also triggers change
    await this.deleteLocationsNoLongerInResult(userSettings.appMode, geoHazard, lat, lng, radius, result);

    // Trigger change
    this.changeTrigger.next();
  }

  getLocationsAsObservable(geoHazard: GeoHazard) {
    return combineLatest(this.userSettingService.appMode$, this.changeTrigger)
      .pipe(switchMap(([appMode, _]) =>
        this.getLocationsFromDbAsObservable(
          appMode,
          geoHazard)),
        debounceTime(200),
        tap((val) => this.loggingService.debug('Location observable changed', LocationService.name, val))
      );
  }

  private async deleteLocationsNoLongerInResult(
    appMode: AppMode, geoHazard: GeoHazard, lat: number, lng: number, radius: number, result: ObsLocationsResponseDtoV2[]) {
    await NanoSql.getInstance(NanoSql.TABLES.LOCATION.name, appMode)
      .query('delete').where((item: ObsLocationsResponseDtoV2) => item.GeoHazardId === geoHazard
        && this.withinRadius(item, lat, lng, radius) && !result.find((x) => x.Id === item.Id)).exec();
  }

  private withinRadius(item: ObsLocationsResponseDtoV2, lat: number, lng: number, radius: number) {
    const buffered = turf.buffer(turf.point([lng, lat]), radius, { units: 'meters' });
    return turf.inside(turf.point([item.LatLngObject.Longitude, item.LatLngObject.Latitude]), buffered);
  }

  getLocationsFromDbAsObservable(appMode: AppMode, geoHazard: GeoHazard): Observable<ObsLocationsResponseDtoV2[]> {
    return from(
      NanoSql.getInstance(NanoSql.TABLES.LOCATION.name, appMode)
        .query('select').where((x) => x.GeoHazardId === geoHazard).exec()
    );
  }

  // getLocationsFromDbAsObservable(appMode: AppMode, geoHazard: GeoHazard) {
  //   return NanoSqlObservableHelper.toRxJS<ObsLocationsResponseDtoV2[]>(
  //     NanoSql.getInstance(NanoSql.TABLES.LOCATION.name, appMode)
  //       .query('select').where(['GeoHazardId', '=', geoHazard]).listen()
  //   );
  // }
}
