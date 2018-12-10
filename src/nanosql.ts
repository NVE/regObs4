import { nSQL, DataModel } from 'nano-sql';
import { getMode } from 'cordova-plugin-nano-sqlite/lib/sqlite-adapter';
import { settings } from './settings';
import { NanoSqlTable } from './app/core/models/nanosql-table.model';
import { AppMode } from './app/core/models/app-mode.enum';

export class NanoSql {
    public static readonly TABLES = {
        OBSERVATION: {
            name: 'observation',
            instancePerAppMode: true, // Create one table for each app mode
            model: [
                { key: 'RegID', type: 'number', props: ['pk'] },
                { key: 'GeoHazardTID', type: 'number', props: ['idx'] },
                { key: 'LangKey', type: 'number', props: ['idx'] },
                { key: '*', type: '*' },
            ]
        },
        TRIP_LOG: {
            name: 'triplog',
            model: [
                { key: 'id', type: 'int', props: ['pk', 'ai'] },
                { key: 'latitude', type: 'number' },
                { key: 'longitude', type: 'number' },
                { key: 'timestamp', type: 'number' },
                { key: 'altitude', type: 'number' },
                { key: 'speed', type: 'number' },
                { key: 'accuracy', type: 'number' },
                { key: 'heading', type: 'number' },
            ]
        },
        TRIP_LOG_ACTIVITY: {
            name: 'triplogactivity',
            model: [
                { key: 'id', type: 'int', props: ['pk', 'ai'] },
                { key: 'state', type: 'string' },
                { key: 'timestamp', type: 'number' },
            ]
        },
        LEGACY_TRIP_LOG: {
            name: 'lagacytrip',
            model: [
                { key: 'id', type: 'string', props: ['pk'] },
                { key: '*', type: '*' },
            ]
        },
        WARNING: {
            name: 'warning',
            model: [
                { key: 'id', type: 'string', props: ['pk'] },
                { key: '*', type: '*' },
            ]
        },
        WARNING_FAVOURITE: {
            name: 'warning_favourite',
            model: [
                { key: 'id', type: 'string', props: ['pk'] },
                { key: '*', type: '*' },
            ]
        },
        OFFLINE_MAP: {
            name: 'offlinemap',
            model: [
                { key: 'name', type: 'string', props: ['pk'] },
                { key: '*', type: '*' },
            ]
        },
        OFFLINE_MAP_TILES: {
            name: 'offlinemaptiles',
            model: [
                { key: 'id', type: 'string', props: ['pk'] },
                { key: 'url', type: 'string' },
                { key: 'mapName', type: 'string', props: ['idx'] },
                { key: 'lastAccess', type: 'number', props: ['idx'] },
                { key: 'size', type: 'number' },
            ]
        },
        OFFLINE_ASSET: {
            name: 'offlineasset',
            model: [
                { key: 'url', type: 'string', props: ['pk'] },
                { key: 'fileUrl', type: 'string' },
                { key: 'type', type: 'string' },
                { key: 'lastAccess', type: 'number', props: ['idx'] },
            ]
        },
        MAP_SERVICE: {
            name: 'mapservice',
            model: [
                { key: 'id', type: 'string', props: ['pk'] },
                { key: '*', type: '*' },
            ]
        },
        USER_SETTINGS: {
            name: 'usersettings',
            model: [
                { key: 'id', type: 'string', props: ['pk'] },
                { key: '*', type: '*' },
            ]
        },
        USER: {
            name: 'user',
            instancePerAppMode: true,
            model: [
                { key: 'id', type: 'string', props: ['pk'] },
                { key: '*', type: '*' },
            ]
        },
        DATA_LOAD: {
            name: 'dataload',
            model: [
                { key: 'id', type: 'string', props: ['pk'] },
                { key: '*', type: '*' },
            ]
        },
        REGISTRATION: {
            name: 'registration',
            instancePerAppMode: true,
            model: [
                { key: 'id', type: 'int', props: ['ai', 'pk'] },
                { key: '*', type: '*' },
            ]
        },
        LOCATION: {
            name: 'location',
            instancePerAppMode: true,
            model: [
                { key: 'Id', type: 'int', props: ['pk'] },
                { key: 'GeoHazardId', type: 'int', props: ['idx'] },
                { key: '*', type: '*' },
            ]
        },
        KDV_ELEMENTS: {
            name: 'kdvelements',
            instancePerAppMode: true,
            model: [
                { key: 'langKey', type: 'int', props: ['pk'] },
                { key: '*', type: '*' },
            ]
        },
        OBSERVER_GROUPS: {
            name: 'groups',
            instancePerAppMode: true,
            model: [
                { key: 'key', type: 'string', props: ['pk'] },
                { key: 'userId', type: 'string', props: ['idx'] },
                { key: '*', type: '*' },
            ]
        },
        HELP_TEXTS: {
            name: 'helptexts',
            instancePerAppMode: true,
            model: [
                { key: 'langKey', type: 'int', props: ['pk'] },
                { key: '*', type: '*' },
            ]
        },
    };

    static getTables(): NanoSqlTable[] {
        const result: NanoSqlTable[] = [];
        // tslint:disable-next-line:forin
        for (const tableDef in NanoSql.TABLES) {
            result.push(NanoSql.TABLES[tableDef]);
        }
        return result;
    }

    static getInstanceName(name: string, appMode: AppMode) {
        return `${name}_${appMode}`;
    }

    static async init() {
        nSQL().config({
            id: settings.db.nanoSql.dbName,
            mode: getMode(),
            version: 1,
            // cache: false, // https://github.com/ClickSimply/Nano-SQL/issues/34
            // historyMode: {
            //     table: 'row',
            // }
        });
        // NOTE: It is also possible to implement migrations on version updates.
        // See: https://github.com/ClickSimply/Nano-SQL/issues/70
        for (const table of NanoSql.getTables()) {
            if (table.instancePerAppMode) {
                nSQL().table(NanoSql.getInstanceName(table.name, AppMode.Prod)).model(table.model);
                nSQL().table(NanoSql.getInstanceName(table.name, AppMode.Demo)).model(table.model);
                nSQL().table(NanoSql.getInstanceName(table.name, AppMode.Test)).model(table.model);
            } else {
                nSQL().table(table.name).model(table.model);
            }
        }
        await nSQL().connect();
        const adapter = await nSQL().extend('get_adapter');
        const adapterName = (<any>adapter[0]).constructor.name;
        console.log(`[INFO][NanoSQL] NanoSQL conencted. Using adapter:`, adapterName);
    }

    static getInstance(name: string, appMode: AppMode) {
        return nSQL(`${name}_${appMode}`);
    }

    static dropAllTables() {
        const promises = [];
        for (const table of NanoSql.getTables()) {
            if (table.instancePerAppMode) {
                promises.push(nSQL().table(NanoSql.getInstanceName(table.name, AppMode.Prod)).query('drop').exec());
                promises.push(nSQL().table(NanoSql.getInstanceName(table.name, AppMode.Demo)).query('drop').exec());
                promises.push(nSQL().table(NanoSql.getInstanceName(table.name, AppMode.Test)).query('drop').exec());
            } else {
                promises.push(nSQL().table(table.name).query('drop').exec());
            }
        }
        return Promise.all(promises);
    }
}
