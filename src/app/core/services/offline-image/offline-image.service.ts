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

@Injectable({
  providedIn: 'root'
})
export class OfflineImageService {

  constructor(
    private backgroundDownloadService: BackgroundDownloadService,
    private http: HTTP,
    private file: File,
    private webview: WebView,
    private dbHelperService: DbHelperService,
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

      let filename = url.substring(url.lastIndexOf('/') + 1);
      if (filename.indexOf('.') < 0) {
        filename = `${filename}.${this.getFilenameFromType(type)}`;
      }

      const fileResult: FileEntry = await this.http.downloadFile(url, {}, {},
        `${folder}/${settings.offlineAssetsFolder}/${filename}`);

      const fileUrl = fileResult.toURL();
      const offlineAsset: IOfflineAsset = {
        url,
        fileUrl,
        type,
        lastAccess: moment().unix()
      };
      return nSQL().table(NanoSql.TABLES.OFFLINE_ASSET.name).query('upsert', offlineAsset).exec();
    } catch (error) {
      console.warn('Could not download offline asset: ', error);
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
        console.log(`[INFO][OfflineImageService] File: ${asset.fileUrl} deleted: ${fileDeleted}`);
      } catch (err) {
        console.log(`[INFO][OfflineImageService] File not found: ${asset.fileUrl}`);
      }
    }
    const deleteFromDbResult = await nSQL(NanoSql.TABLES.OFFLINE_ASSET.name)
      .query('delete').where((x) => x.lastAccess < fromDate).exec();
    console.log(`[INFO][OfflineImageService] Cleanup result:`, deleteFromDbResult);
  }

  async reset() {
    await nSQL(NanoSql.TABLES.OFFLINE_ASSET.name).query('drop').exec();
    const baseFolder = await this.backgroundDownloadService.selectDowloadFolder();
    await this.file.removeDir(baseFolder, settings.offlineAssetsFolder);
  }
}
