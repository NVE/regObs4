import { Injectable } from '@angular/core';
import { settings } from '../../../../settings';
import { UserSettingService } from '../user-setting/user-setting.service';
import * as moment from 'moment';
import 'moment-timezone';
import { LangKey } from '../../models/langKey';
import { nSQL } from 'nano-sql';
import { HttpClient } from '@angular/common/http';
import { NanoSql } from '../../../../nanosql';
import { map, tap, switchMap, shareReplay, take } from 'rxjs/operators';
import { GeoHazard } from '../../models/geo-hazard.enum';
import { IWarning } from './warning.interface';
import { WarningGroup } from './warning-group.model';
import { IWarningApiResult } from './warning-api-result.interface';
import { IAvalancheWarningApiResult } from './avalanche-warning-api-result.interface';
import { combineLatest, Observable, of } from 'rxjs';
import { IWarningGroupInMapView } from './warninggroup-in-mapview.interface';
import { DataLoadService } from '../../../modules/data-load/services/data-load.service';
import { IWarningGroup } from './warning-group.interface';
import { UserSetting } from '../../models/user-settings.model';
import { IIceWarningApiResult } from './ice-warning-api-result.interface';
import { Platform } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { MapService } from '../../../modules/map/services/map/map.service';
import { IMapViewAndArea } from '../../../modules/map/services/map/map-view-and-area.interface';
import { ObservableHelper } from '../../helpers/observable-helper';
import { IAvalancheWarningSimple } from './avalanche-warning-simple.interface';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';

const DEBUG_TAG = 'WarningService';

@Injectable({
  providedIn: 'root'
})
export class WarningService {

  private _warningsObservable: Observable<WarningGroup[]>;
  private _warningsForCurrentGeoHazardObservable: Observable<WarningGroup[]>;
  private _warningGroupInMapViewObservable: Observable<IWarningGroupInMapView>;

  get warningsObservable$() {
    return this._warningsObservable;
  }

  get warningsForCurrentGeoHazardObservable$() {
    return this._warningsForCurrentGeoHazardObservable;
  }

  get warningGroupInMapViewObservable$() {
    return this._warningGroupInMapViewObservable;
  }

  constructor(
    private httpClient: HttpClient,
    private userSettingService: UserSettingService,
    private mapService: MapService,
    private dataLoadService: DataLoadService,
    private platform: Platform,
    private nativeHttp: HTTP,
    private loggingService: LoggingService,
  ) {
    this._warningsObservable = this.getWarningsForCurrentLanguageAsObservable();
    this._warningsForCurrentGeoHazardObservable = this.getWarningsForCurrentLanguageAndCurrentGeoHazard();
    this._warningGroupInMapViewObservable = this.getWarningsForCurrentMapViewAsObservable();
  }

  private getDataLoadId(geoHazard: GeoHazard) {
    return `${NanoSql.TABLES.WARNING.name}_${geoHazard}`;
  }

  async updateWarnings(cancel?: Promise<void>) {
    let cancelled = false;
    if (cancel) {
      cancel.then(() => {
        cancelled = true;
      });
    }
    this.loggingService.debug('Updating warnings by priority', DEBUG_TAG);
    const userSettings = await this.userSettingService.getUserSettings();
    for (const geoHazard of userSettings.currentGeoHazard) {
      if (!cancelled) {
        await this.checkLastUpdatedAndUpdateDataIfNeeded(geoHazard, cancel);
      }
    }
    this.loggingService.debug('Updating warnings completed', DEBUG_TAG);
  }

  async updateWarningsForCurrentGeoHazard() {
    const userSettings = await this.userSettingService.getUserSettings();
    for (const geoHazard of userSettings.currentGeoHazard) {
      await this.updateWarningsForGeoHazard(geoHazard);
    }
  }

