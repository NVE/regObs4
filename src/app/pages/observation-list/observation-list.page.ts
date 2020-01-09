import { Component, OnInit, OnDestroy, NgZone, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ObservationService } from '../../core/services/observation/observation.service';
import * as L from 'leaflet';
import { Subject, of } from 'rxjs';
import { map, switchMap, take, takeUntil, concatMap, delay, debounce, debounceTime } from 'rxjs/operators';
import { MapService } from '../../modules/map/services/map/map.service';
import { IMapView } from '../../modules/map/services/map/map-view.interface';
import { RegistrationViewModel } from '../../modules/regobs-api/models';
import { IonContent } from '@ionic/angular';
import { LoggingService } from '../../modules/shared/services/logging/logging.service';
import { DataMarshallService } from '../../core/services/data-marshall/data-marshall.service';
import { LogLevel } from '../../modules/shared/services/logging/log-level.model';
// import { ObsCardHeightService } from '../../core/services/obs-card-height/obs-card-height.service';

const DEBUG_TAG = 'ObservationListPage';

@Component({
    selector: 'app-observation-list',
    templateUrl: './observation-list.page.html',
    styleUrls: ['./observation-list.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObservationListPage implements OnInit, OnDestroy {
    observations: RegistrationViewModel[];
    loaded = false;
    cancelSubject: Subject<any>;
    private ngDestroy$ = new Subject();

    @ViewChild(IonContent, { static: true }) content: IonContent;

    trackByIdFunc = this.trackByIdFuncInternal.bind(this);
    refreshFunc = this.refresh.bind(this);

    get observations$() {
        return this.mapService.mapView$.pipe(debounceTime(200), concatMap((mapView: IMapView) =>
            this.observationService.observations$.pipe(map((observations) =>
                this.filterObservationsWithinViewBounds(observations, mapView)))),
            take(1),
            takeUntil(this.ngDestroy$)
        );
    }

    constructor(
        private observationService: ObservationService,
        private dataMarshallService: DataMarshallService,
        // private obsCardHeightService: ObsCardHeightService,
        private ngZone: NgZone,
        private cdr: ChangeDetectorRef,
        private loggingService: LoggingService,
        private mapService: MapService) {
    }

    ngOnInit() {
        this.cancelSubject = this.dataMarshallService.observableCancelSubject;
    }

    async refresh(cancelPromise: Promise<any>) {
        await this.observationService.forceUpdateObservationsForCurrentGeoHazard(cancelPromise);
        // TODO: Shouldn't this allways use the same cancel subject?
        this.loaded = false;
        this.cdr.detectChanges();
        this.loadObservations();
    }

    ionViewDidEnter() {
        this.ngDestroy$ = new Subject();
        this.loadObservations();
    }

    ionViewWillLeave() {
        this.loaded = false;
        this.observations = undefined;
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
        this.cdr.detectChanges();
    }

    private loadObservations() {
        this.observations$.subscribe((observations) => {
            this.observations = observations;
            this.fadeIn(observations.length > 0);
            this.cdr.detectChanges();
        }, (err) => {
            this.loggingService.log('Could not load observations', err, LogLevel.Warning, DEBUG_TAG);
        });
    }

    private fadeIn(short = false) {
        of(null).pipe(takeUntil(this.ngDestroy$), delay(short ? 200 : 1500)).subscribe(() => {
            this.content.scrollToTop();
            this.loaded = true;
            this.cdr.detectChanges();
        });
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
