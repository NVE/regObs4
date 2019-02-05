import { Injectable } from '@angular/core';
import { OfflineMap } from './offline-map.model';
import { Progress } from './progress.model';
import * as moment from 'moment';
import { Platform } from '@ionic/angular';
import { BackgroundDownloadService } from '../background-download/background-download.service';
import { OfflineTile } from './offline-tile.model';
import { NanoSql } from '../../../../nanosql';
import { HTTP } from '@ionic-native/http/ngx';
import { File, FileEntry, Entry } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { settings } from '../../../../settings';
import { DbHelperService } from '../db-helper/db-helper.service';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';
import { LogLevel } from '../../../modules/shared/services/logging/log-level.model';
import { nSQL } from '@nano-sql/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NanoSqlObservableHelper } from '../../helpers/nano-sql/nanoObserverToRxjs';

const DEBUG_TAG = 'OfflineMapService';

@Injectable({
  providedIn: 'root'
})
export class OfflineMapService {
  constructor(
    private backgroundDownloadService: BackgroundDownloadService,
    private platform: Platform,
    private http: HTTP,
    private file: File,
    private webview: WebView,
    private dbHelperService: DbHelperService,
    private loggingService: LoggingService,
  ) {

  }
  // TODO: Implement continue download when app restart

  private isInQueue(m: OfflineMap) {
    return m.downloadStart && !m.downloadComplete;
  }

  async continueDownload() {
    const offlineMaps = await this.getOfflineMaps();
    const mapsToDownload = offlineMaps.filter((x) => this.isInQueue(x));
    for (const m of mapsToDownload) {
      await this.downloadMap(m);
    }
  }

  getOfflineMaps(): Promise<OfflineMap[]> {
    return nSQL(NanoSql.TABLES.OFFLINE_MAP.name).query('select').exec() as Promise<OfflineMap[]>;
  }

  getOfflineMapsAsObservable(): Observable<OfflineMap[]> {
    return NanoSqlObservableHelper.toRxJS<OfflineMap[]>(
      nSQL(NanoSql.TABLES.OFFLINE_MAP.name).query('select').listen({
        debounce: 500,
      })).pipe(map((x) => this.mergeOfflineMaps(x)));
  }

  mergeOfflineMaps(savedMaps: OfflineMap[]) {
    const availableMaps: OfflineMap[] = [{
      name: 'Kautokeino',
      url: 'https://offlinetiles.blob.core.windows.net/offline-tiles/Kautokeino.zip',
      size: 1597336931,
      filename: 'Kautokeino.zip'
    },
    {
      name: 'Luster',
      url: 'https://offlinetiles.blob.core.windows.net/offline-tiles/Luster.zip',
      size: 1199225911,
      filename: 'Luster.zip'
    },
    {
      name: 'Small-test',
      url: 'https://offlinetiles.blob.core.windows.net/offline-tiles/Small-test.zip',
      size: 19296,
      filename: 'Small-test.zip'
    }];
    return availableMaps.map((m) => {
      const currentMap = { ...m };
      const savedMap = savedMaps.find((x) => x.name === m.name);
      if (savedMap) {
        currentMap.filePath = savedMap.filePath;
        currentMap.progress = savedMap.progress;
        currentMap.downloadComplete = savedMap.downloadComplete;
        currentMap.downloadStart = savedMap.downloadStart;
        currentMap.size = savedMap.size;
      }
      return currentMap;
    });
  }

  private updateTileLastAccess(tile: OfflineTile) {
    tile.lastAccess = moment().unix();
    return nSQL(NanoSql.TABLES.OFFLINE_MAP_TILES.name).query('upsert', tile).exec();
  }

  async getTileUrl(name: string, x: number, y: number, z: number) {
    if (this.platform.is('cordova') && (this.platform.is('android') || this.platform.is('ios'))) {
      const tileId = this.getTileId(name, x, y, z);
      const tileFromDb = await this.getTileFromDb(tileId);
      if (tileFromDb) {
        this.updateTileLastAccess(tileFromDb);
        return this.webview.convertFileSrc(tileFromDb.url);
      }
    }
    return null;
  }

