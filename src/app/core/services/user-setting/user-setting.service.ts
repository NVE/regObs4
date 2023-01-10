import { Injectable } from '@angular/core';
import { UserSetting } from '../../models/user-settings.model';
import { TranslateService } from '@ngx-translate/core';
import { AppMode, GeoHazard, LangKey } from 'src/app/modules/common-core/models';
import { settings } from '../../../../settings';
import { NanoSql } from '../../../../nanosql';
import { BehaviorSubject, combineLatest, firstValueFrom, from, Observable, of } from 'rxjs';
import {
  catchError,
  concatMap,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';
import { nSQL } from '@nano-sql/core';
import { OnReset } from '../../../modules/shared/interfaces/on-reset.interface';
import equal from 'fast-deep-equal';
import { NgDestoryBase } from '../../helpers/observable-helper';
import { LogLevel } from '../../../modules/shared/services/logging/log-level.model';
import { DEFAULT_USER_SETTINGS } from './user-settings.default';
import { registerLocaleData } from '@angular/common';
import nbData from '@angular/common/locales/nb';
import svData from '@angular/common/locales/sv';
import enData from '@angular/common/locales/en';
import deData from '@angular/common/locales/de';
import slData from '@angular/common/locales/sl';
import nnData from '@angular/common/locales/nn';
import frData from '@angular/common/locales/fr';
import daData from '@angular/common/locales/da';
import { SupportTile } from '../../models/support-tile.model';
import { isArraysEqual } from '../../../modules/common-core/helpers/arrays';

const DEBUG_TAG = 'UserSettingService';

@Injectable({
  providedIn: 'root',
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
  public readonly daysBack$: Observable<{ geoHazard: GeoHazard; daysBack: number }[]>;
  public readonly showObservations$: Observable<boolean>;
  public readonly userSetting$: Observable<UserSetting>;
  public readonly daysBackForCurrentGeoHazard$: Observable<number>;

  private userSettingInMemory = new BehaviorSubject<UserSetting>(null);
  // private userSettingsReady = new BehaviorSubject(false);

  // get userSettingsReady$() {
  //   return this.userSettingsReady.asObservable();
  // }

  // get currentSettings() {
  //   return this.userSettingInMemory.getValue();
  // }

  // set currentSettings(val: UserSetting) {
  //   this.saveUserSettings(val);
  // }

  get supportTiles$() {
    return this.userSetting$.pipe(map((us) => this.getSupportTilesOptions(us, true)));
  }

  get supportTilesWithSubTiles$() {
    return this.userSetting$.pipe(map((us) => this.getSupportTilesOptions(us, false)));
  }

  get legalUrl() {
    const language = this.userSettingInMemory.value.language;
    if (language == LangKey.nb || language == LangKey.nn) {
      return settings.legalUrl.nb;
    } else {
      return settings.legalUrl.en;
    }
  }

  constructor(private translate: TranslateService, private loggingService: LoggingService) {
    super();
    this.userSetting$ = this.userSettingInMemory.asObservable().pipe(
      concatMap((val) => (val ? of(val) : this.getUserSettingsFromDbOrDefaultSettings())),
      tap((val) => {
        this.loggingService?.debug('User settings is: ', DEBUG_TAG, val);
      }),
      shareReplay(1)
    );
    this.currentGeoHazard$ = this.userSetting$.pipe(
      map((val) => val.currentGeoHazard),
      distinctUntilChanged(equal),
      tap((val) => this.loggingService?.debug(`Current geohazard changed to: ${val.join(',')}`, DEBUG_TAG)),
      shareReplay(1)
    );

    this.appMode$ = this.userSetting$.pipe(
      map((val) => val.appMode),
      distinctUntilChanged(),
      tap((val) => {
        this.loggingService?.debug('App mode is: ', DEBUG_TAG, val);
      }),
      shareReplay(1)
    );

    this.showMapCenter$ = this.userSetting$.pipe(
      map((val) => val.showMapCenter),
      distinctUntilChanged(),
      shareReplay(1)
    );

    this.language$ = this.userSetting$.pipe(
      map((val) => val.language),
      distinctUntilChanged(),
      shareReplay(1)
    );

    this.appModeAndLanguage$ = combineLatest([this.appMode$, this.language$]).pipe(shareReplay(1));

    this.appModeLanguageAndCurrentGeoHazard$ = combineLatest([
      this.appMode$,
      this.language$,
      this.currentGeoHazard$,
    ]).pipe(shareReplay(1));

    this.daysBack$ = this.userSetting$.pipe(
      map((val) => val.observationDaysBack),
      tap((val) => this.loggingService?.debug('Days back changed to:', DEBUG_TAG, val)),
      shareReplay(1)
    );

    this.showObservations$ = this.userSetting$.pipe(
      map((val) => val.showObservations),
      distinctUntilChanged(),
      shareReplay(1)
    );

    (this.daysBackForCurrentGeoHazard$ = combineLatest([this.daysBack$, this.currentGeoHazard$]).pipe(
      map(([daysBack, currentGeoHazard]) => {
        const geoHazard = currentGeoHazard[0];
        const daysBackForCurrentGeoHazard = daysBack.find((x) => x.geoHazard === geoHazard);
        return daysBackForCurrentGeoHazard?.daysBack;
      })
    )),
      tap((val) => this.loggingService.debug('daysBackForCurrentGeoHazard changed to: ', DEBUG_TAG, val));
  }

  public init() {
    this.createLanguageChangeListener();
    // this.updateInMemoryRegistrationsFromDb();
    this.createSaveToDbOnChangeListener();
  }

  private createLanguageChangeListener() {
    this.language$.pipe(takeUntil(this.ngDestroy$)).subscribe((langKey) => {
      const lang = LangKey[langKey];
      switch (langKey) {
        case LangKey.nb:
          registerLocaleData(nbData);
          break;
        case LangKey.en:
          registerLocaleData(enData);
          break;
        case LangKey.de:
          registerLocaleData(deData);
          break;
        case LangKey.sv:
          registerLocaleData(svData);
          break;
        case LangKey.sl:
          registerLocaleData(slData);
          break;
        case LangKey.nn:
          registerLocaleData(nnData);
          break;
        case LangKey.fr:
          registerLocaleData(frData);
          break;
        case LangKey.da:
          registerLocaleData(daData);
          break;
      }
      this.translate.use(lang);
    });
  }

  private createSaveToDbOnChangeListener() {
    this.userSettingInMemory
      .pipe(
        filter((result) => !!result),
        debounceTime(200),
        tap((result) =>
          this.loggingService?.debug('InMemory user settings changed. Saving to db: ', DEBUG_TAG, result)
        ),
        switchMap((result) => this.saveUserSettingsToDb(result)),
        takeUntil(this.ngDestroy$)
      )
      .subscribe();
  }

  saveUserSettings(userSetting: UserSetting) {
    this.userSettingInMemory.next(userSetting);
  }

  getSupportTilesOptions(us: UserSetting, flat = true): SupportTile[] {
    const supportTilesForCurrentGeoHazard: SupportTile[] = settings.map.tiles.supportTiles
      .filter((setting) => us.currentGeoHazard.indexOf(setting.geoHazardId) >= 0)
      .map((tile) => {
        const usSupportTile = us.supportTiles.find((usTiles) => usTiles.name === tile.name);
        let subTile = tile.subTile;
        if (subTile && usSupportTile && usSupportTile.subTile) {
          subTile = { ...tile.subTile, ...usSupportTile.subTile };
        }
        return {
          ...(usSupportTile ? { ...tile, ...usSupportTile } : tile),
          subTile: subTile,
        };
      });

    if (flat) {
      supportTilesForCurrentGeoHazard
        .filter((tile) => tile.subTile)
        .forEach((tile) => {
          supportTilesForCurrentGeoHazard.push({
            ...tile.subTile,
            opacity: tile.opacity,
            geoHazardId: tile.geoHazardId,
          });
          delete tile.subTile;
        });
    }

    return supportTilesForCurrentGeoHazard;
  }

  private getUserSettingsFromDbOrDefaultSettings(): Observable<UserSetting> {
    return this.getUserSettingsFromDb().pipe(map((result) => (result ? result : DEFAULT_USER_SETTINGS(null))));
  }

  private getUserSettingsFromDb(): Observable<UserSetting> {
    return from(nSQL(NanoSql.TABLES.USER_SETTINGS.name).query('select').exec() as Promise<UserSetting[]>).pipe(
      map((result) => result[0])
    );
  }

  private saveUserSettingsToDb(userSetting: UserSetting): Observable<UserSetting[]> {
    return from(
      nSQL(NanoSql.TABLES.USER_SETTINGS.name)
        .query('upsert', { id: 'usersettings', ...userSetting })
        .exec() as Promise<UserSetting[]>
    ).pipe(
      catchError((err) => {
        this.loggingService?.log('Could not save user settings to offline db', err, LogLevel.Warning, DEBUG_TAG);
        return of(null);
      })
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  appOnReset() {}

  appOnResetComplete() {
    this.loggingService.debug('App reset complete. Re-init observables.', DEBUG_TAG);
    // const defaultSettings = DEFAULT_USER_SETTINGS(null);
    // this.saveUserSettings(defaultSettings);
    this.userSettingInMemory.next(null); // Reset in memory observable
  }

  async saveGeoHazardsAndDaysBack({
    geoHazards,
    daysBack,
  }: {
    geoHazards?: number[] | undefined;
    daysBack?: number | null;
  }): Promise<boolean | number> {
    let userSetting = await firstValueFrom(this.userSetting$);
    let changed = false;
    if (geoHazards != null) {
      if (!isArraysEqual(geoHazards, userSetting.currentGeoHazard)) {
        userSetting = {
          ...userSetting,
          currentGeoHazard: geoHazards,
        };
        changed = true;
      }
    }
    if (daysBack != null) {
      for (const geoHazard of userSetting.currentGeoHazard) {
        const existingValue = userSetting.observationDaysBack.find((x) => x.geoHazard === geoHazard);
        if (existingValue.daysBack !== daysBack) {
          existingValue.daysBack = daysBack;
          changed = true;
        }
      }
    }
    if (changed) {
      this.saveUserSettings(userSetting);
      return await firstValueFrom(this.daysBackForCurrentGeoHazard$);
    } else {
      return new Promise((resolve) => resolve(false));
    }
  }
}
