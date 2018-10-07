import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { settings } from '../../../../settings';
import { UserSettingService } from '../user-setting/user-setting.service';
import * as moment from 'moment';
import 'moment-timezone';
import { LangKey } from '../../models/langKey';
import { HelperService } from '../helpers/helper.service';
import { nSQL } from 'nano-sql';
import { HttpClient } from '@angular/common/http';
import { NanoSql } from '../../../../nanosql';
import { map } from 'rxjs/operators';
import { GeoHazard } from '../../models/geo-hazard.enum';
import { IWarning } from './warning.interface';
import { WarningGroup } from './warning-group.model';
import { WarningGroupKey } from './warning-group-key.interface';
import { IWarningApiResult } from './warning-api-result.interface';
import { IAvalancheWarningApiResult } from './avalanche-warning-api-result.interface';
import { combineLatest } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class WarningService {
  constructor(private httpClient: HttpClient,
    private userSettingService: UserSettingService,
    private helperService: HelperService,
    private toastController: ToastController,
  ) {

  }

  async updateWarnings() {
    console.log('[INFO] Updating warnings by priority');
    // TODO: Cleanup old items
    await this.updateFloodAndLandslideWarnings(GeoHazard.Dirt, LangKey.no);
    await this.updateFloodAndLandslideWarnings(GeoHazard.Water, LangKey.no);
    await this.updateAvalancheWarnings(LangKey.no);
    // await this.updateLandslideWarnings(LangKey.en); Not using any texts, so no need for english version yet
  }

  private getUpdatePriority() {
    const now = moment();
    if (settings.services.warning.summerMonths.indexOf(now.month()) >= 0) {
      return [
        GeoHazard.Water,
        GeoHazard.Dirt,
        GeoHazard.Snow,
      ];
    } else {
      return [
        GeoHazard.Snow,
        GeoHazard.Water,
        GeoHazard.Dirt,
      ];
    }
  }

  getWarningsAsObservable() {
    return nSQL().observable<IWarning[]>(() => {
      return nSQL(NanoSql.TABLES.WARNING.name).query('select').emit();
    }).debounce(500).toRxJS().pipe(map(this.groupWarnings));
  }

  getFavouritesAsObservable() {
    return nSQL().observable<{ groupId: string, geoHazard: GeoHazard }[]>(() => {
      return nSQL(NanoSql.TABLES.WARNING_FAVOURITE.name).query('select').emit();
    }).toRxJS();
  }

  getWarningsAndFavouritesAsObservable() {
    return combineLatest(this.getWarningsAsObservable(), this.getFavouritesAsObservable())
      .pipe(map(([warningGroup, favourites]) => {
        return warningGroup.map((wg) => {
          wg.isFavourite = !!(favourites.find((x) =>
            x.groupId === wg.group.groupId &&
            x.geoHazard === wg.group.geoHazard));
          return wg;
        });
      }));
  }

  addToFavourite(groupId: string, geoHazard: GeoHazard) {
    const id = `${geoHazard}_${groupId}`;
    return nSQL(NanoSql.TABLES.WARNING_FAVOURITE.name)
      .query('upsert', { id, groupId, geoHazard }).exec();
  }

  removeFromFavourite(groupId: string, geoHazard: GeoHazard) {
    const id = `${geoHazard}_${groupId}`;
    return nSQL(NanoSql.TABLES.WARNING_FAVOURITE.name).query('delete')
      .where(['id', '=', id]).exec();
  }

  private groupWarnings(warnings: IWarning[]): WarningGroup[] {
    const getGroupKey = function (warning: IWarning): WarningGroupKey {
      return {
        language: warning.language,
        groupId: warning.groupId,
        groupName: warning.groupName,
        geoHazard: warning.geoHazard
      };
    };
    const groupMap = warnings.reduce((pv, cv) => {
      const groupId = getGroupKey(cv);
      const key = JSON.stringify(groupId);
      const item = pv.get(key) || [];
      item.push(cv);
      return pv.set(key, item);
    }, new Map<string, IWarning[]>());
    return Array.from(groupMap.keys()).map((k) => {
      const group: WarningGroupKey = JSON.parse(k);
      return new WarningGroup(group, groupMap.get(k));
    });
  }

  getGeoHazardsForCurrentGeoHazard(currentGeoHazard: GeoHazard) {
    if (currentGeoHazard === GeoHazard.Snow || currentGeoHazard === GeoHazard.Ice) {
      return [currentGeoHazard];
    }
    return [GeoHazard.Dirt, GeoHazard.Water];
  }

  getWarningsForCurrentLanguageAsObservable() {
    return combineLatest(this.userSettingService.getUserSettingsAsObservable(),
      this.getWarningsAndFavouritesAsObservable())
      .pipe(
        map(([userSetting, warningGroups]) => {
          return warningGroups.filter((w) => w.group.language === userSetting.language);
        })
      );
  }

  getWarningsById(...guids: string[]) {
    return nSQL(NanoSql.TABLES.WARNING.name).query('select')
      .where(['id', 'IN', guids]).exec() as Promise<IWarning[]>;
  }

  private async updateFloodAndLandslideWarnings(geoHazard: GeoHazard, language: LangKey, from?: Date, to?: Date) {
    console.log(`[INFO][WarningService] Updating ${GeoHazard[geoHazard]} warnings`);
    const dateRange = this.getDefaultDateRange(from, to);
    const country = 'no';
    const url = `${this.getBaseUrl(geoHazard)}`
      + `/Warning/All/${language}`
      + `/${dateRange.from.format('YYYY-MM-DD')}`
      + `/${dateRange.to.format('YYYY-MM-DD')}`;
    const result = await this.httpClient.get<IWarningApiResult[]>(url).toPromise();
    const warnings: IWarning[] = [];
    for (const item of result) {
      const validTo = this.getDate(item.ValidTo);
      const county = item.CountyList[0].Id;
      const id = this.getId(geoHazard, country, county, language, validTo);
      const warningLevel = parseInt(item.ActivityLevel, 10);

      const existing = warnings.find((w) => w.id === id);
      if (existing) {
        if (existing.warningLevel < warningLevel) {
          existing.warningLevel = warningLevel;
        }
      } else {
        warnings.push({
          id,
          geoHazard: geoHazard,
          warningLevel,
          groupId: county,
          groupName: item.CountyList[0].Name,
          language: LangKey[language],
          publishTime: this.getDate(item.PublishTime),
          validFrom: this.getDate(item.ValidFrom),
          validTo,
          mainText: item.MainText
        });
      }
    }
    console.log(`[INFO][WarningService] Result from ${GeoHazard[geoHazard]}:`, warnings.length, warnings);
    const warningsToSave = await this.filterExistingItems(warnings);
    console.log(`[INFO][WarningService] New updates for ${GeoHazard[geoHazard]}:`, warningsToSave.length, warningsToSave);
    await nSQL().loadJS(NanoSql.TABLES.WARNING.name, warningsToSave);
  }

  private async updateAvalancheWarnings(language: LangKey, from?: Date, to?: Date) {
    console.log(`[INFO][WarningService] Updating avalanche warnings`);
    const dateRange = this.getDefaultDateRange(from, to);
    const country = 'no';
    const url = `${this.getBaseUrl(GeoHazard.Snow)}`
      + `/RegionSummary/Simple/${language}`
      + `/${dateRange.from.format('YYYY-MM-DD')}`
      + `/${dateRange.to.format('YYYY-MM-DD')}`;
    const result = await this.httpClient.get<IAvalancheWarningApiResult[]>(url).toPromise();
    const warnings: IWarning[] = [];
    for (const avalancheGroup of result) {
      for (const simpleWarning of avalancheGroup.AvalancheWarningList) {
        const validTo = this.getDate(simpleWarning.ValidTo);
        const groupId = simpleWarning.RegionId.toString();
        const id = this.getId(GeoHazard.Snow, country, groupId, language, validTo);
        const warningLevel = parseInt(simpleWarning.DangerLevel, 10);

        const existing = warnings.find((w) => w.id === id);
        if (existing) {
          if (existing.warningLevel < warningLevel) {
            existing.warningLevel = warningLevel;
          }
        } else {
          warnings.push({
            id,
            geoHazard: GeoHazard.Snow,
            warningLevel,
            groupId,
            groupName: simpleWarning.RegionName,
            language: LangKey[language],
            publishTime: this.getDate(simpleWarning.PublishTime),
            validFrom: this.getDate(simpleWarning.ValidFrom),
            validTo,
            mainText: simpleWarning.MainText
          });
        }
      }
    }
    console.log(`[INFO][WarningService] Result from avalanche warnings:`, warnings.length, warnings);
    const warningsToSave = await this.filterExistingItems(warnings);
    console.log(`[INFO][WarningService] New updates for avalanche warnings:`, warningsToSave.length, warningsToSave);
    await nSQL().loadJS(NanoSql.TABLES.WARNING.name, warningsToSave);
  }

  private getDate(dateString: string) {
    return moment.tz(dateString, settings.services.warning.timezone).toDate();
  }

  private getId(geoHazard: GeoHazard, country: string, region: string, language: LangKey, validTo: Date) {
    return `${geoHazard}_${country}_${region}_${LangKey[language]}_${moment(validTo).format('YYYYMMDD')}`;
  }

  private getBaseUrl(geoHazard: GeoHazard) {
    return settings.services.warning[GeoHazard[geoHazard]].apiUrl;
  }

  private getDefaultDateRange(from?: Date, to?: Date) {
    const fromMoment = from ? moment(from) : moment().subtract(1, 'day');
    const toMoment = to ? moment(to) : moment().endOf('day').add(settings.services.warning.defaultWarningDaysAhead, 'days');
    return { from: fromMoment, to: toMoment };
  }

  private async filterExistingItems(resultToSave: IWarning[]) {
    const existingItems = await this.getWarningsById(...(resultToSave || []).map((item) => item.id));
    return this.filterIfExistingItemsPubDateIsSame(resultToSave, existingItems);
  }

  private async filterIfExistingItemsPubDateIsSame(resultToSave: IWarning[], existingItems: IWarning[]) {
    return (resultToSave || []).filter((item) => {
      const existingItem = (existingItems || []).find((x) => x.id === item.id);
      if (!existingItem || moment(item.publishTime).isAfter(existingItem.publishTime)) {
        return true;
      } else {
        return false;
      }
    });
  }

  async reset() {
    return nSQL(NanoSql.TABLES.WARNING.name).query('drop').exec();
  }
}
