import { Injectable } from '@angular/core';
import { settings } from '../../../../settings';
import { RegObsObservation } from '../../models/regobs-observation.model';
import { nSQL } from 'nano-sql';
import { Observer } from 'nano-sql/lib/observable';
import { ApiService } from '../api/api.service';
import { HelperService } from '../helpers/helper.service';
import { RowCount } from '../../models/row-count.model';
import { getMode } from 'cordova-plugin-nano-sqlite/lib/sqlite-adapter';
import { Subject, Observable } from 'rxjs';

const tableName = 'registration';

@Injectable({
  providedIn: 'root'
})
export class ObservationService {

  observations: Array<RegObsObservation>;
  private _isLoading: Subject<boolean>;

  get isLoading(): Observable<boolean> {
    return this._isLoading.asObservable();
  }

  constructor(
    private apiService: ApiService,
    private helperService: HelperService
  ) {
    this._isLoading = new Subject<boolean>();
  }

  async init() {
    return nSQL(tableName)
      .model([
        { key: 'RegId', type: 'number', props: ['pk'] },
        { key: 'Latitude', type: 'number' },
        { key: 'Longitude', type: 'number' },
        { key: 'DtRegTime', type: 'date' },
        { key: 'DtChangeTime', type: 'date' },
      ])
      .config({
        id: settings.db.nanoSql.dbName,
        mode: getMode()
      })
      .connect();
  }

  async updateObservations() {
    this._isLoading.next(true);
    const fromDate = await this.helperService.getObservationsFromDate();
    (await this.apiService.search({
      FromDate: fromDate.toDate()
    })).subscribe(async (next) => {
      await nSQL(tableName).loadJS(tableName, next.Results);
      this._isLoading.next(false);
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
