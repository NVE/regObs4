import { Component, OnInit, Input, NgZone, OnDestroy, AfterViewInit, Output, EventEmitter } from '@angular/core';
import * as L from 'leaflet';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { Subscription } from 'rxjs';
import { Platform } from '@ionic/angular';
import { UserSetting } from '../../../../core/models/user-settings.model';
import { settings } from '../../../../../settings';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { UserMarker } from '../../../../core/helpers/leaflet/user-marker/user-marker';
import { MapService } from '../../services/map/map.service';
import { take } from 'rxjs/operators';
import { FullscreenService } from '../../../../core/services/fullscreen/fullscreen.service';
import { LoggingService } from '../../../shared/services/logging/logging.service';
import { MapSearchService } from '../../services/map-search/map-search.service';
import { TopoMap } from '../../../../core/models/topo-map.enum';
import { RegObsTileLayer, IRegObsTileLayerOptions } from '../../core/classes/regobs-tile-layer';
import '../../../../core/helpers/ionic/platform-helper';
import { NORWEGIAN_BOUNDS } from '../../../../core/helpers/leaflet/border-helper';
import { OfflineMapService } from '../../../../core/services/offline-map/offline-map.service';

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

  private geoLoactionSubscription: Subscription;
  private subscriptions: Subscription[] = [];

  private followMode = true;
  private isDoingMoveAction = false;
  private firstClickOnZoomToUser = true;
  private isActive = false;
  private isAskingForPermissions = false;

  private setHeadingFunc: (event: DeviceOrientationEvent) => void;

  constructor(
    private userSettingService: UserSettingService,
    private mapService: MapService,
    private offlineMapService: OfflineMapService,
    private mapSearchService: MapSearchService,
    private platform: Platform,
    private zone: NgZone,
    private geolocation: Geolocation,
    private fullscreenService: FullscreenService,
    private loggingService: LoggingService,
  ) {
    this.setHeadingFunc = this.setHeading.bind(this);
  }

  options: L.MapOptions = {
    zoom: this.zoom !== undefined ? this.zoom : settings.map.tiles.defaultZoom,
    maxZoom: settings.map.tiles.maxZoom,
    minZoom: settings.map.tiles.minZoom,
    center: this.center || L.latLng(settings.map.unknownMapCenter as L.LatLngTuple),
    bounceAtZoomLimits: false,
    attributionControl: false,
    zoomControl: false,
    maxBounds: new L.LatLngBounds(new L.LatLng(90.0, -180.0), new L.LatLng(-90, 180.0)),
    maxBoundsViscosity: 1.0,
  };

  async ngOnInit() {
    try {
      if (this.center === undefined || this.zoom === undefined) {
        const currentView = await this.mapService.mapView$.pipe(take(1)).toPromise();
        if (currentView && currentView.center) {
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
    if (this.map) {
      this.map.remove();
    }
  }

  onLeafletMapReady(map: L.Map) {
    this.map = map;
    if (this.showScale) {
      L.control.scale({ imperial: false }).addTo(map);
    }
    this.tilesLayer.addTo(this.map);

    this.subscriptions.push(this.userSettingService.userSettingObservable$.subscribe((userSetting) => {
      this.configureTileLayers(userSetting);
      if (userSetting.showMapCenter) {
        this.updateMapView();
      }
    }));

    this.subscriptions.push(this.mapService.followMode$.subscribe((val) => {
      this.followMode = val;
      this.loggingService.debug(`Follow mode changed to: ${this.followMode}`, DEBUG_TAG);
    }));

    this.subscriptions.push(this.mapSearchService.mapSearchClick$.subscribe((item) => {
      this.disableFollowMode();
      this.zone.runOutsideAngular(() => {
        const latLng = item instanceof L.LatLng ? item : item.latlng;
        this.flyTo(latLng, settings.map.mapSearchZoomToLevel);
      });
    }));

    this.subscriptions.push(this.mapService.centerMapToUser$.subscribe(() => {
      this.zone.runOutsideAngular(() => {
        if (this.userMarker) {
          const currentPosition = this.userMarker.getPosition();
          const latLng = L.latLng(currentPosition.coords.latitude, currentPosition.coords.longitude);
          if (this.followMode || this.firstClickOnZoomToUser) {
            // Follow mode is allready true or first click, zoom in
            this.flyToMaxZoom(latLng);
          } else {
            // Use existing zoom
            this.flyTo(latLng, this.map.getZoom(), true);
          }
          this.firstClickOnZoomToUser = false;
        }
      });
    }));

    this.zone.runOutsideAngular(() => {
      this.map.on('movestart', () => this.onMapMove());
      this.map.on('zoomstart', () => this.onMapMove());
    });

    this.subscriptions.push(this.platform.pause.subscribe(() => this.stopGeoLocationWatch()));
    this.subscriptions.push(this.platform.resume.subscribe(() => {
      if (this.isActive && !this.isAskingForPermissions) {
        this.startGeoLocationWatch();
      }
    }));

    this.zone.runOutsideAngular(() => {
      this.map.on('moveend', () => this.onMapMoveEnd());
    });

    this.subscriptions.push(this.fullscreenService.isFullscreen$.subscribe(() => {
      this.redrawMap();
    }));

    // TODO: Implement compass needs calibration alert?
    //   window.addEventListener('compassneedscalibration', function(event) {
    //     // ask user to wave device in a figure-eight motion
    //     event.preventDefault();
    // }, true);

    this.startGeoLocationWatch();

    this.map.on('resize', () => this.updateMapView());
    this.isActive = true;
    this.redrawMap();
    this.mapReady.emit(this.map);
  }

  activateUpdates() {
    this.isActive = true;
    this.startGeoLocationWatch();
    this.redrawMap();
  }

  disableUpdates() {
    this.isActive = false;
    this.stopGeoLocationWatch();
  }

  private onMapMove() {
    this.disableFollowMode();
    this.offlineMapService.shouldProcessOfflineImage(false);
  }

  private onMapMoveEnd() {
    this.updateMapView();
    this.offlineMapService.shouldProcessOfflineImage(true);
  }

  private disableFollowMode() {
    if (!this.isDoingMoveAction) {
      this.loggingService.debug('Disable follow mode!', DEBUG_TAG);
      this.mapService.followMode = false;
    } else {
      this.loggingService.debug('Did not disable follow mode, because isDoingMoveAction', DEBUG_TAG);
    }
  }

  private updateMapView() {
    if (this.map && this.isActive) {
      this.mapService.updateMapView({
        bounds: this.map.getBounds(),
        center: this.map.getCenter(),
        zoom: this.map.getZoom(),
      });
    }
  }

  private getTileLayerDefaultOptions(userSetting: UserSetting): IRegObsTileLayerOptions {
    return {
      minZoom: settings.map.tiles.minZoom,
      maxZoom: this.getMaxZoom(userSetting.useRetinaMap),
      maxNativeZoom: settings.map.tiles.maxZoom,
      detectRetina: userSetting.useRetinaMap,
      updateWhenIdle: settings.map.tiles.updateWhenIdle,
      edgeBufferTiles: settings.map.tiles.edgeBufferTiles,
      saveTilesToCache: userSetting.tilesCacheSize > 0,
      saveCacheTileFunc: (id, tile) => this.offlineMapService.saveTileToOfflineCache(id, tile),
      getCacheTileFunc: (id) => this.offlineMapService.getCachedTileDataUrl(id)
    };
  }

  configureTileLayers(userSetting: UserSetting) {
    this.zone.runOutsideAngular(() => {
      this.tilesLayer.clearLayers();
      this.map.setMaxZoom(this.getMaxZoom(userSetting.useRetinaMap));
      const mapOptions = this.getMapOptions(userSetting.topoMap);
      for (const topoMap of mapOptions) {
        const topoTilesLayer = new RegObsTileLayer(
          topoMap.name,
          topoMap.url,
          {
            ...this.getTileLayerDefaultOptions(userSetting),
            bounds: topoMap.bounds,
            excludeBounds: topoMap.notInsideBounds,
          }
        );
        topoTilesLayer.addTo(this.tilesLayer);
      }

      for (const supportTile of settings.map.tiles.supportTiles) {
        const userSettingsForSupportTime = userSetting.supportTiles.find((x) => x.name === supportTile.name);
        if (userSetting.currentGeoHazard.indexOf(supportTile.geoHazardId) >= 0
          && (!userSettingsForSupportTime || userSettingsForSupportTime.enabled)) {
          const supportMapTileLayer = new RegObsTileLayer(
            supportTile.name,
            supportTile.url,
            {
              ...this.getTileLayerDefaultOptions(userSetting),
              updateInterval: 600,
              keepBuffer: 0,
              updateWhenIdle: true,
              minZoom: settings.map.tiles.minZoomSupportMaps,
              bounds: <any>settings.map.tiles.supportTilesBounds,
            }
          );
          supportMapTileLayer.setOpacity(userSettingsForSupportTime ? userSettingsForSupportTime.opacity : supportTile.opacity);
          supportMapTileLayer.addTo(this.tilesLayer);
        }
      }
    });
  }

  private getMaxZoom(detectRetina: boolean) {
    return (detectRetina && L.Browser.retina) ? (settings.map.tiles.maxZoom + 2) : settings.map.tiles.maxZoom;
  }

  private getMapOptions(topoMap: TopoMap) {
    const norwegianMixedMap = {
      name: TopoMap.statensKartverk,
      url: settings.map.tiles.statensKartverkMapUrl,
      bounds: <any>settings.map.tiles.supportTilesBounds,
      notInsideBounds: null,
    };
    const openTopoMap = {
      name: TopoMap.openTopo,
      url: settings.map.tiles.openTopoMapUrl,
      bounds: null,
      notInsideBounds: null,
    };
    const arcGisOnlineMap = {
      name: TopoMap.arcGisOnline,
      url: settings.map.tiles.arcGisOnlineTopoMapUrl,
      bounds: null,
      notInsideBounds: null,
    };
    switch (topoMap) {
      case TopoMap.statensKartverk:
        return [
          {
            name: TopoMap.statensKartverk,
            url: settings.map.tiles.statensKartverkMapUrl,
            bounds: null,
            notInsideBounds: null,
          }
        ];
      case TopoMap.openTopo:
        return [openTopoMap];
      case TopoMap.arcGisOnline:
        return [arcGisOnlineMap];
      case TopoMap.mixOpenTopo:
        return [{ ...openTopoMap, notInsideBounds: NORWEGIAN_BOUNDS }, norwegianMixedMap];
      case TopoMap.mixArcGisOnline:
        return [{ ...arcGisOnlineMap, notInsideBounds: NORWEGIAN_BOUNDS }, norwegianMixedMap];
    }
  }

  redrawMap() {
    setTimeout(() => {
      if (this.map) {
        try {
          this.map.invalidateSize();
        } catch (err) {
          this.loggingService.debug('Could not invalidate map size', DEBUG_TAG);
        }
      }
      window.dispatchEvent(new Event('resize'));
    }, 0);
  }

  ngAfterViewInit(): void {
  }

  private startGeoLocationWatch() {
    if (this.showUserLocation && !this.isAskingForPermissions) {
      this.loggingService.debug('Start watching location changes', DEBUG_TAG);
      if (this.geoLoactionSubscription === undefined || this.geoLoactionSubscription.closed) {
        this.isAskingForPermissions = true;
        // TODO: Start with low accuracy and when that is success, start watching high accuracy?
        this.geoLoactionSubscription = this.geolocation.watchPosition(settings.gps.currentPositionOptions)
          .subscribe(
            (data) => this.onPositionUpdate(data),
            (error) => this.onPositionError(error)
          );
      } else {
        this.loggingService.debug('Geolocation service allready running', DEBUG_TAG);
      }
      if ('ondeviceorientationabsolute' in <any>window) {
        window.addEventListener('deviceorientationabsolute', this.setHeadingFunc, false);
      } else if ('ondeviceorientation' in <any>window) {
        window.addEventListener('deviceorientation', this.setHeadingFunc, false);
      }
    }
  }

  private setHeading(event: DeviceOrientationEvent) {
    if (this.userMarker) {
      const appleHeading = (<any>event).webkitCompassHeading;
      const heading = appleHeading !== undefined ? appleHeading :
        (event.alpha !== undefined && event.absolute ? (360 - event.alpha) : undefined);
      if (heading !== undefined && heading >= 0 && heading <= 360) {
        this.userMarker.setHeading(heading);
      }
    }
  }

  private stopGeoLocationWatch() {
    if (!this.isAskingForPermissions) {
      this.loggingService.debug('Stop watching location changes', DEBUG_TAG);
      if (this.geoLoactionSubscription !== undefined && !this.geoLoactionSubscription.closed) {
        this.geoLoactionSubscription.unsubscribe();
      }
      window.removeEventListener('deviceorientation', this.setHeadingFunc);
      window.removeEventListener('deviceorientationabsolute', this.setHeadingFunc);
    }
  }

  private onPositionUpdate(data: Geoposition) {
    if (data.coords) {
      this.isAskingForPermissions = false;
      this.positionChange.emit(data);
      this.zone.runOutsideAngular(() => {
        if (this.map) {
          const latLng = L.latLng({ lat: data.coords.latitude, lng: data.coords.longitude });
          if (!this.userMarker) {
            this.userMarker = new UserMarker(this.map, data);
          } else {
            this.userMarker.updatePosition(data);
          }
          if (this.followMode && !this.isDoingMoveAction) {
            this.flyToMaxZoom(latLng, !this.firstPositionUpdate);
            this.firstPositionUpdate = false;
          }
        }
      });
    } else {
      const error = data as unknown as PositionError;
      if (error && error.PERMISSION_DENIED === 1) {
        this.loggingService.debug('Permission denied for location service', DEBUG_TAG);
      } else {
        this.isAskingForPermissions = false;
      }
    }
  }

  private flyToMaxZoom(latLng: L.LatLng, usePan = false) {
    this.flyTo(latLng, Math.max(settings.map.flyToOnGpsZoom, this.map.getZoom()), usePan);
  }

  private flyTo(latLng: L.LatLng, zoom: number, usePan = false) {
    this.isDoingMoveAction = true;
    // if (usePan) {
    //   this.map.panTo(latLng);
    // } else {
    //   this.map.flyTo(latLng, zoom);
    // }
    // Note: Poor performance on flyTo effect, so using setView without animate instead.
    this.map.setView(latLng, zoom, { animate: false });
    this.isDoingMoveAction = false;
  }

  private onPositionError(error: any) {
    this.isAskingForPermissions = false;
    this.loggingService.error(error, DEBUG_TAG, 'Got error from GeoLoaction watchPosition');
  }
}
