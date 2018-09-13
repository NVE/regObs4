import { Component, AfterViewInit, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { Platform, ToastController, Events, PopoverController, Fab } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UserMarker } from '../../core/helpers/leaflet/user-marker/user-marker';
import { ObservationService } from '../../core/services/observation/observation.service';
import { ObserverSubscriber } from 'nano-sql/lib/observable';
import { OfflineTileLayer } from '../../core/helpers/leaflet/offline-tile-layer/offline-tile-layer';
import * as norwegianBorder from '../../../assets/norway-borders2.json';
import * as leafletPip from '@mapbox/leaflet-pip';
import { settings } from '../../../settings';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MapItemBarComponent } from '../../components/map-item-bar/map-item-bar.component';
import { RegObsObservation } from '../../core/models/regobs-observation.model';
import { MapItemMarker } from '../../core/helpers/leaflet/map-item-marker/map-item-marker';
import { GeoHazard } from '../../core/models/geo-hazard.enum';
import { UserSettingService } from '../../core/services/user-setting.service';
import { HelperService } from '../../core/services/helpers/helper.service';
import { PopoverMenuComponent } from '../../components/popover-menu/popover-menu.component';
import { TripLoggerService } from '../../core/services/trip-logger/trip-logger.service';
import { BackgroundGeolocationService } from '../../core/services/background-geolocation/background-geolocation.service';

