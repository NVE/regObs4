import { ChangeDetectionStrategy, Component, OnInit, ViewChild, inject } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import {
  IonCol,
  IonContent,
  IonGrid,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItemDivider,
  IonLabel,
  IonList,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonSkeletonText,
  SegmentCustomEvent,
} from '@ionic/angular/standalone';
import { IonSelectCustomEvent, SelectChangeEventDetail, SelectInterface } from '@ionic/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import {
  SearchCriteriaOrderBy,
  SearchCriteriaService,
} from '../../core/services/search-criteria/search-criteria.service';
import {
  PagedSearchResult,
  SearchRegistrationService,
} from '../../core/services/search-registration/search-registration.service';
import { RegistrationViewModel, SearchCriteriaRequestDto } from '../../modules/common-regobs-api';
import { MapService } from '../../modules/map/services/map/map.service';
import { LoggingService } from '../../modules/shared/services/logging/logging.service';
import { UpdateObservationsService } from '../../modules/side-menu/components/update-observations/update-observations.service';
import { TabsService, TABS } from '../tabs/tabs.service';
// import { SearchRegistrationsWithAttachments } from '../../modules/common-regobs-api/models/search-registrations-with-attachments';
import { UrlParams } from '../../core/services/search-criteria/url-params';
import { HasRegId } from '../../modules/common-registration/registration.helpers';
import { NgDestoryBase } from '../../core/helpers/observable-helper';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { HeaderComponent } from '../../modules/shared/components/header/header.component';
import { GeoFabComponent } from '../../modules/shared/components/geo-fab/geo-fab.component';
import {
  RefreshFunc,
  RefreshWithCancelComponent,
} from '../../modules/shared/components/refresh-with-cancel/refresh-with-cancel.component';
import { NgIf, NgClass, NgFor, AsyncPipe } from '@angular/common';
import { ObservationListViewComponent } from '../../modules/shared/components/list-view/observation-list-view.component';
// import { ImagesGridComponent } from '../../modules/shared/components/images-grid/images-grid.ts/images-grid.component';
import { ObservationSkeletonComponent } from '../../components/observation/observation-skeleton/observation-skeleton.component';
import { SvgIconComponent } from 'angular-svg-icon';
import { AddMenuComponent } from '../../modules/shared/components/add-menu/add-menu.component';
import { TranslatePipe } from '@ngx-translate/core';

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
  imports: [
    AddMenuComponent,
    AsyncPipe,
    GeoFabComponent,
    HeaderComponent,
    // ImagesGridComponent,
    IonCol,
    IonContent,
    IonGrid,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonItemDivider,
    IonLabel,
    IonList,
    IonRow,
    IonSegment,
    IonSegmentButton,
    IonSelect,
    IonSelectOption,
    IonSkeletonText,
    NgClass,
    NgFor,
    NgIf,
    ObservationListViewComponent,
    ObservationSkeletonComponent,
    RefreshWithCancelComponent,
    SvgIconComponent,
    TranslatePipe,
  ],
})
export class ObservationListPage extends NgDestoryBase implements OnInit {
  private searchCriteriaService = inject(SearchCriteriaService);
  private searchRegistrationService = inject(SearchRegistrationService);
  private updateObservationsService = inject(UpdateObservationsService);
  private tabsService = inject(TabsService);
  private logger = inject(LoggingService);
  private userSettingService = inject(UserSettingService);

  listSearch?: PagedSearchResult<RegistrationViewModel>;
  // imageSearch: PagedSearchResult<SearchRegistrationsWithAttachments>;

  showObservations$: Observable<boolean>;
  registrations$?: Observable<RegistrationViewModel[]>;
  // attachments$: Observable<SearchRegistrationsWithAttachments[]>;

  orderBy$?: Observable<string>;
  error$?: Observable<boolean>;
  popupType?: SelectInterface;
  isNative?: boolean;
  disableMapExtentToggle$: Observable<boolean>;
  useMapExtentFilter$: Observable<MapSectionFilter>;
  viewType$ = new BehaviorSubject<ViewType>('list');
  isFetchingObservations$?: Observable<boolean>;
  shouldDisableScroller$?: Observable<boolean>;

  @ViewChild(IonInfiniteScroll, { static: false }) scroll?: IonInfiniteScroll;
  @ViewChild(IonContent, { static: true }) content?: IonContent;

  refreshFunc: RefreshFunc = this.refresh.bind(this);
  searchCriteriaWhenThisPageIsActiveAndViewTypeList$: Observable<SearchCriteriaRequestDto>;
  searchCriteriaWhenThisPageIsActiveAndViewTypeGrid$: Observable<SearchCriteriaRequestDto>;
  constructor() {
    const mapService = inject(MapService);

    super();
    const updateObservationsService = this.updateObservationsService;

    const url = new URL(document.location.href);
    const viewTypeInParams = url.searchParams.get(URL_VIEW_TYPE_PARAM) as ViewType;
    if (viewTypeInParams === 'grid' || viewTypeInParams === 'list') this.viewType$.next(viewTypeInParams);

    this.showObservations$ = this.userSettingService.showObservations$;

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
    if (this.listSearch == null) {
      throw new Error('listSearch not initialized');
    }
    // if (this.viewType$.getValue() === 'grid') {
    //   return this.imageSearch;
    // }
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
      this.showObservations$,
      this.viewType$,
    ]).pipe(
      filter(
        ([, selectedTab, showObservations, viewT]) =>
          selectedTab === TABS.OBSERVATION_LIST && showObservations === true && viewT === viewType
      ),
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
      this.searchCriteriaWhenThisPageIsActiveAndViewTypeList$
    );

    // this.imageSearch = this.searchRegistrationService.searchAttachments(
    //   this.searchCriteriaWhenThisPageIsActiveAndViewTypeGrid$
    // );

    this.registrations$ = this.listSearch.registrations$.pipe(tap(() => this.scroll && this.scroll.complete()));
    // this.attachments$ = this.imageSearch.registrations$.pipe(tap(() => this.scroll && this.scroll.complete()));

    // const search$ = this.viewType$.pipe(map((viewType) => (viewType === 'list' ? this.listSearch : this.imageSearch)));
    const search$ = of(this.listSearch);

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
        switchMap((result) => result.lastFetched$),
        filter((v) => v != null)
      )
      .subscribe((lastFetched) => {
        this.updateObservationsService.setLastFetched(lastFetched);
      });

    this._searchInitiated = true;
  }

  handleChangeSorting(event: IonSelectCustomEvent<SelectChangeEventDetail<SearchCriteriaOrderBy>>) {
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

  refresh() {
    this.logger.debug('Refresh', DEBUG_TAG);
    this.currentSearch.update();
    return Promise.resolve();
  }

  ionViewWillEnter(): void {
    this.logger.debug('ionViewWillEnter', DEBUG_TAG);
    this.content?.scrollToTop();
    this.searchCriteriaService.setExtentFilterActive(true);
  }

  loadNextPage(): void {
    this.currentSearch.increasePage();
  }

  trackById(index: number, obs: HasRegId) {
    return obs ? obs.RegId : undefined;
  }
}
