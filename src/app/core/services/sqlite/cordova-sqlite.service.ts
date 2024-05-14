/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { RegistrationViewModel } from 'src/app/modules/common-regobs-api';
import moment from 'moment';
import { SearchCriteria } from '../../models/search-criteria';
import { BehaviorSubject, filter, firstValueFrom, ReplaySubject } from 'rxjs';
import { AppMode, LangKey } from 'src/app/modules/common-core/models';
import { Platform } from '@ionic/angular';
import { LogLevel } from 'src/app/modules/shared/services/logging/log-level.model';
import { SQLite, SQLiteObject, SQLiteDatabaseConfig } from '@awesome-cordova-plugins/sqlite/ngx';

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
const DATABASE_NAME = 'regobs-cordova-v1';
// IMPORTANT! Remember that you have to let sqlite know which version it should start with after you update the db.
// Check the createConnection() methods
const INIT_STATEMENTS = [
  // 'PRAGMA journal_mode = WAL; PRAGMA synchronous = NORMAL',
  `CREATE TABLE IF NOT EXISTS registration (
    reg_id INTEGER PRIMARY KEY NOT NULL,
    geo_hazard INTEGER NOT NULL,
    observer_id INTEGER NOT NULL,
    observer_nick TEXT,
    data JSON NOT NULL,
    obs_time INTEGER NOT NULL,
    reg_time INTEGER NOT NULL,
    change_time INTEGER NOT NULL,
    app_mode TEXT,
    lat REAL,
    lon REAL,
    lang INTEGER,
    observer_competence INTEGER );`,

  // TODO: Jeg har ikke sjekket hvordan man bruker indekser med sqlite / denne pluginen,
  //  Evt fjern før vi tar inn dette hvis vi ikke bruker det
  'CREATE INDEX IF NOT EXISTS registration_index_nick ON registration (observer_nick);',

  'CREATE INDEX IF NOT EXISTS registration_index_obs_time ON registration (obs_time);',

  'CREATE INDEX IF NOT EXISTS registration_index_reg_time ON registration (reg_time);',

  'CREATE INDEX IF NOT EXISTS registration_index_change_time ON registration (change_time);',

  `CREATE TABLE IF NOT EXISTS registration_sync_time (
    sync_time_ms INTEGER NOT NULL,
    app_mode TEXT PRIMARY KEY NOT NULL,
    lang INTEGER );
  `,
];

@Injectable({
  providedIn: 'root',
})
export class SqliteService {
  private isReady$ = new ReplaySubject<boolean>(1);

  private db: SQLiteObject;

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

  // private pauseResumeEvent = new Subject<'pause' | 'resume'>();

  constructor(private logger: LoggingService, private platform: Platform, private sqlite: SQLite) {
    this.logger.debug('Creating', DEBUG_TAG);

    // Close / open connection when app goes to/from background
    // Use a concatmap to avoid opening the connection while it is being closed.
    // this.pauseResumeEvent
    //   .pipe(
    //     takeUntil(this.hasCrashed$),
    //     tap((state) => this.logger.debug('App state changed', DEBUG_TAG, { state })),
    //     concatMap((state) => (state === 'pause' ? this.closeConn() : this.openConn()))
    //   )
    //   .subscribe({
    //     error: () => {
    //       this._hasCrashed.next(true);
    //     },
    //   });
    // this.platform.pause.subscribe(() => this.pauseResumeEvent.next('pause'));
    // this.platform.resume.subscribe(() => this.pauseResumeEvent.next('resume'));
  }

  private async truncateRegistrations() {
    this.logger.debug('Truncate registrations', DEBUG_TAG);
    await this.db.executeSql('DELETE FROM registration;');
  }

  private async truncateSyncTime() {
    this.logger.debug('Truncate sync_time', DEBUG_TAG);
    await this.db.executeSql('DELETE FROM registration_sync_time;');
  }

  async init() {
    await this.createOrOpenDb();
    await this.runInitStatements();
    this.isReady$.next(true);
  }

  private async createOrOpenDb() {
    this.logger.debug('Create db', DEBUG_TAG);
    try {
      this.db = await this.sqlite.create({
        name: DATABASE_NAME,
        location: 'default',
        // Denne option er ikke med i SQLiteDatabaseConfig - kanskje sjekke om vi
        // egentlig bør oppdatere en pakke eller noe
        androidDatabaseProvider: 'system',
      } as SQLiteDatabaseConfig);
    } catch (error) {
      this.logger.error(error, DEBUG_TAG, 'Failed to create db');
      throw error;
    }
  }

