import { Injectable } from '@angular/core';
import { BackgroundGeolocationService } from './background-geolocation.service';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { TripLoggerService } from '../trip-logger/trip-logger.service';

@Injectable()
export class BackgroundGeolocationNativeService implements BackgroundGeolocationService {
    currentTripLog?: number;

    constructor(private backgroundGeolocation: BackgroundGeolocation, private tripLoggerService: TripLoggerService) {
    }

    init() {
        const config: BackgroundGeolocationConfig = {
            locationProvider: 0, // ANDROID_DISTANCE_FILTER_PROVIDER
            desiredAccuracy: 100, // Low
            stationaryRadius: 50,
            distanceFilter: 50,
            debug: false, //  enable this hear sounds for background-geolocation life-cycle.
            stopOnTerminate: false, // enable this to clear background location settings when the app terminates
        };

        this.backgroundGeolocation.configure(config)
            .subscribe((location: BackgroundGeolocationResponse) => {

                console.log(location);

                // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
                // and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
                // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
                this.backgroundGeolocation.finish(); // FOR IOS ONLY
            });
    }

    async start() {
        await this.tripLoggerService.createNewTrip();
        this.backgroundGeolocation.start();
    }

    stop() {
        this.backgroundGeolocation.stop();
    }
}
