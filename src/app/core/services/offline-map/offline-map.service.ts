import { Injectable } from '@angular/core';
import { OfflineMap } from './offline-map.model';
import { Progress } from './progress.model';
import moment from 'moment';
import { OfflineTile } from './offline-tile.model';
import { NanoSql } from '../../../../nanosql';
import { File } from '@ionic-native/file/ngx';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';
import { nSQL } from '@nano-sql/core';
import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { OnReset } from '../../../modules/shared/interfaces/on-reset.interface';
import { NSqlFullUpdateObservable } from '../../helpers/nano-sql/NSqlFullUpdateObservable';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { HttpClient } from '@angular/common/http';
import { WebServer, Response } from '@ionic-native/web-server/ngx';
import JSZip from 'jszip';
import { ProgressStep } from './progress-step.model';

const DEBUG_TAG = 'OfflineMapService';

@Injectable({
  providedIn: 'root'
})
export class OfflineMapService implements OnReset {
  private webServerStarted = false;
  unzipProgress = new Map<string, number>();

  constructor(
    private file: File,
    private webview: WebView,
    private loggingService: LoggingService,
    private httpClient: HttpClient,
    private webServer: WebServer
  ) {}

  async initWebServer(): Promise<void> {
    if (!this.webServerStarted) {
      const rootFilePath = await this.selectOfflineMapsFolder();
      const webServerRootPath = rootFilePath
        .substring(0, rootFilePath.length - 1) //remove last /
        .replace('file://', '');

      this.webServer.onRequest().subscribe((request) => {
        let contentType = '';
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
          // body: '<html>Hello World</html>',
          headers: {
            'Content-Type': contentType,
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

  filterDownloadedMaps(
    avalable: OfflineMap[],
    downloaded: OfflineMap[]
  ): OfflineMap[] {
    return avalable.filter((a) => !downloaded.find((d) => d.name === a.name));
  }

  getUnzipProgress(filename: string): number {
    return this.unzipProgress.get(filename);
  }

  async registerMapPackage(file: Blob, filename: string): Promise<void> {
    try {
      const path = await this.selectOfflineMapsFolder();
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
        await nSQL(NanoSql.TABLES.OFFLINE_MAP.name)
          .query('upsert', metadata)
          .exec();

        await this.unzipFile(
          file,
          path,
          filename,
          async () => await this.onComplete(filename),
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

  private async getSavedMap(name: string): Promise<OfflineMap> {
    const result = (await nSQL(NanoSql.TABLES.OFFLINE_MAP.name)
      .query('select')
      .where((m: OfflineMap) => m.name === name)
      .exec()) as OfflineMap[];
    return result[0];
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public async getStyleJson(offlineMap: OfflineMap): Promise<Object> {
    const path = await this.selectOfflineMapsFolder();
    const url = await this.getFileUrl(
      `${path}${offlineMap.name}/resources/styles/`,
      'root.json'
    );
    this.loggingService.debug('style url', DEBUG_TAG, url);
    // const rootUrl = await this.backgroundDownloadService.getFileUrl(
    //   path,
    //   `${offlineMap.name}/root.json`
    // );
    const webUrl = this.webview.convertFileSrc(url);
    //const rootWebUrl = this.webview.convertFileSrc(rootUrl);
    this.loggingService.debug('web url', DEBUG_TAG, webUrl);
    const tileUrl = webUrl.replace(
      'resources/styles/root.json',
      'tile/{z}/{y}/{x}.pbf'
    );
    const styleJson = await this.httpClient.get(webUrl).toPromise();
    this.loggingService.debug('loaded styleJson', DEBUG_TAG, styleJson);
    return {
      ...styleJson,
      sources: {
        esri: {
          tilejson: '2.2.0',
          type: 'vector',
          // url: rootWebUrl,
          tiles: [tileUrl]
        }
      }
    };
  }

  public async getRootJsonUrl(offlineMap: OfflineMap): Promise<string> {
    const path = await this.selectOfflineMapsFolder();
    const url = await this.getFileUrl(path, `${offlineMap.name}/root.json`);
    return this.webview.convertFileSrc(url);
  }

  private async deleteMapFromDb(name: string) {
    await nSQL(NanoSql.TABLES.OFFLINE_MAP.name)
      .query('delete', { name })
      .exec(); // TODO: Check that this works on device, maybe change
    await nSQL(NanoSql.TABLES.OFFLINE_MAP_TILES.name)
      .query('delete')
      .where((x: OfflineTile) => x.mapName === name)
      .exec();
    this.loggingService.debug(
      'removed map metadata from db for: ' + name,
      DEBUG_TAG
    );
  }

  async removeMap(m: OfflineMap): Promise<void> {
    await this.deleteFolder(m.filePath, m.name);
    await this.deleteMapFromDb(m.name);
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
    await this.deleteMapFromDb(name);
    // TODO: Mark map with error?
  }

  private async onComplete(name: string) {
    const m = await this.getSavedMap(name);
    m.downloadComplete = moment().unix();
    m.progress = { percentage: 1.0 };
    await nSQL(NanoSql.TABLES.OFFLINE_MAP.name).query('upsert', m).exec();
    const secondsSpent = m.downloadComplete - m.downloadStart;
    const rate = m.size / 1024 / secondsSpent;
    this.loggingService.debug(
      'Unzip of ' +
        m.name +
        ' finished in ' +
        secondsSpent +
        ' seconds. Speed: ' +
        rate +
        'kB/s',
      DEBUG_TAG
    );
  }

  private async selectOfflineMapsFolder(): Promise<string> {
    // if (this.platform.is('android')) {
    //     const userSettings = await this.userSettingService.getUserSettings();
    //     // TODO: Prefer save offline map on SD card? Show a dialog to ask if user wants to save on external directory?
    //     if (false) {
    //         return this.file.externalDataDirectory;
    //     }
    // }
    return Promise.resolve(this.file.dataDirectory);
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
        this.loggingService.debug(`removed folder: ${path}${dirName}`);
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
