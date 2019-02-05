import { Injectable } from '@angular/core';
import { settings } from '../../../../settings';
import { RowCount } from '../../models/row-count.model';
import { Observable, combineLatest, of, Subject, from, BehaviorSubject } from 'rxjs';
import { GeoHazard } from '../../models/geo-hazard.enum';
import * as moment from 'moment';
import 'moment-timezone';
import { NanoSql } from '../../../../nanosql';
import { map, distinctUntilChanged, switchMap, shareReplay, tap } from 'rxjs/operators';
import { LoginService } from '../../../modules/login/services/login.service';
import { UserSettingService } from '../user-setting/user-setting.service';
import { DataLoadService } from '../../../modules/data-load/services/data-load.service';
import { AppMode } from '../../models/app-mode.enum';
import { UserSetting } from '../../models/user-settings.model';
import { LangKey } from '../../models/langKey';
import { SearchService } from '../../../modules/regobs-api/services';
import { RegistrationViewModel, ObserverResponseDto } from '../../../modules/regobs-api/models';
import { ObservableHelper } from '../../helpers/observable-helper';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';
import '../../helpers/nano-sql/nanoObserverToRxjs';
import { DbHelperService } from '../db-helper/db-helper.service';
import { NanoSqlObservableHelper } from '../../helpers/nano-sql/nanoObserverToRxjs';

const DEBUG_TAG = 'ObservationService';

@Injectable({
  providedIn: 'root'
})
export class ObservationService {
  private _observationsObservable: Observable<RegistrationViewModel[]>;
  private _dataLoadObservable: Observable<string>;
  private changeTrigger: BehaviorSubject<void>;

  get observations$() {
    return this._observationsObservable;
  }

  get dataLoad$() {
    return this._dataLoadObservable;
  }

  constructor(
    private searchService: SearchService,
    private loginService: LoginService,
    private userSettingService: UserSettingService,
    private dataLoadService: DataLoadService,
    private loggingService: LoggingService,
    private dbHelperService: DbHelperService,
  ) {
    this.changeTrigger = new BehaviorSubject(null);
    this._observationsObservable = this.getObservationsAsObservable();
    this._dataLoadObservable = this.getDataLoadObservable();
  }

  async updateObservations(cancel?: Promise<any>) {
    let cancelled = false;
    if (cancel) {
      cancel.then(() => {
        cancelled = true;
      });
    }
    const userSettings = await this.userSettingService.getUserSettings();
    if (!cancelled) {
      return this.checkLastUpdatedAndUpdateDataIfNeeded(userSettings.currentGeoHazard, userSettings, cancel);
    } else {
      return 0;
    }
  }

  private getDataLoadId(appMode: AppMode, geoHazards: GeoHazard[], langKey: LangKey) {
    return `${NanoSql.TABLES.OBSERVATION.name}_${geoHazards.join('-')}_${appMode}_${langKey}`;
  }

  private getDataLoadObservable() {
    return this.userSettingService.appModeLanguageAndCurrentGeoHazard$
      .pipe(map(([appMode, language, currentGeoHazard]) => this.getDataLoadId(appMode, currentGeoHazard, language)));
  }

  private async checkLastUpdatedAndUpdateDataIfNeeded(
    geoHazards: GeoHazard[],
    userSetting: UserSetting,
    cancel?: Promise<void>) {
    const dataLoadId = this.getDataLoadId(userSetting.appMode, geoHazards, userSetting.language);
    const dataLoad = await this.dataLoadService.getState(dataLoadId);
    const isLoadingTimeout = moment().subtract(settings.foregroundUpdateIntervalMs, 'milliseconds');
    if (dataLoad.isLoading && moment(dataLoad.startedDate).isAfter(isLoadingTimeout)) {
      this.loggingService.debug(`Observations is already loading.`, DEBUG_TAG);
      return 0;
    } else {
      const lastUpdateLimit = moment().subtract(15, 'minutes');
      const fromDate = await this.getDaysBackToFetchAsDate(userSetting, geoHazards);
      if (!dataLoad.lastUpdated
        || moment(dataLoad.lastUpdated).isBefore(lastUpdateLimit)
        || moment(dataLoad.itemsFromDate).isAfter(fromDate)) {
        return this.updateObservationsForGeoHazard(geoHazards, userSetting, cancel);
      } else {
        this.loggingService.debug(`No need to update ${geoHazards.join(', ')}.
        Last updated is: ${dataLoad.lastUpdated}`, DEBUG_TAG);
        return 0;
      }
    }
  }

