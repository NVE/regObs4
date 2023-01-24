import {
  Component,
  OnInit,
  Input,
  NgZone,
  OnDestroy,
  AfterViewInit,
  Output,
  EventEmitter,
  Injector,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Capacitor } from '@capacitor/core';
import * as L from 'leaflet';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { timer, Subject, from, BehaviorSubject, combineLatest, race } from 'rxjs';
import { UserSetting } from '../../../../core/models/user-settings.model';
import { settings } from '../../../../../settings';
import { Position } from '@capacitor/geolocation';
import { UserMarker } from '../../../../core/helpers/leaflet/user-marker/user-marker';
import { MapService } from '../../services/map/map.service';
import { take, takeUntil, switchMap, distinctUntilChanged, withLatestFrom, filter } from 'rxjs/operators';
import { FullscreenService } from '../../../../core/services/fullscreen/fullscreen.service';
import { LoggingService } from '../../../shared/services/logging/logging.service';
import { MapSearchService } from '../../services/map-search/map-search.service';
import { TopoMap } from '../../../../core/models/topo-map.enum';
import {
  RegObsTileLayer,
  IRegObsTileLayerOptions,
  RegObsOfflineAwareTileLayer,
} from '../../core/classes/regobs-tile-layer';
import { OfflineMapService } from '../../../../core/services/offline-map/offline-map.service';
import { GeoPositionService } from '../../../../core/services/geo-position/geo-position.service';
import { isAndroidOrIos } from 'src/app/core/helpers/ionic/platform-helper';
import { Platform } from '@ionic/angular';
import { OfflineMapPackage, OfflineTilesMetadata } from 'src/app/core/services/offline-map/offline-map.model';
import { MapZoomService } from '../../services/map/map-zoom.service';
import { MapLayerZIndex } from 'src/app/core/models/maplayer-zindex.enum';
import { TopoMapLayer } from 'src/app/core/models/topo-map-layer.enum';
import { ObserverTripsService } from 'src/app/core/services/observer-trips/observer-trips.service';
import { FeatureCollection } from '@turf/turf';

const DEBUG_TAG = 'MapComponent';

const noObserverTripDescription = 'Turen har ikke beskrivelse';
const observerTripsMinZoom = 10;

const isTopoMapLayer = (mapId: string) => (<string[]>Object.values(TopoMapLayer)).includes(mapId);
const redrawLayersInLayerGroup = (layerGroup: L.LayerGroup) => {
  layerGroup.eachLayer((layer) => {
    if (layer instanceof L.TileLayer) {
      layer.redraw();
    }
  });
};

// Bug in leaflet? When using detectRetina, we need to offset native zooms.
const getNativeZoomOptions = (map: OfflineTilesMetadata, detectRetina: boolean): L.TileLayerOptions => {
  if (detectRetina) {
    return {
      minNativeZoom: Math.max(0, map.rootTile.z - 1),
      maxNativeZoom: Math.max(0, map.zMax - 1),
    };
  } else {
    return {
      minNativeZoom: map.rootTile.z,
      maxNativeZoom: map.zMax,
    };
  }
};

