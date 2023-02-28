import { Injectable } from '@angular/core';
import { UpdateObservationsService } from './update-observations.service';

/**
 * Offline version of UpdateObservationsService.
 * Ignores values passed to setLastFetched and only cares about values passed to setOfflineObservationsLastFetched.
 */
@Injectable()
export class UpdateObservationsOfflineService extends UpdateObservationsService {
  setLastFetched(date: Date) {
    // Do nothing, only OfflineCapableSearchService should set this for offline capable platforms
  }

  setOfflineObservationsLastFetched(date: Date | string) {
    this.lastFetched.next(date);
  }
}
