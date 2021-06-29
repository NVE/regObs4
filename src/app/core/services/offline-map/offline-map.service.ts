import { Injectable } from '@angular/core';
import { OfflineMap } from './offline-map.model';
import { Progress } from './progress.model';
import moment from 'moment';
import { File } from '@ionic-native/file/ngx';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { OnReset } from '../../../modules/shared/interfaces/on-reset.interface';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { HttpClient } from '@angular/common/http';
import JSZip from 'jszip';
import { ProgressStep } from './progress-step.model';
import { Platform } from '@ionic/angular';

const DEBUG_TAG = 'OfflineMapService';

@Injectable({
  providedIn: 'root'
})
export class OfflineMapService implements OnReset {
  private offlineMaps: BehaviorSubject<OfflineMap[]>;
  private mapsFolder = 'NOT_READY';
  unzipProgress = new Map<string, number>();
  private mapAdded = new Subject<OfflineMap>();
  private mapRemoved = new Subject<OfflineMap>();

  constructor(
    private file: File,
    private webview: WebView,
    private loggingService: LoggingService,
    private httpClient: HttpClient,
    private platform: Platform
  ) {}

  /**
   * Will post info when a new map package is unzipped and ready to load
   */
  mapAdded$(): Observable<OfflineMap> {
    return this.mapAdded.asObservable();
  }

  /**
   * Will post info when a map is removed by the user
   */
  mapRemoved$(): Observable<OfflineMap> {
    return this.mapRemoved.asObservable();
  }

  async getOfflineMaps$(): Promise<Observable<OfflineMap[]>> {
    if (!this.offlineMaps) {
      const maps = await this.listOfflineMaps(); //offline maps already unzipped
      this.offlineMaps = new BehaviorSubject(maps); //tell clients that we start unzipping
    }
    return this.offlineMaps.asObservable();
  }

  private async listOfflineMapNames(): Promise<string[]> {
    const fileEntries = await this.file.listDir(
      await this.getDataFolder(),
      await this.getMapsFolder()
    );
    const directories = fileEntries
      .filter((entry) => entry.isDirectory)
      .map((directoryEntry) => directoryEntry.name);
    return directories;
  }

  /**
   * @param mapName name of map package
   * @param isSupportMap true = support map, false = background map
   * @returns file:///path/to/offline/tiles/in/this/map
   */
  async getOfflineMapFileUrl(mapName: string, isSupportMap = false): Promise<string> {
    const mapType = isSupportMap ? `${mapName}_bratthet` : mapName; //TODO: Support all relevant supportmaps
    return `${await this.getMapsFolderUrl()}/${mapName}/${mapType}`;
  }

  /**
   * @returns a key for first tile for given map. Format = <x>_<y>
   */
  async getTileKey(mapName: string, isSupportMap = false, minZoomLevel: number): Promise<string> {
    this.loggingService.debug(`getTileKey(). mapName = ${mapName}, isSupportMap = ${isSupportMap}`, DEBUG_TAG);
    const mapUrl = await this.getOfflineMapFileUrl(mapName, isSupportMap);
    const xFolders = await this.file.listDir(mapUrl, minZoomLevel.toString());
    this.loggingService.debug(`getTileKey(). yFolders.length = ${xFolders.length}, xFolders[0].name = ${xFolders[0].name}`, DEBUG_TAG, xFolders);
    if (xFolders.length === 1 && xFolders[0].isDirectory) {
      const x = xFolders[0].name;
      const yFiles = await this.file.listDir(mapUrl, `${minZoomLevel}/${x}`);
      this.loggingService.debug(`getTileKey(). xFiles.length = ${yFiles.length}. yFiles[0].name = ${yFiles[0].name}`, DEBUG_TAG, yFiles);
      if (yFiles.length === 1 && yFiles[0].isFile) {
        const y = yFiles[0].name.replace('.png', '');
        this.loggingService.debug(`getTileKey() returns ${x}_${y}`);
        return `${x}_${y}`;
      }        
    }
    this.loggingService.debug(`Unable to find a single first tile for map = ${mapName}, isSupportMap = ${isSupportMap}`, DEBUG_TAG);
    return null;
  }

  async listOfflineMaps(): Promise<OfflineMap[]> {
    this.loggingService.debug('listOfflineMaps()', DEBUG_TAG);
    const maps: OfflineMap[] = [];
    (await this.listOfflineMapNames()).forEach(
      (name) =>
        maps.push({
          name: name,
          downloadComplete: 1,
          progress: { percentage: 100 }
        })
      //TODO: We can add size and created if needed
    );
    return maps;
  }

  getUnzipProgress(filename: string): number {
    return this.unzipProgress.get(filename);
  }

  async registerMapPackage(file: Blob, filename: string): Promise<void> {
    try {
      const path = `${await this.getDataFolder()}${await this.getMapsFolder()}/`;
      if (path.length > 0) {
        const name = filename.replace('.zip', '');
        const metadata: OfflineMap = {
          name: name,
          url: 'TODO: Trenger vi denne?',
          size: file.size,
          filename: filename,
          filePath: path,
          downloadStart: moment().unix(),
          progress: { percentage: 0 },
          downloadComplete: null
        };
        const maps = await this.listOfflineMaps(); //offline maps already unzipped
        maps.push(metadata);
        this.offlineMaps.next(maps); //tell clients that we start unzipping
        // await nSQL(NanoSql.TABLES.OFFLINE_MAP.name)
        //   .query('upsert', metadata)
        //   .exec();

        await this.unzipFile(
          file,
          path,
          name,
          async () => await this.onComplete(metadata),
          async (progress) => await this.onProgress(metadata, progress),
          async (error) => await this.onError(filename, error)
        );
      }
    } catch (error) {
      await this.onError(filename, error);
    }
  }

