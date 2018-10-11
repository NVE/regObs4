import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { Events } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UserMarker } from '../../core/helpers/leaflet/user-marker/user-marker';
import { ObservationService } from '../../core/services/observation/observation.service';
import { OfflineTileLayer } from '../../core/helpers/leaflet/offline-tile-layer/offline-tile-layer';
import * as norwegianBorder from '../../../assets/norway-borders2.json';
import { settings } from '../../../settings';
import { MapItemBarComponent } from '../../components/map-item-bar/map-item-bar.component';
import { RegObsObservation } from '../../core/models/regobs-observation.model';
import { MapItemMarker } from '../../core/helpers/leaflet/map-item-marker/map-item-marker';
import { GeoHazard } from '../../core/models/geo-hazard.enum';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { MapSearchResponse } from '../../core/services/map-search/map-search-response.model';
import { MapService } from '../../core/services/map/map.service';
import { UserSetting } from '../../core/models/user-settings.model';

const NORWEGIAN_BORDER = L.geoJSON(norwegianBorder.default);

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  @ViewChild(MapItemBarComponent) mapItemBar: MapItemBarComponent;
  map: L.Map;
  watchSubscription: Subscription;
  userMarker: UserMarker;
  toast: HTMLIonToastElement;
  followMode = true;
  markerLayer = L.markerClusterGroup({
    spiderfyOnMaxZoom: false,
    showCoverageOnHover: false,
    maxClusterRadius: 30
  });
  observationSubscription: Subscription;
  mapItemBarSubscription: Subscription;
  markers: Array<MapItemMarker>;
  toastDismissTimeout: NodeJS.Timer;
  tilesLayer = L.layerGroup();
  defaultMapLayer = new OfflineTileLayer();
  fullscreen = false;
  mapItemBarVisible = false;
  currentGeoHazard: GeoHazard;
  tripLogLayer = L.layerGroup();
  selectedMarker: MapItemMarker;
  showMapCenter: boolean;
  userSetting: UserSetting;
  dataLoadIds: string[];

  constructor(
    private geolocation: Geolocation,
    private observationService: ObservationService,
    private events: Events,
    private userSettingService: UserSettingService,
    private mapService: MapService,
  ) {

    const defaultIcon = L.icon({
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png'
    });

    L.Marker.prototype.options.icon = defaultIcon;

    this.markers = [];
  }

  options: L.MapOptions = {
    layers: [
      this.tilesLayer,
      this.markerLayer,
      this.tripLogLayer,
    ],
    zoom: 13,
    maxZoom: 19,
    center: L.latLng(59.911197, 10.741059),
    attributionControl: false,
    zoomControl: false,
  };

  async ngOnInit() {
    console.log('[INFO] ionViewDidEnter home page');

    this.userSetting = await this.userSettingService.getUserSettings();
    this.currentGeoHazard = this.userSetting.currentGeoHazard;
    this.showMapCenter = this.userSetting.showMapCenter;
    this.setDataLoadIds();

    this.events.subscribe(settings.events.geoHazardChanged, (newGeoHazard: GeoHazard) => {
      this.currentGeoHazard = newGeoHazard;
      this.configureTileLayers();
    });

    this.events.subscribe(settings.events.tabsChanged, (tabName: string) => {
      if (tabName === 'home') { // TODO: This is no longer needed. Tabs enter not calls ionViewDidEnter
        this.startGeoLocationWatch();
        this.redrawMap();
      } else {
        // Stopping geolocation when map is not visible to save battery
        this.stopGeoLocationWatch();
      }
    });

    this.events.subscribe(settings.events.fullscreenChanged, (isFullscreen: boolean) => {
      this.fullscreen = isFullscreen;
    });

    this.events.subscribe(settings.events.centerMapToUser, () => this.centerMapToUser());

    this.events.subscribe(settings.events.mapSearchItemClicked, (item: MapSearchResponse) => {
      if (this.map) {
        this.disableFollowMode();
        this.map.flyTo(item.latlng);
      }
    });

    this.mapItemBarSubscription = this.mapItemBar.isVisible.subscribe((isVisible) => {
      this.mapItemBarVisible = isVisible;
    });

    this.events.subscribe(settings.events.userSettingsChanged, (userSettings: UserSetting) => {
      this.userSetting = this.userSetting;
      this.setDataLoadIds();
    });

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
    this.map.on('moveend', () => this.onMapMoved());
    this.map.on('dragstart', () => this.disableFollowMode());
    this.map.on('click', () => {
      if (this.selectedMarker) {
        this.selectedMarker.deselect();
      }
      this.selectedMarker = null;
      this.mapItemBar.hide();
    });
    L.control.scale({ imperial: false }).addTo(map);
    // TODO: Move this to custom marker layer?
    this.observationSubscription = this.observationService.observations$.subscribe((regObservations) => {
      this.redrawObservationMarkers(regObservations);
    });
    await this.configureTileLayers();
    this.redrawMap();
  }

  ionViewDidEnter() {
    console.log('[INFO] Home page ionViewDidEnter');
    this.redrawMap();
  }

  ionViewWillLeave() {
    console.log('[INFO] ionViewWillLeave home page. Unsubscribe listeners');
    this.stopGeoLocationWatch();
  }

  ngOnDestroy(): void {
    this.map.remove();
    this.observationSubscription.unsubscribe();
    this.mapItemBarSubscription.unsubscribe();
    this.events.unsubscribe(settings.events.tabsChanged);
    this.events.unsubscribe(settings.events.geoHazardChanged);
    this.events.unsubscribe(settings.events.fullscreenChanged);
    this.events.unsubscribe(settings.events.centerMapToUser);
    this.events.unsubscribe(settings.events.mapSearchItemClicked);
  }

  async configureTileLayers() {
    const userSettings = await this.userSettingService.getUserSettings();
    this.tilesLayer.clearLayers();
    this.defaultMapLayer.addTo(this.tilesLayer);
    const supportTiles = userSettings.supportTiles || settings.map.tiles.supportTiles;
    for (const supportTile of supportTiles) {
      if (supportTile.geoHazardId === this.currentGeoHazard && supportTile.enabled) {
        const tile = L.tileLayer(supportTile.url);
        tile.setOpacity(supportTile.opacity);
        tile.addTo(this.tilesLayer);
      }
    }
  }

  private setDataLoadIds() {
    this.dataLoadIds = this.observationService.getAllDataLoadIds(this.userSetting.appMode);
  }

  private redrawObservationMarkers(regObservations: RegObsObservation[]) {
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

  centerMapToUser() {
    this.followMode = true;
    if (this.userMarker) {
      const currentPosition = this.userMarker.getPosition();
      this.map.panTo(L.latLng(currentPosition.coords.latitude, currentPosition.coords.longitude));
    }
  }

  private async onMapMoved() {
    console.log('map moved');
    // this.helperService.setCurrentMapView(this.map.getBounds(), this.map.getCenter());
    this.mapService.updateMapView({ bounds: this.map.getBounds(), center: this.map.getCenter() });
  }

  private disableFollowMode() {
    this.followMode = false;
  }

  redrawMap() {
    setTimeout(() => {
      this.map.invalidateSize();
      setTimeout(() => {
        this.map.invalidateSize();
        setTimeout(() => {
          this.map.invalidateSize();
        }, 200);
      }, 200);
    }, 200);
  }

  private startGeoLocationWatch() {
    console.log('[INFO] Start watching location changes');
    if (this.watchSubscription === undefined || this.watchSubscription.closed) {
      this.watchSubscription = this.geolocation.watchPosition(
        { maximumAge: settings.gps.maximumAge, enableHighAccuracy: true }
      )
        .subscribe(
          (data) => this.onPositionUpdate(data),
          (error) => this.onPositionError(error)
        );
    }
  }

  private stopGeoLocationWatch() {
    console.log('[INFO] Stop watching location changes');
    if (this.watchSubscription !== undefined && !this.watchSubscription.closed) {
      this.watchSubscription.unsubscribe();
    }
  }

  private onPositionUpdate(data: Geoposition) {
    if (data.coords && this.map) {
      const latLng = L.latLng({ lat: data.coords.latitude, lng: data.coords.longitude });
      if (!this.userMarker) {
        this.userMarker = new UserMarker(this.map, data);
        this.map.panTo(latLng);
      } else {
        this.userMarker.updatePosition(data);
        if (this.followMode) {
          this.map.panTo(latLng);
        }
      }
    }
  }

  private onPositionError(error: any) {
    // TODO: Handle error
    console.log(error);
  }
}
