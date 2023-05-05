import { DOCUMENT } from '@angular/common';
import { AfterViewChecked, Component, Inject, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Feature, Point } from 'geojson';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import {
  combineLatest,
  firstValueFrom,
  Observable,
  race,
  Subject,
  scan,
  BehaviorSubject,
  from,
  TimeoutError,
} from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  exhaustMap,
  filter,
  finalize,
  map,
  skip,
  startWith,
  switchMap,
  takeUntil,
  tap,
  timeout,
  withLatestFrom,
} from 'rxjs/operators';
import { Immutable } from 'src/app/core/models/immutable';
import { SearchCriteria } from 'src/app/core/models/search-criteria';
import { SearchCriteriaService } from 'src/app/core/services/search-criteria/search-criteria.service';
import { SearchService } from 'src/app/modules/common-regobs-api';
import {
  AtAGlanceViewModel,
  PositionDto,
  SearchCriteriaRequestDto,
  WithinExtentCriteriaDto,
} from 'src/app/modules/common-regobs-api/models';
import { MapCenterInfoComponent } from 'src/app/modules/map/components/map-center-info/map-center-info.component';
import { MapService } from 'src/app/modules/map/services/map/map.service';
import { LogLevel } from 'src/app/modules/shared/services/logging/log-level.model';
import { UpdateObservationsService } from 'src/app/modules/side-menu/components/update-observations/update-observations.service';
import { MapItemBarComponent } from '../../components/map-item-bar/map-item-bar.component';
import { enterZone } from '../../core/helpers/observable-helper';
import { RouterPage } from '../../core/helpers/routed-page';
import { FullscreenService } from '../../core/services/fullscreen/fullscreen.service';
import { UsageAnalyticsConsentService } from '../../core/services/usage-analytics-consent/usage-analytics-consent.service';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { MapComponent } from '../../modules/map/components/map/map.component';
import { LoggingService } from '../../modules/shared/services/logging/logging.service';
import { TabsService, TABS } from '../tabs/tabs.service';
import { RegObsGeoJson } from './geojson';
import { RegObsMarkerClusterLayer } from './markerCluster.layer';

const DEBUG_TAG = 'HomePage';

function withinExtentCriteriaToBounds(extent: WithinExtentCriteriaDto): L.LatLngBounds {
  const topLeft = positionDtoToLatLng(extent.TopLeft);
  const bottomRight = positionDtoToLatLng(extent.BottomRight);
  return new L.LatLngBounds(topLeft, bottomRight);
}

