import { Injectable } from '@angular/core';
import { OfflineMap } from './offline-map.model';
import { Progress } from './progress.model';
import moment from 'moment';
import { BackgroundDownloadService } from '../background-download/background-download.service';
import { OfflineTile } from './offline-tile.model';
import { NanoSql } from '../../../../nanosql';
import { File, Entry } from '@ionic-native/file/ngx';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';
import { nSQL } from '@nano-sql/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { OnReset } from '../../../modules/shared/interfaces/on-reset.interface';
import { NSqlFullUpdateObservable } from '../../helpers/nano-sql/NSqlFullUpdateObservable';
import { Platform } from '@ionic/angular';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { HttpClient } from '@angular/common/http';
import { WebServer, Response } from '@ionic-native/web-server/ngx';

const DEBUG_TAG = 'OfflineMapService';

@Injectable({
  providedIn: 'root'
})
export class OfflineMapService implements OnReset {
  private webServerStarted = false;

  constructor(
    private backgroundDownloadService: BackgroundDownloadService,
    private file: File,
    private platform: Platform,
    private webview: WebView,
    private loggingService: LoggingService,
    private httpClient: HttpClient,
    private webServer: WebServer
  ) {}

  async initWebServer(): Promise<void> {
    if (!this.webServerStarted) {
      const rootFilePath = await this.backgroundDownloadService.selectDowloadFolder();
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
    return avalable.filter((a) => !downloaded.find((d) => d.name === a.name));
  }

  getDownloadableOfflineMaps(): OfflineMap[] {
    const availableMaps: OfflineMap[] = [
      {
        name: 'vang_kommune_n50',
        url: 'assets/offlinemap/vang_kommune_n50.vtpk',
        size: 4239189,
        filename: 'vang_kommune_n50.vtpk'
      },
      {
        name: '532_288_10',
        url: 'assets/offlinemap/532_288_10.zip',
        size: 12704896,
        filename: '532_288_10.zip'
      },
      {
        name: 'Sogn_ca_extent_mini',
        url: 'assets/offlinemap/Sogn_ca_extent_mini.zip',
        size: 10704896,
        filename: 'Sogn_ca_extent_mini.zip'
      },
      {
        name: 'indre_sogn',
        url: 'assets/offlinemap/Indre_Sogn.zip',
        size: 10704896,
        filename: 'Indre_Sogn.zip'
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
          m.name,
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
    const path = await this.backgroundDownloadService.selectDowloadFolder();
    const url = await this.backgroundDownloadService.getFileUrl(
      path,
      `${offlineMap.name}/root.json`
    );
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

  async remove(m: OfflineMap) {
    await this.backgroundDownloadService.deleteFolder(m.filePath, m.name);
    await this.deleteMapFromDb(m.name);
  }

  async cancelDownload(m: OfflineMap) {
    // this.backgroundDownloadService.cancelDownload(m.filename);
    await this.remove(m);
    // throw Error('Not implemented');
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

  private saveMetaData(m: OfflineMap) {
    // TODO: Read metadata from offline package!
  }

  appOnReset(): void | Promise<any> {}

  appOnResetComplete(): void | Promise<any> {}
}
