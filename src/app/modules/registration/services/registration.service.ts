import { Injectable } from '@angular/core';
import { IRegistration } from '../models/registration.model';
import { Observable, from, of, combineLatest } from 'rxjs';
import { switchMap, map, take, concatMap, tap } from 'rxjs/operators';
import * as RegobsApi from '../../regobs-api/services';
import * as RegobsApiModels from '../../regobs-api/models';
import { UserSettingService } from '../../../core/services/user-setting/user-setting.service';
import { LoginService } from '../../login/services/login.service';
import moment from 'moment';
import { AppMode } from '../../../core/models/app-mode.enum';
import { IsEmptyHelper } from '../../../core/helpers/is-empty.helper';
import { RegistrationTid } from '../models/registrationTid.enum';
import { DataLoadService } from '../../data-load/services/data-load.service';
import { RegistrationStatus } from '../models/registrationStatus.enum';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { GeoHazard } from '../../../core/models/geo-hazard.enum';
import { toPromiseWithCancel } from '../../../core/helpers/observable-helper';
import { NavController, ModalController } from '@ionic/angular';
import { UserSetting } from '../../../core/models/user-settings.model';
import { LoginModalPage } from '../../login/pages/modal-pages/login-modal/login-modal.page';
import { LoggingService } from '../../shared/services/logging/logging.service';
import { ObservationService } from '../../../core/services/observation/observation.service';
import * as utils from '@nano-sql/core/lib/utilities';
import { LoggedInUser } from '../../login/models/logged-in-user.model';
import { File, FileEntry, IFile } from '@ionic-native/file/ngx';
import { settings } from '../../../../settings';
import { LogLevel } from '../../shared/services/logging/log-level.model';
import { RegistrationRepositoryService } from './registration-repository/registration-repository.service';
import { asyncFilter } from '../../../core/helpers/async-filter';

