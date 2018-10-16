import { Injectable } from '@angular/core';
import { nSQL } from 'nano-sql';
import { NanoSql } from '../../../../nanosql';
import { HttpRequest, HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { BackgroundDownloadService } from '../background-download/background-download.service';
import { HTTP } from '@ionic-native/http/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { settings } from '../../../../settings';
import * as moment from 'moment';
import { IOfflineAsset } from './offline-asset.interface';

@Injectable({
  providedIn: 'root'
})
export class OfflineImageService {

  constructor(
    private backgroundDownloadService: BackgroundDownloadService,
    private http: HTTP,
    private file: File,
    private webview: WebView,
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
        originalUrl: url,
        fileUrl,
        type,
        lastAccess: moment().unix()
      };
      // TODO: Clear cache based on last accessed or cache size has reached
      return nSQL().table(NanoSql.TABLES.OFFLINE_ASSET.name).query('upsert', offlineAsset).exec();
    } catch (error) {
      // TODO: Create warning in sentry?
      console.warn('Could not download offline asset: ', error);
    }
  }

  async getOfflineAssetFromDb(url: string) {
    const result = (await nSQL(NanoSql.TABLES.OFFLINE_ASSET.name)
      .query('select').where(['originalUrl', '=', url])
      .exec()) as IOfflineAsset[];
    if (result.length > 0) {
      return result[0];
    } else {
      return null;
    }
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
}
