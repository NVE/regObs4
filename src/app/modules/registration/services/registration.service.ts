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
import { LoginService } from '../../login/services/login.service';
import * as moment from 'moment';
import { AppMode } from '../../../core/models/app-mode.enum';
import { IsEmptyHelper } from '../../../core/helpers/is-empty.helper';
import { RegistrationTid } from '../models/registrationTid.enum';
import { RegistrationTypes } from '../models/registrationTypes.enum';
import { DataLoadService } from '../../data-load/services/data-load.service';
import { RegistrationStatus } from '../models/registrationStatus.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { GeoHazard } from '../../../core/models/geo-hazard.enum';
import { ObservableHelper } from '../../../core/helpers/observable-helper';
import { NavController, ModalController } from '@ionic/angular';
import { UserSetting } from '../../../core/models/user-settings.model';
import { GuidHelper } from '../../../core/helpers/guid.helper';
import { LoginModalPage } from '../../login/pages/modal-pages/login-modal/login-modal.page';
import { LoggingService } from '../../shared/services/logging/logging.service';
import { ObservationService } from '../../../core/services/observation/observation.service';

const DEBUG_TAG = 'RegistrationService';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private _registrationsObservable: Observable<IRegistration[]>;
  private _draftsObservable: Observable<IRegistration[]>;

  get registrations$() {
    return this._registrationsObservable;
  }

  get drafts$() {
    return this._draftsObservable;
  }

  constructor(
    private userSettingService: UserSettingService,
    private loginService: LoginService,
    private registrationApiService: RegobsApi.RegistrationService,
    private searchApiService: RegobsApi.SearchService,
    private navController: NavController,
    private modalController: ModalController,
    private dataLoadService: DataLoadService,
    private loggingService: LoggingService,
    private observationService: ObservationService,
  ) {

    this._registrationsObservable = this.userSettingService.appMode$
      .pipe(switchMap((appMode) => this.getRegistrationsAsObservable(appMode)));
    this._draftsObservable = this.registrations$.pipe(map((val) => val.filter((item) => item.status === RegistrationStatus.Draft)));
  }

  async saveRegistration(registration: IRegistration): Promise<number> {
    this.cleanupRegistration(registration);
    registration.changed = moment().unix();
    const userSettings = await this.userSettingService.getUserSettings();
    const result = await NanoSql.getInstance(NanoSql.TABLES.REGISTRATION.name, userSettings.appMode)
      .query('upsert', registration).exec();
    return result[0].affectedRowPKS[0];
  }

  async createNewRegistration(geoHazard?: GeoHazard) {
    const userSettings = await this.userSettingService.getUserSettings();
    const loggedInUser = await this.loginService.getLoggedInUser();
    const geoHazardToUse = geoHazard ? geoHazard : userSettings.currentGeoHazard[0];
    const newId = GuidHelper.createGuid();
    const reg: IRegistration = {
      geoHazard: geoHazardToUse,
      changed: moment().unix(),
      status: RegistrationStatus.Draft,
      request: {
        Id: newId,
        ObserverGuid: loggedInUser.isLoggedIn ? loggedInUser.user.Guid : null,
        DtObsTime: null,
        GeoHazardTID: geoHazardToUse
      }
    };
    return reg;
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

  private async getLoggedInUser() {
    const loggedInUser = await this.loginService.getLoggedInUser();
    if (loggedInUser && !loggedInUser.isLoggedIn) {
      const loginModal = await this.modalController.create({
        component: LoginModalPage
      });
      loginModal.present();
      const result = await loginModal.onDidDismiss();
      if (result.data) {
        const loggedInUserAfterModal = await this.loginService.getLoggedInUser();
        return loggedInUserAfterModal.user;
      } else {
        return null;
      }
    } else {
      return loggedInUser.user;
    }
  }

  async sendRegistration(reg: IRegistration) {
    const loggedInUser = await this.getLoggedInUser();
    if (loggedInUser) {
      reg.request.ObserverGuid = loggedInUser.Guid;
      reg.status = RegistrationStatus.Sync;
      await this.saveRegistration(reg);
      this.syncRegistrations();
      this.navController.navigateRoot('my-observations');
    }
  }

  private getDataLoadId(appMode: AppMode) {
    return `registration_${appMode}`;
  }

  getDataLoadState() {
    return this.userSettingService.userSettingObservable$.pipe(switchMap((userSetting) =>
      this.dataLoadService.getStateAsObservable(this.getDataLoadId(userSetting.appMode))));
  }

  async syncRegistrations(cancel?: Promise<any>) {
    let cancelled = false;
    if (cancel) {
      cancel.then(() => {
        cancelled = true;
      });
    }
    const userSettings = await this.userSettingService.getUserSettings();
    const appMode = userSettings.appMode;
    const registrationsToSync = await this.getRegistrationsToSync().pipe(take(1)).toPromise();
    if (registrationsToSync.length > 0) {
      const dataLoadId = this.getDataLoadId(appMode);
      try {
        this.dataLoadService.startLoading(dataLoadId, registrationsToSync.length);
        let itemCompleted = 0;
        for (const registration of registrationsToSync) {
          if (!cancelled) {
            await this.syncRegistration(registration, userSettings, cancel);
            itemCompleted++;
            this.dataLoadService.updateProgress(dataLoadId, itemCompleted, registrationsToSync.length);
          } else {
            throw Error('Operation cancelled');
          }
        }
        await this.dataLoadService.loadingCompleted(dataLoadId);
      } catch (err) {
        await this.dataLoadService.loadingError(dataLoadId, err.message);
      }
    }
  }

  private async syncRegistration(registration: IRegistration, userSetting: UserSetting, cancel?: Promise<void>) {
    try {
      this.cleanupRegistration(registration);
      registration.request.Email = userSetting.emailReciept;
      const createRegistrationResult = await this.postRegistration(userSetting.appMode, registration.request, cancel);
      const newRegistration = await this.updateRegistrationById(createRegistrationResult.RegId, userSetting.appMode);
      await this.deleteRegistrationById(userSetting.appMode, registration.id);
      return newRegistration;
    } catch (ex) {
      if (ex instanceof HttpErrorResponse) {
        const httpError: HttpErrorResponse = ex;
        this.loggingService.debug('Could not sync registration', DEBUG_TAG, registration, ex);
        if (httpError.status === 409) { // Duplicate, remove
          await this.deleteRegistrationById(userSetting.appMode, registration.id);
          // Updating latest user registration since we don't have an ID for the duplicate
          await this.updateLatestUserRegistrations(cancel);
        } else if (httpError.status === 400) {
          // Model error, something is not correct from app. Please review ModelState error!
          this.loggingService.error(ex, 'Got 400 BadRequest when sending registration', DEBUG_TAG, registration);
          registration.error = { status: httpError.status, message: this.getErrorsFromBadRequest(httpError) };
          await this.saveRegistration(registration);
        } else {
          this.loggingService.error(ex, 'Got ${httpError.status} when sending registration', DEBUG_TAG, registration);
          registration.error = { status: httpError.status, message: httpError.statusText };
          await this.saveRegistration(registration);
        }
      } else {
        // Another unknown error
        this.loggingService.error(ex, 'Error when sending registration', DEBUG_TAG, registration);
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

  deleteRegistrationById(appMode: AppMode, id: number) {
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

  getSavedRegistrationById(id: number) {
    return this.getSavedRegistrationByIdObservable(id)
      .pipe(take(1)).toPromise();
  }

  getSavedRegistrationByIdObservable(id: number) {
    return this.registrations$
      .pipe(map((items) => items.find((x) => x.id === id)));
  }

  private postRegistration(appMode: AppMode, registration: RegobsApiModels.CreateRegistrationRequestDto, cancel?: Promise<void>) {
    this.registrationApiService.rootUrl = settings.services.regObs.apiUrl[appMode];
    return ObservableHelper.toPromiseWithCancel(this.registrationApiService.RegistrationInsert(registration), cancel);
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

  private async updateLatestUserRegistrations(cancel?: Promise<any>) {
    const user = await this.loginService.getLoggedInUser();
    if (user.isLoggedIn) {
      const userSettings = await this.userSettingService.getUserSettings();
      return this.observationService.updateObservationsForCurrentUser(userSettings.appMode, user.user, userSettings.language, 0, cancel);
    }
  }
}
