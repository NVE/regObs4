import { Injectable } from '@angular/core';
import { UserSettingService } from '../user-setting/user-setting.service';
import * as RegobsApi from '../../../modules/regobs-api/services';
import { settings } from '../../../../settings';
import { AppMode } from '../../models/app-mode.enum';
import { NanoSql } from '../../../../nanosql';
import { ObsLocationsResponseDtoV2 } from '../../../modules/regobs-api/models';
import { GeoHazard } from '../../models/geo-hazard.enum';
import { switchMap, tap } from 'rxjs/operators';
import * as turf from '@turf/turf';
import { LoginService } from '../../../modules/login/services/login.service';
import { DbHelperService } from '../db-helper/db-helper.service';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';
import { LogLevel } from '../../../modules/shared/services/logging/log-level.model';
import { NanoSqlObservableHelper } from '../../helpers/nano-sql/nanoObserverToRxjs';

const DEBUG_TAG = 'LocationService';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private latestLocations: BehaviorSubject<{ [key: string]: ObsLocationsResponseDtoV2[] }>;

  constructor(
    private userSettingService: UserSettingService,
    private loginService: LoginService,
    private loggingService: LoggingService,
    private dbHelperService: DbHelperService,
    private apiLocationService: RegobsApi.LocationService) {
    this.latestLocations = new BehaviorSubject({});
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
    const result = await this.apiLocationService.LocationWithinRadius(params).toPromise();

    this.saveLatestLocations(result, userSettings.appMode, geoHazard);

    this.saveResultsToDb(result, userSettings.appMode, geoHazard, lat, lng, radius);
  }

  private getLatestKey(appMode: AppMode, geoHazard: GeoHazard) {
    return `${appMode}_${geoHazard}`;
  }

  private saveLatestLocations(items: ObsLocationsResponseDtoV2[], appMode: AppMode, geoHazard: GeoHazard) {
    const currentValue = this.latestLocations.getValue();
    currentValue[this.getLatestKey(appMode, geoHazard)] = items;
    this.latestLocations.next(currentValue);
  }

  private async saveResultsToDb(items: ObsLocationsResponseDtoV2[],
    appMode: AppMode, geoHazard: GeoHazard, lat: number, lng: number, radius: number) {
    try {
      const tableName = NanoSql.getInstanceName(NanoSql.TABLES.LOCATION.name, appMode);
      await this.dbHelperService.fastInsert(tableName, items, (loc) => loc.Id, false);
      // Cleanup deleted records. This also triggers change
      await this.deleteLocationsNoLongerInResult(appMode, geoHazard, lat, lng, radius, items);
    } catch (err) {
      this.loggingService.log('Could not save new warnings to db', err, LogLevel.Warning, DEBUG_TAG);
    }
  }

  getLocationsAsObservable(geoHazard: GeoHazard) {
    return combineLatest(this.userSettingService.appMode$, this.latestLocations.asObservable())
      .pipe(switchMap(([appMode, latestLocations]) =>
        this.getLatestLocationsOrFallbackToOffline(latestLocations, appMode, geoHazard)),
        tap((val) => this.loggingService.debug('Location observable changed', LocationService.name, val))
      );
  }

  private getLatestLocationsOrFallbackToOffline(latest: { [key: string]: ObsLocationsResponseDtoV2[] },
    appMode: AppMode,
    geoHazard: GeoHazard) {
    return latest[this.getLatestKey(appMode, geoHazard)] !== undefined ?
      of(latest[this.getLatestKey(appMode, geoHazard)])
      : this.getLocationsFromDbAsObservable(appMode, geoHazard);
  }

  private async deleteLocationsNoLongerInResult(
    appMode: AppMode, geoHazard: GeoHazard, lat: number, lng: number, radius: number, result: ObsLocationsResponseDtoV2[]) {
    await NanoSql.getInstance(NanoSql.TABLES.LOCATION.name, appMode)
      .query('delete').where((item: ObsLocationsResponseDtoV2) => item.GeoHazardId === geoHazard
        && this.withinRadius(item, lat, lng, radius) && !result.find((x) => x.Id === item.Id)).exec();
  }

  private withinRadius(item: ObsLocationsResponseDtoV2, lat: number, lng: number, radius: number) {
    if (radius > 0) {
      try {
        const buffered = turf.buffer(turf.point([lng, lat]), radius, { units: 'meters' });
        return turf.inside(turf.point([item.LatLngObject.Longitude, item.LatLngObject.Latitude]), buffered);
      } catch (err) {
        this.loggingService.log('Could not check withinRadius', err, LogLevel.Warning, DEBUG_TAG, item, lat, lng, radius);
      }
    }
    return false;
  }

  getLocationsFromDbAsObservable(appMode: AppMode, geoHazard: GeoHazard) {
    return NanoSqlObservableHelper.toRxJS<ObsLocationsResponseDtoV2[]>(
      NanoSql.getInstance(NanoSql.TABLES.LOCATION.name, appMode)
        .query('select').where(['GeoHazardId', '=', geoHazard]).listen({
          debounce: 200
        })
    );
  }
}
