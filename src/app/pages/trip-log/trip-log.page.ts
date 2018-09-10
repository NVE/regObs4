import { Component, OnInit } from '@angular/core';
import { BackgroundGeolocationService } from '../../core/services/background-geolocation/background-geolocation.service';
import { TripLoggerService } from '../../core/services/trip-logger/trip-logger.service';
import { TripLogState } from './trip-log-state.enum';

@Component({
  selector: 'app-trip-log',
  templateUrl: './trip-log.page.html',
  styleUrls: ['./trip-log.page.scss'],
})
export class TripLogPage implements OnInit {

  state: TripLogState = TripLogState.NotStarted;

  constructor(private backgroundGeolocationService: BackgroundGeolocationService, private tripLoggerService: TripLoggerService) { }

  async ngOnInit() {
    const isRunning = await this.backgroundGeolocationService.isRunning();
    if (isRunning) {
      this.state = TripLogState.Running;
    }
  }

  startTrip() {
    this.state = TripLogState.Running;
    return this.backgroundGeolocationService.start();
  }

  pauseTrip() {
    this.state = TripLogState.Paused;
    return this.backgroundGeolocationService.stop();
  }

  completeTrip() {
    this.state = TripLogState.Stopped;
  }
}
