import { settings } from './settings';
import { AppMode } from './app/core/models/app-mode.enum';
import { nSQL } from '@nano-sql/core';
import { getMode } from '@nano-sql/adapter-sqlite-cordova';
import { InanoSQLTableConfig, InanoSQLTable, InanoSQLQuery, InanoSQLDataModel, InanoSQLIndex, InanoSQLTableIndexConfig } from '@nano-sql/core/lib/interfaces';
export class NanoSql {
    public static readonly TABLES = {
        OBSERVATION: {
            name: 'observation',
            instancePerAppMode: true,
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
            instancePerAppMode: true,
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
                'mapName:string': {},
                'lastAccess:number': {},
                'size:number': {},
                'dataUrl:string': {},
            },
            indexes: {
                'mapName:string': {},
                'lastAccess:number': {},
                'size:number': {},
            }
        },
        OFFLINE_MAP_CACHE_SIZE: {
            name: 'offlinemapcachessize',
            model: {
                'id:string': { pk: true },
                'count:number': {},
                'size:number': {},
            }
        },
        OFFLINE_ASSET: {
            name: 'offlineasset',
            model: {
                'url:string': { pk: true },
                'type:string': {},
                'lastAccess:number': {},
                'size:number': {},
                'dataUrl:string': {},
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
        const result: { name: string, instancePerAppMode: boolean, model: InanoSQLDataModel, indexes: InanoSQLTableIndexConfig }[] = [];
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

    static async resetDb() {
        return Promise.all(NanoSql.getTableModels().map((tableConfig) => this.resetTable(tableConfig)));
    }

    static async resetTable(tableConfig: InanoSQLTableConfig) {
        // await nSQL(tableConfig.name).query('drop').exec();
        // await nSQL().query('create table', tableConfig).exec();
        await nSQL(tableConfig.name).query('delete').exec();
    }
}
