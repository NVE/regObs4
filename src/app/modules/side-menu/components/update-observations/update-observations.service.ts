import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

/**
 * Use this to update the info box in the filter panel with observation search status
 */
@Injectable({
  providedIn: 'root',
})
export class UpdateObservationsService {
  offlineMode = false;
  private lastFetched = new ReplaySubject<Date>();
  private lastFetchedOffline = new ReplaySubject<Date>();
  private refreshRequested = new Subject<void>();
  readonly refreshRequested$ = this.refreshRequested.asObservable();

  get lastFetched$() {
    if (this.offlineMode) {
      return this.lastFetchedOffline.asObservable();
    }
    return this.lastFetched.asObservable();
  }

  setLastFetched(date: Date) {
    this.lastFetched.next(date);
  }

  requestRefresh() {
    this.refreshRequested.next();
  }

  setOfflineObservationsLastFetched(date: Date) {
    this.lastFetchedOffline.next(date);
  }
}
