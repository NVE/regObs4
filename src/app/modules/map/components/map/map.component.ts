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
  @Output() mapReady: EventEmitter<L.Map> = new EventEmitter();
  @Output() positionChange: EventEmitter<Geoposition> = new EventEmitter();

  private map: L.Map;
  private tilesLayer = L.layerGroup();
  private userMarker: UserMarker;
  private followMode = true;
  private firstPositionUpdate = true;

  private userSettingSubscription: Subscription;
  private geoLoactionSubscription: Subscription;

  private topoTilesLayer: L.TileLayer;

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
    zoom: 5,
    maxZoom: 19,
    center: L.latLng(59.911197, 10.741059),
    bounceAtZoomLimits: true,
    attributionControl: false,
    zoomControl: false,
  };

  ngOnInit() {
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
    this.topoTilesLayer = new OfflineTileLayer(
      'topo',
      this.zone,
      this.offlineMapService,
      this.mapService,
      this.platform);
    this.tilesLayer.addTo(this.map);
    this.topoTilesLayer.addTo(this.tilesLayer);

    if (this.showSupportMaps) {
      this.userSettingSubscription = this.userSettingService.userSettingObservable$.subscribe((userSetting) => {
        this.configureTileLayers(userSetting);
      });
    }

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
        this.mapService.updateMapView({ bounds: this.map.getBounds(), center: this.map.getCenter() })
      );
    });

    this.mapReady.emit(this.map);
  }

  private disableFollowMode() {
    this.followMode = false;
  }

  centerMapToUser() {
    this.zone.runOutsideAngular(() => {
      this.followMode = true;
      if (this.userMarker) {
        const currentPosition = this.userMarker.getPosition();
        this.map.panTo(L.latLng(currentPosition.coords.latitude, currentPosition.coords.longitude));
      }
    });
  }

  configureTileLayers(userSetting: UserSetting) {
    this.tilesLayer.clearLayers();
    this.topoTilesLayer.addTo(this.tilesLayer);
    const supportTiles = userSetting.supportTiles || settings.map.tiles.supportTiles;
    for (const supportTile of supportTiles) {
      if (supportTile.geoHazardId === userSetting.currentGeoHazard && supportTile.enabled) {
        const tile = L.tileLayer(supportTile.url);
        tile.setOpacity(supportTile.opacity);
        tile.addTo(this.tilesLayer);
      }
    }
  }

  redrawMap() {
    if (this.map) {
      this.map.invalidateSize();
    }
    window.dispatchEvent(new Event('resize'));
  }

  ngAfterViewInit(): void {
    this.redrawMap();
  }

  private startGeoLocationWatch() {
    console.log('[INFO] Start watching location changes');
    if (this.geoLoactionSubscription === undefined || this.geoLoactionSubscription.closed) {
      this.geoLoactionSubscription = this.geolocation.watchPosition(settings.gps.currentPositionOptions)
        .subscribe(
          (data) => this.onPositionUpdate(data),
          (error) => this.onPositionError(error)
        );
    }
  }

  private stopGeoLocationWatch() {
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
            this.map.flyTo(latLng, Math.max(15, this.map.getZoom()));
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
