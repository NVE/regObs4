import { Injectable } from '@angular/core';
import { settings } from '../../../../settings';
import { RowCount } from '../../models/row-count.model';
import { Observable, combineLatest, of, BehaviorSubject } from 'rxjs';
import { GeoHazard } from '../../models/geo-hazard.enum';
import moment from 'moment';
import 'moment-timezone';
import { NanoSql } from '../../../../nanosql';
import {
  map,
  distinctUntilChanged,
  switchMap,
  shareReplay,
  tap,
  catchError,
  take
} from 'rxjs/operators';
import { UserSettingService } from '../user-setting/user-setting.service';
import { DataLoadService } from '../../../modules/data-load/services/data-load.service';
import { AppMode } from '../../models/app-mode.enum';
import { UserSetting } from '../../models/user-settings.model';
import { LangKey } from '../../models/langKey';
import { SearchService } from '../../../modules/regobs-api/services';
import {
  RegistrationViewModel,
  ObserverResponseDto
} from '../../../modules/regobs-api/models';
import { toPromiseWithCancel } from '../../helpers/observable-helper';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';
import { DbHelperService } from '../db-helper/db-helper.service';
import { LogLevel } from '../../../modules/shared/services/logging/log-level.model';
import { NSqlFullUpdateObservable } from '../../helpers/nano-sql/NSqlFullUpdateObservable';

const DEBUG_TAG = 'ObservationService';

@Injectable({
  providedIn: 'root'
})
export class ObservationService {
  private _observationsObservable: Observable<RegistrationViewModel[]>;
  private _dataLoadObservable: Observable<string>;
  private latestObservations: BehaviorSubject<{
    [key: string]: RegistrationViewModel[];
  }>;

  get observations$() {
    return this._observationsObservable;
  }

  get dataLoad$() {
    return this._dataLoadObservable;
  }

  constructor(
    private searchService: SearchService,
    private userSettingService: UserSettingService,
    private dataLoadService: DataLoadService,
    private loggingService: LoggingService,
    private dbHelperService: DbHelperService
  ) {
    this.latestObservations = new BehaviorSubject({});
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
    const userSettings = await this.userSettingService.userSetting$
      .pipe(take(1))
      .toPromise();
    if (!cancelled) {
      const result = await this.checkLastUpdatedAndUpdateDataIfNeeded(
        userSettings.currentGeoHazard,
        userSettings,
        cancel
      );
      return result;
    } else {
      return 0;
    }
  }

  private getDataLoadId(
    appMode: AppMode,
    geoHazards: GeoHazard[],
    langKey: LangKey
  ) {
    return `${NanoSql.TABLES.OBSERVATION.name}_${geoHazards.join(
      '-'
    )}_${appMode}_${langKey}`;
  }

  private getDataLoadObservable() {
    return this.userSettingService.appModeLanguageAndCurrentGeoHazard$.pipe(
      map(([appMode, language, currentGeoHazard]) =>
        this.getDataLoadId(appMode, currentGeoHazard, language)
      )
    );
  }

  private async checkLastUpdatedAndUpdateDataIfNeeded(
    geoHazards: GeoHazard[],
    userSetting: UserSetting,
    cancel?: Promise<void>
  ) {
    const dataLoadId = this.getDataLoadId(
      userSetting.appMode,
      geoHazards,
      userSetting.language
    );
    const dataLoad = await this.dataLoadService.getState(dataLoadId);
    const isLoadingTimeout = moment().subtract(
      settings.foregroundUpdateIntervalMs,
      'milliseconds'
    );
    if (
      dataLoad.isLoading &&
      moment(dataLoad.startedDate).isAfter(isLoadingTimeout)
    ) {
      this.loggingService.debug('Observations is already loading.', DEBUG_TAG);
      return 0;
    } else {
      const lastUpdateLimit = moment().subtract(15, 'minutes');
      const fromDate = await this.getDaysBackToFetchAsDate(
        userSetting,
        geoHazards
      );
      if (
        !dataLoad.lastUpdated ||
        moment(dataLoad.lastUpdated).isBefore(lastUpdateLimit) ||
        moment(dataLoad.itemsFromDate).isAfter(fromDate)
      ) {
        return this.updateObservationsForGeoHazard(
          geoHazards,
          userSetting,
          cancel
        );
      } else {
        this.loggingService.debug(
          `No need to update ${geoHazards.join(', ')}.
        Last updated is: ${dataLoad.lastUpdated}`,
          DEBUG_TAG
        );
        return 0;
      }
    }
  }

