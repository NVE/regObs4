import { Injectable } from '@angular/core';
import { OfflineMap } from './offline-map.model';
import { Progress } from './progress.model';
import * as moment from 'moment';
import { BackgroundDownloadService } from '../background-download/background-download.service';
import { OfflineTile } from './offline-tile.model';
import { NanoSql } from '../../../../nanosql';
import { File, Entry } from '@ionic-native/file/ngx';
import { settings } from '../../../../settings';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';
import { LogLevel } from '../../../modules/shared/services/logging/log-level.model';
import { nSQL } from '@nano-sql/core';
import { Observable, Observer, of, Subject } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { NanoSqlObservableHelper } from '../../helpers/nano-sql/nanoObserverToRxjs';
import { DbHelperService } from '../db-helper/db-helper.service';
import { DataUrlHelper } from '../../helpers/data-url.helper';
import { createWorker } from 'typed-web-workers';
import { LRUMap } from 'lru_map';
import { Platform } from '@ionic/angular';

const DEBUG_TAG = 'OfflineMapService';

@Injectable({
  providedIn: 'root'
})
export class OfflineMapService {
  private _savedTiles: LRUMap<string, boolean>;
  private _saveBuffer: LRUMap<string, HTMLImageElement>;
  private _interval: NodeJS.Timeout;
  private _shouldProcessOfflineImages: boolean;

  constructor(
    private backgroundDownloadService: BackgroundDownloadService,
    private file: File,
    private dbHelperService: DbHelperService,
    private loggingService: LoggingService,
    private platform: Platform,
  ) {
    this._savedTiles = new LRUMap(2000);
    this._saveBuffer = new LRUMap(100);
    this.platform.pause.subscribe(() => {
      clearTimeout(this._interval);
    });
    this.platform.resume.subscribe(() => {
      this.startProcessingOfflineImageSaveQueue();
    });
    this.startProcessingOfflineImageSaveQueue();
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

  private updateTileLastAccess(tileId: string) {
    return nSQL(NanoSql.TABLES.OFFLINE_MAP_TILES.name).query('upsert', { id: tileId, lastAccess: moment().unix() }).exec();
  }

  saveTileToOfflineCache(id: string, el: HTMLImageElement) {
    if (!this._savedTiles.has(id)) {
      this._savedTiles.set(id, true);
      this._saveBuffer.set(id, el);
    }
  }

  shouldProcessOfflineImage(val: boolean) {
    this._shouldProcessOfflineImages = val;
  }

  private startProcessingOfflineImageSaveQueue() {
    const continueProcessing = (timeout?: number) => {
      this._interval = setTimeout(() => this.startProcessingOfflineImageSaveQueue(),
        timeout || settings.map.tiles.cacheSaveBufferThrottleTimeMs);
    };

    // this.loggingService.debug(`Start processing offline tiles queue. Size: ${this._saveBuffer.size}`, DEBUG_TAG);
    if (this._interval) {
      clearInterval(this._interval);
    }
    if (this._shouldProcessOfflineImages && this._saveBuffer.size > 0) {
      const latest = this._saveBuffer.newest;
      this._saveBuffer.delete(latest.key);
      const currentTile = latest.value;
      this.getImageDataUrlAsObservable(currentTile).subscribe((result: { dataUrl: string, size: number }) => {
        if (result && result.dataUrl && result.size > 0) {
          this.saveTileDataUrlToDbCache(latest.key, result.dataUrl, result.size).then(() => {
            // this.loggingService.debug(`Saved tile: ${latest.key}`, DEBUG_TAG);
            continueProcessing();
          }, continueProcessing);
        } else {
          continueProcessing();
        }
      }, continueProcessing);
    } else {
      continueProcessing(settings.map.tiles.cacheSaveBufferIdleInterval);
    }
  }

  private workFunc(input: {
    blob: Blob,
  },
    callback: (_: { dataUrl: string, size: number }) => void) {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const dataUrl = (<any>e.target).result as string;
      if (dataUrl) {
        callback({ dataUrl, size: input.blob.size });
      } else {
        callback(null);
      }
    };
    fileReader.readAsDataURL(input.blob);
  }

  private getImageDataUrlAsObservable(el: HTMLImageElement, format = 'image/png', quality = 0.5):
    Observable<{ dataUrl: string, size: number }> {
    return Observable.create((observer: Observer<{ dataUrl: string, size: number }>) => {
      const typedWorker = createWorker(this.workFunc, (msg) => {
        observer.next(msg);
        observer.complete();
      });
      const canvas = DataUrlHelper.getCanvasFromImage(el);
      if (!canvas) {
        observer.next(null);
        observer.complete();
      } else {
        canvas.toBlob((blob) => {
          typedWorker.postMessage({ blob });
        }, format, quality);
      }
      return () => typedWorker ? typedWorker.terminate() : null;
    });
  }

  async saveTileDataUrlToDbCache(id: string, dataUrl: string, size: number) {
    try {
      const tile: OfflineTile = {
        id,
        mapName: settings.map.tiles.cacheFolder,
        lastAccess: moment().unix(),
        size,
        dataUrl
      };
      await nSQL(NanoSql.TABLES.OFFLINE_MAP_TILES.name).query('upsert', tile).exec();
      return tile;
    } catch (err) {
      this.loggingService.log('Could save offline tile cache', err, LogLevel.Warning, DEBUG_TAG, id);
      return null;
    }
  }