function positionDtoToLatLng(position: PositionDto): L.LatLng {
  return new L.LatLng(position.Latitude, position.Longitude);
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage extends RouterPage implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild(MapItemBarComponent, { static: true }) mapItemBar: MapItemBarComponent;
  @ViewChild(MapComponent, { static: true }) mapComponent: MapComponent;
  private map: L.Map;
  private markerLayer: RegObsMarkerClusterLayer;
  private geoCoachMarksClosedSubject = new Subject<void>();

  spinnerLabel = 'DATA_LOAD.SPINNER_FETCH_OBSERVATIONS';
  fullscreen$: Observable<boolean>;
  showGeoSelectInfo = false;
  private lastFetched: Date = null;
  private lastSearchBounds: L.LatLngBounds = null;
  private shouldSearchResultUpdateOnEnter: boolean;

  private isFetchingObservations = new BehaviorSubject(false);
  isFetchingObservations$: Observable<boolean>;
  private toast: HTMLIonToastElement; // Shows error message if observation search fail

  @ViewChild(MapCenterInfoComponent) mapCenter: MapCenterInfoComponent;
  private mapCenterInfoHeight = new Subject<number>();
  activateFollowModeInMapOnStartup = Capacitor.isNativePlatform();
  private refreshRequested$ = new Observable<unknown>();

  constructor(
    router: Router,
    route: ActivatedRoute,
    private searchService: SearchService,
    private updateObservationsService: UpdateObservationsService,
    private tabsService: TabsService,
    private fullscreenService: FullscreenService,
    public userSettingService: UserSettingService,
    private ngZone: NgZone,
    private searchCriteriaService: SearchCriteriaService,
    private loggingService: LoggingService,
    private usageAnalyticsConsentService: UsageAnalyticsConsentService,
    private mapService: MapService,
    private toastService: ToastController,
    private translateService: TranslateService,
    @Inject(DOCUMENT) private document: Document
  ) {
    super(router, route);

    // Update global css property containing info box height when height changes.
    // This is used to position map scale above map center info box.
    this.mapCenterInfoHeight
      .pipe(distinctUntilChanged(), debounceTime(500), takeUntil(this.ngUnsubscribe))
      .subscribe((newInfoBoxHeight) => {
        this.document.documentElement.style.setProperty('--map-center-info-height', `${newInfoBoxHeight}px`);
      });

    this.tabsService.selectedTab$.pipe(filter((tab) => tab === TABS.HOME)).subscribe(() => {
      this.toast?.dismiss(); // Hide error message when we arrive at this page
      this.updateObservationsService.setLastFetched(this.lastFetched);
    });

    this.userSettingService.appMode$.subscribe(() => (this.shouldSearchResultUpdateOnEnter = true));
    this.isFetchingObservations$ = this.isFetchingObservations.asObservable();
    this.initSearch();

    this.refreshRequested$ = this.updateObservationsService.refreshRequested$.pipe(
      withLatestFrom(this.tabsService.selectedTab$),
      filter(([, tab]) => {
        if (tab === TABS.HOME) {
          this.loggingService.debug('Search manually triggered', DEBUG_TAG);
          return true;
        } else {
          this.loggingService.debug('Ignored manually triggered search because page is not active', DEBUG_TAG);
          return false;
        }
      })
    );
  }

  private async initSearch() {
    this.loggingService.debug('initSearch...', DEBUG_TAG);

    const criteria$ = await this.createSearchCriteria$();
    const criteriaWhenOnHomePageOnly$ = combineLatest([criteria$, this.tabsService.selectedTab$]).pipe(
      filter(([, tab]) => tab === TABS.HOME),
      map(([criteria]) => criteria)
    );
    this.createRegistrations$(criteriaWhenOnHomePageOnly$).subscribe((registrations) => {
      this.redrawObservationMarkers(registrations);
      this.lastFetched = new Date();
      this.updateObservationsService.setLastFetched(this.lastFetched);
    });
  }

  private async runApiSearch(searchCriteria: SearchCriteriaRequestDto): Promise<AtAGlanceViewModel[]> {
    let registrations: AtAGlanceViewModel[] = [];
    try {
      registrations = await firstValueFrom(this.searchService.SearchAtAGlance(searchCriteria).pipe(timeout(120000)));
      this.hideErrorToast();
    } catch (error) {
      this.loggingService.log('Error in search', error, LogLevel.Warning, DEBUG_TAG);
      this.showSearchErrorToast();
      this.rememberExtent(null); // To trigger new search on next pan or zoom
    }
    return registrations;
  }

  private createRegistrations$(searchCriteria$: Observable<SearchCriteria>): Observable<AtAGlanceViewModel[]> {
    return combineLatest([searchCriteria$, this.refreshRequested$.pipe(startWith(true))]).pipe(
      map(([searchCriteria]) => searchCriteria),
      // We are fetching new data, so set isFetching to true
      tap(() => this.isFetchingObservations.next(true)),
      switchMap((criteria: SearchCriteriaRequestDto) => this.runApiSearch(criteria)),
      tap(() => this.isFetchingObservations.next(false))
    );
  }

  private async showSearchErrorToast() {
    await this.hideErrorToast();
    const translations = await firstValueFrom(
      this.translateService.get([
        'HOME_PAGE.OBSERVATIONS_SEARCH_ERROR.MESSAGE',
        'HOME_PAGE.OBSERVATIONS_SEARCH_ERROR.BUTTON',
      ])
    );
    this.toast = await this.toastService.create({
      message: translations['HOME_PAGE.OBSERVATIONS_SEARCH_ERROR.MESSAGE'],
      position: 'bottom',
      cssClass: 'toast',
      buttons: [
        {
          text: translations['HOME_PAGE.OBSERVATIONS_SEARCH_ERROR.BUTTON'],
          role: 'cancel',
        },
      ],
    });
    this.toast.onDidDismiss().then(() => {
      this.toast = null;
    });
    await this.toast.present();
  }

  private async hideErrorToast() {
    if (this.toast) {
      await this.toast.dismiss();
      this.toast = null;
    }
  }

  private isErrorToastVisible(): boolean {
    return this.toast != null;
  }

  get appname(): string {
    if (Capacitor.isNativePlatform()) {
      return 'Varsom';
    }
    return 'Varsom Regobs';
  }

  ngAfterViewChecked(): void {
    this.updateInfoBoxHeight();
  }

  ngOnInit() {
    this.fullscreen$ = this.fullscreenService.isFullscreen$;
    this.checkForFirstStartup();
  }

  ionViewWillEnter() {
    this.searchCriteriaService.setExtentFilterActive(true);
  }

  checkIfShouldSearchCriteriaUpdateOnEnter() {
    if (this.shouldSearchResultUpdateOnEnter) {
      this.updateObservationsService.requestRefresh();
      this.shouldSearchResultUpdateOnEnter = false;
    }
  }

  checkForFirstStartup() {
    this.userSettingService.userSetting$
      .pipe(
        map((us) => us.showGeoSelectInfo),
        distinctUntilChanged(),
        takeUntil(race(this.ngUnsubscribe, this.geoCoachMarksClosedSubject)),
        enterZone(this.ngZone)
      )
      .subscribe((showGeoSelectInfo) => {
        this.showGeoSelectInfo = showGeoSelectInfo;
        if (!showGeoSelectInfo) {
          this.geoCoachMarksClosedSubject.next();
          this.geoCoachMarksClosedSubject.complete();
          this.showUsageAnalyticsDialog();
        }
      });
  }

  async showUsageAnalyticsDialog() {
    await this.usageAnalyticsConsentService.checkUserDataConsentDialog();
    this.mapComponent.componentIsActive(true);
  }

  async onMapReady(leafletMap: L.Map) {
    this.map = leafletMap;

    this.map.on('click', () => {
      this.mapItemBar.hide(); // click outside marker will deselect any marker, so hide the at-a-glance view
    });
  }

  private async createSearchCriteria$(): Promise<Observable<Immutable<SearchCriteriaRequestDto>>> {
    const startTime = performance.now();
    await firstValueFrom(this.mapService.relevantMapChangeWithInitialView$);
    this.loggingService.debug(
      `Waited ${performance.now() - startTime} ms for initial map extent to search for observations`,
      DEBUG_TAG
    );
    const searchCriteriaWithLargerExtent = this.searchCriteriaService.searchCriteria$.pipe(
      //get current search criteria together with previous criteria, so we can check what's changed
      scan((previousCriterias, current) => [...previousCriterias.splice(-1), current], [null, null]),
      filter(([prev, current]: [Immutable<SearchCriteriaRequestDto>, Immutable<SearchCriteriaRequestDto>]) => {
        // Two geographical properties on search criteria can be used to specify search extent:
        // SelectedRegions and Extent. We need to check if both of them has changed to see if we should send a new
        // AtAGlance request

        // This will prevent zoom in to trigger new search if the new extent is inside the previous extent
        let currentBounds;
        if (current.Extent) {
          currentBounds = withinExtentCriteriaToBounds(current.Extent);
          if (!prev || this.isErrorToastVisible()) {
            this.loggingService.debug('First search critera request, so need to fetch observations', DEBUG_TAG);
            return this.rememberExtent(currentBounds);
          }
        } else {
          currentBounds = L.latLngBounds([-90, -180], [90, 180]);
        }
        const previousCriteriaWithoutExtent = { ...prev, Extent: null };
        const currentCriteriaWithoutExtent = { ...current, Extent: null };
        if (JSON.stringify(previousCriteriaWithoutExtent) === JSON.stringify(currentCriteriaWithoutExtent)) {
          if (!current.Extent) {
            this.loggingService.debug(
              'No change in criteria and no extent, no need to fetch observations again',
              DEBUG_TAG
            );
            return false;
          }

          //only extent is changed in criteria
          if (this.lastSearchBounds?.contains(currentBounds)) {
            this.loggingService.debug('Extent inside previous extent, no need to fetch observations again', DEBUG_TAG);
            return false; //will stop this criteria change to propagate when we zoom in
          } else if (this.lastSearchBounds?.equals(currentBounds)) {
            this.loggingService.debug('Extent equals previous extent, no need to fetch observations again', DEBUG_TAG);
            return false; //will stop this criteria change to propagate when we zoom in
          } else {
            this.loggingService.debug('Extent outside previous extent, need to fetch observations again', DEBUG_TAG);
            return this.rememberExtent(currentBounds);
          }
        } else {
          this.loggingService.debug('Other criteria than extent changed, need to fetch observations', DEBUG_TAG);
          return this.rememberExtent(currentBounds);
        }
      }),
      map(([, current]) => current)
    );
    return searchCriteriaWithLargerExtent;
  }

  private rememberExtent(bounds: L.LatLngBounds): boolean {
    this.lastSearchBounds = bounds;
    return true;
  }

  async onEnter() {
    this.checkIfShouldSearchCriteriaUpdateOnEnter();
    this.loggingService.debug('Home page onEnter, so activate map updates and GeoLocation', DEBUG_TAG);
    this.mapComponent.componentIsActive(true);
    this.updateInfoBoxHeight();
  }

  onLeave() {
    this.loggingService.debug('Home page onLeave. Disable map updates and GeoLocation', DEBUG_TAG);
    this.mapComponent.componentIsActive(false);

    // As we leave the page, map center info is not visible any more, reset height
    this.mapCenterInfoHeight.next(0);
  }

  // async ionViewDidEnter() {
  // Use tab page workaround from:
  // https://github.com/ionic-team/ionic/issues/15260
  // }

  // ionViewWillLeave() {
  //   this.loggingService.debug(`Home page ionViewWillLeave. Disable map updates and GeoLocation.`, DEBUG_TAG);
  //   this.mapComponent.stopGeoPositionUpdates();
  // }

  private redrawObservationMarkers(registrations: AtAGlanceViewModel[]) {
    const startTime = performance.now();

    if (!this.markerLayer) {
      this.createMarkerLayer();
    }
    const newMarkers = registrations
      .filter((reg) => !!reg.Longitude)
      .map((reg) => {
        const pointObject = this.createPointObject(reg);
        const latLng = L.latLng(reg.Latitude, reg.Longitude);
        const geoJson = L.geoJSON(pointObject, {
          pointToLayer: () => RegObsGeoJson.pointToLayer(pointObject, latLng),
        });
        return geoJson;
      });
    this.markerLayer.clearLayers();
    this.markerLayer.addLayers(newMarkers);
    this.loggingService.debug(
      `redrawObservationMarkers(): ${registrations.length} markers drawn in ${performance.now() - startTime} ms`,
      DEBUG_TAG
    );
  }

  private createMarkerLayer(): void {
    this.markerLayer = new RegObsMarkerClusterLayer(this.map);
    this.markerLayer.on('click', (e: L.LeafletMouseEvent) => {
      const layer: L.MarkerCluster = e.propagatedFrom;
      const registration: AtAGlanceViewModel = layer.feature.properties;
      this.mapItemBar.show(registration);
    });
    this.map.addLayer(this.markerLayer);
  }

  private createPointObject(registration: AtAGlanceViewModel): Feature<Point, AtAGlanceViewModel> {
    const result = {
      geometry: {
        type: 'Point',
        coordinates: [registration.Longitude, registration.Latitude],
      } as GeoJSON.Point,
      type: 'Feature',
      properties: registration,
      id: registration.RegId,
    } as Feature<Point, AtAGlanceViewModel>;
    return result;
  }

  private updateInfoBoxHeight() {
    const mapCenterElement = this.mapCenter?.nativeElement;
    if (mapCenterElement) {
      const height = mapCenterElement.offsetHeight;
      this.mapCenterInfoHeight.next(height);
    } else {
      this.mapCenterInfoHeight.next(0);
    }
  }
}
