import {
  Component,
  OnInit,
  Input,
  NgZone,
  OnDestroy,
  AfterViewInit,
  Output,
  EventEmitter,
  Injector
} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-doubletapdrag';
import 'leaflet-doubletapdragzoom';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { timer, Subject, from, BehaviorSubject, combineLatest } from 'rxjs';
import { UserSetting } from '../../../../core/models/user-settings.model';
import { settings } from '../../../../../settings';
import { Position } from '@capacitor/geolocation';
import { UserMarker } from '../../../../core/helpers/leaflet/user-marker/user-marker';
import { MapService } from '../../services/map/map.service';
import {
  take,
  takeUntil,
  switchMap,
  distinctUntilChanged,
  withLatestFrom,
  filter
} from 'rxjs/operators';
import { FullscreenService } from '../../../../core/services/fullscreen/fullscreen.service';
import { LoggingService } from '../../../shared/services/logging/logging.service';
import { MapSearchService } from '../../services/map-search/map-search.service';
import { TopoMap } from '../../../../core/models/topo-map.enum';
import {
  RegObsTileLayer,
  IRegObsTileLayerOptions,
  RegObsOfflineAwareTileLayer,
} from '../../core/classes/regobs-tile-layer';
import { NORWEGIAN_BOUNDS } from '../../../../core/helpers/leaflet/border-helper';
import { OfflineMapService } from '../../../../core/services/offline-map/offline-map.service';
import { GeoPositionService } from '../../../../core/services/geo-position/geo-position.service';
import { LangKey } from '../../../../core/models/langKey';
import { File } from '@ionic-native/file/ngx';
import { isAndroidOrIos } from 'src/app/core/helpers/ionic/platform-helper';
import { Platform } from '@ionic/angular';
import { OfflineMapPackage, OfflineTilesMetadata } from 'src/app/core/services/offline-map/offline-map.model';
import { BBox } from 'geojson';

const DEBUG_TAG = 'MapComponent';

type CreateTileLayer = (options: IRegObsTileLayerOptions) => L.TileLayer;

const isTopoLayer = (mapId: string) => (<string[]>Object.values(TopoMap)).includes(mapId);
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
      maxNativeZoom: Math.max(0, map.zMax - 1)
    };
  } else {
    return {
      minNativeZoom: map.rootTile.z,
      maxNativeZoom: map.zMax
    };
  }
};

