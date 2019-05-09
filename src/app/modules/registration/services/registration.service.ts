import { Injectable } from '@angular/core';
import { NanoSql } from '../../../../nanosql';
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
import { DataLoadService } from '../../data-load/services/data-load.service';
import { RegistrationStatus } from '../models/registrationStatus.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { GeoHazard } from '../../../core/models/geo-hazard.enum';
import { ObservableHelper } from '../../../core/helpers/observable-helper';
import { NavController, ModalController } from '@ionic/angular';
import { UserSetting } from '../../../core/models/user-settings.model';
import { LoginModalPage } from '../../login/pages/modal-pages/login-modal/login-modal.page';
import { LoggingService } from '../../shared/services/logging/logging.service';
import { ObservationService } from '../../../core/services/observation/observation.service';
import { NanoSqlObservableHelper } from '../../../core/helpers/nano-sql/nanoObserverToRxjs';
import * as utils from '@nano-sql/core/lib/utilities';
import { LoggedInUser } from '../../login/models/logged-in-user.model';

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

  async saveRegistration(registration: IRegistration): Promise<string> {
    if (!registration) {
      return null;
    }
    this.cleanupRegistration(registration);
    registration.changed = moment().unix();
    const userSettings = await this.userSettingService.getUserSettings();
    const result = await NanoSql.getInstance(NanoSql.TABLES.REGISTRATION.name, userSettings.appMode)
      .query('upsert', registration).exec();
    return (result[0] as IRegistration).id;
  }

  createNewRegistration(geoHazard: GeoHazard, loggedInUser: LoggedInUser) {
    const newId = utils.uuid();
    const reg: IRegistration = {
      id: newId,
      geoHazard,
      changed: moment().unix(),
      status: RegistrationStatus.Draft,
      request: {
        Id: newId,
        ObserverGuid: loggedInUser.isLoggedIn ? loggedInUser.user.Guid : null,
        DtObsTime: null,
        GeoHazardTID: geoHazard
      }
    };
    return reg;
  }

  getRegistrationTids(): RegistrationTid[] {
    return Object.keys(RegistrationTid)
      .map((key) => RegistrationTid[key]).filter((val: RegistrationTid) => typeof (val) !== 'string');
  }

  cleanupRegistration(reg: IRegistration) {
    if (reg && reg.request) {
      const registrationTids = this.getRegistrationTids();
      for (const registrationTid of registrationTids) {
        const key = RegistrationTid[registrationTid];
        if (reg.request[key] && this.isEmpty(reg, registrationTid)) {
          reg.request[key] = undefined;
        }
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

  isRegistrationEmpty(reg: IRegistration) {
    const registrationTids = this.getRegistrationTids();
    const hasAnyValues = registrationTids.some((x) => !this.isEmpty(reg, x));
    return !hasAnyValues;
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
    const arrays = [
      RegistrationTid.DangerObs,
      RegistrationTid.AvalancheActivityObs,
      RegistrationTid.AvalancheActivityObs2,
      RegistrationTid.AvalancheDangerObs,
      RegistrationTid.AvalancheEvalProblem2,
      RegistrationTid.CompressionTest,
      RegistrationTid.Picture,
      RegistrationTid.DamageObs,
    ];
    return arrays.indexOf(registrationTid) >= 0 ? 'array' : 'object';
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
      this.saveRegistration(reg).then(() => this.syncRegistrations());
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
    const dataLoadId = this.getDataLoadId(appMode);
    const dataLoad = await this.dataLoadService.getState(dataLoadId);
    const isLoadingTimeout = moment().subtract(30, 'seconds');
    if (dataLoad.isLoading && moment(dataLoad.startedDate).isAfter(isLoadingTimeout)) {
      // Is allready syncing, return
      return;
    }

    const registrationsToSync = await this.getRegistrationsToSync().pipe(take(1)).toPromise();
    if (registrationsToSync.length > 0) {
      try {
        await this.dataLoadService.startLoading(dataLoadId, registrationsToSync.length);
        let itemCompleted = 0;
        for (const registration of registrationsToSync) {
          if (!cancelled) {
            await this.syncRegistration(registration, userSettings, cancel);
            itemCompleted++;
            await this.dataLoadService.updateProgress(dataLoadId, itemCompleted, registrationsToSync.length);
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
      if (registration.request) {
        this.cleanupRegistration(registration);
        registration.request.Email = userSetting.emailReceipt;
        const createRegistrationResult = await this.postRegistration(registration.request, cancel);
        await this.observationService.updateObservationById(
          createRegistrationResult.RegId,
          userSetting.appMode,
          userSetting.language, userSetting.currentGeoHazard);
      }
      await this.deleteRegistrationById(userSetting.appMode, registration.id);
    } catch (ex) {
      if (ex instanceof HttpErrorResponse) {
        const httpError: HttpErrorResponse = ex;
        this.loggingService.debug('Could not sync registration', DEBUG_TAG, registration, ex);
        if (httpError.status === 409) { // Duplicate, remove
          await this.deleteRegistrationById(userSetting.appMode, registration.id);
          // Updating latest user registration since we don't have an ID for the duplicate
          // await this.updateLatestUserRegistrations(cancel);
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

  deleteRegistrationById(appMode: AppMode, id: string) {
    return NanoSql.getInstance(NanoSql.TABLES.REGISTRATION.name, appMode)
      .query('delete').where(['id', '=', id]).exec();
  }

  private getRegistrationsAsObservable(appMode: AppMode) {
    return NanoSqlObservableHelper.toRxJS<IRegistration[]>(
      NanoSql.getInstance(NanoSql.TABLES.REGISTRATION.name, appMode).query('select')
        .listen()).pipe(shareReplay(1));
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

  private postRegistration(registration: RegobsApiModels.CreateRegistrationRequestDto, cancel?: Promise<void>) {
    return ObservableHelper.toPromiseWithCancel(this.registrationApiService.RegistrationInsert(registration), cancel);
  }

  // private async updateLatestUserRegistrations(cancel?: Promise<any>) {
  //   const user = await this.loginService.getLoggedInUser();
  //   if (user.isLoggedIn) {
  //     const userSettings = await this.userSettingService.getUserSettings();
  //     return this.observationService.updateObservationsForCurrentUser(userSettings.appMode, user.user, userSettings.language, 0, cancel);
  //   }
  // }
}