const DEBUG_TAG = 'RegistrationService';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  public readonly drafts$: Observable<IRegistration[]>;
  public readonly registrations$: Observable<IRegistration[]>;

  constructor(
    private userSettingService: UserSettingService,
    private loginService: LoginService,
    private registrationApiService: RegobsApi.RegistrationService,
    private navController: NavController,
    private modalController: ModalController,
    private dataLoadService: DataLoadService,
    private loggingService: LoggingService,
    private observationService: ObservationService,
    private registrationRepositoryService: RegistrationRepositoryService,
    private httpClient: HttpClient,
    private file: File,
  ) {
    this.registrations$ = this.registrationRepositoryService.registrations$;
    this.drafts$ = this.registrations$.pipe(map((val) => val.filter((item) => item.status === RegistrationStatus.Draft)));
  }

  saveRegistration(appMode: AppMode, registration: IRegistration) {
    this.loggingService.debug(`Save registration`, DEBUG_TAG, registration);
    if (!registration) {
      return;
    }
    registration.changed = moment().unix();
    this.registrationRepositoryService.saveRegistration(appMode, registration);
  }

  async saveRegistrationAsync(registration: IRegistration, clean = false) {
    const appMode = await this.userSettingService.appMode$.pipe(take(1)).toPromise();
    if (clean) {
      await this.cleanupRegistration(registration);
    }
    this.saveRegistration(appMode, registration);
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

  private getRegistrationTids(): RegistrationTid[] {
    return Object.keys(RegistrationTid)
      .map((key) => RegistrationTid[key]).filter((val: RegistrationTid) => typeof (val) !== 'string');
  }

  private async cleanupRegistration(reg: IRegistration) {
    if (reg && reg.request) {
      const registrationTids = this.getRegistrationTids();
      for (const registrationTid of registrationTids) {
        const key = RegistrationTid[registrationTid];
        if (reg.request[key] && this.isEmpty(reg, registrationTid)) {
          reg.request[key] = undefined;
        }
        if (reg.request[key] !== undefined && registrationTid === RegistrationTid.WaterLevel2) {
          this.cleanupWaterLevelMeasurements(reg);
        }
      }
      if (!reg.request.DtObsTime) {
        reg.request.DtObsTime = moment().toISOString(true);
      }
      await this.cleanupImages(reg.request);
    }
    return reg;
  }

  private cleanupWaterLevelMeasurements(reg: IRegistration) {
    if (reg && reg.request && reg.request.WaterLevel2 && reg.request.WaterLevel2.WaterLevelMeasurement) {
      for (const measurement of reg.request.WaterLevel2.WaterLevelMeasurement) {
        if (!IsEmptyHelper.isEmpty(measurement) && !measurement.DtMeasurementTime) {
          // Setting to now if DtMeasurementTime is empty
          measurement.DtMeasurementTime = moment().toISOString(true);
        }
      }
      // Remove array if no elements
      if (IsEmptyHelper.isEmpty(reg.request.WaterLevel2.WaterLevelMeasurement)) {
        reg.request.WaterLevel2.WaterLevelMeasurement = undefined;
      }
    }
  }

  private async cleanupImages(request: RegobsApiModels.CreateRegistrationRequestDto) {
    try {
      if (!request) {
        return;
      }
      if (request.Picture && request.Picture.length > 0) {
        request.Picture = await asyncFilter(request.Picture, (p) => this.isValidPicture(p));
      }
      if (request.DamageObs && request.DamageObs.length > 0) {
        request.DamageObs = (await Promise.all(request.DamageObs.map(async dto => ({
          ...dto,
          Pictures: await asyncFilter(dto.Pictures, (p) => this.isValidPicture(p)),
        }))));
      }
      if (request.WaterLevel2
        && request.WaterLevel2.WaterLevelMeasurement
        && request.WaterLevel2.WaterLevelMeasurement.length > 0) {
        request.WaterLevel2.WaterLevelMeasurement = (await Promise.all(request.WaterLevel2.WaterLevelMeasurement.map(async dto => ({
          ...dto,
          Pictures: await asyncFilter(dto.Pictures, (p) => this.isValidPicture(p)),
        }))));
      }
    } catch (err) {
      this.loggingService.error(err, DEBUG_TAG, 'Could not cleanup images');
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
    return this.getAllPictures(reg.request).filter((p) => p.RegistrationTID === registrationTid);
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

  getType(registrationTid: RegistrationTid): 'array' | 'object' {
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

  // TODO: Move this to login service
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

  async sendRegistration(appMode: AppMode, reg: IRegistration) {
    const loggedInUser = await this.getLoggedInUser();
    if (loggedInUser) {
      reg.request.ObserverGuid = loggedInUser.Guid;
      reg.status = RegistrationStatus.Sync;
      this.saveRegistration(appMode, reg);
      this.syncRegistrations();
      this.navController.navigateRoot('my-observations');
    }
  }

  private getDataLoadId(appMode: AppMode) {
    return `registration_${appMode}`;
  }

  getDataLoadState() {
    return this.userSettingService.userSetting$.pipe(switchMap((userSetting) =>
      this.dataLoadService.getStateAsObservable(this.getDataLoadId(userSetting.appMode))));
  }

  async syncRegistrations(cancel?: Promise<any>) {
    let cancelled = false;
    if (cancel) {
      cancel.then(() => {
        cancelled = true;
      });
    }
    const userSettings = await this.userSettingService.userSetting$.pipe(take(1)).toPromise();
    const dataLoadId = this.getDataLoadId(userSettings.appMode);
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
        await this.cleanupRegistration(registration);
        registration.request.Email = userSetting.emailReceipt;
        const createRegistrationResult = await this.postRegistration(userSetting.appMode, registration, cancel);
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
          this.saveRegistration(userSetting.appMode, registration);
        } else {
          this.loggingService.error(ex, 'Got ${httpError.status} when sending registration', DEBUG_TAG, registration);
          registration.error = { status: httpError.status, message: httpError.statusText };
          this.saveRegistration(userSetting.appMode, registration);
        }
      } else {
        // Another unknown error
        this.loggingService.error(ex, 'Error when sending registration', DEBUG_TAG, registration);
        registration.error = { status: 500, message: ex.message || '' };
        this.saveRegistration(userSetting.appMode, registration);
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
    return this.registrationRepositoryService.deleteRegistrationById(appMode, id);
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

  private postRegistration(appMode: AppMode, registration: IRegistration, cancel?: Promise<void>) {
    const uploadProcess$ = this.uploadAttachments(registration.request).pipe(
      tap(() => this.loggingService.debug(`Upload attachments complete. Registration is:`, DEBUG_TAG, registration)),
      concatMap(() => of(this.saveRegistration(appMode, registration))), // Save updated picture dtos with attachment id
      concatMap(() => this.registrationApiService.RegistrationInsert(registration.request)
      ));
    return toPromiseWithCancel(uploadProcess$, cancel);
  }

  private uploadAttachments(registration: RegobsApiModels.CreateRegistrationRequestDto): Observable<RegobsApiModels.PictureRequestDto[]> {
    this.loggingService.debug('Start upload attachments', DEBUG_TAG, registration);
    const attachments = this.getAllPictures(registration);
    if (attachments.length === 0) {
      return of([]);
    }
    return combineLatest(attachments.map((p) => this.uploadAttachment(p)));
  }

  getAllPictures(registration: RegobsApiModels.CreateRegistrationRequestDto) {
    let pictures = registration.Picture || [];
    if (registration.DamageObs && registration.DamageObs.length > 0) {
      const damageObsPictures = registration.DamageObs.map((val) => val.Pictures || []);
      pictures = pictures.concat(...damageObsPictures);
    }
    if (registration.WaterLevel2
      && registration.WaterLevel2.WaterLevelMeasurement
      && registration.WaterLevel2.WaterLevelMeasurement.length > 0) {
      const waterLevelPictures = registration.WaterLevel2.WaterLevelMeasurement.map((val) => val.Pictures || []);
      pictures = pictures.concat(...waterLevelPictures);
    }
    return pictures;
  }

  private async getFile(fileUrl: string): Promise<IFile> {
    const entry = await this.file.resolveLocalFilesystemUrl(fileUrl);
    if (!entry.isFile) {
      throw Error(`${fileUrl} is not a file!`);
    }
    const fileEntry: FileEntry = entry as FileEntry;
    return new Promise((resolve, reject) =>
      fileEntry.file((success) => resolve(success), (error) => reject(error)));
  }

  private isBase64Picture(pictureRequest: RegobsApiModels.PictureRequestDto) {
    return pictureRequest && pictureRequest.PictureImageBase64 &&
      pictureRequest.PictureImageBase64.startsWith('data:');
  }

  private async isValidPicture(pictureRequest: RegobsApiModels.PictureRequestDto): Promise<boolean> {
    if (pictureRequest) {
      if (pictureRequest.AttachmentUploadId || this.isBase64Picture(pictureRequest)) {
        return true;
      }
      try {
        const file = await this.getFile(pictureRequest.PictureImageBase64);
        return !!file;
      } catch (err) {
        this.loggingService.log('Picture request has a file that is missing. Skip this picture.', err, LogLevel.Error, DEBUG_TAG);
      }
    }
    return false;
  }

  private uploadAttachment(pictureRequest: RegobsApiModels.PictureRequestDto): Observable<RegobsApiModels.PictureRequestDto> {
    const shouldUploadAttachment =
      !pictureRequest.AttachmentUploadId &&
      pictureRequest.PictureImageBase64 &&
      !this.isBase64Picture(pictureRequest);

    if (shouldUploadAttachment) {
      const file$ = from(this.getFile(pictureRequest.PictureImageBase64));
      return file$.pipe(
        tap((file) => this.loggingService.debug(`Found image file blob`, DEBUG_TAG, file)),
        concatMap((file) => this.getFormDataAndUploadToApi(file)),
        map((attachmentId) => {
          this.loggingService.debug(`Result from upload attachment: ${attachmentId}`, DEBUG_TAG);
          pictureRequest.AttachmentUploadId = attachmentId;
          this.loggingService.debug(`Updated attachment id ${attachmentId} for picture request`, DEBUG_TAG, pictureRequest);
          return pictureRequest;
        }),
        concatMap(() => from(this.deleteFile(pictureRequest.PictureImageBase64))),
        map(() => {
          pictureRequest.PictureImageBase64 = undefined; // Attachment upload ok. Clear local file.
          return pictureRequest;
        }));
    }
    return of(pictureRequest);
  }

  private async deleteFile(src: string) {
    try {
      const entry = await this.file.resolveLocalFilesystemUrl(src);
      await new Promise((resolve, reject) => entry.remove(resolve, reject));
      this.loggingService.debug(`Observation image deleted from presistant app storage: ${src}`, DEBUG_TAG);
    } catch (err) {
      this.loggingService.log('Could not delete image', err, LogLevel.Warning, DEBUG_TAG);
    }
  }

  private getFormDataFromFile(file: IFile) {
    return from(this.fileToBlob(file)).pipe(map((blob) => {
      const formData = new FormData();
      formData.append('file', blob, file.name);
      return formData;
    }));
  }

  private fileToBlob(file: IFile): Promise<Blob> {
    return new Promise<Blob>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(new Blob([reader.result], { type: file.type }));
      reader.onerror = (e) => reject(e);
      reader.readAsArrayBuffer(file);
    });
  }

  private getFormDataAndUploadToApi(file: IFile): Observable<string> {
    const formData$ = this.getFormDataFromFile(file);
    return combineLatest([this.userSettingService.appMode$, formData$])
      .pipe(
        tap(([appMode, formData]) => this.loggingService.debug(`Got form data`, DEBUG_TAG, appMode, formData)),
        concatMap(([appMode, formData]) =>
          this.uploadAttachmentToApi(appMode, formData)
        ));
  }

  private uploadAttachmentToApi(appMode: AppMode, data: FormData) {
    const rootUrl = settings.services.regObs.apiUrl[appMode];
    return this.httpClient.post<string>(`${rootUrl}/Attachment/Upload`, data);
  }
}
