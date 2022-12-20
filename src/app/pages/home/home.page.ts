import { DOCUMENT } from '@angular/common';
import { AfterViewChecked, Component, Inject, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { Feature, Point } from 'geojson';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { combineLatest, firstValueFrom, Observable, of, race, Subject, scan } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, take, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import {
  SearchCriteriaService,
  withinExtentCriteriaToBounds,
} from 'src/app/core/services/search-criteria/search-criteria.service';
import {
  SearchRegistrationService,
  SearchResult,
} from 'src/app/core/services/search-registration/search-registration.service';
import { AtAGlanceViewModel } from 'src/app/modules/common-regobs-api/models';
import { MapCenterInfoComponent } from 'src/app/modules/map/components/map-center-info/map-center-info.component';
import { MapService } from 'src/app/modules/map/services/map/map.service';
import { UpdateObservationsService } from 'src/app/modules/side-menu/components/update-observations/update-observations.service';
import { MapItemBarComponent } from '../../components/map-item-bar/map-item-bar.component';
import { enterZone } from '../../core/helpers/observable-helper';
import { RouterPage } from '../../core/helpers/routed-page';
import { FullscreenService } from '../../core/services/fullscreen/fullscreen.service';
import { UsageAnalyticsConsentService } from '../../core/services/usage-analytics-consent/usage-analytics-consent.service';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { MapComponent } from '../../modules/map/components/map/map.component';
import { LoggingService } from '../../modules/shared/services/logging/logging.service';
import { TabsService, TAB_HOME } from '../tabs/tabs.service';
import { RegObsGeoJson } from './geojson';
import { RegObsMarkerClusterLayer } from './markerCluster.layer';

const DEBUG_TAG = 'HomePage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage extends RouterPage implements OnInit, AfterViewChecked {
  @ViewChild(MapItemBarComponent, { static: true }) mapItemBar: MapItemBarComponent;
  @ViewChild(MapComponent, { static: true }) mapComponent: MapComponent;
  private map: L.Map;
  private markerLayer: RegObsMarkerClusterLayer;
  private geoCoachMarksClosedSubject = new Subject<void>();

  fullscreen$: Observable<boolean>;
  showGeoSelectInfo = false;
  dataLoadIds$: Observable<string[]>;
  private lastFetched: Date = null;

  @ViewChild(MapCenterInfoComponent) mapCenter: MapCenterInfoComponent;
  private mapCenterInfoHeight = new Subject<number>();

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
    // TODO
    // this.dataLoadIds$ = this.observationService.dataLoad$.pipe(
    //   map((val) => [val]),
    //   enterZone(this.ngZone)
    // );
    this.dataLoadIds$ = of([]);
    this.checkForFirstStartup();
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

    const searchResult = await this.createSearchResult();

    combineLatest([searchResult.registrations$, this.userSettingService.showObservations$]).subscribe(
      ([registrations, show]) => {
        this.redrawObservationMarkers(show ? registrations : []);
      }
    );

    this.tabsService.selectedTab$
      .pipe(filter((tab) => tab === TAB_HOME))
      .subscribe(() => this.updateObservationsService.setLastFetched(this.lastFetched));

    searchResult.registrations$.subscribe(() => {
      this.lastFetched = new Date();
      this.updateObservationsService.setLastFetched(this.lastFetched);
    });

    // search triggered manually
    this.updateObservationsService.refreshRequested$
      .pipe(
        withLatestFrom(this.tabsService.selectedTab$),
        tap(([, tab]) => {
          if (tab === TAB_HOME) {
            searchResult.update();
            this.loggingService.debug('Search manually triggered', DEBUG_TAG);
          } else {
            this.loggingService.debug('Ignored manually triggered search because page is not active', DEBUG_TAG);
          }
        })
      )
      .subscribe();
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
      filter(([prev, current]) => {
        //will prevent zoom in to trigger new search
        if (!prev) {
          this.loggingService.debug('First search critera request, so need to fetch observations', DEBUG_TAG);
          return true;
        }
        const previousCriteriaWithoutExtent = { ...prev, Extent: undefined };
        const currentCriteriaWithoutExtent = { ...current, Extent: undefined };
        if (JSON.stringify(previousCriteriaWithoutExtent) === JSON.stringify(currentCriteriaWithoutExtent)) {
          //only extent is changed in criteria
          const previousBounds = withinExtentCriteriaToBounds(prev.Extent);
          const currentBounds = withinExtentCriteriaToBounds(current.Extent);
          if (previousBounds.contains(currentBounds)) {
            this.loggingService.debug('Extent inside previous extent, no need to fetch observations again', DEBUG_TAG);
            return false; //will stop this criteria change to propagate when we zoom in
          } else {
            this.loggingService.debug('Extent outside previous extent, need to fetch observations again', DEBUG_TAG);
            return true;
          }
        } else {
          this.loggingService.debug('Other criteria than extent changed, need to fetch observations', DEBUG_TAG);
          return true;
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

  async onEnter() {
    this.loggingService.debug('Home page ionViewDidEnter.', DEBUG_TAG);
    const userSettings = await this.userSettingService.userSetting$.pipe(take(1)).toPromise();
    if (userSettings.showGeoSelectInfo) {
      this.loggingService.debug('Display coachmarks, wait with starting geopostion', DEBUG_TAG);
      return;
    }
    this.loggingService.debug('Activate map updates and GeoLocation', DEBUG_TAG);
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