  getLastUpdatedForCurrentGeoHazardAsObservable() {
    return this.userSettingService.appModeLanguageAndCurrentGeoHazard$.pipe(
      switchMap(([appMode, language, currentGeoHazard]) =>
        this.dataLoadService.getStateAsObservable(
          this.getDataLoadId(appMode, currentGeoHazard, language)
        )
      ),
      map((val) =>
        val && val.lastUpdated ? moment(val.lastUpdated).toDate() : null
      )
    );
  }

  async forceUpdateObservationsForCurrentGeoHazard(cancel?: Promise<any>) {
    const userSettings = await this.userSettingService.userSetting$
      .pipe(take(1))
      .toPromise();
    return this.updateObservationsForGeoHazard(
      userSettings.currentGeoHazard,
      userSettings,
      cancel
    );
  }

  private async getDaysBackToFetchAsDate(
    userSetting: UserSetting,
    geoHazards: GeoHazard[]
  ) {
    const daysBack = await this.getObservationsDaysBack(
      userSetting,
      geoHazards
    );
    const fromDate = moment().subtract(daysBack, 'days').startOf('day');
    return fromDate.toDate();
  }

  async updateObservationsForGeoHazard(
    geoHazards: GeoHazard[],
    userSetting: UserSetting,
    cancel?: Promise<any>
  ) {
    this.loggingService.debug(
      `Updating observations for geoHazard: ${geoHazards.join(', ')}`,
      DEBUG_TAG
    );
    const dataLoadId = this.getDataLoadId(
      userSetting.appMode,
      geoHazards,
      userSetting.language
    );
    await this.dataLoadService.startLoading(dataLoadId);
    const fromDate = await this.getDaysBackToFetchAsDate(
      userSetting,
      geoHazards
    );
    let isCanceled = false;
    if (cancel) {
      cancel.then(() => {
        isCanceled = true;
      });
    }
    try {
      const searchResult = await toPromiseWithCancel(
        this.searchService.SearchSearch({
          FromDate: fromDate.toISOString(),
          SelectedGeoHazards: geoHazards,
          NumberOfRecords: settings.observations.maxObservationsToFetch,
          LangKey: userSetting.language,
          TimeZone: moment().format('Z')
        }),
        cancel,
        60000
      );
      this.loggingService.debug(
        `Got ${
          searchResult.length
        } new observations for geoHazards ${geoHazards.join(', ')}`,
        DEBUG_TAG
      );
      if (!isCanceled) {
        this.updateLatestObservations(
          userSetting.appMode,
          userSetting.language,
          geoHazards,
          searchResult
        );
        await this.dataLoadService.loadingCompleted(
          dataLoadId,
          searchResult.length,
          fromDate,
          new Date()
        );
        this.saveAndClenupOfflineObservations(
          fromDate,
          geoHazards,
          userSetting,
          searchResult
        );
        return searchResult.length;
      } else {
        this.loggingService.debug(
          'Operation cancelled. Saving load error.',
          DEBUG_TAG
        );
        await this.dataLoadService.loadingError(
          dataLoadId,
          'Operation cancelled'
        );
        return 0;
      }
    } catch (err) {
      if (isCanceled) {
        this.loggingService.debug(err, DEBUG_TAG, 'Operation cancelled');
      } else {
        this.loggingService.log(
          'Loading error. Is network available?',
          err,
          LogLevel.Warning
        );
      }
      await this.dataLoadService.loadingError(dataLoadId, err.message);
      return 0;
    }
  }

  private updateLatestObservations(
    appMode: AppMode,
    langKey: LangKey,
    geoHazards: GeoHazard[],
    observations: RegistrationViewModel[]
  ) {
    const latestObs = this.latestObservations.getValue();
    const key = this.getGeoHazardKeyFull(appMode, langKey, geoHazards);
    latestObs[key] = observations;
    this.latestObservations.next(latestObs);
  }

  private async saveAndClenupOfflineObservations(
    fromDate: Date,
    geoHazards: GeoHazard[],
    userSetting: UserSetting,
    result: RegistrationViewModel[]
  ) {
    const instanceName = NanoSql.getInstanceName(
      NanoSql.TABLES.OBSERVATION.name,
      userSetting.appMode
    );
    const now = new Date();
    await this.dbHelperService.fastInsert(
      instanceName,
      result,
      (data) => data.RegID
    );
    this.loggingService.debug(
      `fastInsert took ${new Date().getTime() - now.getTime()} ms`,
      DEBUG_TAG
    );
    const deleteResult = await this.deleteObservationNoLongerInResult(
      userSetting.appMode,
      geoHazards,
      fromDate,
      result
    );
    this.loggingService.debug(
      'Deleted items no longer in updated result',
      DEBUG_TAG,
      deleteResult
    );
    await this.deleteOldObservations(userSetting.appMode, geoHazards);
  }

