import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { settings } from '../../../../settings';
import { UserSettingService } from '../user-setting/user-setting.service';
import * as moment from 'moment';
import { LangKey } from '../../models/langKey';
import { HelperService } from '../helpers/helper.service';
import { RegionSummary } from './snow/region-summary.model';
import { nSQL } from 'nano-sql';
import { Observer } from 'nano-sql/lib/observable';
import { HttpClient } from '@angular/common/http';
import { NanoSql } from '../../../../nanosql';
import { LandslideWarning } from './landslide/landslide-warning.model';
import { Observable } from 'rxjs';
import { CapApiService } from '../../../modules/cap/services/cap-api.service';
import { map, combineLatest } from 'rxjs/operators';
import { GeoHazard } from '../../models/geo-hazard.enum';
import { WarningCap } from './warning-cap.model';
import { UserSetting } from '../../models/user-settings.model';

@Injectable({
  providedIn: 'root'
})
export class WarningService {
  constructor(private httpClient: HttpClient,
    private userSettingService: UserSettingService,
    private helperService: HelperService,
    private capApiService: CapApiService,
  ) {

  }

  // async updateAvalancheWarnings() {
  //   console.log('[INFO] Updating avalanche warning region summary');
  //   const result = await this.getAvalancheWarningRegionSummarySimpleApi();
  //   await nSQL().loadJS(NanoSql.TABLES.AVALANCHE_WARNING_SUMMARY.name, result);
  // }

  async updateCap() {
    console.log('[INFO] Updating avalanche warning region summary');
    // const result = await this.getLandslideWarningsApi();
    // await nSQL().loadJS(NanoSql.TABLES.LANDSLIDE_WARNING.name, result);
    const from = moment().startOf('day');
    const to = from.add(2, 'days');
    await this.updateCapFeed(GeoHazard.Dirt, from.toDate(), to.toDate());
    await this.updateCapFeed(GeoHazard.Water, from.toDate(), to.toDate());
    await this.updateCapDetails(null, from.toDate());

    // TODO: Cleanup old items
  }

  private getBaseUrl(geoHazard: GeoHazard) {
    return settings.services.warning[GeoHazard[geoHazard]].apiUrl;
  }

  async updateCapFeed(geoHazard: GeoHazard, from?: Date, to?: Date) {
    const fromMoment = from ? moment(from) : moment().startOf('day');
    const toMoment = to ? moment(to) : moment().endOf('day').add(2, 'days');
    const url = `${this.getBaseUrl(geoHazard)}/CAP/Feed/${fromMoment.format('YYYY-MM-DD')}/${toMoment.format('YYYY-MM-DD')}`;
    const result = await this.capApiService.getFeed(url).toPromise();
    const items = (result.rss.channel.item || []);
    const resultToSave: WarningCap[] = items.map((item) =>
      ({ geoHazard: geoHazard, timestamp: moment(item.pubDate).unix(), details: null, ...item }));
    console.log('[CAP items to save]', resultToSave);
    await nSQL().loadJS(NanoSql.TABLES.CAP_WARNING.name, resultToSave);
  }

  async updateCapDetails(geoHazard?: GeoHazard, from?: Date) {
    const fromDate = from ? moment(from) : moment().startOf('day');
    const itemsToUpdate = await this.getCapItemsWitoutDetails(fromDate.toDate(), geoHazard);
    for (const item of itemsToUpdate) {
      await this.updateCapDetail(item);
    }
  }

  async updateCapDetail(item: WarningCap) {
    const url = `${this.getBaseUrl(item.geoHazard)}/CAP/Id/${item.guid}`;
    const details = await this.capApiService.getItem(url).toPromise();
    const itemToUpdate = { ...item, details: details.alert };
    console.log('update CAP item: ', itemToUpdate);
    return nSQL(NanoSql.TABLES.CAP_WARNING.name).query('upsert', itemToUpdate).exec();
  }

