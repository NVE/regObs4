import { Component, OnInit, OnDestroy, NgZone, ViewChild } from '@angular/core';
import { ObservationService } from '../../core/services/observation/observation.service';
import * as L from 'leaflet';
import { Subscription } from 'rxjs';
import { map, switchMap, distinct, tap } from 'rxjs/operators';
import { MapService } from '../../modules/map/services/map/map.service';
import { IMapView } from '../../modules/map/services/map/map-view.interface';
import { RegistrationViewModel } from '../../modules/regobs-api/models';
import { IonVirtualScroll, IonRefresher } from '@ionic/angular';
import { LoggingService } from '../../modules/shared/services/logging/logging.service';
// import { ObsCardHeightService } from '../../core/services/obs-card-height/obs-card-height.service';

const DEBUG_TAG = 'ObservationListPage';

@Component({
    selector: 'app-observation-list',
    templateUrl: './observation-list.page.html',
    styleUrls: ['./observation-list.page.scss'],
})
export class ObservationListPage implements OnInit, OnDestroy {
    observations: RegistrationViewModel[];
    loaded = false;
    private subscription: Subscription;

    refreshFunc: Function;

    @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;
    @ViewChild(IonRefresher) refresher: IonRefresher;

    get observations$() {
        return this.mapService.mapView$.pipe(switchMap((mapView: IMapView) =>
            this.observationService.observations$.pipe(map((observations) =>
                this.filterObservationsWithinViewBounds(observations, mapView)),
                distinct((val) => this.getUniqueArray(val))
            )
        ));
    }

    constructor(
        private observationService: ObservationService,
        // private obsCardHeightService: ObsCardHeightService,
        private ngZone: NgZone,
        private loggingService: LoggingService,
        private mapService: MapService) {
    }

    ngOnInit() {
        this.refreshFunc = this.refresh.bind(this);
    }

    refresh(cancelPromise: Promise<any>) {
        return this.observationService.forceUpdateObservationsForCurrentGeoHazard(cancelPromise);
    }

    ionViewDidEnter() {
        this.startSubscription();
    }

    ionViewWillLeave() {
        this.stopSubscription();
    }

    private reloadVirtualList(observations: RegistrationViewModel[]) {
        if (this.getUniqueArray(this.observations) !== this.getUniqueArray(observations)) {
            this.ngZone.run(() => {
                this.loaded = false;
                this.observations = undefined; // Recreate virutal scroll
                setTimeout(() => {
                    this.observations = observations;  // Initial load
                    // NOTE: Reload virtual scroll to get correct item heights
                    // There is still some issues with ionic virtual scroll...
                    // https://github.com/ionic-team/ionic/issues/15948
                    // https://github.com/ionic-team/ionic/issues/15258
                    setTimeout(() => {
                        this.observations = [...observations];
                        setTimeout(() => {
                            this.ngZone.run(() => {
                                this.loaded = true;
                            });
                        }, 500);
                    }, 500);
                }, 200);
            });
        }
    }

    startSubscription() {
        this.subscription = this.observations$.subscribe((val) => this.reloadVirtualList(val));
    }

    getUniqueArray(arr: RegistrationViewModel[]) {
        if (!arr) {
            return '';
        }
        return arr.map((reg) => `${reg.RegID}-${reg.DtChangeTime}`).join('#');
    }

    stopSubscription() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    ngOnDestroy() {
    }

    private filterObservationsWithinViewBounds(observations: RegistrationViewModel[], view: IMapView) {
        return observations.filter((observation) => !view ||
            view.bounds.contains(L.latLng(observation.ObsLocation.Latitude, observation.ObsLocation.Longitude)));
    }

    trackByRegId(_, obs: RegistrationViewModel) {
        return obs ? obs.RegID : undefined;
    }

    // getItemHeight(item: RegistrationViewModel, index: number) {
    //     return this.obsCardHeightService.getHeight(item.RegID);
    // }
}