  getObservationsForCurrentUser(
    appMode: AppMode,
    user: ObserverResponseDto,
    langKey: LangKey,
    pageNr?: number,
    numberOfRecords = 10
  ): Observable<RegistrationViewModel[]> {
    return this.searchService
      .SearchSearch({
        NumberOfRecords: numberOfRecords,
        LangKey: langKey,
        Offset: (pageNr || 0) * numberOfRecords,
        ObserverGuid: user.Guid,
        TimeZone: moment().format('Z')
      })
      .pipe(catchError((err) => of([]))); // Return empty list if http request fails);
  }

  async updateObservationById(
    regId: number,
    appMode: AppMode,
    langKey: LangKey,
    currentGeoHazards: GeoHazard[]
  ) {
    const result = await this.getRegistrationByRegIdFromApi(
      regId,
      appMode,
      langKey
    ).toPromise();
    if (result) {
      await NanoSql.getInstance(NanoSql.TABLES.OBSERVATION.name, appMode)
        .query('upsert', result)
        .exec();
      // Reset next observations, so it will be fetched from db when one item is updated
      this.updateLatestObservations(
        appMode,
        langKey,
        currentGeoHazards,
        undefined
      );
    }
    return result;
  }

  private getRegistrationByRegIdFromApi(
    regId: number,
    appMode: AppMode,
    langKey: LangKey
  ) {
    return this.searchService
      .SearchSearch({ RegId: regId, LangKey: langKey })
      .pipe(map((result) => result[0]));
  }

  getObservationsDaysBack(
    userSettings: UserSetting,
    geoHazards: GeoHazard[]
  ): number {
    const daysBackForCurrentGeoHazard = userSettings.observationDaysBack.find(
      (setting) => setting.geoHazard === geoHazards[0]
    );
    const daysBack = daysBackForCurrentGeoHazard
      ? daysBackForCurrentGeoHazard.daysBack
      : 3; // default to 3 days back if not found
    return daysBack;
  }

  private getObservationDaysBackAsDate(userSettings: UserSetting): Date {
    const daysBack = this.getObservationsDaysBack(
      userSettings,
      userSettings.currentGeoHazard
    );
    const fromDate = moment().subtract(daysBack, 'days').startOf('day');
    return fromDate.toDate();
  }

  private deleteObservationNoLongerInResult(
    appMode: AppMode,
    geoHazards: GeoHazard[],
    fromDate: Date,
    items: RegistrationViewModel[]
  ) {
    return NanoSql.getInstance(NanoSql.TABLES.OBSERVATION.name, appMode)
      .query('delete')
      .where((reg: RegistrationViewModel) => {
        return (
          reg &&
          geoHazards.indexOf(reg.GeoHazardTID) >= 0 &&
          moment(reg.DtObsTime).isSameOrAfter(fromDate) &&
          !items.find((item) => item.RegID === reg.RegID)
        );
      })
      .exec();
  }

  private async deleteOldObservations(
    appMode: AppMode,
    geoHazards: GeoHazard[]
  ) {
    const daysBack = await this.getMaxDaysBackForGeoHazard(geoHazards);
    const deleteOldRecordsFrom = moment().subtract(daysBack + 1, 'days');
    return NanoSql.getInstance(NanoSql.TABLES.OBSERVATION.name, appMode)
      .query('delete')
      .where((reg: RegistrationViewModel) => {
        return (
          reg &&
          moment(reg.DtObsTime).isBefore(deleteOldRecordsFrom) &&
          geoHazards.indexOf(reg.GeoHazardTID) >= 0
        );
      })
      .exec();
  }

  private getMaxDaysBackForGeoHazard(geoHazards: GeoHazard[]) {
    const geoHazardString = this.getGeoHazardKey(geoHazards);
    const daysBackForCurrentGeoHazard: number[] =
      settings.observations.daysBack[geoHazardString];
    return Math.max(...daysBackForCurrentGeoHazard);
  }

  private getUserSettingsObservableDistinctToChangeObservations() {
    return this.userSettingService.userSetting$.pipe(
      distinctUntilChanged<UserSetting, string>(
        (x, y) => x.localeCompare(y) === 0,
        (x) => this.getDistinctUserSettingsToChangeObservations(x)
      )
    );
  }

  private getGeoHazardKey(geoHazards: GeoHazard[]) {
    return GeoHazard[geoHazards[0]];
  }

  private getGeoHazardKeyFull(
    appMode: AppMode,
    language: LangKey,
    geoHazards: GeoHazard[]
  ) {
    return `${appMode}_${language}_${this.getGeoHazardKey(geoHazards)}`;
  }

