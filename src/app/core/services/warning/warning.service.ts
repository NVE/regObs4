import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { settings } from '../../../../settings';
import { UserSettingService } from '../user-setting/user-setting.service';
import * as moment from 'moment';
import 'moment-timezone';
import { LangKey } from '../../models/langKey';
import { nSQL } from 'nano-sql';
import { HttpClient } from '@angular/common/http';
import { NanoSql } from '../../../../nanosql';
import { map, share, tap, switchMap, distinctUntilChanged, shareReplay } from 'rxjs/operators';
import { GeoHazard } from '../../models/geo-hazard.enum';
import { IWarning } from './warning.interface';
import { WarningGroup } from './warning-group.model';
import { WarningGroupKey } from './warning-group-key.interface';
import { IWarningApiResult } from './warning-api-result.interface';
import { IAvalancheWarningApiResult } from './avalanche-warning-api-result.interface';
import { combineLatest, Observable, Observer } from 'rxjs';
import { IWarningInMapView } from './warning-in-mapview.interface';
import { IMapViewAndArea } from '../map/map-view-and-area.interface';
import { MapService } from '../map/map.service';
import { IWarningGroupInMapView } from './warninggroup-in-mapview.interface';
import { ITypedWorker, createWorker } from 'typed-web-workers';

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

  constructor(private httpClient: HttpClient,
    private userSettingService: UserSettingService,
    private mapService: MapService
  ) {
    this._warningsObservable = this.getWarningsForCurrentLanguageAsObservable();
    this._warningsForCurrentGeoHazardObservable = this.getWarningsForCurrentLanguageAndCurrentGeoHazard();
    this._warningGroupInMapViewObservable = this.getWarningsForCurrentMapViewAsObservable();
  }

  async updateWarnings() {
    console.log('[INFO] Updating warnings by priority');
    await this.updateFloodAndLandslideWarnings(GeoHazard.Dirt, LangKey.no);
    await this.updateFloodAndLandslideWarnings(GeoHazard.Water, LangKey.no);
    await this.updateAvalancheWarnings(LangKey.no);
    await this.cleanupOldItems();
    // await this.updateLandslideWarnings(LangKey.en); Not using any texts, so no need for english version yet
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

  private cleanupOldItems() {
    return nSQL(NanoSql.TABLES.WARNING.name).query('delete')
      .where((warning: IWarning) => moment().subtract(1, 'days').isAfter(warning.validTo)).exec();
  }

  private getWarningsAsObservable() {
    return nSQL().observable<IWarning[]>(() => {
      return nSQL(NanoSql.TABLES.WARNING.name).query('select').emit();
    }).debounce(500).toRxJS().pipe(switchMap((warnings) => this.getWarningGroupAsObservabe(warnings)));
  }

  private getFavouritesAsObservable() {
    return nSQL().observable<{ groupId: string, geoHazard: GeoHazard }[]>(() => {
      return nSQL(NanoSql.TABLES.WARNING_FAVOURITE.name).query('select').emit();
    }).toRxJS();
  }

  private getWarningsAndFavouritesAsObservable() {
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

  private groupWarnings(input: IWarning[], callback: (_: { group: WarningGroupKey, warnings: IWarning[] }[]) => void) {
    const getGroupKey = function (warning: IWarning): string {
      return JSON.stringify({
        language: warning.language,
        groupId: warning.groupId,
        groupName: warning.groupName,
        geoHazard: warning.geoHazard
      });
    };
    const groupMap = input.reduce((pv, cv) => {
      const key = getGroupKey(cv);
      const item = pv.get(key) || [];
      item.push(cv);
      return pv.set(key, item);
    }, new Map<string, IWarning[]>());
    const groupArray = Array.from(groupMap.keys()).map((k) => {
      const group: WarningGroupKey = JSON.parse(k);
      return { group, warnings: groupMap.get(k) };
    });
    callback(groupArray);
    (<any>self).close(); // cleanup
  }

  private getWarningGroupAsObservabe(warnings: IWarning[]): Observable<WarningGroup[]> {
    return Observable.create((observer: Observer<WarningGroup[]>) => {
      const typedWorker = createWorker(this.groupWarnings, (msg) => {
        observer.next(msg.map((m) => new WarningGroup(m.group, m.warnings)));
        observer.complete();
      });
      typedWorker.postMessage(warnings);
    });
  }

  private getWarningsForCurrentLanguageAsObservable() {
    return combineLatest(this.userSettingService.userSettingObservable$,
      this.getWarningsAndFavouritesAsObservable())
      .pipe(
        map(([userSetting, warningGroups]) => {
          return warningGroups.filter((w) => w.group.language === userSetting.language);
        }),
        shareReplay(1)
      );
  }

  private getGeoHazardFilter(currentGeoHazard: GeoHazard) {
    const geoHazards = [currentGeoHazard];
    if (currentGeoHazard === GeoHazard.Dirt) {
      geoHazards.push(GeoHazard.Water);
    } else if (currentGeoHazard === GeoHazard.Water) {
      geoHazards.push(GeoHazard.Dirt);
    }
    return geoHazards;
  }

  private getWarningsForCurrentLanguageAndCurrentGeoHazard() {
    return combineLatest(this.getWarningsForCurrentLanguageAsObservable(),
      this.userSettingService.userSettingObservable$)
      .pipe(map(([warningGroups, userSetting]) => {
        const geoHazards = this.getGeoHazardFilter(userSetting.currentGeoHazard);
        return warningGroups.filter((wg) => geoHazards.find((g) => g === wg.group.geoHazard));
      }),
        shareReplay(1));
  }

  private getWarningsForCurrentMapViewAsObservable() {
    return this.mapService.mapViewAndAreaObservable$
      .pipe(switchMap((mapViewArea: IMapViewAndArea) => this.getWarningsForCurrentMapView(mapViewArea)),
        shareReplay(1));
  }

  private getWarningsForCurrentMapView(mapViewArea: IMapViewAndArea): Observable<IWarningGroupInMapView> {
    return this.warningsForCurrentGeoHazardObservable$.pipe(
      map((warnings) => {
        // TODO: Create web worker for this processing task?
        const warningsInMapView: IWarningInMapView[] = warnings
          .map((warningGroup) => {
            const groupInMapView = {
              center: mapViewArea.regionInCenter === warningGroup.group.groupId,
              viewBounds: mapViewArea.regionsInViewBounds.indexOf(warningGroup.group.groupId) >= 0,
            };
            return { inMapView: groupInMapView, warningGroup };
          }).filter((warningGroupInView) => warningGroupInView.inMapView.center || warningGroupInView.inMapView.viewBounds);
        return {
          center: warningsInMapView.filter((item) => item.inMapView.center).map((item) => item.warningGroup),
          viewBounds: warningsInMapView.filter((item) =>
            item.inMapView.viewBounds && !item.inMapView.center
          ).map((item) => item.warningGroup)
        };
      }),
      tap((val) => {
        console.log('[WarningForCurrentMapViewObservabe] changed: ', val);
      })
    );
  }

  getWarningsById(...guids: string[]) {
    return nSQL(NanoSql.TABLES.WARNING.name).query('select')
      .where((x) => guids.indexOf(x.id) >= 0).exec() as Promise<IWarning[]>;
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
