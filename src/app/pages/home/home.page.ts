import { Component, OnInit, ViewChild, OnDestroy, NgZone, ChangeDetectorRef } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { Events, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ObservationService } from '../../core/services/observation/observation.service';
import { settings } from '../../../settings';
import { MapItemBarComponent } from '../../components/map-item-bar/map-item-bar.component';
import { MapItemMarker } from '../../core/helpers/leaflet/map-item-marker/map-item-marker';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { MapService } from '../../modules/map/services/map/map.service';
import { MapComponent } from '../../modules/map/components/map/map.component';
import { Router, NavigationEnd } from '@angular/router';
import { IconHelper } from '../../modules/map/helpers/icon.helper';
import { GeoHazard } from '../../core/models/geo-hazard.enum';
import { RegistrationViewModel } from '../../modules/regobs-api/models';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  @ViewChild(MapItemBarComponent) mapItemBar: MapItemBarComponent;
  @ViewChild(MapComponent) mapComponent: MapComponent;
  private map: L.Map;
  private markerLayer = L.markerClusterGroup({
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    maxClusterRadius: 60,
    iconCreateFunction: (cluster) => this.createClusterIcon(cluster),
  });
  private subscriptions: Subscription[];

  fullscreen = false;
  mapItemBarVisible = false;
  // tripLogLayer = L.layerGroup();
  selectedMarker: MapItemMarker;
  showMapCenter: boolean;
  // dataLoadIds: string[];

  constructor(
    private observationService: ObservationService,
    private events: Events,
    private userSettingService: UserSettingService,
    private mapService: MapService,
    private zone: NgZone,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {
  }

  createClusterIcon(cluster: L.MarkerCluster) {
    const items = cluster.getAllChildMarkers().map((x: MapItemMarker) => parseInt(x.item.GeoHazardTID, 10));
    const unique = Array.from(new Set(items));
    if (unique.length === 1) {
      const geoHazard: GeoHazard = unique[0];
      switch (geoHazard) {
        default:
          return IconHelper.getIceObservationsClusterIcon(items.length);
      }
    } else {
      return IconHelper.getMixedObservationsClusterIcon(items.length);
    }
  }

  async ngOnInit() {
    console.log('[INFO] ionViewDidEnter home page');
    this.subscriptions = [];
    this.subscriptions.push(this.userSettingService.userSettingObservable$.subscribe((val) => {
      this.showMapCenter = val.showMapCenter;
      this.cdr.detectChanges();
    })); // TODO: Move this to map component?

    // TODO: this is a tabs issue workaround.
    // See: https://github.com/ionic-team/ionic/issues/15260
    const routes = ['/tabs/(home:home)', '/tabs', '/', ''];
    this.subscriptions.push(this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && routes.indexOf(event.url) >= 0) {
        this.ionViewDidEnter();
      } else {
        this.ionViewWillLeave();
      }
    }));

    // this.dataLoadIds = this.observationService.getAllDataLoadIds(this.userSetting.appMode);

    // this.events.subscribe(settings.events.tabsChanged, (tabName: string) => {
    //   if (tabName === 'home') { // TODO: This is no longer needed. Tabs enter not calls ionViewDidEnter
    //     this.startGeoLocationWatch();
    //     this.redrawMap();
    //   } else {
    //     // Stopping geolocation when map is not visible to save battery
    //     this.stopGeoLocationWatch();
    //   }
    // });

    this.events.subscribe(settings.events.fullscreenChanged, (isFullscreen: boolean) => {
      this.fullscreen = isFullscreen;
      this.mapComponent.redrawMap();
      this.cdr.detectChanges();
    });

    this.subscriptions.push(this.mapItemBar.isVisible.subscribe((isVisible) => {
      this.mapItemBarVisible = isVisible;
      this.cdr.detectChanges();
    }));

    // this.tripLoggerService.getTripLogAsObservable().subscribe((tripLogItems) => {
    //   this.tripLogLayer.clearLayers();
    //   const latLngs = tripLogItems.map((tripLogItem) => L.latLng({
    //     lat: tripLogItem.latitude,
    //     lng: tripLogItem.longitude
    //   }));
    //   L.polyline(latLngs, { color: 'red', weight: 3 }).addTo(this.tripLogLayer);
    // });
  }

  async onMapReady(map: L.Map) {
    console.log('[INFO] onMapReady home page');
    this.map = map;

    this.markerLayer.addTo(this.map);

    this.zone.runOutsideAngular(() => {
      this.map.on('moveend', () => {
        const bounds = this.map.getBounds();
        const center = this.map.getCenter();
        if (bounds && center) {
          this.mapService.updateMapView({ bounds, center });
        }
      });
    });
    this.map.on('click', () => {
      if (this.selectedMarker) {
        this.selectedMarker.deselect();
      }
      this.selectedMarker = null;
      this.mapItemBar.hide();
    });
    // TODO: Move this to custom marker layer?
    this.subscriptions.push(this.observationService.observations$.subscribe((regObservations) => {
      this.redrawObservationMarkers(regObservations);
    }));
  }

  ionViewDidEnter() {
    console.log('[INFO] Home page ionViewDidEnter. Start GeoLocation');
    this.mapComponent.startGeoLocationWatch();
    this.mapComponent.redrawMap();
  }

  ionViewWillLeave() {
    console.log('[INFO] Home page ionViewWillLeave. Stop GeoLocation.');
    this.mapComponent.stopGeoLocationWatch();
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
    this.events.unsubscribe(settings.events.fullscreenChanged);
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