  private getCapItemsWitoutDetails(fromDate?: Date, geoHazard?: GeoHazard): Promise<WarningCap[]> {
    const from = fromDate ? moment(fromDate) : moment().startOf('day');
    return nSQL(NanoSql.TABLES.CAP_WARNING.name).query('select')
      .where((cap: WarningCap) => geoHazard ? geoHazard === cap.geoHazard : true
        && cap.timestamp > from.unix()).exec() as Promise<WarningCap[]>;
  }

  getCapWarningsAsObservable(): Observable<WarningCap[]> {
    return nSQL().observable<WarningCap[]>(() => {
      return nSQL(NanoSql.TABLES.CAP_WARNING.name).query('select')
        .where((item: WarningCap) => !!item.details).emit();
    }).debounce(500).toRxJS();
  }

  getCapWarningsForCurrentLanguageAsObservable() {
    return this.userSettingService.getUserSettingsAsObservable()
      .pipe(combineLatest(this.getCapWarningsAsObservable()),
        map((res) => res[1].map((warning) => ({ warning, translatedItem: this.getTransaltedItem(warning, res[0]) }))
          .filter((item) => !!item.translatedItem)
        )
      );
  }

  private getTransaltedItem(warning: WarningCap, userSetting: UserSetting) {
    return (warning.details.info || []).find((item) => item.language.startsWith(userSetting.language));
    // NOTICE: We use no and en as language keys, but CAP items from NVE, english key is en-GB
    // That is why we use startsWith to get the first and best english translation.
  }

  // getAvalancheWarningRegionSummaryAsObservable(id?: number): Observer<RegionSummary[]> {
  //   return nSQL().observable<RegionSummary[]>(() => {
  //     return nSQL(NanoSql.TABLES.AVALANCHE_WARNING_SUMMARY.name).query('select')
  //       .where((summary: RegionSummary) => id ? id === summary.Id : true).emit();
  //   });
  // }

  // getLandslideWarningsAsObservable(id?: number): Observable<LandslideWarning[]> {
  //   return nSQL().observable<LandslideWarning[]>(() => {
  //     return nSQL(NanoSql.TABLES.AVALANCHE_WARNING_SUMMARY.name).query('select')
  //       .where((summary: RegionSummary) => id ? id === summary.Id : true).emit();
  //   }).toRxJS();
  // }

  // private async getAvalancheWarningRegionSummarySimpleApi(langKey?: LangKey, from?: Date, to?: Date) {
  //   const defaultParams = await this.getDefaultParams(langKey, from, to);
  //   return this.httpClient.get<Array<RegionSummary>>(
  //     `${settings.services.warning.Snow.apiUrl}/`
  //     + `RegionSummary/Simple/${defaultParams.langKey}/${defaultParams.from}/${defaultParams.to}`).toPromise();
  // }

  // private async getLandslideWarningsApi(langKey?: LangKey, from?: Date, to?: Date) {
  //   const defaultParams = await this.getDefaultParams(langKey, from, to);
  //   return this.httpClient.get<Array<LandslideWarning>>(
  //     `${settings.services.warning.Dirt.apiUrl}/`
  //     + `Warning/${defaultParams.langKey}/${defaultParams.from}/${defaultParams.to}`).toPromise();
  // }

  // private async getDefaultParams(langKey?: LangKey, from?: Date, to?: Date) {
  //   const userSettings = await this.userSettingService.getUserSettings();
  //   const userLangKey = LangKey[userSettings.language];
  //   const fromDate = from ? moment(from) : moment();
  //   const toDate = to ? moment(to) : moment().add(settings.services.warning.defaultWarningDaysAhead, 'days');
  //   const dateFormat = 'YYYY-MM-DD';
  //   return { langKey: langKey ? langKey : userLangKey, from: fromDate.format(dateFormat), to: toDate.format(dateFormat) };
  // }

  async reset() {
    return nSQL(NanoSql.TABLES.CAP_WARNING.name).query('drop').exec();
  }
}
