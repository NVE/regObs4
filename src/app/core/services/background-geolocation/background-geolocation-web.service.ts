import { Injectable } from '@angular/core';
import { BackgroundGeolocationService } from './background-geolocation.service';
import { Subscription } from 'rxjs';
// import {
//   Geoposition,
//   Geolocation,
//   PositionError
// } from '@ionic-native/geolocation/ngx';
import { TripLoggerService } from '../trip-logger/trip-logger.service';
import { TripLogState } from '../trip-logger/trip-log-state.enum';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';

//TODO: Har kommentert ut denne servicen når vi fjernet @ionic-native/geolocation/ngx, siden det later til at den ikke er i bruk. Vurder om vi skal slette servicen!
@Injectable()
export class BackgroundGeolocationWebService implements BackgroundGeolocationService {
  watchSubscription?: Subscription;

  constructor(
    private geolocation: Geolocation,
    private tripLogger: TripLoggerService,
    private loggingService: LoggingService
  ) {}

  async start() {
    // await this.tripLogger.updateState(TripLogState.Running);
    // this.watchSubscription = this.geolocation
    //   .watchPosition({ maximumAge: 60000, enableHighAccuracy: true })
    //   .subscribe(
    //     (data) => this.onPositionUpdate(data),
    //     (error) => this.onPositionError(error)
    //   );
  }

  // private onPositionUpdate(data: Geoposition | PositionError) {
  //   // data can be a set of coordinates, or an error (if an error occurred).
  //   // data.coords.latitude
  //   // data.coords.longitude
  //   const pos = data as Geoposition;
  //   if (pos.coords) {
  //     this.tripLogger.saveTripLogItem({
  //       latitude: pos.coords.latitude,
  //       longitude: pos.coords.longitude,
  //       accuracy: pos.coords.accuracy,
  //       altitude: pos.coords.altitude,
  //       speed: pos.coords.speed,
  //       timestamp: pos.timestamp,
  //       heading: pos.coords.heading
  //     });
  //   }
  // }

  // private onPositionError(error: any) {
  //   this.loggingService.error(error, 'BackgroundGeolocationWebService');
  // }

  async stop() {
    // await this.tripLogger.updateState(TripLogState.Paused);
    // this.watchSubscription.unsubscribe();
    // this.watchSubscription = null;
  }

  isRunning() {
    return Promise.resolve(false);
    // return Promise.resolve(!!this.watchSubscription);
  }
}
