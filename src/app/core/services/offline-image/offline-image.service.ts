import { Injectable } from '@angular/core';
import { NanoSql } from '../../../../nanosql';
import * as moment from 'moment';
import { IOfflineAsset } from './offline-asset.interface';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';
import '../../helpers/ionic/platform-helper';
import { nSQL } from '@nano-sql/core';
import { LogLevel } from '../../../modules/shared/services/logging/log-level.model';
import { DataUrlHelper } from '../../helpers/data-url.helper';

const DEBUG_TAG = 'OfflineImageService';

@Injectable({
  providedIn: 'root'
})
export class OfflineImageService {

  constructor(
    private loggingService: LoggingService,
  ) { }

  async getOfflineImage(url: string) {
    const offlineAsset = await this.getOfflineAssetFromDb(url);
    if (offlineAsset) {
      this.updateLastAccess(offlineAsset);
      return offlineAsset.dataUrl;
    } else {
      return null;
    }
  }

  private updateLastAccess(offlineAsset: IOfflineAsset) {
    offlineAsset.lastAccess = moment().unix();
    return nSQL(NanoSql.TABLES.OFFLINE_ASSET.name).query('upsert', offlineAsset).exec();
  }

  async saveOfflineImageDataUrl(url: string, dataUrl: string, type: string = 'image/jpg') {
    try {
      const size = DataUrlHelper.getDataUriByteLength(dataUrl);

      const offlineAsset: IOfflineAsset = {
        url,
        type,
        lastAccess: moment().unix(),
        size,
        dataUrl
      };
      await nSQL(NanoSql.TABLES.OFFLINE_ASSET.name).query('upsert', offlineAsset).exec();
      return offlineAsset;
    } catch (error) {
      this.loggingService.log(`Could not save offline asset`, error, LogLevel.Warning, DEBUG_TAG, url);
      return null;
    }
  }

  async getOfflineAssetFromDb(url: string) {
    const result = (await nSQL(NanoSql.TABLES.OFFLINE_ASSET.name)
      .query('select').where(['url', '=', url])
      .exec()) as IOfflineAsset[];
    if (result.length > 0) {
      return result[0];
    } else {
      return null;
    }
  }

  async cleanupOldItems() {
    const fromDate = moment().subtract(1, 'month').unix();
    return nSQL(NanoSql.TABLES.OFFLINE_ASSET.name).query('delete').where((x) => x.lastAccess < fromDate).exec();
  }

  async reset() {
    await nSQL(NanoSql.TABLES.OFFLINE_ASSET.name).query('delete').exec();
  }
}
