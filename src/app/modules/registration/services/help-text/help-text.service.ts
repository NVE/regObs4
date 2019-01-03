import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { DataLoadService } from '../../../data-load/services/data-load.service';
import { AppMode } from '../../../../core/models/app-mode.enum';
import { LangKey } from '../../../../core/models/langKey';
import { NanoSql } from '../../../../../nanosql';
import { ObservableHelper } from '../../../../core/helpers/observable-helper';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';
import { HelptextDto } from '../../../regobs-api/models';
import { settings } from '../../../../../settings';
import { HelptextService } from '../../../regobs-api/services';

@Injectable({
  providedIn: 'root'
})
export class HelpTextService {

  constructor(
    private helptextApiService: HelptextService,
    private userSettingService: UserSettingService,
    private dataLoadService: DataLoadService,
  ) { }

  async updateHelpTexts(cancel?: Promise<void>) {
    const userSetting = await this.userSettingService.getUserSettings();
    await this.checkLastUpdatedAndUpdateDataIfNeeded(userSetting.appMode, userSetting.language, cancel);
  }

  private getDataLoadId(appMode: AppMode, language: LangKey) {
    return `${NanoSql.TABLES.HELP_TEXTS.name}_${appMode}_${language}`;
  }

  private async checkLastUpdatedAndUpdateDataIfNeeded(appMode: AppMode, language: LangKey, cancel?: Promise<void>) {
    const dataLoad = await this.dataLoadService.getState(this.getDataLoadId(appMode, language));
    const lastUpdateLimit = moment().subtract(settings.helpTexts.daysBeforeUpdate, 'day');
    if (!dataLoad.lastUpdated
      || moment(dataLoad.lastUpdated).isBefore(lastUpdateLimit)) {
      await this.updateHelpTextsForLanguage(appMode, language, cancel);
    }
  }

  async updateHelpTextsForLanguage(appMode: AppMode, language: LangKey, cancel?: Promise<void>) {
    const dataLoadId = this.getDataLoadId(appMode, language);
    await this.dataLoadService.startLoading(dataLoadId);
    try {
      this.helptextApiService.rootUrl = settings.services.regObs.apiUrl[appMode];
      const helpTexts = await ObservableHelper.toPromiseWithCancel(
        this.helptextApiService.HelptextGet(language), cancel);
      await NanoSql.getInstance(NanoSql.TABLES.HELP_TEXTS.name, appMode)
        .query('upsert', { langKey: language, helpTexts: helpTexts }).exec();
      await this.dataLoadService.loadingCompleted(dataLoadId);
    } catch (err) {
      await this.dataLoadService.loadingError(dataLoadId, err.message);
    }
  }

  async getHelpTextByKey(langKey: LangKey, appMode: AppMode, geoHazard: GeoHazard, registrationTid: number) {
    const helpTexts = await this.getHelpTexts(langKey, appMode);
    return helpTexts.find((x) => !!x && x.GeoHazardTID === geoHazard && x.RegistrationTID === registrationTid);
  }

  async getHelpTexts(langKey: LangKey, appMode: AppMode) {
    const resultFromDb = await this.getHelpTextsFromDb(langKey, appMode);
    if (resultFromDb) {
      return resultFromDb;
    } else {
      const langKeyName = LangKey[langKey];
      const defaultHelptexts: HelptextDto[] = require(`../../../../../assets/json/helptexts.${langKeyName}.json`);
      return defaultHelptexts;
    }
  }

  private async getHelpTextsFromDb(langKey: LangKey, appMode: AppMode): Promise<HelptextDto[]> {
    const result = await NanoSql.getInstance(NanoSql.TABLES.HELP_TEXTS.name, appMode).query('select')
      .where(['langKey', '=', langKey]).exec();
    if (result.length > 0) {
      return result[0].helpTexts as HelptextDto[];
    } else {
      return null;
    }
  }
}
