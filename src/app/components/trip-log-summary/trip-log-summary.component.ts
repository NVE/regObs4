import { Component, OnInit, OnDestroy } from '@angular/core';
import { TripLoggerService } from '../../core/services/trip-logger/trip-logger.service';
import moment from 'moment';
import { BackgroundGeolocationService } from '../../core/services/background-geolocation/background-geolocation.service';
import { HelperService } from '../../core/services/helpers/helper.service';
import { TripLogItem } from '../../core/services/trip-logger/trip-log-item.model';
import { TripLogActivity } from '../../core/services/trip-logger/trip-log-activity.model';
import { TripLogState } from '../../core/services/trip-logger/trip-log-state.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-trip-log-summary',
  templateUrl: './trip-log-summary.component.html',
  styleUrls: ['./trip-log-summary.component.scss']
})
export class TripLogSummaryComponent implements OnInit, OnDestroy {
  private tripLogSubscription: Subscription;
  private tripLogActivitySubscription: Subscription;

  lengthString: string;
  interval: NodeJS.Timer;
  tripLog: TripLogItem[];
  tripLogActivity: TripLogActivity[];

  constructor(
    private tripLoggerService: TripLoggerService,
    private helperService: HelperService) { }

  ngOnInit() {
    this.tripLogSubscription = this.tripLoggerService.getTripLogAsObservable().subscribe((tripLog) => {
      this.tripLog = tripLog;
    });
    this.tripLogActivitySubscription = this.tripLoggerService.getTripLogActivityAsObservable()
      .subscribe((tripLogActivity) => {
        this.tripLogActivity = tripLogActivity;
      });

    this.interval = setInterval(async () => {
      const lengthMs = this.calculateTimeFromTripLogActivity(this.tripLogActivity);
      this.lengthString = this.helperService.formatMsToTime(lengthMs);
    }, 1000);
  }

  calculateTimeFromTripLogActivity(tripLogActivity: TripLogActivity[]): number {
    let lengthMs = 0;
    if (tripLogActivity.length > 0) {
      let lastItem: TripLogActivity = null;
      for (const item of tripLogActivity) {
        if (item.state === TripLogState.Paused) {
          lengthMs += moment.unix(item.timestamp).diff(moment.unix(lastItem.timestamp));
        }
        lastItem = item;
      }
      if (lastItem.state === TripLogState.Running) {
        lengthMs += moment().diff(moment.unix(lastItem.timestamp));
      }
    }
    return lengthMs;
  }

  ngOnDestroy(): void {
    this.tripLogSubscription.unsubscribe();
    this.tripLogActivitySubscription.unsubscribe();
    clearInterval(this.interval);
  }

}
