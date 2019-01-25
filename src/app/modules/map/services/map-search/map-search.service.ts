import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { settings } from '../../../../../settings';
import { MapSearchResponse } from './map-search-response.model';
import * as L from 'leaflet';
import { map, switchMap, catchError, take, shareReplay, combineAll, tap } from 'rxjs/operators';
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
import { IMapView } from '../map/map-view.interface';
import { NorwegianSearchResultModel, NorwegianSearchResultModelStednavn } from './norwegian-search-result.model';
import { WorldSearchResultModel } from './world-search-result.model';
import '../../../../core/helpers/nano-sql/nanoObserverToRxjs';

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
    return this.userSettingService.language$.pipe(
      switchMap((language) =>
        forkJoin(this.searchNorwegianPlaces(text, language),
          this.searchWorld(text, language)).pipe(map(([s1, s2]) => [...s1, ...s2]))));
  }

  searchNorwegianPlaces(text: string, lang: LangKey): Observable<MapSearchResponse[]> {
    return this.httpClient.get(`${settings.map.search.no.url}?navn=${text.trim()}*&antPerSide=${settings.map.search.no.maxResults}`
      + `&eksakteForst=${settings.map.search.no.exactFirst}&epsgKode=3395`).pipe(map((data: NorwegianSearchResultModel) => {
        const hits = parseInt(data.totaltAntallTreff, 10);
        const resultList = hits === 0 ? [] : (hits === 1 ? [
          data.stedsnavn as NorwegianSearchResultModelStednavn] :
          data.stedsnavn as Array<NorwegianSearchResultModelStednavn>);
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

  removeDuplicates(data: NorwegianSearchResultModelStednavn[]) {
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
      .pipe(map((data: WorldSearchResultModel) => {
        const geoData = data.geonames || [];
        return geoData.filter((item) => item.countryCode !== 'NO').map((item) => {
          const resp: MapSearchResponse = {
            name: item.name,
            description: (item.fcodeName ? item.fcodeName + ', ' : '') + (item.adminName1 || '')
              + (item.countryName ? (' (' + item.countryName + ')') : ''),
            type: '',
            latlng: L.latLng(parseFloat(item.lat), parseFloat(item.lng)),
          };
          return resp;
        });
      }), catchError(() => of([])));
  }

  getElevation(latLng: L.LatLng, inNorwayOrSvalbard: { inSvalbard: boolean, inNorway: boolean }): Observable<number> {
    return inNorwayOrSvalbard.inSvalbard ? this.getElevationSvalbard(latLng) : (inNorwayOrSvalbard.inNorway ?
      this.getElevationNorway(latLng) : this.getElevationWorld(latLng));
  }

  getElevationSvalbard(latLng: L.LatLng): Observable<number> {
    const utm = this.latLngToUtm(latLng);
    const url = settings.map.elevation.svalbard.url.replace('{0}', utm.x.toString()).replace('{1}', utm.y.toString());
    return this.httpClient.get(url)
      .pipe(map((result: any) => this.getValidResultOrNull(result.value)),
        catchError(() => of(null)));
  }

  latLngToUtm(latLng: L.LatLng): { x: number, y: number } {
    return (<any>latLng).utm(33, false);
  }

  getElevationNorway(latLng: L.LatLng): Observable<number> {
    const utm = this.latLngToUtm(latLng);
    const url = settings.map.elevation.no.url.replace('{0}', utm.x.toString()).replace('{1}', utm.y.toString());
    return this.httpClient.get(url)
      .pipe(
        map((result: any) => this.getValidResultOrNull(result.value)),
        catchError(() => of(null)));
  }

  private getValidResultOrNull(value: string) {
    const numberResult = parseInt(value, 10);
    if (!isNaN(numberResult) && numberResult > 0) {
      return numberResult;
    } else {
      return null;
    }
  }

  getElevationWorld(latLng: L.LatLng): Observable<number> {
    return this.httpClient.get(`${settings.map.search.geonames.url}/srtm1JSON?`
      + `lat=${latLng.lat}&lng=${latLng.lng}&username=${settings.map.search.geonames.username}`)
      .pipe(map((data: any) => (data && data.srtm1 >= 0) ? data.srtm1 : null),
        catchError(() => of(null)));
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
      }), catchError(() => of(null)));
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
    return this.userSettingService.appMode$.pipe(
      switchMap((appMode) => {
        this.locationService.rootUrl = settings.services.regObs.apiUrl[appMode];
        return this.locationService.LocationGetName({ latitude: latLng.lat, longitude: latLng.lng, uri: '' })
          .pipe(map((result) =>
            ({ name: result.Navn, adminName: result.Fylke })),
            catchError(() => of(null)));
      }));
  }

  getSteepness(mapView: IMapView, isInNorway: boolean): Observable<number> {
    if (mapView.center && mapView.bounds && isInNorway) {
      return this.getSteepnessNorway(mapView);
    } else {
      return of(null);
    }
  }

  getSteepnessNorway(mapView: IMapView) {
    const utm = this.latLngToUtm(mapView.center);
    const bboxUtm = [
      mapView.bounds.getSouthWest(),
      mapView.bounds.getNorthEast()].map((val) => this.latLngToUtm(val));
    const bboxString = `${bboxUtm[0].x},${bboxUtm[0].y},${bboxUtm[1].x},${bboxUtm[1].y}`;
    const url = settings.map.steepness.no.url
      .replace('{0}', utm.x.toString())
      .replace('{1}', utm.y.toString())
      .replace('{2}', bboxString);
    return this.httpClient.get(url)
      .pipe(
        map((val: { results: Array<{ attributes: { 'Pixel Value': string } }> }) => {
          if (val.results &&
            val.results.length > 0 &&
            val.results[0].attributes &&
            val.results[0].attributes['Pixel Value'] &&
            val.results[0].attributes['Pixel Value'] !== 'NoData') {
            const number = parseInt(val.results[0].attributes['Pixel Value'], 10);
            return isNaN(number) ? null : number;
          } else {
            return null;
          }
        }),
        catchError(() => of(null)));
  }

  getViewInfo(mapView: IMapView): Observable<ViewInfo> {
    const latLng = mapView.center;
    return BorderHelper.getLatLngBoundInSvalbardOrNorwayAsObservable(latLng)
      .pipe(switchMap((inNorwayOrSvalbard) =>
        forkJoin(
          this.getLocationName(latLng, inNorwayOrSvalbard.inNorway).pipe(take(1)),
          this.getElevation(latLng, inNorwayOrSvalbard).pipe(take(1)),
          this.getSteepness(mapView, inNorwayOrSvalbard.inNorway).pipe(take(1))
        ).pipe(
          map(([location, elevation, steepness]) => ({
            location,
            elevation,
            steepness,
            latLng,
          })))));
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
