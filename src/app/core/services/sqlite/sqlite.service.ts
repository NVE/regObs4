/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import {
  CapacitorSQLite,
  capSQLiteChanges,
  capSQLiteResult,
  SQLiteConnection,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';
import { RegistrationViewModel } from 'src/app/modules/common-regobs-api';
import moment from 'moment';
import { SearchCriteria } from '../../models/search-criteria';
import {
  BehaviorSubject,
  catchError,
  concatMap,
  debounceTime,
  exhaustMap,
  filter,
  firstValueFrom,
  ReplaySubject,
  Subject,
  switchMap,
  takeUntil,
  tap,
  throwError,
  timeout,
  timer,
} from 'rxjs';
import { AppMode, LangKey } from 'src/app/modules/common-core/models';
import { Platform } from '@ionic/angular';
import { LogLevel } from 'src/app/modules/shared/services/logging/log-level.model';

const dateToMs = (value: string): number => {
  const date = moment(value);
  return date.valueOf();
};

const toJson = (o: any) => {
  // TODO: Typescript compiler cant find replaceAll on string, how to fix?
  // Single quotes must be escaped: ' => ''
  return (<any>JSON.stringify(o)).replaceAll("'", "''");
};

const DEBUG_TAG = 'OfflineCapableSearchService - Sqlite';
const DATABASE_NAME = 'regobs-v2';
// IMPORTANT! Remember that you have to let sqlite know which version it should start with after you update the db.
// Check the createConnection() methods
const UPGRADE_STATEMENTS = [
  {
    toVersion: 1,
    statements: [
      `CREATE TABLE IF NOT EXISTS registration (
        reg_id INTEGER PRIMARY KEY NOT NULL,
        geo_hazard INTEGER NOT NULL,
        observer_id INTEGER NOT NULL,
        observer_nick TEXT,
        data JSON NOT NULL,
        obs_time INTEGER NOT NULL,
        reg_time INTEGER NOT NULL,
        change_time INTEGER NOT NULL);`,

      // TODO: Jeg har ikke sjekket hvordan man bruker indekser med sqlite / denne pluginen,
      //  Evt fjern før vi tar inn dette hvis vi ikke bruker det
      'CREATE INDEX IF NOT EXISTS registration_index_nick ON registration (observer_nick);',

      'CREATE INDEX IF NOT EXISTS registration_index_obs_time ON registration (obs_time);',

      'CREATE INDEX IF NOT EXISTS registration_index_reg_time ON registration (reg_time);',

      'CREATE INDEX IF NOT EXISTS registration_index_change_time ON registration (change_time);',
    ],
  },
  {
    toVersion: 2,
    statements: [
      'ALTER TABLE registration ADD COLUMN app_mode TEXT;',

      `CREATE TABLE IF NOT EXISTS registration_sync_time (
        sync_time_ms INTEGER NOT NULL,
        app_mode TEXT PRIMARY KEY NOT NULL);
      `,
    ],
  },
  {
    toVersion: 3,
    statements: [
      'ALTER TABLE registration ADD COLUMN lat REAL;',
      'ALTER TABLE registration ADD COLUMN lon REAL;',
      // Remove sync time to force a new sync with lat lon
      'DELETE FROM registration_sync_time;',
    ],
  },
  {
    toVersion: 4,
    statements: [
      'ALTER TABLE registration ADD COLUMN lang INTEGER;',
      'ALTER TABLE registration_sync_time ADD COLUMN lang INTEGER;',
      // Remove sync time to force a new sync with langKey
      'DELETE FROM registration_sync_time;',
    ],
  },
  {
    toVersion: 5,
    statements: [
      'ALTER TABLE registration ADD COLUMN observer_competence INTEGER;',
      // Remove sync time to force a new sync with observer_competence
      'DELETE FROM registration_sync_time;',
    ],
  },
];

const READONLY = false;

@Injectable({
  providedIn: 'root',
})
export class SqliteService {
  private hasChanges = new Subject<AppMode>();
  hasChanges$ = this.hasChanges.asObservable();

  private sqlite: SQLiteConnection;
  private conn: SQLiteDBConnection;

  private ready = new ReplaySubject<boolean>(1);

  private isReady$ = this.ready.asObservable().pipe(
    filter((ready) => ready === true),
    switchMap(() => timer(0, 500)),
    exhaustMap(() => this.isDbOpenAndReady()),
    filter((isReady) => isReady)
  );

  private async isDbOpenAndReady() {
    let ready = true;
    let err = null;
    let level = LogLevel.Info;
    let isConnection: capSQLiteResult = null;
    let checkConnectionsConsistency: capSQLiteResult = null;
    let isDbOpen: capSQLiteResult = null;
    let isTransactionActive: capSQLiteResult = null;

    try {
      isConnection = await this.sqlite.isConnection(DATABASE_NAME, READONLY);
      ready = !!isConnection?.result;

      if (ready) {
        checkConnectionsConsistency = await this.sqlite.checkConnectionsConsistency();
        isDbOpen = await this.conn.isDBOpen();
        ready = !!isDbOpen?.result;
      }

      if (ready) {
        isTransactionActive = await this.conn.isTransactionActive();
        ready = !isTransactionActive?.result;
      }
    } catch (error) {
      err = error;
      ready = false;
      level = LogLevel.Error;
    }

    this.logger.log('isDbOpenAndReady', err, level, DEBUG_TAG, {
      ready,
      isConnection,
      checkConnectionsConsistency,
      isDbOpen,
      isTransactionActive,
    });
    return ready;
  }

  private requestReset = new Subject<void>();

  private _hasCrashed = new BehaviorSubject(false);

  get hasCrashed() {
    return this._hasCrashed.value;
  }

  /**
   * Throws if db has crashed
   */
  checkHasCrashed() {
    if (this.hasCrashed) {
      throw new Error('Db has crashed');
    }
  }

  hasCrashed$ = this._hasCrashed.asObservable().pipe(filter((x) => x === true));

  private isReady(): Promise<boolean> {
    this.checkHasCrashed();

    return firstValueFrom(
      this.isReady$.pipe(
        timeout(30_000),
        catchError((err) => {
          this.logger.error(err, DEBUG_TAG, 'Waiting for sqlite db to be ready timed out. Will try reset.');
          this.requestReset.next();
          return this.isReady$.pipe(
            timeout(60_000),
            catchError((err) => {
              this.logger.error(err, DEBUG_TAG, 'Waiting for sqlite db to be ready timed out after reset');
              return throwError(() => err);
            })
          );
        })
      )
    );
  }

  private pauseResumeEvent = new Subject<'pause' | 'resume'>();

  constructor(private logger: LoggingService, private platform: Platform) {
    this.logger.debug('Creating', DEBUG_TAG);

    // Close / open connection when app goes to/from background
    // Use a concatmap to avoid opening the connection while it is being closed.
    this.pauseResumeEvent
      .pipe(
        takeUntil(this.hasCrashed$),
        tap((state) => this.logger.debug('App state changed', DEBUG_TAG, { state })),
        concatMap((state) => (state === 'pause' ? this.closeConn() : this.openConn()))
      )
      .subscribe({
        error: () => {
          this._hasCrashed.next(true);
        },
      });
    this.platform.pause.subscribe(() => this.pauseResumeEvent.next('pause'));
    this.platform.resume.subscribe(() => this.pauseResumeEvent.next('resume'));
    this.requestReset
      .pipe(
        debounceTime(2000),
        takeUntil(this.hasCrashed$),
        exhaustMap(() => this.reset())
      )
      .subscribe();
  }

  private async reset() {
    try {
      this.logger.log('Reset', null, LogLevel.Info, DEBUG_TAG);
      await this.closeConn();
      await this.openConn();
      this.logger.log('Reset done', null, LogLevel.Info, DEBUG_TAG);
    } catch (error) {
      this.logger.log('Failed to reset db', error, LogLevel.Warning, DEBUG_TAG, { error });
      this._hasCrashed.next(true);
      throw error;
    }
  }

  private async openConn() {
    const encrypted = false;
    // Remember to update version if you added changes to tables
    const version = 5;

    // This issue comment tries to explain the difference between createConnection and open
    // https://github.com/capacitor-community/sqlite/issues/157#issuecomment-895877446
    // https://github.com/jepiqueau/angular-sqlite-app-starter/blob/4e46dcef4d7c7033b1df41c7fe2094b6916e3133/src/app/services/database.service.ts
    try {
      const isConnection = await this.sqlite.isConnection(DATABASE_NAME, READONLY);
      const checkConnectionsConsistency = await this.sqlite.checkConnectionsConsistency();
      this.logger.log('Connection status', null, LogLevel.Info, DEBUG_TAG, {
        isConnection,
        checkConnectionsConsistency,
      });

      if (!isConnection.result || !checkConnectionsConsistency.result) {
        this.logger.log('Create connection', null, LogLevel.Info, DEBUG_TAG, {
          DATABASE_NAME,
          encrypted,
          version,
          READONLY,
        });
        this.conn = await this.sqlite.createConnection(DATABASE_NAME, encrypted, 'no-encryption', version, READONLY);
      } else {
        this.logger.log('Retrieve connection', null, LogLevel.Info, DEBUG_TAG);
        this.conn = await this.sqlite.retrieveConnection(DATABASE_NAME, READONLY);
      }

      this.logger.log('Check isDBOpen', null, LogLevel.Info, DEBUG_TAG);
      const isOpen = await this.conn.isDBOpen();
      this.logger.log('isDBOpen', null, LogLevel.Info, DEBUG_TAG, { isOpen });
      if (!isOpen.result) {
        this.logger.log('Open connection', null, LogLevel.Info, DEBUG_TAG);
        await this.conn.open();
        this.logger.log('Connection opened', null, LogLevel.Info, DEBUG_TAG);
      }

      this.ready.next(true);
    } catch (error) {
      this.logger.error(error, DEBUG_TAG, 'Failed to create/open connection');
      throw error;
    }
  }

  private async closeConn() {
    this.logger.log('Closing connection', null, LogLevel.Info, DEBUG_TAG);
    this.ready.next(false);

    try {
      await this.sqlite.closeConnection(DATABASE_NAME, false);
      this.logger.log('Connection closed', null, LogLevel.Info, DEBUG_TAG);
    } catch (error) {
      const checkConnectionsConsistency = await this.sqlite.checkConnectionsConsistency();
      const connectionMaybeAlreadyClosed = (error as Error)?.message?.includes(
        'No available connection for database regobs-v2'
      );
      const logLevel = connectionMaybeAlreadyClosed ? LogLevel.Warning : LogLevel.Error;
      this.logger.log('Failed to close connection', error, logLevel, DEBUG_TAG, {
        checkConnectionsConsistency,
        connectionMaybeAlreadyClosed,
      });
    }
  }

  private async runUpgradeStatements() {
    this.logger.debug('Running upgrade statements');
    for (const stmt of UPGRADE_STATEMENTS) {
      this.logger.debug('Upgrade statement', DEBUG_TAG, { stmt });
      await this.sqlite.addUpgradeStatement(DATABASE_NAME, stmt.toVersion, stmt.statements);
    }
  }

  private async truncateRegistrations() {
    this.logger.debug('Truncate registrations', DEBUG_TAG);
    await this.conn.execute('DELETE FROM registration;');
  }

  private async truncateSyncTime() {
    this.logger.debug('Truncate sync_time', DEBUG_TAG);
    await this.conn.execute('DELETE FROM registration_sync_time;');
  }

  private async printInitInfo() {
    await this.isReady();
    const url = await this.conn.getUrl();
    const tables = await this.conn.getTableList();
    this.logger.debug('DB Info', DEBUG_TAG, { url, tables: tables.values });
  }

  async init() {
    try {
      await this.platform.ready();
      this.logger.log('Create SQLiteConnection', null, LogLevel.Info, DEBUG_TAG);
      this.sqlite = new SQLiteConnection(CapacitorSQLite);
      await this.runUpgradeStatements();
      await this.openConn();
    } catch (error) {
      this._hasCrashed.next(true);
      throw error;
    }

    this.ready.next(true);
    this.printInitInfo();
  }

  async updateRegistrationsSyncTime(updateTimeMs: number, appMode: AppMode, lang: LangKey) {
    await this.isReady();
    this.logger.debug(`Update sync time`, DEBUG_TAG, { updateTimeMs, appMode });
    const result = await this.conn.run(
      `INSERT OR REPLACE INTO registration_sync_time (sync_time_ms,app_mode,lang) VALUES (?,?,?);`,
      [updateTimeMs, appMode, lang]
    );
    this.logger.debug(`Sync time updated`, DEBUG_TAG, { result });
  }

  async readRegistrationsSyncTime(appMode: AppMode, lang: LangKey) {
    await this.isReady();
    this.logger.debug('Reading sync time', DEBUG_TAG, { appMode });
    const result = await this.conn.query(
      `SELECT * FROM registration_sync_time WHERE app_mode='${appMode}' AND lang=${lang};`
    );
    this.logger.debug('Sync time', DEBUG_TAG, { result });
    return result.values[0]?.sync_time_ms;
  }

  private searchCriteriaToWhere(searchCriteria: SearchCriteria): string {
    const where = [];
    if (searchCriteria.LangKey != null) {
      where.push(`lang = ${searchCriteria.LangKey}`);
    }
    if (searchCriteria.RegId != null) {
      where.push(`reg_id = ${searchCriteria.RegId}`);
    }
    if (searchCriteria?.SelectedGeoHazards?.length) {
      where.push(`geo_hazard IN (${searchCriteria.SelectedGeoHazards.join(',')})`);
    }
    if (searchCriteria.ObserverId != null) {
      where.push(`observer_id = ${searchCriteria.ObserverId}`);
    }
    if (searchCriteria.ObserverNickName?.length) {
      where.push(`observer_nick LIKE '%${searchCriteria.ObserverNickName}%'`);
    }
    if (searchCriteria.FromDtObsTime?.length) {
      const fromTime = moment(searchCriteria.FromDtObsTime).valueOf();
      where.push(`obs_time >= ${fromTime}`);
    }
    if (searchCriteria.FromDtChangeTime?.length) {
      const fromTime = moment(searchCriteria.FromDtChangeTime).valueOf();
      where.push(`change_time >= ${fromTime}`);
    }
    if (searchCriteria.Extent?.BottomRight?.Latitude != null) {
      where.push(`lat >= ${searchCriteria.Extent.BottomRight.Latitude}`);
    }
    if (searchCriteria.Extent?.BottomRight?.Longitude != null) {
      where.push(`lon <= ${searchCriteria.Extent.BottomRight.Longitude}`);
    }
    if (searchCriteria.Extent?.TopLeft?.Latitude != null) {
      where.push(`lat <= ${searchCriteria.Extent.TopLeft.Latitude}`);
    }
    if (searchCriteria.Extent?.TopLeft?.Longitude != null) {
      where.push(`lon >= ${searchCriteria.Extent.TopLeft.Longitude}`);
    }
    if (searchCriteria.ObserverCompetence?.length) {
      where.push(`observer_competence IN (${searchCriteria.ObserverCompetence.join(',')})`);
    }

    if (where.length) {
      return where.join(' AND ');
    } else {
      return '1 = 1';
    }
  }

  private getOrderBy(searchCriteria: SearchCriteria): string {
    return searchCriteria.OrderBy === 'DtChangeTime' ? 'change_time' : 'obs_time';
  }

  private async cleanupRegistrations() {
    const twoWeeksAgo = moment().subtract(14, 'days').valueOf();
    const statement = `DELETE FROM registration WHERE reg_time < ${twoWeeksAgo};`;
    this.logger.debug('Cleanup registrations', DEBUG_TAG, { statement });
    const result = await this.conn.execute(statement);
    this.logger.debug('DELETE result', DEBUG_TAG, { result });
  }

  private parseLimit(c: SearchCriteria) {
    if (c.NumberOfRecords && c.Offset) {
      return `LIMIT ${c.NumberOfRecords}, ${c.Offset}`;
    } else if (c.NumberOfRecords) {
      return `LIMIT ${c.NumberOfRecords}`;
    }
    return '';
  }

  async selectRegistrations(searchCriteria: SearchCriteria, appMode: AppMode): Promise<RegistrationViewModel[]> {
    await this.isReady();
    const where = this.searchCriteriaToWhere(searchCriteria);
    const orderBy = this.getOrderBy(searchCriteria);
    const statement = `SELECT data FROM registration WHERE ${where} AND app_mode='${appMode}' ORDER BY ${orderBy} DESC ${this.parseLimit(
      searchCriteria
    )};`;
    this.logger.debug('Query', DEBUG_TAG, { statement, searchCriteria });
    const result = await this.conn.query(statement);
    // The data property contains the json as a string
    const registrations = (result?.values || []).map((value) => JSON.parse(value.data));
    this.logger.debug('Query result', DEBUG_TAG, { n: registrations.length });
    return registrations;
  }

  async getRegistrationCount(searchCriteria: SearchCriteria, appMode: AppMode): Promise<number> {
    await this.isReady();
    const where = this.searchCriteriaToWhere(searchCriteria);
    const statement = `SELECT COUNT(*) AS reg_count FROM registration WHERE ${where} AND app_mode='${appMode}'`;
    this.logger.debug('Count', DEBUG_TAG, { statement, searchCriteria });
    const result = await this.conn.query(statement);
    this.logger.debug('Count result', DEBUG_TAG, { result });
    return result.values[0].reg_count;
  }

  /**
   * Load a single registration or null if not found
   */
  async loadRegistration(regId: number, appMode: AppMode): Promise<RegistrationViewModel> {
    await this.isReady();
    const statement = `SELECT data FROM registration WHERE reg_id = ${regId} AND app_mode='${appMode}'`;
    this.logger.debug('Query', DEBUG_TAG, { statement });
    const result = await this.conn.query(statement);
    if (result?.values.length > 0) {
      // The data property contains the json as a string
      const registration = JSON.parse(result.values[0].data);
      this.logger.debug('Query result', DEBUG_TAG, { registration });
      return registration;
    }
    this.logger.log(
      `Registration with id=${regId} and app_mode='${appMode}' not found`,
      null,
      LogLevel.Warning,
      DEBUG_TAG
    );
    return null;
  }

  async insertRegistrations(registrations: RegistrationViewModel[], appMode: AppMode, lang: LangKey) {
    const columns = [
      'reg_id',
      'geo_hazard',
      'observer_id',
      'observer_nick',
      'data',
      'obs_time',
      'reg_time',
      'change_time',
      'app_mode',
      'lat',
      'lon',
      'lang',
      'observer_competence',
    ];

    // NB: Same order as columns above
    const regToValues = (r: RegistrationViewModel) => [
      r.RegId,
      r.GeoHazardTID,
      r.Observer.ObserverID,
      r.Observer.NickName,
      toJson(r),
      dateToMs(r.DtObsTime),
      dateToMs(r.DtRegTime),
      dateToMs(r.DtChangeTime),
      appMode,
      r.ObsLocation.Latitude,
      r.ObsLocation.Longitude,
      lang,
      r.Observer.CompetenceLevelTID,
    ];

    await this.isReady();

    let result: capSQLiteChanges;
    if (registrations.length) {
      this.logger.debug(`Inserting registrations`, DEBUG_TAG, { n: registrations.length });
      const cols = columns.join(',');
      const vals = columns.map(() => '?').join(',');
      const sql = `INSERT OR REPLACE INTO registration (${cols}) VALUES (${vals});`;

      const values = registrations.map((r) => regToValues(r));

      try {
        result = await this.conn.executeSet([
          {
            statement: sql,
            values,
          },
        ]);
      } catch (error) {
        this.logger.error(error, DEBUG_TAG, `Execute error`, { sql });
        throw error;
      }

      this.logger.debug(`Execute result`, DEBUG_TAG, { result });
      this.hasChanges.next(appMode);
    } else {
      this.logger.debug(`Nothing to insert`, DEBUG_TAG);
    }

    return result;
  }

  /**
   * Delete one or more registrations
   */
  async deleteRegistrations(regIds: number[], appMode: AppMode) {
    await this.isReady();
    const statement = `DELETE FROM registration WHERE reg_id IN (${regIds.join(', ')}) AND app_mode='${appMode}';`;
    let result: capSQLiteChanges;
    try {
      result = await this.conn.execute(statement);
    } catch (error) {
      this.logger.error(error, DEBUG_TAG, 'Failed to delete registrations', { result, statement });
      throw error;
    }
    this.logger.debug('DELETE result', DEBUG_TAG, { result, statement });
  }
}
