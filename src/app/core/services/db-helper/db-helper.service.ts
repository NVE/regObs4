import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { settings } from '../../../../settings';
import '../../helpers/ionic/platform-helper';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';
import { nSQL } from '@nano-sql/core';
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
    if (this.platform.isAndroidOrIos()) {
      this.loggingService.debug('Create sqlite database connection (helper methods)', DEBUG_CONTEXT);
      this.sqliteobj = await this.sqlite.create(<any>({
        name: settings.db.nanoSql.dbName,
        location: 'default',
        androidDatabaseProvider: 'system',
      }));
    }
  }

  // /**
  //  * A faster query than NanoSQL. Does a direct qurey by id against SQlite database
  //  * @param table table name
  //  * @param id id
  //  */
  // async getItemById<T>(table: string, id: string | number, idColumn = 'id') {
  //   if (this.sqliteobj) {
  //     return this.getItemByIdSqlLite<T>(table, id, idColumn);
  //   } else {
  //     return this.fallbackGetItemById<T>(table, id, idColumn);
  //   }
  // }

  // private async getItemByIdSqlLite<T>(table: string, id: string | number, idColumn = 'id'): Promise<T> {
  //   const select = `SELECT data FROM '${table}' where id = ?1`;
  //   const sqlResult = await this.sqliteobj.executeSql(select, [id]);
  //   if (sqlResult.rows && sqlResult.rows.length > 0) {
  //     const jsonString = sqlResult.rows.item(0).data;
  //     if (jsonString) {
  //       const result: T = JSON.parse(jsonString);
  //       return result;
  //     }
  //   }
  // }

  // private async fallbackGetItemById<T>(table: string, id: string | number, idColumn = 'id'): Promise<T> {
  //   const nanoSqlResult = await nSQL(table).query('select', [`${idColumn}`, '=', id]).exec();
  //   return <T>nanoSqlResult[0];
  // }

  async fastInsert<T>(table: string, data: T[], idSelector?: (data: T) => any, rebuildIndexes = false) {
    if (this.sqliteobj) {
      await this.fastInsertSqlLite(table, data, idSelector);
    } else {
      await this.fastInsertNanoSql(table, data, idSelector);
    }
    if (rebuildIndexes) {
      nSQL(table).query('rebuild indexes').exec();
      // NOTE: There is a bug in rebuild indexes, to this might throw an exception
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
