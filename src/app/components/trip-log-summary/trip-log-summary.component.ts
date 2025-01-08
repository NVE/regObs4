import { IonGrid, IonRow, IonCol, IonText, IonLabel } from '@ionic/angular/standalone';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { TripLoggerService } from '../../core/services/trip-logger/trip-logger.service';
import moment from 'moment';
import { HelperService } from '../../core/services/helpers/helper.service';
import { TripLogItem } from '../../core/services/trip-logger/trip-log-item.model';
import { TripLogActivity } from '../../core/services/trip-logger/trip-log-activity.model';
import { TripLogState } from '../../core/services/trip-logger/trip-log-state.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-trip-log-summary',
  templateUrl: './trip-log-summary.component.html',
  styleUrls: ['./trip-log-summary.component.scss'],
  imports: [IonCol, IonGrid, IonLabel, IonRow, IonText],
})
export class TripLogSummaryComponent implements OnInit, OnDestroy {
  private tripLoggerService = inject(TripLoggerService);
  private helperService = inject(HelperService);

  private tripLogSubscription!: Subscription;
  private tripLogActivitySubscription!: Subscription;

  lengthString?: string;
  interval?: NodeJS.Timer;
  tripLog?: TripLogItem[];
  tripLogActivity?: TripLogActivity[];

  ngOnInit() {
    this.tripLogSubscription = this.tripLoggerService.getTripLogAsObservable().subscribe((tripLog) => {
      this.tripLog = tripLog;
    });
    this.tripLogActivitySubscription = this.tripLoggerService
      .getTripLogActivityAsObservable()
      .subscribe((tripLogActivity) => {
        this.tripLogActivity = tripLogActivity;
      });

    this.interval = setInterval(async () => {
      if (this.tripLogActivity) {
        const lengthMs = this.calculateTimeFromTripLogActivity(this.tripLogActivity);
        this.lengthString = this.helperService.formatMsToTime(lengthMs);
      }
    }, 1000);
  }

  calculateTimeFromTripLogActivity(tripLogActivity: TripLogActivity[]): number {
    let lengthMs = 0;
    if (tripLogActivity.length > 0) {
      let lastItem: TripLogActivity | undefined = undefined;
      for (const item of tripLogActivity) {
        if (item.state === TripLogState.Paused && lastItem) {
          lengthMs += moment.unix(item.timestamp).diff(moment.unix(lastItem.timestamp));
        }
        lastItem = item;
      }
      if (lastItem?.state === TripLogState.Running) {
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
