import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ObservationService } from '../../core/services/observation/observation.service';
import * as L from 'leaflet';
import { Subject, timer } from 'rxjs';
import { map, take, takeUntil, concatMap, debounceTime } from 'rxjs/operators';
import { MapService } from '../../modules/map/services/map/map.service';
import { IMapView } from '../../modules/map/services/map/map-view.interface';
import { RegistrationViewModel } from '../../modules/regobs-api/models';
import { IonContent } from '@ionic/angular';
import { LoggingService } from '../../modules/shared/services/logging/logging.service';
import { DataMarshallService } from '../../core/services/data-marshall/data-marshall.service';
import { LogLevel } from '../../modules/shared/services/logging/log-level.model';
import { VirtualScrollerComponent } from 'ngx-virtual-scroller';

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
    
    scrollContainer: HTMLElement;

    @ViewChild(IonContent, { static: true }) content: IonContent;
    @ViewChild(VirtualScrollerComponent, { static: false }) scroll: VirtualScrollerComponent;

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
        private cdr: ChangeDetectorRef,
        private loggingService: LoggingService,
        private mapService: MapService) {
    }

    async ngOnInit(): Promise<void> {
      this.cancelSubject = this.dataMarshallService.observableCancelSubject;
      this.scrollContainer = await this.content.getScrollElement();
    }

    async refresh(cancelPromise: Promise<any>) {
      await this.observationService.forceUpdateObservationsForCurrentGeoHazard(cancelPromise);
      // TODO: Shouldn't this allways use the same cancel subject?
      this.loaded = false;
      this.updateUi();
      this.loadObservations();
    }

    updateUi() {
      if (!this.cdr['destroyed']) {
        this.cdr.detectChanges();
      }
    }

    async ionViewWillEnter() {
      this.loaded = false;
      this.ngDestroy$ = new Subject();
      this.loadObservations();
      this.updateUi();
    }

    ionViewWillLeave() {
      this.ngDestroy$.next();
      this.ngDestroy$.complete();
    }

    private loadObservations() {
      this.observations$.subscribe((observations) => {
        this.observations = observations;
        this.loaded = true;
        this.updateUi();
        setTimeout(() => {
          if(this.scroll) {
            this.scroll.scrollToPosition(0);
          }
        });
      }, (err) => {
        this.loggingService.log('Could not load observations', err, LogLevel.Warning, DEBUG_TAG);
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

    compareFunc(a: RegistrationViewModel, b: RegistrationViewModel) {
      return a?.RegID !== b?.RegID;
    }
}