const NORWEGIAN_BORDER = L.geoJSON(norwegianBorder.default);

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  @ViewChild(MapItemBarComponent) mapItemBar: MapItemBarComponent;
  @ViewChild('menuFab') menuFab: Fab;
  map: L.Map;
  watchSubscription: Subscription;
  userMarker: UserMarker;
  toast: HTMLIonToastElement;
  followMode = true;
  markerLayer = L.markerClusterGroup();
  observationSubscription: ObserverSubscriber;
  mapItemBarSubscription: Subscription;
  markers: Array<MapItemMarker>;
  toastDismissTimeout: NodeJS.Timer;
  // TODO: Create one really good custom Layer with fallback to offline/norwegian/open maps
  embeddedMapLayer = this.getEmbeddedMapLayer();
  defaultMapLayer = this.getDefaultMapLayer();
  alternativeMapLayer = this.getAlternativeMapLayer();
  fullscreen = false;
  mapItemBarVisible = false;
  currentGeoHazard: GeoHazard;
  tripLogLayer = L.layerGroup();

  constructor(private platform: Platform,
    private geolocation: Geolocation,
    private observationService: ObservationService,
    private toastController: ToastController,
    private events: Events,
    private statusBar: StatusBar,
    private userSettingService: UserSettingService,
    private helperService: HelperService,
    private popoverController: PopoverController,
    private tripLoggerService: TripLoggerService,
    private backgroundGeolocationService: BackgroundGeolocationService,
  ) {

    const defaultIcon = L.icon({
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png'
    });

    L.Marker.prototype.options.icon = defaultIcon;

    this.markers = [];
    // this.initLoadingToast(); // TODO: Create component instead
  }

  options: L.MapOptions = {
    layers: [
      // this.embeddedMapLayer,
      this.defaultMapLayer,
      this.markerLayer,
      this.tripLogLayer,
    ],
    zoom: 13,
    center: L.latLng(59.911197, 10.741059),
    attributionControl: false,
    zoomControl: false,
  };

  ngOnInit(): void {
    console.log('[INFO] ionViewDidEnter home page');

    this.events.subscribe(settings.events.geoHazardChanged, (newGeoHazard: GeoHazard) => {
      this.currentGeoHazard = newGeoHazard;
      this.resubscribeObservations();
    });

    this.events.subscribe(settings.events.tabsChanged, (tabName: string) => {
      if (tabName === 'home') {
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

    this.mapItemBarSubscription = this.mapItemBar.isVisible.subscribe((isVisible) => {
      this.mapItemBarVisible = isVisible;
    });

    this.tripLoggerService.getTripLogAsObservable().subscribe((tripLogItems) => {
      this.tripLogLayer.clearLayers();
      const latLngs = tripLogItems.map((tripLogItem) => L.latLng({
        lat: tripLogItem.latitude,
        lng: tripLogItem.longitude
      }));
      L.polyline(latLngs, { color: 'red', weight: 3 }).addTo(this.tripLogLayer);
    });
  }

  async onMapReady(map: L.Map) {
    console.log('[INFO] onMapReady home page');

    this.map = map;
    this.map.on('moveend', () => this.onMapMoved());
    this.map.on('dragstart', () => this.disableFollowMode());
    this.map.on('click', () => {
      this.mapItemBar.hide();
    });
    this.userSettingService.getUserSettings().then((userSettings) => {
      this.currentGeoHazard = userSettings.currentGeoHazard;
      this.resubscribeObservations();
    });
    this.redrawMap();
  }

  ionViewDidEnter() {
    console.log('[INFO] Home page ionViewDidEnter');
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
  }

  getEmbeddedMapLayer() {
    return L.tileLayer(settings.map.tiles.embeddedUrl, {
      name: 'embedded', maxZoom: 9, minZoom: 1,
    });
  }

  getDefaultMapLayer() {

    return new OfflineTileLayer();

    // tslint:disable-next-line:max-line-length
    // return L.tileLayer(settings.map.tiles.defaultMapUrl, {
    //   name: 'topo', maxZoom: 18, minZoom: 10,
    // });
    // return L.tileLayer.wms('http://opencache.statkart.no/gatekeeper/gk/gk.open',
    //   {
    //     layers: 'norgeskart_bakgrunn',
    //     format: 'image/jpg',
    //     transparent: false,
    //     attribution: '© Kartverket',
    //     useCache: true,
    //     minZoom: 10,
    //     maxZoom: 18,
    //   });
  }

  getAlternativeMapLayer() {
    return L.tileLayer(settings.map.tiles.fallbackMapUrl, {
      name: 'open-topo', maxZoom: 18, minZoom: 1,
    });
  }

  initLoadingToast() {
    this.platform.ready().then(() => {
      this.observationService.isLoading.subscribe(async (isLoading) => {
        if (isLoading) {
          if (this.toastDismissTimeout) {
            clearTimeout(this.toastDismissTimeout);
          }
          this.toast = await this.toastController.create({
            message: 'Laster inn observasjoner',
            position: 'bottom',
            translucent: true,
          });
          this.toast.present();
        } else if (this.toast) {
          this.toastDismissTimeout = setTimeout(() => {
            this.toast.dismiss();
          }, 3000);
        }
      });
    });
  }

  private async resubscribeObservations() {
    if (this.observationSubscription) {
      this.observationSubscription.unsubscribe();
    }
    const fromDate = await this.helperService.getObservationsFromDate();
    this.observationSubscription = (await this.observationService.getObservationsAsObservable(
      this.currentGeoHazard,
      fromDate.toDate(),
      null))
      .subscribe((regObservations) => {
        this.redrawObservationMarkers(regObservations);
      });
  }

  private redrawObservationMarkers(regObservations: RegObsObservation[]) {
    this.markerLayer.clearLayers();
    regObservations.forEach((regObservation) => {
      const latLng = L.latLng(regObservation.Latitude, regObservation.Longitude);
      const marker = new MapItemMarker(regObservation, latLng, {});
      marker.on('click', (event: L.LeafletEvent) => {
        const m: MapItemMarker = event.target;
        this.mapItemBar.show(m.item);
      });
      marker.addTo(this.markerLayer);
    });
  }

  // private addMarkersIfNotExists(regObservations: RegObsObservation[]) {
  // regObservations.forEach((regObservation) => {
  //   const existingMarker = this.markers.find((marker) => marker.id === regObservation.RegId);
  //   if (!existingMarker) {
  //     const latLng = L.latLng(regObservation.Latitude, regObservation.Longitude);
  //     const marker = new MapItemMarker(regObservation, latLng, {});
  //     marker.on('click', (event: L.LeafletEvent) => {
  //       const m: MapItemMarker = event.target;
  //       this.mapItemBar.show(m.item);
  //     });
  //     this.markers.push(marker);
  //   }
  //   this.redrawObservationMarkers();
  // });
  // }

  // private redrawObservationMarkers() {
  //   this.markerLayer.clearLayers();
  //   this.markers.filter((marker) => marker.item.GeoHazardTid === this.currentGeoHazard)
  //     .forEach((marker) => marker.addTo(this.markerLayer));
  // }

  centerMapToUser() {
    this.followMode = true;
    if (this.userMarker) {
      const currentPosition = this.userMarker.getPosition();
      this.map.panTo(L.latLng(currentPosition.coords.latitude, currentPosition.coords.longitude));
    }
  }

  private async onMapMoved() {
    console.log('map moved');
    this.helperService.setCurrentMapView(this.map.getBounds(), this.map.getCenter());
    // const center = this.map.getCenter();
    // const isInNorway: boolean = leafletPip.pointInLayer(center, NORWEGIAN_BORDER).length > 0;
    // console.log('[INFO] Is in norway: ', isInNorway);
    // if (isInNorway) {
    //   this.useDefaultMapLayer();
    // } else {
    //   this.useAlternativeMapLayer();
    // }
  }

  // private useAlternativeMapLayer() {
  //   this.map.removeLayer(this.embeddedMapLayer);
  //   this.map.removeLayer(this.defaultMapLayer);
  //   this.alternativeMapLayer = this.getAlternativeMapLayer()
  //     .addTo(this.map);
  // }

  // private useDefaultMapLayer() {
  //   this.map.removeLayer(this.alternativeMapLayer);
  //   this.embeddedMapLayer = this.getEmbeddedMapLayer().addTo(this.map);
  //   this.defaultMapLayer = this.getDefaultMapLayer().addTo(this.map);
  // }

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
        { maximumAge: 60000, enableHighAccuracy: true }
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

  async showFabMenu(event: Event) {
    const popover = await this.popoverController.create({
      component: PopoverMenuComponent,
      translucent: false,
      mode: 'md',
      event: event,
      showBackdrop: true,
      cssClass: 'menu-popover'
    });
    popover.onWillDismiss().then(() => {
      console.log('dismissed');
      this.menuFab.close();
    });
    return await popover.present();
  }
}
