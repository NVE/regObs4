import { DOCUMENT } from '@angular/common';
import { AfterViewChecked, Component, Inject, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { Feature, Point } from 'geojson';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { combineLatest, firstValueFrom, Observable, of, race, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, take, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { SearchCriteriaService } from 'src/app/core/services/search-criteria/search-criteria.service';
import {
  SearchRegistrationService,
  SearchResult,
} from 'src/app/core/services/search-registration/search-registration.service';
import { AtAGlanceViewModel, RegistrationViewModel } from 'src/app/modules/common-regobs-api/models';
import { MapCenterInfoComponent } from 'src/app/modules/map/components/map-center-info/map-center-info.component';
import { MapService } from 'src/app/modules/map/services/map/map.service';
import { MapItemBarComponent } from '../../components/map-item-bar/map-item-bar.component';
import { MapItemMarker } from '../../core/helpers/leaflet/map-item-marker/map-item-marker';
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
  selectedMarker: MapItemMarker;
  showGeoSelectInfo = false;
  dataLoadIds$: Observable<string[]>;

  @ViewChild(MapCenterInfoComponent) mapCenter: MapCenterInfoComponent;
  private mapCenterInfoHeight = new Subject<number>();

  constructor(
    router: Router,
    route: ActivatedRoute,
    private searchRegistrationService: SearchRegistrationService,
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
      if (this.selectedMarker) {
        this.selectedMarker.deselect();
      }
      this.selectedMarker = null;
      this.mapItemBar.hide();
    });

    const searchResult = await this.createSearchResult();

    combineLatest([searchResult.registrations$, this.userSettingService.showObservations$])
      .pipe(
        takeUntil(this.ngUnsubscribe) // TODO: Is this page ever destroyed?
      )
      .subscribe(([registrations, show]) => {
        this.redrawObservationMarkers(show ? registrations : []);
      });

    //search triggered manually
    this.searchRegistrationService.searchRequested$
      .pipe(
        takeUntil(this.ngUnsubscribe), // TODO: Is this page ever destroyed?
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
    await firstValueFrom(this.mapService.relevantMapChangeWithInitialView$);
    return this.searchRegistrationService.atAGlance(this.searchCriteriaService.searchCriteria$);
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

  // private createActiveMarkerClusterGroup(registration: RegistrationViewModel): L.MarkerClusterGroup {
  //   const pointObject = this.createPointObject(registration);
  //   const location = L.latLng(registration.ObsLocation.Latitude, registration.ObsLocation.Longitude);
  //   const geoJson = L.geoJSON(pointObject, {
  //     pointToLayer: () => RegObsGeoJson.pointToLayer(pointObject, location),
  //   });

  //   const clusterGroup = new L.MarkerClusterGroup();
  //   clusterGroup.addLayer(geoJson);
  //   return clusterGroup;
  // }

  createPointObject(registration: AtAGlanceViewModel): Feature<Point, AtAGlanceViewModel> {
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
