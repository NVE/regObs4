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

const tableName = 'regObsObservation';

@Injectable({
  providedIn: 'root'
})
export class ObservationService {

  observations: Array<RegObsObservation>;

  constructor(private httpClient: HttpClient,
    private userSettingService: UserSettingService,
    private platform: Platform) { }

  private getobservationsFromDate(userSettings: UserSetting): string {
    const daysBackForCurrentGeoHazard = userSettings.observationDaysBack
      .find((setting) => setting.geoHazard === userSettings.currentGeoHazard);
    const daysBack = daysBackForCurrentGeoHazard ? daysBackForCurrentGeoHazard.daysBack : 3; // default to 3 if not found
    return moment().subtract(daysBack, 'days').startOf('day').toISOString();
  }

  // private getDb(): Promise<SQLiteObject> {
  //   const db = await this.sqlite.create({
  //     name: settings.db.name,
  //     location: settings.db.location
  //   });
  //   db.executeSql('CREATE TABLE IF NOT EXISTS regObsObservation(id INTEGER PRIMARY KEY, ')
  // }
  private async getDb(): Promise<string | Object> {
    await this.platform.ready();
    return nSQL(tableName) //  "users" is our table name.
      .model([ // Declare data model
        { key: 'RegId', type: 'number', props: ['pk'] },
        { key: 'Latitude', type: 'number' },
        { key: 'Longitude', type: 'number' },
      ])
      .connect();
  }

  async updateObservations(lat: number, lng: number, radius: number) {
    const userSettings = await this.userSettingService.getUserSettings();
    const observationRequest: ObservationsWithinRadiusRequest = {
      GeoHazards: [userSettings.currentGeoHazard],
      Latitude: lat,
      Longitude: lng,
      Radius: radius,
      FromDate: this.getobservationsFromDate(userSettings),
      LangKey: userSettings.language,
      ReturnCount: settings.observations.maxObservationsToFetch,
    };
    const baseUrl = settings.services.apiUrl[userSettings.appMode];
    await this.getDb();
    await this.httpClient.post<RegObsObservation>(
      `${baseUrl}/Observations/GetObservationsWithinRadius`, observationRequest)
      .subscribe(async (next) => {
        await nSQL(tableName).query('upsert', {
          RegId: next.RegId,
          Latitude: next.Latitude,
          Longitude: next.Longitude
        }).exec();
      });
  }

  getObservationsAsObservable(): Observer<RegObsObservation[]> {
    return nSQL().observable<RegObsObservation[]>(() => {
      return nSQL(tableName).query('select').emit();
    });
  }
}
