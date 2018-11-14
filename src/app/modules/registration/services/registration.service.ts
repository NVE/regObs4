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
    this.cleanupRegistration(registration);
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
    const newId = this.createGuid();
    const reg: IRegistration = {
      id: newId,
      geoHazard: userSettings.currentGeoHazard,
      changed: moment().unix(),
      status: RegistrationStatus.Draft,
      request: {
        Id: newId, ObserverGuid: loggedInUser.user.Guid,
        DtObsTime: null,
        GeoHazardTID: <any>GeoHazard[userSettings.currentGeoHazard]
      }
    };
    return reg;
  }

  getCurrentRegistration() {
    return this.registrationForCurrentGeoHazard$.pipe(take(1)).toPromise();
  }

  async hasChanged(reg: IRegistration, currentRegistration?: IRegistration) {
    const current = currentRegistration || (await this.getCurrentRegistration());
    if (current) {
      return !is(fromJS(current.request), fromJS(reg.request));
    } else {
      return !IsEmptyHelper.isEmpty(reg);
    }
  }

  cleanupRegistration(reg: IRegistration) {
    const registrationTids: RegistrationTid[] = Object.keys(RegistrationTypes)
      .map((key) => RegistrationTid[key]).filter((val) => val !== undefined);
    for (const registrationTid of registrationTids) {
      const key = RegistrationTid[registrationTid];
      if (reg.request[key] && this.isEmpty(reg, registrationTid)) {
        reg.request[key] = undefined;
      }
    }
    return reg;
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
    const pictures = (reg.request.Picture || []).filter((p) => p.RegistrationTID === registrationTid);
    if (registrationTid === RegistrationTid.DamageObs) {
      for (const damageObs of (reg.request.DamageObs || [])) {
        pictures.push(...(damageObs.Pictures || []));
      }
    }
    return pictures;
  }

  getRegistationProperty(reg: IRegistration, registrationTid: RegistrationTid) {
    if (reg && reg.request && registrationTid) {
      return reg.request[this.getPropertyName(registrationTid)];
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
        this.navController.navigateForward('registration/edit/' + registration.id);
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
      // throw new HttpErrorResponse({ error: Error('test'), status: 500 });
      this.cleanupRegistration(registration);
      const createRegistrationResult = await this.postRegistration(appMode, registration.request);
      const newRegistration = await this.updateRegistrationById(createRegistrationResult.RegId, appMode);
      await this.deleteRegistrationById(appMode, registration.id);
      return newRegistration;
    } catch (ex) {
      if (ex instanceof HttpErrorResponse) {
        const httpError: HttpErrorResponse = ex;
        console.warn('Could not sync registration', registration, ex);
        if (httpError.status === 409) { // Duplicate, remove
          await this.deleteRegistrationById(appMode, registration.id);
          // Updating latest user registration since we don't have an ID for the duplicate
          await this.updateLatestUserRegistrations();
        } else if (httpError.status === 400) {
          // Model error, something is not correct from app. Please review ModelState error!
          console.error(ex); // TODO: Log exception if not 400 Bad request
          registration.error = { status: httpError.status, message: this.getErrorsFromBadRequest(httpError) };
          await this.saveRegistration(registration); // save error message
        } else {
          console.error(ex); // TODO: Log exception if not 400 Bad request
          registration.error = { status: httpError.status, message: httpError.statusText };
          await this.saveRegistration(registration); // save error message
        }
      } else {
        // Another unknown error
        console.error(ex); // TODO: Log exception
        registration.error = { status: 500, message: ex.message || '' };
        await this.saveRegistration(registration);
      }
    }
  }

  private getErrorsFromBadRequest(httpError: HttpErrorResponse) {
    const errors: Array<string> = [];
    if (httpError && httpError.error && httpError.error.ModelState) {
      Object.keys(httpError.error.ModelState).forEach((key) => {
        const err: Array<string> = httpError.error.ModelState[key];
        errors.push(...err);
      });
    } else if (httpError && httpError.error && httpError.error.ExceptionMessage) {
      errors.push(httpError.error.ExceptionMessage);
    }
    return errors.join(', ');
  }

  deleteRegistrationById(appMode: AppMode, id: string) {
    return NanoSql.getInstance(NanoSql.TABLES.REGISTRATION.name, appMode)
      .query('delete').where(['id', '=', id]).exec();
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
      .pipe(map((items) => items.find((x) => x.id === id)));
  }

  private async postRegistration(appMode: AppMode, registration: RegobsApiModels.CreateRegistrationRequestDto) {
    this.registrationApiService.rootUrl = settings.services.regObs.apiUrl[appMode];
    return this.registrationApiService.RegistrationInsert(registration).toPromise();
  }

  private async updateRegistrationById(regId: number, appMode: AppMode) {
    const result = await this.getRegistrationByRegIdFromApi(regId, appMode).toPromise();
    await NanoSql.getInstance(NanoSql.TABLES.OBSERVATION.name, appMode)
      .query('upsert', result).exec();
    return result;
  }

  private getRegistrationByRegIdFromApi(regId: number, appMode: AppMode) {
    this.searchApiService.rootUrl = settings.services.regObs.apiUrl[appMode];
    return this.searchApiService.SearchAll({ RegId: regId }).pipe(map((result) =>
      result[0]
    ));
  }

  private async updateLatestUserRegistrations() {
    const user = await this.loginService.getLoggedInUser();
    if (user.isLoggedIn) {
      const userSettings = await this.userSettingService.getUserSettings();
      const result = await this.getLatestRegistrationsForUserFromApi(userSettings.appMode, user.user.Guid).toPromise();
      await NanoSql.getInstance(NanoSql.TABLES.OBSERVATION.name, userSettings.appMode)
        .loadJS(NanoSql.getInstanceName(NanoSql.TABLES.OBSERVATION.name, userSettings.appMode), result);
    }
  }

  private getLatestRegistrationsForUserFromApi(appMode: AppMode, userGuid: string) {
    this.searchApiService.rootUrl = settings.services.regObs.apiUrl[appMode];
    return this.searchApiService.SearchAll({ ObserverGuid: userGuid, NumberOfRecords: 10 });
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
