import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { settings } from '../../../../../settings';
import { MapSearchResponse } from './map-search-response.model';
import * as L from 'leaflet';
import { map, switchMap, catchError, take } from 'rxjs/operators';
import { Observable, combineLatest, forkJoin, of, Subject } from 'rxjs';
import { ViewInfo } from './view-info.model';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { LangKey } from '../../../../core/models/langKey';
import { GeoCodeService } from '../../../regobs-api/services';
import { NanoSql } from '../../../../../nanosql';
import { MapSearchHistory } from './map-search-history.model';
import moment from 'moment';
import { IMapView } from '../map/map-view.interface';
import {
  NorwegianSearchResultModel,
  NorwegianSearchResultModelStednavn
} from './norwegian-search-result.model';
import { WorldSearchResultModel } from './world-search-result.model';
import { nSQL } from '@nano-sql/core';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';
import { NSqlFullUpdateObservable } from '../../../../core/helpers/nano-sql/NSqlFullUpdateObservable';

@Injectable({
  providedIn: 'root'
})
export class MapSearchService {
  private _mapSearchItemClickSubject: Subject<MapSearchResponse | L.LatLng>;
  private _mapSearchItemClickObservable: Observable<
    MapSearchResponse | L.LatLng
  >;

  get mapSearchClick$() {
    return this._mapSearchItemClickObservable;
  }

  set mapSearchItemSelected(item: MapSearchResponse | L.LatLng) {
    this._mapSearchItemClickSubject.next(item);
  }

  constructor(
    private httpClient: HttpClient,
    private userSettingService: UserSettingService,
    private geoCodeService: GeoCodeService
  ) {
    this._mapSearchItemClickSubject = new Subject<
      MapSearchResponse | L.LatLng
    >();
    this._mapSearchItemClickObservable = this._mapSearchItemClickSubject.asObservable();
    this._mapSearchItemClickObservable.subscribe((item) => {
      if (!(item instanceof L.LatLng)) {
        this.saveSearchHistoryToDb(item as MapSearchResponse);
      }
    });
  }

  searchAll(text: string): Observable<MapSearchResponse[]> {
    return this.userSettingService.language$.pipe(
      switchMap((language) =>
        forkJoin([
          this.searchNorwegianPlaces(text, language),
          this.searchWorld(text, language)
        ]).pipe(map(([s1, s2]) => [...s1, ...s2]))
      )
    );
  }

  searchNorwegianPlaces(
    text: string,
    lang: LangKey
  ): Observable<MapSearchResponse[]> {
    return this.httpClient
      .get(
        `${settings.map.search.no.url}?navn=${text.trim()}*&antPerSide=${
          settings.map.search.no.maxResults
        }` + `&eksakteForst=${settings.map.search.no.exactFirst}&epsgKode=3395`
      )
      .pipe(
        map((data: NorwegianSearchResultModel) => {
          const hits = parseInt(data.totaltAntallTreff, 10);
          const resultList =
            hits === 0
              ? []
              : hits === 1
              ? [data.stedsnavn as NorwegianSearchResultModelStednavn]
              : (data.stedsnavn as Array<NorwegianSearchResultModelStednavn>);
          return this.removeDuplicates(resultList).map((item) => {
            const resp: MapSearchResponse = {
              name: item.stedsnavn,
              description:
                (lang === LangKey.nb ? item.navnetype + ', ' : '') +
                item.kommunenavn +
                ' (' +
                item.fylkesnavn +
                ')',
              type: item.navnetype,
              latlng: L.Projection.Mercator.unproject(
                L.point({ x: item.aust, y: item.nord })
              )
            };
            return resp;
          });
        }),
        catchError(() => of([]))
      );
  }

  removeDuplicates(data: NorwegianSearchResultModelStednavn[]) {
    return (data || []).reduce((acc, currentValue) => {
      if (
        acc.filter((item) => item.ssrId === currentValue.ssrId).length === 0
      ) {
        acc.push(currentValue);
      }
      return acc;
    }, []);
  }

  searchWorld(text: string, lang: LangKey): Observable<MapSearchResponse[]> {
    return this.httpClient
      .get(
        `${settings.map.search.geonames.url}/searchJSON?` +
          `name_startsWith=${text}&maxRows=${settings.map.search.geonames.maxResults}` +
          `&lang=${LangKey[lang]}` +
          `&username=${settings.map.search.geonames.username}`
      )
      .pipe(
        map((data: WorldSearchResultModel) => {
          const geoData = data.geonames || [];
          return geoData
            .filter((item) => item.countryCode !== 'NO')
            .map((item) => {
              const resp: MapSearchResponse = {
                name: item.name,
                description:
                  (item.fcodeName ? item.fcodeName + ', ' : '') +
                  (item.adminName1 || '') +
                  (item.countryName ? ' (' + item.countryName + ')' : ''),
                type: '',
                latlng: L.latLng(parseFloat(item.lat), parseFloat(item.lng))
              };
              return resp;
            });
        }),
        catchError(() => of([]))
      );
  }

  getViewInfo(
    mapView: IMapView,
    geoHazard = GeoHazard.Dirt
  ): Observable<ViewInfo> {
    const latLng = mapView.center;
    return this.geoCodeService
      .GeoCodeLocationInfo({
        latitude: latLng.lat,
        longitude: latLng.lng,
        geoHazardId: geoHazard
      })
      .pipe(
        map((result) => ({
          location: {
            name: result.Name,
            adminName: result.WarningRegionName || result.AdminAreaName
          },
          elevation: result.Masl,
          steepness: result.Steepness,
          latLng: latLng
        })),
        catchError(() => of(null))
      );
  }

  private async saveSearchHistoryToDb(searchResult: MapSearchResponse) {
    const existingHistory = (
      await this.getSearchHistoryAsObservable().pipe(take(1)).toPromise()
    ).filter(
      (item) =>
        !(
          item.latlng.lat === searchResult.latlng.lat &&
          item.latlng.lng === searchResult.latlng.lng
        )
    );
    existingHistory.splice(0, 0, {
      timestamp: moment().unix(),
      ...searchResult
    }); // Insert new search item at index 0
    const items = existingHistory.slice(
      0,
      settings.map.search.searchHistorySize
    ); // Keep only last 5 items
    await nSQL(NanoSql.TABLES.MAP_SEARCH_HISTORY.name)
      .query('upsert', { id: 'searchresults', items })
      .exec();
  }

  getSearchHistoryAsObservable(): Observable<MapSearchHistory[]> {
    return new NSqlFullUpdateObservable<
      { id: string; items: MapSearchHistory[] }[]
    >(
      nSQL(NanoSql.TABLES.MAP_SEARCH_HISTORY.name).query('select').listen()
    ).pipe(map((val) => (val.length > 0 ? val[0].items : [])));
  }
}
