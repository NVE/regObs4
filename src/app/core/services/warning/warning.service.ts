import { Injectable } from '@angular/core';
import { settings } from '../../../../settings';
import { UserSettingService } from '../user-setting/user-setting.service';
import moment, { lang } from 'moment';
import 'moment-timezone';
import { LangKey, GeoHazard } from 'src/app/modules/common-core/models';
import { HttpClient } from '@angular/common/http';
import { NanoSql } from '../../../../nanosql';
import {
  map,
  tap,
  switchMap,
  shareReplay,
  distinctUntilChanged,
  take
} from 'rxjs/operators';
import { IWarning } from './warning.interface';
import { WarningGroup } from './warning-group.model';
import { IWarningApiResult } from './warning-api-result.interface';
import { IAvalancheWarningApiResult } from './avalanche-warning-api-result.interface';
import { combineLatest, Observable, BehaviorSubject, of } from 'rxjs';
import { IWarningGroupInMapView } from './warninggroup-in-mapview.interface';
import { DataLoadService } from '../../../modules/data-load/services/data-load.service';
import { IWarningGroup } from './warning-group.interface';
import { IIceWarningApiResult } from './ice-warning-api-result.interface';
import { Platform } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { MapService } from '../../../modules/map/services/map/map.service';
import { IMapViewAndArea } from '../../../modules/map/services/map/map-view-and-area.interface';
import { toPromiseWithCancel } from '../../helpers/observable-helper';
import { IAvalancheWarningSimple } from './avalanche-warning-simple.interface';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';
import { DbHelperService } from '../db-helper/db-helper.service';
import { nSQL } from '@nano-sql/core';
import { LogLevel } from '../../../modules/shared/services/logging/log-level.model';
import { UserSetting } from '../../models/user-settings.model';
import { NSqlFullUpdateObservable } from '../../helpers/nano-sql/NSqlFullUpdateObservable';

const DEBUG_TAG = 'WarningService';

