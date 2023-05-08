import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

/**
 * Use this to update the info box in the filter panel with observation search status
 */
@Injectable({
  providedIn: 'root',
})
export class UpdateObservationsService {
  protected lastFetched = new ReplaySubject<Date>();
  private refreshRequested = new Subject<void>();
  readonly lastFetched$ = this.lastFetched.asObservable();
  readonly refreshRequested$ = this.refreshRequested.asObservable();

  setLastFetched(date: Date) {
    this.lastFetched.next(date);
  }

  requestRefresh() {
    this.refreshRequested.next();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setOfflineObservationsLastFetched(date: Date) {
    // Not implemented for standard platform, web.
    // See UpdateObservationsOfflineService
  }
}
