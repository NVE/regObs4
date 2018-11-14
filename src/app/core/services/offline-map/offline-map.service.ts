import { Injectable } from '@angular/core';
import { OfflineMap } from './offline-map.model';
import { Progress } from './progress.model';
import { nSQL } from 'nano-sql';
import { Observer, ObserverSubscriber } from 'nano-sql/lib/observable';
import * as moment from 'moment';
import { Events, Platform, } from '@ionic/angular';
import { BackgroundDownloadService } from '../background-download/background-download.service';
import { OfflineTile } from './offline-tile.model';
import { NanoSql } from '../../../../nanosql';
import { HTTP } from '@ionic-native/http/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { settings } from '../../../../settings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserSettingService } from '../user-setting/user-setting.service';
import { RowCount } from '../../models/row-count.model';

@Injectable({
  providedIn: 'root'
})
export class OfflineMapService {
  subscription: ObserverSubscriber;

  constructor(
    private events: Events,
    private backgroundDownloadService: BackgroundDownloadService,
    private platform: Platform,
    private http: HTTP,
    private file: File,
    private webview: WebView,
    private httpClient: HttpClient,
    private userSettingService: UserSettingService,
  ) {
  }
  // TODO: Implement continue download when app restart

  private isInQueue(map: OfflineMap) {
    return map.downloadStart && !map.downloadComplete;
  }

  async continueDownload() {
    const offlineMaps = await this.getOfflineMaps();
    const mapsToDownload = offlineMaps.filter((x) => this.isInQueue(x));
    for (const map of mapsToDownload) {
      await this.downloadMap(map);
    }
  }

  getOfflineMaps(): Promise<OfflineMap[]> {
    return nSQL(NanoSql.TABLES.OFFLINE_MAP.name).query('select').exec() as Promise<OfflineMap[]>;
  }

