import { Injectable } from '@angular/core';
import * as RegobsApi from '../../../modules/regobs-api/services';
import { settings } from '../../../../settings';
import { UserSettingService } from '../user-setting/user-setting.service';
import { LangKey } from '../../models/langKey';
import { AppMode } from '../../models/app-mode.enum';
import { NanoSql } from '../../../../nanosql';
import { KdvElementsResponseDto } from '../../../modules/regobs-api/models';
import { combineLatest, Observable } from 'rxjs';
import { switchMap, map, shareReplay } from 'rxjs/operators';
import { DataLoadService } from '../../../modules/data-load/services/data-load.service';
import * as moment from 'moment';
import { ObservableHelper } from '../../helpers/observable-helper';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';
import { NanoSqlObservableHelper } from '../../helpers/nano-sql/nanoObserverToRxjs';

const DEBUG_TAG = 'KdvService';

@Injectable({
  providedIn: 'root'
})
export class KdvService {

  private _kdvElements$: Observable<KdvElementsResponseDto>;

  get kdvElements$() {
    return this._kdvElements$;
  }

  constructor(
    private kdvApiService: RegobsApi.KdvElementsService,
    private userSettingService: UserSettingService,
    private dataLoadService: DataLoadService,
    private loggingService: LoggingService,
  ) {
    this._kdvElements$ = this.getKdvElementsObservable();
  }

  async updateKdvElements(cancel?: Promise<void>) {
    const userSetting = await this.userSettingService.getUserSettings();
    await this.checkLastUpdatedAndUpdateDataIfNeeded(userSetting.appMode, userSetting.language, cancel);
  }

  private getDataLoadId(appMode: AppMode, language: LangKey) {
    return `${NanoSql.TABLES.KDV_ELEMENTS.name}_${appMode}_${language}`;
  }

  private async checkLastUpdatedAndUpdateDataIfNeeded(appMode: AppMode, language: LangKey, cancel?: Promise<void>) {
    const dataLoad = await this.dataLoadService.getState(this.getDataLoadId(appMode, language));
    const isLoadingTimeout = moment().subtract(settings.foregroundUpdateIntervalMs, 'milliseconds');
    if (dataLoad.isLoading && moment(dataLoad.startedDate).isAfter(isLoadingTimeout)) {
      this.loggingService.debug(`Kdv elements is allready being updated.`, DEBUG_TAG);
    } else {
      const lastUpdateLimit = moment().subtract(settings.kdvElements.daysBeforeUpdate, 'day');
      if (!dataLoad.lastUpdated || moment(dataLoad.lastUpdated).isBefore(lastUpdateLimit)) {
        await this.updateKdvElementsForLanguage(appMode, language, cancel);
      }
    }
  }

  async updateKdvElementsForLanguage(appMode: AppMode, language: LangKey, cancel?: Promise<void>) {
    const dataLoadId = this.getDataLoadId(appMode, language);
    await this.dataLoadService.startLoading(dataLoadId);
    try {
      this.kdvApiService.rootUrl = settings.services.regObs.apiUrl[appMode];
      const kdvElements = await ObservableHelper.toPromiseWithCancel(
        this.kdvApiService.KdvElementsGetKdvs({ langkey: language }), cancel);
      await NanoSql.getInstance(NanoSql.TABLES.KDV_ELEMENTS.name, appMode)
        .query('upsert', { langKey: language, ...kdvElements }).exec();
      await this.dataLoadService.loadingCompleted(dataLoadId);
      return true;
    } catch (err) {
      await this.dataLoadService.loadingError(dataLoadId, err.message);
      return false;
    }
  }

  getKdvRepositoryByKeyObservable(key: string) {
    return this.kdvElements$.pipe(map((val) => val.KdvRepositories[key]));
  }

  getViewRepositoryByKeyObservable(key: string) {
    return this.kdvElements$.pipe(map((val) => val.ViewRepositories[key]));
  }

  private getKdvElementsObservable() {
    return combineLatest(this.userSettingService.appMode$, this.userSettingService.language$).pipe(
      switchMap(([appMode, langKey]) => this.getKdvElementsFromDbAsStream(appMode, langKey)),
      shareReplay(1));
  }

  private getKdvElementsFromDbAsStream(appMode: AppMode, langKey: LangKey) {
    return NanoSqlObservableHelper.toRxJS<KdvElementsResponseDto[]>(
      NanoSql.getInstance(NanoSql.TABLES.KDV_ELEMENTS.name, appMode).query('select')
        .where(['langKey', '=', langKey]).listen())
      .pipe(map((val: KdvElementsResponseDto[]) => val.length > 0 ? val[0] : this.getDefaultKdvElements(langKey)));
  }

  private getDefaultKdvElements(langKey: LangKey) {
    const langKeyName = LangKey[langKey];
    const defaultKdvElements: KdvElementsResponseDto = require(`../../../../assets/json/kdvelements.${langKeyName}.json`);
    return defaultKdvElements;
  }
}
