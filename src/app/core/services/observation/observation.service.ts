import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserSettingService } from '../user-setting.service';
import { ObservationsWithinRadiusRequest } from '../../models/observations-within-radius-request.model';
import * as moment from 'moment';
import { UserSetting } from '../../models/user-settings.model';
import { settings } from '../../../../settings';
import { RegObsObservation } from '../../models/regobs-observation.model';
import { nSQL } from 'nano-sql';
import { Platform } from '@ionic/angular';
import { Observer } from 'nano-sql/lib/observable';
import { ApiService } from '../api/api.service';
import { HelperService } from '../helpers/helper.service';
import { RowCount } from '../../models/row-count.model';
import { getMode } from 'cordova-plugin-nano-sqlite/lib/sqlite-adapter';

const tableName = 'regObsObservation';

@Injectable({
  providedIn: 'root'
})
export class ObservationService {

  observations: Array<RegObsObservation>;

  constructor(
    private platform: Platform,
    private apiService: ApiService,
    private helperService: HelperService
  ) {

  }

  async updateObservations() {
    const fromDate = await this.helperService.getObservationsFromDate();
    (await this.apiService.search({
      FromDate: fromDate.toDate()
    })).subscribe(async (next) => {
      await nSQL(tableName).loadJS(tableName, next.Results);
    });
  }

  // async updateObservations(lat: number, lng: number, radius: number) {
  //   const userSettings = await this.userSettingService.getUserSettings();
  //   const observationRequest: ObservationsWithinRadiusRequest = {
  //     GeoHazards: [userSettings.currentGeoHazard],
  //     Latitude: lat,
  //     Longitude: lng,
  //     Radius: radius,
  //     FromDate: this.getobservationsFromDate(userSettings),
  //     LangKey: userSettings.language,
  //     ReturnCount: settings.observations.maxObservationsToFetch,
  //   };
  //   const baseUrl = settings.services.apiUrl[userSettings.appMode];
  //   await this.getDb();
  //   await this.httpClient.post<RegObsObservation>(
  //     `${baseUrl}/Observations/GetObservationsWithinRadius`, observationRequest)
  //     .subscribe(async (next) => {
  //       await nSQL(tableName).query('upsert', {
  //         RegId: next.RegId,
  //         Latitude: next.Latitude,
  //         Longitude: next.Longitude
  //       }).exec();
  //     });
  // }

  getObservationsAsObservable(): Observer<RegObsObservation[]> {
    return nSQL().observable<RegObsObservation[]>(() => {
      return nSQL(tableName).query('select').emit();
    });
  }

  getObserableCount(): Observer<RowCount[]> {
    return nSQL().observable<RowCount[]>(() => {
      return nSQL(tableName).query('select', ['COUNT(*) as count']).emit();
    });
  }
}
