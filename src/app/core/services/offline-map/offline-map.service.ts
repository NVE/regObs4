import { Injectable } from '@angular/core';
import { OfflineMap } from './offline-map.model';
import { Progress } from './progress.model';
import { nSQL } from 'nano-sql';
import { Observer, ObserverSubscriber } from 'nano-sql/lib/observable';
import * as moment from 'moment';
import { Events, Platform } from '@ionic/angular';
import { settings } from '../../../../settings';
import { BackgroundDownloadService } from '../background-download/background-download.service';

const tableName = 'offlinemap';

@Injectable({
  providedIn: 'root'
})
export class OfflineMapService {
  subscription: ObserverSubscriber;

  constructor(
    private events: Events,
    private backgroundDownloadService: BackgroundDownloadService
  ) {

  }

  init() {
    nSQL(tableName)
      .model([
        { key: 'name', type: 'string', props: ['pk'] },
        { key: '*', type: '*' },
      ]);

    this.events.subscribe(settings.events.nanosqlConnected, async () => {
      await this.continueDownload();
    });
  }

  private isInQueue(map: OfflineMap) {
    return map.downloadStart && !map.downloadComplete;
  }

  async continueDownload() {
    const offlineMaps = await this.getOfflineMaps();
    const mapsToDownload = offlineMaps.filter((x) => this.isInQueue(x));
    mapsToDownload.forEach(async map => {
      await this.downloadMap(map);
    });
  }

  getOfflineMaps(): Promise<OfflineMap[]> {
    return nSQL(tableName).query('select').exec() as Promise<OfflineMap[]>;
  }

  getOfflineMapsAsObservable(): Observer<OfflineMap[]> {
    return nSQL().observable<OfflineMap[]>(() => {
      return nSQL(tableName).query('select').emit();
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
        currentMap.downloaded = savedMap.downloaded;
        currentMap.size = savedMap.size;
      }
      return currentMap;
    });
  }

  getTile(name: string, x: number, y: number, z: number) {
    // TODO: Use jszip lib to unzip file and return tile
    return null;
  }

  async downloadMap(map: OfflineMap) {
    try {
      const mapToSave = {
        ...map,
        downloadStart: moment().unix(),
        downloaded: 0,
        progress: 0,
        downloadComplete: null,
      };
      const result = await nSQL(tableName)
        .query('upsert', mapToSave)
        .exec();
      console.log('saved new download offline map', result);
      const test = await this.getSavedMap(map.name);
      console.log('Saved map from db: ', test);
      const test2 = await this.getOfflineMaps();
      console.log('All saved maps: ', test2);

      await this.backgroundDownloadService.downloadFile(
        map.filename,
        map.url,
        async () => await this.onComplete(map.name),
        async (progress) => await this.onProgress(map.name, progress),
        async (error) => await this.onError(map.name, error));
    } catch (error) {
      await this.onError(map.name, error);
    }
  }

  private async getSavedMap(name: string): Promise<OfflineMap> {
    const result = await nSQL(tableName).query('select').where((map: OfflineMap) => map.name === name).exec() as OfflineMap[];
    return result[0];
  }

  private async clearDownloadProperties(name: string) {
    const result = await nSQL(tableName)
      .query('delete', { name }).exec();
    console.log('clear download result: ', result);
  }

  async remove(map: OfflineMap) {
    await this.deleteMap(map);
    await this.clearDownloadProperties(map.name);
  }

  async deleteMap(map: OfflineMap) {
    await this.backgroundDownloadService.deleteFile(map.filePath, map.filename);
  }

  async cancelDownload(map: OfflineMap) {
    await this.backgroundDownloadService.cancelDownload(map.filePath, map.filename);
    return this.remove(map);
  }

  private async onProgress(name: string, progress: Progress) {
    if (progress.bytesReceived > 0 && progress.totalBytesToReceive > 0) {
      console.log(name + ' progress ' + progress.bytesReceived + ' of ' + progress.totalBytesToReceive);
      const map = await this.getSavedMap(name);
      map.downloaded = progress.bytesReceived;
      map.size = progress.totalBytesToReceive;
      map.progress = (progress.bytesReceived / progress.totalBytesToReceive);

      await nSQL(tableName)
        .query('upsert', map)
        .exec();
    } else {
      return Promise.resolve();
    }
  }

  private async onError(name: string, error: Error) {
    console.error('Error downloading map ' + name, error);
    await this.clearDownloadProperties(name);
    // TODO: Mark map with error?
  }

  private async onComplete(name: string) {
    const map = await this.getSavedMap(name);
    map.downloadComplete = moment().unix();
    map.progress = 1.0;
    await nSQL(tableName)
      .query('upsert', map)
      .exec();
  }

  async clear() {
    const maps = await this.getOfflineMaps();
    maps.forEach(async (map) => {
      await this.remove(map);
    });
    await nSQL(tableName).query('drop').exec();
  }
}
