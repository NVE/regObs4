import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { settings } from '../../../../settings';
import { MapSearchResponse } from './map-search-response.model';
import * as L from 'leaflet';
import { merge, map } from 'rxjs/operators';
import { Observable, concat } from 'rxjs';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/forkJoin';
import { UserSettingService } from '../user-setting/user-setting.service';

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
    return this.httpClient.get(`${settings.map.search.world.url}?`
      + `name_startsWith=${text}&maxRows=${settings.map.search.world.maxResults}`
      + `&lang=${lang}`
      + `&username=${settings.map.search.world.username}`)
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
}
