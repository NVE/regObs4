import { settings } from './settings';
import { AppMode } from '@varsom-regobs-common/core';
import { nSQL } from '@nano-sql/core';
import { getMode } from '@nano-sql/adapter-sqlite-cordova';
import {
  InanoSQLTableConfig,
  InanoSQLTable,
  InanoSQLQuery,
  InanoSQLDataModel,
  InanoSQLTableIndexConfig,
  InanoSQLInstance
} from '@nano-sql/core/lib/interfaces';

export class NanoSql {
  public static readonly TABLES = {
    OBSERVATION: {
      name: 'observation',
      instancePerAppMode: true,
      model: {
        'RegID:int': { pk: true },
        'GeoHazardTID:int': {},
        'LangKey:int': {},
        '*:any': {}
      },
      indexes: {}
      // indexes: {
      //     'GeoHazardTID:int': {},
      //     'LangKey:int': {},
      // },
    },
    TRIP_LOG: {
      name: 'triplog',
      model: {
        'id:uuid': { pk: true },
        'latitude:number': {},
        'longitude:number': {},
        'timestamp:number': {},
        'altitude:number': {},
        'speed:number': {},
        'accuracy:number': {},
        'heading:number': {}
      },
      indexes: {}
    },
    TRIP_LOG_ACTIVITY: {
      name: 'triplogactivity',
      model: {
        'id:uuid': { pk: true },
        'state:string': {},
        'timestamp:number': {}
      },
      indexes: {}
    },
    LEGACY_TRIP_LOG: {
      name: 'legacytrip',
      instancePerAppMode: true,
      model: {
        'id:string': { pk: true },
        '*:any': {}
      },
      indexes: {}
    },
    WARNING: {
      name: 'warning',
      model: {
        'id:string': { pk: true },
        '*:any': {}
      },
      indexes: {}
    },
    WARNING_FAVOURITE: {
      name: 'warning_favourite',
      model: {
        'id:string': { pk: true },
        '*:any': {}
      },
      indexes: {}
    },
    OFFLINE_MAP: {
      name: 'offlinemap',
      model: {
        'name:string': { pk: true },
        '*:any': {}
      },
      indexes: {}
    },
    OFFLINE_MAP_TILES: {
      name: 'offlinemaptiles',
      model: {
        'id:string': { pk: true },
        'mapName:string': {},
        'lastAccess:number': {},
        'size:number': {},
        'dataUrl:string': {},
        'mimeType:string': {}
      },
      indexes: {
        'mapName:string': {},
        'lastAccess:number': {},
        'size:number': {}
      }
    },
    OFFLINE_MAP_CACHE_SIZE: {
      name: 'offlinemapcachessize',
      model: {
        'id:string': { pk: true },
        'count:number': {},
        'size:number': {}
      }
    },
    OFFLINE_ASSET: {
      name: 'offlineasset',
      model: {
        'url:string': { pk: true },
        'type:string': {},
        'lastAccess:number': {},
        'size:number': {},
        'dataUrl:string': {}
      },
      indexes: {
        'lastAccess:number': {}
      }
    },
    MAP_SEARCH_HISTORY: {
      name: 'mapsearchhistory',
      model: {
        'id:string': { pk: true },
        '*:any': {}
      },
      indexes: {}
    },
    USER_SETTINGS: {
      name: 'usersettings',
      model: {
        'id:string': { pk: true },
        '*:any': {}
      },
      indexes: {}
    },
    USER: {
      name: 'user',
      instancePerAppMode: true,
      model: {
        'id:string': { pk: true },
        '*:any': {}
      },
      indexes: {}
    },
    DATA_LOAD: {
      name: 'dataload',
      model: {
        'id:string': { pk: true },
        '*:any': {}
      },
      indexes: {}
    },
    REGISTRATION: {
      name: 'registration',
      instancePerAppMode: true,
      model: {
        'id:uuid': { pk: true },
        '*:any': {}
      },
      indexes: {}
    },
    KDV_ELEMENTS: {
      name: 'kdvelements',
      instancePerAppMode: true,
      model: {
        'langKey:int': { pk: true },
        '*:any': {}
      },
      indexes: {}
    },
    OBSERVER_GROUPS: {
      name: 'groups',
      instancePerAppMode: true,
      model: {
        'key:string': { pk: true },
        'userId:string': {},
        '*:any': {}
      },
      indexes: {
        'userId:string': {}
      }
    },
    HELP_TEXTS: {
      name: 'helptexts',
      instancePerAppMode: true,
      model: {
        'langKey:int': { pk: true },
        '*:any': {}
      },
      indexes: {}
    }
  };

