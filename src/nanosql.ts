import { settings } from './settings';
import { AppMode } from './app/core/models/app-mode.enum';
import { nSQL } from '@nano-sql/core';
import { getMode } from '@nano-sql/adapter-sqlite-cordova';
import { InanoSQLTableConfig, InanoSQLTable, InanoSQLQuery, adapterConnectFilter } from '@nano-sql/core/lib/interfaces';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';

export class NanoSql {
    public static readonly TABLES = {
        OBSERVATION: {
            name: 'observation',
            instancePerAppMode: true, // Create one table for each app 
            model: {
                'RegID:int': { pk: true },
                'GeoHazardTID:int': {},
                'LangKey:int': {},
                '*:*': {},
            },
            indexes: {},
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
                'heading:number': {},
            },
            indexes: {}
        },
        TRIP_LOG_ACTIVITY: {
            name: 'triplogactivity',
            model: {
                'id:uuid': { pk: true },
                'state:string': {},
                'timestamp:number': {},
            },
            indexes: {},
        },
        LEGACY_TRIP_LOG: {
            name: 'legacytrip',
            model: {
                'id:string': { pk: true },
                '*:*': {},
            },
            indexes: {},
        },
        WARNING: {
            name: 'warning',
            model: {
                'id:string': { pk: true },
                '*:*': {},
            },
            indexes: {}
        },
        WARNING_FAVOURITE: {
            name: 'warning_favourite',
            model:
            {
                'id:string': { pk: true },
                '*:*': {},
            },
            indexes: {},
        },
        OFFLINE_MAP: {
            name: 'offlinemap',
            model:
            {
                'name:string': { pk: true },
                '*:*': {},
            },
            indexes: {}
        },
        OFFLINE_MAP_TILES: {
            name: 'offlinemaptiles',
            model: {
                'id:string': { pk: true },
                'url:string': {},
                'mapName:string': {},
                'lastAccess:number': {},
                'size:number': {},
            },
            indexes: {
                'mapName:string': {},
                'lastAccess:number': {},
            }
        },
        OFFLINE_ASSET: {
            name: 'offlineasset',
            model: {
                'url:string': { pk: true },
                'fileUrl:string': {},
                'type:string': {},
                'lastAccess:number': {},
            },
            indexes: {
                'lastAccess:number': {}
            }
        },
        MAP_SEARCH_HISTORY: {
            name: 'mapsearchhistory',
            model: {
                'id:string': { pk: true },
                '*:*': {},
            },
            indexes: {},
        },
        USER_SETTINGS: {
            name: 'usersettings',
            model: {
                'id:string': { pk: true },
                '*:*': {},
            },
            indexes: {},
        },
        USER: {
            name: 'user',
            instancePerAppMode: true,
            model: {
                'id:string': { 'pk': true },
                '*:*': {},
            },
            indexes: {},
        },
        DATA_LOAD: {
            name: 'dataload',
            model: {
                'id:string': { pk: true },
                '*:*': {},
            },
            indexes: {},
        },
        REGISTRATION: {
            name: 'registration',
            instancePerAppMode: true,
            model: {
                'id:uuid': { pk: true },
                '*:*': {},
            },
            indexes: {},
        },
        LOCATION: {
            name: 'location',
            instancePerAppMode: true,
            model: {
                'Id:int': { pk: true },
                'GeoHazardId:int': {},
                '*:*': {},
            },
            indexes: {
                'GeoHazardId:int': {}
            },
        },
        KDV_ELEMENTS: {
            name: 'kdvelements',
            instancePerAppMode: true,
            model: {
                'langKey:int': { pk: true },
                '*:*': {},
            },
            indexes: {},
        },
        OBSERVER_GROUPS: {
            name: 'groups',
            instancePerAppMode: true,
            model: {
                'key:string': { pk: true },
                'userId:string': {},
                '*:*': {},
            },
            indexes: {
                'userId:string': {},
            }
        },
        HELP_TEXTS: {
            name: 'helptexts',
            instancePerAppMode: true,
            model: {
                'langKey:int': { pk: true },
                '*:*': {},
            },
            indexes: {},
        },
    };

    static getTables() {
        const result = [];
        // tslint:disable-next-line:forin
        for (const tableDef in NanoSql.TABLES) {
            result.push(NanoSql.TABLES[tableDef]);
        }
        return result;
    }

    static getInstanceName(name: string, appMode: AppMode) {
        return `${name}_${appMode}`;
    }

    static getTableModels() {
        const tables: InanoSQLTableConfig[] = [];
        for (const table of NanoSql.getTables()) {
            if (table.instancePerAppMode) {
                tables.push({
                    name: NanoSql.getInstanceName(table.name, AppMode.Prod),
                    model: table.model,
                    indexes: table.indexes,
                });
                tables.push({
                    name: NanoSql.getInstanceName(table.name, AppMode.Demo),
                    model: table.model,
                    indexes: table.indexes,
                });
                tables.push({
                    name: NanoSql.getInstanceName(table.name, AppMode.Test),
                    model: table.model,
                    indexes: table.indexes,
                });
            } else {
                tables.push({
                    name: table.name,
                    model: table.model,
                    indexes: table.indexes,
                });
            }
        }
        return tables;
    }

    static async init() {
        await nSQL().connect({
            id: settings.db.nanoSql.dbName,
            mode: getMode(),
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
                            call: (inputArgs: { res: InanoSQLTable, query: InanoSQLQuery }, complete, cancel) => {
                                inputArgs.res.id = inputArgs.res.name;
                                complete(inputArgs);
                            }
                        }
                    ]
                },
            ],
        });
        const db = (<any>nSQL().adapter)._db;
        if (db && db.executeSql) {
            db.executeSql('PRAGMA journal_mode = WAL', null, (onSuccess) => {
                console.log('PRAGMA journal_mode = WAL success');
            });
            db.executeSql('PRAGMA synchronous = NORMAL', null, (onSuccess) => {
                console.log('PRAGMA synchronous = NORMAL success');
            });
        }
        // NOTE: It is also possible to implement migrations on version updates.
        // See: https://github.com/ClickSimply/Nano-SQL/issues/70
    }

    static getInstance(name: string, appMode: AppMode) {
        return nSQL(`${name}_${appMode}`);
    }

    static dropAllTables() {
        const promises = [];
        for (const table of NanoSql.getTables()) {
            if (table.instancePerAppMode) {
                promises.push(nSQL(NanoSql.getInstanceName(table.name, AppMode.Prod)).query('delete').exec());
                promises.push(nSQL(NanoSql.getInstanceName(table.name, AppMode.Demo)).query('delete').exec());
                promises.push(nSQL(NanoSql.getInstanceName(table.name, AppMode.Test)).query('delete').exec());
            } else {
                promises.push(nSQL(table.name).query('delete').exec());
            }
        }
        return Promise.all(promises);
    }
}
