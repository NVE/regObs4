import { Injectable } from '@angular/core';
import { NanoSql } from '../../../../nanosql';
import { Observable } from 'rxjs';
import { IDataLoad } from '../models/data-load.interface';
import { nSQL } from 'nano-sql';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataLoadService {

  constructor() {


  }

  async startLoading(id: string, totalItems?: number) {
    const existingItem = await this.getState(id);
    existingItem.startedDate = new Date();
    existingItem.isLoading = true;
    existingItem.completedDate = null;
    existingItem.progress = 0;
    existingItem.itemsComplete = 0;
    existingItem.totalItems = totalItems;
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
    existingItem.completedDate = new Date();
    existingItem.lastUpdated = new Date();
    existingItem.progress = 1.0;
    existingItem.totalItems = totalItems;
    existingItem.itemsComplete = totalItems;
    existingItem.itemsFromDate = itemsFromDate;
    existingItem.itemsToDate = itemsToDate;
    return this.saveDataLoadItem(existingItem);
  }

  private saveDataLoadItem(item: IDataLoad) {
    return nSQL(NanoSql.TABLES.DATA_LOAD.name).query('upsert', item).exec();
  }

  getState(id: string): Promise<IDataLoad> {
    return this.getStateAsObservable(id).pipe(take(1)).toPromise();
  }

  getStateAsObservable(id: string): Observable<IDataLoad> {
    return nSQL().observable<IDataLoad>(() => {
      return nSQL(NanoSql.TABLES.DATA_LOAD.name).query('select').where((x) => x.id === id).emit();
    }).toRxJS().pipe(
      map((val: IDataLoad[]) => val.length > 0 ? val[0] :
        { id, completed: null, lastUpdated: null, isLoading: false, started: null })
    );
  }
}
