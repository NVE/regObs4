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
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LoggingService } from '../../modules/shared/services/logging/logging.service';

const DEBUG_TAG = 'HomePage';

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

  fullscreen$: Observable<boolean>;
  mapItemBarVisible = false;
  // tripLogLayer = L.layerGroup();
  selectedMarker: MapItemMarker;
  showMapCenter: boolean;
  // dataLoadIds: string[];

  constructor(
    private observationService: ObservationService,
    private fullscreenService: FullscreenService,
    private userSettingService: UserSettingService,
    private zone: NgZone,
    private router: Router,
    private loggingService: LoggingService,
  ) {
    this.fullscreen$ = this.fullscreenService.isFullscreen$;
  }

  createClusterIcon(cluster: L.MarkerCluster) {
    const items = cluster.getAllChildMarkers().map((x: MapItemMarker) => x.item.GeoHazardTID);
    const size = (items.length < 100 ? 35 :
      (items.length < 1000 ? 50 : 70));
    return L.divIcon({
      html: '<div>' + items.length + '</div>',
      iconSize: [size, size],
      iconAnchor: [size / 2.0, size / 2.0],
      className: 'circle-marker-cluster',
    });
  }

  async ngOnInit() {
    this.subscriptions = [];
    this.subscriptions.push(this.userSettingService.userSettingObservable$.subscribe((val) => {
      this.zone.run(() => {
        this.showMapCenter = val.showMapCenter;
      });
    })); // TODO: Move this to map component?

    this.subscriptions.push(this.mapItemBar.isVisible.subscribe((isVisible) => {
      this.zone.run(() => {
        this.mapItemBarVisible = isVisible;
      });
    }));

    this.subscriptions.push(
      this.router.events.pipe(filter((event) => event instanceof NavigationStart)).subscribe((val: NavigationStart) => {
        if (val.url === '/tabs/home' || val.url === '/tabs') {
          this.loggingService.debug(`Home page route changed to ${val.url}. Start GeoLocation.`, DEBUG_TAG);
          this.mapComponent.startGeoLocationWatch();
          this.mapComponent.redrawMap();
        } else {
          this.loggingService.debug(`Home page route changed to ${val.url}. Stop GeoLocation.`, DEBUG_TAG);
          this.mapComponent.stopGeoLocationWatch();
        }
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
    this.map = map;
    this.markerLayer.addTo(this.map);
    this.map.on('click', () => {
      if (this.selectedMarker) {
        this.selectedMarker.deselect();
      }
      this.selectedMarker = null;
      this.mapItemBar.hide();
    });
    // TODO: Move this to custom marker layer?
    const observationObservable =
      combineLatest(this.observationService.observations$, this.userSettingService.userSettingObservable$);
    this.subscriptions.push(observationObservable.subscribe(([regObservations, userSettings]) => {
      this.redrawObservationMarkers(userSettings.showObservations ? regObservations : []);
    }));
  }

  ionViewDidEnter() {
    this.loggingService.debug(`Home page ionViewDidEnter. Start GeoLocation`, DEBUG_TAG);
    this.mapComponent.startGeoLocationWatch();
    this.mapComponent.redrawMap();
  }

  ionViewWillLeave() {
    this.loggingService.debug(`Home page ionViewWillLeave. Stop GeoLocation.`, DEBUG_TAG);
    this.mapComponent.stopGeoLocationWatch();
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
