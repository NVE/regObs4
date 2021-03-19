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
import {
  Observable,
  from,
  Subject,
  BehaviorSubject,
  zip,
  of,
  NEVER
} from 'rxjs';
import {
  map,
  delay,
  mergeMap,
  catchError,
  take,
  switchMap
} from 'rxjs/operators';
import { LRUCache } from 'lru-fast';
import { OnReset } from '../../../modules/shared/interfaces/on-reset.interface';
import { ImageHelper } from '../../helpers/image.helper';
import { NSqlFullUpdateObservable } from '../../helpers/nano-sql/NSqlFullUpdateObservable';
import { LogLevel } from '../../../modules/shared/services/logging/log-level.model';
import { Platform } from '@ionic/angular';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { HttpClient } from '@angular/common/http';

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
  constructor(
    private backgroundDownloadService: BackgroundDownloadService,
    private file: File,
    private platform: Platform,
    private webview: WebView,
    private loggingService: LoggingService,
    private httpClient: HttpClient
  ) {}

  // TODO: Implement continue download when app restart
  private isInQueue(m: OfflineMap) {
    return m.downloadStart && !m.downloadComplete;
  }

  async continueDownload(): Promise<void> {
    const offlineMaps = await this.getDownloadedOfflineMaps();
    const mapsToDownload = offlineMaps.filter((x) => this.isInQueue(x));
    for (const m of mapsToDownload) {
      await this.downloadMap(m);
    }
  }

  getDownloadedOfflineMaps(): Promise<OfflineMap[]> {
    return nSQL(NanoSql.TABLES.OFFLINE_MAP.name)
      .query('select')
      .exec() as Promise<OfflineMap[]>;
  }

  createDownloadedOfflineMaps$(): Observable<OfflineMap[]> {
    return new NSqlFullUpdateObservable<OfflineMap[]>(
      nSQL(NanoSql.TABLES.OFFLINE_MAP.name).query('select').listen({
        debounce: 100
      })
    );
  }

  createAvailableOfflineMapsToDownload$(): Observable<OfflineMap[]> {
    return of(this.getDownloadableOfflineMaps()).pipe(
      switchMap((offlinemaps) =>
        this.createDownloadedOfflineMaps$().pipe(
          map((downloadedMaps) =>
            this.filterDownloadedMaps(offlinemaps, downloadedMaps)
          )
        )
      )
    );
  }

  filterDownloadedMaps(
    avalable: OfflineMap[],
    downloaded: OfflineMap[]
  ): OfflineMap[] {
    return avalable.filter((a) => downloaded.find((d) => d.name !== a.name));
  }

  getDownloadableOfflineMaps(): OfflineMap[] {
    const availableMaps: OfflineMap[] = [
      {
        name: 'vang_kommune_n50',
        url: 'assets/offlinemap/vang_kommune_n50.vtpk',
        size: 1597336931,
        filename: 'vang_kommune_n50.vtpk'
      }
    ];
    return availableMaps;
  }

  private getFileSize(file: Entry) {
    if (!file) {
      return 0;
    } else {
      return new Promise<number>((resolve) =>
        file.getMetadata(
          (success) => resolve(success.size),
          (_) => resolve(0)
        )
      );
    }
  }

  async downloadMap(m: OfflineMap): Promise<void> {
    try {
      const path = await this.backgroundDownloadService.selectDowloadFolder();
      if (path.length > 0) {
        const mapToSave = {
          ...m,
          filePath: path,
          downloadStart: moment().unix(),
          downloaded: 0,
          progress: 0,
          downloadComplete: null
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
          async (error) => await this.onError(m.name, error)
        );
      }
    } catch (error) {
      await this.onError(m.name, error);
    }
  }

  private async getSavedMap(name: string): Promise<OfflineMap> {
    const result = (await nSQL(NanoSql.TABLES.OFFLINE_MAP.name)
      .query('select')
      .where((m: OfflineMap) => m.name === name)
      .exec()) as OfflineMap[];
    return result[0];
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public async getStyleJson(offlineMap: OfflineMap): Promise<Object> {
    const path = await this.backgroundDownloadService.selectDowloadFolder();
    const url = await this.backgroundDownloadService.getFileUrl(
      path,
      `${offlineMap.name}/p12/resources/styles/root.json`
    );
    const tilePath = this.webview.convertFileSrc(
      `${path}/p12/tile/{z}/{y}/{x}.pbf`
    );
    const styleJson = await this.httpClient.get(url).toPromise();
    return {
      ...styleJson,
      sources: {
        esri: {
          tilejson: '2.2.0',
          type: 'vector',
          tiles: [tilePath]
        }
      }
    };
  }

  private async deleteMapFromDb(name: string) {
    await nSQL(NanoSql.TABLES.OFFLINE_MAP.name)
      .query('delete', { name })
      .exec(); // TODO: Check that this works on device, maybe change
    await nSQL(NanoSql.TABLES.OFFLINE_MAP_TILES.name)
      .query('delete')
      .where((x: OfflineTile) => x.mapName === name)
      .exec();
  }

  async remove(m: OfflineMap) {
    // await this.backgroundDownloadService.deleteFolder(m.filePath, m.name);
    // await this.deleteMapFromDb(m.name);
    throw Error('Not implemented');
  }

  async cancelDownload(m: OfflineMap) {
    // this.backgroundDownloadService.cancelDownload(m.filename);
    // await this.remove(m);
    throw Error('Not implemented');
  }

  private async onProgress(name: string, progress: Progress) {
    const m = await this.getSavedMap(name);
    m.progress = progress;

    await nSQL(NanoSql.TABLES.OFFLINE_MAP.name).query('upsert', m).exec();
  }

  private async onError(name: string, error: Error) {
    this.loggingService.error(
      error,
      DEBUG_TAG,
      `Error downloading map ${name}`
    );
    await this.deleteMapFromDb(name);
    // TODO: Mark map with error?
  }

  private async onComplete(name: string) {
    const m = await this.getSavedMap(name);
    await this.saveMetaData(m);
    m.downloadComplete = moment().unix();
    m.progress = { percentage: 1.0 };
    await nSQL(NanoSql.TABLES.OFFLINE_MAP.name).query('upsert', m).exec();
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

  appOnReset(): void | Promise<any> {}

  appOnResetComplete(): void | Promise<any> {}
}
