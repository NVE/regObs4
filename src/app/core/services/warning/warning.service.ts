import { Injectable } from '@angular/core';
import { settings } from '../../../../settings';
import { UserSettingService } from '../user-setting/user-setting.service';
import * as moment from 'moment';
import 'moment-timezone';
import { LangKey } from '../../models/langKey';
import { nSQL } from 'nano-sql';
import { HttpClient } from '@angular/common/http';
import { NanoSql } from '../../../../nanosql';
import { map, tap, switchMap, shareReplay } from 'rxjs/operators';
import { GeoHazard } from '../../models/geo-hazard.enum';
import { IWarning } from './warning.interface';
import { WarningGroup } from './warning-group.model';
import { IWarningApiResult } from './warning-api-result.interface';
import { IAvalancheWarningApiResult } from './avalanche-warning-api-result.interface';
import { combineLatest, Observable, of } from 'rxjs';
import { IWarningInMapView } from './warning-in-mapview.interface';
import { IMapViewAndArea } from '../map/map-view-and-area.interface';
import { MapService } from '../map/map.service';
import { IWarningGroupInMapView } from './warninggroup-in-mapview.interface';
import { DataLoadService } from '../../../modules/data-load/services/data-load.service';

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
    private mapService: MapService,
    private dataLoadService: DataLoadService,
  ) {
    this._warningsObservable = this.getWarningsForCurrentLanguageAsObservable();
    this._warningsForCurrentGeoHazardObservable = this.getWarningsForCurrentLanguageAndCurrentGeoHazard();
    this._warningGroupInMapViewObservable = this.getWarningsForCurrentMapViewAsObservable();
  }

  private getDataLoadId(geoHazard: GeoHazard) {
    return `${NanoSql.TABLES.WARNING.name}_${geoHazard}`;
  }

  async updateWarnings() {
    console.log('[INFO][WarningService] Updating warnings by priority');
    const userSettings = await this.userSettingService.getUserSettings();
    for (const geoHazard of this.getPriority(userSettings.currentGeoHazard)) {
      await this.checkLastUpdatedAndUpdateDataIfNeeded(geoHazard);
    }
    await this.cleanupOldItems();
  }

  private async checkLastUpdatedAndUpdateDataIfNeeded(geoHazard: GeoHazard) {
    const dataLoad = await this.dataLoadService.getState(this.getDataLoadId(geoHazard));
    const lastUpdateLimit = moment().subtract(1, 'hour');
    if (!dataLoad.lastUpdated || moment(dataLoad.lastUpdated).isBefore(lastUpdateLimit)) {
      await this.updateWarningsForGeoHazard(geoHazard);
    } else {
      console.log(`[INFO][WarningService] No need to update ${geoHazard}. Last updated is:`, dataLoad.lastUpdated);
    }
  }

  private updateWarningsForGeoHazard(geoHazard: GeoHazard) {
    if (geoHazard === GeoHazard.Snow) {
      return this.updateAvalancheWarnings(LangKey.no);
    } else {
      return this.updateFloodAndLandslideWarnings(geoHazard, LangKey.no);
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

  private getPriority(currentGeoHazard: GeoHazard) {
    if (currentGeoHazard === GeoHazard.Snow) {
      return [GeoHazard.Snow, GeoHazard.Water, GeoHazard.Dirt];
    } else if (currentGeoHazard === GeoHazard.Ice) {
      return [GeoHazard.Snow, GeoHazard.Water, GeoHazard.Dirt];
    } else if (currentGeoHazard === GeoHazard.Water) {
      return [GeoHazard.Water, GeoHazard.Dirt, GeoHazard.Snow];
    } else if (currentGeoHazard === GeoHazard.Dirt) {
      return [GeoHazard.Dirt, GeoHazard.Water, GeoHazard.Snow];
    }
  }

  private cleanupOldItems() {
    return nSQL(NanoSql.TABLES.WARNING.name).query('delete')
      .where((warning: IWarning) => moment().subtract(1, 'days').isAfter(warning.validTo)).exec();
  }

  private getWarningsAsObservable() {
    // return nSQL().observable<IWarning[]>(() => {
    //   return nSQL(NanoSql.TABLES.WARNING.name).query('select').emit();
    // }).debounce(1000).toRxJS();
    return of([]);
  }

  private getFavouritesAsObservable() {
    return nSQL().observable<{ groupId: string, geoHazard: GeoHazard }[]>(() => {
      return nSQL(NanoSql.TABLES.WARNING_FAVOURITE.name).query('select').emit();
    }).toRxJS();
  }

  private getWarningRegions(): { id: string, name: string, geoHazard: GeoHazard }[] {
    const snowRegions = require('../../../../assets/varslingsomraader.json').features
      .map((f) => ({ id: f.properties['OMRAADEID'].toString(), name: f.properties['OMRAADENAV'], geoHazard: GeoHazard.Snow }));
    const dirtAndWaterRegions = require('../../../../assets/regions.json')
      .map((r) => ({ id: r.Id, name: r.Name }));
    return [
      ...snowRegions,
      ...dirtAndWaterRegions.map((x) => ({ ...x, geoHazard: GeoHazard.Dirt })),
      ...dirtAndWaterRegions.map((x) => ({ ...x, geoHazard: GeoHazard.Water })),
    ];
  }

  private getWarningsForCurrentLanguageAsObservable() {
    return combineLatest(
      of(this.getWarningRegions()),
      this.getWarningsAsObservable(),
      this.getFavouritesAsObservable()).pipe(map(([regions, warnings, favourites]) => {
        return regions.map((region) => {
          const warningGroup = new WarningGroup(
            { geoHazard: region.geoHazard, groupId: region.id, groupName: region.name, language: 'no' },
            warnings.filter((w) => w.groupId === region.id && w.geoHazard === region.geoHazard));
          warningGroup.isFavourite = !!favourites.find((x) => x.groupId === region.id && x.geoHazard === region.geoHazard);
          return warningGroup;
        }).sort((a, b) => {
          if (a.group.groupName < b.group.groupName) {
            return -1;
          }
          if (a.group.groupName > b.group.groupName) {
            return 1;
          }
          // names must be equal, sort by geohazard
          return a.group.geoHazard - b.group.geoHazard;
        });
      }), shareReplay(1));
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
    const dataLoadId = this.getDataLoadId(geoHazard);
    await this.dataLoadService.startLoading(dataLoadId);
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

    await this.dataLoadService.loadingCompleted(dataLoadId, warningsToSave.length,
      dateRange.from.toDate(), new Date());
  }

  private async updateAvalancheWarnings(language: LangKey, from?: Date, to?: Date) {
    console.log(`[INFO][WarningService] Updating avalanche warnings`);
    const dateRange = this.getDefaultDateRange(from, to);
    const dataLoadId = this.getDataLoadId(GeoHazard.Snow);
    await this.dataLoadService.startLoading(dataLoadId);
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

    await this.dataLoadService.loadingCompleted(dataLoadId, warningsToSave.length,
      dateRange.from.toDate(), new Date());
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
}
