import { Injectable } from '@angular/core';
import { OfflineMap } from './offline-map.model';
import { Progress } from './progress.model';
import moment from 'moment';
import { BackgroundDownloadService } from '../background-download/background-download.service';
import { OfflineTile } from './offline-tile.model';
import { NanoSql } from '../../../../nanosql';
import { File, Entry, FileEntry } from '@ionic-native/file/ngx';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';
import { nSQL } from '@nano-sql/core';
import { OnReset } from '../../../modules/shared/interfaces/on-reset.interface';
import { Platform } from '@ionic/angular';
import { WebView } from '@ionic-native/ionic-webview/ngx';

const DEBUG_TAG = 'OfflineMapService';

@Injectable({
  providedIn: 'root'
})
export class OfflineMapService implements OnReset {
  
  constructor(
    private loggingService: LoggingService
  ) {

  }

  async downloadMap(m: OfflineMap) {
    // try {
    //   const path = await this.backgroundDownloadService.selectDowloadFolder();
    //   if (path.length > 0) {
    //     const mapToSave = {
    //       ...m,
    //       filePath: path,
    //       downloadStart: moment().unix(),
    //       downloaded: 0,
    //       progress: 0,
    //       downloadComplete: null,
    //     };
    //     await nSQL(NanoSql.TABLES.OFFLINE_MAP.name)
    //       .query('upsert', mapToSave)
    //       .exec();

    //     await this.backgroundDownloadService.downloadFile(
    //       path,
    //       m.filename,
    //       m.url,
    //       async () => await this.onComplete(m.name),
    //       async (progress) => await this.onProgress(m.name, progress),
    //       async (error) => await this.onError(m.name, error));
    //   }
    // } catch (error) {
    //   await this.onError(m.name, error);
    // }
    throw new Error('Not implemented');
  }

  private async getSavedMap(name: string): Promise<OfflineMap> {
    const result = (await nSQL(NanoSql.TABLES.OFFLINE_MAP.name)
      .query('select')
      .where((m: OfflineMap) => m.name === name)
      .exec()) as OfflineMap[];
    return result[0];
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
