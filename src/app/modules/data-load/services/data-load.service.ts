import { Injectable } from '@angular/core';
import { NanoSql } from '../../../../nanosql';
import { Observable } from 'rxjs';
import { IDataLoad } from '../models/data-load.interface';
import { map, take } from 'rxjs/operators';
import * as moment from 'moment';
import '../../../core/helpers/nano-sql/nanoObserverToRxjs';
import { nSQL } from '@nano-sql/core';
import { NanoSqlObservableHelper } from '../../../core/helpers/nano-sql/nanoObserverToRxjs';

@Injectable({
  providedIn: 'root'
})
export class DataLoadService {

  constructor() {


  }

  async startLoading(id: string, totalItems?: number) {
    const existingItem = await this.getState(id);
    existingItem.startedDate = moment().toISOString();
    existingItem.isLoading = true;
    existingItem.completedDate = null;
    existingItem.progress = 0;
    existingItem.itemsComplete = 0;
    existingItem.totalItems = totalItems;
    existingItem.error = null;
    existingItem.errorMessage = null;
    existingItem.status = '';
    return this.saveDataLoadItem(existingItem);
  }

  async updateProgress(id: string, itemsComplete: number, totalItems: number, status?: string) {
    const existingItem = await this.getState(id);
    existingItem.itemsComplete = itemsComplete;
    existingItem.totalItems = totalItems;
    existingItem.status = status;
    existingItem.progress = itemsComplete / totalItems;
    return this.saveDataLoadItem(existingItem);
  }

  async loadingCompleted(id: string, totalItems?: number, itemsFromDate?: Date, itemsToDate?: Date) {
    const existingItem = await this.getState(id);
    existingItem.isLoading = false;
    existingItem.completedDate = moment().toISOString();
    existingItem.lastUpdated = moment().toISOString();
    existingItem.progress = 1.0;
    existingItem.totalItems = totalItems;
    existingItem.itemsComplete = totalItems;
    existingItem.itemsFromDate = moment(itemsFromDate).toISOString();
    existingItem.itemsToDate = moment(itemsToDate).toISOString();
    return this.saveDataLoadItem(existingItem);
  }

  async loadingError(id: string, errorMessage: string) {
    const existingItem = await this.getState(id);
    existingItem.isLoading = false;
    existingItem.completedDate = moment().toISOString();
    existingItem.progress = 1.0;
    existingItem.status = 'Error';
    existingItem.error = true;
    existingItem.errorMessage = errorMessage;
    return this.saveDataLoadItem(existingItem);
  }

  private async saveDataLoadItem(item: IDataLoad) {
    try {
      await nSQL(NanoSql.TABLES.DATA_LOAD.name).query('upsert', item).exec();
    } catch (err) {
      if (err && err.message && err.message.contains('UNIQUE constraint failed')) {
        // Retry again in 20 ms
        setTimeout(() => this.saveDataLoadItem(item), 20);
      } else {
        throw err;
      }
    }
  }

  getState(id: string): Promise<IDataLoad> {
    return this.getStateAsObservable(id).pipe(take(1)).toPromise();
  }

  getStateAsObservable(id: string): Observable<IDataLoad> {
    return NanoSqlObservableHelper.toRxJS<IDataLoad[]>(nSQL(NanoSql.TABLES.DATA_LOAD.name)
      .query('select')
      .where((x) => x.id === id)
      .listen()).pipe(
        map((val: IDataLoad[]) => val.length > 0 ? val[0] :
          { id, completed: null, lastUpdated: null, isLoading: false, started: null })
      );
  }
}
