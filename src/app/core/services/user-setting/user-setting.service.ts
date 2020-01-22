import { Injectable } from '@angular/core';
import { UserSetting } from '../../models/user-settings.model';
import { TranslateService } from '@ngx-translate/core';
import { GeoHazard } from '../../models/geo-hazard.enum';
import { AppMode } from '../../models/app-mode.enum';
import { settings } from '../../../../settings';
import { NanoSql } from '../../../../nanosql';
import { Observable, combineLatest, BehaviorSubject, from, of } from 'rxjs';
import { map, take, shareReplay, distinctUntilChanged, tap, takeUntil, catchError, filter, debounceTime, switchMap } from 'rxjs/operators';
import { LangKey } from '../../models/langKey';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';
import { nSQL } from '@nano-sql/core';
import { OnReset } from '../../../modules/shared/interfaces/on-reset.interface';
import equal from 'fast-deep-equal';
import { NgDestoryBase } from '../../helpers/observable-helper';
import { LogLevel } from '../../../modules/shared/services/logging/log-level.model';
import { DEFAULT_USER_SETTINGS } from './user-settings.default';

const DEBUG_TAG = 'UserSettingService';

@Injectable({
  providedIn: 'root'
})
export class UserSettingService extends NgDestoryBase implements OnReset {

  // Setting this observable to be a shared instance since
  // UserSettingService is a singleton service.
  // The observable will be shared with many services
  public readonly currentGeoHazard$: Observable<GeoHazard[]>;
  public readonly appMode$: Observable<AppMode>;
  public readonly showMapCenter$: Observable<boolean>;
  public readonly appModeAndLanguage$: Observable<[AppMode, LangKey]>;
  public readonly appModeLanguageAndCurrentGeoHazard$: Observable<[AppMode, LangKey, GeoHazard[]]>;
  public readonly language$: Observable<LangKey>;
  public readonly daysBack$: Observable<{ geoHazard: GeoHazard, daysBack: number }[]>;
  public readonly showObservations$: Observable<boolean>;

  private userSettingInMemory = new BehaviorSubject<UserSetting>(DEFAULT_USER_SETTINGS());
  private userSettingsReady = new BehaviorSubject(false);

  get userSettingsReady$() {
    return this.userSettingsReady.asObservable();
  }

  get userSetting$() {
    return this.userSettingInMemory.asObservable();
  }

  get currentSettings() {
    return this.userSettingInMemory.value;
  }

  set currentSettings(val: UserSetting) {
    this.saveUserSettings(val);
  }

  get supportTiles$() {
    return this.userSetting$
      .pipe(map((us) => this.getSupportTilesOptions(us)));
  }

  constructor(private translate: TranslateService, private loggingService: LoggingService) {
    super();

    this.currentGeoHazard$ = this.userSetting$.pipe(
      map((val) => val.currentGeoHazard),
      distinctUntilChanged(equal),
      tap((val) => this.loggingService.debug(`Current geohazard changed to: ${val.join(',')}`, DEBUG_TAG)),
      shareReplay(1));

    this.appMode$ = this.userSetting$.pipe(map((val) => val.appMode), distinctUntilChanged(), shareReplay(1));

    this.showMapCenter$ = this.userSetting$.pipe(map((val) => val.showMapCenter), distinctUntilChanged(), shareReplay(1));

    this.language$ = this.userSetting$.pipe(map((val) => val.language), distinctUntilChanged(), shareReplay(1));

    this.appModeAndLanguage$ = combineLatest([this.appMode$, this.language$]).pipe(shareReplay(1));

    this.appModeLanguageAndCurrentGeoHazard$ = combineLatest([
      this.appMode$, this.language$, this.currentGeoHazard$])
      .pipe(shareReplay(1));

    this.daysBack$ = this.userSetting$
      .pipe(
        map((val) => val.observationDaysBack),
        distinctUntilChanged(equal),
        tap((val) => this.loggingService.debug(`Days back changed to:`, DEBUG_TAG, val)),
        shareReplay(1));

    this.showObservations$ = this.userSetting$.pipe(map((val) => val.showObservations), distinctUntilChanged(), shareReplay(1));

    this.initSubscriptions();
  }

  private initSubscriptions() {
    this.createLanguageChangeListener();
    this.updateInMemoryRegistrationsFromDb();
    this.createSaveToDbOnChangeListener();
  }

  private createLanguageChangeListener() {
    // TODO: Move to app init
    this.language$.pipe(takeUntil(this.ngDestroy$)).subscribe((language) => {
      this.translate.use(LangKey[language]);
    });
  }

  private updateInMemoryRegistrationsFromDb() {
    this.getUserSettingsFromDb().subscribe((result) => {
      if (result) {
        this.loggingService.debug('Init user settings from offline db', DEBUG_TAG, result);
        this.saveUserSettings(result);
      }
      this.userSettingsReady.next(true);
    });
  }

  private createSaveToDbOnChangeListener() {
    this.userSetting$.pipe(
      debounceTime(200),
      tap((result) => this.loggingService.debug('InMemory user settings changed. Saving to db: ', DEBUG_TAG, result)),
      switchMap((result) => this.saveUserSettingsToDb(result)),
      takeUntil(this.ngDestroy$)
    ).subscribe();
  }

  userSettingsReadyAsync() {
    return this.userSettingsReady$.pipe(take(1)).toPromise();
  }

  saveUserSettings(userSetting: UserSetting) {
    this.userSettingInMemory.next(userSetting);
  }

  getSupportTilesOptions(us: UserSetting) {
    const supportTilesForCurrentGeoHazard = settings.map.tiles.supportTiles
      .filter((setting) => us.currentGeoHazard.indexOf(setting.geoHazardId) >= 0);
    return supportTilesForCurrentGeoHazard.map((st) => {
      const usSupportTile = us.supportTiles.find((usTiles) => usTiles.name === st.name);
      if (usSupportTile) {
        return {
          ...st,
          opacity: usSupportTile.opacity,
          enabled: usSupportTile.enabled,
        };
      }
      return st;
    });
  }

  private getUserSettingsFromDb(): Observable<UserSetting> {
    return from(nSQL(NanoSql.TABLES.USER_SETTINGS.name).query('select').exec() as Promise<UserSetting[]>)
      .pipe((map((result) => result[0])));
  }

  private saveUserSettingsToDb(userSetting: UserSetting): Observable<UserSetting[]> {
    return from(nSQL(NanoSql.TABLES.USER_SETTINGS.name)
      .query('upsert', { id: 'usersettings', ...userSetting }).exec() as Promise<UserSetting[]>)
      .pipe(catchError((err) => {
        this.loggingService.log('Could not save user settings to offline db', err, LogLevel.Warning, DEBUG_TAG);
        return of(null);
      }));
  }

  appOnReset(): void | Promise<any> {
  }

  appOnResetComplete(): Promise<void | Promise<any>> {
    this.loggingService.debug(`App reset complete. Re-init observables.`, DEBUG_TAG);
    this.saveUserSettings(DEFAULT_USER_SETTINGS());
    return Promise.resolve();
  }
}