  static getTables() {
    const result: {
      name: string;
      instancePerAppMode: boolean;
      model: InanoSQLDataModel;
      indexes: InanoSQLTableIndexConfig;
    }[] = [];
    // tslint:disable-next-line:forin
    for (const tableDef in NanoSql.TABLES) {
      result.push(NanoSql.TABLES[tableDef]);
    }
    return result;
  }

  static getInstanceName(name: string, appMode: AppMode): string {
    return `${name}_${appMode}`;
  }

  static getTableModels(): InanoSQLTableConfig[] {
    const tables: InanoSQLTableConfig[] = [];
    for (const table of NanoSql.getTables()) {
      if (table.instancePerAppMode) {
        tables.push({
          name: NanoSql.getInstanceName(table.name, AppMode.Prod),
          model: table.model,
          indexes: table.indexes
        });
        tables.push({
          name: NanoSql.getInstanceName(table.name, AppMode.Demo),
          model: table.model,
          indexes: table.indexes
        });
        tables.push({
          name: NanoSql.getInstanceName(table.name, AppMode.Test),
          model: table.model,
          indexes: table.indexes
        });
      } else {
        tables.push({
          name: table.name,
          model: table.model,
          indexes: table.indexes
        });
      }
    }
    return tables;
  }

  static async init(
    dbName: string = settings.db.nanoSql.dbName,
    dbMode?: string
  ): Promise<void> {
    await nSQL().createDatabase({
      id: dbName,
      mode: dbMode || getMode(),
      version: 1.0,
      tables: this.getTableModels(),
      // cache: false,
      // historyMode: {
      //     table: 'row',
      // }
      plugins: [
        {
          name: 'Table Name Plugin', // Plugin to avoid random id on table name
          version: 1.0,
          dependencies: {},
          filters: [
            {
              name: 'configTableSystem',
              priority: 1000,
              call: (
                inputArgs: { res: InanoSQLTable; query: InanoSQLQuery },
                complete
              ) => {
                inputArgs.res.id = inputArgs.res.name;
                complete(inputArgs);
              }
            }
          ]
        }
      ]
    });
    // NOTE: It is also possible to implement migrations on version updates.
    // See: https://github.com/ClickSimply/Nano-SQL/issues/70
  }

  static getInstance(name: string, appMode: AppMode): InanoSQLInstance {
    return nSQL(`${name}_${appMode}`);
  }

  static async resetDb(
    onError?: (tableName: string, ex: Error) => void
  ): Promise<void[]> {
    // try {
    //     await nSQL().dropDatabase(settings.db.nanoSql.dbName);
    //     await this.init();
    // } catch (err) {
    //     console.log(err);
    // }
    return Promise.all(
      NanoSql.getTableModels().map((tableConfig) =>
        this.resetTable(tableConfig, onError)
      )
    );
  }

  static async resetTable(
    tableConfig: InanoSQLTableConfig,
    onError?: (tableName: string, ex: Error) => void
  ): Promise<void> {
    if (tableConfig.name === 'offlinemaptiles') {
      await this.dropAndRecreateTable(tableConfig, onError);
    } else {
      await this.deleteAllRowsInTable(tableConfig, onError);
    }
  }

  private static async deleteAllRowsInTable(
    tableConfig: InanoSQLTableConfig,
    onError?: (tableName: string, ex: Error) => void
  ) {
    try {
      await nSQL(tableConfig.name).query('delete').exec();
    } catch (ex) {
      if (onError) {
        onError(tableConfig.name, ex);
      }
    }
  }

  private static async dropAndRecreateTable(
    tableConfig: InanoSQLTableConfig,
    onError?: (tableName: string, ex: Error) => void
  ) {
    try {
      await nSQL(tableConfig.name).query('drop').exec();
    } catch (ex) {
      if (onError) {
        onError(tableConfig.name, ex);
      }
    }
    try {
      await nSQL().query('create table', tableConfig).exec();
    } catch (ex) {
      if (onError) {
        onError(tableConfig.name, ex);
      }
    }
  }
}