  private async checkLastUpdatedAndUpdateDataIfNeeded(geoHazard: GeoHazard, cancel?: Promise<void>) {
    const dataLoad = await this.dataLoadService.getState(this.getDataLoadId(geoHazard));
    const lastUpdateLimit = moment().subtract(1, 'hour');
    if (!dataLoad.lastUpdated || moment(dataLoad.lastUpdated).isBefore(lastUpdateLimit)) {
      await this.updateWarningsForGeoHazard(geoHazard, cancel);
    } else {
      this.loggingService.debug(`No need to update ${geoHazard}. Last updated is: ${dataLoad.lastUpdated}`, DEBUG_TAG);
    }
  }

  updateWarningsForGeoHazard(geoHazard: GeoHazard, cancel?: Promise<void>) {
    if (geoHazard === GeoHazard.Snow) {
      return this.updateAvalancheWarnings(LangKey.no, null, null, cancel);
    } else if (geoHazard === GeoHazard.Ice) {
      return this.updateIceWarnings();
    } else {
      return this.updateFloodAndLandslideWarnings(geoHazard, LangKey.no, null, null, cancel);
    }
  }

  addToFavourite(groupId: string, geoHazard: GeoHazard) {
    const id = `${geoHazard}_${groupId}`;
    return nSQL(NanoSql.TABLES.WARNING_FAVOURITE.name)
      .query('upsert', { id, groupId, geoHazard }).exec();
  }

  removeFromFavourite(groupId: string, geoHazard: GeoHazard) {
    const id = `${geoHazard}_${groupId}`;
    return nSQL(NanoSql.TABLES.WARNING_FAVOURITE.name).query('delete')
      .where((g) => g.id === id).exec();
  }

  private getWarningsAsObservable() {
    return nSQL().observable<IWarningGroup[]>(() => {
      return nSQL(NanoSql.TABLES.WARNING.name).query('select').emit();
    }).map((warningGroups) => warningGroups.length === 0 ? this.getDefaultWarningGroups() : warningGroups)
      .toRxJS();
  }

  private getDefaultWarningGroups() {
    return [
      ...this.getDefaultAvalancheWarningGroups(),
      ...this.getDefaultIceWarningGroups(),
      ...this.getCountyWarningGroups(GeoHazard.Water),
      ...this.getCountyWarningGroups(GeoHazard.Dirt)
    ];
  }

  private getDefaultIceWarningGroups() {
    const iceRegionsDefaultJson = this.getDefaultIceForecastRegions();
    const geoHazard = GeoHazard.Ice;
    const regionGroups: IWarningGroup[] = iceRegionsDefaultJson.forecastRegions.map((region) => ({
      id: `${region.name}_${geoHazard}`,
      regionId: region.name,
      regionName: region.name,
      counties: region.counties,
      url: region.url,
      validFrom: null,
      validTo: null,
      geoHazard,
      warnings: []
    }));
    return regionGroups;
  }

  private getCountyWarningGroups(geoHazard: GeoHazard) {
    const regions = require('../../../../assets/json/regions.json');
    const regionGroups: IWarningGroup[] = regions.map((region) => ({
      id: `${region.Id}_${geoHazard}`,
      regionId: region.Id,
      regionName: region.Name,
      counties: [region.Id],
      geoHazard: geoHazard,
      warnings: []
    }));
    return regionGroups;
  }

  private getDefaultAvalancheWarningGroups() {
    const regions = require('../../../../assets/json/varslingsomraader.json');
    const avalancheRegions: IWarningGroup[] = regions.features.map((region) => ({
      id: `${region.properties.OMRAADEID}_${GeoHazard.Snow}`,
      regionId: `${region.properties.OMRAADEID}`,
      regionName: region.properties.OMRAADENAV,
      regionType: region.properties.regionType,
      counties: [],
      geoHazard: GeoHazard.Snow,
      warnings: []
    }));
    return avalancheRegions;
  }

  private getFavouritesAsObservable() {
    return nSQL().observable<{ groupId: string, geoHazard: GeoHazard }[]>(() => {
      return nSQL(NanoSql.TABLES.WARNING_FAVOURITE.name).query('select').emit();
    }).toRxJS();
  }

