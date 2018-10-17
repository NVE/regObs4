import { Injectable } from '@angular/core';
import { UserSettingService } from '../user-setting/user-setting.service';
import { ObservationsWithinRadiusRequest } from '../../models/observations-within-radius-request.model';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiKey } from './api-key.model';
import { RegObsObservation } from '../../models/regobs-observation.model';
import { settings } from '../../../../settings';
import { GeoHazard } from '../../models/geo-hazard.enum';
import * as moment from 'moment';
import { SearchRequest } from './searchRequest';
import { Observable } from 'rxjs';
import { HelperService } from '../helpers/helper.service';
import { SearchResult } from './searchResult';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private userSettingService: UserSettingService,
    private httpClient: HttpClient) {
  }

  // async getObservationsWithinRadius(
  //   latitude: number,
  //   longitude: number,
  //   radius: number,
  //   geoHazards?: Array<GeoHazard>,
  //   fromDate?: moment.Moment,
  //   langKey?: string,
  //   returnCount?: number): Promise<Observable<RegObsObservation>> {

  //   const userSettings = await this.userSettingService.getUserSettings();
  //   const observationRequest: ObservationsWithinRadiusRequest = {
  //     GeoHazards: geoHazards ? geoHazards : [userSettings.currentGeoHazard],
  //     Latitude: latitude,
  //     Longitude: longitude,
  //     Radius: radius,
  //     FromDate: (fromDate ? fromDate : (await this.helperService.getObservationsFromDate())).toISOString(),
  //     LangKey: langKey ? langKey : userSettings.language,
  //     ReturnCount: returnCount ? returnCount : settings.observations.maxObservationsToFetch,
  //   };
  //   const baseUrl = settings.services.apiUrl[userSettings.appMode];
  //   const headers = await this.getHttpRequestHeaders();
  //   return this.httpClient.post<RegObsObservation>(
  //     `${baseUrl}/Observations/GetObservationsWithinRadius`,
  //     observationRequest,
  //     { headers });
  // }

  async search(searchRequest: SearchRequest): Promise<SearchResult> {
    const userSettings = await this.userSettingService.getUserSettings();
    const baseUrl = settings.services.regObs.apiUrl[userSettings.appMode];
    const headers = this.getHttpRequestHeaders();
    // Use http client service for CORS calls
    return this.httpClient.post<SearchResult>(
      `${baseUrl}/Search/All`,
      searchRequest,
      { headers }).toPromise();
  }

  private getHttpRequestHeaders() {
    return {
      regObs_apptoken: require('../../../../assets/apiKey.json').apiKey,
      ApiJsonVersion: settings.services.regObs.apiJsonVersion,
    };
  }

}
