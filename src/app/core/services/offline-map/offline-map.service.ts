import { Injectable } from '@angular/core';
import { OfflineMap } from './offline-map.model';
import { Progress } from './progress.model';
import moment from 'moment';
import { BackgroundDownloadService } from '../background-download/background-download.service';
import { OfflineTile } from './offline-tile.model';
import { NanoSql } from '../../../../nanosql';
import { File, Entry, FileEntry } from '@ionic-native/file/ngx';
import { settings } from '../../../../settings';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';
import { nSQL } from '@nano-sql/core';
import { Observable, from, Subject, BehaviorSubject, zip, of, NEVER } from 'rxjs';
import { map, delay, tap, mergeMap, catchError, take, switchMap } from 'rxjs/operators';
import { LRUCache } from 'lru-fast';
import { OnReset } from '../../../modules/shared/interfaces/on-reset.interface';
import { ImageHelper } from '../../helpers/image.helper';
import { NSqlFullUpdateObservable } from '../../helpers/nano-sql/NSqlFullUpdateObservable';
import { LogLevel } from '../../../modules/shared/services/logging/log-level.model';
import { Platform } from '@ionic/angular';
import { WebView } from '@ionic-native/ionic-webview/ngx';

const DEBUG_TAG = 'OfflineMapService';
const RECENTLY_SAVED_TILE_CACHE_SIZE = 2000;
const SAVE_TILE_DELAY_BUFFER = 500;
const MAX_BUFFER_SIZE = 100;
const MIME_TYPE = 'image/png';
const QUALITY = 0.5;

@Injectable({
  providedIn: 'root'
})
export class OfflineMapService implements OnReset {
  private _recentlySavedTileCache: LRUCache<string, boolean>;
  private _saveBuffer: Subject<{ id: string, el: HTMLImageElement }>;
  private _saveTileBufferTrigger = new BehaviorSubject(null);
  private _saveBufferSize = 0;
  private _shouldDownloadTiles = new BehaviorSubject(true);

  constructor(
    private backgroundDownloadService: BackgroundDownloadService,
    private file: File,
    private platform: Platform,
    private webview: WebView,
    private loggingService: LoggingService,
  ) {
    this._recentlySavedTileCache = new LRUCache(RECENTLY_SAVED_TILE_CACHE_SIZE);
    this._saveBuffer = new Subject<{ id: string, el: HTMLImageElement }>();
    this.initDownloadOfflineTilesObservable();
  }

  private initDownloadOfflineTilesObservable() {
    this._shouldDownloadTiles.pipe(switchMap((active) => active ?
      zip(this._saveBuffer, this._saveTileBufferTrigger.pipe(delay(SAVE_TILE_DELAY_BUFFER))).pipe(
        map(([tile, _]) => tile),
        mergeMap((tile) => this.saveHtmlImageToDb(tile.id, tile.el)),
        catchError((err) => {
          this.loggingService.debug('Could not save image to db', err);
          return of(null);
        })
      ) : NEVER)).subscribe((tile) => {
        this.loggingService.debug('Tile saved to offlince cache', DEBUG_TAG, tile);
        this._saveBufferSize--;
        this._saveTileBufferTrigger.next(null);
      });
  }

  private saveHtmlImageToDb(id: string, el: HTMLImageElement):
    Observable<{ id: string, el: HTMLImageElement, offlineTile: OfflineTile }> {
    return from(ImageHelper.getBlobFromImage(el, MIME_TYPE, QUALITY)).pipe(
      mergeMap((blob) =>
        from(this.saveTileToOfflineStorageAndStoreRecordInNanoSQL(
          id,
          blob,
          MIME_TYPE)).pipe(
            map((offlineTile) => ({ id, el, offlineTile })))),
      catchError((err) => {
        this.loggingService.log(`Could not save tile image to offline tile`, err, LogLevel.Warning, DEBUG_TAG);
        return of(null);
      }));
  }

