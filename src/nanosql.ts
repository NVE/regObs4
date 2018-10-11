import { nSQL, DataModel } from 'nano-sql';
import { getMode } from 'cordova-plugin-nano-sqlite/lib/sqlite-adapter';
import { settings } from './settings';
import { NanoSqlTable } from './app/core/models/nanosql-table.model';

export class NanoSql {
    public static readonly TABLES = {
        REGISTRATION: {
            name: 'registration',
            model: [
                { key: 'RegId', type: 'number', props: ['pk'] },
                { key: 'GeoHazardTid', type: 'number', props: ['idx'] },
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
        WARNING: {
            name: 'warning',
            model: [
                { key: 'id', type: 'string', props: ['pk'] },
                { key: 'geoHazard', type: 'number', props: ['idx'] },
                { key: 'timestamp', type: 'number', props: ['idx'] },
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
                { key: 'url', type: 'string', props: ['pk'] },
                { key: 'tileId', type: 'string', props: ['idx'] },
                { key: 'mapName', type: 'string' },
            ]
        },
        OFFLINE_ASSET: {
            name: 'offlineasset',
            model: [
                { key: 'url', type: 'string', props: ['pk'] },
                { key: 'data', type: 'blob' },
                { key: 'type', type: 'string' },
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
        }
    };

    static getTables(): NanoSqlTable[] {
        const result: NanoSqlTable[] = [];
        // tslint:disable-next-line:forin
        for (const tableDef in NanoSql.TABLES) {
            result.push(NanoSql.TABLES[tableDef]);
        }
        return result;
    }

    static init() {
        nSQL().config({
            id: settings.db.nanoSql.dbName,
            mode: getMode()
        });
        for (const table of NanoSql.getTables()) {
            nSQL().table(table.name).model(table.model);
        }
        return nSQL().connect();
    }

    static dropAllTables() {
        const promises = [];
        for (const table of NanoSql.getTables()) {
            promises.push(nSQL().table(table.name).query('drop').exec());
        }
        return Promise.all(promises);
    }
}
