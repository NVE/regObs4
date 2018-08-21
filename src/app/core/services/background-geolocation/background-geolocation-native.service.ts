import { Injectable } from '@angular/core';
import { BackgroundGeolocationService } from './background-geolocation.service';
import { BackgroundGeolocationConfig } from '@ionic-native/background-geolocation';
import { BackgroundGeolocationLocation } from './background-geolocation.model';
import { Platform } from '@ionic/angular';
import { TripLoggerService } from '../trip-logger/trip-logger.service';

@Injectable()
export class BackgroundGeolocationNativeService implements BackgroundGeolocationService {
    backgroundGeolocation: any;

    constructor(private platform: Platform, private tripLogger: TripLoggerService) {
        this.platform.ready().then(() => {
            this.backgroundGeolocation = (<any>window).BackgroundGeolocation;
        });
    }

    private async configureBackgroundGeoLocation() {
        await this.platform.ready();
        const config: BackgroundGeolocationConfig = {
            locationProvider: this.backgroundGeolocation.DISTANCE_FILTER_PROVIDER, // ANDROID_DISTANCE_FILTER_PROVIDER
            desiredAccuracy: this.backgroundGeolocation.LOW_ACCURACY, // Low
            stationaryRadius: 50,
            distanceFilter: 50,
            debug: false, //  enable this hear sounds for background-geolocation life-cycle.
            stopOnTerminate: false, // enable this to clear background location settings when the app terminate
            startForeground: true,
            notificationTitle: 'Tur pågår',
            notificationText: 'Klikk for å stoppe',
            activityType: 'OtherNavigation',
            maxLocations: 100000,
        };
        this.backgroundGeolocation.configure(config, () => {
            console.log('[INFO] BackgroundGeolocation set up success!');
        }, (error) => {
            console.log(error); // TODO: Handle error
        });
    }

    async savePositionUpdate(location: BackgroundGeolocationLocation) {
        return new Promise(async (resolve, reject) => {
            await this.tripLogger.saveTripLogItem({
                latitude: location.latitude,
                longitude: location.longitude,
                timestamp: new Date(location.time),
                accuracy: location.accuracy,
                altitude: location.altitude,
                heading: location.bearing,
                speed: location.speed
            });
            this.backgroundGeolocation.deleteLocation(location.id, () => {
                resolve();
            }, (error) => {
                reject(error);
            });
        });
    }

    async start() {
        await this.configureBackgroundGeoLocation();
        this.backgroundGeolocation.on('location', (location: BackgroundGeolocationLocation) => {
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
                    console.log('[ERROR] Error saving position update ' + error.message);
                    // TODO: Log error
                } finally {
                    this.backgroundGeolocation.endTask(taskKey);
                }
            });
        });
        this.backgroundGeolocation.on('error', (error) => {
            console.log('[ERROR] BackgroundGeolocation error:', error.code, error.message);
        });
        this.backgroundGeolocation.on('start', () => {
            console.log('[INFO] BackgroundGeolocation service has been started');
        });
        this.backgroundGeolocation.on('stop', () => {
            console.log('[INFO] BackgroundGeolocation service has been stopped');
        });
        this.backgroundGeolocation.on('authorization', (status) => {
            console.log('[INFO] BackgroundGeolocation authorization status: ' + status);
            if (status !== this.backgroundGeolocation.AUTHORIZED) {
                return this.backgroundGeolocation.showAppSettings();
            }
        });
        this.backgroundGeolocation.checkStatus((status) => {
            console.log('[INFO] BackgroundGeolocation service is running', status.isRunning);
            console.log('[INFO] BackgroundGeolocation services enabled', status.locationServicesEnabled);
            console.log('[INFO] BackgroundGeolocation auth status: ' + status.authorization);
            // you don't need to check status before start (this is just the example)
            if (!status.isRunning) {
                this.backgroundGeolocation.start(); // triggers start on start event
            }
        });
    }

    async stop() {
        await this.platform.ready();
        this.backgroundGeolocation.stop();
        this.backgroundGeolocation.events.forEach((event) => {
            return this.backgroundGeolocation.removeAllListeners(event);
        });
    }

    isRunning(): Promise<boolean> {
        return new Promise((resolve) => {
            this.backgroundGeolocation.checkStatus((status) => {
                resolve(status.isRunning);
            });
        });
    }
}
