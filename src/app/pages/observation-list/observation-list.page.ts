import { Component, OnInit, OnDestroy, NgZone, ViewChild } from '@angular/core';
import { ObservationService } from '../../core/services/observation/observation.service';
import * as L from 'leaflet';
import { Subscription, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MapService } from '../../modules/map/services/map/map.service';
import { IMapView } from '../../modules/map/services/map/map-view.interface';
import { RegistrationViewModel } from '../../modules/regobs-api/models';
import { IonVirtualScroll, IonRefresher, IonContent } from '@ionic/angular';
import { LoggingService } from '../../modules/shared/services/logging/logging.service';
import { DataMarshallService } from '../../core/services/data-marshall/data-marshall.service';
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
    cancelSubject: Subject<any>;

    @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;
    @ViewChild(IonRefresher) refresher: IonRefresher;
    @ViewChild(IonContent) content: IonContent;

    trackByIdFunc = this.trackByIdFuncInternal.bind(this);
    refreshFunc = this.refresh.bind(this);

    get observations$() {
        return this.mapService.mapView$.pipe(switchMap((mapView: IMapView) =>
            this.observationService.observations$.pipe(map((observations) =>
                this.filterObservationsWithinViewBounds(observations, mapView))
            )
        ));
    }

    constructor(
        private observationService: ObservationService,
        private dataMarshallService: DataMarshallService,
        // private obsCardHeightService: ObsCardHeightService,
        private ngZone: NgZone,
        private loggingService: LoggingService,
        private mapService: MapService) {
    }

    ngOnInit() {
        this.cancelSubject = this.dataMarshallService.observableCancelSubject;
    }

    refresh(cancelPromise: Promise<any>) {
        this.loaded = false;
        this.observations = undefined;
        return this.observationService.forceUpdateObservationsForCurrentGeoHazard(cancelPromise);
    }

    ionViewDidEnter() {
        this.startSubscription();
    }

    ionViewWillLeave() {
        this.loaded = false;
        this.observations = undefined;
        this.stopSubscription();
    }

    private reloadVirtualList(observations: RegistrationViewModel[]) {
        if (!this.loaded) {
            setTimeout(() => {
                this.loaded = true;
            }, observations.length > 0 ? 2000 : 500);
            this.ngZone.run(() => {
                // Only load observation list one time per page load.
                this.observations = observations;
            });
        }
    }

    startSubscription() {
        this.subscription = this.observations$.subscribe((val) => this.reloadVirtualList(val));
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

    private trackByIdFuncInternal(_, obs: RegistrationViewModel) {
        return this.observationService.uniqueObservation(obs);
    }

    footerFn(item: RegistrationViewModel, index: number, items: RegistrationViewModel[]) {
        if (index === (items.length - 1)) {
            return 'footer';
        }
    }

    headerFn(item: RegistrationViewModel, index: number, items: RegistrationViewModel[]) {
        if (index === 0) {
            return 'header';
        }
    }

    // getItemHeight(item: RegistrationViewModel, index: number) {
    //     return this.obsCardHeightService.getHeight(item.RegID);
    // }
}