  private getWarningsForCurrentLanguageAsObservable() {
    return combineLatest(
      this.getWarningsAsObservable(),
      this.getFavouritesAsObservable()).pipe(map(([regions, favourites]) => {
        return regions.map((region) => {
          const isFavourite = !!favourites.find((x) => x.groupId === region.regionId && x.geoHazard === region.geoHazard);
          const warningGroup = new WarningGroup(region, isFavourite);
          return warningGroup;
        }).sort((a, b) => {
          if (a.key.groupName < b.key.groupName) {
            return -1;
          }
          if (a.key.groupName > b.key.groupName) {
            return 1;
          }
          // names must be equal, sort by geohazard
          return a.key.geoHazard - b.key.geoHazard;
        });
      }), shareReplay(1));
  }

  private getWarningsForCurrentLanguageAndCurrentGeoHazard() {
    return combineLatest(this.getWarningsForCurrentLanguageAsObservable(),
      this.userSettingService.userSettingObservable$)
      .pipe(map(([warningGroups, userSetting]) => {
        const geoHazards = userSetting.currentGeoHazard;
        return warningGroups.filter((wg) => geoHazards.find((g) => g === wg.key.geoHazard));
      }), shareReplay(1));
  }

  private getWarningsForCurrentMapViewAsObservable() {
    return combineLatest(this.mapService.mapViewAndAreaObservable$, this.userSettingService.userSettingObservable$)
      .pipe(switchMap(([mapViewArea, userSetting]) =>
        combineLatest(this.getWarningsForCurrentMapView(mapViewArea, userSetting))),
        map(([result]) => result),
        shareReplay(1), tap((val) => {
          this.loggingService.debug(`getWarningsForCurrentMapViewAsObservable changed`, DEBUG_TAG, val);
        }));
  }

  private groupIsInRegion(warningGroup: WarningGroup, regionId: string) {
    const arr = [warningGroup.key.groupId, ...warningGroup.counties];
    return arr.indexOf(regionId) >= 0;
  }

  private isGroupInMapCenter(mapViewArea: IMapViewAndArea, warningGroup: WarningGroup, userSetting: UserSetting) {
    if (!userSetting.showMapCenter) {
      return false;
    }
    return this.groupIsInRegion(warningGroup, mapViewArea.regionInCenter);
  }

  private isGroupInViewBounds(mapViewArea: IMapViewAndArea, warningGroup: WarningGroup) {
    return mapViewArea.regionsInViewBounds.filter((region) => this.groupIsInRegion(warningGroup, region)).length > 0;
  }

  private isGroupInViewBuffer(mapViewArea: IMapViewAndArea, warningGroup: WarningGroup) {
    return mapViewArea.regionsInViewBuffer.filter((region) => this.groupIsInRegion(warningGroup, region)).length > 0;
  }

  private getWarningsForCurrentMapView(mapViewArea: IMapViewAndArea, userSetting: UserSetting)
    : Observable<IWarningGroupInMapView> {
    return this.warningsForCurrentGeoHazardObservable$.pipe(
      map((warnings) => {
        const center = warnings
          .filter((warningGroup) => this.isGroupInMapCenter(mapViewArea, warningGroup, userSetting));
        const viewBounds = warnings.filter((warningGroup) =>
          this.isGroupInViewBounds(mapViewArea, warningGroup) && !this.isGroupInMapCenter(mapViewArea, warningGroup, userSetting));
        const buffer = warnings.filter((warningGroup) =>
          this.isGroupInViewBuffer(mapViewArea, warningGroup) && !this.isGroupInViewBounds(mapViewArea, warningGroup)
          && !this.isGroupInMapCenter(mapViewArea, warningGroup, userSetting));

        return {
          center,
          viewBounds,
          buffer,
        };
      })
    );
  }

