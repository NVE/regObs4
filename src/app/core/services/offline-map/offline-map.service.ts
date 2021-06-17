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
import { WebServer, Response } from '@ionic-native/web-server/ngx';
import JSZip from 'jszip';
import { ProgressStep } from './progress-step.model';
import { Platform } from '@ionic/angular';
import { LogLevel } from 'src/app/modules/shared/services/logging/log-level.model';

const DEBUG_TAG = 'OfflineMapService';

@Injectable({
  providedIn: 'root'
})
export class OfflineMapService implements OnReset {
  private offlineMaps: BehaviorSubject<OfflineMap[]>;
  private webServerStarted = false;
  private mapsFolder = 'NOT_READY';
  unzipProgress = new Map<string, number>();
  private mapAdded = new Subject<OfflineMap>();
  private mapRemoved = new Subject<OfflineMap>();

  constructor(
    private file: File,
    private webview: WebView,
    private loggingService: LoggingService,
    private httpClient: HttpClient,
    private webServer: WebServer,
    private platform: Platform
  ) {}

  async initWebServer(): Promise<void> {
    if (!this.webServerStarted) {
      this.platform.pause.subscribe(() => {
        this.webServer?.stop();
        this.loggingService.debug(
          'Applikasjonen tok en pause, så stoppet webserver'
        );
      });
      this.platform.resume.subscribe(() => {
        if (this.webServer) {
          this.webServer.start();
          this.loggingService.debug(
            'Applikasjonen er ferdig med pausen, starter webserver igjen'
          );
        } else {
          this.loggingService.log(
            'Fikk ikke til å starte webserver etter at applikasjonen var ferdig med pausen',
            null,
            LogLevel.Error
          );
        }
      });

      const rootFilePath = await this.getDataFolder();
      const mapsFolder = await this.getMapsFolder();
      const webServerRootPath =
        rootFilePath.replace('file://', '') + mapsFolder;
      // .substring(0, rootFilePath.length - 1) //remove last /

      this.webServer.onRequest().subscribe((request) => {
        let contentType = 'application/x-protobuf';

        let path = webServerRootPath + request.path; //se https://github.com/bykof/cordova-plugin-webserver/issues/59

        if (
          request.path.endsWith('tilemap') ||
          (request.query && request.query.includes('f=json'))
        ) {
          contentType = 'application/json; charset=utf-8';
          if (!path.endsWith('.json')) {
            path = `${path}/root.json`;
          }
        }

        const response: Response = {
          status: 200,
          path: path,
          headers: {
            'Content-Type': contentType,

            // Allows caching for up to 4 hours
            'Cache-Control': 'public, max-age=14400, immutable',

            // TODO: Use http://localhost for prod
            'Access-Control-Allow-Origin': '*'

            // 'content-encoding': 'gzip'
            // 'Access-Control-Allow-Headers':
            //   'Origin, X-Requested-With, Content-Type, Accept"'
          }
        };
        this.loggingService.debug('webServer.onRequest():', DEBUG_TAG, [
          request,
          response
        ]);
        this.webServer
          .sendResponse(request.requestId, response)
          .catch((error: Error) =>
            this.loggingService.error(error, DEBUG_TAG, 'web server')
          );
      });

      this.webServer
        .start(8080)
        .then(() => {
          this.webServerStarted = true;
          this.loggingService.debug('web server started', DEBUG_TAG);
        })
        .catch((error: Error) =>
          this.loggingService.error(error, DEBUG_TAG, 'web server')
        );
    }
  }
  // TODO: Implement continue download when app restart
  private isInQueue(m: OfflineMap) {
    return m.downloadStart && !m.downloadComplete;
  }

  /**
   * Will post info when a new map package is unzipped and ready to load
   */
  mapAdded$(): Observable<OfflineMap> {
    return this.mapAdded.asObservable();
  }

