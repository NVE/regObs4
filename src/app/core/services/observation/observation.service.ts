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
import { debounceTime, map, distinctUntilChanged, switchMap, shareReplay, tap } from 'rxjs/operators';
import { LoginService } from '../../../modules/login/services/login.service';
import { LoggedInUser } from '../../../modules/login/models/logged-in-user.model';
import { UserSettingService } from '../user-setting/user-setting.service';
import { DataLoadService } from '../../../modules/data-load/services/data-load.service';
import { AppMode } from '../../models/app-mode.enum';
import { UserSetting } from '../../models/user-settings.model';
import { LangKey } from '../../models/langKey';
import { SearchService } from '../../../modules/regobs-api/services';
import { RegistrationViewModel, ObserverResponseDto } from '../../../modules/regobs-api/models';
import { ObservableHelper } from '../../helpers/observable-helper';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';

const DEBUG_TAG = 'ObservationService';

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
    private loggingService: LoggingService,
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
    if (!cancelled) {
      return this.checkLastUpdatedAndUpdateDataIfNeeded(userSettings.currentGeoHazard, user, userSettings, cancel);
    } else {
      return 0;
    }
  }

  private getDataLoadId(appMode: AppMode, geoHazards: GeoHazard[]) {
    return `${NanoSql.TABLES.OBSERVATION.name}_${geoHazards.join('-')}_${appMode}`;
  }

  getAllDataLoadIds(appMode: AppMode) {
    const geoHazards = Object.keys(GeoHazard)
      .filter(key => !isNaN(Number(GeoHazard[key])))
      .map((key) => GeoHazard[key]);
    return geoHazards.map((val) => this.getDataLoadId(appMode, val));
  }

  private async checkLastUpdatedAndUpdateDataIfNeeded(
    geoHazards: GeoHazard[],
    user: LoggedInUser,
    userSetting: UserSetting,
    cancel?: Promise<void>) {
    const dataLoad = await this.dataLoadService.getState(this.getDataLoadId(userSetting.appMode, geoHazards));
    const lastUpdateLimit = moment().subtract(15, 'minutes');
    const fromDate = await this.getDaysBackToFetchAsDate(userSetting, geoHazards);
    if (!dataLoad.lastUpdated
      || moment(dataLoad.lastUpdated).isBefore(lastUpdateLimit)
      || moment(dataLoad.itemsFromDate).isAfter(fromDate)) {
      return this.updateObservationsForGeoHazard(geoHazards, user, userSetting, cancel);
    } else {
      this.loggingService.debug(`No need to update ${geoHazards.join(', ')}.
      Last updated is: ${dataLoad.lastUpdated}`, DEBUG_TAG);
      return 0;
    }
  }

  getLastUpdatedForCurrentGeoHazardAsObservable() {
    return this.userSettingService.userSettingObservable$.pipe(switchMap((userSettings) =>
      Rx.combineLatest(this.dataLoadService.getStateAsObservable(
        this.getDataLoadId(userSettings.appMode, userSettings.currentGeoHazard)))
    ), map((val) => val[0] && val[0].lastUpdated ? moment(val[0].lastUpdated).toDate() : null));
  }

  async forceUpdateObservationsForCurrentGeoHazard(cancel?: Promise<void>) {
    const userSettings = await this.userSettingService.getUserSettings();
    const loggedInUser = await this.loginService.getLoggedInUser();
    return this.updateObservationsForGeoHazard(userSettings.currentGeoHazard, loggedInUser, userSettings, cancel);
  }

  private async getDaysBackToFetchAsDate(userSetting: UserSetting, geoHazards: GeoHazard[]) {
    const daysBack = await this.getObservationsDaysBack(userSetting, geoHazards);
    const fromDate = moment().subtract(daysBack, 'days').startOf('day');
    return fromDate.toDate();
  }

  async updateObservationsForGeoHazard(geoHazards: GeoHazard[], user: LoggedInUser, userSetting: UserSetting, cancel?: Promise<void>) {
    this.loggingService.debug(`Updating observations for geoHazard: ${geoHazards.join(', ')}`, DEBUG_TAG);
    const dataLoadId = this.getDataLoadId(userSetting.appMode, geoHazards);
    await this.dataLoadService.startLoading(dataLoadId);
    const fromDate = await this.getDaysBackToFetchAsDate(userSetting, geoHazards);
    let isCanceled = false;
    if (cancel) {
      cancel.then(() => {
        isCanceled = true;
      });
    }
    try {
      this.searchService.rootUrl = settings.services.regObs.apiUrl[userSetting.appMode];
      const searchResult = await ObservableHelper.toPromiseWithCancel(this.searchService.SearchAll({
        FromDate: fromDate.toISOString(),
        SelectedGeoHazards: geoHazards,
        NumberOfRecords: settings.observations.maxObservationsToFetch,
        LangKey: userSetting.language,
      }), cancel);
      this.loggingService.debug(`Got ${searchResult.length} new observations for geoHazards ${geoHazards.join(', ')}`, DEBUG_TAG);
      if (!isCanceled) {
        const instanceName = NanoSql.getInstanceName(NanoSql.TABLES.OBSERVATION.name, userSetting.appMode);
        await NanoSql.getInstance(NanoSql.TABLES.OBSERVATION.name, userSetting.appMode)
          .loadJS(instanceName, searchResult, true);
      }
      if (!isCanceled) {
        this.loggingService.debug(`Deleted items no longer in updated result`, DEBUG_TAG);
        await this.deleteObservationNoLongerInResult(userSetting.appMode, geoHazards, user, fromDate, searchResult);
      }
      if (!isCanceled) {
        this.loggingService.debug(`Deleted old observations`, DEBUG_TAG);
        await this.deleteOldObservations(userSetting.appMode, geoHazards, user);
      }
      if (!isCanceled) {
        await this.dataLoadService.loadingCompleted(dataLoadId, searchResult.length, fromDate, new Date());
        return searchResult.length;
      } else {
        this.loggingService.debug(`Operation cancelled. Saving load error.`, DEBUG_TAG);
        await this.dataLoadService.loadingError(dataLoadId, 'Operation cancelled');
        return 0;
      }
    } catch (err) {
      this.loggingService.error(err, DEBUG_TAG, `Loading error`);
      await this.dataLoadService.loadingError(dataLoadId, err.message);
      return 0;
    }
  }

  async updateObservationsForCurrentUser(
    appMode: AppMode,
    user: ObserverResponseDto,
    langKey: LangKey,
    page: number,
    cancel?: Promise<any>) {
    const numberOfRecordsToFetch = 10;
    try {
      this.searchService.rootUrl = settings.services.regObs.apiUrl[appMode];
      const searchResult = await ObservableHelper.toPromiseWithCancel(this.searchService.SearchAll({
        NumberOfRecords: numberOfRecordsToFetch,
        LangKey: langKey,
        ObserverGuid: user.Guid,
        Offset: page * numberOfRecordsToFetch,
      }), cancel);
      const instanceName = NanoSql.getInstanceName(NanoSql.TABLES.OBSERVATION.name, appMode);
      await NanoSql.getInstance(NanoSql.TABLES.OBSERVATION.name, appMode).loadJS(instanceName, searchResult, false);
    } catch (err) {
      this.loggingService.error(err, DEBUG_TAG, `Could not update observations for user: `, user);
    }
  }

  getObservationsDaysBack(userSettings: UserSetting, geoHazards: GeoHazard[]): number {
    const daysBackForCurrentGeoHazard = userSettings.observationDaysBack
      .find((setting) => setting.geoHazard === geoHazards[0]);
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
    geoHazards: GeoHazard[],
    user: LoggedInUser,
    fromDate: Date,
    items: RegistrationViewModel[]) {
    return NanoSql.getInstance(NanoSql.TABLES.OBSERVATION.name, appMode).query('delete')
      .where((reg: RegistrationViewModel) => {
        return reg && geoHazards.indexOf(reg.GeoHazardTID) >= 0
          && moment(reg.DtObsTime).isSameOrAfter(fromDate)
          && !items.find((item) => item.RegID === reg.RegID)
          && this.exludeLoggedInUser(user, reg);
      }).exec();
  }

  private async deleteOldObservations(appMode: AppMode, geoHazards: GeoHazard[], user: LoggedInUser) {
    const daysBack = await this.getMaxDaysBackForGeoHazard(geoHazards);
    const deleteOldRecordsFrom = moment().subtract(daysBack + 1, 'days');
    return NanoSql.getInstance(NanoSql.TABLES.OBSERVATION.name, appMode).query('delete')
      .where((reg: RegistrationViewModel) => {
        return reg && moment(reg.DtObsTime).isBefore(deleteOldRecordsFrom)
          && geoHazards.indexOf(reg.GeoHazardTID) >= 0
          && this.exludeLoggedInUser(user, reg);
      }).exec();
  }

  private getMaxDaysBackForGeoHazard(geoHazards: GeoHazard[]) {
    const geoHazardString = GeoHazard[geoHazards[0]];
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
        loggedInUser.isLoggedIn ? this.getObservationsByParametersAsObservable(
          userSetting.appMode,
          userSetting.language,
          null,
          null,
          loggedInUser.user.Guid) : Rx.of([])
      ));
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
    geoHazards?: GeoHazard[],
    fromDate?: Date,
    observerGuid?: string): Rx.Observable<RegistrationViewModel[]> {
    return nSQL().observable<RegistrationViewModel[]>(() => {
      return NanoSql.getInstance(NanoSql.TABLES.OBSERVATION.name, appMode).query('select').where((reg: RegistrationViewModel) => {
        return !!reg && (geoHazards ? geoHazards.indexOf(reg.GeoHazardTID) >= 0 : true)
          && reg.LangKey === langKey
          && (fromDate ? moment(reg.DtObsTime).isAfter(fromDate) : true)
          && (observerGuid ? reg.Observer.ObserverGUID === observerGuid : true);
      }).emit();
    }).toRxJS().pipe(debounceTime(500),
      map((items) => items.sort((a, b) => moment(b.DtObsTime).diff(moment(a.DtObsTime)))),
      tap((items) => this.loggingService.debug('Observations updated!', DEBUG_TAG, items)));
  }

  async getObservationById(id: number, appMode: AppMode, langKey: LangKey) {
    const result = await NanoSql.getInstance(NanoSql.TABLES.OBSERVATION.name, appMode)
      .query('select').where(['RegID', '=', id]).exec();
    return result[0] as RegistrationViewModel;
  }

  getObserableCount(appMode: AppMode): Observable<number> {
    return nSQL().observable<RowCount[]>(() => {
      return NanoSql.getInstance(NanoSql.TABLES.OBSERVATION.name, appMode).query('select', ['COUNT(*) as count']).emit();
    }).debounce(100).toRxJS().pipe(map((val: RowCount[]) => val[0].count), distinctUntilChanged());
  }
}