  getLastUpdatedForCurrentGeoHazardAsObservable() {
    return this.userSettingService.appModeLanguageAndCurrentGeoHazard$
      .pipe(switchMap(([appMode, language, currentGeoHazard]) =>
        this.dataLoadService.getStateAsObservable(this.getDataLoadId(appMode, currentGeoHazard, language))
      ), map((val) => val && val.lastUpdated ? moment(val.lastUpdated).toDate() : null));
  }

  async forceUpdateObservationsForCurrentGeoHazard(cancel?: Promise<any>) {
    const userSettings = await this.userSettingService.getUserSettings();
    return this.updateObservationsForGeoHazard(userSettings.currentGeoHazard, userSettings, cancel);
  }

  private async getDaysBackToFetchAsDate(userSetting: UserSetting, geoHazards: GeoHazard[]) {
    const daysBack = await this.getObservationsDaysBack(userSetting, geoHazards);
    const fromDate = moment().subtract(daysBack, 'days').startOf('day');
    return fromDate.toDate();
  }

  async updateObservationsForGeoHazard(geoHazards: GeoHazard[], userSetting: UserSetting, cancel?: Promise<any>) {
    this.loggingService.debug(`Updating observations for geoHazard: ${geoHazards.join(', ')}`, DEBUG_TAG);
    const dataLoadId = this.getDataLoadId(userSetting.appMode, geoHazards, userSetting.language);
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
      const instanceName = NanoSql.getInstanceName(NanoSql.TABLES.OBSERVATION.name, userSetting.appMode);
      if (!isCanceled) {
        const now = new Date();
        await this.dbHelperService.fastInsert(instanceName, searchResult, (data) => data.RegID);
        this.loggingService.debug(`fastInsert took ${new Date().getTime() - now.getTime()} ms`, DEBUG_TAG);
      }
      if (!isCanceled) {
        const deleteResult = await this.deleteObservationNoLongerInResult(userSetting.appMode, geoHazards, fromDate, searchResult);
        this.loggingService.debug(`Deleted items no longer in updated result`, DEBUG_TAG, deleteResult);
      }
      if (!isCanceled) {
        this.loggingService.debug(`Deleted old observations`, DEBUG_TAG);
        await this.deleteOldObservations(userSetting.appMode, geoHazards);
      }
      if (!isCanceled) {
        await this.dataLoadService.loadingCompleted(dataLoadId, searchResult.length, fromDate, new Date());
        this.changeTrigger.next();
        return searchResult.length;
      } else {
        this.loggingService.debug(`Operation cancelled. Saving load error.`, DEBUG_TAG);
        await this.dataLoadService.loadingError(dataLoadId, 'Operation cancelled');
        return 0;
      }
    } catch (err) {
      if (isCanceled) {
        this.loggingService.debug(err, DEBUG_TAG, `Operation cancelled`);
      } else {
        this.loggingService.error(err, DEBUG_TAG, `Loading error`);
      }
      await this.dataLoadService.loadingError(dataLoadId, err.message);
      return 0;
    }
  }

  async updateObservationsForCurrentUser(
    appMode: AppMode,
    user: ObserverResponseDto,
    langKey: LangKey,
    numberOfRecords: number = 10,
    cancel?: Promise<any>) {
    try {
      this.searchService.rootUrl = settings.services.regObs.apiUrl[appMode];
      const searchResult = await ObservableHelper.toPromiseWithCancel(this.searchService.SearchAll({
        NumberOfRecords: numberOfRecords,
        LangKey: langKey,
        ObserverGuid: user.Guid,
      }), cancel);
      if (searchResult.length > 0) {
        const instanceName = NanoSql.getInstanceName(NanoSql.TABLES.OBSERVATION.name, appMode);
        const instance = NanoSql.getInstance(NanoSql.TABLES.OBSERVATION.name, appMode);
        await this.dbHelperService.fastInsert(instanceName, searchResult, (r) => r.RegID);
        const ids = searchResult.map((x) => x.RegID);
        const lastId = ids[searchResult.length - 1];
        const firstId = ids[0];
        // Delete records no longer in result (registration has been deleted)
        await instance.query('delete')
          .where((reg: RegistrationViewModel) => {
            return reg.Observer && reg.Observer.ObserverGUID === user.Guid &&
              reg.RegID < lastId &&
              reg.RegID > firstId &&
              !ids.find((item) => item === reg.RegID);
          }).exec();
        this.changeTrigger.next();
      }
      return searchResult;
    } catch (err) {
      this.loggingService.error(err, DEBUG_TAG, `Could not update observations for user: `, user);
      return [];
    }
  }

  async updateObservationById(regId: number, appMode: AppMode, langKey: LangKey) {
    const result = await this.getRegistrationByRegIdFromApi(regId, appMode, langKey).toPromise();
    await NanoSql.getInstance(NanoSql.TABLES.OBSERVATION.name, appMode)
      .query('upsert', result).exec();
    this.changeTrigger.next();
    return result;
  }

  private getRegistrationByRegIdFromApi(regId: number, appMode: AppMode, langKey: LangKey) {
    this.searchService.rootUrl = settings.services.regObs.apiUrl[appMode];
    return this.searchService.SearchAll({ RegId: regId, LangKey: langKey }).pipe(map((result) =>
      result[0]
    ));
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
    fromDate: Date,
    items: RegistrationViewModel[]) {
    return NanoSql.getInstance(NanoSql.TABLES.OBSERVATION.name, appMode).query('delete')
      .where((reg: RegistrationViewModel) => {
        return reg && geoHazards.indexOf(reg.GeoHazardTID) >= 0
          && moment(reg.DtObsTime).isSameOrAfter(fromDate)
          && !items.find((item) => item.RegID === reg.RegID);
      }).exec();
  }

  private async deleteOldObservations(appMode: AppMode, geoHazards: GeoHazard[]) {
    const daysBack = await this.getMaxDaysBackForGeoHazard(geoHazards);
    const deleteOldRecordsFrom = moment().subtract(daysBack + 1, 'days');
    return NanoSql.getInstance(NanoSql.TABLES.OBSERVATION.name, appMode).query('delete')
      .where((reg: RegistrationViewModel) => {
        return reg && moment(reg.DtObsTime).isBefore(deleteOldRecordsFrom)
          && geoHazards.indexOf(reg.GeoHazardTID) >= 0;
      }).exec();
  }

  private getMaxDaysBackForGeoHazard(geoHazards: GeoHazard[]) {
    const geoHazardString = GeoHazard[geoHazards[0]];
    const daysBackForCurrentGeoHazard: number[] = settings.observations.daysBack[geoHazardString];
    return Math.max(...daysBackForCurrentGeoHazard);
  }

  private getObservationsAsObservable(): Observable<RegistrationViewModel[]> {
    return this.userSettingService.userSettingObservable$.pipe(
      distinctUntilChanged<UserSetting, string>((x, y) => x.localeCompare(y) === 0,
        (x) => this.getDistinctUserSettingsToChangeObservations(x)),
      tap((val) => this.loggingService.debug('User settings changed to trigger new observations observable', DEBUG_TAG, val)),
      switchMap((userSetting) =>
        this.getObservationsByParametersAsObservable(
          userSetting.appMode,
          userSetting.language,
          userSetting.currentGeoHazard,
          this.getObservationDaysBackAsDate(userSetting),
        )), shareReplay(1));
  }

  private getDistinctUserSettingsToChangeObservations(userSetting: UserSetting) {
    const dateString = this.getObservationDaysBackAsDate(userSetting).toISOString();
    return `${userSetting.appMode}#${userSetting.language}#${userSetting.currentGeoHazard.join(',')}#${dateString}`;
  }

  getUserObservationsAsObservable(): Observable<RegistrationViewModel[]> {
    return combineLatest(this.userSettingService.appMode$, this.userSettingService.language$, this.loginService.loggedInUser$)
      .pipe(switchMap(([appMode, language, loggedInUser]) =>
        loggedInUser.isLoggedIn ? this.getObservationsByParametersAsObservable(
          appMode,
          language,
          null,
          null,
          loggedInUser.user.Guid) : of([])
      ));
  }

  async getObservationsByParameters(appMode: AppMode,
    langKey: LangKey,
    geoHazards?: GeoHazard[],
    fromDate?: Date,
    observerGuid?: string): Promise<RegistrationViewModel[]> {
    return this.getObservationsByParametersQuery(appMode, langKey, geoHazards, fromDate, observerGuid).exec();
  }

  private getObservationsByParametersQuery(appMode: AppMode,
    langKey: LangKey,
    geoHazards?: GeoHazard[],
    fromDate?: Date,
    observerGuid?: string) {
    return (NanoSql.getInstance(NanoSql.TABLES.OBSERVATION.name, appMode)
      .query('select').where((reg: RegistrationViewModel) => {
        return !!reg && (geoHazards ? geoHazards.indexOf(reg.GeoHazardTID) >= 0 : true)
          && reg.LangKey === langKey
          && (fromDate ? moment(reg.DtObsTime).isAfter(fromDate) : true)
          && (observerGuid ? (reg.Observer.ObserverGUID === observerGuid) : true);
      }));
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
    observerGuid?: string): Observable<RegistrationViewModel[]> {
    return this.changeTrigger.asObservable().pipe(
      switchMap(() => from(this.getObservationsByParameters(appMode, langKey, geoHazards, fromDate, observerGuid))),
      map((items) => items.sort((a, b) => moment(b.DtObsTime).diff(moment(a.DtObsTime)))),
      tap((items) => this.loggingService.debug('Observations observable change feed', DEBUG_TAG, items)));
  }

  // NOTE: Since we are using fastInsert, normal NanoSQL change feed is not supported, using subject trigger instead
  // /**
  //  * Query observations by parameters
  //  * @param appMode
  //  * @param geoHazard
  //  * @param fromDate
  //  * @param user
  //  */
  // getObservationsByParametersAsObservable(
  //   appMode: AppMode,
  //   langKey: LangKey,
  //   geoHazards?: GeoHazard[],
  //   fromDate?: Date,
  //   observerGuid?: string): Observable<RegistrationViewModel[]> {
  //   return NanoSqlObservableHelper.toRxJS<RegistrationViewModel[]>
  //     (this.getObservationsByParametersQuery(appMode, langKey, geoHazards, fromDate, observerGuid).listen({
  //         debounce: 500,
  //         unique: true,
  //         compareFn: (a, b) => this.observableCompareFunc(a, b),
  //       })).pipe(
  //     map((items) => items.sort((a, b) => moment(b.DtObsTime).diff(moment(a.DtObsTime)))),
  //     tap((items) => this.loggingService.debug('Observations observable change feed', DEBUG_TAG, items)));
  // }

  // private observableCompareFunc(rowsA: RegistrationViewModel[], rowsB: RegistrationViewModel[]) {
  //   const newRows = rowsA.map((x) => this.uniqueObservation(x)).join('#');
  //   const oldRows = rowsB.map((x) => this.uniqueObservation(x)).join('#');
  //   console.log(`New rows: ${newRows}\nOld rows: ${oldRows}+nEquals: ${newRows === oldRows}`);
  //   return newRows !== oldRows;
  // }

  // private uniqueObservation(obs: RegistrationViewModel) {
  //   return `${obs.RegID}_${obs.DtChangeTime}`;
  // }

  async getObservationById(id: number, appMode: AppMode, langKey: LangKey) {
    const result = await NanoSql.getInstance(NanoSql.TABLES.OBSERVATION.name, appMode)
      .query('select').where(['RegID', '=', id]).exec();
    return result[0] as RegistrationViewModel;
  }

  getObserableCount(appMode: AppMode): Observable<number> {
    return NanoSqlObservableHelper.toRxJS<RowCount[]>(
      NanoSql.getInstance(NanoSql.TABLES.OBSERVATION.name, appMode).query('select', ['COUNT(*) as count'])
        .listen({
          debounce: 100,
        })).pipe(map((val: RowCount[]) => val[0].count), distinctUntilChanged());
  }
}
