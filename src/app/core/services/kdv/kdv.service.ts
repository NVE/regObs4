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
      console.log(`[INFO][KdvService] No need to update for language ${LangKey[language]}. Last updated is:`, dataLoad.lastUpdated);
    }
  }

  async updateKdvElementsForLanguage(appMode: AppMode, language: LangKey) {
    await this.dataLoadService.startLoading(this.getDataLoadId(appMode, language));
    this.kdvApiService.rootUrl = settings.services.regObs.apiUrl[appMode];
    const kdvElements = await this.kdvApiService.KdvElementsGetKdvs({ langkey: language }).toPromise();
    console.log('[INFO] KDV elements: ', kdvElements);
    // TODO: Save to database
  }

  async getKdvElements(langKey: LangKey, appMode: AppMode, key: string) {
    const resultFromDb = await this.getKdvElementsFromDb(langKey, appMode);
    if (resultFromDb) {
      return resultFromDb.KdvRepositories[key];
    } else {
      const langKeyName = LangKey[langKey];
      const defaultKdvElements: KdvElementsResponseDto = require(`../../../../assets/kdvelements.${langKeyName}.json`);
      return defaultKdvElements.KdvRepositories[key];
    }
  }

  async getViewRepository(langKey: LangKey, appMode: AppMode, key: string) {
    const resultFromDb = await this.getKdvElementsFromDb(langKey, appMode);
    if (resultFromDb) {
      return resultFromDb.ViewRepositories[key];
    } else {
      const langKeyName = LangKey[langKey];
      const defaultKdvElements: KdvElementsResponseDto = require(`../../../../assets/kdvelements.${langKeyName}.json`);
      return defaultKdvElements.ViewRepositories[key];
    }
  }

  getKdvElementsAsObservable(key: string, userSetting?: UserSetting) {
    if (userSetting) {
      return from(this.getKdvElements(userSetting.language, userSetting.appMode, key));
    } else {
      return this.userSettingService.userSettingObservable$.pipe(
        switchMap((us) => from(this.getKdvElements(us.language, us.appMode, key))));
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
