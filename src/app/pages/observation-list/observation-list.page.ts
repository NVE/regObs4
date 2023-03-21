import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { IonContent, IonInfiniteScroll, SegmentCustomEvent } from '@ionic/angular';
import { SelectInterface } from '@ionic/core';
import { combineLatest, firstValueFrom, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, startWith, tap, withLatestFrom } from 'rxjs/operators';
import { SearchCriteriaService } from 'src/app/core/services/search-criteria/search-criteria.service';
import {
  PagedSearchResult,
  SearchRegistrationService,
} from 'src/app/core/services/search-registration/search-registration.service';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { RegistrationViewModel } from 'src/app/modules/common-regobs-api/models';
import { MapService } from 'src/app/modules/map/services/map/map.service';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { UpdateObservationsService } from 'src/app/modules/side-menu/components/update-observations/update-observations.service';
import { TabsService, TABS } from '../tabs/tabs.service';

type MapSectionFilter = 'all' | 'mapBorders';

const DEBUG_TAG = 'ObservationListPage';
const PAGE_SIZE = 10;

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
  numOfRecords = PAGE_SIZE;
  numberObsPerPageOptions = [10, 50, 100];
  popupType: SelectInterface;
  noMapExtentAvailable$: Observable<boolean>;
  useMapExtentFilter$: Observable<MapSectionFilter>;

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
    private logger: LoggingService,
    private userSettingService: UserSettingService,
    mapService: MapService
  ) {
    const searchCriteriaWhenThisPageIsActive$ = combineLatest([
      searchCriteriaService.searchCriteria$,
      this.tabsService.selectedTab$,
    ]).pipe(
      filter(([, selectedTab]) => selectedTab === TABS.OBSERVATION_LIST),
      map(([criteria]) => {
        this.numOfRecords = criteria.NumberOfRecords || this.numOfRecords;
        return criteria;
      })
    );
    this.searchResult = searchRegistrationService.pagedSearch(searchCriteriaWhenThisPageIsActive$);

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

    this.noMapExtentAvailable$ = mapService.mapView$.pipe(
      startWith({ bounds: null }), // In case mapService.MapView does not emit on startup
      map((mapView) => mapView?.bounds == null),
      distinctUntilChanged()
    );

    this.useMapExtentFilter$ = combineLatest([
      this.noMapExtentAvailable$.pipe(map((noExtent) => !noExtent)),
      this.searchCriteriaService.useMapExtent$,
    ]).pipe(
      map(([hasExtent, useExtent]) => hasExtent && useExtent),
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

    this.popupType = Capacitor.isNativePlatform() ? 'action-sheet' : 'popover';
  }

  handleChangeSorting(event) {
    this.searchCriteriaService.setOrderBy(event.detail.value);
  }

  async handleChangeNumberObsPerPage(event) {
    const userSettings = await firstValueFrom(this.userSettingService.userSetting$);
    userSettings.preferredNumberOfRecords = +event.detail.value;
    this.userSettingService.saveUserSettings(userSettings);
    //this.searchCriteriaService.setNumberOfRecords(+event.detail.value);
  }

  toggleFilterByMapView(event: SegmentCustomEvent) {
    const value = event.target.value as MapSectionFilter;
    const isExtentFilterActive = value == 'all' ? false : true;
    this.searchCriteriaService.setExtentFilterActive(isExtentFilterActive);
  }

  refresh(): void {
    this.logger.debug('Refresh', 'PagedSearchResult');
    this.searchResult.resetPaging();
  }

  ionViewWillEnter(): void {
    this.logger.debug('ionViewWillEnter', 'PagedSearchResult');
    this.content.scrollToTop();
    this.searchCriteriaService.setExtentFilterActive(true);
  }

  loadNextPage(): void {
    this.searchResult.increasePage();
  }

  private trackByIdFuncInternal(_, obs: RegistrationViewModel) {
    return obs ? obs.RegId : undefined;
  }
}