  private async updateFloodAndLandslideWarnings(
    geoHazard: GeoHazard,
    language: LangKey,
    from?: Date,
    to?: Date,
    cancelPromise?: Promise<void>) {
    this.loggingService.debug(`Updating ${GeoHazard[geoHazard]} warnings`, DEBUG_TAG);
    const dateRange = this.getDefaultDateRange(from, to);
    const dataLoadId = this.getDataLoadId(geoHazard);
    await this.dataLoadService.startLoading(dataLoadId);
    const url = `${this.getBaseUrl(geoHazard)}`
      + `/Warning/All/${language}`
      + `/${dateRange.from.format('YYYY-MM-DD')}`
      + `/${dateRange.to.format('YYYY-MM-DD')}`;
    try {
      const warningsresult = await ObservableHelper.toPromiseWithCancel(
        this.httpClient.get<IWarningApiResult[]>(url), cancelPromise);
      const regions: IWarningGroup[] = [];
      for (const item of warningsresult) {
        const regionId = item.CountyList[0].Id;
        const regionName = item.CountyList[0].Name;
        const warning: IWarning = {
          language,
          mainText: item.MainText,
          validFrom: this.getDate(item.ValidFrom),
          validTo: this.getDate(item.ValidTo),
          publishTime: this.getDate(item.PublishTime),
          warningLevel: parseInt(item.ActivityLevel, 10),
        };

        const existingRegion = regions.find((r) => r.regionId === regionId);
        if (existingRegion) {
          const warningForSameDate = existingRegion.warnings
            .find((w) => moment(w.validTo).format('YYYY-MM-DD') === moment(warning.validTo).format('YYYY-MM-DD'));
          if (warningForSameDate) {
            warningForSameDate.warningLevel = Math.max(warning.warningLevel, warningForSameDate.warningLevel);
          } else {
            existingRegion.warnings.push(warning);
          }
        } else {
          regions.push({
            id: `${regionId}_${geoHazard}`,
            regionId,
            regionName,
            counties: [regionId],
            geoHazard,
            warnings: [warning],
          });
        }
      }
      this.loggingService.debug(`Saving new ${GeoHazard[geoHazard]} warnings`, DEBUG_TAG, regions);
      await nSQL().loadJS(NanoSql.TABLES.WARNING.name, regions, true);

      await this.deleteRegionsNoLongerInResult(geoHazard, regions); // NOTE: This also trigger change
      await this.dataLoadService.loadingCompleted(dataLoadId, warningsresult.length,
        dateRange.from.toDate(), new Date());
    } catch (err) {
      await this.dataLoadService.loadingError(dataLoadId, err.message);
    }
  }

  private async updateAvalancheWarnings(language: LangKey, from?: Date, to?: Date, cancelPromise?: Promise<void>) {
    this.loggingService.debug(`Updating avalanche warnings`, DEBUG_TAG);
    const dateRange = this.getDefaultDateRange(from, to);
    const dataLoadId = this.getDataLoadId(GeoHazard.Snow);
    await this.dataLoadService.startLoading(dataLoadId);
    const url = `${this.getBaseUrl(GeoHazard.Snow)}`
      + `/RegionSummary/Detail/${language}`
      + `/${dateRange.from.format('YYYY-MM-DD')}`
      + `/${dateRange.to.format('YYYY-MM-DD')}`;
    try {
      const warningsresult = await ObservableHelper.toPromiseWithCancel(
        this.httpClient.get<IAvalancheWarningApiResult[]>(url), cancelPromise);
      const regionResult: IWarningGroup[] = warningsresult.map((region) => ({
        id: `${region.Id}_${GeoHazard.Snow}`,
        regionId: region.Id.toString(),
        regionName: region.Name,
        regionType: region.TypeName,
        geoHazard: GeoHazard.Snow,
        counties: [],
        warnings: region.AvalancheWarningList.map((simpleWarning) => this.convertSimpleWarningToAppWarning(language, simpleWarning)),
      }));
      this.loggingService.debug(`New updates for avalanche warnings:`, DEBUG_TAG, regionResult);
      await nSQL().loadJS(NanoSql.TABLES.WARNING.name, regionResult, true);
      await this.deleteRegionsNoLongerInResult(GeoHazard.Snow, regionResult); // NOTE: This also trigger change
      await this.dataLoadService.loadingCompleted(dataLoadId, warningsresult.length, dateRange.from.toDate(), new Date());
    } catch (err) {
      await this.dataLoadService.loadingError(dataLoadId, err.message);
    }
  }

