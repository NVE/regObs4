import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { combineLatest, Observable, Subject, race } from 'rxjs';
import { ObservationService } from '../../core/services/observation/observation.service';
import { MapItemBarComponent } from '../../components/map-item-bar/map-item-bar.component';
import { MapItemMarker } from '../../core/helpers/leaflet/map-item-marker/map-item-marker';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { MapComponent } from '../../modules/map/components/map/map.component';
import { RegistrationViewModel } from '../../modules/regobs-api/models';
import { FullscreenService } from '../../core/services/fullscreen/fullscreen.service';
import { LoggingService } from '../../modules/shared/services/logging/logging.service';
import { LeafletClusterHelper } from '../../modules/map/helpers/leaflet-cluser.helper';
import { Router, ActivatedRoute } from '@angular/router';
import {
  map,
  distinctUntilChanged,
  takeUntil,
  tap,
  take
} from 'rxjs/operators';
import { settings } from '../../../settings';
import { UsageAnalyticsConsentService } from '../../core/services/usage-analytics-consent/usage-analytics-consent.service';
import { RouterPage } from '../../core/helpers/routed-page';
import { enterZone } from '../../core/helpers/observable-helper';

const DEBUG_TAG = 'HomePage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage extends RouterPage implements OnInit {
  @ViewChild(MapItemBarComponent, { static: true })
  mapItemBar: MapItemBarComponent;
  @ViewChild(MapComponent, { static: true }) mapComponent: MapComponent;
  private map: L.Map;
  private markerLayer = LeafletClusterHelper.createMarkerClusterGroup({
    spiderfyOnMaxZoom: false,
    zoomToBoundsOnClick: false
  });
  private geoCoachMarksClosedSubject = new Subject<void>();

  fullscreen$: Observable<boolean>;
  selectedMarker: MapItemMarker;
  showGeoSelectInfo = false;
  dataLoadIds$: Observable<string[]>;

  constructor(
    router: Router,
    route: ActivatedRoute,
    private observationService: ObservationService,
    private fullscreenService: FullscreenService,
    private userSettingService: UserSettingService,
    private ngZone: NgZone,
    private loggingService: LoggingService,
    private usageAnalyticsConsentService: UsageAnalyticsConsentService
  ) {
    super(router, route);
  }

  ngOnInit() {
    this.fullscreen$ = this.fullscreenService.isFullscreen$;
    this.dataLoadIds$ = this.observationService.dataLoad$.pipe(
      map((val) => [val]),
      enterZone(this.ngZone)
    );
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
        this.map.setView(
          groupLatLng,
          Math.min(newZoom, settings.map.tiles.maxZoom)
        );
      }
    });
    this.map.on('click', () => {
      if (this.selectedMarker) {
        this.selectedMarker.deselect();
      }
      this.selectedMarker = null;
      this.mapItemBar.hide();
    });
    // TODO: Move this to custom marker layer?
    const observationObservable = combineLatest([
      this.observationService.observations$,
      this.userSettingService.showObservations$
    ]);
    observationObservable
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(([regObservations, showObservations]) => {
        this.redrawObservationMarkers(showObservations ? regObservations : []);
      });
  }

  async onEnter() {
    this.loggingService.debug('Home page ionViewDidEnter.', DEBUG_TAG);
    const userSettings = await this.userSettingService.userSetting$
      .pipe(take(1))
      .toPromise();
    if (userSettings.showGeoSelectInfo) {
      this.loggingService.debug(
        'Display coachmarks, wait with starting geopostion',
        DEBUG_TAG
      );
      return;
    }
    this.loggingService.debug(
      'Activate map updates and GeoLocation',
      DEBUG_TAG
    );
    this.mapComponent.componentIsActive(true);
  }

  onLeave() {
    this.loggingService.debug(
      'Home page onLeave. Disable map updates and GeoLocation',
      DEBUG_TAG
    );
    this.mapComponent.componentIsActive(false);
  }

  // async ionViewDidEnter() {
  // Use tab page workaround from:
  // https://github.com/ionic-team/ionic/issues/15260
  // }

  // ionViewWillLeave() {
  //   this.loggingService.debug(`Home page ionViewWillLeave. Disable map updates and GeoLocation.`, DEBUG_TAG);
  //   this.mapComponent.stopGeoPositionUpdates();
  // }

  private redrawObservationMarkers(regObservations: RegistrationViewModel[]) {
    this.markerLayer.clearLayers();
    for (const regObservation of regObservations) {
      const latLng = L.latLng(
        regObservation.ObsLocation.Latitude,
        regObservation.ObsLocation.Longitude
      );
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
}
