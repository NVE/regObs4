import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { IonContent, IonInfiniteScroll } from '@ionic/angular';
import { SelectInterface } from '@ionic/core';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';
import { SearchCriteriaService } from 'src/app/core/services/search-criteria/search-criteria.service';
import {
  PagedSearchResult,
  SearchRegistrationService
} from 'src/app/core/services/search-registration/search-registration.service';
import { RegistrationViewModel } from 'src/app/modules/common-regobs-api/models';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';

@Component({
  selector: 'app-observation-list',
  templateUrl: './observation-list.page.html',
  styleUrls: ['./observation-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObservationListPage implements OnInit {
  searchResult: PagedSearchResult<RegistrationViewModel>;
  registrations$: Observable<RegistrationViewModel[]>;
  shouldDisableScroller$: Observable<boolean>;
  orderBy$: Observable<string>;
  popupType: SelectInterface;

  @ViewChild(IonContent, { static: true }) content: IonContent;
  @ViewChild(IonInfiniteScroll, { static: false }) scroll: IonInfiniteScroll;

  trackByIdFunc = this.trackByIdFuncInternal.bind(this);
  refreshFunc = this.refresh.bind(this);

  get maxCount() {
    return PagedSearchResult.MAX_ITEMS;
  }

  constructor(
    private searchCriteriaService: SearchCriteriaService,
    private activatedRoute: ActivatedRoute,
    searchRegistrationService: SearchRegistrationService,
    private logger: LoggingService
  ) {
    this.searchResult = searchRegistrationService.pagedSearch(searchCriteriaService.searchCriteria$);
    this.registrations$ = this.searchResult.registrations$.pipe(tap(() => this.scroll && this.scroll.complete()));
    this.shouldDisableScroller$ = combineLatest([
      this.searchResult.allFetchedForCriteria$,
      this.searchResult.maxItemsFetched$,
    ]).pipe(
      map(([allFetched, maxReached]) => allFetched || maxReached),
      distinctUntilChanged()
    );
  }

  ngOnInit() {
    this.orderBy$ = this.searchCriteriaService.searchCriteria$.pipe(map(searchCriteria => {
      if (!searchCriteria.OrderBy) return 'DtObsTime';
      else return searchCriteria.OrderBy;
    }));

    this.popupType = Capacitor.isNativePlatform() ? 'action-sheet' : 'popover';
  }

  handleChangeSorting(event){
    this.searchCriteriaService.setOrderBy(event.detail.value);
  }

  refresh(cancelPromise: Promise<unknown>): void {
    this.logger.debug('Refresh', 'PagedSearchResult');
    this.searchResult.resetPaging();
  }

  ionViewWillEnter(): void {
    this.logger.debug('ionViewWillEnter', 'PagedSearchResult');
    this.content.scrollToTop();
    this.refresh(null);
  }

  ionViewWillLeave(): void {
    // this.loaded = false;
  }

  loadNextPage(): void {
    this.searchResult.increasePage();
  }

  private trackByIdFuncInternal(_, obs: RegistrationViewModel) {
    return obs ? obs.RegId : undefined;
  }
}
