import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { settings } from '../../../../settings';
import { nSQL } from 'nano-sql';
import { RowCount } from '../../models/row-count.model';
import { Observable } from 'rxjs';
import { GeoHazard } from '../../models/geo-hazard.enum';
import * as moment from 'moment';
import 'moment-timezone';
import * as Rx from 'rxjs';
import { NanoSql } from '../../../../nanosql';
import { debounceTime, take, map, distinctUntilChanged, switchMap, shareReplay, bufferCount, skip } from 'rxjs/operators';
import { LoginService } from '../login/login.service';
import { LoggedInUser } from '../login/logged-in-user.model';
import { UserSettingService } from '../user-setting/user-setting.service';
import { DataLoadService } from '../../../modules/data-load/services/data-load.service';
import { AppMode } from '../../models/app-mode.enum';
import { UserSetting } from '../../models/user-settings.model';
import { LangKey } from '../../models/langKey';
import { SearchService } from '../../../modules/regobs-api/services';
import { RegistrationViewModel, ObserverResponseDto } from '../../../modules/regobs-api/models';

@Injectable({
  providedIn: 'root'
})
export class ObservationService {

  private _observationsObservable: Observable<RegistrationViewModel[]>;

  get observations$() {
    return this._observationsObservable;
  }

  constructor(
    private searchService: SearchService,
    private loginService: LoginService,
    private userSettingService: UserSettingService,
    private dataLoadService: DataLoadService,
  ) {
    this._observationsObservable = this.getObservationsAsObservable();
    this.userSettingService.userSettingObservable$.pipe(
      map((val) => `${val.appMode}_${val.currentGeoHazard}_${val.language}`),
      distinctUntilChanged(), // Only emit if app mode, current geohazard or language changed
      skip(1) // Skip first emit. This will be taken hand of by app init
    ).subscribe(() => {
      console.log('[INFO][ObervationService] App settings changed. Need to refresh observations');
      this.updateObservations();
    }); // No need to unsubscribe this observable when the service is singleton. It get destroyed when app exits.
  }

  private exludeLoggedInUser(user: LoggedInUser, reg: RegistrationViewModel) {
    return (user.isLoggedIn ? (reg.Observer.ObserverGUID !== user.user.Guid) : true); // TODO: Use observer GUID instead!
  }

  async updateObservations() {
    const user = await this.loginService.getLoggedInUser();
    const userSettings = await this.userSettingService.getUserSettings();
    for (const geoHazard of this.getPriority(userSettings.currentGeoHazard)) {
      await this.checkLastUpdatedAndUpdateDataIfNeeded(userSettings.appMode, geoHazard, user, userSettings.language);
    }
    // TODO: Update my observations if user is logged in
  }

  private getPriority(currentGeoHazard: GeoHazard) {
    if (currentGeoHazard === GeoHazard.Snow) {
      return [GeoHazard.Snow, GeoHazard.Ice, GeoHazard.Water, GeoHazard.Dirt];
    } else if (currentGeoHazard === GeoHazard.Ice) {
      return [GeoHazard.Ice, GeoHazard.Snow, GeoHazard.Water, GeoHazard.Dirt];
    } else if (currentGeoHazard === GeoHazard.Water) {
      return [GeoHazard.Water, GeoHazard.Dirt, GeoHazard.Snow, GeoHazard.Ice];
    } else if (currentGeoHazard === GeoHazard.Dirt) {
      return [GeoHazard.Dirt, GeoHazard.Water, GeoHazard.Snow, GeoHazard.Ice];
    }
  }

  private getDataLoadId(appMode: AppMode, geoHazard: GeoHazard) {
    return `${NanoSql.TABLES.OBSERVATION.name}_${geoHazard}_${appMode}`;
  }

  getAllDataLoadIds(appMode: AppMode) {
    const geoHazards = Object.keys(GeoHazard)
      .filter(key => !isNaN(Number(GeoHazard[key])))
      .map((key) => GeoHazard[key]);
    return geoHazards.map((val) => this.getDataLoadId(appMode, val));
  }

  private async checkLastUpdatedAndUpdateDataIfNeeded(appMode: AppMode, geoHazard: GeoHazard, user: LoggedInUser, language: LangKey) {
    const dataLoad = await this.dataLoadService.getState(this.getDataLoadId(appMode, geoHazard));
    const lastUpdateLimit = moment().subtract(10, 'minutes');
    const fromDate = await this.getDaysBackToFetchAsDate(geoHazard);
    if (!dataLoad.lastUpdated
      || moment(dataLoad.lastUpdated).isBefore(lastUpdateLimit)
      || moment(dataLoad.itemsFromDate).isAfter(fromDate)) {
      await this.updateObservationsForGeoHazard(appMode, geoHazard, user, language);
    } else {
      console.log(`[INFO][ObervationService] No need to update ${geoHazard}. Last updated is:`, dataLoad.lastUpdated);
    }
  }

