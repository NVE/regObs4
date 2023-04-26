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
  Subscription,
  BehaviorSubject,
  from,
} from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  exhaustMap,
  filter,
  finalize,
  map,
  skip,
  switchMap,
  takeUntil,
  withLatestFrom,
} from 'rxjs/operators';
import { SearchCriteriaService } from 'src/app/core/services/search-criteria/search-criteria.service';
import {
  SearchRegistrationService,
  SearchResult,
} from 'src/app/core/services/search-registration/search-registration.service';
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
  private searchResult: SearchResult<AtAGlanceViewModel>;
  private shouldSearchResultUpdateOnEnter: boolean;

  isFetchingObservations$: Observable<boolean>;

  @ViewChild(MapCenterInfoComponent) mapCenter: MapCenterInfoComponent;
  private mapCenterInfoHeight = new Subject<number>();
  private registrationsSubscription: Subscription;
  activateFollowModeInMapOnStartup = Capacitor.isNativePlatform();
  observationSearchError$ = new BehaviorSubject(false);
  private onDestroy$ = new Subject<void>();

  constructor(
    router: Router,
    route: ActivatedRoute,
    private searchRegistrationService: SearchRegistrationService,
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

    this.tabsService.selectedTab$
      .pipe(filter((tab) => tab === TABS.HOME))
      .subscribe(() => this.updateObservationsService.setLastFetched(this.lastFetched));

    this.userSettingService.appMode$.subscribe(() => (this.shouldSearchResultUpdateOnEnter = true));
    this.initSearch();
    this.initObservationsErrorToast();

    this.updateObservationsService.refreshRequested$
      .pipe(withLatestFrom(this.tabsService.selectedTab$))
      .subscribe(([, tab]) => {
        if (tab === TABS.HOME) {
          this.initSearch().then(() => this.searchResult.update());
          this.loggingService.debug('Search manually triggered', DEBUG_TAG);
        } else {
          this.loggingService.debug('Ignored manually triggered search because page is not active', DEBUG_TAG);
        }
      });
  }

  private async initSearch() {
    this.loggingService.debug('initSearch...', DEBUG_TAG);
    this.observationSearchError$.next(false);

    if (this.registrationsSubscription != null) {
      this.registrationsSubscription.unsubscribe;
    }

    this.searchResult = await this.createSearchResult();

    this.isFetchingObservations$ = this.searchResult.isFetching$;

    this.registrationsSubscription = combineLatest([
      this.searchResult.registrations$,
      this.userSettingService.showObservations$,
    ])
      .pipe(map(([registrations, show]) => (show ? registrations : [])))
      .subscribe({
        next: (registrations) => {
          this.observationSearchError$.next(false);
          this.redrawObservationMarkers(registrations);
        },
        error: (err) => {
          this.observationSearchError$.next(true);
          this.loggingService.log('Error in search', err, LogLevel.Warning, DEBUG_TAG);
        },
      });

    this.searchResult.registrations$.subscribe(() => {
      this.lastFetched = new Date();
      this.updateObservationsService.setLastFetched(this.lastFetched);
    });
  }

  private initObservationsErrorToast() {
    this.observationSearchError$
      .pipe(
        filter((error) => error),
        // Use exhaustmap to avoid multiple error toasts at once
        exhaustMap(() =>
          from(this.showSearchErrorToast()).pipe(
            switchMap((toast) =>
              // We have created the toast,
              // now wait until user dismisses it or navigates away
              // or we get a "successfull" search
              from(toast.onDidDismiss()).pipe(
                takeUntil(
                  race(
                    //this.searchResult.registrations$.pipe(filter((regs) => regs.length > 0)),
                    this.observationSearchError$.pipe(filter((error) => !error)),
                    this.tabsService.selectedTab$.pipe(skip(1))
                  )
                ),
                finalize(() => toast.dismiss())
              )
            )
          )
        ),
        takeUntil(this.onDestroy$)
      )
      .subscribe();
  }

  private async showSearchErrorToast() {
    const translations = await firstValueFrom(
      this.translateService.get([
        'HOME_PAGE.OBSERVATIONS_SEARCH_ERROR.MESSAGE',
        'HOME_PAGE.OBSERVATIONS_SEARCH_ERROR.BUTTON',
      ])
    );
    const toast = await this.toastService.create({
      message: translations['HOME_PAGE.OBSERVATIONS_SEARCH_ERROR.MESSAGE'],
      position: 'bottom',
      buttons: [
        {
          text: translations['HOME_PAGE.OBSERVATIONS_SEARCH_ERROR.BUTTON'],
          role: 'cancel',
        },
      ],
    });

    await toast.present();
    return toast;
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
    if (this.shouldSearchResultUpdateOnEnter && this.searchResult) {
      this.searchResult.update();
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

  private async createSearchResult(): Promise<SearchResult<AtAGlanceViewModel>> {
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

        // Start by comparing SelectedRegions for current and previous criteria if Extent filter is not active
        if (!current.Extent) {
          if (current.SelectedRegions?.length) {
            const regionsLengthHasChanged = current.SelectedRegions.length !== (prev?.SelectedRegions?.length || 0);
            if (!regionsLengthHasChanged) {
              return current.SelectedRegions.some((r, i) => prev.SelectedRegions[i] !== r);
            }
            return regionsLengthHasChanged;
          } else {
            // No extent and no selected regions, should not happen, but return true as a fallback to trigger a search
            this.loggingService.log('No extent and no selected regions', null, LogLevel.Warning, DEBUG_TAG);
            return true;
          }
        }

        // This will prevent zoom in to trigger new search if the new extent is inside the
        // previous extent
        let currentBounds;
        if (current.Extent) {
          currentBounds = withinExtentCriteriaToBounds(current.Extent);
          if (!prev || this.observationSearchError$.getValue()) {
            this.loggingService.debug('First search critera request, so need to fetch observations', DEBUG_TAG);
            return this.rememberExtent(currentBounds);
          }
        }
        const previousCriteriaWithoutExtent = { ...prev, Extent: null };
        const currentCriteriaWithoutExtent = { ...current, Extent: null };
        if (JSON.stringify(previousCriteriaWithoutExtent) === JSON.stringify(currentCriteriaWithoutExtent)) {
          //only extent is changed in criteria
          if (this.lastSearchBounds?.contains(currentBounds)) {
            this.loggingService.debug('Extent inside previous extent, no need to fetch observations again', DEBUG_TAG);
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
      map(([, current]) => current) //return current criteria
    );
    return this.searchRegistrationService.atAGlance(searchCriteriaWithLargerExtent);

    // Du kan bruke denne for å teste søk uten kartutsnitt i stedet
    // const searchCriteriaWithoutExtent = this.searchCriteriaService.searchCriteria$.pipe(
    //   map((criteria) => ({ ...criteria, Extent: undefined }))
    // );
    // return this.searchRegistrationService.atAGlance(searchCriteriaWithoutExtent);
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