  async saveTileAsBlob(name: string, x: number, y: number, z: number, url: string) {
    try {
      // const headers = new HttpHeaders(
      //   { 'Content-Type': 'application/jpeg',
      //   });
      // const result = await this.httpClient.get(url, {
      //   responseType: 'blob', headers
      // }).toPromise();
      // NOTE: CORS ISSUES WHEN USING WKWEBKIT, using native http instead...
      const tileId = this.getTileId(name, x, y, z);
      const filename = `${settings.map.tiles.cacheFolder}/${tileId}.png`;
      const folder = await this.backgroundDownloadService.selectDowloadFolder();
      try {
        await this.file.createDir(folder, settings.map.tiles.cacheFolder, false);
      } catch { }

      const fileResult: FileEntry = await this.http.downloadFile(url, {}, {},
        `${folder}/${filename}`);

      const size = await this.getFileSize(fileResult);

      const tile: OfflineTile = {
        id: tileId,
        mapName: settings.map.tiles.cacheFolder,
        url: fileResult.toURL(),
        lastAccess: moment().unix(),
        size,
      };
      return nSQL(NanoSql.TABLES.OFFLINE_MAP_TILES.name).query('upsert', tile).exec();
    } catch (err) {
      this.loggingService.log('Could not download tile', err, LogLevel.Warning, DEBUG_TAG, { name, url, x, y, z });
    }
  }

  private getTileId(name: string, x: number, y: number, z: number) {
    return `${name}_${z}_${x}_${y}`;
  }

  async getTileFromDb(tileId: string): Promise<OfflineTile> {
    const tiles = await nSQL(NanoSql.TABLES.OFFLINE_MAP_TILES.name)
      .query('select').where(['id', '=', tileId]).exec();
    if (tiles.length > 0) {
      return tiles[0] as OfflineTile;
    }
  }

  async cleanupTilesCache(numberOfItemsToCache: number) {
    const result = (await nSQL(NanoSql.TABLES.OFFLINE_MAP_TILES.name)
      .query('select').where((x) => x.mapName === settings.map.tiles.cacheFolder)
      .orderBy(['lastAccess: desc']).offset(numberOfItemsToCache).exec()) as OfflineTile[];
    // TODO: Use index where clause when issue has been fixed
    for (const tile of result) {
      const file = await this.file.resolveLocalFilesystemUrl(tile.url);
      if (file && file.isFile) {
        const fileDeleted = await new Promise<boolean>((resolve) => {
          file.remove(() => resolve(true), () => resolve(false));
        });
        this.loggingService.debug(`Tile ${tile.url} deleted: ${fileDeleted}`, DEBUG_TAG, tile);
      } else {
        this.loggingService.debug(`Tile ${tile.url} not found`, DEBUG_TAG, tile);
      }
    }
    const tileIds = result.map((x) => x.id);
    const deleted = await nSQL(NanoSql.TABLES.OFFLINE_MAP_TILES.name)
      .query('delete').where((x: OfflineTile) => tileIds.indexOf(x.id) >= 0).exec();
    // TODO: Use index where clause when issue has been fixed
    this.loggingService.debug(`Cache tiles deleted`, DEBUG_TAG, deleted);
  }

  private async getDirectory(folder: string) {
    const baseFolder = await this.backgroundDownloadService.selectDowloadFolder();
    return this.file.resolveDirectoryUrl(baseFolder + '/' + folder);
  }

  private async getFolderSize(folder: string): Promise<number> {
    const baseFolder = await this.backgroundDownloadService.selectDowloadFolder();
    const files = await this.file.listDir(baseFolder, folder);
    let totalSize = 0;
    for (const file of files || []) {
      totalSize += await this.getFileSize(file);
    }
    return totalSize;
  }

  private getFileSize(file: Entry) {
    if (!file) {
      return 0;
    } else {
      return new Promise<number>((resolve) =>
        file.getMetadata((success) => resolve(success.size), (_) => resolve(0)));
    }
  }

  async getTilesCacheSize(): Promise<{ count: number, size: number }> {
    const result = await nSQL(NanoSql.TABLES.OFFLINE_MAP_TILES.name)
      .query('select', ['COUNT(*)', 'SUM(size)']).where((x: OfflineTile) => x.mapName === settings.map.tiles.cacheFolder).exec();
    return { count: result[0]['COUNT(*)'], size: result[0]['SUM(size)'] };
  }

  async deleteTilesCache() {
    await nSQL(NanoSql.TABLES.OFFLINE_MAP_TILES.name)
      .query('delete').where((x: OfflineTile) => x.mapName === settings.map.tiles.cacheFolder).exec();
    const baseFolder = await this.backgroundDownloadService.selectDowloadFolder();
    await this.backgroundDownloadService.deleteFolder(baseFolder, settings.map.tiles.cacheFolder);
  }