  pauseSavingTiles(clearBuffer = true) {
    this.loggingService.debug('Pasue saving tiles', DEBUG_TAG, clearBuffer);
    this._shouldDownloadTiles.next(false);
    if (clearBuffer) {
      this._saveBuffer = new Subject<{ id: string, el: HTMLImageElement }>();
    }
  }

  resumeSavingTiles() {
    this.loggingService.debug('Resume saving tiles', DEBUG_TAG);
    this._shouldDownloadTiles.next(true);
  }

  // private getArrayBufferFromImage(input$: Observable<{id: string, el: HTMLImageElement}>) {
  //   const offScreenCanvas$ = input$.pipe(map((input) => ImageHelper.getCanvasFromImage(input.el)),
  //   map((offscreenCanvas) => ({ offscreenCanvas, quality: 0.5, mimeType: 'image/png' })),
  //   tap((input) => this.loggingService.debug('Input to offscreen canvas web worker', DEBUG_TAG, input)));
  //   return this.toArrayBufferWithWebWorker(offScreenCanvas$);
  // }

  // private toArrayBufferWithWebWorker(input$: Observable<{ offscreenCanvas: OffscreenCanvas, quality: number, mimeType: string }>):
  //       Observable<{  arrayBuffer: ArrayBuffer, mimeType: string }> {
  //       return fromWorker<{ offscreenCanvas: OffscreenCanvas, quality: number, mimeType: string },
  //       { arrayBuffer: ArrayBuffer, mimeType: string }>(() =>
  //           new Worker('../../../workers/offscreen-canvas.worker',
  //               { type: 'module' }),
  //           input$, (input) => [<any>input.offscreenCanvas]);
  //   }

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
    return new NSqlFullUpdateObservable<OfflineMap[]>(
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
    if (this._saveBufferSize < MAX_BUFFER_SIZE) {
      if (!this._recentlySavedTileCache.get(id)) {
        this._recentlySavedTileCache.set(id, true);
        this._saveBufferSize++;
        this._saveBuffer.next({ id, el });
      }
    } else {
      this.loggingService.debug('Max save buffer size reached, skipping', DEBUG_TAG);
    }
  }

  private async saveTileToOfflineStorageAndStoreRecordInNanoSQL(
    id: string,
    blob: Blob,
    mimeType: string) {
    if (blob === undefined || blob === null || id === undefined || id === null) {
      this.loggingService.log('Could not tile to offline cache. Blob or id is missing!', null, LogLevel.Warning,
        DEBUG_TAG, id, blob, mimeType);
      return null;
    }
    try {
      const dataUrl = await this.saveTileToOfflineStorage(id, blob, mimeType);
      const tile: OfflineTile = {
        id,
        mapName: settings.map.tiles.cacheFolder,
        lastAccess: moment().unix(),
        size: blob.size,
        dataUrl,
        mimeType
      };
      await nSQL(NanoSql.TABLES.OFFLINE_MAP_TILES.name).query('upsert', tile).exec();
      return tile;
    } catch (err) {
      this.loggingService.log('Could not save offline tile cache', err, LogLevel.Warning, DEBUG_TAG, id);
      return null;
    }
  }

  private async saveTileToOfflineStorage(id: string,
    blob: Blob,
    mimeType: string): Promise<string> {
    if (this.platform.is('cordova')) {
      const baseDir = await this.backgroundDownloadService.selectDowloadFolder();
      const cacheFolder = settings.map.tiles.cacheFolder;
      const fileName = `${cacheFolder}/${id}.png`;
      const baseDirEntry = await this.file.resolveDirectoryUrl(baseDir);
      await this.file.getDirectory(baseDirEntry, cacheFolder, { create: true });
      this.loggingService.debug(`Save offline tile to file. Save directory is ${baseDir}${fileName}`, DEBUG_TAG);
      const result: FileEntry = await this.file.writeFile(baseDir, fileName, blob, { replace: true });
      const url = result.toURL();
      this.loggingService.debug(`Offline tile saved to url: ${url}`, DEBUG_TAG);
      return url;
    } else {
      const dataUrlResult = await ImageHelper.getDataUrlFromBlob(blob, mimeType).pipe(take(1)).toPromise();
      return dataUrlResult.dataUrl;
    }
  }

