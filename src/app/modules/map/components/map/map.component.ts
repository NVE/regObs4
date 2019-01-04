import { Component, OnInit, Input, NgZone, OnDestroy, AfterViewInit, Output, EventEmitter } from '@angular/core';
import * as L from 'leaflet';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { Subscription } from 'rxjs';
import { OfflineTileLayer } from '../../../../core/helpers/leaflet/offline-tile-layer/offline-tile-layer';
import { OfflineMapService } from '../../../../core/services/offline-map/offline-map.service';
import { Platform } from '@ionic/angular';
import { UserSetting } from '../../../../core/models/user-settings.model';
import { settings } from '../../../../../settings';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { UserMarker } from '../../../../core/helpers/leaflet/user-marker/user-marker';
import { MapService } from '../../services/map/map.service';
import { take } from 'rxjs/operators';
import { AppCountry } from '../../../../core/models/app-country.enum';
import { FullscreenService } from '../../../../core/services/fullscreen/fullscreen.service';
import { LoggingService } from '../../../shared/services/logging/logging.service';
import { MapSearchService } from '../../services/map-search/map-search.service';

const DEBUG_TAG = 'MapComponent';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() showMapControls = true;
  @Input() showUserLocation = true;
  @Input() showScale = true;
  @Input() showSupportMaps = true;
  @Input() center: L.LatLng;
  @Input() zoom: number;
  @Output() mapReady: EventEmitter<L.Map> = new EventEmitter();
  @Output() positionChange: EventEmitter<Geoposition> = new EventEmitter();
  loaded = false;

  private map: L.Map;
  private tilesLayer = L.layerGroup();
  private userMarker: UserMarker;
  private firstPositionUpdate = true;
  private skipNextMapViewUpdate = false;

  private geoLoactionSubscription: Subscription;
  private subscriptions: Subscription[] = [];

  private followMode = true;
  private skipDisableFollowMode = false;

  constructor(
    private userSettingService: UserSettingService,
    private offlineMapService: OfflineMapService,
    private mapService: MapService,
    private mapSearchService: MapSearchService,
    private platform: Platform,
    private zone: NgZone,
    private geolocation: Geolocation,
    private fullscreenService: FullscreenService,
    private loggingService: LoggingService,
  ) {
  }

  options: L.MapOptions = {
    zoom: this.zoom !== undefined ? this.zoom : settings.map.tiles.embeddedUrlMaxZoomWorld,
    maxZoom: settings.map.tiles.maxZoom,
    minZoom: 2,
    center: this.center || L.latLng(settings.map.unknownMapCenter as L.LatLngTuple),
    bounceAtZoomLimits: true,
    attributionControl: false,
    zoomControl: false,
  };

  async ngOnInit() {
    try {
      if (this.center === undefined || this.zoom === undefined) {
        const currentView = await this.mapService.mapView$.pipe(take(1)).toPromise();
        if (currentView) {
          this.firstPositionUpdate = false;
          if (this.center === undefined) {
            this.options.center = currentView.center;
          }
          if (this.zoom === undefined) {
            this.options.zoom = currentView.zoom;
          }
        }
      }
    } finally {
      this.loaded = true;
    }

  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
    this.stopGeoLocationWatch();
  }

  onLeafletMapReady(map: L.Map) {
    this.map = map;
    if (this.showScale) {
      L.control.scale({ imperial: false }).addTo(map);
    }
    this.tilesLayer.addTo(this.map);

    this.subscriptions.push(this.userSettingService.userSettingObservable$.subscribe((userSetting) => {
      this.configureTileLayers(userSetting);
    }));

    this.subscriptions.push(this.mapService.followMode$.subscribe((val) => {
      this.followMode = val;
    }));

    this.subscriptions.push(this.mapSearchService.mapSearchClick$.subscribe((item) => {
      this.disableFollowMode();
      this.zone.runOutsideAngular(() => {
        this.map.flyTo(item.latlng, settings.map.mapSearchZoomToLevel);
      });
    }));

    this.subscriptions.push(this.mapService.centerMapToUser$.subscribe(() => {
      if (this.userMarker) {
        const currentPosition = this.userMarker.getPosition();
        const latLng = L.latLng(currentPosition.coords.latitude, currentPosition.coords.longitude);
        this.zone.runOutsideAngular(() => {
          this.skipDisableFollowMode = true;
          this.map.flyTo(latLng, Math.max(settings.map.flyToOnGpsZoom, this.map.getZoom()));
          this.skipDisableFollowMode = false;
        });
      }
    }));

    if (this.showUserLocation) {
      this.startGeoLocationWatch();
      this.zone.runOutsideAngular(() => {
        this.map.on('dragstart', () => this.disableFollowMode());
        this.map.on('zoomstart', () => this.disableFollowMode());
      });
    }

    this.subscriptions.push(this.platform.pause.subscribe(() => this.stopGeoLocationWatch()));
    this.subscriptions.push(this.platform.resume.subscribe(() => {
      if (this.showUserLocation) {
        this.startGeoLocationWatch();
      }
    }));

    this.zone.runOutsideAngular(() => {
      this.map.on('moveend', () => this.updateMapView());
      this.map.on('zoomend', () => this.updateMapView());
    });

    this.subscriptions.push(this.fullscreenService.isFullscreen$.subscribe(() => {
      this.redrawMap();
    }));

    this.redrawMap();
    this.mapReady.emit(this.map);
  }

  private disableFollowMode() {
    if (!this.skipDisableFollowMode) {
      this.mapService.followMode = false;
    }
  }

  private updateMapView() {
    if (!this.skipNextMapViewUpdate && this.map) {
      this.mapService.updateMapView({
        bounds: this.map.getBounds(),
        center: this.map.getCenter(),
        zoom: this.map.getZoom(),
      });
    }
    this.skipNextMapViewUpdate = false;
  }

  configureTileLayers(userSetting: UserSetting) {
    this.zone.runOutsideAngular(() => {
      this.tilesLayer.clearLayers();
      const topoTilesLayer = new OfflineTileLayer(
        'topo',
        settings.map.tiles.defaultMapUrl,
        userSetting.tilesCacheSize > 0,
        this.zone,
        this.offlineMapService,
        this.mapService,
        this.platform,
        true,
        settings.map.tiles.zoomToShowBeforeNorwegianDetailsMap,
        settings.map.tiles.nowegianDetailsMapUrl,
        true,
        settings.map.tiles.embeddedUrl,
        settings.map.tiles.embeddedUrlMaxZoomWorld,
        settings.map.tiles.embeddedUrlMaxZoomNorway,
      );
      topoTilesLayer.addTo(this.tilesLayer);
      if (userSetting.country === AppCountry.norway) {
        const supportTiles = settings.map.tiles.supportTiles;
        for (const supportTile of supportTiles) {
          const userSettingsForSupportTime = userSetting.supportTiles.find((x) => x.name === supportTile.name);
          if (userSetting.currentGeoHazard.indexOf(supportTile.geoHazardId) >= 0
            && (!userSettingsForSupportTime || userSettingsForSupportTime.enabled)) {
            const tile = new OfflineTileLayer(
              supportTile.name,
              supportTile.url,
              userSetting.tilesCacheSize > 0,
              this.zone,
              this.offlineMapService,
              this.mapService,
              this.platform
            );
            tile.setOpacity(userSettingsForSupportTime ? userSettingsForSupportTime.opacity : supportTile.opacity);
            tile.addTo(this.tilesLayer);
          }
        }
      }
    });
  }

  redrawMap() {
    if (this.map) {
      try {
        this.map.invalidateSize();
      } catch (err) {
        this.loggingService.debug('Could not invalidate map size', DEBUG_TAG);
      }
    }
    window.dispatchEvent(new Event('resize'));
  }

  ngAfterViewInit(): void {
    this.redrawMap();
  }

  startGeoLocationWatch() {
    this.loggingService.debug('Start watching location changes', DEBUG_TAG);
    if (this.geoLoactionSubscription === undefined || this.geoLoactionSubscription.closed) {
      this.geoLoactionSubscription = this.geolocation.watchPosition(settings.gps.currentPositionOptions)
        .subscribe(
          (data) => this.onPositionUpdate(data),
          (error) => this.onPositionError(error)
        );
    } else {
      this.loggingService.debug('Geolocation service allready running', DEBUG_TAG);
    }
  }

  stopGeoLocationWatch() {
    this.loggingService.debug('Stop watching location changes', DEBUG_TAG);
    if (this.geoLoactionSubscription !== undefined && !this.geoLoactionSubscription.closed) {
      this.geoLoactionSubscription.unsubscribe();
    }
  }

  private onPositionUpdate(data: Geoposition) {
    this.positionChange.emit(data);
    this.zone.runOutsideAngular(() => {
      if (data.coords && this.map) {
        const latLng = L.latLng({ lat: data.coords.latitude, lng: data.coords.longitude });
        if (!this.userMarker) {
          this.userMarker = new UserMarker(this.map, data);
        } else {
          this.userMarker.updatePosition(data);
        }
        if (this.followMode) {
          this.skipDisableFollowMode = true;
          if (this.firstPositionUpdate) {
            this.firstPositionUpdate = false;
            this.map.flyTo(latLng, Math.max(settings.map.flyToOnGpsZoom, this.map.getZoom()));
          } else {
            this.skipNextMapViewUpdate = this.map.getCenter().distanceTo(latLng) < 10;
            // NOTE: Skip updating map view if followmode and distance update is less than 10 meters.
            this.map.panTo(latLng);
          }
          this.skipDisableFollowMode = false;
        }
      }
    });
  }

  private onPositionError(error: any) {
    this.loggingService.error(error, DEBUG_TAG, 'Got error from GeoLoaction watchPosition');
  }
}
