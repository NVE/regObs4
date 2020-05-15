import { Injectable } from '@angular/core';
import { IRegistration } from '../../models/registration.model';
import { BehaviorSubject, Observable, from, combineLatest, of } from 'rxjs';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { NanoSql } from '../../../../../nanosql';
import { AppMode } from '../../../../core/models/app-mode.enum';
import { switchMap, map, shareReplay, takeUntil, concatMap, tap, take, catchError, debounceTime } from 'rxjs/operators';
import { NgDestoryBase } from '../../../../core/helpers/observable-helper';
import { LoggingService } from '../../../shared/services/logging/logging.service';
import { LogLevel } from '../../../shared/services/logging/log-level.model';
import { OnReset } from '../../../shared/interfaces/on-reset.interface';

const DEBUG_TAG = 'RegistrationRepositoryService';

@Injectable({
  providedIn: 'root'
})
export class RegistrationRepositoryService extends NgDestoryBase implements OnReset {
  public readonly registrations$: Observable<IRegistration[]>;
  private readonly inMemoryRegistrations = new BehaviorSubject<{ [appMode: string]: IRegistration[] }>({});

  constructor(private userSettingService: UserSettingService, private loggingService: LoggingService) {
    super();
    this.registrations$ = this.userSettingService.appMode$.pipe(
      switchMap((appMode) => this.getInMemoryRegistrationsForAppMode(appMode)),
      tap((registrations) => this.loggingService.debug('Registrations from repository is', DEBUG_TAG, registrations)),
      shareReplay(1));
    this.init();
  }

  public saveRegistration(appMode: AppMode, reg: IRegistration) {
    const currentRegistrations = this.getCurrentInMemoryRegistrations(appMode);
    const mergedResult = this.mergeRegistrationsBasedOnId([reg], currentRegistrations);
    this.loggingService.debug('Saving registration to inMemory', DEBUG_TAG,
      ({ appMode, regToSave: reg, currentRegistrations, mergedResult }));
    this.saveInMemoryRegistrations(appMode, mergedResult);
  }

  async deleteRegistrationById(appMode: AppMode, id: string) {
    await NanoSql.getInstance(NanoSql.TABLES.REGISTRATION.name, appMode)
      .query('delete').where(['id', '=', id]).exec();
    const newInMemoryRegistrations = this.getCurrentInMemoryRegistrations(appMode).filter((reg) => reg.id !== id);
    this.saveInMemoryRegistrations(appMode, newInMemoryRegistrations);
  }

  private init() {
    this.updateInMemoryRegistrationsFromDb();
    this.createSaveToDbOnChangeListener();
  }

  private updateInMemoryRegistrationsFromDb() {
    this.userSettingService.appMode$.pipe(
      switchMap((appMode) =>
        combineLatest([this.getInMemoryRegistrationsForAppMode(appMode).pipe(take(1)), this.getRegistrationsFromDb(appMode), of(appMode)])),
      concatMap(([imr, dbRegistrations, appMode]) =>
        of(this.mergeRegistrationsBasedOnId(imr, dbRegistrations)).pipe(map((result) => ({ appMode, result })))),
      takeUntil(this.ngDestroy$),
    ).subscribe((result) => {
      this.loggingService.debug('Merged existing registrations from database.', DEBUG_TAG, result);
      this.saveInMemoryRegistrations(result.appMode, result.result);
    });
  }

  private getCurrentInMemoryRegistrations(appMode: AppMode) {
    const currentVal = this.inMemoryRegistrations.value;
    return currentVal[appMode] || [];
  }

  private createSaveToDbOnChangeListener() {
    this.userSettingService.appMode$.pipe(switchMap((appMode) =>
      this.registrations$.pipe(debounceTime(200), map((registrations) => ({ appMode, registrations })))),
      tap((result) => this.loggingService.debug('InMemory registrations changed. Saving to db: ', DEBUG_TAG, result)),
      concatMap((result) => this.saveRegistrationsToDb(result.appMode, result.registrations)),
      takeUntil(this.ngDestroy$)).subscribe();
  }

  private saveInMemoryRegistrations(appMode: AppMode, registrations: IRegistration[]) {
    const currentVal = this.inMemoryRegistrations.value;
    currentVal[appMode] = registrations;
    this.inMemoryRegistrations.next(currentVal);
  }

  private getRegistrationsFromDb(appMode: AppMode) {
    return from(NanoSql.getInstance(NanoSql.TABLES.REGISTRATION.name, appMode).query('select').exec() as Promise<IRegistration[]>);
  }

  private mergeRegistrationsBasedOnId(registrationsToKeep: IRegistration[], registrationsToMerge: IRegistration[]) {
    registrationsToKeep = registrationsToKeep || [];
    registrationsToMerge = registrationsToMerge || [];
    return [...registrationsToKeep, ...registrationsToMerge.filter((newReg) => !registrationsToKeep.find((cr) => cr.id === newReg.id))];
  }

  private getInMemoryRegistrationsForAppMode(appMode: AppMode): Observable<IRegistration[]> {
    this.loggingService.debug(`Get inMemory registrations for app mode: ${appMode}`, DEBUG_TAG);
    return this.inMemoryRegistrations.pipe(map((inMemoryReg) => inMemoryReg[appMode] || []));
  }

  private saveRegistrationsToDb(appMode: AppMode, registrations: IRegistration[]): Observable<IRegistration[]> {
    return from(NanoSql.getInstance(NanoSql.TABLES.REGISTRATION.name, appMode)
      .query('upsert', registrations).exec() as Promise<IRegistration[]>).pipe(tap((result) => {
        this.loggingService.debug('Result from save to db is', DEBUG_TAG, result);
      }), catchError((err) => {
        this.loggingService.log('Could not save registrations to offline db', err, LogLevel.Warning, DEBUG_TAG);
        return of([]);
      }));
  }

  appOnReset() {
  }
  appOnResetComplete() {
    this.inMemoryRegistrations.next({});
  }
}
