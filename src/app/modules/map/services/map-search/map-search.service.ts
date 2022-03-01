import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { settings } from '../../../../../settings';
import { MapSearchResponse } from './map-search-response.model';
import * as L from 'leaflet';
import { map, switchMap, catchError, take } from 'rxjs/operators';
import { Observable, forkJoin, of, Subject } from 'rxjs';
import { ViewInfo } from './view-info.model';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { LangKey, GeoHazard } from 'src/app/modules/common-core/models';
import { GeoCodeService } from 'src/app/modules/common-regobs-api/services';
import { NanoSql } from '../../../../../nanosql';
import { MapSearchHistory } from './map-search-history.model';
import moment from 'moment';
import { IMapView } from '../map/map-view.interface';
import { Navn, ReturSkrivemate } from './norwegian-search-result.model';
import { WorldSearchResultModel } from './world-search-result.model';
import { nSQL } from '@nano-sql/core';
import { NSqlFullUpdateObservable } from '../../../../core/helpers/nano-sql/NSqlFullUpdateObservable';

@Injectable({
  providedIn: 'root'
})
export class MapSearchService {
  private _mapSearchItemClickSubject: Subject<MapSearchResponse | L.LatLng>;
  private _mapSearchItemClickObservable: Observable<MapSearchResponse | L.LatLng>;

  get mapSearchClick$(): Observable<MapSearchResponse | L.LatLng> {
    return this._mapSearchItemClickObservable;
  }

  set mapSearchItemSelected(item: MapSearchResponse | L.LatLng) {
    this._mapSearchItemClickSubject.next(item);
  }

  constructor(private httpClient: HttpClient, private userSettingService: UserSettingService, private geoCodeService: GeoCodeService) {
    this._mapSearchItemClickSubject = new Subject<MapSearchResponse | L.LatLng>();
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
        forkJoin([this.searchNorwegianPlaces(text, language), this.searchWorld(text, language)]).pipe(map(([s1, s2]) => [...s1, ...s2]))
      )
    );
  }

  searchNorwegianPlaces(text: string, lang: LangKey): Observable<MapSearchResponse[]> {
    return this.httpClient
      .get(
        `${settings.map.search.no.url}?sok=${text.trim()}*&treffPerSide=${settings.map.search.no.maxResults}`
        + `&utkoordsys=${settings.map.search.no.coordinateSystem}&filtrer=${settings.map.search.no.resultFields}`
      )
      .pipe(
        map((returSted: ReturSkrivemate) => {
          const hits = returSted.metadata.totaltAntallTreff;
          const resultList =
            hits === 0
              ? []
              : hits === 1
                ? [returSted.navn[0] as Navn]
                : (returSted.navn as Array<Navn>);

          return this.removeDuplicates(resultList).map((item) => {
            const resp: MapSearchResponse = {
              name: item.skrivemåte,
              description: this.formatLocationDescription(item, lang),
              type: item.navneobjekttype,
              latlng: L.latLng(item.representasjonspunkt.nord, item.representasjonspunkt.øst)
            };
            return resp;
          });
        }),
        catchError(() => of([]))
      );
  }

  formatLocationDescription(item: Navn, lang: LangKey): string {
    const nameType = item.navneobjekttype;
    const norwegian = lang === LangKey.nb || lang === LangKey.nn;
    const county = item.fylker[0]?.fylkesnavn;
    if (item.kommuner.length !== 1 || nameType === 'Kommune') {
      if (norwegian) {
        return `${nameType}, ${county}`;
      }
      return county;
    }
    if (item.fylker.length !== 1 || nameType === 'Fylke') {
      if (norwegian) {
        return `${nameType}`;
      }
      return '';
    }
    const municipality = item.kommuner[0]?.kommunenavn;
    if (norwegian) {
      return `${nameType}, ${municipality} (${county})`;
    }
    return `${municipality} (${county})`;
  }

  private removeDuplicates(data: Navn[]): Navn[] {
    return (data || []).reduce((acc, currentValue) => {
      if (
        acc.filter((item) => item.stedsnummer === currentValue.stedsnummer)
          .length === 0
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

  getViewInfo(latLng: L.LatLng, geoHazard = GeoHazard.Soil): Observable<ViewInfo> {
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
    const existingHistory = (await this.getSearchHistoryAsObservable().pipe(take(1)).toPromise()).filter(
      (item) => !(item.latlng.lat === searchResult.latlng.lat && item.latlng.lng === searchResult.latlng.lng)
    );
    existingHistory.splice(0, 0, {
      timestamp: moment().unix(),
      ...searchResult
    }); // Insert new search item at index 0
    const items = existingHistory.slice(0, settings.map.search.searchHistorySize); // Keep only last 5 items
    await nSQL(NanoSql.TABLES.MAP_SEARCH_HISTORY.name).query('upsert', { id: 'searchresults', items }).exec();
  }

  getSearchHistoryAsObservable(): Observable<MapSearchHistory[]> {
    return new NSqlFullUpdateObservable<{ id: string; items: MapSearchHistory[] }[]>(
      nSQL(NanoSql.TABLES.MAP_SEARCH_HISTORY.name).query('select').listen()
    ).pipe(map((val) => (val.length > 0 ? val[0].items : [])));
  }
}
