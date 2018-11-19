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
import { Events } from '@ionic/angular';
import { MapSearchResponse } from '../../services/map-search/map-search-response.model';
import { take } from 'rxjs/operators';
import { AppCountry } from '../../../../core/models/app-country.enum';

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
  @Input() followMode = true;
  @Output() followModeChange = new EventEmitter();
  loaded = false;

  private map: L.Map;
  private tilesLayer = L.layerGroup();
  private userMarker: UserMarker;
  private firstPositionUpdate = true;

  private userSettingSubscription: Subscription;
  private geoLoactionSubscription: Subscription;

  constructor(
    private userSettingService: UserSettingService,
    private offlineMapService: OfflineMapService,
    private mapService: MapService,
    private platform: Platform,
    private zone: NgZone,
    private geolocation: Geolocation,
    private events: Events,
  ) { }

  options: L.MapOptions = {
    zoom: this.zoom !== undefined ? this.zoom : settings.map.tiles.embeddedUrlMaxZoom,
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
        const currentView = await this.mapService.mapViewObservable$.pipe(take(1)).toPromise();
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
    if (this.userSettingSubscription) {
      this.userSettingSubscription.unsubscribe();
    }
    this.stopGeoLocationWatch();
    this.events.unsubscribe(settings.events.centerMapToUser);
    this.events.unsubscribe(settings.events.mapSearchItemClicked);
  }

  onLeafletMapReady(map: L.Map) {
    this.map = map;
    if (this.showScale) {
      L.control.scale({ imperial: false }).addTo(map);
    }
    this.tilesLayer.addTo(this.map);

    this.userSettingSubscription = this.userSettingService.userSettingObservable$.subscribe((userSetting) => {
      this.configureTileLayers(userSetting);
    });


    if (this.showUserLocation) {
      this.startGeoLocationWatch();
      this.zone.runOutsideAngular(() => {
        this.map.on('dragstart', () => this.disableFollowMode());
      });
    }

    this.events.subscribe(settings.events.centerMapToUser, () => this.centerMapToUser());

    this.events.subscribe(settings.events.mapSearchItemClicked, (item: MapSearchResponse) => {
      this.zone.runOutsideAngular(() => {
        this.disableFollowMode();
        this.map.flyTo(item.latlng, settings.map.mapSearchZoomToLevel);
      });
    });

    this.zone.runOutsideAngular(() => {
      this.map.on('moveend', () =>
        this.mapService.updateMapView({
          bounds: this.map.getBounds(),
          center: this.map.getCenter(),
          zoom: this.map.getZoom(),
        })
      );
    });

    this.redrawMap();
    this.mapReady.emit(this.map);
  }

  private disableFollowMode() {
    this.followMode = false;
    this.followModeChange.emit(this.followMode);
  }

  centerMapToUser() {
    this.zone.runOutsideAngular(() => {
      this.followMode = true;
      this.followModeChange.emit(this.followMode);
      if (this.userMarker) {
        const currentPosition = this.userMarker.getPosition();
        this.map.panTo(L.latLng(currentPosition.coords.latitude, currentPosition.coords.longitude));
      }
    });
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
          if (supportTile.geoHazardId === userSetting.currentGeoHazard
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
        console.warn('Could not invalidate map size');
      }
    }
    window.dispatchEvent(new Event('resize'));
  }

  ngAfterViewInit(): void {
    this.redrawMap();
  }

  startGeoLocationWatch() {
    console.log('[INFO] Start watching location changes');
    if (this.geoLoactionSubscription === undefined || this.geoLoactionSubscription.closed) {
      this.geoLoactionSubscription = this.geolocation.watchPosition(settings.gps.currentPositionOptions)
        .subscribe(
          (data) => this.onPositionUpdate(data),
          (error) => this.onPositionError(error)
        );
    }
  }

  stopGeoLocationWatch() {
    console.log('[INFO] Stop watching location changes');
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
          if (this.firstPositionUpdate) {
            this.firstPositionUpdate = false;
            this.map.flyTo(latLng, Math.max(settings.map.flyToOnGpsZoom, this.map.getZoom()));
          } else {
            this.map.panTo(latLng);
          }
        }
      }
    });
  }

  private onPositionError(error: any) {
    // TODO: Handle error
    console.log(error);
  }
}
