import { Injectable } from '@angular/core';
import moment from 'moment';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { DataLoadService } from '../../../data-load/services/data-load.service';
import { NanoSql } from '../../../../../nanosql';
import { toPromiseWithCancel } from '../../../../core/helpers/observable-helper';
import { GeoHazard, LangKey, AppMode } from '@varsom-regobs-common/core';
import { settings } from '../../../../../settings';
import { HelptextService, HelptextDto } from '@varsom-regobs-common/regobs-api';
import { LoggingService } from '../../../shared/services/logging/logging.service';
import { take } from 'rxjs/operators';

const DEBUG_TAG = 'HelpTextService';

@Injectable({
  providedIn: 'root'
})
export class HelpTextService {
  constructor(
    private helptextApiService: HelptextService,
    private userSettingService: UserSettingService,
    private dataLoadService: DataLoadService,
    private loggingService: LoggingService
  ) {}

  async updateHelpTexts(cancel?: Promise<void>) {
    const userSetting = await this.userSettingService.userSetting$
      .pipe(take(1))
      .toPromise();
    await this.checkLastUpdatedAndUpdateDataIfNeeded(
      userSetting.appMode,
      userSetting.language,
      cancel
    );
  }

  private getDataLoadId(appMode: AppMode, language: LangKey) {
    return `${NanoSql.TABLES.HELP_TEXTS.name}_${appMode}_${language}`;
  }

  private async checkLastUpdatedAndUpdateDataIfNeeded(
    appMode: AppMode,
    language: LangKey,
    cancel?: Promise<void>
  ) {
    const dataLoad = await this.dataLoadService.getState(
      this.getDataLoadId(appMode, language)
    );
    const isLoadingTimeout = moment().subtract(
      settings.foregroundUpdateIntervalMs,
      'milliseconds'
    );
    if (
      dataLoad.isLoading &&
      moment(dataLoad.startedDate).isAfter(isLoadingTimeout)
    ) {
      this.loggingService.debug(
        'Kdv elements is allready being updated.',
        DEBUG_TAG
      );
    } else {
      const lastUpdateLimit = moment().subtract(
        settings.helpTexts.daysBeforeUpdate,
        'day'
      );
      if (
        !dataLoad.lastUpdated ||
        moment(dataLoad.lastUpdated).isBefore(lastUpdateLimit)
      ) {
        await this.updateHelpTextsForLanguage(appMode, language, cancel);
      }
    }
  }

  async updateHelpTextsForLanguage(
    appMode: AppMode,
    language: LangKey,
    cancel?: Promise<void>
  ) {
    const dataLoadId = this.getDataLoadId(appMode, language);
    await this.dataLoadService.startLoading(dataLoadId);
    try {
      const helpTexts = await toPromiseWithCancel(
        this.helptextApiService.HelptextGet(language),
        cancel,
        20000
      );
      await NanoSql.getInstance(NanoSql.TABLES.HELP_TEXTS.name, appMode)
        .query('upsert', { langKey: language, helpTexts: helpTexts })
        .exec();
      await this.dataLoadService.loadingCompleted(dataLoadId);
    } catch (err) {
      await this.dataLoadService.loadingError(dataLoadId, err.message);
    }
  }

  async getHelpTextByKey(
    langKey: LangKey,
    appMode: AppMode,
    geoHazard: GeoHazard,
    registrationTid: number
  ) {
    const helpTexts = await this.getHelpTexts(langKey, appMode);
    return helpTexts.find(
      (x) =>
        !!x &&
        x.GeoHazardTID === geoHazard &&
        x.RegistrationTID === registrationTid
    );
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

  private async getHelpTextsFromDb(
    langKey: LangKey,
    appMode: AppMode
  ): Promise<HelptextDto[]> {
    const result = await NanoSql.getInstance(
      NanoSql.TABLES.HELP_TEXTS.name,
      appMode
    )
      .query('select')
      .where(['langKey', '=', langKey])
      .exec();
    if (result.length > 0) {
      return result[0].helpTexts as HelptextDto[];
    } else {
      return null;
    }
  }
}