  private getTileId(name: string, x: number, y: number, z: number) {
    return `${name}_${z}_${x}_${y}`;
  }

  async getCachedTileDataUrl(tileId: string) {
    const tileFromDb = await this.getTileFromDb(tileId);
    if (tileFromDb) {
      return tileFromDb.dataUrl;
    }
    return undefined;
  }

  async getTileFromDb(tileId: string): Promise<OfflineTile> {
    const tiles = await nSQL(NanoSql.TABLES.OFFLINE_MAP_TILES.name)
      .query('select').where(['id', '=', tileId]).exec() as OfflineTile[];
    if (tiles.length > 0) {
      return tiles[0];
    }
    // return this.dbHelperService.getItemById<OfflineTile>(
    //   NanoSql.TABLES.OFFLINE_MAP_TILES.name, tileId);
  }

  getAllCacheTiles(): Promise<OfflineTile[]> {
    return nSQL(NanoSql.TABLES.OFFLINE_MAP_TILES.name)
      .query('select')
      .where(['mapName', '=', settings.map.tiles.cacheFolder])
      .orderBy(['lastAccess: desc']).exec() as Promise<OfflineTile[]>;
  }

  async cleanupTilesCache(numberOfItemsToCache: number) {
    const lastTile = await (nSQL(NanoSql.TABLES.OFFLINE_MAP_TILES.name)
      .query('select').where(['mapName', '=', settings.map.tiles.cacheFolder])
      .orderBy(['lastAccess: desc']).offset(numberOfItemsToCache).limit(1).exec() as Promise<OfflineTile[]>);
    if (lastTile.length > 0) {
      const maxDate = lastTile[0].lastAccess;
      return nSQL(NanoSql.TABLES.OFFLINE_MAP_TILES.name)
        .query('delete').where(['lastAccess', '<=', maxDate])
        .exec();
    }
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

  getFullTilesCacheAsObservable(): Observable<{ count: number, size: number }> {
    return NanoSqlObservableHelper.toRxJS(nSQL(NanoSql.TABLES.OFFLINE_MAP_TILES.name)
      .query('select', ['COUNT(*) as count', 'SUM(size) as size'])
      .where(['mapName', '=', settings.map.tiles.cacheFolder]).listen({
        debounce: 10000,
      }))
      .pipe(map((result: { count: number, size: number }[]) => {
        return (result.length > 0 ? result[0] as {
          count: number;
          size: number;
        } : ({ count: 0, size: 0 }));
      }));
  }

  getTilesCacheAsObservable(): Observable<{ count: number, size: number }> {
    return NanoSqlObservableHelper.toRxJS(nSQL(NanoSql.TABLES.OFFLINE_MAP_CACHE_SIZE.name)
      .query('select').where(['id', '=', settings.map.tiles.cacheFolder]).listen())
      .pipe(map((result: { count: number, size: number }[]) => result.length > 0 ? result[0] : { count: 0, size: 0 }));
  }

  updateTilesCacheSizeTable(count: number, size: number) {
    return nSQL(NanoSql.TABLES.OFFLINE_MAP_CACHE_SIZE.name).query('upsert', {
      id: settings.map.tiles.cacheFolder,
      count,
      size,
    }).exec();
  }

  deleteTilesCache() {
    return nSQL(NanoSql.TABLES.OFFLINE_MAP_TILES.name)
      .query('delete').where((x: OfflineTile) => x.mapName === settings.map.tiles.cacheFolder)
      .exec();
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

  private async saveMetaData(_: OfflineMap) {
    // TODO: Read metadata from json instead!
    // const tiles = (await this.backgroundDownloadService.getAllFiles(map.filePath, map.name)).map((file) =>
    //   this.getOfflineTileFromFile(map.name, file.directory, file.name, file.url, file.size)
    // );
    // await nSQL(NanoSql.TABLES.OFFLINE_MAP_TILES.name).loadJS(tiles);
  }

  // Assumes map directory: /{mapName}/{tileName}/{z}/
  // filename: tile_{x}_{y}.png
  // private getOfflineTileFromFile(mapName: string, directory: string, filename: string, url: string, size: number): OfflineTile {
  //   const index = directory.indexOf(mapName) + mapName.length + 1;
  //   const tileRest = directory.substr(index);
  //   const tileName = tileRest.substr(0, tileRest.indexOf('/')); // topo, clayzones, etc
  //   const zRest = tileRest.substr(tileRest.indexOf(tileName) + tileName.length + 1);
  //   const z = zRest.substr(0, zRest.indexOf('/'));
  //   const xRest = filename.substr(filename.indexOf('_') + 1);
  //   const x = xRest.substr(0, xRest.indexOf('_'));
  //   const yRest = xRest.substr(xRest.indexOf(x) + 2);
  //   const y = yRest.substr(0, yRest.indexOf('.'));
  //   const tileId = `${tileName}_${z}_${x}_${y}`;
  //   return {
  //     id: tileId, // NOTE: This overrides other downloaded maps, so when delete this map other maps can have the same tileId...
  //     // but using id as pk because of performance bug in nanoSQL https://github.com/ClickSimply/Nano-SQL/issues/94
  //     url: url,
  //     mapName: mapName,
  //     lastAccess: moment().unix(),
  //     size,
  //   };
  // }

  // TODO: delete all directories insted
  async reset() {
    const maps = await this.getOfflineMaps();
    for (const m of maps) {
      await this.remove(m);
    }
    await this.deleteTilesCache();
  }
}
