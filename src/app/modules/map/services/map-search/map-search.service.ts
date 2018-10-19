import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { settings } from '../../../../../settings';
import { MapSearchResponse } from './map-search-response.model';
import * as L from 'leaflet';
import { merge, map, switchMap, concat } from 'rxjs/operators';
import { Observable, bindNodeCallback, combineLatest, forkJoin } from 'rxjs';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';
import { parseString } from 'xml2js';
import 'leaflet.utm';
import { LocationName } from './location-name.model';
import { ViewInfo } from './view-info.model';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { LangKey } from '../../../../core/models/langKey';
import { BorderHelper } from '../../../../core/helpers/leaflet/border-helper';

@Injectable({
  providedIn: 'root'
})
export class MapSearchService {

  constructor(private httpClient: HttpClient, private userSettingService: UserSettingService) { }

  searchAll(text: string): Observable<MapSearchResponse[]> {
    return this.userSettingService.userSettingObservable$.pipe(
      switchMap((userSettings) =>
        forkJoin(this.searchNorwegianPlaces(text, userSettings.language),
          this.searchWorld(text, userSettings.language)).pipe(map(([s1, s2]) => [...s1, ...s2]))));
  }

  searchNorwegianPlaces(text: string, lang: LangKey): Observable<MapSearchResponse[]> {
    return this.httpClient.get(`${settings.map.search.no.url}?navn=${text}*&antPerSide=${settings.map.search.no.maxResults}`
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
      }));
  }

  getElevation(latLng: L.LatLng): Observable<number> {
    if (BorderHelper.isInSvalbard(latLng)) {
      return this.getElevationSvalbard(latLng);
    } else if (BorderHelper.isInNorway(latLng)) {
      return this.getElevationNorway(latLng);
    } else {
      return this.getElevationWorld(latLng);
    }
  }

  getElevationSvalbard(latLng: L.LatLng): Observable<number> {
    console.log('[INFO] Get elevation for Svalbard');
    const utm = this.latLngToUtm(latLng);
    const url = settings.map.elevation.svalbard.url.replace('{0}', utm.x.toString()).replace('{1}', utm.y.toString());
    return this.httpClient.get(url)
      .pipe(map((result: any) => parseInt(result.value, 10)));
  }

  latLngToUtm(latLng: L.LatLng): { x: number, y: number } {
    return (<any>latLng).utm(33, false);
  }

  getElevationNorway(latLng: L.LatLng): Observable<number> {
    console.log('[INFO] Get elevation for Norway');
    const utm = this.latLngToUtm(latLng);
    const url = settings.map.elevation.no.url.replace('{0}', utm.x.toString()).replace('{1}', utm.y.toString());
    return this.httpClient.get(url)
      .pipe(map((result: any) => parseInt(result.value, 10)));
  }

  getElevationWorld(latLng: L.LatLng): Observable<number> {
    console.log('[INFO] Get elevation for world');
    return this.httpClient.get(`${settings.map.search.geonames.url}/srtm1JSON?`
      + `lat=${latLng.lat}&lng=${latLng.lng}&username=${settings.map.search.geonames.username}`)
      .pipe(map((data: any) => data.srtm1));
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
      switchMap((userSettings) =>
        this.httpClient.get(`${settings.services.regObs.apiUrl[userSettings.appMode]}/Location/GetName`
          + `?latitude=${latLng.lat}&longitude=${latLng.lng}&geoHazardId=${userSettings.currentGeoHazard}`)
          .pipe(map((result: any) => ({ name: result.Data.Navn, adminName: result.Data.Fylke })))));
  }

  getViewInfo(latLng: L.LatLng, isInNorway: boolean): Observable<ViewInfo> {
    return this.getLocationName(latLng, isInNorway).pipe(($ln) =>
      combineLatest($ln, this.getElevation(latLng)),
      map(([location, elevation]) => ({
        location,
        elevation,
        latLng,
      })));
  }
}
