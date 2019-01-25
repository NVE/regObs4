import { Injectable } from '@angular/core';
import { nSQL } from 'nano-sql';
import { NanoSql } from '../../../../nanosql';
import { BackgroundDownloadService } from '../background-download/background-download.service';
import { HTTP } from '@ionic-native/http/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { settings } from '../../../../settings';
import * as moment from 'moment';
import { IOfflineAsset } from './offline-asset.interface';
import { DbHelperService } from '../db-helper/db-helper.service';
import { Platform } from '@ionic/angular';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';
import { GuidHelper } from '../../helpers/guid.helper';
import '../../helpers/ionic/platform-helper';

const DEBUG_TAG = 'OfflineImageService';

@Injectable({
  providedIn: 'root'
})
export class OfflineImageService {

  constructor(
    private backgroundDownloadService: BackgroundDownloadService,
    private http: HTTP,
    private file: File,
    private platform: Platform,
    private webview: WebView,
    private dbHelperService: DbHelperService,
    private loggingService: LoggingService,
  ) { }

  async getImageOrFallbackToUrl(url: string, type: string = 'image/jpg') {
    const offlineAsset = await this.getOfflineAssetFromDb(url);
    if (offlineAsset) {
      this.updateLastAccess(offlineAsset);
      return this.webview.convertFileSrc(offlineAsset.fileUrl);
    } else {
      this.downloadOfflineAsset(url, type); // Do not wait for promise result
      return url;
    }
  }

  async getOfflineImage(url: string, options: {
    retryCount?: number, maxRetry?: number, cancelPromise?: Promise<any>,
    type?: string
  }) {
    if (!this.platform.isAndroidOrIos()) {
      return url;
    } // No support for offline image in web

    // Setting default options
    if (!options.retryCount) {
      options.retryCount = 0;
    }
    if (!options.maxRetry) {
      options.maxRetry = 5;
    }
    if (!options.type) {
      options.type = 'image/jpg';
    }
    let timeout: NodeJS.Timeout = null;
    if (options.cancelPromise) {
      options.cancelPromise.then(() => {
        if (timeout) {
          clearTimeout(timeout);
        }
        return null;
      });
    }
    const offlineAsset = await this.getOfflineAssetFromDb(url);
    if (offlineAsset) {
      this.updateLastAccess(offlineAsset);
      return this.webview.convertFileSrc(offlineAsset.fileUrl);
    } else if (options.retryCount < options.maxRetry) {
      this.loggingService.debug(`No offline asset found, try to download. Retry count: ${options.retryCount}`, DEBUG_TAG, url);
      const downloadResult = await this.downloadOfflineAsset(url, options.type);
      if (downloadResult) {
        return this.webview.convertFileSrc(downloadResult.fileUrl);
      } else {
        const retryDelay = options.retryCount * 500;
        this.loggingService.debug(`Could not download image. Retry in ${retryDelay} ms`, DEBUG_TAG, url);
        return new Promise<string>((resolve) => {
          timeout = setTimeout(() => {
            options.retryCount = options.retryCount + 1;
            resolve(this.getOfflineImage(url, options));
          }, retryDelay);
        });
      }
    } else {
      this.loggingService.debug(`Max retries reached, give up.`, DEBUG_TAG, url);
      return null;
    }
  }

  private updateLastAccess(offlineAsset: IOfflineAsset) {
    offlineAsset.lastAccess = moment().unix();
    return nSQL().table(NanoSql.TABLES.OFFLINE_ASSET.name).query('upsert', offlineAsset).exec();
  }

  private getFilenameFromType(type: string) {
    return type.replace('image/', '');
  }

  async downloadOfflineAsset(url: string, type: string = 'image/jpg') {
    const folder = await this.backgroundDownloadService.selectDowloadFolder();
    try {
      await this.file.createDir(folder, settings.offlineAssetsFolder, false);
    } catch { }

    try {

      // let filename = url.substring(url.lastIndexOf('/') + 1);
      // if (filename.indexOf('.') < 0) {
      //   filename = `${filename}.${this.getFilenameFromType(type)}`;
      // }
      const filename = `${GuidHelper.createGuid()}.${this.getFilenameFromType(type)}`;
      // Note: Create unique id so test/demo/prod images do not overwrite each other.

      const fileResult: FileEntry = await this.http.downloadFile(url, {}, {},
        `${folder}/${settings.offlineAssetsFolder}/${filename}`);

      const fileUrl = fileResult.toURL();
      const offlineAsset: IOfflineAsset = {
        url,
        fileUrl,
        type,
        lastAccess: moment().unix()
      };
      await nSQL().table(NanoSql.TABLES.OFFLINE_ASSET.name).query('upsert', offlineAsset).exec();
      return offlineAsset;
    } catch (error) {
      this.loggingService.error(error, DEBUG_TAG, `Could not download offline asset`, url);
      return null;
    }
  }

  async getOfflineAssetFromDb(url: string) {
    // const result = (await nSQL(NanoSql.TABLES.OFFLINE_ASSET.name)
    //   .query('select').where((x) => x.originalUrl === url)
    //   .exec()) as IOfflineAsset[];
    // if (result.length > 0) {
    //   return result[0];
    // } else {
    //   return null;
    // }
    // TODO: Test performance again after NanoSql patch. This issue with string id should be fixed now.
    return this.dbHelperService.getItemById<IOfflineAsset>(NanoSql.TABLES.OFFLINE_ASSET.name, url);
  }

  blobToDataURL(blob: Blob): Promise<string> {
    return new Promise((resolve) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        resolve(fileReader.result as string);
      };
      fileReader.readAsDataURL(blob);
    });
  }

  async cleanupOldItems() {
    const fromDate = moment().subtract(1, 'month').unix();
    const result = (await nSQL(NanoSql.TABLES.OFFLINE_ASSET.name)
      .query('select').where((x) => x.lastAccess < fromDate).exec()) as IOfflineAsset[];
    for (const asset of result) {
      try {
        const file = await this.file.resolveLocalFilesystemUrl(asset.fileUrl);
        const fileDeleted = await new Promise<boolean>((resolve) => {
          file.remove(() => resolve(true), () => resolve(false));
        });
        this.loggingService.debug(`${asset.fileUrl} deleted: ${fileDeleted}`, DEBUG_TAG, asset);
      } catch (err) {
        this.loggingService.error(err, `Could not delete local file`, DEBUG_TAG, asset);
      }
    }
    await nSQL(NanoSql.TABLES.OFFLINE_ASSET.name).query('delete').where((x) => x.lastAccess < fromDate).exec();
  }

  async reset() {
    await nSQL(NanoSql.TABLES.OFFLINE_ASSET.name).query('drop').exec();
    const baseFolder = await this.backgroundDownloadService.selectDowloadFolder();
    await this.file.removeRecursively(baseFolder, settings.offlineAssetsFolder);
  }
}
