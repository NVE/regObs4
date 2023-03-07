/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { CapacitorSQLite, capSQLiteChanges, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { RegistrationViewModel } from 'src/app/modules/common-regobs-api';
import moment from 'moment';
import { SearchCriteria } from '../../models/search-criteria';
import {
  catchError,
  concatMap,
  debounceTime,
  exhaustMap,
  filter,
  firstValueFrom,
  of,
  ReplaySubject,
  Subject,
  tap,
  timeout,
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

@Injectable({
  providedIn: 'root',
})
export class SqliteService {
  private hasChanges = new Subject<AppMode>();
  hasChanges$ = this.hasChanges.asObservable();

  private sqlite: SQLiteConnection;
  private conn: SQLiteDBConnection;

  private ready = new ReplaySubject<boolean>(1);
  private isReady$ = this.ready.asObservable().pipe(filter((ready) => ready === true));

  private requestReset = new Subject<void>();

  private isReady(): Promise<boolean> {
    return firstValueFrom(
      this.isReady$.pipe(
        timeout(5000),
        catchError((err) => {
          this.logger.error(err, DEBUG_TAG, 'Waiting for sqlite db to be ready timed out. Did white screen occur?');
          this.requestReset.next();
          return this.isReady$.pipe(
            timeout(10000),
            catchError((err) => {
              this.logger.error(err, DEBUG_TAG, 'Waiting for sqlite db to be ready timed out after reset');
              return of(true);
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
        tap((state) => this.logger.debug('App state changed', DEBUG_TAG, { state })),
        concatMap((state) => (state === 'pause' ? this.closeConn() : this.openConn()))
      )
      .subscribe();
    this.platform.pause.subscribe(() => this.pauseResumeEvent.next('pause'));
    this.platform.resume.subscribe(() => this.pauseResumeEvent.next('resume'));
    this.requestReset
      .pipe(
        debounceTime(2000),
        exhaustMap(() => this.reset())
      )
      .subscribe();
  }

  private async reset() {
    this.ready.next(false);
    this.logger.debug('Reset', DEBUG_TAG);
    await this.closeConn();
    await this.openConn();
    this.logger.debug('Reset done', DEBUG_TAG);
    this.ready.next(true);
  }

  private async openConn() {
    // This issue comment tries to explain the difference between createConnection and open
    // https://github.com/capacitor-community/sqlite/issues/157#issuecomment-895877446
    try {
      this.logger.debug('Create connection reference', DEBUG_TAG);
      // Remember to update version if you added changes to tables
      this.conn = await this.sqlite.createConnection(DATABASE_NAME, false, 'no-encryption', 5, false);
      this.logger.debug('Open connection', DEBUG_TAG);
      await this.conn.open();
    } catch (error) {
      this.logger.error(error, DEBUG_TAG, 'Failed to create/open connection');
      throw error;
    }
  }

  private async closeConn() {
    this.logger.debug('Closing connection', DEBUG_TAG);
    try {
      await this.sqlite.closeConnection(DATABASE_NAME, false);
      this.logger.debug('Connection closed', DEBUG_TAG);
    } catch (error) {
      this.logger.error(error, DEBUG_TAG, 'Failed to close connection');
    }
  }

  private async runUpgradeStatements() {
    this.logger.debug('Running upgrade statements');
    for (const stmt of UPGRADE_STATEMENTS) {
      this.logger.debug('Upgrade statement', DEBUG_TAG, stmt);
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
    await this.platform.ready();
    this.logger.debug('Initializing sqlite', DEBUG_TAG);
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
    await this.runUpgradeStatements();
    await this.openConn();
    await this.cleanupRegistrations();
    this.ready.next(true);
    this.printInitInfo();
  }

  async updateRegistrationsSyncTime(updateTimeMs: number, appMode: AppMode, lang: LangKey) {
    await this.isReady();
    this.logger.debug(`Update sync time`, DEBUG_TAG, { updateTimeMs, appMode });
    const result = await this.conn.execute(
      `INSERT OR REPLACE INTO registration_sync_time (sync_time_ms,app_mode,lang) VALUES (${updateTimeMs},'${appMode}',${lang});`
    );
    this.logger.debug(`Sync time updated`, DEBUG_TAG, result);
  }

  async readRegistrationsSyncTime(appMode: AppMode, lang: LangKey) {
    await this.isReady();
    this.logger.debug('Reading sync time', DEBUG_TAG, { appMode });
    const result = await this.conn.query(
      `SELECT * FROM registration_sync_time WHERE app_mode='${appMode}' AND lang=${lang};`
    );
    this.logger.debug('Sync time', DEBUG_TAG, result);
    return result.values[0].sync_time_ms;
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

  private async cleanupRegistrations() {
    const twoWeeksAgo = moment().subtract(14, 'days').valueOf();
    const statement = `DELETE FROM registration WHERE reg_time < ${twoWeeksAgo}`;
    this.logger.debug('Cleanup registrations', DEBUG_TAG, { statement });
    const result = await this.conn.execute(statement);
    this.logger.debug('DELETE result', DEBUG_TAG, result);
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
    const statement = `SELECT data FROM registration WHERE ${where} AND app_mode='${appMode}' ORDER BY change_time DESC ${this.parseLimit(
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

    await this.isReady();

    // NB: Same order as columns above
    // const regToValues = (reg: RegistrationViewModel) => `(${[
    //   reg.RegId,
    //   reg.GeoHazardTID,
    //   reg.Observer.ObserverID,
    //   `'${reg.Observer.NickName}'`,
    //   `'${JSON.stringify(reg)}'`,
    //   dateToMs(reg.DtObsTime),
    //   dateToMs(reg.DtRegTime),
    //   dateToMs(reg.DtChangeTime),
    //   `'${appMode}'`,
    //   reg.ObsLocation.Latitude,
    //   reg.ObsLocation.Longitude
    //   `'${reg.Observer.CompetenceLevelTID}'`
    // ].join(',')})`;

    const regToValues = (r: RegistrationViewModel) =>
      `(${r.RegId},${r.GeoHazardTID},${r.Observer.ObserverID},'${r.Observer.NickName}','${toJson(r)}',` +
      `${dateToMs(r.DtObsTime)},${dateToMs(r.DtRegTime)},${dateToMs(r.DtChangeTime)},'${appMode}',` +
      `${r.ObsLocation.Latitude},${r.ObsLocation.Longitude},${lang},${r.Observer.CompetenceLevelTID})`;

    const statements = registrations.map(regToValues);

    let result: capSQLiteChanges;
    if (statements.length) {
      this.logger.debug(`Inserting registrations`, DEBUG_TAG, { n: statements.length });
      const sql = `INSERT OR REPLACE INTO registration (${columns.join(',')}) VALUES ${statements.join(',')};
      `;
      try {
        result = await this.conn.execute(sql);
      } catch (error) {
        this.logger.debug(`Execute error: ${sql}`, DEBUG_TAG);
        throw error;
      }
      this.logger.debug(`Execute result`, DEBUG_TAG, result);
      this.hasChanges.next(appMode);
    } else {
      this.logger.debug(`Nothing to insert`, DEBUG_TAG);
    }

    return result;
  }
}