enum MapLayerZIndex {
  OnlineMixedBackgroundLayer = 0,
  OfflineBackgroundLayer = 10,
  OnlineBackgroundLayer = 20,
  OfflineSupportLayer = 30,
  OnlineSupportLayer = 40,
  Top = 50
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() showMapSearch = true;
  @Input() showFullscreenToggle = true;
  @Input() showGpsCenter = true;
  @Input() showUserLocation = true;
  @Input() showScale = true;
  @Input() showSupportMaps = true;
  @Input() center: L.LatLng;
  @Input() zoom: number;
  @Output() mapReady: EventEmitter<L.Map> = new EventEmitter();
  @Input() autoActivate = true;
  @Input() geoTag = DEBUG_TAG;
  @Input() offlinePackageMode = false;

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
    private file: File,
    private platform: Platform,
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
          L.DomUtil.setPosition(
            this._mapPane,
            this._getMapPanePos().subtract(offset)
          );
        }
      }
    });
  }

  options: L.MapOptions & {
    doubleTapDragZoom?: L.MapOptions['doubleClickZoom'],
    doubleTapDragZoomOptions?: {
      reverse: boolean,
    }
  };

  async ngOnInit() {
    this.options = {
      zoom:
        this.zoom !== undefined ? this.zoom : settings.map.tiles.defaultZoom,
      maxZoom: settings.map.tiles.maxZoom,
      minZoom: settings.map.tiles.minZoom,
      center:
        this.center || L.latLng(settings.map.unknownMapCenter as L.LatLngTuple),
      bounceAtZoomLimits: false,
      attributionControl: false,
      zoomControl: false,
      maxBounds: new L.LatLngBounds(
        new L.LatLng(90.0, -180.0),
        new L.LatLng(-90, 180.0)
      ),
      maxBoundsViscosity: 1.0,
      doubleTapDragZoom: 'center',
      doubleTapDragZoomOptions: {
        reverse: true,
      },
    };
    this.isActive = new BehaviorSubject(this.autoActivate);
    try {
      if (this.center === undefined || this.zoom === undefined) {
        const currentView = await this.mapService.mapView$
          .pipe(take(1))
          .toPromise();
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

  onLeafletMapReady(map: L.Map) {
    //TODO: Denne metoden er altfor lang, splitte opp i flere funksjoner!
    this.map = map;
    if (this.showScale) {
      L.control.scale({ imperial: false }).addTo(map);
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

    this.userSettingService.userSetting$
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((userSetting) => {
        this.configureTileLayers(userSetting);
        if (userSetting.showMapCenter) {
          this.updateMapView();
        }
      });

    this.mapService.followMode$
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((val) => {
        this.followMode = val;
        this.loggingService.debug(
          `Follow mode changed to: ${this.followMode}`,
          DEBUG_TAG
        );
      });

    this.mapService.centerMapToUser$
      .pipe(
        takeUntil(this.ngDestroy$),
        switchMap(() =>
          from(this.geoPositionService.startTrackingComponent(DEBUG_TAG, true))
        )
      )
      .subscribe();

    this.mapSearchService.mapSearchClick$
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((item) => {
        this.disableFollowMode();
        this.zone.runOutsideAngular(() => {
          const latLng = item instanceof L.LatLng ? item : item.latlng;
          this.flyTo(latLng, settings.map.mapSearchZoomToLevel);
        });
      });

    this.mapService.centerMapToUser$
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe(() => {
        this.zone.runOutsideAngular(() => {
          if (this.userMarker) {
            const currentPosition = this.userMarker.getPosition();
            const latLng = L.latLng(
              currentPosition.coords.latitude,
              currentPosition.coords.longitude
            );
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

    this.fullscreenService.isFullscreen$
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe(() => {
        this.redrawMap();
      });

    if (this.showUserLocation) {
      this.geoPositionService.currentPosition$
        .pipe(takeUntil(this.ngDestroy$))
        .subscribe((pos) => this.onPositionUpdate(pos));

      this.geoPositionService.currentHeading$
        .pipe(takeUntil(this.ngDestroy$))
        .subscribe((heading) => {
          if (this.userMarker) {
            this.userMarker.setHeading(heading);
          }
        });

      this.startActiveSubscriptions();
    }

    this.startInvalidateSizeMapTimer();

    this.map.on('resize', () => this.updateMapView());

    if (isAndroidOrIos(this.platform)) {
      this.initOfflineMaps();
    }

    this.mapReady.emit(this.map);
  }

  private async initOfflineMaps() {
    this.loggingService.debug('initOfflineMaps()... ', DEBUG_TAG);

    combineLatest([
      this.offlineMapService.packages$,
      this.userSettingService.userSetting$
    ])
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

  private tileCoordsToBounds({ x, y, z }: { x: number, y: number, z: number }): L.LatLngBounds {
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
      .filter(supportMap => supportMap.enabled)
      .reduce((map, supportMap) => {
        map.set(supportMap.name, supportMap);
        return map;
      }, new Map());

    // Create offline tile map layers
    for (const offlinePackage of packages) {
      for (const map of Object.values(offlinePackage.maps)) {
        if (isTopoLayer(map.mapId)) {
          this.createTopoMapOfflineLayer(map, userSettings.useRetinaMap);
        } else if (enabledSupportMaps.has(map.mapId)) {
          const { opacity } = enabledSupportMaps.get(map.mapId);
          this.createSupportMapOfflineLayer(map, opacity, userSettings.useRetinaMap);
        } else {
          this.loggingService.debug(`'${map.mapId}' is currently disabled or undefined in map config, no layer created for ${map.url}`, DEBUG_TAG);
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
      detectRetina
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
      detectRetina
    });
    this.offlineSupportMapLayerGroup.addLayer(layer);
  }


  private startActiveSubscriptions() {
    this.isActive
      .pipe(distinctUntilChanged(), takeUntil(this.ngDestroy$))
      .subscribe((active) => {
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
      this.loggingService.debug(
        'Did not disable follow mode, because isDoingMoveAction',
        DEBUG_TAG
      );
    }
  }

  private updateMapView() {
    if (this.map) {
      this.mapService.updateMapView({
        bounds: this.map.getBounds(),
        center: this.map.getCenter(),
        zoom: this.map.getZoom()
      });
    }
  }

  private getTileLayerDefaultOptions(
    useRetinaMap = false
  ): IRegObsTileLayerOptions {
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

      const createTileLayerFactory = this.getTileLayerFactory(
        userSetting.topoMap
      );

      for (const createTileLayer of createTileLayerFactory) {
        const options = {
          ...this.getTileLayerDefaultOptions(userSetting.useRetinaMap),
          zIndex: MapLayerZIndex.OnlineBackgroundLayer
        };
        const layer = createTileLayer(options);
        layer.addTo(this.layerGroup);
      }

      for (const supportMaps of this.userSettingService.getSupportTilesOptions(
        userSetting
      )) {
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
          bounds: <any>settings.map.tiles.supportTilesBounds
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
    return detectRetina && L.Browser.retina
      ? settings.map.tiles.maxZoom + 2
      : settings.map.tiles.maxZoom;
  }

  private getTileLayerFactory(topoMap: TopoMap): CreateTileLayer[] {
    let createNorwegianMixedMap: CreateTileLayer;
    let createStatensKartverk: CreateTileLayer;

    if (isAndroidOrIos(this.platform)) {
      createNorwegianMixedMap = (options) => new RegObsOfflineAwareTileLayer(
        TopoMap.statensKartverk,
        settings.map.tiles.statensKartverkMapUrl,
        {
          ...options,
          bounds: settings.map.tiles.supportTilesBounds as L.LatLngBoundsLiteral
        },
        this.offlineMapService.offlineTilesRegistry,
        this.loggingService,
      );

      createStatensKartverk = (options) => new RegObsOfflineAwareTileLayer(
        TopoMap.statensKartverk,
        settings.map.tiles.statensKartverkMapUrl,
        options,
        this.offlineMapService.offlineTilesRegistry,
        this.loggingService,
      );
    } else {
      createNorwegianMixedMap = (options) => new RegObsTileLayer(
        settings.map.tiles.statensKartverkMapUrl,
        {
          ...options,
          bounds: settings.map.tiles.supportTilesBounds as L.LatLngBoundsLiteral
        }
      );

      createStatensKartverk = (options) => new RegObsTileLayer(
        settings.map.tiles.statensKartverkMapUrl,
        options
      );
    }


    const createOpenTopoMap: CreateTileLayer = (options) => new L.TileLayer(settings.map.tiles.openTopoMapUrl, options);
    const createArcGisOnlineMap: CreateTileLayer = (options) => new L.TileLayer(settings.map.tiles.arcGisOnlineTopoMapUrl, options);
    const createGeoDataLandskapMap: CreateTileLayer = (options) => new L.TileLayer(settings.map.tiles.geoDataLandskapMapUrl, options);
    const createArGisOnlineMixMap: CreateTileLayer[] = [
      (options) => new RegObsTileLayer(
        settings.map.tiles.arcGisOnlineTopoMapUrl,
        {
          ...options,
          zIndex: MapLayerZIndex.OnlineMixedBackgroundLayer,
          excludeBounds: NORWEGIAN_BOUNDS
        },
      ),
      createNorwegianMixedMap
    ];

    switch (topoMap) {
    case TopoMap.statensKartverk:
      return [createStatensKartverk];
    case TopoMap.openTopo:
      return [createOpenTopoMap];
    case TopoMap.arcGisOnline:
      return [createArcGisOnlineMap];
    case TopoMap.geoDataLandskap:
      return [createGeoDataLandskapMap];
    case TopoMap.mixOpenTopo:
      return [
        (options) => new RegObsTileLayer(settings.map.tiles.openTopoMapUrl, {
          ...options,
          zIndex: MapLayerZIndex.OnlineMixedBackgroundLayer,
          excludeBounds: NORWEGIAN_BOUNDS
        }),
        createNorwegianMixedMap
      ];
    case TopoMap.mixArcGisOnline:
    default:
      return createArGisOnlineMixMap;
    }
  }

  // Force redraw map size on interval to make sure tiles are displayed
  private startInvalidateSizeMapTimer() {
    timer(2000, 5000)
      .pipe(
        withLatestFrom(this.isActive),
        filter(([timer, active]) => active),
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
          lng: data.coords.longitude
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
    this.flyTo(
      latLng,
      Math.max(settings.map.flyToOnGpsZoom, this.map.getZoom()),
      usePan
    );
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
}
