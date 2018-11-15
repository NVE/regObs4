import { Injectable } from '@angular/core';
import * as RegobsApi from '../../../modules/regobs-api/services';
import { settings } from '../../../../settings';
import { UserSettingService } from '../user-setting/user-setting.service';
import { LangKey } from '../../models/langKey';
import { AppMode } from '../../models/app-mode.enum';
import { NanoSql } from '../../../../nanosql';
import { KdvElementsResponseDto } from '../../../modules/regobs-api/models';
import { from } from 'rxjs';
import { UserSetting } from '../../models/user-settings.model';
import { switchMap } from 'rxjs/operators';
import { DataLoadService } from '../../../modules/data-load/services/data-load.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class KdvService {

  constructor(
    private kdvApiService: RegobsApi.KdvElementsService,
    private userSettingService: UserSettingService,
    private dataLoadService: DataLoadService,
  ) { }

  async updateKdvElements() {
    const userSetting = await this.userSettingService.getUserSettings();
    this.checkLastUpdatedAndUpdateDataIfNeeded(userSetting.appMode, userSetting.language);
  }

  private getDataLoadId(appMode: AppMode, language: LangKey) {
    return `${NanoSql.TABLES.KDV_ELEMENTS.name}_${appMode}_${language}`;
  }

  private async checkLastUpdatedAndUpdateDataIfNeeded(appMode: AppMode, language: LangKey) {
    const dataLoad = await this.dataLoadService.getState(this.getDataLoadId(appMode, language));
    const lastUpdateLimit = moment().subtract(settings.kdvElements.daysBeforeUpdate, 'day');
    if (!dataLoad.lastUpdated
      || moment(dataLoad.lastUpdated).isBefore(lastUpdateLimit)) {
      await this.updateKdvElementsForLanguage(appMode, language);
    } else {
      const nextUpdate = moment(dataLoad.lastUpdated).add(settings.kdvElements.daysBeforeUpdate, 'day').toISOString();
      console.log(`[INFO][KdvService] No need to update for language ${LangKey[language]}.
        Last updated is: ${dataLoad.lastUpdated}. Next update should be: ${nextUpdate}`);
    }
  }

  async updateKdvElementsForLanguage(appMode: AppMode, language: LangKey) {
    const dataLoadId = this.getDataLoadId(appMode, language);
    await this.dataLoadService.startLoading(dataLoadId);
    this.kdvApiService.rootUrl = settings.services.regObs.apiUrl[appMode];
    const kdvElements = await this.kdvApiService.KdvElementsGetKdvs({ langkey: language }).toPromise();
    console.log('[INFO] Updated KDV elements: ', kdvElements);
    await NanoSql.getInstance(NanoSql.TABLES.KDV_ELEMENTS.name, appMode)
      .query('upsert', { langKey: language, ...kdvElements }).exec();
    await this.dataLoadService.loadingCompleted(dataLoadId);
  }

  async getKdvRepositories(langKey: LangKey, appMode: AppMode, key: string) {
    const kdvElemetns = await this.getKdvElements(langKey, appMode);
    return kdvElemetns.KdvRepositories[key];
  }

  async getViewRepositories(langKey: LangKey, appMode: AppMode, key: string) {
    const kdvElemetns = await this.getKdvElements(langKey, appMode);
    return kdvElemetns.ViewRepositories[key];
  }

  async getKdvElements(langKey: LangKey, appMode: AppMode) {
    const resultFromDb = await this.getKdvElementsFromDb(langKey, appMode);
    if (resultFromDb) {
      return resultFromDb;
    } else {
      const langKeyName = LangKey[langKey];
      const defaultKdvElements: KdvElementsResponseDto = require(`../../../../assets/kdvelements.${langKeyName}.json`);
      return defaultKdvElements;
    }
  }

  getKdvElementsAsObservable(key: string, userSetting?: UserSetting) {
    if (userSetting) {
      return from(this.getKdvRepositories(userSetting.language, userSetting.appMode, key));
    } else {
      return this.userSettingService.userSettingObservable$.pipe(
        switchMap((us) => from(this.getKdvRepositories(us.language, us.appMode, key))));
    }
  }

  private async getKdvElementsFromDb(langKey: LangKey, appMode: AppMode): Promise<KdvElementsResponseDto> {
    const result = await NanoSql.getInstance(NanoSql.TABLES.KDV_ELEMENTS.name, appMode).query('select')
      .where(['langKey', '=', langKey]).exec();
    if (result.length > 0) {
      return result[0] as KdvElementsResponseDto;
    } else {
      return null;
    }
  }
}
