import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { RegistrationViewModel } from 'src/app/modules/common-regobs-api/models';
import { IonContent, IonInfiniteScroll } from '@ionic/angular';
import { SearchRegistrationService } from 'src/app/core/services/search-registration/search-registration.service';
import { SearchCriteriaService } from 'src/app/core/services/search-criteria/search-criteria.service';

const PAGE_SIZE = 10;
const MAX_OBSERVATION_COUNT = 100;

@Component({
  selector: 'app-observation-list',
  templateUrl: './observation-list.page.html',
  styleUrls: ['./observation-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    // TODO: Provide a "MapViewPagedCriteria"
  ]
})
export class ObservationListPage {
  registrations$: Observable<RegistrationViewModel[]>;
  private maxCountReached = new BehaviorSubject<boolean>(false);
  maxCountReached$ = this.maxCountReached.asObservable();
  private loadedRegistrations = [];
  private pageIndex = 0;
  private scroller?: IonInfiniteScroll;
  private count = MAX_OBSERVATION_COUNT;

  @ViewChild(IonContent, { static: true }) content: IonContent;
  @ViewChild(IonInfiniteScroll, { static: false }) scroll: IonInfiniteScroll;

  trackByIdFunc = this.trackByIdFuncInternal.bind(this);
  refreshFunc = this.refresh.bind(this);

  get maxCount() { return MAX_OBSERVATION_COUNT; }

  constructor(
    private searchCriteriaService: SearchCriteriaService,
    private searchRegistrationService: SearchRegistrationService,
  ) {
    this.registrations$ = searchRegistrationService.registrations$.pipe(
      map(newRegistrations => {
        // TODO: Select unique registrations - we have a function for that in mypage
        this.loadedRegistrations.push(...newRegistrations);
        return this.loadedRegistrations;
      }),
      tap(() => this.scroller && this.scroller.complete())
    );
  }

  refresh(cancelPromise: Promise<unknown>): void {
    this.loadedRegistrations = [];
    this.maxCountReached.next(false);
    this.pageIndex = 0;
    this.searchCriteriaService.setPaging(0, PAGE_SIZE);
    this.searchRegistrationService.update();
    this.searchRegistrationService.count()
      .then(count => this.count = Math.min(count, MAX_OBSERVATION_COUNT))
      .catch(() => this.count = MAX_OBSERVATION_COUNT);
  }

  ionViewWillEnter(): void {
    this.content.scrollToTop();
    this.refresh(null);
  }

  ionViewWillLeave(): void {
    // this.loaded = false;
  }

  loadNextPage(event: CustomEvent<IonInfiniteScroll>): void {
    this.scroller = event.target as unknown as IonInfiniteScroll;

    if (this.loadedRegistrations.length >= MAX_OBSERVATION_COUNT) {
      this.maxCountReached.next(true);
    }

    if (this.loadedRegistrations.length >= this.count) {
      this.scroller.complete();
      this.scroller.disabled = true;
      return;
    }

    this.pageIndex += 1;
    this.searchCriteriaService.setPaging(this.pageIndex, PAGE_SIZE);
  }

  private trackByIdFuncInternal(_, obs: RegistrationViewModel) {
    return obs ? obs.RegId : undefined;
  }
}