  private convertSimpleWarningToAppWarning(language: LangKey, simpleWarning: IAvalancheWarningSimple): IWarning {
    return {
      warningLevel: parseInt(simpleWarning.DangerLevel, 10),
      publishTime: this.getDate(simpleWarning.PublishTime),
      validFrom: this.getDate(simpleWarning.ValidFrom),
      validTo: this.getDate(simpleWarning.ValidTo),
      mainText: simpleWarning.MainText,
      language,
      emergencyWarning: simpleWarning.EmergencyWarning !== (language === LangKey.en ? 'Not given' : 'Ikke gitt') ?
        simpleWarning.EmergencyWarning : null,
    };
  }

  private async deleteRegionsNoLongerInResult(geoHazard: GeoHazard, regions: IWarningGroup[]) {
    if (regions.length > 0) {
      const ids = regions.map((r) => r.id);
      const deleteResult = await nSQL(NanoSql.TABLES.WARNING.name)
        .query('delete').where((dbItem: IWarningGroup) => dbItem.geoHazard === geoHazard && ids.indexOf(dbItem.id) < 0).exec();
      this.loggingService.debug(`Deleted regions no longer in result:`, DEBUG_TAG, deleteResult);
    }
  }

  private async updateIceWarnings() {
    this.loggingService.debug(`Updating ice warnings`, DEBUG_TAG);
    const geoHazard = GeoHazard.Ice;
    const dataLoadId = this.getDataLoadId(geoHazard);
    await this.dataLoadService.startLoading(dataLoadId);
    try {
      const url = this.getBaseUrl(geoHazard);
      const result = await this.getIceWarningsFromApi(url);
      const regionResult: IWarningGroup[] = result.forecastRegions.map((region) => ({
        id: `${region.name}_${geoHazard}`,
        regionId: region.name,
        regionName: region.name,
        counties: region.counties,
        url: region.url,
        validFrom: this.getDate(region.validFrom),
        validTo: this.getDate(region.validTo),
        geoHazard,
        warnings: []
      }));
      this.loggingService.debug(`New updates for ice warnings:`, DEBUG_TAG, regionResult);
      await nSQL().loadJS(NanoSql.TABLES.WARNING.name, regionResult, true);
      await this.deleteRegionsNoLongerInResult(geoHazard, regionResult); // NOTE: This also trigger change
      await this.dataLoadService.loadingCompleted(dataLoadId, regionResult.length);
    } catch (err) {
      await this.dataLoadService.loadingError(dataLoadId, err.message);
    }
  }

  private getIceWarningsFromApi(url: string) {
    if (this.platform.is('cordova') && (this.platform.is('android') || this.platform.is('ios'))) {
      return this.getIceWarningsFromApiNative(url);
    } else {
      return Promise.resolve(this.getDefaultIceForecastRegions());
    }
  }

  private async getIceWarningsFromApiNative(url: string): Promise<IIceWarningApiResult> {
    this.nativeHttp.setDataSerializer('json');
    const result = await this.nativeHttp.get(url, {}, {
      'Content-Type': 'application/json',
    });
    if (result.status === 200) {
      return JSON.parse(result.data.trim());
    } else {
      throw Error(`Could not download warnings from: ${url}. Status: ${result.status}. Message: ${result.error}`);
    }
  }

  private getDefaultIceForecastRegions(): IIceWarningApiResult {
    // NOTE: Mocking ice warnings for web because of missing CORS headers in api (just a static file)
    return require('../../../../assets/json/ice_forecast_regions.json');
  }


  private getDate(dateString: string) {
    return moment.tz(dateString, settings.services.warning.timezone).toDate();
  }

  private getBaseUrl(geoHazard: GeoHazard) {
    return settings.services.warning[GeoHazard[geoHazard]].apiUrl;
  }

  private getDefaultDateRange(from?: Date, to?: Date) {
    const fromMoment = from ? moment(from) : moment().subtract(1, 'day');
    const toMoment = to ? moment(to) : moment().endOf('day').add(settings.services.warning.defaultWarningDaysAhead, 'days');
    return { from: fromMoment, to: toMoment };
  }
}