  /**
   * Will post info when a map removed by the user
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

  // getDownloadedOfflineMaps(): Promise<OfflineMap[]> {
  //   return nSQL(NanoSql.TABLES.OFFLINE_MAP.name)
  //     .query('select')
  //     .exec() as Promise<OfflineMap[]>;
  // }

  // createDownloadedOfflineMaps$(): Observable<OfflineMap[]> {
  //   return new NSqlFullUpdateObservable<OfflineMap[]>(
  //     nSQL(NanoSql.TABLES.OFFLINE_MAP.name).query('select').listen({
  //       debounce: 100
  //     })
  //   );
  // }

  private async listOfflineMapNames(): Promise<string[]> {
    const start = moment().unix();
    const fileEntries = await this.file.listDir(
      await this.getDataFolder(),
      await this.getMapsFolder()
    );
    const directories = fileEntries
      .filter((entry) => entry.isDirectory)
      .map((directoryEntry) => directoryEntry.name);
    const end = moment().unix();
    this.loggingService.debug(
      `listOfflineMapNames took ${end - start}ms`,
      DEBUG_TAG
    );
    return directories;
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
        const metadata: OfflineMap = {
          name: filename,
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
          filename,
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

  // private async getSavedMap(name: string): Promise<OfflineMap> {
  //   // const result = (await nSQL(NanoSql.TABLES.OFFLINE_MAP.name)
  //   //   .query('select')
  //   //   .where((m: OfflineMap) => m.name === name)
  //   //   .exec()) as OfflineMap[];
  //   // return result[0];
  // }

  // eslint-disable-next-line @typescript-eslint/ban-types
  // public async getStyleJson(offlineMap: OfflineMap): Promise<Object> {
  //   const path = await this.getOfflineMapsFolder();
  //   const url = await this.getFileUrl(
  //     `${path}${offlineMap.name}/resources/styles/`,
  //     'root.json'
  //   );
  //   this.loggingService.debug('style url', DEBUG_TAG, url);
  //   // const rootUrl = await this.backgroundDownloadService.getFileUrl(
  //   //   path,
  //   //   `${offlineMap.name}/root.json`
  //   // );
  //   const webUrl = this.webview.convertFileSrc(url);
  //   //const rootWebUrl = this.webview.convertFileSrc(rootUrl);
  //   this.loggingService.debug('web url', DEBUG_TAG, webUrl);
  //   const tileUrl = webUrl.replace(
  //     'resources/styles/root.json',
  //     'tile/{z}/{y}/{x}.pbf'
  //   );
  //   const styleJson = await this.httpClient.get(webUrl).toPromise();
  //   this.loggingService.debug('loaded styleJson', DEBUG_TAG, styleJson);
  //   return {
  //     ...styleJson,
  //     sources: {
  //       esri: {
  //         tilejson: '2.2.0',
  //         type: 'vector',
  //         // url: rootWebUrl,
  //         tiles: [tileUrl]
  //       }
  //     }
  //   };
  // }

  // public async getRootJsonUrl(offlineMap: OfflineMap): Promise<string> {
  //   const path = await this.getOfflineMapsFolder();
  //   const url = await this.getFileUrl(path, `${offlineMap.name}/root.json`);
  //   return this.webview.convertFileSrc(url);
  // }

  // private async deleteMapFromDb(name: string) {
  //   await nSQL(NanoSql.TABLES.OFFLINE_MAP.name)
  //     .query('delete', { name })
  //     .exec(); // TODO: Check that this works on device, maybe change
  //   await nSQL(NanoSql.TABLES.OFFLINE_MAP_TILES.name)
  //     .query('delete')
  //     .where((x: OfflineTile) => x.mapName === name)
  //     .exec();
  //   this.loggingService.debug(
  //     'removed map metadata from db for: ' + name,
  //     DEBUG_TAG
  //   );
  // }

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

  private async getFileUrl(path: string, filename: string): Promise<string> {
    const directoryEntry = await this.file.resolveDirectoryUrl(path);
    const targetFile = await this.file.getFile(directoryEntry, filename, {
      create: false
    });
    return targetFile.toURL();
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