  getLastUpdatedForCurrentGeoHazardAsObservable() {
    return this.userSettingService.userSettingObservable$.pipe(switchMap((userSettings) =>
      Rx.combineLatest(this.dataLoadService.getStateAsObservable(
        this.getDataLoadId(userSettings.appMode, userSettings.currentGeoHazard)))
    ), map((val) => val[0] && val[0].lastUpdated ? moment(val[0].lastUpdated).toDate() : null));
  }

  async updateObservationsForCurrentGeoHazard() {
    const userSettings = await this.userSettingService.getUserSettings();
    const loggedInUser = await this.loginService.getLoggedInUser();
    return this.updateObservationsForGeoHazard(
      userSettings.appMode,
      userSettings.currentGeoHazard,
      loggedInUser,
      userSettings.language);
  }

  private async getDaysBackToFetchAsDate(geoHazard: GeoHazard) {
    const daysBack = await this.getDaysBackToFetchForGeoHazard(geoHazard);
    const fromDate = moment().subtract(daysBack, 'days').startOf('day');
    return fromDate.toDate();
  }

  private async updateObservationsForGeoHazard(appMode: AppMode, geoHazard: GeoHazard, user: LoggedInUser, langKey: LangKey) {
    console.log(`[INFO][ObervationService] Updating observations for geoHazard: ${geoHazard}`);
    const dataLoadId = this.getDataLoadId(appMode, geoHazard);
    await this.dataLoadService.startLoading(dataLoadId);
    const fromDate = await this.getDaysBackToFetchAsDate(geoHazard);

    // TODO: Implement cancel? Maybe use observable and unsubscribe when cancel observable in data load table?
    const searchResult = await this.searchService.SearchAll({
      FromDate: fromDate.toISOString(),
      SelectedGeoHazards: [geoHazard],
      NumberOfRecords: settings.observations.maxObservationsToFetch,
      LangKey: langKey,
    }).toPromise();
    console.log(`[INFO] Got ${searchResult.length} new observations for geoHazard  ${geoHazard}`);
    const instanceName = NanoSql.getInstanceName(NanoSql.TABLES.OBSERVATION.name, appMode);
    await NanoSql.getInstance(NanoSql.TABLES.OBSERVATION.name, appMode).loadJS(instanceName, searchResult, true);

    // Deleting items no longer in updated result
    await this.deleteObservationNoLongerInResult(appMode, geoHazard, user, fromDate, searchResult);
    // Delete old items
    await this.deleteOldObservations(appMode, geoHazard, user);

    await this.dataLoadService.loadingCompleted(dataLoadId, searchResult.length,
      fromDate, new Date());
  }

  async updateObservationsForCurrentUser(appMode: AppMode, user: ObserverResponseDto, langKey: LangKey, page: number) {
    const numberOfRecordsToFetch = 10;
    const searchResult = await this.searchService.SearchAll({
      NumberOfRecords: numberOfRecordsToFetch,
      LangKey: langKey,
      ObserverGuid: user.Guid,
      Offset: page * numberOfRecordsToFetch,
    }).toPromise();
    const instanceName = NanoSql.getInstanceName(NanoSql.TABLES.OBSERVATION.name, appMode);
    await NanoSql.getInstance(NanoSql.TABLES.OBSERVATION.name, appMode).loadJS(instanceName, searchResult, true);
  }

  private async getDaysBackToFetchForGeoHazard(geoHazard: GeoHazard): Promise<number> {
    const userSettings = await this.userSettingService.getUserSettings();
    if (userSettings.currentGeoHazard === geoHazard) {
      // Returning max days back for current geoHazard
      const geoHazardString = GeoHazard[geoHazard];
      const daysBackForCurrentGeoHazard: number[] = settings.observations.daysBack[geoHazardString];
      return Math.max(...daysBackForCurrentGeoHazard);
    } else {
      // Returning default days back for other geoHazards
      return this.getObservationsDaysBack(userSettings);
    }
  }

