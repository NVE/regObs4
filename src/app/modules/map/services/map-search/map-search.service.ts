import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { settings } from '../../../../../settings';
import { MapSearchResponse } from './map-search-response.model';
import * as L from 'leaflet';
import { map, switchMap, catchError, take, shareReplay } from 'rxjs/operators';
import { Observable, combineLatest, forkJoin, of, Subject } from 'rxjs';
import 'leaflet.utm';
import { LocationName } from './location-name.model';
import { ViewInfo } from './view-info.model';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { LangKey } from '../../../../core/models/langKey';
import { BorderHelper } from '../../../../core/helpers/leaflet/border-helper';
import { LocationService } from '../../../regobs-api/services';
import { NanoSql } from '../../../../../nanosql';
import { nSQL } from 'nano-sql';
import { MapSearchHistory } from './map-search-history.model';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class MapSearchService {

  private _mapSearchItemClickSubject: Subject<MapSearchResponse>;
  private _mapSearchItemClickObservable: Observable<MapSearchResponse>;

  get mapSearchClick$() {
    return this._mapSearchItemClickObservable;
  }

  set mapSearchItemSelected(item: MapSearchResponse) {
    this._mapSearchItemClickSubject.next(item);
  }

  constructor(
    private httpClient: HttpClient,
    private userSettingService: UserSettingService,
    private locationService: LocationService) {
    this._mapSearchItemClickSubject = new Subject<MapSearchResponse>();
    this._mapSearchItemClickObservable = this._mapSearchItemClickSubject.asObservable().pipe(shareReplay(0));
    this._mapSearchItemClickObservable.subscribe((item) => {
      this.saveSearchHistoryToDb(item);
    });
  }

  searchAll(text: string): Observable<MapSearchResponse[]> {
    return this.userSettingService.userSettingObservable$.pipe(
      switchMap((userSettings) =>
        forkJoin(this.searchNorwegianPlaces(text, userSettings.language),
          this.searchWorld(text, userSettings.language)).pipe(map(([s1, s2]) => [...s1, ...s2]))));
  }

  searchNorwegianPlaces(text: string, lang: LangKey): Observable<MapSearchResponse[]> {
    return this.httpClient.get(`${settings.map.search.no.url}?navn=${text.trim()}*&antPerSide=${settings.map.search.no.maxResults}`
      + `&eksakteForst=${settings.map.search.no.exactFirst}&epsgKode=3395`).pipe(map((data: any) => {
        const resultList = data.stedsnavn || [];
        return this.removeDuplicates(resultList).map((item) => {
          const resp: MapSearchResponse = {
            name: item.stedsnavn,
            description: (lang === LangKey.no ? item.navnetype + ', ' : '')
              + item.kommunenavn + ' (' + item.fylkesnavn + ')',
            type: item.navnetype,
            latlng: L.Projection.Mercator.unproject(L.point({ x: item.aust, y: item.nord })),
          };
          return resp;
        });
      }),
        catchError(() => of([])));
  }

  removeDuplicates(data: any[]) {
    return (data || []).reduce((acc, currentValue) => {
      if (acc.filter((item) => item.ssrId === currentValue.ssrId).length === 0) {
        acc.push(currentValue);
      }
      return acc;
    }, []);
  }

  searchWorld(text: string, lang: LangKey): Observable<MapSearchResponse[]> {
    return this.httpClient.get(`${settings.map.search.geonames.url}/searchJSON?`
      + `name_startsWith=${text}&maxRows=${settings.map.search.geonames.maxResults}`
      + `&lang=${LangKey[lang]}`
      + `&username=${settings.map.search.geonames.username}`)
      .pipe(map((data: any) => {
        const geoData = data.geonames || [];
        return geoData.filter((item) => item.countryCode !== 'NO').map((item) => {
          const resp: MapSearchResponse = {
            name: item.name,
            description: (item.fcodeName ? item.fcodeName + ', ' : '') + (item.adminName1 || '')
              + (item.countryName ? (' (' + item.countryName + ')') : ''),
            type: item.navnetype,
            latlng: L.latLng(item.lat, item.lng),
          };
          return resp;
        });
      }), catchError(() => of([])));
  }

  getElevation(latLng: L.LatLng): Observable<number> {
    return BorderHelper.getLatLngBoundInSvalbardOrNorwayAsObservable(latLng)
      .pipe(switchMap((val) =>
        val.inSvalbard ? this.getElevationSvalbard(latLng) : (val.inNorway ?
          this.getElevationNorway(latLng) : this.getElevationWorld(latLng))));
  }

  getElevationSvalbard(latLng: L.LatLng): Observable<number> {
    const utm = this.latLngToUtm(latLng);
    const url = settings.map.elevation.svalbard.url.replace('{0}', utm.x.toString()).replace('{1}', utm.y.toString());
    return this.httpClient.get(url)
      .pipe(map((result: any) => parseInt(result.value, 10)));
  }

  latLngToUtm(latLng: L.LatLng): { x: number, y: number } {
    return (<any>latLng).utm(33, false);
  }

  getElevationNorway(latLng: L.LatLng): Observable<number> {
    const utm = this.latLngToUtm(latLng);
    const url = settings.map.elevation.no.url.replace('{0}', utm.x.toString()).replace('{1}', utm.y.toString());
    return this.httpClient.get(url)
      .pipe(map((result: any) => parseInt(result.value, 10)));
  }

  getElevationWorld(latLng: L.LatLng): Observable<number> {
    return this.httpClient.get(`${settings.map.search.geonames.url}/srtm1JSON?`
      + `lat=${latLng.lat}&lng=${latLng.lng}&username=${settings.map.search.geonames.username}`)
      .pipe(map((data: any) => data && data.srtm1 !== -1 ? data.srtm1 : undefined));
  }

  reverseGeocodeWorld(latLng: L.LatLng): Observable<LocationName> {
    return this.httpClient.get(`${settings.map.search.geonames.url}/findNearbyJSON?`
      + `lat=${latLng.lat}&lng=${latLng.lng}&username=${settings.map.search.geonames.username}`)
      .pipe(map((result: any) => {
        const firstResult = result.geonames[0];
        if (firstResult) {
          return { name: firstResult.toponymName, adminName: firstResult.adminName1 };
        }
        return null;
      }));
  }

  // reverseGeocodeNorway(lat: number, lng: number) {
  //   return this.httpClient.get(`https://openwps.statkart.no/skwms1/wps.elevation2?`
  //     + `request=Execute&service=WPS&version=1.0.0&identifier=elevationJSON&datainputs=`
  //     + `lat=${lat};lon=${lng};epsg=4326`)
  //     .pipe(switchMap((res) => bindNodeCallback(parseString)(res)));
  // }

  getLocationName(latLng: L.LatLng, isInNorway: boolean): Observable<LocationName> {
    if (isInNorway) {
      return this.getLocationNameNorway(latLng);
    } else {
      return this.reverseGeocodeWorld(latLng);
    }
  }

  getLocationNameNorway(latLng: L.LatLng): Observable<LocationName> {
    return this.userSettingService.userSettingObservable$.pipe(
      switchMap((userSettings) => {
        this.locationService.rootUrl = settings.services.regObs.apiUrl[userSettings.appMode];
        return this.locationService.LocationGetName({ latitude: latLng.lat, longitude: latLng.lng, uri: '' }).pipe(map((result) =>
          ({ name: result.Navn, adminName: result.Fylke })));
      }));
  }

  getViewInfo(latLng: L.LatLng, isInNorway: boolean): Observable<ViewInfo> {
    return this.getLocationName(latLng, isInNorway).pipe(($ln) =>
      combineLatest($ln, this.getElevation(latLng)),
      map<[LocationName, number], { location: LocationName, elevation: number, latLng: L.LatLng }>
        (([location, elevation]) => ({
          location,
          elevation,
          latLng,
        })));
  }

  private async saveSearchHistoryToDb(searchResult: MapSearchResponse) {
    const existingHistory = (await this.getSearchHistoryAsObservable().pipe(take(1)).toPromise()
    ).filter((item) =>
      !(item.latlng.lat === searchResult.latlng.lat && item.latlng.lng === searchResult.latlng.lng));
    existingHistory.push({ timestamp: moment().unix(), ...searchResult });
    const items = existingHistory.slice(-(settings.map.search.searchHistorySize)); // Keep only last 5 items
    await nSQL(NanoSql.TABLES.MAP_SEARCH_HISTORY.name).query('upsert', { id: 'searchresults', items }).exec();
  }

  getSearchHistoryAsObservable(): Observable<MapSearchHistory[]> {
    return nSQL().observable<{ id: string, items: MapSearchHistory[] }[]>(() =>
      nSQL(NanoSql.TABLES.MAP_SEARCH_HISTORY.name).query('select').emit()
    ).toRxJS().pipe(map((val) => val.length > 0 ? val[0].items.reverse() : []));
  }
}
