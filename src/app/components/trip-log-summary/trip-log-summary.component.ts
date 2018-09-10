import { Component, OnInit, OnDestroy } from '@angular/core';
import { TripLoggerService } from '../../core/services/trip-logger/trip-logger.service';
import { ObserverSubscriber } from 'nano-sql/lib/observable';
import * as moment from 'moment';
import { BackgroundGeolocationService } from '../../core/services/background-geolocation/background-geolocation.service';
import { HelperService } from '../../core/services/helpers/helper.service';
import { TripLogItem } from '../../core/services/trip-logger/trip-log-item.model';

@Component({
  selector: 'app-trip-log-summary',
  templateUrl: './trip-log-summary.component.html',
  styleUrls: ['./trip-log-summary.component.scss']
})
export class TripLogSummaryComponent implements OnInit, OnDestroy {
  private subscription: ObserverSubscriber;
  length: string;
  started: moment.Moment;
  end: moment.Moment;
  interval: NodeJS.Timer;
  tripLog: TripLogItem[];

  constructor(
    private tripLoggerService: TripLoggerService,
    private backgroundGeolocationService: BackgroundGeolocationService,
    private helperService: HelperService) { }

  ngOnInit() {
    this.subscription = this.tripLoggerService.getTripLogAsObservable().subscribe((tripLog) => {
      this.tripLog = tripLog;
      if (tripLog.length > 0) {
        this.started = moment(tripLog[0].timestamp);
        this.end = moment(tripLog[tripLog.length - 1].timestamp);
      }
    });

    this.interval = setInterval(async () => {
      if (this.tripLog.length > 0) {
        const running = await this.backgroundGeolocationService.isRunning();
        const from = running ? moment() : this.end;
        this.length = this.helperService.formatMsToTime(from.diff(this.started));
        // TODO: This length is wrong. We have to log each start and stop!
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    clearInterval(this.interval);
  }

}
