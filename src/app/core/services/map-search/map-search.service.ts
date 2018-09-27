import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { settings } from '../../../../settings';
import { MapSearchResponse } from './map-search-response.model';
import * as L from 'leaflet';
import { merge, map, switchMap } from 'rxjs/operators';
import { Observable, concat, bindNodeCallback } from 'rxjs';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/forkJoin';
import { UserSettingService } from '../user-setting/user-setting.service';
import { parseString } from 'xml2js';

@Injectable({
  providedIn: 'root'
})
export class MapSearchService {

  constructor(private httpClient: HttpClient, private userSettingService: UserSettingService) { }

  async searchAll(text: string) {
    const userSettings = await this.userSettingService.getUserSettings();
    return Observable.forkJoin(
      this.searchNorwegianPlaces(text, userSettings.language),
      this.searchWorld(text, userSettings.language))
      .pipe(map(([s1, s2]) => [...s1, ...s2]));
  }

  searchNorwegianPlaces(text: string, lang: string): Observable<MapSearchResponse[]> {
    return this.httpClient.get(`${settings.map.search.no.url}?navn=${text}*&antPerSide=${settings.map.search.no.maxResults}`
      + `&eksakteForst=${settings.map.search.no.exactFirst}&epsgKode=3395`).pipe(map((data: any) => {
        const resultList = data.stedsnavn || [];
        return this.removeDuplicates(resultList).map((item) => {
          const resp: MapSearchResponse = {
            name: item.stedsnavn,
            description: (lang === 'no' ? item.navnetype + ', ' : '')
              + item.kommunenavn + ' (' + item.fylkesnavn + ')',
            type: item.navnetype,
            latlng: L.Projection.Mercator.unproject(L.point({ x: item.aust, y: item.nord })),
          };
          return resp;
        });
      }));
  }

  removeDuplicates(data: any[]) {
    return data.reduce((acc, currentValue) => {
      if (acc.filter((item) => item.ssrId === currentValue.ssrId).length === 0) {
        acc.push(currentValue);
      }
      return acc;
    }, []);
  }

  searchWorld(text: string, lang: string): Observable<MapSearchResponse[]> {
    return this.httpClient.get(`${settings.map.search.geonames.url}/searchJSON?`
      + `name_startsWith=${text}&maxRows=${settings.map.search.geonames.maxResults}`
      + `&lang=${lang}`
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
      }));
  }

  getElevation(lat: number, lng: number): Observable<number> {
    return this.httpClient.get(`${settings.map.search.geonames.url}/srtm1JSON?`
      + `lat=${lat}&lng=${lng}&username=${settings.map.search.geonames.username}`)
      .pipe(map((data: any) => data.srtm1));
  }

  reverseGeocodeWorld(lat: number, lng: number) {
    return this.httpClient.get(`${settings.map.search.geonames.url}/findNearbyJSON?`
      + `lat=${lat}&lng=${lng}&username=${settings.map.search.geonames.username}`);
  }

  reverseGeocodeNorway(lat: number, lng: number) {
    return this.httpClient.get(`https://openwps.statkart.no/skwms1/wps.elevation2?`
      + `request=Execute&service=WPS&version=1.0.0&identifier=elevationJSON&datainputs=`
      + `lat=${lat};lon=${lng};epsg=4326`)
      .pipe(switchMap((res) => bindNodeCallback(parseString)(res)));
  }

  async getLocationName(lat: number, lng: number) {
    const userSettings = await this.userSettingService.getUserSettings();
    return this.httpClient.get(`${settings.services.regObs.apiUrl[userSettings.appMode]}/Location/GetName`
      + `?latitude=${lat}&longitude=${lng}&geoHazardId=${userSettings.currentGeoHazard}`);
  }
}
