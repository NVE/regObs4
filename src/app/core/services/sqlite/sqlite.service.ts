/* eslint-disable max-len */
import { Injectable, inject } from '@angular/core';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import {
  CapacitorSQLite,
  capSQLiteChanges,
  capSQLiteVersionUpgrade,
  SQLiteConnection,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';
import { RegistrationViewModel } from 'src/app/modules/common-regobs-api';
import moment from 'moment';
import { SearchCriteria } from '../../models/search-criteria';
import {
  BehaviorSubject,
  concatMap,
  filter,
  firstValueFrom,
  ReplaySubject,
  Subject,
  takeUntil,
  tap,
  timeout,
} from 'rxjs';
import { AppMode, LangKey } from 'src/app/modules/common-core/models';
import { Platform } from '@ionic/angular/standalone';
import { LogLevel } from 'src/app/modules/shared/services/logging/log-level.model';

const dateToMs = (value?: string): number => {
  const date = moment(value);
  return date.valueOf();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toJson = (o: any): string => {
  // Data is inserted via parameterized queries (?-placeholders),
  // so no manual escaping is needed — the SQLite plugin handles it.
  return JSON.stringify(o);
};

const DEBUG_TAG = 'OfflineCapableSearchService - Sqlite';
const DATABASE_NAME = 'regobs-v2';
// IMPORTANT! Remember that you have to let sqlite know which version it should start with after you update the db.
// Check the createConnection() methods
const UPGRADE_STATEMENTS: capSQLiteVersionUpgrade[] = [
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
  {
    toVersion: 6,
    statements: [
      // Fix: registration PK must include app_mode to separate environments.
      // SQLite does not support ALTER TABLE to change PK, so we recreate the tables.
      'DROP TABLE IF EXISTS registration;',
      'DROP TABLE IF EXISTS registration_sync_time;',

      `CREATE TABLE IF NOT EXISTS registration (
        reg_id INTEGER NOT NULL,
        geo_hazard INTEGER NOT NULL,
        observer_id INTEGER NOT NULL,
        observer_nick TEXT,
        data JSON NOT NULL,
        obs_time INTEGER NOT NULL,
        reg_time INTEGER NOT NULL,
        change_time INTEGER NOT NULL,
        app_mode TEXT NOT NULL,
        lat REAL,
        lon REAL,
        lang INTEGER,
        observer_competence INTEGER,
        PRIMARY KEY (reg_id, app_mode));`,

      'CREATE INDEX IF NOT EXISTS registration_index_nick ON registration (observer_nick);',
      'CREATE INDEX IF NOT EXISTS registration_index_obs_time ON registration (obs_time);',
      'CREATE INDEX IF NOT EXISTS registration_index_reg_time ON registration (reg_time);',
      'CREATE INDEX IF NOT EXISTS registration_index_change_time ON registration (change_time);',

      `CREATE TABLE IF NOT EXISTS registration_sync_time (
        sync_time_ms INTEGER NOT NULL,
        app_mode TEXT NOT NULL,
        lang INTEGER NOT NULL,
        PRIMARY KEY (app_mode, lang));`,
    ],
  },
];

const READONLY = false;
const CONNECTION_LOCK = 'sqlite-connection';
const DB_OPERATION_LOCK = 'sqlite-db-operation';

@Injectable({
  providedIn: 'root',
})
export class SqliteService {
  private logger = inject(LoggingService);
  private platform = inject(Platform);

  private hasChanges = new Subject<AppMode>();
  hasChanges$ = this.hasChanges.asObservable();

  private sqlite?: SQLiteConnection;
  private conn?: SQLiteDBConnection;

  private ready = new ReplaySubject<boolean>(1);

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

  /**
   * Wait for the DB connection to be ready.
   * After init(), this resolves immediately. During pause/resume cycles,
   * it waits for the connection to be reopened.
   */
  private isReady(): Promise<boolean> {
    this.checkHasCrashed();

    return firstValueFrom(
      this.ready.asObservable().pipe(
        filter((ready) => ready === true),
        timeout(30_000)
      )
    );
  }

  private pauseResumeEvent = new Subject<'pause' | 'resume'>();

  constructor() {
    this.logger.debug('Creating', DEBUG_TAG);

    // Close / open connection when app goes to/from background.
    // concatMap ensures close finishes before open starts.
    // CONNECTION_LOCK ensures connection open/close operations do not run concurrently.
    this.pauseResumeEvent
      .pipe(
        takeUntil(this.hasCrashed$),
        tap((state) => this.logger.debug('App state changed', DEBUG_TAG, { state })),
        concatMap((state) =>
          navigator.locks.request(CONNECTION_LOCK, () => (state === 'pause' ? this.closeConn() : this.openConn()))
        )
      )
      .subscribe({
        error: () => {
          this._hasCrashed.next(true);
        },
      });
    this.platform.pause.subscribe(() => this.pauseResumeEvent.next('pause'));
    this.platform.resume.subscribe(() => this.pauseResumeEvent.next('resume'));
  }

  private async openConn() {
    const encrypted = false;
    // Remember to update version if you added changes to tables
    const version = 6;

    const openConn = async () => {
      if (this.sqlite == null) {
        throw new Error('sqlite object not created, have you called init?');
      }

      const isConnection = await this.sqlite.isConnection(DATABASE_NAME, READONLY);
      try {
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
    };

    // This issue comment tries to explain the difference between createConnection and open
    // https://github.com/capacitor-community/sqlite/issues/157#issuecomment-895877446
    // https://github.com/jepiqueau/angular-sqlite-app-starter/blob/4e46dcef4d7c7033b1df41c7fe2094b6916e3133/src/app/services/database.service.ts
    await openConn();
  }

  private async closeConn() {
    this.logger.log('Closing connection', null, LogLevel.Info, DEBUG_TAG);
    this.ready.next(false);

    // Exclusive lock waits for all ongoing DB operations (shared locks) to finish
    await navigator.locks.request(DB_OPERATION_LOCK, { mode: 'exclusive' }, async () => {
      try {
        await this.sqlite?.closeConnection(DATABASE_NAME, false);
        this.logger.log('Connection closed', null, LogLevel.Info, DEBUG_TAG);
      } catch (error) {
        const connectionMaybeAlreadyClosed = (error as Error)?.message?.includes(
          'No available connection for database regobs-v2'
        );

        if (!connectionMaybeAlreadyClosed) {
          this.logger.error(error, DEBUG_TAG, 'Failed to close connection');
        }
      }
    });
  }

  private async runUpgradeStatements() {
    this.logger.debug('Running upgrade statements');
    await this.sqlite?.addUpgradeStatement(DATABASE_NAME, UPGRADE_STATEMENTS);
  }

  /**
   * Run a DB operation while holding a shared lock.
   * This prevents closeConn (which takes an exclusive lock) from closing
   * the connection while an operation is in progress.
   */
  private async withConnection<T>(operation: (conn: SQLiteDBConnection) => Promise<T>): Promise<T> {
    if (!this.sqlite) {
      throw new Error('SQLite not initialized. Call init() before using the database.');
    }

    await this.isReady();

    return navigator.locks.request(DB_OPERATION_LOCK, { mode: 'shared' }, async () => {
      if (!this.conn) {
        throw new Error('No connection created');
      }
      return operation(this.conn);
    });
  }

  private async truncateRegistrations() {
    this.logger.debug('Truncate registrations', DEBUG_TAG);
    await this.conn?.execute('DELETE FROM registration;');
  }

  private async truncateSyncTime() {
    this.logger.debug('Truncate sync_time', DEBUG_TAG);
    await this.conn?.execute('DELETE FROM registration_sync_time;');
  }

  async init() {
    try {
      await this.platform.ready();
      this.logger.log('Create SQLiteConnection', null, LogLevel.Info, DEBUG_TAG);
      this.sqlite = new SQLiteConnection(CapacitorSQLite);
      await this.runUpgradeStatements();
      await this.openConn();
    } catch (error) {
      this.logger.error(error, DEBUG_TAG, 'Failed during init');
      this._hasCrashed.next(true);
      throw error;
    }
  }

  async updateRegistrationsSyncTime(updateTimeMs: number, appMode: AppMode, lang: LangKey) {
    return this.withConnection(async (conn) => {
      this.logger.debug(`Update sync time`, DEBUG_TAG, { updateTimeMs, appMode });
      const result = await conn.run(
        `INSERT OR REPLACE INTO registration_sync_time (sync_time_ms,app_mode,lang) VALUES (?,?,?);`,
        [updateTimeMs, appMode, lang]
      );
      this.logger.debug(`Sync time updated`, DEBUG_TAG, { result });
    });
  }

  async readRegistrationsSyncTime(appMode: AppMode, lang: LangKey) {
    return this.withConnection(async (conn) => {
      this.logger.debug('Reading sync time', DEBUG_TAG, { appMode });
      const result = await conn.query(`SELECT * FROM registration_sync_time WHERE app_mode=? AND lang=?;`, [
        appMode,
        lang,
      ]);
      this.logger.debug('Sync time', DEBUG_TAG, { result });
      return result.values?.[0]?.sync_time_ms;
    });
  }

  private searchCriteriaToWhere(searchCriteria: SearchCriteria): { clause: string; params: unknown[] } {
    const conditions: string[] = [];
    const params: unknown[] = [];

    if (searchCriteria.LangKey != null) {
      conditions.push(`lang = ?`);
      params.push(searchCriteria.LangKey);
    }
    if (searchCriteria.RegId != null) {
      conditions.push(`reg_id = ?`);
      params.push(searchCriteria.RegId);
    }
    if (searchCriteria?.SelectedGeoHazards?.length) {
      const placeholders = searchCriteria.SelectedGeoHazards.map(() => '?').join(',');
      conditions.push(`geo_hazard IN (${placeholders})`);
      params.push(...searchCriteria.SelectedGeoHazards);
    }
    if (searchCriteria.ObserverId != null) {
      conditions.push(`observer_id = ?`);
      params.push(searchCriteria.ObserverId);
    }
    if (searchCriteria.ObserverNickName?.length) {
      conditions.push(`observer_nick LIKE ?`);
      params.push(`%${searchCriteria.ObserverNickName}%`);
    }
    if (searchCriteria.FromDtObsTime?.length) {
      conditions.push(`obs_time >= ?`);
      params.push(moment(searchCriteria.FromDtObsTime).valueOf());
    }
    if (searchCriteria.FromDtChangeTime?.length) {
      conditions.push(`change_time >= ?`);
      params.push(moment(searchCriteria.FromDtChangeTime).valueOf());
    }
    if (searchCriteria.Extent?.BottomRight?.Latitude != null) {
      conditions.push(`lat >= ?`);
      params.push(searchCriteria.Extent.BottomRight.Latitude);
    }
    if (searchCriteria.Extent?.BottomRight?.Longitude != null) {
      conditions.push(`lon <= ?`);
      params.push(searchCriteria.Extent.BottomRight.Longitude);
    }
    if (searchCriteria.Extent?.TopLeft?.Latitude != null) {
      conditions.push(`lat <= ?`);
      params.push(searchCriteria.Extent.TopLeft.Latitude);
    }
    if (searchCriteria.Extent?.TopLeft?.Longitude != null) {
      conditions.push(`lon >= ?`);
      params.push(searchCriteria.Extent.TopLeft.Longitude);
    }
    if (searchCriteria.ObserverCompetence?.length) {
      const placeholders = searchCriteria.ObserverCompetence.map(() => '?').join(',');
      conditions.push(`observer_competence IN (${placeholders})`);
      params.push(...searchCriteria.ObserverCompetence);
    }

    return {
      clause: conditions.length ? conditions.join(' AND ') : '1 = 1',
      params,
    };
  }

  private getOrderBy(searchCriteria: SearchCriteria): string {
    return searchCriteria.OrderBy === 'DtChangeTime' ? 'change_time' : 'obs_time';
  }

  private async cleanupRegistrations() {
    if (!this.conn) {
      throw new Error('No connection created');
    }
    const twoWeeksAgo = moment().subtract(14, 'days').valueOf();
    const statement = `DELETE FROM registration WHERE reg_time < ?;`;
    this.logger.debug('Cleanup registrations', DEBUG_TAG, { statement });
    const result = await this.conn.run(statement, [twoWeeksAgo]);
    this.logger.debug('DELETE result', DEBUG_TAG, { result });
  }

  private parseLimit(c: SearchCriteria): { clause: string; params: unknown[] } {
    if (c.NumberOfRecords && c.Offset) {
      return { clause: 'LIMIT ? OFFSET ?', params: [c.NumberOfRecords, c.Offset] };
    } else if (c.NumberOfRecords) {
      return { clause: 'LIMIT ?', params: [c.NumberOfRecords] };
    }
    return { clause: '', params: [] };
  }

  async selectRegistrations(searchCriteria: SearchCriteria, appMode: AppMode): Promise<RegistrationViewModel[]> {
    return this.withConnection(async (conn) => {
      const where = this.searchCriteriaToWhere(searchCriteria);
      const orderBy = this.getOrderBy(searchCriteria);
      const limit = this.parseLimit(searchCriteria);
      const statement = `SELECT data FROM registration WHERE ${where.clause} AND app_mode=? ORDER BY ${orderBy} DESC ${limit.clause};`;
      const params = [...where.params, appMode, ...limit.params];
      this.logger.debug('Query', DEBUG_TAG, { statement, searchCriteria });
      const result = await conn.query(statement, params);
      // The data property contains the json as a string
      const registrations = (result?.values || []).map((value) => JSON.parse(value.data));
      this.logger.debug('Query result', DEBUG_TAG, { n: registrations.length });
      return registrations;
    });
  }

  async getRegistrationCount(searchCriteria: SearchCriteria, appMode: AppMode): Promise<number> {
    return this.withConnection(async (conn) => {
      const where = this.searchCriteriaToWhere(searchCriteria);
      const statement = `SELECT COUNT(*) AS reg_count FROM registration WHERE ${where.clause} AND app_mode=?`;
      const params = [...where.params, appMode];
      this.logger.debug('Count', DEBUG_TAG, { statement, searchCriteria });
      const result = await conn.query(statement, params);
      this.logger.debug('Count result', DEBUG_TAG, { result });
      return result.values?.[0].reg_count || 0;
    });
  }

  /**
   * Load a single registration or null if not found
   */
  async loadRegistration(regId: number, appMode: AppMode): Promise<RegistrationViewModel | null> {
    return this.withConnection(async (conn) => {
      const statement = `SELECT data FROM registration WHERE reg_id = ? AND app_mode=?`;
      this.logger.debug('Query', DEBUG_TAG, { statement });
      const result = await conn.query(statement, [regId, appMode]);
      if (result?.values && result.values.length > 0) {
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
    });
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

    return this.withConnection(async (conn) => {
      let result: capSQLiteChanges | undefined;
      if (registrations.length) {
        this.logger.debug(`Inserting registrations`, DEBUG_TAG, { n: registrations.length });
        const cols = columns.join(',');
        const vals = columns.map(() => '?').join(',');
        const sql = `INSERT OR REPLACE INTO registration (${cols}) VALUES (${vals});`;

        const values = registrations.map((r) => regToValues(r));

        try {
          result = await conn.executeSet([
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
    });
  }

  /**
   * Delete one or more registrations
   */
  async deleteRegistrations(regIds: number[], appMode: AppMode) {
    if (!regIds.length) {
      return;
    }
    return this.withConnection(async (conn) => {
      const placeholders = regIds.map(() => '?').join(', ');
      const statement = `DELETE FROM registration WHERE reg_id IN (${placeholders}) AND app_mode=?;`;
      let result: capSQLiteChanges | undefined;
      try {
        result = await conn.run(statement, [...regIds, appMode]);
      } catch (error) {
        this.logger.error(error, DEBUG_TAG, 'Failed to delete registrations', { result, statement });
        throw error;
      }
      this.logger.debug('DELETE result', DEBUG_TAG, { result, statement });
    });
  }
}
