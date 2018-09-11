import { Injectable } from '@angular/core';
import { BackgroundGeolocationService } from './background-geolocation.service';
import { Subscription } from 'rxjs';
import { Geoposition, Geolocation } from '@ionic-native/geolocation/ngx';
import { TripLoggerService } from '../trip-logger/trip-logger.service';
import { TripLogState } from '../trip-logger/trip-log-state.enum';

@Injectable()
export class BackgroundGeolocationWebService implements BackgroundGeolocationService {
    watchSubscription?: Subscription;

    constructor(private geolocation: Geolocation, private tripLogger: TripLoggerService) {
    }

    async start() {
        await this.tripLogger.updateState(TripLogState.Running);
        this.watchSubscription = this.geolocation.watchPosition(
            { maximumAge: 60000, enableHighAccuracy: true }
        )
            .subscribe(
                (data) => this.onPositionUpdate(data),
                (error) => this.onPositionError(error)
            );
    }

    private onPositionUpdate(data: Geoposition) {
        // data can be a set of coordinates, or an error (if an error occurred).
        // data.coords.latitude
        // data.coords.longitude
        if (data.coords) {
            this.tripLogger.saveTripLogItem({
                latitude: data.coords.latitude,
                longitude: data.coords.longitude,
                accuracy: data.coords.accuracy,
                altitude: data.coords.altitude,
                speed: data.coords.speed,
                timestamp: data.timestamp,
                heading: data.coords.heading,
            });
        }
    }

    private onPositionError(error: any) {
        // TODO: Handle error
        console.log(error);
    }

    async stop() {
        await this.tripLogger.updateState(TripLogState.Paused);
        this.watchSubscription.unsubscribe();
        this.watchSubscription = null;
    }

    isRunning() {
        return Promise.resolve(!!this.watchSubscription);
    }
}
