import { Injectable } from '@angular/core';
import { settings } from '../../../../settings';
import { RowCount } from '../../models/row-count.model';
import { Observable, combineLatest, of, BehaviorSubject, firstValueFrom } from 'rxjs';
import moment from 'moment';
import 'moment-timezone';
import { NanoSql } from '../../../../nanosql';
import { map, distinctUntilChanged, switchMap, shareReplay, tap, catchError, take } from 'rxjs/operators';
import { UserSettingService } from '../user-setting/user-setting.service';
import { DataLoadService } from '../../../modules/data-load/services/data-load.service';
import { UserSetting } from '../../models/user-settings.model';
import { LangKey, GeoHazard, AppMode } from 'src/app/modules/common-core/models';
import { SearchService } from 'src/app/modules/common-regobs-api/services';
import { RegistrationViewModel, SearchCriteriaExclUserRequestDto } from 'src/app/modules/common-regobs-api/models';
import { toPromiseWithCancel } from '../../helpers/observable-helper';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';
import { DbHelperService } from '../db-helper/db-helper.service';
import { LogLevel } from '../../../modules/shared/services/logging/log-level.model';
import { NSqlFullUpdateObservable } from '../../helpers/nano-sql/NSqlFullUpdateObservable';
import { AddUpdateDeleteRegistrationService } from '../add-update-delete-registration/add-update-delete-registration.service';

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
    private dbHelperService: DbHelperService,
    addUpdateDeleteRegistrationService: AddUpdateDeleteRegistrationService
  ) {
    this.latestObservations = new BehaviorSubject({});
    this._observationsObservable = this.getObservationsAsObservable();
    this._dataLoadObservable = this.getDataLoadObservable();

    // When a registration has been uploaded, update app cache
    addUpdateDeleteRegistrationService.changedRegistrations$.subscribe((newRegistration) => {
      this.addAlreadyFetchedObservation(newRegistration);
    });

    // When a registration has been deleted, update app cache
    addUpdateDeleteRegistrationService.deletedRegistrationIds$.subscribe((regId) => {
      this.deleteFetchedObservation(regId);
    });
  }

  async updateObservations(cancel?: Promise<any>) {
    let cancelled = false;
    if (cancel) {
      cancel.then(() => {
        cancelled = true;
      });
    }
    const userSettings = await this.userSettingService.userSetting$.pipe(take(1)).toPromise();
    if (!cancelled) {
      const result = await this.checkLastUpdatedAndUpdateDataIfNeeded(userSettings.currentGeoHazard, userSettings, cancel);
      return result;
    } else {
      return 0;
    }
  }

  private getDataLoadId(appMode: AppMode, geoHazards: GeoHazard[], langKey: LangKey) {
    return `${NanoSql.TABLES.OBSERVATION.name}_${geoHazards.join('-')}_${appMode}_${langKey}`;
  }

  private getDataLoadObservable() {
    return this.userSettingService.appModeLanguageAndCurrentGeoHazard$.pipe(
      map(([appMode, language, currentGeoHazard]) => this.getDataLoadId(appMode, currentGeoHazard, language))
    );
  }

  private async checkLastUpdatedAndUpdateDataIfNeeded(geoHazards: GeoHazard[], userSetting: UserSetting, cancel?: Promise<void>) {
    const dataLoadId = this.getDataLoadId(userSetting.appMode, geoHazards, userSetting.language);
    const dataLoad = await this.dataLoadService.getState(dataLoadId);
    const isLoadingTimeout = moment().subtract(settings.foregroundUpdateIntervalMs, 'milliseconds');
    if (dataLoad.isLoading && moment(dataLoad.startedDate).isAfter(isLoadingTimeout)) {
      this.loggingService.debug('Observations is already loading.', DEBUG_TAG);
      return 0;
    } else {
      const lastUpdateLimit = moment().subtract(15, 'minutes');
      const fromDate = await this.getDaysBackToFetchAsDate(userSetting, geoHazards);
      if (
        !dataLoad.lastUpdated ||
        moment(dataLoad.lastUpdated).isBefore(lastUpdateLimit) ||
        moment(dataLoad.itemsFromDate).isAfter(fromDate)
      ) {
        return this.updateObservationsForGeoHazard(geoHazards, userSetting, cancel);
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
        this.dataLoadService.getStateAsObservable(this.getDataLoadId(appMode, currentGeoHazard, language))
      ),
      map((val) => (val && val.lastUpdated ? moment(val.lastUpdated).toDate() : null))
    );
  }

  async forceUpdateObservationsForCurrentGeoHazard(cancel?: Promise<any>) {
    const userSettings = await this.userSettingService.userSetting$.pipe(take(1)).toPromise();
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
      const searchResult = await toPromiseWithCancel(
        this.searchService.SearchSearch({
          FromDtObsTime: fromDate.toISOString(),
          SelectedGeoHazards: geoHazards,
          NumberOfRecords: settings.observations.maxObservationsToFetch,
          LangKey: userSetting.language,
          TimeZone: moment().format('Z')
        }),
        cancel,
        60000
      );
      this.loggingService.debug(`Got ${searchResult.length} new observations for geoHazards ${geoHazards.join(', ')}`, DEBUG_TAG);
      if (!isCanceled) {
        this.updateLatestObservations(userSetting.appMode, userSetting.language, geoHazards, searchResult);
        await this.dataLoadService.loadingCompleted(dataLoadId, searchResult.length, fromDate, new Date());
        this.saveAndClenupOfflineObservations(fromDate, geoHazards, userSetting, searchResult);
        return searchResult.length;
      } else {
        this.loggingService.debug('Operation cancelled. Saving load error.', DEBUG_TAG);
        await this.dataLoadService.loadingError(dataLoadId, 'Operation cancelled');
        return 0;
      }
    } catch (err) {
      if (isCanceled) {
        this.loggingService.debug(err, DEBUG_TAG, 'Operation cancelled');
      } else {
        this.loggingService.log('Loading error. Is network available?', err, LogLevel.Warning);
      }
      await this.dataLoadService.loadingError(dataLoadId, err.message);
      return 0;
    }
  }

  private async addAlreadyFetchedObservation(observation: RegistrationViewModel) {
    const cachedObservations = await firstValueFrom(this.observations$);

    // Remove old version of observation if we already have it
    const cachedObservationsWithoutCurrentObs = cachedObservations.filter(obs => obs.RegId !== observation.RegId);
    const newObservations = [observation, ...cachedObservationsWithoutCurrentObs];

    await this.updateCacheAndSave(newObservations, observation.GeoHazardTID);
  }

  async deleteFetchedObservation(regId: number) {
    const cachedObservations = await firstValueFrom(this.observations$);

    const index = cachedObservations.findIndex(obs => obs.RegId === regId);
    if (index !== -1) {
      //we found the registration in the cache, so remove it
      const observation = cachedObservations[index];
      const observationsToKeep = cachedObservations.filter(obs => obs.RegId !== regId);
      await this.updateCacheAndSave(observationsToKeep, observation.GeoHazardTID);
    }
  }

  private async updateCacheAndSave(observations: RegistrationViewModel[], geoHazard: GeoHazard): Promise<void> {
    const userSettings = await firstValueFrom(this.userSettingService.userSetting$);
    const inMemoryCache = this.latestObservations.getValue();
    const geoHazards = [geoHazard];
    const key = this.getGeoHazardKeyFull(userSettings.appMode, userSettings.language, geoHazards);

    // Update cached observations
    this.latestObservations.next({
      ...inMemoryCache,
      [key]: observations
    });

    // Update offline storage
    const fromDate = await this.getDaysBackToFetchAsDate(userSettings, geoHazards);
    await this.saveAndClenupOfflineObservations(fromDate, geoHazards, userSettings, observations);
  }

  private updateLatestObservations(appMode: AppMode, langKey: LangKey, geoHazards: GeoHazard[], observations: RegistrationViewModel[]) {
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
    const instanceName = NanoSql.getInstanceName(NanoSql.TABLES.OBSERVATION.name, userSetting.appMode);
    const now = new Date();
    await this.dbHelperService.fastInsert(instanceName, result, (data) => data.RegId);
    this.loggingService.debug(`fastInsert took ${new Date().getTime() - now.getTime()} ms`, DEBUG_TAG);
    const deleteResult = await this.deleteObservationNoLongerInResult(userSetting.appMode, geoHazards, fromDate, result);
    this.loggingService.debug('Deleted items no longer in updated result', DEBUG_TAG, deleteResult);
    await this.deleteOldObservations(userSetting.appMode, geoHazards);
  }

  /**
   * Return registrations done by current logged in user.
   * Empty list if no user is logged in.
   * @param langKey the language key you want registrations in
   * @param pageNr like to get next page or any more pages
   * @param numberOfRecords how many records you like returned
   * @returns the registrations if there are any
   */
  getObservationsForCurrentUser(
    langKey: LangKey,
    pageNr?: number,
    numberOfRecords = 10
  ): Observable<RegistrationViewModel[]> {

    const criteria: SearchCriteriaExclUserRequestDto = {
      NumberOfRecords: numberOfRecords,
      LangKey: langKey,
      Offset: (pageNr || 0) * numberOfRecords,
      TimeZone: moment().format('Z')
    };
    return this.searchService.SearchPostSearchMyRegistrations(criteria)
      .pipe(catchError(() => of([]))); // Return empty list if http request fails);
  }

  async updateObservationById(regId: number, appMode: AppMode, langKey: LangKey, currentGeoHazards: GeoHazard[]) {
    const result = await this.getRegistrationByRegIdFromApi(regId, appMode, langKey).toPromise();
    if (result) {
      await NanoSql.getInstance(NanoSql.TABLES.OBSERVATION.name, appMode).query('upsert', result).exec();
      // Reset next observations, so it will be fetched from db when one item is updated
      this.updateLatestObservations(appMode, langKey, currentGeoHazards, undefined);
    }
    return result;
  }

  private getRegistrationByRegIdFromApi(regId: number, appMode: AppMode, langKey: LangKey) {
    return this.searchService.SearchSearch({ RegId: regId, LangKey: langKey }).pipe(map((result) => result[0]));
  }

  getObservationsDaysBack(userSettings: UserSetting, geoHazards: GeoHazard[]): number {
    const daysBackForCurrentGeoHazard = userSettings.observationDaysBack.find((setting) => setting.geoHazard === geoHazards[0]);
    const daysBack = daysBackForCurrentGeoHazard ? daysBackForCurrentGeoHazard.daysBack : 3; // default to 3 days back if not found
    return daysBack;
  }

  private getObservationDaysBackAsDate(userSettings: UserSetting): Date {
    const daysBack = this.getObservationsDaysBack(userSettings, userSettings.currentGeoHazard);
    const fromDate = moment().subtract(daysBack, 'days').startOf('day');
    return fromDate.toDate();
  }

  private deleteObservationNoLongerInResult(appMode: AppMode, geoHazards: GeoHazard[], fromDate: Date, items: RegistrationViewModel[]) {
    return NanoSql.getInstance(NanoSql.TABLES.OBSERVATION.name, appMode)
      .query('delete')
      .where((reg: RegistrationViewModel) => {
        return (
          reg &&
          geoHazards.indexOf(reg.GeoHazardTID) >= 0 &&
          moment(reg.DtObsTime).isSameOrAfter(fromDate) &&
          !items.find((item) => item.RegId === reg.RegId)
        );
      })
      .exec();
  }

  private async deleteOldObservations(appMode: AppMode, geoHazards: GeoHazard[]) {
    const daysBack = await this.getMaxDaysBackForGeoHazard(geoHazards);
    const deleteOldRecordsFrom = moment().subtract(daysBack + 1, 'days');
    return NanoSql.getInstance(NanoSql.TABLES.OBSERVATION.name, appMode)
      .query('delete')
      .where((reg: RegistrationViewModel) => {
        return reg && moment(reg.DtObsTime).isBefore(deleteOldRecordsFrom) && geoHazards.indexOf(reg.GeoHazardTID) >= 0;
      })
      .exec();
  }

  private getMaxDaysBackForGeoHazard(geoHazards: GeoHazard[]) {
    const geoHazardString = this.getGeoHazardKey(geoHazards);
    const daysBackForCurrentGeoHazard: number[] = settings.observations.daysBack[geoHazardString];
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

  private getGeoHazardKeyFull(appMode: AppMode, language: LangKey, geoHazards: GeoHazard[]) {
    return `${appMode}_${language}_${this.getGeoHazardKey(geoHazards)}`;
  }

  private getObservationsAsObservable(): Observable<RegistrationViewModel[]> {
    return combineLatest([this.getUserSettingsObservableDistinctToChangeObservations(), this.latestObservations.asObservable()]).pipe(
      tap((val) => this.loggingService.debug('User settings or latest observations triggered change', DEBUG_TAG, val)),
      switchMap(([userSetting, latestObservations]) => {
        const key = this.getGeoHazardKeyFull(userSetting.appMode, userSetting.language, userSetting.currentGeoHazard);
        if (latestObservations[key] !== undefined) {
          const filteredObservations = latestObservations[key].filter((reg) =>
            this.observationByParameterFilter(
              reg,
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

  private getDistinctUserSettingsToChangeObservations(userSetting: UserSetting) {
    const dateString = this.getObservationDaysBackAsDate(userSetting).toISOString();
    return `${userSetting.appMode}#${userSetting.language}#${userSetting.currentGeoHazard.join(',')}#${dateString}`;
  }

  private getObservationsByParametersQuery(appMode: AppMode, langKey: LangKey, geoHazards?: GeoHazard[], fromDate?: Date) {
    return NanoSql.getInstance(NanoSql.TABLES.OBSERVATION.name, appMode)
      .query('select')
      .where((reg: RegistrationViewModel) => this.observationByParameterFilter(reg, geoHazards, fromDate));
  }

  private observationByParameterFilter(
    reg: RegistrationViewModel,
    geoHazards?: GeoHazard[],
    fromDate?: Date
  ) {
    return (
      !!reg &&
      (geoHazards ? geoHazards.indexOf(reg.GeoHazardTID) >= 0 : true) &&
      (fromDate ? moment(reg.DtObsTime).isAfter(fromDate) : true)
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
    fromDate?: Date
  ): Observable<RegistrationViewModel[]> {
    return new NSqlFullUpdateObservable<RegistrationViewModel[]>(
      this.getObservationsByParametersQuery(appMode, langKey, geoHazards, fromDate).listen({
        debounce: 500,
        unique: true,
        compareFn: (a, b) => this.isDifferent(a, b, langKey)
      })
    ).pipe(
      map((items) => items.sort((a, b) => moment(b.DtObsTime).diff(moment(a.DtObsTime)))),
      tap((items) => this.loggingService.debug('Observations observable change feed', DEBUG_TAG, items))
    );
  }

  isDifferent(rowsA: RegistrationViewModel[], rowsB: RegistrationViewModel[], langKey: LangKey) {
    return this.getUniqueObservations(rowsA, langKey) !== this.getUniqueObservations(rowsB, langKey);
  }

  uniqueObservation(obs: RegistrationViewModel, langKey: LangKey) {
    return `${obs.RegId}_${langKey}_${obs.DtChangeTime}`;
  }

  getUniqueObservations(rows: RegistrationViewModel[], langKey: LangKey) {
    if (!rows) {
      return '';
    }
    return rows.map((x) => this.uniqueObservation(x, langKey)).join('#');
  }

  async getObservationById(id: number, appMode: AppMode) {
    const result = await NanoSql.getInstance(NanoSql.TABLES.OBSERVATION.name, appMode).query('select').where(['RegId', '=', id]).exec();
    return result[0] as RegistrationViewModel;
  }

  getObserableCount(appMode: AppMode): Observable<number> {
    return new NSqlFullUpdateObservable<RowCount[]>(
      NanoSql.getInstance(NanoSql.TABLES.OBSERVATION.name, appMode).query('select', ['COUNT(*) as count']).listen({
        debounce: 100
      })
    ).pipe(
      map((val: RowCount[]) => val[0].count),
      distinctUntilChanged()
    );
  }
}