const DEFAULT_BASEMAP = settings.map.tiles.topoMaps[TopoMap.default];

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() showMapSearch = true;
  @Input() showFullscreenToggle = true;
  @Input() showGpsCenter = true;
  @Input() showScale = true;
  @Input() showSupportMaps = true;
  @Input() center: L.LatLng;
  @Input() zoom: number;
  @Output() mapReady: EventEmitter<L.Map> = new EventEmitter();
  @Input() autoActivate = true;
  @Input() geoTag = DEBUG_TAG;
  @Input() offlinePackageMode = false;
  @Input() showObserverTrips = false;

  /**
   * Set to true to show the user location in map.
   * NB: activateFollowModeOnStartup controls if the map should start following the user or not.
   */
  @Input() showUserLocation = Capacitor.isNativePlatform();
  /**
   * Set to true to start the map in follow mode.
   * This has no effect if showUserLocation is false.
   */
  @Input() activateFollowModeOnStartup = false;

  @ViewChild('observerTripsContainer') observerTripsContainer: ElementRef<HTMLDivElement>;
  observationTripName = '';
  observationTripDescription: string = null;
  private observationTripLayers: L.GeoJSON[];
  private removeObserverTripEventHandlers = new Subject<void>();

  loaded = false;
  private map: L.Map;
  private layerGroup = L.layerGroup();
  private offlineTopoLayerGroup = L.layerGroup();
  private offlineSupportMapLayerGroup = L.layerGroup();
  private userMarker: UserMarker;
  private firstPositionUpdate = true;
  private ngDestroy$ = new Subject<void>();
  private followMode = true;
  private isDoingMoveAction = false;
  private firstClickOnZoomToUser = true;
  private isActive: BehaviorSubject<boolean>;
  private offlineMapService: OfflineMapService;

  constructor(
    private userSettingService: UserSettingService,
    private mapService: MapService,
    private mapSearchService: MapSearchService,
    private zone: NgZone,
    private fullscreenService: FullscreenService,
    private loggingService: LoggingService,
    private geoPositionService: GeoPositionService,
    private platform: Platform,
    private mapZoomService: MapZoomService,
    private observerTripsService: ObserverTripsService,
    injector: Injector
  ) {
    if (isAndroidOrIos(this.platform)) {
      this.offlineMapService = injector.get(OfflineMapService);
    }

    // Hack to make sure map pane is set before getPosition
    L.Map.include({
      _getMapPanePos: function () {
        if (this._mapPane === undefined) {
          return new L.Point(0, 0);
        }
        return L.DomUtil.getPosition(this._mapPane) || new L.Point(0, 0);
      },
      _rawPanBy: function (offset) {
        if (this._mapPane) {
          L.DomUtil.setPosition(this._mapPane, this._getMapPanePos().subtract(offset));
        }
      },
    });
  }

  options: L.MapOptions;

  async ngOnInit() {
    this.mapService.showUserLocation = this.showUserLocation;
    this.mapService.followMode = this.showUserLocation && this.activateFollowModeOnStartup;

    this.options = {
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
    this.isActive = new BehaviorSubject(this.autoActivate);
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
    this.geoPositionService.stopTrackingComponent(DEBUG_TAG);
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  componentIsActive(isActive: boolean) {
    this.isActive.next(isActive);
  }

  removeObserverTripDescription() {
    this.observerTripsContainer.nativeElement.style.display = 'none';
  }

  private removeObserverTripMapLayers(map: L.Map) {
    if (this.observationTripLayers != null) {
      this.observationTripLayers.forEach((l) => {
        if (map.hasLayer(l)) {
          map.removeLayer(l);
        }
      });
    }
    this.observationTripLayers = null;
  }

  private async showOrHideObserverTripsLayer(map: L.Map, geojson: FeatureCollection) {
    if (geojson == null) {
      this.removeObserverTripMapLayers(map);
      this.removeObserverTripEventHandlers.next();
      return;
    }

    // NB: The side menu icon has the same style
    const geojsonLayer = L.geoJSON(geojson, { style: { dashArray: '4', color: 'red', stroke: true } });
    this.observationTripLayers = [geojsonLayer];
    let layerToBindClickHandlerTo: L.GeoJSON;

    if (isAndroidOrIos(this.platform)) {
      // To get a bigger tap hit radius on devices, add the geojson twice with much wider stroke
      const bgLayer = L.geoJSON(geojson, { style: { color: 'rgba(0,0,0,0)', weight: 30, stroke: true } });
      layerToBindClickHandlerTo = bgLayer;
      this.observationTripLayers.push(bgLayer);
    } else {
      layerToBindClickHandlerTo = geojsonLayer;
    }

    if (map.getZoom() >= observerTripsMinZoom) {
      this.observationTripLayers.forEach((l) => l.addTo(map));
    }

    const clickHandler = (e) => {
      this.observationTripName = e.layer?.feature?.properties?.navn;
      this.observationTripDescription = e.layer?.feature?.properties?.beskrivelse || noObserverTripDescription;
      this.observerTripsContainer.nativeElement.style.display = 'block';
    };

    const addOrRemoveLayers = () => {
      const zoomLevel = map.getZoom();
      if (zoomLevel < observerTripsMinZoom) {
        if (map.hasLayer(geojsonLayer)) {
          this.observationTripLayers.forEach((l) => map.removeLayer(l));
        }
      } else {
        if (!map.hasLayer(geojsonLayer)) {
          this.observationTripLayers.forEach((l) => map.addLayer(l));
        }
      }
    };

    layerToBindClickHandlerTo.on('click', clickHandler);
    map.on('zoomend', addOrRemoveLayers);

    // Clean up event listeners on destroy or when toggled off
    race(
      this.ngDestroy$,
      this.removeObserverTripEventHandlers,
      this.observerTripsService.toggledOn.pipe(filter((toggledOn) => !toggledOn))
    )
      .pipe(take(1))
      .subscribe(() => {
        layerToBindClickHandlerTo.off('click', clickHandler);
        map.off('zoomend', addOrRemoveLayers);
      });
  }

  onLeafletMapReady(map: L.Map) {
    //TODO: Denne metoden er altfor lang, splitte opp i flere funksjoner!
    this.map = map;
    if (this.showScale) {
      L.control.scale({ imperial: false }).addTo(map);
    }

    if (this.showObserverTrips) {
      this.observerTripsService.geojson$.pipe(takeUntil(this.ngDestroy$)).subscribe((geojson) => {
        this.showOrHideObserverTripsLayer(map, geojson);
      });
    }

    this.offlineTopoLayerGroup.addTo(this.map);
    this.layerGroup.addTo(this.map);
    this.offlineSupportMapLayerGroup.addTo(this.map);

    if (this.offlinePackageMode) {
      // Style all online maps grayscale.
      // We need the dom element that contains the layer to use css and add a grayscale filter.
      // After the load event, getContainer returns the container, earlier, it may return null or undefined.
      this.map.on('load layeradd', () => {
        this.layerGroup.eachLayer((l: L.TileLayer) => {
          if (l instanceof L.TileLayer) {
            l.getContainer().style.filter = 'grayscale(100%)';
          }
        });
      });
    }

    this.userSettingService.userSetting$.pipe(takeUntil(this.ngDestroy$)).subscribe((userSetting) => {
      this.configureTileLayers(userSetting);
      if (userSetting.showMapCenter) {
        this.updateMapView();
      }
    });

    this.mapService.followMode$.pipe(takeUntil(this.ngDestroy$)).subscribe((val) => {
      this.followMode = val;
      this.loggingService.debug(`Follow mode changed to: ${this.followMode}`, DEBUG_TAG);
    });

    this.mapService.centerMapToUser$
      .pipe(
        takeUntil(this.ngDestroy$),
        switchMap(() => from(this.geoPositionService.choosePositionMethod(DEBUG_TAG)))
      )
      .subscribe();

    this.mapSearchService.mapSearchClick$.pipe(takeUntil(this.ngDestroy$)).subscribe((item) => {
      this.disableFollowMode();
      this.zone.runOutsideAngular(() => {
        const latLng = item instanceof L.LatLng ? item : item.latlng;
        this.flyTo(latLng, settings.map.mapSearchZoomToLevel);
      });
    });

    this.mapService.centerMapToUser$.pipe(takeUntil(this.ngDestroy$)).subscribe(() => {
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
    });

    this.zone.runOutsideAngular(() => {
      this.map.on('movestart', () => this.onMapMove());
      this.map.on('zoomstart', () => this.onMapMove());
    });

    this.zone.runOutsideAngular(() => {
      this.map.on('moveend', () => this.onMapMoveEnd());
    });

    this.fullscreenService.isFullscreen$.pipe(takeUntil(this.ngDestroy$)).subscribe(() => {
      this.redrawMap();
    });

    this.mapService.showUserLocation$
      .pipe(
        filter((showUserLocation) => showUserLocation === true),
        // In subscribe, we only start some subscriptions,
        // no need to start them again if showUserLocation$ emits again.
        take(1),
        takeUntil(this.ngDestroy$)
      )
      .subscribe(() => {
        this.geoPositionService.currentPosition$
          .pipe(takeUntil(this.ngDestroy$))
          .subscribe((pos) => this.onPositionUpdate(pos));

        this.geoPositionService.currentHeading$.pipe(takeUntil(this.ngDestroy$)).subscribe((heading) => {
          if (this.userMarker) {
            this.userMarker.setHeading(heading);
          }
        });

        this.deactivateTrackingIfComponentIsInactive();
      });

    this.mapZoomService.zoomInRequest$.pipe(takeUntil(this.ngDestroy$)).subscribe(() => this.map?.zoomIn());
    this.mapZoomService.zoomOutRequest$.pipe(takeUntil(this.ngDestroy$)).subscribe(() => this.map?.zoomOut());

    this.startInvalidateSizeMapTimer();

    this.map.on('resize', () => this.updateMapView());

    if (isAndroidOrIos(this.platform)) {
      this.initOfflineMaps();
    }

    this.mapReady.emit(this.map);
  }

  private async initOfflineMaps() {
    this.loggingService.debug('initOfflineMaps()... ', DEBUG_TAG);

    combineLatest([this.offlineMapService.packages$, this.userSettingService.userSetting$])
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe(([packages, userSettings]) => {
        this.zone.runOutsideAngular(() => {
          this.createOfflineLayers(packages, userSettings);

          // When starting offline, offline map packages are
          // registered after the map initially loads.
          // By redrawing here, we can see offline tiles without
          // zooming in/out etc.
          redrawLayersInLayerGroup(this.offlineTopoLayerGroup);
          redrawLayersInLayerGroup(this.offlineSupportMapLayerGroup);
        });
      });
  }

  private tileCoordsToBounds({ x, y, z }: { x: number; y: number; z: number }): L.LatLngBounds {
    const tileSize = new L.Point(256, 256);
    const coords = new L.Point(x, y);

    const nwPoint = coords.scaleBy(tileSize);
    const sePoint = nwPoint.add(tileSize);
    const nw = this.map.unproject(nwPoint, z);
    const se = this.map.unproject(sePoint, z);
    return new L.LatLngBounds(nw, se);
  }

  private createOfflineLayers(packages: OfflineMapPackage[], userSettings: UserSetting) {
    this.offlineTopoLayerGroup.clearLayers();
    this.offlineSupportMapLayerGroup.clearLayers();

    // Create a map of enabled support tiles
    const enabledSupportMaps = this.userSettingService
      .getSupportTilesOptions(userSettings)
      .filter((supportMap) => supportMap.enabled)
      .reduce((map, supportMap) => {
        map.set(supportMap.name, supportMap);
        return map;
      }, new Map());

    // Create offline tile map layers
    for (const offlinePackage of packages) {
      for (const map of Object.values(offlinePackage.maps)) {
        if (isTopoMapLayer(map.mapId)) {
          this.createTopoMapOfflineLayer(map, userSettings.useRetinaMap);
        } else if (enabledSupportMaps.has(map.mapId)) {
          const { opacity } = enabledSupportMaps.get(map.mapId);
          this.createSupportMapOfflineLayer(map, opacity, userSettings.useRetinaMap);
        } else {
          this.loggingService.debug(
            `'${map.mapId}' is currently disabled or undefined in map config, no layer created for ${map.url}`,
            DEBUG_TAG
          );
        }
      }
    }
  }

  private createTopoMapOfflineLayer(map: OfflineTilesMetadata, detectRetina: boolean) {
    const bounds = this.tileCoordsToBounds(map.rootTile);
    const url = `${map.url}/{z}/{x}/{y}.png`;
    const nativeZoomOptions = getNativeZoomOptions(map, detectRetina);

    const layer = new L.TileLayer(url, {
      ...nativeZoomOptions,
      bounds,
      // When in offlinePackageMode / on offline-map.page.ts,
      // always put offline packages on top so they display above
      // the grayscale background-map
      zIndex: this.offlinePackageMode ? MapLayerZIndex.Top : MapLayerZIndex.OfflineBackgroundLayer,
      detectRetina,
    });
    this.offlineTopoLayerGroup.addLayer(layer);
  }

  private createSupportMapOfflineLayer(map: OfflineTilesMetadata, opacity: number, detectRetina: boolean) {
    const bounds = this.tileCoordsToBounds(map.rootTile);
    const url = `${map.url}/{z}/{x}/{y}.png`;
    const nativeZoomOptions = getNativeZoomOptions(map, detectRetina);
    const layer = new L.TileLayer(url, {
      ...nativeZoomOptions,
      bounds,
      opacity,
      // When in offlinePackageMode / on offline-map.page.ts,
      // always put offline packages on top so they display above
      // the grayscale background-map
      zIndex: this.offlinePackageMode ? MapLayerZIndex.Top + 1 : MapLayerZIndex.OfflineSupportLayer,
      detectRetina,
    });
    this.offlineSupportMapLayerGroup.addLayer(layer);
  }

  private deactivateTrackingIfComponentIsInactive() {
    this.isActive.pipe(distinctUntilChanged(), takeUntil(this.ngDestroy$)).subscribe((active) => {
      if (active) {
        this.geoPositionService.startTrackingComponent(this.geoTag);
        this.redrawMap();
      } else {
        this.geoPositionService.stopTrackingComponent(this.geoTag);
      }
    });
  }

  private onMapMove() {
    this.disableFollowMode();
    this.mapService.sendMapMoveStart();
  }

  private onMapMoveEnd() {
    this.updateMapView();
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
    if (this.map) {
      this.mapService.updateMapView({
        bounds: this.map.getBounds(),
        center: this.map.getCenter(),
        zoom: this.map.getZoom(),
      });
    }
  }

  private getTileLayerDefaultOptions(useRetinaMap = false): IRegObsTileLayerOptions {
    return {
      minZoom: settings.map.tiles.minZoom,
      maxZoom: this.getMaxZoom(useRetinaMap),
      maxNativeZoom: settings.map.tiles.maxZoom,
      detectRetina: useRetinaMap,
      updateWhenIdle: settings.map.tiles.updateWhenIdle,
      edgeBufferTiles: settings.map.tiles.edgeBufferTiles,
    };
  }

  private configureTileLayers(userSetting: UserSetting) {
    this.zone.runOutsideAngular(() => {
      this.layerGroup.clearLayers();
      this.map.setMaxZoom(this.getMaxZoom(userSetting.useRetinaMap));

      for (const layer of this.getTopoMapLayers(userSetting.topoMap, userSetting.useRetinaMap)) {
        layer.addTo(this.layerGroup);
      }

      for (const supportMaps of this.userSettingService.getSupportTilesOptions(userSetting)) {
        if (!supportMaps.enabled) {
          continue;
        }

        const options = {
          ...this.getTileLayerDefaultOptions(userSetting.useRetinaMap),
          zIndex: MapLayerZIndex.OnlineSupportLayer,
          updateInterval: 600,
          keepBuffer: 0,
          updateWhenIdle: true,
          minZoom: settings.map.tiles.minZoomSupportMaps,
          bounds: supportMaps.bounds,
        };

        const layer = this.createSupportMapTileLayer(supportMaps.name, supportMaps.url, options);
        layer.setOpacity(supportMaps.opacity);
        layer.addTo(this.layerGroup);
      }
    });
  }

  private createSupportMapTileLayer(name: string, url: string, options: L.TileLayerOptions): RegObsTileLayer {
    if (isAndroidOrIos(this.platform)) {
      return new RegObsOfflineAwareTileLayer(
        name,
        url,
        options,
        this.offlineMapService.offlineTilesRegistry,
        this.loggingService
      );
    } else {
      return new RegObsTileLayer(url, options);
    }
  }

  private getMaxZoom(detectRetina: boolean) {
    return detectRetina && L.Browser.retina ? settings.map.tiles.maxZoom + 2 : settings.map.tiles.maxZoom;
  }

  private *getTopoMapLayers(topoMap: TopoMap, useRetinaMap: boolean) {
    const topoMapLayers = settings.map.tiles.topoMaps[topoMap] || DEFAULT_BASEMAP;

    // One map may use multiple layers, eg. norgeskart + npolar for svalbard
    for (const layerSettings of topoMapLayers) {
      // A map layer may have default layer settings as well as
      // layer settings for this topo map / basemap.
      // This is useful for overriding z-index etc.
      const defaultLayerSettings = settings.map.tiles.topoMapLayers[layerSettings.layer];

      const options = {
        ...this.getTileLayerDefaultOptions(useRetinaMap),
        ...(defaultLayerSettings.options || {}),
        ...(layerSettings.options || {}),
      };

      if (defaultLayerSettings.supportsOffline && isAndroidOrIos(this.platform)) {
        yield new RegObsOfflineAwareTileLayer(
          layerSettings.layer,
          defaultLayerSettings.url,
          options,
          this.offlineMapService.offlineTilesRegistry,
          this.loggingService
        );
      } else if (layerSettings.excludeBounds) {
        yield new RegObsTileLayer(defaultLayerSettings.url, {
          ...options,
          excludeBounds: layerSettings.excludeBounds,
        });
      } else {
        yield new L.TileLayer(defaultLayerSettings.url, options);
      }
    }
  }

  // Force redraw map size on interval to make sure tiles are displayed
  private startInvalidateSizeMapTimer() {
    timer(2000, 5000)
      .pipe(
        withLatestFrom(this.isActive),
        filter(([, active]) => active),
        takeUntil(this.ngDestroy$)
      )
      .subscribe(() => this.redrawMap());
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

  private onPositionUpdate(data: Position) {
    this.zone.runOutsideAngular(() => {
      if (this.map) {
        const latLng = L.latLng({
          lat: data.coords.latitude,
          lng: data.coords.longitude,
        });
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
  }

  private flyToMaxZoom(latLng: L.LatLng, usePan = false) {
    this.flyTo(latLng, Math.max(settings.map.flyToOnGpsZoom, this.map.getZoom()), usePan);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
}