  private getTileId(name: string, x: number, y: number, z: number) {
    return `${name}_${z}_${x}_${y}`;
  }

  async getCachedTileDataUrl(tileId: string) {
    try {
      const tileFromDb = await this.getTileFromDb(tileId);
      if (tileFromDb && tileFromDb.dataUrl) {
        return this.webview.convertFileSrc(tileFromDb.dataUrl);
      }
    } catch (err) {
      this.loggingService.error(err, DEBUG_TAG, `Error getting image data from cached tile id: ${tileId}`);
    }
    return undefined;
  }

  async getTileFromDb(tileId: string): Promise<OfflineTile> {
    const tiles = await nSQL(NanoSql.TABLES.OFFLINE_MAP_TILES.name)
      .query('select').where(['id', '=', tileId]).exec() as OfflineTile[];
    if (tiles.length > 0) {
      return tiles[0];
    }
    return null;
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
      const tilesToRemove = await (nSQL(NanoSql.TABLES.OFFLINE_MAP_TILES.name)
        .query('select').where(['lastAccess', '<=', maxDate])
        .exec() as Promise<OfflineTile[]>);
      for (const tile of tilesToRemove) {
        await nSQL(NanoSql.TABLES.OFFLINE_MAP_TILES.name)
          .query('delete').where(['id', '=', tile.id]).exec();
        if (this.platform.is('cordova')) {
          await this.tryToRemoveFile(tile);
        }
      }
    }
  }

  private async tryToRemoveFile(tile: OfflineTile) {
    try {
      const file = await this.file.resolveLocalFilesystemUrl(tile.dataUrl);
      await new Promise((resolve, reject) => file.remove(() => resolve(), err => reject(err)));
      this.loggingService.debug(`Deleted tile from disk`, DEBUG_TAG, tile);
    } catch (err) {
      this.loggingService.log(`Could not delete offline tile file`, err, LogLevel.Warning, DEBUG_TAG, tile);
    }
  }

  // private async getDirectory(folder: string, createIfNotExists = true) {
  //   const baseFolder = await this.backgroundDownloadService.selectDowloadFolder();
  //   const dir = `${baseFolder}${folder}`;
  //   this.loggingService.debug(`Check if directory exists ${dir}`, DEBUG_TAG);
  //   if (createIfNotExists) {
  //     const exists = await this.file.checkDir(baseFolder, folder);
  //     if (!exists) {
  //       this.loggingService.debug(`Directory ${dir} does not exist, create`, DEBUG_TAG);
  //       return await this.file.createDir(baseFolder, folder, false);
  //     }
  //   }
  //   return this.file.resolveDirectoryUrl(dir);
  // }

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
    return new NSqlFullUpdateObservable<{ count: number, size: number }[]>(nSQL(NanoSql.TABLES.OFFLINE_MAP_TILES.name)
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
    return new NSqlFullUpdateObservable<{ count: number, size: number }[]>(nSQL(NanoSql.TABLES.OFFLINE_MAP_CACHE_SIZE.name)
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

  async deleteTilesCache() {
    if (this.platform.is('cordova')) {
      const baseFolder = await this.backgroundDownloadService.selectDowloadFolder();
      const dir = await this.file.resolveDirectoryUrl(baseFolder);
      const cacheFolder = await this.file.getDirectory(dir, settings.map.tiles.cacheFolder, { create: true });
      await new Promise((resolve, reject) => cacheFolder.removeRecursively(() => resolve(),
        (err) => reject(err)));
    }
    await nSQL(NanoSql.TABLES.OFFLINE_MAP_TILES.name)
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

  appOnReset(): void | Promise<any> {
  }

  appOnResetComplete(): void | Promise<any> {
  }
}
