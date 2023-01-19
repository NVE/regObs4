import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { IonContent, IonInfiniteScroll } from '@ionic/angular';
import { SelectInterface } from '@ionic/core';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map, tap, withLatestFrom } from 'rxjs/operators';
import { SearchCriteriaService } from 'src/app/core/services/search-criteria/search-criteria.service';
import {
  PagedSearchResult,
  SearchRegistrationService,
} from 'src/app/core/services/search-registration/search-registration.service';
import { RegistrationViewModel } from 'src/app/modules/common-regobs-api/models';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { UpdateObservationsService } from 'src/app/modules/side-menu/components/update-observations/update-observations.service';
import { TabsService, TABS } from '../tabs/tabs.service';

const DEBUG_TAG = 'ObservationListPage';

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
    searchRegistrationService: SearchRegistrationService,
    updateObservationsService: UpdateObservationsService,
    private tabsService: TabsService,
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

    this.searchResult.registrations$.subscribe(() => updateObservationsService.setLastFetched(new Date()));

    //search triggered manually
    updateObservationsService.refreshRequested$
      .pipe(
        withLatestFrom(this.tabsService.selectedTab$),
        tap(([, tab]) => {
          if (tab === TABS.OBSERVATION_LIST) {
            this.refresh();
            this.logger.debug('Search manually triggered', DEBUG_TAG);
          } else {
            this.logger.debug('Ignored manually triggered search because page is not active', DEBUG_TAG);
          }
        })
      )
      .subscribe();
  }

  ngOnInit() {
    this.orderBy$ = this.searchCriteriaService.searchCriteria$.pipe(
      map((searchCriteria) => {
        if (!searchCriteria.OrderBy) return 'DtObsTime';
        else return searchCriteria.OrderBy;
      })
    );

    this.popupType = Capacitor.isNativePlatform() ? 'action-sheet' : 'popover';
  }

  handleChangeSorting(event) {
    this.searchCriteriaService.setOrderBy(event.detail.value);
  }

  refresh(): void {
    this.logger.debug('Refresh', 'PagedSearchResult');
    this.searchResult.resetPaging();
  }

  ionViewWillEnter(): void {
    this.logger.debug('ionViewWillEnter', 'PagedSearchResult');
    this.content.scrollToTop();
    this.searchResult.isActiveStream$.next(true);
    this.refresh();
  }

  ionViewWillLeave(): void {
    // this.loaded = false;
    this.searchResult.isActiveStream$.next(false);
  }

  loadNextPage(): void {
    this.searchResult.increasePage();
  }

  private trackByIdFuncInternal(_, obs: RegistrationViewModel) {
    return obs ? obs.RegId : undefined;
  }
}
