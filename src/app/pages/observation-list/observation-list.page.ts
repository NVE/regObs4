import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { IonContent, IonInfiniteScroll, SegmentCustomEvent } from '@ionic/angular';
import { SelectInterface } from '@ionic/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { SearchCriteriaService } from 'src/app/core/services/search-criteria/search-criteria.service';
import {
  PagedSearchResult,
  SearchRegistrationService,
} from 'src/app/core/services/search-registration/search-registration.service';
import { RegistrationViewModel, SearchCriteriaRequestDto } from 'src/app/modules/common-regobs-api/models';
import { MapService } from 'src/app/modules/map/services/map/map.service';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { UpdateObservationsService } from 'src/app/modules/side-menu/components/update-observations/update-observations.service';
import { TabsService, TABS } from '../tabs/tabs.service';
import { SearchRegistrationsWithAttachments } from 'src/app/modules/common-regobs-api/models/search-registrations-with-attachments';
import { UrlParams } from 'src/app/core/services/search-criteria/url-params';
import { HasRegId } from 'src/app/modules/common-registration/registration.helpers';
import { NgDestoryBase } from 'src/app/core/helpers/observable-helper';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';

type MapSectionFilter = 'all' | 'mapBorders';
type ViewType = 'grid' | 'list';
const DEBUG_TAG = 'ObservationListPage';
const URL_VIEW_TYPE_PARAM = 'view';

/**
 * Show a list of observation data that meets current search filter.
 * The page have two views/modes: 1) A list of observation cards, and 2) A grid of images from the observations.
 * Each view need separate search methods.
 */
