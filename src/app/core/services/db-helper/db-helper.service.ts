import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { settings } from '../../../../settings';

@Injectable({
  providedIn: 'root'
})
export class DbHelperService {

  sqliteobj: SQLiteObject;

  constructor(private sqlite: SQLite, private platform: Platform) {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova') && (this.platform.is('android') || this.platform.is('ios'))) {
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
  async getItemById<T>(table: string, id: string | number) {
    if (this.sqliteobj) {
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
    return null;
  }
}
