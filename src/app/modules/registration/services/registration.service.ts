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
import { AppMode } from '../../../core/models/app-mode.enum';
import { IsEmptyHelper } from '../../../core/helpers/is-empty.helper';
import { RegistrationTid } from '../models/registrationTid.enum';
import { RegistrationTypes } from '../models/registrationTypes.enum';
import { DataLoadService } from '../../data-load/services/data-load.service';
import { RegistrationStatus } from '../models/registrationStatus.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { GeoHazard } from '../../../core/models/geo-hazard.enum';
import { ObservableHelper } from '../../../core/helpers/observable-helper';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

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
    private router: Router,
    private dataLoadService: DataLoadService,
  ) {

    this._registrationsObservable = this.userSettingService.userSettingObservable$
      .pipe(switchMap((userSettings) => this.getRegistrationsAsObservable(userSettings.appMode)));
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
    const newId = this.createGuid();
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

  // getCurrentRegistration() {
  //   return this.registrationForCurrentGeoHazard$.pipe(take(1)).toPromise();
  // }

  // async hasChanged(reg: IRegistration, currentRegistration?: IRegistration) {
  //   const current = currentRegistration || (await this.getCurrentRegistration());
  //   if (current) {
  //     return !is(fromJS(current.request), fromJS(reg.request));
  //   } else {
  //     return !IsEmptyHelper.isEmpty(reg);
  //   }
  // }

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

  async sendRegistration(reg: IRegistration) {
    const loggedInUser = await this.loginService.getLoggedInUser();
    if (!loggedInUser.isLoggedIn) {
      this.router.navigate(['login'], {
        queryParams: {
          sendRegistrationId: reg.id
        }
      });
    } else {
      reg.request.ObserverGuid = loggedInUser.user.Guid;
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
            await this.syncRegistration(registration, appMode, cancel);
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

  private async syncRegistration(registration: IRegistration, appMode: AppMode, cancel?: Promise<void>) {
    try {
      this.cleanupRegistration(registration);
      const createRegistrationResult = await this.postRegistration(appMode, registration.request, cancel);
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

  deleteRegistrationById(appMode: AppMode, id: number) {
    const result = NanoSql.getInstance(NanoSql.TABLES.REGISTRATION.name, appMode)
      .query('delete').where(['id', '=', id]).exec();
    console.log(`[INFO][RegistrationService] Delete registration by id: ${id}. AppMode: ${appMode} Result: `, result);
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

  private async updateLatestUserRegistrations() {
    const user = await this.loginService.getLoggedInUser();
    if (user.isLoggedIn) {
      const userSettings = await this.userSettingService.getUserSettings();
      const result = await this.getLatestRegistrationsForUserFromApi(userSettings.appMode, user.user.Guid).toPromise();
      await NanoSql.getInstance(NanoSql.TABLES.OBSERVATION.name, userSettings.appMode)
        .loadJS(NanoSql.getInstanceName(NanoSql.TABLES.OBSERVATION.name, userSettings.appMode), result, false);
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
