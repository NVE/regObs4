import { Injectable } from '@angular/core';
import { NanoSql } from '../../../../nanosql';
import { nSQL } from 'nano-sql';
import { IRegistration } from '../models/registration.model';
import { Observable } from 'rxjs';
import { shareReplay, switchMap, map, take } from 'rxjs/operators';
import * as RegobsApi from '../../regobs-api/services';
import * as RegobsApiModels from '../../regobs-api/models';
import { settings } from '../../../../settings';
import { UserSettingService } from '../../../core/services/user-setting/user-setting.service';
import { LoginService } from '../../../core/services/login/login.service';
import * as moment from 'moment';
import { GeoHazard } from '../../../core/models/geo-hazard.enum';
import { UserSetting } from '../../../core/models/user-settings.model';
import { User } from '../../../core/models/user.model';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NavController } from '@ionic/angular';

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

    this._registrationsObservable = this.getRegistrationsAsObservable();
    this._registrationForCurrentGeoHazardObservable = this.userSettingService.currentGeoHazardObservable$
      .pipe(switchMap((geoHazard) => this.registrations$
        .pipe(map((x) => x.find((item) => item.geoHazard === geoHazard)))));
  }

  saveRegistration(geoHazard: GeoHazard, registration: RegobsApiModels.CreateRegistrationRequestDto) {
    const reg: IRegistration = { geoHazard, ...registration };
    return nSQL().table(NanoSql.TABLES.REGISTRATION.name).query('upsert', reg).emit();
  }

  getCurrentRegistration() {
    return this.registrationForCurrentGeoHazard$.pipe(take(1)).toPromise();
  }

  async createOrGetRegistraionAndRoute() {
    const user = await this.loginService.getLoggedInUser();
    if (!user.isLoggedIn) {
      this.navController.navigateForward('login');
    } else {
      const registration = await this.getCurrentRegistration();
      if (!registration) {
        const userSetting = await this.userSettingService.getUserSettings();
        await this.createRegistration(userSetting, user.user);
        this.navController.navigateForward('registration');
      } else {
        this.navController.navigateForward('registration');
      }
    }
  }

  private getRegistrationsAsObservable() {
    return nSQL().observable<IRegistration[]>(() => {
      return nSQL().table(NanoSql.TABLES.REGISTRATION.name).query('select').emit();
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
      .query('upsert', result);
  }

  private getRegistrationById(regId: number, userSetting: UserSetting) {
    this.searchApiService.rootUrl = settings.services.regObs.apiUrl[userSetting.appMode];
    return this.searchApiService.SearchAll({ RegId: regId }).pipe(map((result) =>
      result.Results[0]
    ));
  }

  private async createRegistration(userSetting: UserSetting, user: User) {
    const currentPosition = await this.geolocation.getCurrentPosition(settings.gps.currentPositionOptions);
    const reg: RegobsApiModels.CreateRegistrationRequestDto = {
      Id: this.createGuid(),
      DtObsTime: moment().toISOString(),
      ObserverGuid: user.Guid,
      GeoHazardTID: this.getApiGeoHazard(userSetting.currentGeoHazard),
      ObsLocation: {
        Latitude: currentPosition.coords.latitude,
        Longitude: currentPosition.coords.longitude,
      }
    };
    return this.saveRegistration(userSetting.currentGeoHazard, reg);
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
