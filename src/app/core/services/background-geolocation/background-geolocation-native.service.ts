import { Injectable } from '@angular/core';
import { BackgroundGeolocationService } from './background-geolocation.service';
import { BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { Platform } from '@ionic/angular';
import { TripLoggerService } from '../trip-logger/trip-logger.service';
import { TranslateService } from '@ngx-translate/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { TripLogState } from '../trip-logger/trip-log-state.enum';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';

const DEBUG_TAG = 'BackgroundGeolocationNativeService';

@Injectable()
export class BackgroundGeolocationNativeService implements BackgroundGeolocationService {
    backgroundGeolocation: any;

    constructor(
        private platform: Platform,
        private tripLogger: TripLoggerService,
        private translateService: TranslateService,
        private geolocation: Geolocation,
        private loggingService: LoggingService,
    ) {
        this.platform.ready().then(() => {
            this.backgroundGeolocation = (<any>window).BackgroundGeolocation;
        });
    }

    private async configureBackgroundGeoLocation() {
        await this.platform.ready();
        const translations = await this.translateService.get(
            ['GEOLOCATION_SERVICE.NOTIFICATION_TITLE',
                'GEOLOCATION_SERVICE.NOTIFICATION_TEXT']
        ).toPromise();
        const config: BackgroundGeolocationConfig = {
            locationProvider: this.backgroundGeolocation.DISTANCE_FILTER_PROVIDER, // ANDROID_DISTANCE_FILTER_PROVIDER
            desiredAccuracy: this.backgroundGeolocation.LOW_ACCURACY, // Low
            stationaryRadius: 50,
            distanceFilter: 50,
            debug: false, //  enable this hear sounds for background-geolocation life-cycle.
            stopOnTerminate: false, // enable this to clear background location settings when the app terminate
            startForeground: true,
            notificationTitle: translations['GEOLOCATION_SERVICE.NOTIFICATION_TITLE'],
            notificationText: translations['GEOLOCATION_SERVICE.NOTIFICATION_TEXT'],
            activityType: 'OtherNavigation',
            maxLocations: 1, // Disable local storage of locations, because we handle this in nanoSQL instead
        };
        this.backgroundGeolocation.configure(config, () => {
            this.loggingService.debug('BackgroundGeolocation set up success!', DEBUG_TAG);
        }, (error) => {
            this.loggingService.error(error, DEBUG_TAG, 'Could not configure background geolocation!');
        });
    }

    savePositionUpdate(location: BackgroundGeolocationResponse) {
        return this.tripLogger.saveTripLogItem({
            latitude: location.latitude,
            longitude: location.longitude,
            timestamp: location.time,
            accuracy: location.accuracy,
            altitude: location.altitude,
            heading: location.bearing,
            speed: location.speed
        });
    }

    async start() {
        await this.tripLogger.updateState(TripLogState.Running);
        await this.configureBackgroundGeoLocation();
        this.backgroundGeolocation.on('location', (location: BackgroundGeolocationResponse) => {
            // handle your locations here
            // to perform long running operation on iOS
            // you need to create background task
            this.backgroundGeolocation.startTask(async (taskKey) => {
                // execute long running task
                // eg. ajax post location
                // IMPORTANT: task has to be ended by endTask
                try {
                    await this.savePositionUpdate(location);
                } catch (error) {
                    this.loggingService.error(error, DEBUG_TAG, 'Error saving position update!');
                } finally {
                    this.backgroundGeolocation.endTask(taskKey);
                }
            });
        });
        this.backgroundGeolocation.on('error', async (error) => {
            this.loggingService.error(
                new Error(`Error code: ${error.code}. Message:${error.message}`),
                DEBUG_TAG, 'Error in background geolocation!');
            await this.tripLogger.updateState(TripLogState.Paused);
        });
        this.backgroundGeolocation.on('start', () => {
            this.loggingService.debug('BackgroundGeolocation service has been started', DEBUG_TAG);
        });
        this.backgroundGeolocation.on('stop', () => {
            this.loggingService.debug('BackgroundGeolocation service has been stopped', DEBUG_TAG);
        });
        this.backgroundGeolocation.on('authorization', (status) => {
            this.loggingService.debug('BackgroundGeolocation authorization status', DEBUG_TAG, status);
            if (status !== this.backgroundGeolocation.AUTHORIZED) {
                return this.backgroundGeolocation.showAppSettings();
            }
        });
        this.backgroundGeolocation.checkStatus((status) => {
            this.loggingService.debug('BackgroundGeolocation service status', DEBUG_TAG, status);
            // you don't need to check status before start (this is just the example)
            if (!status.isRunning) {
                this.backgroundGeolocation.start(); // triggers start on start event
            }
        });
    }

    async stop() {
        await this.platform.ready();
        await this.tripLogger.updateState(TripLogState.Paused);
        this.backgroundGeolocation.stop();
        const lastPosition = await this.geolocation.getCurrentPosition({
            enableHighAccuracy: true,
            maximumAge: 60 * 1000,
        });
        if (lastPosition.coords) {
            await this.tripLogger.saveTripLogItem({
                latitude: lastPosition.coords.latitude,
                longitude: lastPosition.coords.longitude,
                accuracy: lastPosition.coords.accuracy,
                altitude: lastPosition.coords.altitude,
                speed: lastPosition.coords.speed,
                timestamp: lastPosition.timestamp,
                heading: lastPosition.coords.heading,
            });
        }
        this.tripLogger.updateState(TripLogState.Paused);
        for (const event of this.backgroundGeolocation.events) {
            return this.backgroundGeolocation.removeAllListeners(event);
        }
    }

    isRunning(): Promise<boolean> {
        return new Promise((resolve) => {
            this.backgroundGeolocation.checkStatus((status) => {
                resolve(status.isRunning);
            });
        });
    }
}
