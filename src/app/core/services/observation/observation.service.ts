import { Injectable } from '@angular/core';
import { settings } from '../../../../settings';
import { nSQL } from 'nano-sql';
import { RowCount } from '../../models/row-count.model';
import { Observable } from 'rxjs';
import { GeoHazard } from '../../models/geo-hazard.enum';
import * as moment from 'moment';
import 'moment-timezone';
import * as Rx from 'rxjs';
import { NanoSql } from '../../../../nanosql';
import { debounceTime, map, distinctUntilChanged, switchMap, shareReplay } from 'rxjs/operators';
import { LoginService } from '../login/login.service';
import { LoggedInUser } from '../login/logged-in-user.model';
import { UserSettingService } from '../user-setting/user-setting.service';
import { DataLoadService } from '../../../modules/data-load/services/data-load.service';
import { AppMode } from '../../models/app-mode.enum';
import { UserSetting } from '../../models/user-settings.model';
import { LangKey } from '../../models/langKey';
import { SearchService } from '../../../modules/regobs-api/services';
import { RegistrationViewModel, ObserverResponseDto } from '../../../modules/regobs-api/models';
import { ObservableHelper } from '../../helpers/observable-helper';

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
  }

  private exludeLoggedInUser(user: LoggedInUser, reg: RegistrationViewModel) {
    return (user.isLoggedIn ? (reg.Observer.ObserverGUID !== user.user.Guid) : true);
  }

  async updateObservations(cancel?: Promise<void>) {
    let cancelled = false;
    if (cancel) {
      cancel.then(() => {
        cancelled = true;
      });
    }
    const user = await this.loginService.getLoggedInUser();
    const userSettings = await this.userSettingService.getUserSettings();
    for (const geoHazard of this.getPriority(userSettings.currentGeoHazard)) {
      if (!cancelled) {
        await this.checkLastUpdatedAndUpdateDataIfNeeded(geoHazard, user, userSettings, cancel);
      }
    }
    // TODO: Update my observations if user is logged in
  }

  private getPriority(currentGeoHazard: GeoHazard) {
    if (currentGeoHazard === GeoHazard.Snow) {
      return [GeoHazard.Snow];
    } else if (currentGeoHazard === GeoHazard.Ice) {
      return [GeoHazard.Ice];
    } else if (currentGeoHazard === GeoHazard.Water) {
      return [GeoHazard.Water, GeoHazard.Dirt];
    } else if (currentGeoHazard === GeoHazard.Dirt) {
      return [GeoHazard.Dirt, GeoHazard.Water];
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

  private async checkLastUpdatedAndUpdateDataIfNeeded(
    geoHazard: GeoHazard,
    user: LoggedInUser,
    userSetting: UserSetting,
    cancel?: Promise<void>) {
    const dataLoad = await this.dataLoadService.getState(this.getDataLoadId(userSetting.appMode, geoHazard));
    const lastUpdateLimit = moment().subtract(10, 'minutes');
    const fromDate = await this.getDaysBackToFetchAsDate(userSetting, geoHazard);
    if (!dataLoad.lastUpdated
      || moment(dataLoad.lastUpdated).isBefore(lastUpdateLimit)
      || moment(dataLoad.itemsFromDate).isAfter(fromDate)) {
      await this.updateObservationsForGeoHazard(geoHazard, user, userSetting, cancel);
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
      userSettings.currentGeoHazard,
      loggedInUser,
      userSettings
    );
  }

  private async getDaysBackToFetchAsDate(userSetting: UserSetting, geoHazard: GeoHazard) {
    const daysBack = await this.getObservationsDaysBack(userSetting, geoHazard);
    const fromDate = moment().subtract(daysBack, 'days').startOf('day');
    return fromDate.toDate();
  }

  async updateObservationsForGeoHazard(geoHazard: GeoHazard, user: LoggedInUser, userSetting: UserSetting, cancel?: Promise<void>) {
    console.log(`[INFO][ObervationService] Updating observations for geoHazard: ${geoHazard}`);
    const dataLoadId = this.getDataLoadId(userSetting.appMode, geoHazard);
    await this.dataLoadService.startLoading(dataLoadId);
    const fromDate = await this.getDaysBackToFetchAsDate(userSetting, geoHazard);

    try {
      const searchResult = await ObservableHelper.toPromiseWithCancel(this.searchService.SearchAll({
          FromDate: fromDate.toISOString(),
          SelectedGeoHazards: [geoHazard],
          NumberOfRecords: settings.observations.maxObservationsToFetch,
          LangKey: userSetting.language,
        }), cancel);

          console.log(`[INFO] Got ${searchResult.length} new observations for geoHazard  ${geoHazard}`);
          const instanceName = NanoSql.getInstanceName(NanoSql.TABLES.OBSERVATION.name, userSetting.appMode);
          await NanoSql.getInstance(NanoSql.TABLES.OBSERVATION.name, userSetting.appMode).loadJS(instanceName, searchResult, true);

          // Deleting items no longer in updated result
          await this.deleteObservationNoLongerInResult(userSetting.appMode, geoHazard, user, fromDate, searchResult);
          // Delete old items
          await this.deleteOldObservations(userSetting.appMode, geoHazard, user);
      await this.dataLoadService.loadingCompleted(dataLoadId, searchResult.length, fromDate, new Date());
    } catch (err) {
      await this.dataLoadService.loadingError(dataLoadId, err.message);
    }
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

  getObservationsDaysBack(userSettings: UserSetting, geoHazard: GeoHazard): number {
    const daysBackForCurrentGeoHazard = userSettings.observationDaysBack
      .find((setting) => setting.geoHazard === geoHazard);
    const daysBack = daysBackForCurrentGeoHazard ? daysBackForCurrentGeoHazard.daysBack : 3; // default to 3 days back if not found
    return daysBack;
  }

  private getObservationDaysBackAsDate(userSettings: UserSetting): Date {
    const daysBack = this.getObservationsDaysBack(userSettings, userSettings.currentGeoHazard);
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
    const daysBack = await this.getMaxDaysBackForGeoHazard(geoHazard);
    const deleteOldRecordsFrom = moment().subtract(daysBack + 1, 'days');
    return NanoSql.getInstance(NanoSql.TABLES.OBSERVATION.name, appMode).query('delete')
      .where((reg: RegistrationViewModel) => {
        return reg && moment(reg.DtObsTime).isBefore(deleteOldRecordsFrom)
          && reg.GeoHazardTID === geoHazard
          && this.exludeLoggedInUser(user, reg);
      }).exec();
  }

  private getMaxDaysBackForGeoHazard(geoHazard: GeoHazard) {
    const geoHazardString = GeoHazard[geoHazard];
    const daysBackForCurrentGeoHazard: number[] = settings.observations.daysBack[geoHazardString];
    return Math.max(...daysBackForCurrentGeoHazard);
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