@Injectable({
  providedIn: 'root'
})
export class WarningService {
  private _warningsObservable: Observable<WarningGroup[]>;
  private _warningsForCurrentGeoHazardObservable: Observable<WarningGroup[]>;
  private _warningGroupInMapViewObservable: Observable<IWarningGroupInMapView>;
  private latestWarnings: BehaviorSubject<{ [key: string]: IWarningGroup[] }>;

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
    private dbHelperService: DbHelperService
  ) {
    this.latestWarnings = new BehaviorSubject({});
    this._warningsObservable = this.getWarningsForCurrentLanguageAsObservable();
    this._warningsForCurrentGeoHazardObservable = this.getWarningsForCurrentLanguageAndCurrentGeoHazard();
    this._warningGroupInMapViewObservable = this.getWarningsForCurrentMapViewAsObservable();
  }

  private getDataLoadId(geoHazard: GeoHazard, language: LangKey) {
    return `${NanoSql.TABLES.WARNING.name}_${this.getLatestWarningKey(
      geoHazard,
      language
    )}`;
  }

  private getLatestWarningKey(geoHazard: GeoHazard, langKey: LangKey) {
    return `${geoHazard}_${this.getSupportedLanguage(langKey)}`;
  }

  private updateLatestWarnings(
    geoHazard: GeoHazard,
    langKey: LangKey,
    result: IWarningGroup[]
  ) {
    const currentValue = this.latestWarnings.getValue();
    currentValue[this.getLatestWarningKey(geoHazard, langKey)] = result;
    this.latestWarnings.next(currentValue);
  }

  async updateWarnings(cancel?: Promise<void>) {
    let cancelled = false;
    if (cancel) {
      cancel.then(() => {
        cancelled = true;
      });
    }
    this.loggingService.debug('Updating warnings by priority', DEBUG_TAG);
    const userSettings = await this.userSettingService.userSetting$
      .pipe(take(1))
      .toPromise();
    const geoHazards = await this.getGeoHazardsToUpdate(userSettings);
    for (const geoHazard of geoHazards) {
      if (!cancelled) {
        await this.checkLastUpdatedAndUpdateDataIfNeeded(
          geoHazard,
          this.getSupportedLanguage(userSettings.language),
          cancel
        );
      }
    }
    this.loggingService.debug('Updating warnings completed', DEBUG_TAG);
  }

  async updateWarningsForCurrentGeoHazard(cancel?: Promise<void>) {
    let cancelled = false;
    if (cancel) {
      cancel.then(() => {
        cancelled = true;
      });
    }
    const userSettings = await this.userSettingService.userSetting$
      .pipe(take(1))
      .toPromise();
    const geoHazards = await this.getGeoHazardsToUpdate(userSettings);
    for (const geoHazard of geoHazards) {
      if (!cancelled) {
        await this.updateWarningsForGeoHazard(
          geoHazard,
          this.getSupportedLanguage(userSettings.language),
          cancel
        );
      }
    }
  }

  private async getGeoHazardsToUpdate(userSetting: UserSetting) {
    const favourites = await this.getFavouritesAsObservable()
      .pipe(take(1))
      .toPromise();
    const currentGeoHazards = userSetting.currentGeoHazard;
    const favouriteGeoHazards = favourites.reduce(
      (acc: GeoHazard[], current: { groupId: string; geoHazard: GeoHazard }) =>
        acc.indexOf(current.geoHazard) >= 0 ? acc : [...acc, current.geoHazard],
      []
    );
    return Array.from(new Set([...currentGeoHazards, ...favouriteGeoHazards]));
  }

  private async checkLastUpdatedAndUpdateDataIfNeeded(
    geoHazard: GeoHazard,
    langKey: LangKey,
    cancel?: Promise<void>
  ) {
    const dataLoad = await this.dataLoadService.getState(
      this.getDataLoadId(geoHazard, langKey)
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
        'Warnings is allready being updated.',
        DEBUG_TAG
      );
    } else {
      const lastUpdateLimit = moment().subtract(1, 'hour');
      if (
        !dataLoad.lastUpdated ||
        moment(dataLoad.lastUpdated).isBefore(lastUpdateLimit)
      ) {
        await this.updateWarningsForGeoHazard(geoHazard, langKey, cancel);
      } else {
        this.loggingService.debug(
          `No need to update ${geoHazard}. Last updated is: ${dataLoad.lastUpdated}`,
          DEBUG_TAG
        );
      }
    }
  }

  updateWarningsForGeoHazard(
    geoHazard: GeoHazard,
    langKey: LangKey,
    cancel?: Promise<void>
  ) {
    if (geoHazard === GeoHazard.Snow) {
      return this.updateAvalancheWarnings(langKey, null, null, cancel);
    } else if (geoHazard === GeoHazard.Ice) {
      return this.updateIceWarnings(langKey);
    } else {
      return this.updateFloodAndLandslideWarnings(
        geoHazard,
        langKey,
        null,
        null,
        cancel
      );
    }
  }

  addToFavourite(groupId: string, geoHazard: GeoHazard) {
    const id = `${geoHazard}_${groupId}`;
    return nSQL(NanoSql.TABLES.WARNING_FAVOURITE.name)
      .query('upsert', { id, groupId, geoHazard })
      .exec();
  }

  removeFromFavourite(groupId: string, geoHazard: GeoHazard) {
    const id = `${geoHazard}_${groupId}`;
    return nSQL(NanoSql.TABLES.WARNING_FAVOURITE.name)
      .query('delete')
      .where((g) => g.id === id)
      .exec();
  }

  getIsFavouriteObservable(
    groupId: string,
    geoHazard: GeoHazard
  ): Observable<boolean> {
    const id = `${geoHazard}_${groupId}`;
    return new NSqlFullUpdateObservable<
      { id: string; groupId: string; geoHazard: GeoHazard }[]
    >(
      nSQL(NanoSql.TABLES.WARNING_FAVOURITE.name)
        .query('select')
        .where(['id', '=', id])
        .listen()
    ).pipe(
      map((val) => (val.length > 0 ? true : false)),
      distinctUntilChanged()
    );
  }

  private getOfflineWarningsAsObservable(geoHazard: GeoHazard) {
    return new NSqlFullUpdateObservable<IWarningGroup[]>(
      nSQL(NanoSql.TABLES.WARNING.name).query('select').listen({
        debounce: 200
      })
    ).pipe(
      map((warningGroups) =>
        warningGroups.filter((wg) => wg.geoHazard === geoHazard)
      ),
      map((warningGroups) =>
        warningGroups.length === 0
          ? this.getDefaultWarningGroups(geoHazard)
          : warningGroups
      )
    );
  }

  private getWarningsAsObservable(): Observable<IWarningGroup[]> {
    return combineLatest([
      this.userSettingService.appModeLanguageAndCurrentGeoHazard$,
      this.latestWarnings.asObservable()
    ]).pipe(
      switchMap(([[_, langKey, __], latestWarnings]) =>
        combineLatest(
          [
            GeoHazard.Snow,
            GeoHazard.Ice,
            GeoHazard.Water,
            GeoHazard.Soil
          ].map((geoHazard) =>
            this.getLatestWarningsOrFallbackToOffline(
              latestWarnings,
              geoHazard,
              langKey
            )
          )
        ).pipe(map((result) => [].concat(...result)))
      ),
      tap((result) =>
        this.loggingService.debug(
          'Warnings observable changed',
          DEBUG_TAG,
          result
        )
      )
    );
  }

  private getLatestWarningsOrFallbackToOffline(
    latestWarnings: { [key: string]: IWarningGroup[] },
    geoHazard: GeoHazard,
    langKey: LangKey
  ) {
    if (
      latestWarnings[this.getLatestWarningKey(geoHazard, langKey)] !== undefined
    ) {
      return of(latestWarnings[this.getLatestWarningKey(geoHazard, langKey)]);
    }
    return this.getOfflineWarningsAsObservable(geoHazard);
  }

  private getDefaultWarningGroups(geoHazard: GeoHazard) {
    switch (geoHazard) {
    case GeoHazard.Snow:
      return this.getDefaultAvalancheWarningGroups();
    case GeoHazard.Ice:
      return this.getDefaultIceWarningGroups();
    default:
      return this.getCountyWarningGroups(geoHazard);
    }
  }

  private getDefaultIceWarningGroups() {
    const iceRegionsDefaultJson = this.getDefaultIceForecastRegions();
    const geoHazard = GeoHazard.Ice;
    const regionGroups: IWarningGroup[] = iceRegionsDefaultJson.forecastRegions.map(
      (region, index) => ({
        id: `${region.name}_${geoHazard}`,
        regionId: region.name,
        regionName: region.name,
        counties: region.counties,
        url: region.url,
        validFrom: null,
        validTo: null,
        geoHazard,
        warnings: [],
        sortOrder: index
      })
    );
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
      warnings: [],
      sortOrder: this.convertCoutyToSortOrder(region.Id)
    }));
    return regionGroups;
  }

  private convertCoutyToSortOrder(countyId: string) {
    const countyNr = parseInt(countyId, 10);
    // Move Trøndelag to sort order 16 (Previous Sør-Trøndelag)
    const regionFixedCountyNr = countyNr === 50 ? 16 : countyNr;
    // Sort should be from north to south, so we have to reverse numbers
    return regionFixedCountyNr * -1 + 22; // 22 is the max region nr (Jan Mayen)
  }

  private getDefaultAvalancheWarningGroups() {
    const regions = require('../../../../assets/json/varslingsomraader.json');
    const avalancheRegions: IWarningGroup[] = regions.features.map(
      (region) => ({
        id: `${region.properties.omradeID}_${GeoHazard.Snow}`,
        regionId: `${region.properties.omradeID}`,
        regionName: region.properties.omradeNavn,
        regionType: region.properties.regionType,
        counties: [],
        geoHazard: GeoHazard.Snow,
        warnings: [],
        sortOrder: region.properties.sortID
      })
    );
    return avalancheRegions;
  }

  private getFavouritesAsObservable() {
    return new NSqlFullUpdateObservable<
      { groupId: string; geoHazard: GeoHazard }[]
    >(nSQL(NanoSql.TABLES.WARNING_FAVOURITE.name).query('select').listen());
  }

  getWarningGroupFavouritesObservable(): Observable<WarningGroup[]> {
    return combineLatest([
      this.getWarningsAsObservable(),
      this.getFavouritesAsObservable()
    ]).pipe(
      map(([regions, favourites]) =>
        this.mapAndSort(
          regions.filter(
            (region) =>
              !!favourites.find(
                (x) =>
                  x.groupId === region.regionId &&
                  x.geoHazard === region.geoHazard
              )
          )
        )
      )
    );
  }

  private mapAndSort(waringGroup: IWarningGroup[]): WarningGroup[] {
    return waringGroup
      .map((group) => new WarningGroup(group))
      .sort((a, b) => {
        if (a.sortOrder === b.sortOrder) {
          return a.key.geoHazard - b.key.geoHazard;
        } else {
          return a.sortOrder - b.sortOrder;
        }
      });
  }

  private getWarningsForCurrentLanguageAsObservable() {
    return this.getWarningsAsObservable().pipe(
      map((warningGroups) => this.mapAndSort(warningGroups)),
      shareReplay(1)
    );
  }

  private getWarningsForCurrentLanguageAndCurrentGeoHazard() {
    return combineLatest([
      this.getWarningsForCurrentLanguageAsObservable(),
      this.userSettingService.currentGeoHazard$
    ]).pipe(
      map(([warningGroups, currentGeoHazard]) => {
        return warningGroups.filter((wg) =>
          currentGeoHazard.find((g) => g === wg.key.geoHazard)
        );
      }),
      shareReplay(1)
    );
  }

  private getWarningsForCurrentMapViewAsObservable() {
    return combineLatest([
      this.mapService.mapViewAndAreaObservable$,
      this.getWarningsAsObservable()
    ]).pipe(
      switchMap(([mapViewArea, _]) =>
        this.getWarningsForCurrentMapView(mapViewArea)
      ),
      map((result) => result),
      tap((val) => {
        this.loggingService.debug(
          'getWarningsForCurrentMapViewAsObservable changed',
          DEBUG_TAG,
          val
        );
      }),
      shareReplay(1)
    );
  }

  private groupIsInRegion(warningGroup: WarningGroup, regionId: string) {
    const arr = [warningGroup.key.groupId, ...warningGroup.counties];
    return arr.indexOf(regionId) >= 0;
  }

  private isGroupInMapCenter(
    mapViewArea: IMapViewAndArea,
    warningGroup: WarningGroup
  ) {
    return this.groupIsInRegion(warningGroup, mapViewArea.regionInCenter);
  }

  private isGroupInViewBounds(
    mapViewArea: IMapViewAndArea,
    warningGroup: WarningGroup
  ) {
    return (
      mapViewArea.regionsInViewBounds.filter((region) =>
        this.groupIsInRegion(warningGroup, region)
      ).length > 0
    );
  }

  private isGroupInViewBuffer(
    mapViewArea: IMapViewAndArea,
    warningGroup: WarningGroup
  ) {
    return (
      mapViewArea.regionsInViewBuffer.filter((region) =>
        this.groupIsInRegion(warningGroup, region)
      ).length > 0
    );
  }

  private getWarningsForCurrentMapView(
    mapViewArea: IMapViewAndArea
  ): Observable<IWarningGroupInMapView> {
    return this.warningsForCurrentGeoHazardObservable$.pipe(
      map((warnings) => {
        const center = warnings.filter((warningGroup) =>
          this.isGroupInMapCenter(mapViewArea, warningGroup)
        );
        const viewBounds = warnings.filter(
          (warningGroup) =>
            this.isGroupInViewBounds(mapViewArea, warningGroup) &&
            !this.isGroupInMapCenter(mapViewArea, warningGroup)
        );
        const buffer = warnings.filter(
          (warningGroup) =>
            this.isGroupInViewBuffer(mapViewArea, warningGroup) &&
            !this.isGroupInViewBounds(mapViewArea, warningGroup) &&
            !this.isGroupInMapCenter(mapViewArea, warningGroup)
        );
        return {
          center,
          viewBounds,
          buffer
        };
      })
    );
  }

  private async updateFloodAndLandslideWarnings(
    geoHazard: GeoHazard,
    language: LangKey,
    fromDate?: Date,
    toDate?: Date,
    cancelPromise?: Promise<void>
  ) {
    this.loggingService.debug(
      `Updating ${GeoHazard[geoHazard]} warnings`,
      DEBUG_TAG
    );
    const dateRange = this.getDefaultDateRange(fromDate, toDate);
    const dataLoadId = this.getDataLoadId(geoHazard, language);
    await this.dataLoadService.startLoading(dataLoadId);
    const url =
      `${this.getBaseUrl(geoHazard)}` +
      `/Warning/All/${language}` +
      `/${dateRange.from.format(settings.services.warning.dateFormat)}` +
      `/${dateRange.to.format(settings.services.warning.dateFormat)}`;
    try {
      const warningsresult = await toPromiseWithCancel(
        this.httpClient.get<IWarningApiResult[]>(url),
        cancelPromise,
        30000
      );
      const regions = this.aggregateWarningRegions(
        warningsresult,
        geoHazard,
        language,
        moment()
      );
      this.updateLatestWarnings(geoHazard, language, regions);
      await this.dataLoadService.loadingCompleted(
        dataLoadId,
        regions.length,
        dateRange.from.toDate(),
        new Date()
      );
      this.saveWarningResultsToDb(geoHazard, regions);
    } catch (err) {
      await this.dataLoadService.loadingError(dataLoadId, err.message);
    }
  }

  shouldReplaceWarning(existing: IWarning, newWarning: IWarning) {
    if (moment(newWarning.publishTime).isAfter(moment(existing.publishTime))) {
      return true;
    }
    if (
      moment(newWarning.publishTime).isSame(moment(existing.publishTime)) &&
      newWarning.warningLevel > existing.warningLevel
    ) {
      return true;
    }
    return false;
  }

  getWarningByRegions(warningsresult: IWarningApiResult[]) {
    const regionMap = new Map<string, IWarningApiResult[]>();
    for (const item of warningsresult) {
      const regionId = item.CountyList[0].Id;
      const collection = regionMap.get(regionId);
      if (!collection) {
        regionMap.set(regionId, [item]);
      } else {
        collection.push(item);
      }
    }
    return regionMap;
  }

  getWarningByDay(
    warningsresult: { subRegionId: string; warning: IWarning }[]
  ) {
    const dayWarningMap = new Map<
      string,
      { subRegionId: string; warning: IWarning }[]
    >();
    for (const item of warningsresult) {
      const key = moment(item.warning.validTo).startOf('day').toISOString();
      const collection = dayWarningMap.get(key);
      if (!collection) {
        dayWarningMap.set(key, [item]);
      } else {
        collection.push(item);
      }
    }
    return dayWarningMap;
  }

  getMostRelevantWarningForSubRegion(
    warningsresult: { subRegionId: string; warning: IWarning }[]
  ) {
    const subRegionMap = new Map<string, IWarning>();
    for (const item of warningsresult) {
      const warning = subRegionMap.get(item.subRegionId);
      if (!warning || this.shouldReplaceWarning(warning, item.warning)) {
        subRegionMap.set(item.subRegionId, item.warning);
      }
    }
    return subRegionMap;
  }

  filterWarningsForGroup(
    warningsresult: { subRegionId: string; warning: IWarning }[]
  ) {
    return Array.from(this.getWarningByDay(warningsresult)).map(([_, value]) =>
      this.getMostRelevantDayWarning(value)
    );
  }

  getMostRelevantDayWarning(
    warningsresult: { subRegionId: string; warning: IWarning }[]
  ): IWarning {
    const warningsForSubRegions = this.getMostRelevantWarningForSubRegion(
      warningsresult
    );
    const warningsForSubRegionsArray = Array.from(warningsForSubRegions).map(
      ([_, value]) => value
    );
    const max = Math.max(
      ...warningsForSubRegionsArray.map((v) => v.warningLevel)
    );
    return warningsForSubRegionsArray.find((w) => w.warningLevel === max);
  }

  aggregateWarningRegions(
    warningsresult: IWarningApiResult[],
    geoHazard: GeoHazard,
    language: LangKey,
    now: moment.Moment
  ) {
    const regionGroups = this.getWarningByRegions(warningsresult);
    return Array.from(regionGroups).map(([key, value]) => ({
      id: `${key}_${geoHazard}`,
      regionId: key,
      regionName: value[0].CountyList[0].Name,
      counties: [key],
      geoHazard,
      warnings: this.filterWarningsForGroup(
        value.map((w) => ({
          subRegionId: w.MunicipalityCsvString,
          warning: {
            language,
            mainText: w.MainText,
            validFrom: this.getDate(w.ValidFrom),
            validTo: this.getDate(w.ValidTo),
            publishTime: this.getDate(w.PublishTime),
            warningLevel: parseInt(w.ActivityLevel, 10)
          }
        }))
      ),
      sortOrder: this.convertCoutyToSortOrder(key)
    }));
  }

  private async saveWarningResultsToDb(
    geoHazard: GeoHazard,
    regionResult: IWarningGroup[]
  ) {
    try {
      this.loggingService.debug(
        `Saving new ${GeoHazard[geoHazard]} warnings`,
        DEBUG_TAG,
        regionResult
      );
      const now = new Date();
      await this.dbHelperService.fastInsert(
        NanoSql.TABLES.WARNING.name,
        regionResult,
        (data) => data.id
      );
      this.loggingService.debug(
        `fastInsert took ${new Date().getTime() - now.getTime()} ms`,
        DEBUG_TAG
      );
      await this.deleteRegionsNoLongerInResult(geoHazard, regionResult); // NOTE: This also trigger change
    } catch (err) {
      this.loggingService.log(
        'Could not save new warnings to db',
        err,
        LogLevel.Warning,
        DEBUG_TAG
      );
    }
  }

  private getSupportedLanguage(language: LangKey): LangKey {
    return language === LangKey.nb ? LangKey.nb : LangKey.en;
  }

  private async updateAvalancheWarnings(
    language: LangKey,
    fromDate?: Date,
    toDate?: Date,
    cancelPromise?: Promise<void>
  ) {
    this.loggingService.debug('Updating avalanche warnings', DEBUG_TAG);
    let cancelled = false;
    if (cancelPromise) {
      cancelPromise.then(() => {
        cancelled = true;
      });
    }
    const supportedLang = lang;
    const dateRange = this.getDefaultDateRange(fromDate, toDate);
    const dataLoadId = this.getDataLoadId(GeoHazard.Snow, language);
    await this.dataLoadService.startLoading(dataLoadId);
    const url =
      `${this.getBaseUrl(GeoHazard.Snow)}` +
      `/RegionSummary/Detail/${language}` +
      `/${dateRange.from.format(settings.services.warning.dateFormat)}` +
      `/${dateRange.to.format(settings.services.warning.dateFormat)}`;
    try {
      const warningsresult = await toPromiseWithCancel(
        this.httpClient.get<IAvalancheWarningApiResult[]>(url),
        cancelPromise,
        30000
      );
      if (!cancelled) {
        const regionResult: IWarningGroup[] = warningsresult.map(
          (region, index) => ({
            id: `${region.Id}_${GeoHazard.Snow}`,
            regionId: region.Id.toString(),
            regionName: region.Name,
            regionType: region.TypeName,
            geoHazard: GeoHazard.Snow,
            counties: [],
            warnings: region.AvalancheWarningList.map((simpleWarning) =>
              this.convertSimpleWarningToAppWarning(language, simpleWarning)
            ),
            sortOrder: index
          })
        );
        this.updateLatestWarnings(GeoHazard.Snow, language, regionResult);
        await this.dataLoadService.loadingCompleted(
          dataLoadId,
          regionResult.length,
          dateRange.from.toDate(),
          new Date()
        );
        this.saveWarningResultsToDb(GeoHazard.Snow, regionResult);
      } else {
        await this.dataLoadService.loadingError(
          dataLoadId,
          'Operation cancelled'
        );
      }
    } catch (err) {
      await this.dataLoadService.loadingError(dataLoadId, err.message);
    }
  }

  private convertSimpleWarningToAppWarning(
    language: LangKey,
    simpleWarning: IAvalancheWarningSimple
  ): IWarning {
    return {
      warningLevel: parseInt(simpleWarning.DangerLevel, 10),
      publishTime: this.getDate(simpleWarning.PublishTime),
      validFrom: this.getDate(simpleWarning.ValidFrom),
      validTo: this.getDate(simpleWarning.ValidTo),
      mainText: simpleWarning.MainText,
      language,
      emergencyWarning:
        simpleWarning.EmergencyWarning !==
        (language === LangKey.en ? 'Not given' : 'Ikke gitt')
          ? simpleWarning.EmergencyWarning
          : null
    };
  }

  private async deleteRegionsNoLongerInResult(
    geoHazard: GeoHazard,
    regions: IWarningGroup[]
  ) {
    if (regions.length > 0) {
      const ids = regions.map((r) => r.id);
      const deleteResult = await nSQL(NanoSql.TABLES.WARNING.name)
        .query('delete')
        .where(
          (dbItem: IWarningGroup) =>
            dbItem.geoHazard === geoHazard && ids.indexOf(dbItem.id) < 0
        )
        .exec();
      this.loggingService.debug(
        'Deleted regions no longer in result:',
        DEBUG_TAG,
        deleteResult
      );
    }
  }

  private async updateIceWarnings(language: LangKey) {
    this.loggingService.debug('Updating ice warnings', DEBUG_TAG);
    const geoHazard = GeoHazard.Ice;
    const dataLoadId = this.getDataLoadId(geoHazard, language);
    await this.dataLoadService.startLoading(dataLoadId);
    try {
      const url = this.getBaseUrl(geoHazard);
      const result = await this.getIceWarningsFromApi(url);
      const regionResult: IWarningGroup[] = result.forecastRegions.map(
        (region, index) => ({
          id: `${region.name}_${geoHazard}`,
          regionId: region.name,
          regionName: region.name,
          counties: region.counties,
          url: region.url,
          validFrom: this.getDate(region.validFrom),
          validTo: this.getDate(region.validTo),
          geoHazard,
          warnings: [],
          sortOrder: index
        })
      );
      this.loggingService.debug(
        'New updates for ice warnings:',
        DEBUG_TAG,
        regionResult
      );

      this.updateLatestWarnings(geoHazard, language, regionResult);
      await this.dataLoadService.loadingCompleted(
        dataLoadId,
        regionResult.length,
        null,
        null
      );
      this.saveWarningResultsToDb(geoHazard, regionResult);
    } catch (err) {
      await this.dataLoadService.loadingError(dataLoadId, err.message);
    }
  }

  private getIceWarningsFromApi(url: string) {
    if (
      this.platform.is('hybrid') &&
      (this.platform.is('android') || this.platform.is('ios'))
    ) {
      return this.getIceWarningsFromApiNative(url);
    } else {
      return Promise.resolve(this.getDefaultIceForecastRegions());
    }
  }

  private async getIceWarningsFromApiNative(
    url: string
  ): Promise<IIceWarningApiResult> {
    this.nativeHttp.setDataSerializer('json');
    const result = await this.nativeHttp.get(
      url,
      {},
      {
        'Content-Type': 'application/json'
      }
    );
    if (result.status === 200) {
      return JSON.parse(result.data.trim());
    } else {
      throw Error(
        `Could not download warnings from: ${url}. Status: ${result.status}. Message: ${result.error}`
      );
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

  private getDefaultDateRange(fromDate?: Date, toDate?: Date) {
    const fromMoment = fromDate ? moment(fromDate) : moment().startOf('day');
    // const fromMoment = fromDate ? moment(fromDate) : moment().subtract(1, 'day');
    const toMoment = toDate
      ? moment(toDate)
      : moment()
        .endOf('day')
        .add(settings.services.warning.defaultWarningDaysAhead, 'days');
    return { from: fromMoment, to: toMoment };
  }
}
