import { Injectable } from '@angular/core';
import { NanoSql } from '../../../../nanosql';
import { nSQL } from 'nano-sql';
import { IRegistration } from '../models/registration.model';
import { Observable, combineLatest } from 'rxjs';
import { shareReplay, switchMap, map, take, tap } from 'rxjs/operators';
import * as RegobsApi from '../../regobs-api/services';
import * as RegobsApiModels from '../../regobs-api/models';
import { settings } from '../../../../settings';
import { UserSettingService } from '../../../core/services/user-setting/user-setting.service';
import { LoginService } from '../../../core/services/login/login.service';
import * as moment from 'moment';
import { GeoHazard } from '../../../core/models/geo-hazard.enum';
import { UserSetting } from '../../../core/models/user-settings.model';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NavController } from '@ionic/angular';
import { AppMode } from '../../../core/models/app-mode.enum';
import { IsEmptyHelper } from '../../../core/helpers/is-empty.helper';
import { fromJS, Map, is } from 'immutable';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private _registrationsObservable: Observable<IRegistration[]>;
  private _registrationForCurrentGeoHazardObservable: Observable<IRegistration>;

  get registrations$() {
    return this._registrationsObservable;
  }

  get registrationForCurrentGeoHazard$() {
    return this._registrationForCurrentGeoHazardObservable;
  }

  constructor(
    private userSettingService: UserSettingService,
    private loginService: LoginService,
    private registrationApiService: RegobsApi.RegistrationService,
    private searchApiService: RegobsApi.SearchService,
    private geolocation: Geolocation,
    private navController: NavController,
  ) {

    this._registrationsObservable = this.userSettingService.userSettingObservable$
      .pipe(switchMap((userSettings) => this.getRegistrationsAsObservable(userSettings.appMode)));
    this._registrationForCurrentGeoHazardObservable = this.userSettingService.currentGeoHazardObservable$
      .pipe(switchMap((geoHazard) => this.registrations$
        .pipe(map((registraions) => registraions.find((item) => item.geoHazard === geoHazard)))));
  }

  async saveRegistration(registration: IRegistration) {
    const userSettings = await this.userSettingService.getUserSettings();
    return NanoSql.getInstance(NanoSql.TABLES.REGISTRATION.name, userSettings.appMode)
      .query('upsert', registration).exec();
  }

  async createNewRegistration() {
    const userSettings = await this.userSettingService.getUserSettings();
    const loggedInUser = await this.loginService.getLoggedInUser();
    if (!loggedInUser.isLoggedIn) {
      throw Error('User is not logged in!');
    }
    const reg: IRegistration = {
      geoHazard: userSettings.currentGeoHazard,
      Id: this.createGuid(),
      ObserverGuid: loggedInUser.user.Guid,
      DtObsTime: null,
      GeoHazardTID: this.getApiGeoHazard(userSettings.currentGeoHazard),
    };
    return reg;
  }

  getCurrentRegistration() {
    return this.registrationForCurrentGeoHazard$.pipe(take(1)).toPromise();
  }

  async hasChanged(reg: IRegistration, currentRegistration?: IRegistration) {
    const current = currentRegistration || (await this.getCurrentRegistration());
    if (current) {
      return !is(fromJS(current), fromJS(reg));
    } else {
      return !IsEmptyHelper.isEmpty(reg);
    }
  }

  async createOrEditRegistrationRoute() {
    const user = await this.loginService.getLoggedInUser();
    if (!user.isLoggedIn) {
      this.navController.navigateForward('login');
    } else {
      const registration = await this.getCurrentRegistration();
      if (!registration) {
        this.navController.navigateForward('registration/obs-location');
      } else {
        this.navController.navigateForward('registration');
      }
    }
  }

  async deleteCurrentRegistration() {
    const userSettings = await this.userSettingService.getUserSettings();
    return NanoSql.getInstance(NanoSql.TABLES.REGISTRATION.name, userSettings.appMode)
      .query('delete').where(['geoHazard', '=', userSettings.currentGeoHazard]).exec();
  }

  private getRegistrationsAsObservable(appMode: AppMode) {
    return nSQL().observable<IRegistration[]>(() => {
      return NanoSql.getInstance(NanoSql.TABLES.REGISTRATION.name, appMode).query('select').emit();
    }).toRxJS().pipe(shareReplay(1));
  }

  private async postRegistration(registration: RegobsApiModels.CreateRegistrationRequestDto) {
    const userSettings = await this.userSettingService.getUserSettings();
    const loggedInUser = await this.loginService.getLoggedInUser();
    if (!loggedInUser.isLoggedIn) {
      throw Error('User is not logged in!');
    }
    registration.ObserverGuid = loggedInUser.user.Guid;
    this.registrationApiService.rootUrl = settings.services.regObs.apiUrl[userSettings.appMode];
    const result = await this.registrationApiService.RegistrationInsert(registration).pipe(switchMap((resp) => {
      return this.getRegistrationById(resp.RegId, userSettings);
    })).toPromise();
    await NanoSql.getInstance(NanoSql.TABLES.OBSERVATION.name, userSettings.appMode)
      .query('upsert', result).exec();
  }

  private getRegistrationById(regId: number, userSetting: UserSetting) {
    this.searchApiService.rootUrl = settings.services.regObs.apiUrl[userSetting.appMode];
    return this.searchApiService.SearchAll({ RegId: regId }).pipe(map((result) =>
      result.Results[0]
    ));
  }

  private getApiGeoHazard(geoHazard: GeoHazard) {
    switch (geoHazard) {
      case GeoHazard.Snow:
        return 'Avalanche';
      case GeoHazard.Ice:
        return 'Ice';
      case GeoHazard.Water:
        return 'Flooding';
      case GeoHazard.Dirt:
        return 'LandSlide';
    }
  }

  private S4() {
    // tslint:disable-next-line:no-bitwise
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  private createGuid() {
    return (this.S4() + this.S4() + '-' + this.S4() + '-4' + this.S4().substr(0, 3)
      + '-' + this.S4() + '-' + this.S4() + this.S4() + this.S4()).toLowerCase();
  }
}
