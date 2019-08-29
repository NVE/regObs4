import { Component, OnInit, ViewChild, OnDestroy, NgZone } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { Subscription, combineLatest, Observable } from 'rxjs';
import { ObservationService } from '../../core/services/observation/observation.service';
import { MapItemBarComponent } from '../../components/map-item-bar/map-item-bar.component';
import { MapItemMarker } from '../../core/helpers/leaflet/map-item-marker/map-item-marker';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { MapComponent } from '../../modules/map/components/map/map.component';
import { RegistrationViewModel } from '../../modules/regobs-api/models';
import { FullscreenService } from '../../core/services/fullscreen/fullscreen.service';
import { LoggingService } from '../../modules/shared/services/logging/logging.service';
import { LeafletClusterHelper } from '../../modules/map/helpers/leaflet-cluser.helper';
import { Router, NavigationStart } from '@angular/router';
import { filter, map, distinctUntilChanged } from 'rxjs/operators';
import { settings } from '../../../settings';
import { UsageAnalyticsConsentService } from '../../core/services/usage-analytics-consent/usage-analytics-consent.service';

const DEBUG_TAG = 'HomePage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  @ViewChild(MapItemBarComponent, { static : true }) mapItemBar: MapItemBarComponent;
  @ViewChild(MapComponent, { static : true }) mapComponent: MapComponent;
  private map: L.Map;
  private markerLayer = LeafletClusterHelper.createMarkerClusterGroup({
    spiderfyOnMaxZoom: false,
    zoomToBoundsOnClick: false
  });
  private subscriptions: Subscription[] = [];
  private showGeoSelectSubscription: Subscription;

  fullscreen$: Observable<boolean>;
  mapItemBarVisible = false;
  // tripLogLayer = L.layerGroup();
  selectedMarker: MapItemMarker;
  showMapCenter: boolean;
  showGeoSelectInfo = false;
  dataLoadIds: string[] = [];

  constructor(
    private observationService: ObservationService,
    private fullscreenService: FullscreenService,
    private userSettingService: UserSettingService,
    private ngZone: NgZone,
    private router: Router,
    private loggingService: LoggingService,
    private usageAnalyticsConsentService: UsageAnalyticsConsentService,
  ) {
    this.fullscreen$ = this.fullscreenService.isFullscreen$;
  }

  ngOnInit() {
    this.subscriptions.push(
      // TODO: ionViewDidEnter and ionViewWillLeave is only triggerd between tab changes and not when going
      // to another page (for example settings, my observations etc), so this is a workaround until issue is resolved
      // https://github.com/ionic-team/ionic/issues/16834
      this.router.events.pipe(filter((event) => event instanceof NavigationStart)).subscribe((val: NavigationStart) => {
        if (val.url === '/tabs/home' || val.url === '/tabs' || val.url === '/') {
          this.loggingService.debug(`Home page route changed to ${val.url}. Start GeoLocation.`, DEBUG_TAG);
          this.mapComponent.startGeoPositionUpdates();
        } else {
          this.loggingService.debug(`Home page route changed to ${val.url}. Stop GeoLocation.`, DEBUG_TAG);
          this.mapComponent.stopGeoPositionUpdates();
        }
      }));

    this.subscriptions.push(this.userSettingService.showMapCenter$.subscribe((val) => {
      this.ngZone.run(() => {
        this.showMapCenter = val;
      });
    }));

    this.subscriptions.push(this.mapItemBar.isVisible.subscribe((isVisible) => {
      this.ngZone.run(() => {
        this.mapItemBarVisible = isVisible;
      });
    }));

    this.subscriptions.push(this.observationService.dataLoad$.subscribe((val) => {
      this.ngZone.run(() => {
        this.dataLoadIds = [val];
      });
    }));

    this.checkForFirstStartup();

    // this.tripLoggerService.getTripLogAsObservable().subscribe((tripLogItems) => {
    //   this.tripLogLayer.clearLayers();
    //   const latLngs = tripLogItems.map((tripLogItem) => L.latLng({
    //     lat: tripLogItem.latitude,
    //     lng: tripLogItem.longitude
    //   }));
    //   L.polyline(latLngs, { color: 'red', weight: 3 }).addTo(this.tripLogLayer);
    // });
  }

  async checkForFirstStartup() {
    const userSettings = await this.userSettingService.getUserSettings();
    if (userSettings.showGeoSelectInfo) {
      this.showGeoSelectSubscription = this.userSettingService.userSettingObservable$.pipe(
        map((us) => us.showGeoSelectInfo),
        distinctUntilChanged()
      ).subscribe((showGeoSelectInfo) => {
        this.ngZone.run(() => {
          this.showGeoSelectInfo = showGeoSelectInfo;
          if (!this.showGeoSelectInfo) {
            if (this.showGeoSelectSubscription) {
              this.showGeoSelectSubscription.unsubscribe();
            }
            this.showUsageAnalyticsDialog();
          }
        });
      });
    }
  }

  async showUsageAnalyticsDialog() {
    await this.usageAnalyticsConsentService.checkUserDataConsentDialog();
    this.mapComponent.startGeoPositionUpdates();
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
    // TODO: Move this to custom marker layer?
    const observationObservable =
      combineLatest([this.observationService.observations$, this.userSettingService.showObservations$]);
    this.subscriptions.push(observationObservable.subscribe(([regObservations, showObservations]) => {
      this.redrawObservationMarkers(showObservations ? regObservations : []);
    }));
  }

  async ionViewDidEnter() {
    this.loggingService.debug(`Home page ionViewDidEnter.`, DEBUG_TAG);
    const userSettings = await this.userSettingService.getUserSettings();
    if (userSettings.showGeoSelectInfo) {
      this.loggingService.debug('Display coachmarks, wait with starting geopostion', DEBUG_TAG);
      return;
    }
    this.loggingService.debug(`Activate map updates and GeoLocation`, DEBUG_TAG);
    this.mapComponent.startGeoPositionUpdates();
  }

  ionViewWillLeave() {
    this.loggingService.debug(`Home page ionViewWillLeave. Disable map updates and GeoLocation.`, DEBUG_TAG);
    this.mapComponent.stopGeoPositionUpdates();
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  private redrawObservationMarkers(regObservations: RegistrationViewModel[]) {
    this.markerLayer.clearLayers();
    for (const regObservation of regObservations) {
      const latLng = L.latLng(regObservation.ObsLocation.Latitude, regObservation.ObsLocation.Longitude);
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
