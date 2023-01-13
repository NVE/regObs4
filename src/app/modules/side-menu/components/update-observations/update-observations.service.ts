import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Use this to update the info box in the filter panel with observation search status
 */
@Injectable({
  providedIn: 'root',
})
export class UpdateObservationsService {
  private lastFetched = new Subject<Date>();
  private refreshRequested = new Subject<void>();
  readonly lastFetched$ = this.lastFetched.asObservable();
  readonly refreshRequested$ = this.refreshRequested.asObservable();

  setLastFetched(date: Date) {
    this.lastFetched.next(date);
  }

  requestRefresh() {
    this.refreshRequested.next();
  }
}