  private getObservationsAsObservable(): Observable<RegistrationViewModel[]> {
    return combineLatest([
      this.getUserSettingsObservableDistinctToChangeObservations(),
      this.latestObservations.asObservable()
    ]).pipe(
      tap((val) =>
        this.loggingService.debug(
          'User settings or latest observations triggered change',
          DEBUG_TAG,
          val
        )
      ),
      switchMap(([userSetting, latestObservations]) => {
        const key = this.getGeoHazardKeyFull(
          userSetting.appMode,
          userSetting.language,
          userSetting.currentGeoHazard
        );
        if (latestObservations[key] !== undefined) {
          const filteredObservations = latestObservations[key].filter((reg) =>
            this.observationByParameterFilter(
              reg,
              userSetting.language,
              userSetting.currentGeoHazard,
              this.getObservationDaysBackAsDate(userSetting)
            )
          );
          return of(filteredObservations);
        }
        return this.getObservationsByParametersAsObservable(
          userSetting.appMode,
          userSetting.language,
          userSetting.currentGeoHazard,
          this.getObservationDaysBackAsDate(userSetting)
        );
      }),
      shareReplay(1)
    );
  }

  private getDistinctUserSettingsToChangeObservations(
    userSetting: UserSetting
  ) {
    const dateString = this.getObservationDaysBackAsDate(
      userSetting
    ).toISOString();
    return `${userSetting.appMode}#${
      userSetting.language
    }#${userSetting.currentGeoHazard.join(',')}#${dateString}`;
  }

  private getObservationsByParametersQuery(
    appMode: AppMode,
    langKey: LangKey,
    geoHazards?: GeoHazard[],
    fromDate?: Date,
    observerGuid?: string
  ) {
    return NanoSql.getInstance(NanoSql.TABLES.OBSERVATION.name, appMode)
      .query('select')
      .where((reg: RegistrationViewModel) =>
        this.observationByParameterFilter(
          reg,
          langKey,
          geoHazards,
          fromDate,
          observerGuid
        )
      );
  }

  private observationByParameterFilter(
    reg: RegistrationViewModel,
    langKey: LangKey,
    geoHazards?: GeoHazard[],
    fromDate?: Date,
    observerGuid?: string
  ) {
    return (
      !!reg &&
      (geoHazards ? geoHazards.indexOf(reg.GeoHazardTID) >= 0 : true) &&
      reg.LangKey === langKey &&
      (fromDate ? moment(reg.DtObsTime).isAfter(fromDate) : true) &&
      (observerGuid ? reg.Observer.ObserverGUID === observerGuid : true)
    );
  }

  // NOTE: Since we are using fastInsert, normal NanoSQL change feed is not supported, using subject trigger instead
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
    observerGuid?: string
  ): Observable<RegistrationViewModel[]> {
    return new NSqlFullUpdateObservable<RegistrationViewModel[]>(
      this.getObservationsByParametersQuery(
        appMode,
        langKey,
        geoHazards,
        fromDate,
        observerGuid
      ).listen({
        debounce: 500,
        unique: true,
        compareFn: (a, b) => this.isDifferent(a, b)
      })
    ).pipe(
      map((items) =>
        items.sort((a, b) => moment(b.DtObsTime).diff(moment(a.DtObsTime)))
      ),
      tap((items) =>
        this.loggingService.debug(
          'Observations observable change feed',
          DEBUG_TAG,
          items
        )
      )
    );
  }

  isDifferent(rowsA: RegistrationViewModel[], rowsB: RegistrationViewModel[]) {
    return (
      this.getUniqueObservations(rowsA) !== this.getUniqueObservations(rowsB)
    );
  }

  uniqueObservation(obs: RegistrationViewModel) {
    return `${obs.RegID}_${obs.LangKey}_${obs.DtChangeTime}`;
  }

  getUniqueObservations(rows: RegistrationViewModel[]) {
    if (!rows) {
      return '';
    }
    return rows.map((x) => this.uniqueObservation(x)).join('#');
  }

  async getObservationById(id: number, appMode: AppMode, langKey: LangKey) {
    const result = await NanoSql.getInstance(
      NanoSql.TABLES.OBSERVATION.name,
      appMode
    )
      .query('select')
      .where(['RegID', '=', id])
      .exec();
    return result[0] as RegistrationViewModel;
  }

  getObserableCount(appMode: AppMode): Observable<number> {
    return new NSqlFullUpdateObservable<RowCount[]>(
      NanoSql.getInstance(NanoSql.TABLES.OBSERVATION.name, appMode)
        .query('select', ['COUNT(*) as count'])
        .listen({
          debounce: 100
        })
    ).pipe(
      map((val: RowCount[]) => val[0].count),
      distinctUntilChanged()
    );
  }
}