@Component({
  selector: 'app-observation-list',
  templateUrl: './observation-list.page.html',
  styleUrls: ['./observation-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObservationListPage extends NgDestoryBase implements OnInit {
  listSearch: PagedSearchResult<RegistrationViewModel>;
  imageSearch: PagedSearchResult<SearchRegistrationsWithAttachments>;
  showObservations$: Observable<boolean>;
  registrations$: Observable<RegistrationViewModel[] | SearchRegistrationsWithAttachments[]>;
  orderBy$: Observable<string>;
  error$: Observable<boolean>;
  popupType: SelectInterface;
  isNative: boolean;
  disableMapExtentToggle$: Observable<boolean>;
  useMapExtentFilter$: Observable<MapSectionFilter>;
  viewType$ = new BehaviorSubject<ViewType>('list');
  isFetchingObservations$: Observable<boolean>;
  shouldDisableScroller$: Observable<boolean>;

  @ViewChild(IonInfiniteScroll, { static: false }) scroll: IonInfiniteScroll;
  @ViewChild(IonContent, { static: true }) content: IonContent;

  refreshFunc = this.refresh.bind(this);
  searchCriteriaWhenThisPageIsActiveAndViewTypeList$: Observable<SearchCriteriaRequestDto>;
  searchCriteriaWhenThisPageIsActiveAndViewTypeGrid$: Observable<SearchCriteriaRequestDto>;
  constructor(
    private searchCriteriaService: SearchCriteriaService,
    private searchRegistrationService: SearchRegistrationService,
    private updateObservationsService: UpdateObservationsService,
    private tabsService: TabsService,
    private logger: LoggingService,
    private userSetting: UserSettingService,
    mapService: MapService
  ) {
    super();
    const url = new URL(document.location.href);
    const viewTypeInParams = url.searchParams.get(URL_VIEW_TYPE_PARAM) as ViewType;
    if (viewTypeInParams === 'grid' || viewTypeInParams === 'list') this.viewType$.next(viewTypeInParams);

    this.searchCriteriaWhenThisPageIsActiveAndViewTypeList$ = this.filterCriteriaByView('list');
    this.searchCriteriaWhenThisPageIsActiveAndViewTypeGrid$ = this.filterCriteriaByView('grid');

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

    this.showObservations$ = this.userSetting.showObservations$;

    const noMapExtentAvailable$ = mapService.mapView$.pipe(
      startWith({ bounds: null }), // In case mapService.MapView does not emit on startup
      map((mapView) => mapView?.bounds == null),
      distinctUntilChanged()
    );

    const selectedRegionsFilterActive$ = this.searchCriteriaService.searchCriteria$.pipe(
      map((criteria) => (criteria.SelectedRegions || []).length > 0)
    );

    this.disableMapExtentToggle$ = combineLatest([mapService.noMapExtentAvailable$, selectedRegionsFilterActive$]).pipe(
      map(([noMapExtent, regionsSelected]) => noMapExtent || regionsSelected)
    );

    this.useMapExtentFilter$ = combineLatest([
      mapService.noMapExtentAvailable$.pipe(map((noExtent) => !noExtent)),
      this.searchCriteriaService.useMapExtent$,
      selectedRegionsFilterActive$,
    ]).pipe(
      map(([hasExtent, useExtent, regionFilter]) => !regionFilter && hasExtent && useExtent),
      map((useExtentFilter) => (useExtentFilter ? 'mapBorders' : 'all'))
    );
  }

  get currentSearch(): PagedSearchResult<HasRegId> {
    if (this.viewType$.getValue() === 'grid') {
      return this.imageSearch;
    }
    return this.listSearch;
  }

  get maxCount() {
    return PagedSearchResult.MAX_ITEMS;
  }

  // fakeArray to show more components when the skeleton loads
  fakeArray = new Array(30);

  ngOnInit() {
    this.orderBy$ = this.searchCriteriaService.searchCriteria$.pipe(
      takeUntil(this.ngDestroy$),
      map((searchCriteria) => {
        if (!searchCriteria.OrderBy) return 'DtObsTime';
        else return searchCriteria.OrderBy;
      })
    );
    this.isNative = Capacitor.isNativePlatform();
    this.popupType = this.isNative ? 'action-sheet' : 'popover';

    this.initSearch();
  }

  private filterCriteriaByView(viewType: ViewType): Observable<SearchCriteriaRequestDto> {
    return combineLatest([
      this.searchCriteriaService.searchCriteria$,
      this.tabsService.selectedTab$,
      this.viewType$,
    ]).pipe(
      filter(([, selectedTab, viewT]) => selectedTab === TABS.OBSERVATION_LIST && viewT === viewType),
      tap(([, , viewT]) => {
        this.logger.debug(`ViewType has changed to ${viewT} `, DEBUG_TAG);
        const params = new UrlParams();
        params.set(URL_VIEW_TYPE_PARAM, viewT);
        params.apply();
      }),
      map(([criteria]) => criteria as SearchCriteriaRequestDto)
    );
  }

  private _searchInitiated = false;

  private initSearch() {
    if (this._searchInitiated) {
      throw new Error('Already initiated');
    }

    this.listSearch = this.searchRegistrationService.pagedSearch(
      this.searchCriteriaWhenThisPageIsActiveAndViewTypeList$,
      TABS.OBSERVATION_LIST
    );

    this.imageSearch = this.searchRegistrationService.searchAttachments(
      this.searchCriteriaWhenThisPageIsActiveAndViewTypeGrid$,
      TABS.OBSERVATION_LIST
    );

    const search$ = this.viewType$.pipe(map((viewType) => (viewType === 'list' ? this.listSearch : this.imageSearch)));

    this.registrations$ = search$.pipe(
      switchMap((result) => result.registrations$),
      tap(() => {
        this.scroll && this.scroll.complete();
      })
    );
    this.isFetchingObservations$ = search$.pipe(switchMap((result) => result.isFetching$));
    this.error$ = search$.pipe(
      switchMap((result) => result.error$),
      map(({ hasError }) => hasError)
    );
    this.shouldDisableScroller$ = search$.pipe(
      switchMap((search) => combineLatest([search.allFetchedForCriteria$, search.maxItemsFetched$])),
      map(([allFetched, maxReached]) => allFetched || maxReached),
      distinctUntilChanged()
    );

    // Update last fetched time in filter menu
    search$
      .pipe(
        takeUntil(this.ngDestroy$),
        switchMap((result) => result.lastFetched$)
      )
      .subscribe((lastFetched) => {
        this.updateObservationsService.setLastFetched(lastFetched);
      });

    this._searchInitiated = true;
  }

  handleChangeSorting(event) {
    this.searchCriteriaService.setOrderBy(event.detail.value);
  }

  toggleFilterByMapView(event: SegmentCustomEvent) {
    if (!event.target.disabled) {
      const value = event.target.value as MapSectionFilter;
      const isExtentFilterActive = value == 'all' ? false : true;
      this.searchCriteriaService.setExtentFilterActive(isExtentFilterActive);
    }
  }

  changeViewType(id: ViewType) {
    this.viewType$.next(id);
  }

  refresh(): void {
    this.logger.debug('Refresh', DEBUG_TAG);
    this.currentSearch.update();
  }

  ionViewWillEnter(): void {
    this.logger.debug('ionViewWillEnter', DEBUG_TAG);
    this.content.scrollToTop();
    this.searchCriteriaService.setExtentFilterActive(true);
  }

  loadNextPage(): void {
    this.currentSearch.increasePage();
  }

  trackById(_, obs: HasRegId) {
    return obs ? obs.RegId : undefined;
  }
}