  async unzipFile(
    zipFile: Blob,
    path: string,
    folder: string,
    onComplete: () => void,
    onProgress: (progress: Progress) => void,
    onError: (error: Error) => void
  ): Promise<void> {
    try {
      const zip = new JSZip();
      const content = await zip.loadAsync(zipFile, {
        createFolders: true
      });
      const zipEntries = Object.keys(content.files);
      this.loggingService.debug(
        'zip entries',
        'background download native',
        zipEntries
      );
      const directories = zipEntries.filter((name) => content.files[name].dir);

      this.loggingService.debug('Creating directories');
      await this.file.createDir(path, folder, true);
      for (const dir of directories) {
        await this.file.createDir(path + folder, dir, true);
        // this.loggingService.debug(
        //   'created folder',
        //   'background download native',
        //   path + folder + dir
        // );
      }

      let i = 0;
      const files = zipEntries.filter((name) => !content.files[name].dir);
      const mod = Math.floor(files.length / 100);

      const unzipFile = async (fileName: string) => {
        const zippedFile: JSZip.JSZipObject = content.files[fileName];
        const buffer = await zippedFile.async('arraybuffer');
        await this.file.writeFile(path + folder, fileName, buffer, {
          replace: true
        });

        i++;
        if (i % mod === 0) {
          this.loggingService.debug(
            'Har pakket ut ' +
              i +
              ' av ' +
              files.length +
              ' filer. ' +
              i / files.length +
              '%'
          );

          await onProgress({
            percentage: i / files.length, //TODO: report on file size will give better progress estimate
            step: ProgressStep.extractZip,
            description: 'Unzip files'
          });
        }
      };

      this.loggingService.debug('Unzipping files');
      await from(files)
        .pipe(mergeMap((file) => unzipFile(file), 10))
        .toPromise();
      onComplete();
    } catch (err) {
      onError(err);
    }
  }

  async removeMap(m: OfflineMap): Promise<void> {
    const rootFolder =
      (await this.getDataFolder()) + (await this.getMapsFolder());
    await this.deleteFolder(rootFolder, m.name);
    this.listOfflineMapsAndNotify();
    this.mapRemoved.next(m);
    // await this.deleteMapFromDb(m.name);
  }

  private onProgress(metadata: OfflineMap, progress: Progress) {
    this.unzipProgress.set(metadata.name, progress.percentage);
    // const m = await this.getSavedMap(name);
    // m.progress = progress;

    // await nSQL(NanoSql.TABLES.OFFLINE_MAP.name).query('upsert', m).exec();
  }

  private async onError(name: string, error: Error) {
    this.loggingService.error(
      error,
      DEBUG_TAG,
      `Error downloading map ${name}`
    );
    //TODO: Delete files?
    //    await this.deleteMapFromDb(name);
    // TODO: Mark map with error?
  }

  private async listOfflineMapsAndNotify(): Promise<void> {
    const maps = await this.listOfflineMaps();
    this.offlineMaps.next(maps); //tell clients that we have a new map
  }

  private onComplete(map: OfflineMap) {
    // const m = await this.getSavedMap(name);
    // await nSQL(NanoSql.TABLES.OFFLINE_MAP.name).query('upsert', m).exec();
    map.downloadComplete = moment().unix();
    map.progress = { percentage: 1.0 };
    const secondsSpent = map.downloadComplete - map.downloadStart;
    const rate = map.size / 1024 / secondsSpent;
    this.loggingService.debug(
      'Unzip of ' +
        map.name +
        ' finished in ' +
        secondsSpent +
        ' seconds. Speed: ' +
        rate +
        'kB/s',
      DEBUG_TAG
    );
    //TODO: Tmp fix for RO-1220: We wait a bit before yelling because sometimes ArcGis couldn't load one of then root.json files when we started to load the map immediately
    setTimeout(() => {
      this.mapAdded.next(map);
    }, 5000);
  }

  //return absolute path to root folder for application data (with trailing /)
  private async getDataFolder(): Promise<string> {
    // if (this.platform.is('android')) {
    //     const userSettings = await this.userSettingService.getUserSettings();
    //     // TODO: Prefer save offline map on SD card? Show a dialog to ask if user wants to save on external directory?
    //     if (false) {
    //         return this.file.externalDataDirectory;
    //     }
    // }
    return this.file.dataDirectory;
  }

  //returns relative path to root folder for maps (without trailing /)
  private async getMapsFolder(): Promise<string> {
    const dirname = 'maps';
    if (this.mapsFolder === 'NOT_READY') {
      const dataFolder = await this.getDataFolder();
      await this.file.createDir(dataFolder, dirname, true);
      this.mapsFolder = dirname;
    }
    return this.mapsFolder;
  }

  /**
   * @returns file://<data dir>/<maps root dir>
   */
  private async getMapsFolderUrl(): Promise<string> {
    return `${await this.getDataFolder()}${await this.getMapsFolder()}`;
  }

  private async deleteFolder(path: string, dirName: string): Promise<void> {
    await this.file
      .removeRecursively(path, dirName)
      .then(() => {
        this.loggingService.debug(`removed folder: ${path}/${dirName}`);
      })
      .catch((err) => {
        this.loggingService.error(
          err,
          'background download native',
          `remove folder failed: ${path}${dirName}`
        );
      });
  }

  //TODO: Kan vi bruke disse til noe?
  appOnReset(): void | Promise<any> {}
  appOnResetComplete(): void | Promise<any> {}
}