  private getObservationsDaysBack(userSettings: UserSetting): number {
    const daysBackForCurrentGeoHazard = userSettings.observationDaysBack
      .find((setting) => setting.geoHazard === userSettings.currentGeoHazard);
    const daysBack = daysBackForCurrentGeoHazard ? daysBackForCurrentGeoHazard.daysBack : 3; // default to 3 days back if not found
    return daysBack;
  }

  private getObservationDaysBackAsDate(userSettings: UserSetting): Date {
    const daysBack = this.getObservationsDaysBack(userSettings);
    const fromDate = moment().subtract(daysBack, 'days').startOf('day');
    return fromDate.toDate();
  }

  private deleteObservationNoLongerInResult(
    appMode: AppMode,
    geoHazard: GeoHazard,
    user: LoggedInUser,
    fromDate: Date,
    items: RegistrationViewModel[]) {
    return NanoSql.getInstance(NanoSql.TABLES.OBSERVATION.name, appMode).query('delete')
      .where((reg: RegistrationViewModel) => {
        return reg && reg.GeoHazardTID === geoHazard
          && moment(reg.DtObsTime).isSameOrAfter(fromDate)
          && !items.find((item) => item.RegID === reg.RegID)
          && this.exludeLoggedInUser(user, reg);
      }).exec();
  }

  private async deleteOldObservations(appMode: AppMode, geoHazard: GeoHazard, user: LoggedInUser) {
    const daysBack = await this.getDaysBackToFetchForGeoHazard(geoHazard);
    const deleteOldRecordsFrom = moment().subtract(daysBack + 1, 'days');
    return NanoSql.getInstance(NanoSql.TABLES.OBSERVATION.name, appMode).query('delete')
      .where((reg: RegistrationViewModel) => {
        return reg && moment(reg.DtObsTime).isBefore(deleteOldRecordsFrom)
          && reg.GeoHazardTID === geoHazard
          && this.exludeLoggedInUser(user, reg);
      }).exec();
  }

  private getObservationsAsObservable(): Rx.Observable<RegistrationViewModel[]> {
    return this.userSettingService.userSettingObservable$.pipe(switchMap((userSetting) =>
      this.getObservationsByParametersAsObservable(
        userSetting.appMode,
        userSetting.language,
        userSetting.currentGeoHazard,
        this.getObservationDaysBackAsDate(userSetting),
      )), shareReplay(1));
  }

  getUserObservationsAsObservable(): Rx.Observable<RegistrationViewModel[]> {
    return Rx.combineLatest(this.userSettingService.userSettingObservable$, this.loginService.loggedInUser$)
      .pipe(switchMap(([userSetting, loggedInUser]) =>
        this.getObservationsByParametersAsObservable(
          userSetting.appMode,
          userSetting.language,
          null,
          null,
          loggedInUser.isLoggedIn ? loggedInUser.user.Guid : null,
        )));
  }

  /**
   * Query observations by parameters
   * @param appMode
   * @param geoHazard
   * @param fromDate
   * @param user
   */
  getObservationsByParametersAsObservable(
    appMode: AppMode,
    langKey: LangKey,
    geoHazard?: GeoHazard,
    fromDate?: Date,
    observerGuid?: string): Rx.Observable<RegistrationViewModel[]> {
    return nSQL().observable<RegistrationViewModel[]>(() => {
      return NanoSql.getInstance(NanoSql.TABLES.OBSERVATION.name, appMode).query('select').where((reg: RegistrationViewModel) => {
        return reg && (geoHazard ? reg.GeoHazardTID === geoHazard : true)
          && reg.LangKey === langKey
          && (fromDate ? moment(reg.DtObsTime).isAfter(fromDate) : true)
          && (observerGuid ? reg.Observer.ObserverGUID === observerGuid : true);
      }).emit();
    }).toRxJS().pipe(debounceTime(500),
      map((items) => items.sort((a, b) => moment(b.DtObsTime).diff(moment(a.DtObsTime)))));
  }

  async getObservationById(id: number, appMode: AppMode, langKey: LangKey) {
    const result = await NanoSql.getInstance(NanoSql.TABLES.OBSERVATION.name, appMode)
      .query('select').where([['RegID', '=', id], 'AND', ['LangKey', '=', langKey]]).exec();
    return result[0] as RegistrationViewModel;
  }

  getObserableCount(appMode: AppMode): Observable<number> {
    return nSQL().observable<RowCount[]>(() => {
      return NanoSql.getInstance(NanoSql.TABLES.OBSERVATION.name, appMode).query('select', ['COUNT(*) as count']).emit();
    }).debounce(100).toRxJS().pipe(map((val: RowCount[]) => val[0].count), distinctUntilChanged());
  }
}