  async downloadMap(m: OfflineMap) {
    try {
      const path = await this.backgroundDownloadService.selectDowloadFolder();
      if (path.length > 0) {
        const mapToSave = {
          ...m,
          filePath: path,
          downloadStart: moment().unix(),
          downloaded: 0,
          progress: 0,
          downloadComplete: null,
        };
        await nSQL(NanoSql.TABLES.OFFLINE_MAP.name)
          .query('upsert', mapToSave)
          .exec();

        await this.backgroundDownloadService.downloadFile(
          path,
          m.filename,
          m.url,
          async () => await this.onComplete(m.name),
          async (progress) => await this.onProgress(m.name, progress),
          async (error) => await this.onError(m.name, error));
      }
    } catch (error) {
      await this.onError(m.name, error);
    }
  }

  private async getSavedMap(name: string): Promise<OfflineMap> {
    const result = await nSQL(NanoSql.TABLES.OFFLINE_MAP.name)
      .query('select').where((m: OfflineMap) => m.name === name).exec() as OfflineMap[];
    return result[0];
  }

  private async deleteMapFromDb(name: string) {
    await nSQL(NanoSql.TABLES.OFFLINE_MAP.name)
      .query('delete', { name }).exec(); // TODO: Check that this works on device, maybe change
    await nSQL(NanoSql.TABLES.OFFLINE_MAP_TILES.name)
      .query('delete').where((x: OfflineTile) => x.mapName === name).exec();
  }

  async remove(m: OfflineMap) {
    await this.backgroundDownloadService.deleteFolder(m.filePath, m.name);
    await this.deleteMapFromDb(m.name);
  }

  async cancelDownload(m: OfflineMap) {
    this.backgroundDownloadService.cancelDownload(m.filename);
    await this.remove(m);
  }

  private async onProgress(name: string, progress: Progress) {
    const m = await this.getSavedMap(name);
    m.progress = progress;

    await nSQL(NanoSql.TABLES.OFFLINE_MAP.name)
      .query('upsert', m)
      .exec();
  }

  private async onError(name: string, error: Error) {
    this.loggingService.error(error, DEBUG_TAG, `Error downloading map ${name}`);
    await this.deleteMapFromDb(name);
    // TODO: Mark map with error?
  }

  private async onComplete(name: string) {
    const m = await this.getSavedMap(name);
    await this.saveMetaData(m);
    m.downloadComplete = moment().unix();
    m.progress = { percentage: 1.0 };
    await nSQL(NanoSql.TABLES.OFFLINE_MAP.name)
      .query('upsert', m)
      .exec();
  }

  private async saveMetaData(map: OfflineMap) {
    // TODO: Read metadata from json instead!
    const tiles = (await this.backgroundDownloadService.getAllFiles(map.filePath, map.name)).map((file) =>
      this.getOfflineTileFromFile(map.name, file.directory, file.name, file.url, file.size)
    );
    await nSQL(NanoSql.TABLES.OFFLINE_MAP_TILES.name).loadJS(tiles);
  }

  // Assumes map directory: /{mapName}/{tileName}/{z}/
  // filename: tile_{x}_{y}.png
  private getOfflineTileFromFile(mapName: string, directory: string, filename: string, url: string, size: number): OfflineTile {
    const index = directory.indexOf(mapName) + mapName.length + 1;
    const tileRest = directory.substr(index);
    const tileName = tileRest.substr(0, tileRest.indexOf('/')); // topo, clayzones, etc
    const zRest = tileRest.substr(tileRest.indexOf(tileName) + tileName.length + 1);
    const z = zRest.substr(0, zRest.indexOf('/'));
    const xRest = filename.substr(filename.indexOf('_') + 1);
    const x = xRest.substr(0, xRest.indexOf('_'));
    const yRest = xRest.substr(xRest.indexOf(x) + 2);
    const y = yRest.substr(0, yRest.indexOf('.'));
    const tileId = `${tileName}_${z}_${x}_${y}`;
    return {
      id: tileId, // NOTE: This overrides other downloaded maps, so when delete this map other maps can have the same tileId...
      // but using id as pk because of performance bug in nanoSQL https://github.com/ClickSimply/Nano-SQL/issues/94
      url: url,
      mapName: mapName,
      lastAccess: moment().unix(),
      size,
    };
  }

  // TODO: delete all directories insted
  async reset() {
    const maps = await this.getOfflineMaps();
    for (const m of maps) {
      await this.remove(m);
    }
    await this.deleteTilesCache();
  }
}
