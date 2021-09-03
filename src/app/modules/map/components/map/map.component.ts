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
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { timer, Subject, from, BehaviorSubject } from 'rxjs';
import { UserSetting } from '../../../../core/models/user-settings.model';
import { settings } from '../../../../../settings';
import { Geoposition } from '@ionic-native/geolocation/ngx';
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
  RegObsOfflineAwareTileLayer
} from '../../core/classes/regobs-tile-layer';
import { NORWEGIAN_BOUNDS } from '../../../../core/helpers/leaflet/border-helper';
import { OfflineMapService } from '../../../../core/services/offline-map/offline-map.service';
import { GeoPositionService } from '../../../../core/services/geo-position/geo-position.service';
import { LangKey } from '../../../../core/models/langKey';
import { Feature, GeometryObject } from '@turf/turf';
import { File } from '@ionic-native/file/ngx';
import { isAndroidOrIos } from 'src/app/core/helpers/ionic/platform-helper';
import { Platform } from '@ionic/angular';
import { OfflineMapPackage, OfflinePackageMetadata, OfflineTilesMetadata } from 'src/app/core/services/offline-map/offline-map.model';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { OfflineTilesRegistry } from 'src/app/core/services/offline-map/offline-tiles-registry';

const DEBUG_TAG = 'MapComponent';
const STEEPNESS_WITH_RUNOUTS_NAME = 'steepness-outlet';

type CreateTileLayer = (options: IRegObsTileLayerOptions) => L.TileLayer;



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
  @Input() autoActivate = true;
  @Input() geoTag = DEBUG_TAG;

  loaded = false;
  private map: L.Map;
  private layerGroup = L.layerGroup();
  private userMarker: UserMarker;
  private firstPositionUpdate = true;
  private ngDestroy$ = new Subject();
  private followMode = true;
  private isDoingMoveAction = false;
  private firstClickOnZoomToUser = true;
  private isActive: BehaviorSubject<boolean>;
  private offlineMapService: OfflineMapService;
  private offlineTilesRegistry = new OfflineTilesRegistry();

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

  options: L.MapOptions;

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
      maxBoundsViscosity: 1.0
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
    this.layerGroup.addTo(this.map);

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
    this.offlineMapService.packages$
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((mapPackages) => this.registerOfflineMapPackages(mapPackages));
  }

  private registerOfflineMapPackages(mapPackages: OfflineMapPackage[]) {
    this.loggingService.debug('registerOfflineMapPackages', DEBUG_TAG);

    this.offlineTilesRegistry.clear();
    for (let mapPackage of mapPackages) {
      this.offlineTilesRegistry.add(mapPackage);
    }

    this.layerGroup.eachLayer((layer) => {
      if (layer instanceof RegObsOfflineAwareTileLayer) {
        layer.redraw();
      }
    })
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
        userSetting.topoMap,
        userSetting.language
      );

      for (const createTileLayer of createTileLayerFactory) {
        const options = this.getTileLayerDefaultOptions(userSetting.useRetinaMap);
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
          updateInterval: 600,
          keepBuffer: 0,
          updateWhenIdle: true,
          minZoom: settings.map.tiles.minZoomSupportMaps,
          bounds: <any>settings.map.tiles.supportTilesBounds
        }

        const layer = this.createSupportMapTileLayer(supportMaps.name, supportMaps.url, options);
        layer.setOpacity(supportMaps.opacity);
        layer.addTo(this.layerGroup);
      }
    });
  }


  private createSupportMapTileLayer(name: string, url: string, options: L.TileLayerOptions): RegObsOfflineAwareTileLayer {
    return new RegObsOfflineAwareTileLayer(
      name,
      url,
      options,
      this.offlineTilesRegistry,
      this.loggingService
    );
  }

  private getMaxZoom(detectRetina: boolean) {
    return detectRetina && L.Browser.retina
      ? settings.map.tiles.maxZoom + 2
      : settings.map.tiles.maxZoom;
  }

  private getTileLayerFactory(
    topoMap: TopoMap,
    langKey: LangKey
  ): CreateTileLayer[] {
    const createNorwegianMixedMap: CreateTileLayer = (options) => new RegObsOfflineAwareTileLayer(
        TopoMap.statensKartverk,
        settings.map.tiles.statensKartverkMapUrl,
        {
          ...options,
          bounds: settings.map.tiles.supportTilesBounds as L.LatLngBoundsLiteral
        },
        this.offlineTilesRegistry,
        this.loggingService,
      );
    const createOpenTopoMap: CreateTileLayer = (options) => new L.TileLayer(settings.map.tiles.openTopoMapUrl, options);
    const createStatensKartverk: CreateTileLayer = (options) => new RegObsOfflineAwareTileLayer(
        TopoMap.statensKartverk,
        settings.map.tiles.statensKartverkMapUrl,
        options,
        this.offlineTilesRegistry,
        this.loggingService,
      );
    const createArcGisOnlineMap: CreateTileLayer = (options) => new L.TileLayer(settings.map.tiles.arcGisOnlineTopoMapUrl);
    const createGeoDataLandskapMap: CreateTileLayer = (options) => new L.TileLayer(settings.map.tiles.geoDataLandskapMapUrl);
    const createArGisOnlineMixMap: CreateTileLayer[] = [
      (options) => new RegObsTileLayer(
        settings.map.tiles.arcGisOnlineTopoMapUrl, 
        {
          ...options,
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
            excludeBounds: NORWEGIAN_BOUNDS
          }),
          createNorwegianMixedMap
        ];
      case TopoMap.mixArcGisOnline:
        return createArGisOnlineMixMap;
      default:
        return langKey === LangKey.nb ? [createStatensKartverk] : [createArcGisOnlineMap];
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

  private onPositionUpdate(data: Geoposition) {
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
