import { Injectable } from '@angular/core';
import { UserSettingService } from '../user-setting.service';
import { ObservationsWithinRadiusRequest } from '../../models/observations-within-radius-request.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiKey } from './api-key.model';
import { RegObsObservation } from '../../models/regobs-observation.model';
import { settings } from '../../../../settings';
import { GeoHazard } from '../../models/geo-hazard.enum';
import * as moment from 'moment';
import { UserSetting } from '../../models/user-settings.model';
import { SearchRequest } from './searchRequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private userSettingService: UserSettingService, private httpClient: HttpClient) { }

  async getObservationsWithinRadius(
    latitude: number,
    longitude: number,
    radius: number,
    geoHazards?: Array<GeoHazard>,
    fromDate?: moment.Moment,
    langKey?: string,
    returnCount?: number): Promise<Observable<RegObsObservation>> {

    const userSettings = await this.userSettingService.getUserSettings();
    const observationRequest: ObservationsWithinRadiusRequest = {
      GeoHazards: geoHazards ? geoHazards : [userSettings.currentGeoHazard],
      Latitude: latitude,
      Longitude: longitude,
      Radius: radius,
      FromDate: (fromDate ? fromDate : this.getobservationsFromDate(userSettings)).toISOString(),
      LangKey: langKey ? langKey : userSettings.language,
      ReturnCount: returnCount ? returnCount : settings.observations.maxObservationsToFetch,
    };
    const baseUrl = settings.services.apiUrl[userSettings.appMode];
    const headers = await this.getHttpRequestHeaders();
    return this.httpClient.post<RegObsObservation>(
      `${baseUrl}/Observations/GetObservationsWithinRadius`,
      observationRequest,
      { headers });
  }

  async search(searchRequest: SearchRequest) {
    const userSettings = await this.userSettingService.getUserSettings();
    const baseUrl = settings.services.apiUrl[userSettings.appMode];
    const headers = await this.getHttpRequestHeaders();
    await this.httpClient.post<RegObsObservation>(
      `${baseUrl}/Search/All`,
      searchRequest,
      { headers });
  }

  private async getApiKey(): Promise<string> {
    try {
      const apiKeyJsonFile = await this.httpClient.get<ApiKey>('/assets/apiKey.json').toPromise();
      return apiKeyJsonFile.apiKey;
    } catch (Error) {
      throw new Error('/assets/apiKey.json missing. Please read documentation!');
    }
  }

  private async getHttpRequestHeaders(): Promise<HttpHeaders> {
    return new HttpHeaders()
      .set('regObs_apptoken', await this.getApiKey())
      .set('ApiJsonVersion', settings.services.apiJsonVersion);
  }

  private getobservationsFromDate(userSettings: UserSetting): moment.Moment {
    const daysBackForCurrentGeoHazard = userSettings.observationDaysBack
      .find((setting) => setting.geoHazard === userSettings.currentGeoHazard);
    const daysBack = daysBackForCurrentGeoHazard ? daysBackForCurrentGeoHazard.daysBack : 3; // default to 3 days back if not found
    return moment().subtract(daysBack, 'days').startOf('day');
  }
}
