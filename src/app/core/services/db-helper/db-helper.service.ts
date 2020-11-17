import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject, SQLiteDatabaseConfig } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { settings } from '../../../../settings';
import '../../helpers/ionic/platform-helper';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';
import { nSQL } from '@nano-sql/core';
import { NanoSql } from '../../../../nanosql';
import { LogLevel } from '../../../modules/shared/services/logging/log-level.model';
import { isAndroidOrIos } from '../../helpers/ionic/platform-helper';
const stringify = require('json-stringify-safe');

const DEBUG_CONTEXT = 'DbHelperService';

@Injectable({
  providedIn: 'root'
})
export class DbHelperService {

  sqliteobj: SQLiteObject;

  constructor(private sqlite: SQLite, private platform: Platform, private loggingService: LoggingService) {
  }

  async init() {
    if (isAndroidOrIos(this.platform)) {
      this.loggingService.debug('Create sqlite database connection (helper methods)', DEBUG_CONTEXT);
      const config: SQLiteDatabaseConfig = {
        name: settings.db.nanoSql.dbName,
        location: 'default',
      };
      this.sqliteobj = await this.sqlite.create(
        <any>{
          ...config,
          androidDatabaseProvider: 'system',
        }
      );

      try {
        await this.sqliteobj.executeSql('PRAGMA journal_mode = WAL; PRAGMA synchronous = NORMAL', []);
      } catch (err) {
        this.loggingService.log('Could not execute PRAGMA', err, LogLevel.Warning, DEBUG_CONTEXT);
      }
    }
  }

  /**
   * A faster query than NanoSQL. Does a direct qurey by id against SQlite database
   * @param table table name
   * @param id id
   */
  async getItemById<T>(table: string, id: string | number, idColumn = 'id') {
    if (this.sqliteobj) {
      return this.getItemByIdSqlLite<T>(table, id, idColumn);
    } else {
      return this.fallbackGetItemById<T>(table, id, idColumn);
    }
  }

  async resetDb(onError?: (tableName: string, ex: Error) => void) {
    if (this.sqliteobj) {
      // const dropTableFunc = async (tableName) => {
      //   await this.sqliteobj.executeSql(`DROP TABLE ${tableName}`)
      //   await nSQL(tableName).query('rebuild indexes').exec();
      // };
      try {
        await this.sqliteobj.executeSql('CREATE TABLE IF NOT EXISTS "_ai" (id TEXT PRIMARY KEY UNIQUE, inc BIGINT)');
      } catch (err) {
        if (onError) {
          onError('Could not create _ai table', err);
        }
      }
    }
    return NanoSql.resetDb(onError);
  }

  private async getItemByIdSqlLite<T>(table: string, id: string | number, idColumn = 'id'): Promise<T> {
    const select = `SELECT data FROM '${table}' where id = ?1`;
    const sqlResult = await this.sqliteobj.executeSql(select, [id]);
    if (sqlResult.rows && sqlResult.rows.length > 0) {
      const jsonString = sqlResult.rows.item(0).data;
      if (jsonString) {
        const result: T = JSON.parse(jsonString);
        return result;
      }
    }
  }

  private async fallbackGetItemById<T>(table: string, id: string | number, idColumn = 'id'): Promise<T> {
    const nanoSqlResult = await nSQL(table).query('select', [`${idColumn}`, '=', id]).exec();
    return <T>nanoSqlResult[0];
  }

  async fastInsert<T>(table: string, data: T[], idSelector?: (data: T) => any, rebuildIndexes = false) {
    if (this.sqliteobj) {
      await this.fastInsertSqlLite(table, data, idSelector);
    } else {
      await this.fastInsertNanoSql(table, data, idSelector);
    }
    if (rebuildIndexes) {
      nSQL(table).query('rebuild indexes').exec();
      // NOTE: There is a bug in rebuild indexes, so this might throw an exception
    }
  }

  private fastInsertSqlLite<T>(table: string, data: T[], idSelector?: (data: T) => any) {
    const _idSelector = idSelector ? idSelector : ((_data: T) => (<any>_data).id);
    const statements = data.map((val) => ([`INSERT OR REPLACE INTO ${table} VALUES (?1, ?2)`, [_idSelector(val), stringify(val)]]));
    return this.sqliteobj.sqlBatch(statements);
  }

  private fastInsertNanoSql<T>(table: string, data: T[], idSelector?: (data: T) => any) {
    return nSQL().rawImport({ [table]: data }, false);
  }
}
