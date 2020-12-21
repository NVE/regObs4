import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ObservationService } from '../../core/services/observation/observation.service';
import * as L from 'leaflet';
import { Subject, timer } from 'rxjs';
import { map, take, takeUntil, concatMap, debounceTime, switchMap } from 'rxjs/operators';
import { MapService } from '../../modules/map/services/map/map.service';
import { IMapView } from '../../modules/map/services/map/map-view.interface';
import { RegistrationViewModel } from '../../modules/regobs-api/models';
import { IonContent } from '@ionic/angular';
import { LoggingService } from '../../modules/shared/services/logging/logging.service';
import { DataMarshallService } from '../../core/services/data-marshall/data-marshall.service';
import { LogLevel } from '../../modules/shared/services/logging/log-level.model';
import { IPageInfo, VirtualScrollerComponent } from 'ngx-virtual-scroller';

const DEBUG_TAG = 'ObservationListPage';

@Component({
  selector: 'app-observation-list',
  templateUrl: './observation-list.page.html',
  styleUrls: ['./observation-list.page.scss'],
})
export class ObservationListPage implements OnInit, OnDestroy {
    observations: RegistrationViewModel[];
    loaded = false;
    cancelSubject: Subject<any>;
    pullToRefreshDisabled = false;

    @ViewChild(IonContent, { static: true }) content: IonContent;
    @ViewChild(VirtualScrollerComponent, { static: false }) scroll: VirtualScrollerComponent;

    trackByIdFunc = this.trackByIdFuncInternal.bind(this);
    refreshFunc = this.refresh.bind(this);

    get observations$() {
      return this.mapService.mapView$.pipe(switchMap((mapView: IMapView) =>
        this.observationService.observations$.pipe(map((observations) =>
          this.filterObservationsWithinViewBounds(observations, mapView)))),
        take(1),
      );
    }

    constructor(
        private observationService: ObservationService,
        private dataMarshallService: DataMarshallService,
        private cdr: ChangeDetectorRef,
        private loggingService: LoggingService,
        private mapService: MapService) {
    }

    ngOnInit(): void {
      this.cancelSubject = this.dataMarshallService.observableCancelSubject;
    }

    async refresh(cancelPromise: Promise<any>) {
      this.loaded = false;
      this.observations = undefined;
      await this.observationService.forceUpdateObservationsForCurrentGeoHazard(cancelPromise);
      // TODO: Shouldn't this allways use the same cancel subject?
      this.loadObservations();
    }

    ionViewWillEnter() {
      this.loaded = false;
      this.loadObservations();
    }

    private loadObservations() {
      this.observations$.subscribe((observations) => {
        this.observations = observations;
        this.loaded = true;
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

    onEnd(pageInfo: IPageInfo) {
      this.pullToRefreshDisabled = (pageInfo.startIndex > 1);
    }

    private filterObservationsWithinViewBounds(observations: RegistrationViewModel[], view: IMapView) {
      return observations.filter((observation) => !view ||
            view.bounds.contains(L.latLng(observation.ObsLocation.Latitude, observation.ObsLocation.Longitude)));
    }

    private trackByIdFuncInternal(_, obs: RegistrationViewModel) {
      return this.observationService.uniqueObservation(obs);
    }
}
