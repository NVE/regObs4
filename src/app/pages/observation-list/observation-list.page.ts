import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { IonContent, IonInfiniteScroll, SegmentCustomEvent } from '@ionic/angular';
import { SelectInterface } from '@ionic/core';
import { BehaviorSubject, combineLatest, firstValueFrom, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, startWith, tap, withLatestFrom } from 'rxjs/operators';
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

type MapSectionFilter = 'all' | 'mapBorders';
type ViewType = 'grid' | 'list';
const DEBUG_TAG = 'ObservationListPage';
const URL_VIEW_TYPE_PARAM = 'view';

@Component({
  selector: 'app-observation-list',
  templateUrl: './observation-list.page.html',
  styleUrls: ['./observation-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObservationListPage implements OnInit {
  searchResult: PagedSearchResult<RegistrationViewModel>;
  attachmentsResult: PagedSearchResult<SearchRegistrationsWithAttachments>;
  orderBy$: Observable<string>;
  popupType: SelectInterface;
  isNative: boolean;
  disableMapExtentToggle$: Observable<boolean>;
  useMapExtentFilter$: Observable<MapSectionFilter>;
  viewType$ = new BehaviorSubject<ViewType>('list');

  @ViewChild(IonContent, { static: true }) content: IonContent;

  refreshFunc = this.refresh.bind(this);
  constructor(
    private searchCriteriaService: SearchCriteriaService,
    private searchRegistrationService: SearchRegistrationService,
    updateObservationsService: UpdateObservationsService,
    private tabsService: TabsService,
    private logger: LoggingService,
    mapService: MapService
  ) {
    const url = new URL(document.location.href);
    const viewTypeInParams = url.searchParams.get(URL_VIEW_TYPE_PARAM) as ViewType;
    if (viewTypeInParams === 'grid' || viewTypeInParams === 'list') this.viewType$.next(viewTypeInParams);

    const searchCriteriaWhenThisPageIsActiveAndViewTypeList$ = this.filterCriteriaByView('list');
    const searchCriteriaWhenThisPageIsActiveAndViewTypeGrid$ = this.filterCriteriaByView('grid');

    this.searchResult = this.searchRegistrationService.pagedSearch(searchCriteriaWhenThisPageIsActiveAndViewTypeList$);
    this.attachmentsResult = this.searchRegistrationService.searchAttachments(
      searchCriteriaWhenThisPageIsActiveAndViewTypeGrid$
    );

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

    const noMapExtentAvailable$ = mapService.mapView$.pipe(
      startWith({ bounds: null }), // In case mapService.MapView does not emit on startup
      map((mapView) => mapView?.bounds == null),
      distinctUntilChanged()
    );

    const selectedRegionsFilterActive$ = this.searchCriteriaService.searchCriteria$.pipe(
      map((criteria) => (criteria.SelectedRegions || []).length > 0)
    );

    this.disableMapExtentToggle$ = combineLatest([noMapExtentAvailable$, selectedRegionsFilterActive$]).pipe(
      map(([noMapExtent, regionsSelected]) => noMapExtent || regionsSelected)
    );

    this.useMapExtentFilter$ = combineLatest([
      noMapExtentAvailable$.pipe(map((noExtent) => !noExtent)),
      this.searchCriteriaService.useMapExtent$,
      selectedRegionsFilterActive$,
    ]).pipe(
      map(([hasExtent, useExtent, regionFilter]) => !regionFilter && hasExtent && useExtent),
      map((useExtentFilter) => (useExtentFilter ? 'mapBorders' : 'all'))
    );
  }

  ngOnInit() {
    this.orderBy$ = this.searchCriteriaService.searchCriteria$.pipe(
      map((searchCriteria) => {
        if (!searchCriteria.OrderBy) return 'DtObsTime';
        else return searchCriteria.OrderBy;
      })
    );
    this.isNative = Capacitor.isNativePlatform();
    this.popupType = this.isNative ? 'action-sheet' : 'popover';
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

  async changeViewType(id: ViewType) {
    if (!id || (id !== 'grid' && id !== 'list')) {
      return;
    }
    this.viewType$.next(id);
  }

  refresh(): void {
    this.logger.debug('Refresh', 'PagedSearchResult');
    this.viewType$.getValue() === 'list' ? this.searchResult.resetPaging() : this.attachmentsResult.resetPaging();
  }

  ionViewWillEnter(): void {
    this.logger.debug('ionViewWillEnter', 'PagedSearchResult');
    this.content.scrollToTop();
    this.searchCriteriaService.setExtentFilterActive(true);
  }
}
