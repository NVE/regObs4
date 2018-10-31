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
import { NavController } from '@ionic/angular';
import { AppMode } from '../../../core/models/app-mode.enum';
import { IsEmptyHelper } from '../../../core/helpers/is-empty.helper';
import { fromJS, Map, is } from 'immutable';
import { RegistrationTid } from '../models/registrationTid.enum';
import { RegistrationTypes } from '../models/registrationTypes.enum';
import { DataLoadService } from '../../data-load/services/data-load.service';
import { RegistrationStatus } from '../models/registrationStatus.enum';
import { HttpErrorResponse } from '@angular/common/http';

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
    private navController: NavController,
    private dataLoadService: DataLoadService,
  ) {

    this._registrationsObservable = this.userSettingService.userSettingObservable$
      .pipe(switchMap((userSettings) => this.getRegistrationsAsObservable(userSettings.appMode)));
    this._registrationForCurrentGeoHazardObservable = this.userSettingService.currentGeoHazardObservable$
      .pipe(switchMap((geoHazard) => this.registrations$
        .pipe(map((registraions) => registraions.find((item) => item.geoHazard === geoHazard
          && item.status === RegistrationStatus.Draft)))));
  }

  async saveRegistration(registration: IRegistration) {
    registration.changed = moment().unix();
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
      changed: moment().unix(),
      Id: this.createGuid(),
      ObserverGuid: loggedInUser.user.Guid,
      DtObsTime: null,
      GeoHazardTID: this.getApiGeoHazard(userSettings.currentGeoHazard),
      status: RegistrationStatus.Draft
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

  isEmpty(reg: IRegistration, registrationTid: RegistrationTid) {
    if (reg && registrationTid) {
      const isRegistrationEmpty = IsEmptyHelper.isEmpty(this.getRegistationProperty(reg, registrationTid));
      const hasImages = this.hasImages(reg, registrationTid);
      if (isRegistrationEmpty && !hasImages) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }

  hasImages(reg: IRegistration, registrationTid: RegistrationTid) {
    return this.getImages(reg, registrationTid).length > 0;
  }

  getImages(reg: IRegistration, registrationTid: RegistrationTid) {
    if (!reg) {
      return [];
    }
    const pictures = (reg.Picture || []).filter((p) => p.RegistrationTID === registrationTid);
    if (registrationTid === RegistrationTid.DamageObs) {
      for (const damageObs of (reg.DamageObs || [])) {
        pictures.push(...(damageObs.Pictures || []));
      }
    }
    return pictures;
  }

  getRegistationProperty(reg: IRegistration, registrationTid: RegistrationTid) {
    if (reg && registrationTid) {
      return reg[this.getPropertyName(registrationTid)];
    }
    return null;
  }

  getPropertyName(registrationTid: RegistrationTid) {
    return RegistrationTid[registrationTid];
  }

  getType(registrationTid: RegistrationTid) {
    return RegistrationTypes[RegistrationTid[registrationTid]];
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
        this.navController.navigateForward('registration/edit/' + registration.Id);
      }
    }
  }

  async sendRegistration(reg: IRegistration) {
    reg.status = RegistrationStatus.Sync;
    await this.saveRegistration(reg);
    this.syncRegistrations();
    this.navController.navigateRoot('my-observations');
  }

  private getDataLoadId(appMode: AppMode) {
    return `registration_${appMode}`;
  }

  getDataLoadState() {
    return this.userSettingService.userSettingObservable$.pipe(switchMap((userSetting) =>
      this.dataLoadService.getStateAsObservable(this.getDataLoadId(userSetting.appMode))));
  }

  async syncRegistrations() {
    const userSettings = await this.userSettingService.getUserSettings();
    const appMode = userSettings.appMode;
    const registrationsToSync = await this.getRegistrationsToSync().pipe(take(1)).toPromise();
    if (registrationsToSync.length > 0) {
      const dataLoadId = this.getDataLoadId(appMode);
      this.dataLoadService.startLoading(dataLoadId, registrationsToSync.length);
      let itemCompleted = 0;
      for (const registration of registrationsToSync) {
        await this.syncRegistration(registration, appMode);
        itemCompleted++;
        this.dataLoadService.updateProgress(dataLoadId, itemCompleted, registrationsToSync.length);
      }
      await this.dataLoadService.loadingCompleted(dataLoadId);
    }
  }

  private async syncRegistration(registration: IRegistration, appMode: AppMode) {
    try {
      throw new HttpErrorResponse({ error: Error('test'), status: 500 });
      // await this.postRegistration(appMode, registration);
      // await this.deleteRegistrationById(appMode, registration.Id);
    } catch (ex) {
      if (ex instanceof HttpErrorResponse) {
        const httpError: HttpErrorResponse = ex;
        console.warn('Could not sync registration', registration, ex);
        if (httpError.status === 409) { // Duplicate, remove
          await this.deleteRegistrationById(appMode, registration.Id);
        } else {
          registration.error = { status: httpError.status, message: httpError.message };
          await this.saveRegistration(registration);
        }
      } else {
        console.error(ex); // TODO: Log exception
        registration.error = { status: 500, message: ex.message || '' };
        await this.saveRegistration(registration);
      }
    }
  }

  deleteRegistrationById(appMode: AppMode, id: string) {
    return NanoSql.getInstance(NanoSql.TABLES.REGISTRATION.name, appMode)
      .query('delete').where(['Id', '=', id]).exec();
  }

  private getRegistrationsAsObservable(appMode: AppMode) {
    return nSQL().observable<IRegistration[]>(() => {
      return NanoSql.getInstance(NanoSql.TABLES.REGISTRATION.name, appMode).query('select').emit();
    }).toRxJS().pipe(shareReplay(1));
  }

  getRegistrationsToSync() {
    return this.registrations$
      .pipe(map((items) => items.filter((x) => x.status === RegistrationStatus.Sync)));
  }

  getSavedRegistrationById(id: string) {
    return this.getSavedRegistrationByIdObservable(id)
      .pipe(take(1)).toPromise();
  }

  getSavedRegistrationByIdObservable(id: string) {
    return this.registrations$
      .pipe(map((items) => items.find((x) => x.Id === id)));
  }

  private async postRegistration(appMode: AppMode, registration: RegobsApiModels.CreateRegistrationRequestDto) {
    this.registrationApiService.rootUrl = settings.services.regObs.apiUrl[appMode];
    const result = await this.registrationApiService.RegistrationInsert(registration).pipe(switchMap((resp) => {
      return this.getRegistrationByIdFromApi(resp.RegId, appMode);
    })).toPromise(); // TODO: Set timeout
    await NanoSql.getInstance(NanoSql.TABLES.OBSERVATION.name, appMode)
      .query('upsert', result).exec();
  }

  private getRegistrationByIdFromApi(regId: number, appMode: AppMode) {
    this.searchApiService.rootUrl = settings.services.regObs.apiUrl[appMode];
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
