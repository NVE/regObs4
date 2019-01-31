import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { settings } from '../../../../settings';
import '../../helpers/ionic/platform-helper';
import { NanoSql } from '../../../../nanosql';
import { nSQL } from 'nano-sql';

@Injectable({
  providedIn: 'root'
})
export class DbHelperService {

  sqliteobj: SQLiteObject;
  readyPromise: Promise<any>;

  constructor(private sqlite: SQLite, private platform: Platform) {
    this.readyPromise = this.platform.ready().then(() => {
      if (this.platform.isAndroidOrIos()) {
        this.sqlite.create(<any>({
          name: `${settings.db.nanoSql.dbName}_db`,
          location: 'default',
          androidDatabaseProvider: 'system',
        })).then((result) => {
          this.sqliteobj = result;
        });
      }
    });
  }

  /**
   * A faster query than NanoSQL. Does a direct qurey by id against SQlite database
   * @param table table name
   * @param id id
   */
  async getItemById<T>(table: string, id: string | number, idColumn = 'id') {
    await this.readyPromise;
    if (this.sqliteobj) {
      return this.getItemByIdSqlLite<T>(table, id, idColumn);
    } else {
      return this.fallbackGetItemById<T>(table, id, idColumn);
    }
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
    const nanoSqlResult = await nSQL().table(table).query('select', [`${idColumn}`, '=', id]).exec();
    return nanoSqlResult[0];
  }

  async fastInsert<T>(table: string, data: T[], idSelector?: (data: T) => any) {
    await this.readyPromise;
    if (this.sqliteobj) {
      await this.fastInsertSqlLite(table, data, idSelector);
    } else {
      await this.fastInsertNanoSql(table, data, idSelector);
    }
    await nSQL().extend('rebuild_idx', table);
  }

  private fastInsertSqlLite<T>(table: string, data: T[], idSelector?: (data: T) => any) {
    const _idSelector = idSelector ? idSelector : ((_data: T) => (<any>_data).id);
    const statements = data.map((val) => ([`INSERT OR REPLACE INTO ${table} VALUES (?1, ?2)`, [_idSelector(val), JSON.stringify(val)]]));
    return this.sqliteobj.sqlBatch(statements);
  }

  private fastInsertNanoSql<T>(table: string, data: T[], idSelector?: (data: T) => any) {
    return nSQL().rawImport({ [table]: data });
  }
}
