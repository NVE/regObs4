import { Injectable, inject } from '@angular/core';
import { BackgroundGeolocationService } from './background-geolocation.service';
// import { BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@awesome-cordova-plugins/background-geolocation';
import { Platform } from '@ionic/angular/standalone';
// import { TripLoggerService } from '../trip-logger/trip-logger.service';
import { TranslateService } from '@ngx-translate/core';
// import { Geolocation } from '@capacitor/geolocation';
// import { TripLogState } from '../trip-logger/trip-log-state.enum';
// import { LoggingService } from '../../../modules/shared/services/logging/logging.service';

@Injectable()
export class BackgroundGeolocationNativeService implements BackgroundGeolocationService {
  private platform = inject(Platform);
  // private tripLogger = inject(TripLoggerService);
  private translateService = inject(TranslateService);
  // private geolocation = inject(Geolocation);
  // private loggingService = inject(LoggingService);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  backgroundGeolocation: any;

  constructor() {
    this.platform.ready().then(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.backgroundGeolocation = (<any>window).BackgroundGeolocation;
    });
  }

  // savePositionUpdate(location: BackgroundGeolocationResponse) {
  //     return this.tripLogger.saveTripLogItem({
  //         latitude: location.latitude,
  //         longitude: location.longitude,
  //         timestamp: location.time,
  //         accuracy: location.accuracy,
  //         altitude: location.altitude,
  //         heading: location.bearing,
  //         speed: location.speed
  //     });
  // }

  async start() {
    // await this.tripLogger.updateState(TripLogState.Running);
    // await this.configureBackgroundGeoLocation();
    // this.backgroundGeolocation.on('location', (location: BackgroundGeolocationResponse) => {
    //     // handle your locations here
    //     // to perform long running operation on iOS
    //     // you need to create background task
    //     this.backgroundGeolocation.startTask(async (taskKey) => {
    //         // execute long running task
    //         // eg. ajax post location
    //         // IMPORTANT: task has to be ended by endTask
    //         try {
    //             await this.savePositionUpdate(location);
    //         } catch (error) {
    //             this.loggingService.error(error, DEBUG_TAG, 'Error saving position update!');
    //         } finally {
    //             this.backgroundGeolocation.endTask(taskKey);
    //         }
    //     });
    // });
    // this.backgroundGeolocation.on('error', async (error) => {
    //     this.loggingService.error(
    //         new Error(`Error code: ${error.code}. Message:${error.message}`),
    //         DEBUG_TAG, 'Error in background geolocation!');
    //     await this.tripLogger.updateState(TripLogState.Paused);
    // });
    // this.backgroundGeolocation.on('start', () => {
    //     this.loggingService.debug('BackgroundGeolocation service has been started', DEBUG_TAG);
    // });
    // this.backgroundGeolocation.on('stop', () => {
    //     this.loggingService.debug('BackgroundGeolocation service has been stopped', DEBUG_TAG);
    // });
    // this.backgroundGeolocation.on('authorization', (status) => {
    //     this.loggingService.debug('BackgroundGeolocation authorization status', DEBUG_TAG, status);
    //     if (status !== this.backgroundGeolocation.AUTHORIZED) {
    //         return this.backgroundGeolocation.showAppSettings();
    //     }
    // });
    // this.backgroundGeolocation.checkStatus((status) => {
    //     this.loggingService.debug('BackgroundGeolocation service status', DEBUG_TAG, status);
    //     // you don't need to check status before start (this is just the example)
    //     if (!status.isRunning) {
    //         this.backgroundGeolocation.start(); // triggers start on start event
    //     }
    // });
  }

  async stop() {
    // await this.platform.ready();
    // await this.tripLogger.updateState(TripLogState.Paused);
    // this.backgroundGeolocation.stop();
    // const lastPosition = await this.geolocation.getCurrentPosition({
    //     enableHighAccuracy: true,
    //     maximumAge: 60 * 1000,
    // });
    // if (lastPosition.coords) {
    //     await this.tripLogger.saveTripLogItem({
    //         latitude: lastPosition.coords.latitude,
    //         longitude: lastPosition.coords.longitude,
    //         accuracy: lastPosition.coords.accuracy,
    //         altitude: lastPosition.coords.altitude,
    //         speed: lastPosition.coords.speed,
    //         timestamp: lastPosition.timestamp,
    //         heading: lastPosition.coords.heading,
    //     });
    // }
    // this.tripLogger.updateState(TripLogState.Paused);
    // for (const event of this.backgroundGeolocation.events) {
    //     return this.backgroundGeolocation.removeAllListeners(event);
    // }
  }

  isRunning(): Promise<boolean> {
    return Promise.resolve(false);
    // return new Promise((resolve) => {
    //     this.backgroundGeolocation.checkStatus((status) => {
    //         resolve(status.isRunning);
    //     });
    // });
  }
}