  private async runInitStatements() {
    this.logger.debug('Run init statements', DEBUG_TAG);
    try {
      await this.db.sqlBatch(INIT_STATEMENTS);
    } catch (error) {
      this.logger.error(error, DEBUG_TAG, 'Could not run init statements');
      throw error;
    }
  }

  private isReady(): Promise<boolean> {
    return firstValueFrom(this.isReady$);
  }

  async updateRegistrationsSyncTime(updateTimeMs: number, appMode: AppMode, lang: LangKey) {
    await this.isReady();
    this.logger.debug(`Update sync time`, DEBUG_TAG, { updateTimeMs, appMode });
    const resultSet: SQLResultSet = await this.db.executeSql(
      `INSERT OR REPLACE INTO registration_sync_time (sync_time_ms,app_mode,lang) VALUES (?,?,?);`,
      [updateTimeMs, appMode, lang]
    );
    const result = resultSet?.rows?.item(0);
    this.logger.debug(`Sync time updated`, DEBUG_TAG, { result });
  }

  async readRegistrationsSyncTime(appMode: AppMode, lang: LangKey) {
    await this.isReady();
    this.logger.debug('Reading sync time', DEBUG_TAG, { appMode });
    const resultSet: SQLResultSet = await this.db.executeSql(
      `SELECT * FROM registration_sync_time WHERE app_mode='${appMode}' AND lang=${lang};`
    );
    const result = resultSet.rows.length > 0 ? resultSet.rows.item(0) : null;
    this.logger.debug('Sync time', DEBUG_TAG, { result });
    return result?.sync_time_ms;
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
    const result: SQLResultSet = await this.db.executeSql(statement);
    this.logger.debug('DELETE result', DEBUG_TAG, { rowsAffected: result.rowsAffected });
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
    const result: SQLResultSet = await this.db.executeSql(statement);
    const registrations = [];
    for (let index = 0; index < result.rows.length; index++) {
      const row = result.rows.item(index);
      const registration = JSON.parse(row.data);
      registrations.push(registration);
    }
    // The data property contains the json as a string
    this.logger.debug('Query result', DEBUG_TAG, { n: registrations.length });
    return registrations;
  }

  async getRegistrationCount(searchCriteria: SearchCriteria, appMode: AppMode): Promise<number> {
    await this.isReady();
    const where = this.searchCriteriaToWhere(searchCriteria);
    const statement = `SELECT COUNT(*) AS reg_count FROM registration WHERE ${where} AND app_mode='${appMode}'`;
    this.logger.debug('Count', DEBUG_TAG, { statement, searchCriteria });
    const resultSet: SQLResultSet = await this.db.executeSql(statement);
    const row = resultSet.rows.item(0);
    const count = row?.reg_count;
    this.logger.debug('Count result', DEBUG_TAG, { count });
    return count;
  }

  /**
   * Load a single registration or null if not found
   */
  async loadRegistration(regId: number, appMode: AppMode): Promise<RegistrationViewModel> {
    await this.isReady();
    const statement = `SELECT data FROM registration WHERE reg_id = ${regId} AND app_mode='${appMode}'`;
    this.logger.debug('Query', DEBUG_TAG, { statement });
    const result: SQLResultSet = await this.db.executeSql(statement);
    if (result?.rows.length > 0) {
      // The data property contains the json as a string
      const registration = JSON.parse(result.rows.item(0).data);
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

    let result: SQLResultSet;
    if (registrations.length) {
      this.logger.debug(`Inserting registrations`, DEBUG_TAG, { n: registrations.length });
      const cols = columns.join(',');
      const vals = columns.map(() => '?').join(',');
      const sql = `INSERT OR REPLACE INTO registration (${cols}) VALUES (${vals});`;

      const values = registrations.map((r) => regToValues(r));

      try {
        result = await this.db.executeSql(sql, values);
      } catch (error) {
        this.logger.error(error, DEBUG_TAG, `Execute error`, { sql });
        throw error;
      }

      this.logger.debug(`Execute result`, DEBUG_TAG, { rowsAffected: result.rowsAffected });
      // this.hasChanges.next(appMode);
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
    let result: SQLResultSet;
    try {
      result = await this.db.executeSql(statement);
    } catch (error) {
      this.logger.error(error, DEBUG_TAG, 'Failed to delete registrations', { statement });
      throw error;
    }
    this.logger.debug('DELETE result', DEBUG_TAG, { rowsAffected: result.rowsAffected, statement });
  }
}
