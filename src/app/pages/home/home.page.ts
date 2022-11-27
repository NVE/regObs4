import { DOCUMENT } from '@angular/common';
import { AfterViewChecked, Component, Inject, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { combineLatest, Observable, of, race, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, map, take, takeUntil, tap, withLatestFrom
} from 'rxjs/operators';
import { SearchCriteriaService } from 'src/app/core/services/search-criteria/search-criteria.service';
import { SearchRegistrationService } from 'src/app/core/services/search-registration/search-registration.service';
import { AtAGlanceViewModel } from 'src/app/modules/common-regobs-api/models';
import { MapCenterInfoComponent } from 'src/app/modules/map/components/map-center-info/map-center-info.component';
import { settings } from '../../../settings';
import { MapItemBarComponent } from '../../components/map-item-bar/map-item-bar.component';
import { MapItemMarker } from '../../core/helpers/leaflet/map-item-marker/map-item-marker';
import { enterZone } from '../../core/helpers/observable-helper';
import { RouterPage } from '../../core/helpers/routed-page';
import { FullscreenService } from '../../core/services/fullscreen/fullscreen.service';
import { UsageAnalyticsConsentService } from '../../core/services/usage-analytics-consent/usage-analytics-consent.service';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { MapComponent } from '../../modules/map/components/map/map.component';
import { LeafletClusterHelper } from '../../modules/map/helpers/leaflet-cluser.helper';
import { LoggingService } from '../../modules/shared/services/logging/logging.service';
import { TabsService, TAB_HOME } from '../tabs/tabs.service';

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
  private markerLayer = LeafletClusterHelper.createMarkerClusterGroup({
    spiderfyOnMaxZoom: false,
    zoomToBoundsOnClick: false,
  });
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

  onMapReady(leafletMap: L.Map) {
    this.map = leafletMap;
    this.markerLayer.addTo(this.map);
    this.markerLayer.on('clusterclick', (a: any) => {
      const groupLatLng: L.LatLng = a.latlng;
      const currentZoom = this.map.getZoom();
      const newZoom = currentZoom + 2;
      if (newZoom >= settings.map.tiles.maxZoom) {
        a.layer.spiderfy();
      } else {
        this.map.setView(groupLatLng, Math.min(newZoom, settings.map.tiles.maxZoom));
      }
    });
    this.map.on('click', () => {
      if (this.selectedMarker) {
        this.selectedMarker.deselect();
      }
      this.selectedMarker = null;
      this.mapItemBar.hide();
    });

    const searchResult = this.searchRegistrationService.atAGlance(this.searchCriteriaService.searchCriteria$);
    combineLatest([
      searchResult.registrations$,
      this.userSettingService.showObservations$
    ]).pipe(
      takeUntil(this.ngUnsubscribe),  // TODO: Is this page ever destroyed?
    ).subscribe(([registrations, show]) => {
      this.redrawObservationMarkers(show ? registrations : []);
    });

    //search triggered manually
    this.searchRegistrationService.searchRequested$.pipe(
      takeUntil(this.ngUnsubscribe),  // TODO: Is this page ever destroyed?
      withLatestFrom(this.tabsService.selectedTab$),
      tap(([, tab]) => {
        if (tab === TAB_HOME) {
          searchResult.update();
          this.loggingService.debug('Search manually triggered', DEBUG_TAG);
        } else {
          this.loggingService.debug('Ignored manually triggered search because page is not active', DEBUG_TAG);
        }
      })
    ).subscribe();
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

  private redrawObservationMarkers(regObservations: AtAGlanceViewModel[]) {
    this.markerLayer.clearLayers();
    for (const regObservation of regObservations) {
      const latLng = L.latLng(regObservation.Latitude, regObservation.Longitude);
      const marker = new MapItemMarker(regObservation, latLng, {});
      marker.on('click', (event: L.LeafletEvent) => {
        const m: MapItemMarker = event.target;
        if (this.selectedMarker) {
          this.selectedMarker.deselect();
        }

        this.selectedMarker = m;
        m.setSelected();
        this.mapItemBar.show(m.item);
      });
      marker.addTo(this.markerLayer);
    }
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
