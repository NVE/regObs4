import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { ObservationService } from '../../core/services/observation/observation.service';
import { Subject } from 'rxjs';
import { map, take, switchMap } from 'rxjs/operators';
import { MapService } from '../../modules/map/services/map/map.service';
import { IMapView } from '../../modules/map/services/map/map-view.interface';
import { RegistrationViewModel } from '../../modules/regobs-api/models';
import { IonContent, IonInfiniteScroll } from '@ionic/angular';
import { DataMarshallService } from '../../core/services/data-marshall/data-marshall.service';
import { Point } from '@arcgis/core/geometry';
const PAGE_SIZE = 10;
const MAX_OBSERVATION_COUNT = 100;

@Component({
  selector: 'app-observation-list',
  templateUrl: './observation-list.page.html',
  styleUrls: ['./observation-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObservationListPage implements OnInit {
  visibleObservations: RegistrationViewModel[];
  allObservations: RegistrationViewModel[];
  loaded = false;
  cancelSubject: Subject<unknown>;
  private pageIndex = 0;
  private total: number;

  @ViewChild(IonContent, { static: true }) content: IonContent;
  @ViewChild(IonInfiniteScroll, { static: false }) scroll: IonInfiniteScroll;

  trackByIdFunc = this.trackByIdFuncInternal.bind(this);
  refreshFunc = this.refresh.bind(this);

  constructor(
    private observationService: ObservationService,
    private dataMarshallService: DataMarshallService,
    private cdr: ChangeDetectorRef,
    private mapService: MapService
  ) {}

  ngOnInit(): void {
    this.cancelSubject = this.dataMarshallService.observableCancelSubject;
  }

  refresh(cancelPromise: Promise<unknown>): void {
    this.resetAndLoadObservations(true, cancelPromise);
  }

  ionViewWillEnter(): void {
    this.content.scrollToTop();
    this.resetAndLoadObservations();
  }

  ionViewWillLeave(): void {
    this.loaded = false;
    this.visibleObservations = undefined;
  }

  private async resetAndLoadObservations(
    forceUpdate = false,
    cancelPromise: Promise<unknown> = undefined
  ): Promise<void> {
    this.loaded = false;
    this.visibleObservations = undefined;
    this.cdr.detectChanges();
    if (forceUpdate) {
      await this.observationService.forceUpdateObservationsForCurrentGeoHazard(
        cancelPromise
      );
    }
    this.loadObservations();
  }

  private async loadObservations() {
    this.allObservations = await this.getObservationsInMap();
    this.total = this.allObservations.length;
    this.pageIndex = 0;
    this.visibleObservations = this.allObservations.slice(0, 10);

    this.cdr.detectChanges();
    setTimeout(() => {
      this.loaded = true;
      this.scroll.disabled = false;
      this.cdr.detectChanges();
    }, 500);
  }

  private getObservationsInMap(): Promise<RegistrationViewModel[]> {
    return this.mapService.mapView$
      .pipe(
        switchMap((mapView: IMapView) =>
          this.observationService.observations$.pipe(
            map((observations) =>
              this.filterObservationsWithinViewBounds(observations, mapView)
            ),
            map((observations) => observations.slice(0, MAX_OBSERVATION_COUNT))
          )
        ),
        take(1)
      )
      .toPromise();
  }

  loadNextPage(event: CustomEvent<IonInfiniteScroll>): void {
    this.pageIndex += 1;
    const startIndex = this.pageIndex * PAGE_SIZE;
    this.visibleObservations.push(
      ...this.allObservations.slice(startIndex, startIndex + PAGE_SIZE)
    );

    const target: IonInfiniteScroll = (event.target as unknown) as IonInfiniteScroll;
    target.complete();
    if (this.visibleObservations.length >= this.total) {
      target.disabled = true; //we have reached the end, so no need to load more pages from now
    }
  }

  get maxCountReached(): boolean {
    return this.visibleObservations.length >= MAX_OBSERVATION_COUNT;
  }

  get maxCount(): number {
    return MAX_OBSERVATION_COUNT;
  }

  private filterObservationsWithinViewBounds(
    observations: RegistrationViewModel[],
    view: IMapView
  ) {
    return observations.filter(
      (observation) =>
        !view ||
        view.bounds.contains(
          new Point({
            latitude: observation.ObsLocation.Latitude,
            longitude: observation.ObsLocation.Longitude
          })
        )
    );
  }

  private trackByIdFuncInternal(_, obs: RegistrationViewModel) {
    return obs ? this.observationService.uniqueObservation(obs) : undefined;
  }
}