  getOfflineMapsAsObservable(): Observer<OfflineMap[]> {
    return nSQL().observable<OfflineMap[]>(() => {
      return nSQL(NanoSql.TABLES.OFFLINE_MAP.name).query('select').emit();
    })
      .map((x) => this.mergeOfflineMaps(x))
      .debounce(500); // Debounce so progress don't get updated more than each 500ms
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
    return availableMaps.map((map) => {
      const currentMap = { ...map };
      const savedMap = savedMaps.find((x) => x.name === map.name);
      if (savedMap) {
        console.log('Found saved map: ', savedMap);
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
    return nSQL().table(NanoSql.TABLES.OFFLINE_MAP_TILES.name).query('upsert', tile);
  }

  async getTileUrl(name: string, x: number, y: number, z: number) {
    const tileId = this.getTileId(name, x, y, z);
    const tileFromDb = await this.getTileFromDb(tileId);
    if (tileFromDb) {
      this.updateTileLastAccess(tileFromDb);
      return this.webview.convertFileSrc(tileFromDb.url);
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
      // CORS ISSUES WHEN USING WKWEBKIT, using native http instead...
      const tileId = this.getTileId(name, x, y, z);
      // console.log('[DEBUG][OfflineTileLayer] offline tile id ' + tileId, url);
      const filename = `${settings.map.tiles.cacheFolder}/${tileId}.png`;
      const folder = await this.backgroundDownloadService.selectDowloadFolder();
      try {
        await this.file.createDir(folder, settings.map.tiles.cacheFolder, false);
      } catch { }

      const fileResult: FileEntry = await this.http.downloadFile(url, {}, {},
        `${folder}/${filename}`);

      const tile: OfflineTile = {
        tileId: tileId,
        mapName: settings.map.tiles.cacheFolder,
        url: fileResult.toURL(),
        lastAccess: moment().unix(),
      };
      // console.log('[DEBUG][OfflineTileLayer] offline tile saved', tile);
      // TODO: Clear cache based on last accessed or cache size has reached
      return nSQL().table(NanoSql.TABLES.OFFLINE_MAP_TILES.name).query('upsert', tile).exec();
    } catch (err) {
      console.log('Could not download tile: ' + url, err);
    }
  }

  private getTileId(name: string, x: number, y: number, z: number) {
    return `${name}_${z}_${x}_${y}`;
  }

  async getTileFromDb(tileId: string): Promise<OfflineTile> {
    // console.log('[DEBUG][OfflineTileLayer] getTileFromDb: ' + tileId);
    const tiles = await nSQL(NanoSql.TABLES.OFFLINE_MAP_TILES.name)
      .query('select').where((x) => x.tileId === tileId).exec();
    if (tiles.length > 0) {
      // console.log('[DEBUG][OfflineTileLayer] Got tiles from db for tileID: ' + tileId, tiles);
      return tiles[0] as OfflineTile;
    } else {
      return null;
    }
  }

  async cleanupTilesCache(numberOfItemsToCache: number) {
    const result = (await nSQL(NanoSql.TABLES.OFFLINE_MAP_TILES.name)
      .query('select').where((x) => x.mapName === settings.map.tiles.cacheFolder)
      .orderBy({ lastAccess: 'desc' }).offset(numberOfItemsToCache).exec()) as OfflineTile[];
    const tileIds = result.map((x) => x.tileId);
    const deleted = await nSQL(NanoSql.TABLES.OFFLINE_MAP_TILES.name)
      .query('delete').where((x) => tileIds.indexOf(x.tileId) >= 0).exec();
    console.log('[DEBUG][OfflineTiles] cache tiles deleted: ', deleted);
  }

  private async getDirectory(folder: string) {
    const baseFolder = await this.backgroundDownloadService.selectDowloadFolder();
    return this.file.resolveDirectoryUrl(baseFolder + '/' + folder);
  }

  private async getFolderSize(folder: string): Promise<number> {
    const directory = await this.getDirectory(folder);
    return new Promise<number>((resolve) => {
      if (!directory) {
        console.log('[DEBUG][OfflineTiles] could not get directory: ', folder);
        resolve(0);
      } else {
        directory.getMetadata((success) => {
          console.log('[DEBUG][OfflineTiles] got directory metadata for directory: ' + folder, success, directory.toURL());
          resolve(success.size);
        }, () => resolve(0));
      }
    });
  }

  async getTilesCacheSize() {
    const result = await nSQL(NanoSql.TABLES.OFFLINE_MAP_TILES.name)
      .query('select', ['COUNT(*)']).where(['mapName', '=', settings.map.tiles.cacheFolder]).exec();
    console.log('[DEBUG][OfflineTiles] tiles cache count: ', result);
    const folderSize = await this.getFolderSize(settings.map.tiles.cacheFolder);
    return { tiles: result[0]['COUNT(*)'], folderSize: folderSize };
  }

  async deleteTilesCache() {
    await nSQL(NanoSql.TABLES.OFFLINE_MAP_TILES.name)
      .query('delete').where(['mapName', '=', settings.map.tiles.cacheFolder]).exec();
    const baseFolder = await this.backgroundDownloadService.selectDowloadFolder();
    await this.backgroundDownloadService.deleteFolder(baseFolder, settings.map.tiles.cacheFolder);
  }

  async downloadMap(map: OfflineMap) {
    try {
      const path = await this.backgroundDownloadService.selectDowloadFolder();
      if (path.length > 0) {
        const mapToSave = {
          ...map,
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
          map.filename,
          map.url,
          async () => await this.onComplete(map.name),
          async (progress) => await this.onProgress(map.name, progress),
          async (error) => await this.onError(map.name, error));
      }
    } catch (error) {
      await this.onError(map.name, error);
    }
  }

  private async getSavedMap(name: string): Promise<OfflineMap> {
    const result = await nSQL(NanoSql.TABLES.OFFLINE_MAP.name)
      .query('select').where((map: OfflineMap) => map.name === name).exec() as OfflineMap[];
    return result[0];
  }

  private async deleteMapFromDb(name: string) {
    await nSQL(NanoSql.TABLES.OFFLINE_MAP.name)
      .query('delete', { name }).exec();
    await nSQL(NanoSql.TABLES.OFFLINE_MAP_TILES.name)
      .query('delete').where((tile: OfflineTile) => tile.mapName === name).exec();
  }

  async remove(map: OfflineMap) {
    await this.backgroundDownloadService.deleteFolder(map.filePath, map.name);
    await this.deleteMapFromDb(map.name);
  }

  async cancelDownload(map: OfflineMap) {
    this.backgroundDownloadService.cancelDownload(map.filename);
    await this.deleteMapFromDb(map.name);
  }

  private async onProgress(name: string, progress: Progress) {
    // if (progress.bytesReceived > 0 && progress.totalBytesToReceive > 0) {
    // console.log(name + ' progress ' + progress.bytesReceived + ' of ' + progress.totalBytesToReceive);
    const map = await this.getSavedMap(name);
    // map.downloaded = progress.bytesReceived;
    // map.size = progress.totalBytesToReceive;
    map.progress = progress;

    await nSQL(NanoSql.TABLES.OFFLINE_MAP.name)
      .query('upsert', map)
      .exec();
    // } else {
    //   return Promise.resolve();
    // }
  }

  private async onError(name: string, error: Error) {
    console.error('Error downloading map ' + name, error);
    await this.deleteMapFromDb(name);
    // TODO: Mark map with error?
  }

  private async onComplete(name: string) {
    const map = await this.getSavedMap(name);
    await this.saveMetaData(map);
    map.downloadComplete = moment().unix();
    map.progress = { percentage: 1.0 };
    await nSQL(NanoSql.TABLES.OFFLINE_MAP.name)
      .query('upsert', map)
      .exec();
  }

  private async saveMetaData(map: OfflineMap) {
    // TODO: Read metadata from json instead!
    const tiles = (await this.backgroundDownloadService.getAllFiles(map.filePath, map.name)).map((file) =>
      this.getOfflineTileFromFile(map.name, file.directory, file.name, file.url)
    );
    await nSQL().loadJS(NanoSql.TABLES.OFFLINE_MAP_TILES.name, tiles);
  }

  // Assumes map directory: /{mapName}/{tileName}/{z}/
  // filename: tile_{x}_{y}.png
  private getOfflineTileFromFile(mapName: string, directory: string, filename: string, url: string): OfflineTile {
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
    console.log('[getOfflineTileFromFile] tileId: ' + tileId);
    return {
      url: url,
      mapName: mapName,
      tileId,
      lastAccess: moment().unix(),
    };
  }

  // TODO: delete all directories insted
  async reset() {
    const maps = await this.getOfflineMaps();
    for (const map of maps) {
      await this.remove(map);
    }
    await this.deleteTilesCache();
  }
}
