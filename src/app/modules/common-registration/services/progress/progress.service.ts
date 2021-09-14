import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoggerService } from '@varsom-regobs-common/core';
import { debounceTime, distinctUntilChanged, map, shareReplay } from 'rxjs/operators';
import { ISyncProgress } from '../../models/sync-progress.interface';
import { OfflineDbService, TABLE_NAMES } from '../offline-db/offline-db.service';
import { RxRegistrationSyncProgressCollection, RxUploadProgressCollection } from '../../db/RxDB';
import moment from 'moment';
import { ISyncProgressRecord } from '../../models/sync-progress-record.interface';
import deepEqual from 'fast-deep-equal';

const SYNC_PROGRESS_ID = 'syncprogress';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  public readonly registrationSyncProgress$: Observable<ISyncProgress>;

  constructor(private loggerService: LoggerService, private offlineDbService: OfflineDbService) {
    this.registrationSyncProgress$ = this.getRegistrationSyncProgressCollection().find().$.pipe(
      debounceTime(100),
      map((records) => records[0]),
      map((rec) => this.convertToSyncProgress(rec)),
      distinctUntilChanged((a, b) => deepEqual(a, b)),
      shareReplay(1)
    );
  }

  async resetSyncProgress(records: Array<string> = null): Promise<void> {
    await this.getRegistrationSyncProgressCollection().atomicUpsert({
      id: SYNC_PROGRESS_ID,
      recordsLeft: records || [],
      startedTimestamp: moment().unix(),
      totalRecords: (records || []).length,
      errors: [],
    });
  }

  async setSyncProgress(recordId: string, error?: string | unknown): Promise<void> {
    this.loggerService.log('Sync record item complete', recordId);
    const doc = await this.getSyncProgressDocument();
    if(doc) {
      const docJson = doc.toJSON();
      const errors = [...docJson.errors];
      if(error) {
        errors.push({ id: recordId, error});
      }
      await this.getRegistrationSyncProgressCollection().atomicUpsert({
        id: SYNC_PROGRESS_ID,
        errors: errors,
        recordsLeft: docJson.recordsLeft.filter((r) => r !== recordId)
      });
    }
  }

  getAttachmentProgress(imageId: string): Observable<{totalBytes: number; complete: number}> {
    return this.getUploadProgressCollection().findByIds$([imageId]).pipe(
      map((result) => result.get(imageId)), map((result) => result ? result.toJSON() : null));
  }

  async setAttachmentProgress(imageId: string, totalBytes: number, complete: number): Promise<void> {
    this.loggerService.log(`Set attachment progress. Complete: ${complete}/${totalBytes}. ${imageId}`);
    await this.getUploadProgressCollection().atomicUpsert({
      id: imageId,
      totalBytes,
      complete
    });
  }

  private async getSyncProgressDocument() {
    const documents = await this.getRegistrationSyncProgressCollection().findByIds([SYNC_PROGRESS_ID]);
    return documents?.get(SYNC_PROGRESS_ID);
  }

  private getRegistrationSyncProgressCollection(): RxRegistrationSyncProgressCollection {
    return this.offlineDbService.db[TABLE_NAMES.REGISTRATION_SYNC_PROGRESS] as RxRegistrationSyncProgressCollection;
  }

  private getUploadProgressCollection(): RxUploadProgressCollection {
    return this.offlineDbService.db[TABLE_NAMES.UPLOAD_PROGRESS] as RxUploadProgressCollection;
  }

  private getEmptySyncProgress() {
    return {
      errors: [],
      estimatedTimeLeftMs: undefined,
      hasError: false,
      id: '',
      inProgress: false,
      isComplete: true,
      itemsLeft: 0,
      percentageComplete: undefined,
      percentageCompleteFormatted: undefined,
      recordsLeft: [],
      startedTimestamp: undefined,
      totalRecords: 0,
    };
  }

  private convertToSyncProgress(rec: ISyncProgressRecord): ISyncProgress {
    if(!rec) {
      return this.getEmptySyncProgress();
    }

    const percentageComplete = this.calculatePercentageComplete(rec);
    return {
      ...rec,
      estimatedTimeLeftMs: this.calculateTimeLeftMs(rec),
      hasError: rec.errors && rec.errors.length > 0,
      inProgress: rec.recordsLeft.length > 0,
      isComplete: rec.recordsLeft.length === 0,
      itemsLeft: rec.recordsLeft.length,
      percentageComplete,
      percentageCompleteFormatted: percentageComplete.toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 2 })
    };
  }

  private calculateTimeLeftMs(rec: ISyncProgressRecord): number {
    const startedMoment = moment.unix(rec.startedTimestamp);
    const ms = moment().diff(startedMoment, 'milliseconds');
    const itemsLeft = rec.recordsLeft.length;
    const completed = rec.totalRecords - itemsLeft;
    if(completed > 0) {
      const msPerCompleted = ms / completed;
      return msPerCompleted * itemsLeft;
    }
    return undefined;
  }

  private calculatePercentageComplete(rec: ISyncProgressRecord) {
    const itemsLeft = rec.recordsLeft.length;
    if (rec.totalRecords > 0 && itemsLeft > 0) {
      return (rec.totalRecords - itemsLeft) / rec.totalRecords;
    }
    return 1;
  }
}
