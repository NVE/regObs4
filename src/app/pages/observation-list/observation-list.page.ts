import { Component, OnInit, OnDestroy, NgZone, ViewChild } from '@angular/core';
import { ObservationService } from '../../core/services/observation/observation.service';
import * as L from 'leaflet';
import { combineLatest, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { MapService } from '../../modules/map/services/map/map.service';
import { IMapView } from '../../modules/map/services/map/map-view.interface';
import { RegistrationViewModel } from '../../modules/regobs-api/models';
import { Router, NavigationStart } from '@angular/router';
import { IonVirtualScroll } from '@ionic/angular';
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
    // theBoundCallback: Function;
    private subscription: Subscription;
    private routerSubscription: Subscription;

    @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;

    constructor(
        private observationService: ObservationService,
        // private obsCardHeightService: ObsCardHeightService,
        private ngZone: NgZone,
        private router: Router,
        private loggingService: LoggingService,
        private mapService: MapService) {
    }

    ngOnInit() {
        this.routerSubscription =
            this.router.events.pipe(filter((event) => event instanceof NavigationStart)).subscribe((val: NavigationStart) => {
                if (val.url === '/tabs/observation-list') {
                    this.loggingService.debug(`Observation list page route changed to ${val.url}. Start subscription.`, DEBUG_TAG);
                    this.startSubscription();
                } else {
                    this.loggingService.debug(`Observation list page route changed to ${val.url}. Stop subscription.`, DEBUG_TAG);
                    this.stopSubscription();
                }
            });
        // this.theBoundCallback = this.getItemHeight.bind(this);

    }

    ionViewDidEnter() {
        this.startSubscription();
    }

    startSubscription() {
        this.subscription = combineLatest(this.observationService.observations$,
            this.mapService.mapViewObservable$)
            .pipe(
                // Using combineLatest to make sure that observable is emitted when wither observations or map view is updated
                map(([observations, mapView]) => this.filterObservationsWithinViewBounds(observations, mapView))
            ).subscribe((val) => {
                this.ngZone.run(() => {
                    this.observations = val;  // Initial load
                    // console.log(this.observations);
                    // if (this.virtualScroll) {
                    //     this.virtualScroll.checkRange(0, this.observations.length);
                    // }
                    // this.loaded = true;
                });
                if (this.observations.length > 0) {
                    // NOTE: Reload virtual scroll to get correct item heights
                    // There is still some issues with ionic virtual scroll...
                    // https://github.com/ionic-team/ionic/issues/15948
                    // https://github.com/ionic-team/ionic/issues/15258
                    setTimeout(() => {
                        this.observations = [...val];
                        setTimeout(() => {
                            this.ngZone.run(() => {
                                this.loaded = true;
                            });
                        }, 500);
                    }, 500);
                }
            });
    }

    stopSubscription() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.ngZone.run(() => {
            this.loaded = false;
            this.observations = undefined; // Recreate virutal scroll
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.routerSubscription) {
            this.routerSubscription.unsubscribe();
        }
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
