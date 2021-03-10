import {
  Component,
  OnInit,
  Input,
  NgZone,
  OnDestroy,
  AfterViewInit,
  Output,
  EventEmitter
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
  IRegObsTileLayerOptions
} from '../../core/classes/regobs-tile-layer';
import { NORWEGIAN_BOUNDS } from '../../../../core/helpers/leaflet/border-helper';
import { OfflineMapService } from '../../../../core/services/offline-map/offline-map.service';
import { GeoPositionService } from '../../../../core/services/geo-position/geo-position.service';
import { LangKey } from '../../../../core/models/langKey';
import { Feature, GeometryObject } from '@turf/turf';
import { Map } from 'mapbox-gl';

const DEBUG_TAG = 'MapComponent';

interface MapOptionsWithBounds {
  name: string;
  url: string;
  bounds?: L.LatLngBoundsExpression;
  excludeBounds?: Feature<GeometryObject>;
}

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
  @Output() mapLoaded: EventEmitter<Map> = new EventEmitter();

  loaded = false;
  // private map: L.Map;
  private map: Map;
  private tilesLayer = L.layerGroup();
  private userMarker: UserMarker;
  private firstPositionUpdate = true;
  private ngDestroy$ = new Subject();
  private followMode = true;
  private isDoingMoveAction = false;
  private firstClickOnZoomToUser = true;

  private isActive: BehaviorSubject<boolean>;

  transformRequest = (url, resourceType)  => {
    console.log('transform url: ' +url +' Resource type', resourceType, this);
  }

  constructor(
    private userSettingService: UserSettingService,
    private mapService: MapService,
    private offlineMapService: OfflineMapService,
    private mapSearchService: MapSearchService,
    private zone: NgZone,
    private fullscreenService: FullscreenService,
    private loggingService: LoggingService,
    private geoPositionService: GeoPositionService
  ) {
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

  

  onMapLoaded(map: Map) {
    this.map = map;
    const style = this.map.getStyle();
    style.glyphs = 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf';
    this.map.setStyle(style);
    this.map.resize();
    this.mapLoaded.emit(map);
  }

  ngOnDestroy(): void {
    this.geoPositionService.stopTrackingComponent(DEBUG_TAG);
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  componentIsActive(isActive: boolean) {
    this.isActive.next(isActive);
  }

  // onLeafletMapReady(map: L.Map) {
  //   this.map = map;
  //   if (this.showScale) {
  //     L.control.scale({ imperial: false }).addTo(map);
  //   }
  //   this.tilesLayer.addTo(this.map);

  //   this.userSettingService.userSetting$
  //     .pipe(takeUntil(this.ngDestroy$))
  //     .subscribe((userSetting) => {
  //       this.configureTileLayers(userSetting);
  //       if (userSetting.showMapCenter) {
  //         this.updateMapView();
  //       }
  //     });

  //   this.mapService.followMode$
  //     .pipe(takeUntil(this.ngDestroy$))
  //     .subscribe((val) => {
  //       this.followMode = val;
  //       this.loggingService.debug(
  //         `Follow mode changed to: ${this.followMode}`,
  //         DEBUG_TAG
  //       );
  //     });

  //   this.mapService.centerMapToUser$
  //     .pipe(
  //       takeUntil(this.ngDestroy$),
  //       switchMap(() =>
  //         from(this.geoPositionService.startTrackingComponent(DEBUG_TAG, true))
  //       )
  //     )
  //     .subscribe();

  //   this.mapSearchService.mapSearchClick$
  //     .pipe(takeUntil(this.ngDestroy$))
  //     .subscribe((item) => {
  //       this.disableFollowMode();
  //       this.zone.runOutsideAngular(() => {
  //         const latLng = item instanceof L.LatLng ? item : item.latlng;
  //         this.flyTo(latLng, settings.map.mapSearchZoomToLevel);
  //       });
  //     });

  //   this.mapService.centerMapToUser$
  //     .pipe(takeUntil(this.ngDestroy$))
  //     .subscribe(() => {
  //       this.zone.runOutsideAngular(() => {
  //         if (this.userMarker) {
  //           const currentPosition = this.userMarker.getPosition();
  //           const latLng = L.latLng(
  //             currentPosition.coords.latitude,
  //             currentPosition.coords.longitude
  //           );
  //           if (this.followMode || this.firstClickOnZoomToUser) {
  //             // Follow mode is allready true or first click, zoom in
  //             this.flyToMaxZoom(latLng);
  //           } else {
  //             // Use existing zoom
  //             this.flyTo(latLng, this.map.getZoom(), true);
  //           }
  //           this.firstClickOnZoomToUser = false;
  //         }
  //       });
  //     });

  //   this.zone.runOutsideAngular(() => {
  //     this.map.on('movestart', () => this.onMapMove());
  //     this.map.on('zoomstart', () => this.onMapMove());
  //   });

  //   this.zone.runOutsideAngular(() => {
  //     this.map.on('moveend', () => this.onMapMoveEnd());
  //   });

  //   this.fullscreenService.isFullscreen$
  //     .pipe(takeUntil(this.ngDestroy$))
  //     .subscribe(() => {
  //       this.redrawMap();
  //     });

  //   this.geoPositionService.currentPosition$
  //     .pipe(takeUntil(this.ngDestroy$))
  //     .subscribe((pos) => this.onPositionUpdate(pos));

  //   this.geoPositionService.currentHeading$
  //     .pipe(takeUntil(this.ngDestroy$))
  //     .subscribe((heading) => {
  //       if (this.userMarker) {
  //         this.userMarker.setHeading(heading);
  //       }
  //     });

  //   this.startActiveSubscriptions();

  //   this.startInvalidateSizeMapTimer();

  //   this.map.on('resize', () => this.updateMapView());
  //   this.mapReady.emit(this.map);
  // }

  private startActiveSubscriptions() {
    this.isActive
      .pipe(distinctUntilChanged(), takeUntil(this.ngDestroy$))
      .subscribe((active) => {
        if (active) {
          this.offlineMapService.resumeSavingTiles();
          this.geoPositionService.startTrackingComponent(this.geoTag);
          this.redrawMap();
        } else {
          this.offlineMapService.pauseSavingTiles();
          this.geoPositionService.stopTrackingComponent(this.geoTag);
        }
      });
  }

  // private onMapMove() {
  //   this.disableFollowMode();
  // }

  // private onMapMoveEnd() {
  //   this.updateMapView();
  // }

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

  // private updateMapView() {
  //   if (this.map) {
  //     this.mapService.updateMapView({
  //       bounds: this.map.getBounds(),
  //       center: this.map.getCenter(),
  //       zoom: this.map.getZoom()
  //     });
  //   }
  // }

  private getTileLayerDefaultOptions(
    userSetting: UserSetting
  ): IRegObsTileLayerOptions {
    return {
      minZoom: settings.map.tiles.minZoom,
      maxZoom: this.getMaxZoom(userSetting.useRetinaMap),
      maxNativeZoom: settings.map.tiles.maxZoom,
      detectRetina: userSetting.useRetinaMap,
      updateWhenIdle: settings.map.tiles.updateWhenIdle,
      edgeBufferTiles: settings.map.tiles.edgeBufferTiles,
      saveTilesToCache: userSetting.tilesCacheSizev2 > 0,
      saveCacheTileFunc: (id, tile) =>
        this.offlineMapService.saveTileToOfflineCache(id, tile),
      getCacheTileFunc: (id) => this.offlineMapService.getCachedTileDataUrl(id),
      logFunc: this.loggingService.log
    };
  }

  configureTileLayers(userSetting: UserSetting) {
    this.zone.runOutsideAngular(() => {
      this.tilesLayer.clearLayers();
      this.map.setMaxZoom(this.getMaxZoom(userSetting.useRetinaMap));
      const mapOptions = this.getMapOptions(
        userSetting.topoMap,
        userSetting.language
      );
      for (const topoMap of mapOptions) {
        const topoTilesLayer = new RegObsTileLayer(topoMap.name, topoMap.url, {
          ...this.getTileLayerDefaultOptions(userSetting),
          bounds: topoMap.bounds,
          excludeBounds: topoMap.excludeBounds
        });
        topoTilesLayer.addTo(this.tilesLayer);
      }

      for (const supportTile of this.userSettingService.getSupportTilesOptions(
        userSetting
      )) {
        if (supportTile.enabled) {
          const supportMapTileLayer = new RegObsTileLayer(
            supportTile.name,
            supportTile.url,
            {
              ...this.getTileLayerDefaultOptions(userSetting),
              updateInterval: 600,
              keepBuffer: 0,
              updateWhenIdle: true,
              minZoom: settings.map.tiles.minZoomSupportMaps,
              bounds: <any>settings.map.tiles.supportTilesBounds
            }
          );
          supportMapTileLayer.setOpacity(supportTile.opacity);
          supportMapTileLayer.addTo(this.tilesLayer);
        }
      }
    });
  }

  private getMaxZoom(detectRetina: boolean) {
    return detectRetina && L.Browser.retina
      ? settings.map.tiles.maxZoom + 2
      : settings.map.tiles.maxZoom;
  }

  private getMapOptions(
    topoMap: TopoMap,
    langKey: LangKey
  ): MapOptionsWithBounds[] {
    const norwegianMixedMap: MapOptionsWithBounds = {
      name: TopoMap.statensKartverk,
      url: settings.map.tiles.statensKartverkMapUrl,
      bounds: settings.map.tiles.supportTilesBounds as L.LatLngBoundsLiteral
    };
    const openTopoMap: MapOptionsWithBounds = {
      name: TopoMap.openTopo,
      url: settings.map.tiles.openTopoMapUrl
    };
    const statensKartverk: MapOptionsWithBounds = {
      name: TopoMap.statensKartverk,
      url: settings.map.tiles.statensKartverkMapUrl
    };
    const arcGisOnlineMap: MapOptionsWithBounds = {
      name: TopoMap.arcGisOnline,
      url: settings.map.tiles.arcGisOnlineTopoMapUrl
    };
    const geoDataLandskapMap: MapOptionsWithBounds = {
      name: TopoMap.geoDataLandskap,
      url: settings.map.tiles.geoDataLandskapMapUrl
    };
    const arGisOnlineMixMap = [
      { ...arcGisOnlineMap, excludeBounds: NORWEGIAN_BOUNDS },
      norwegianMixedMap
    ];
    // const geoDataLandskapMixMap: MapOptionsWithBounds = {
    //   name: TopoMap.geoDataLandskap,
    //   url: settings.map.tiles.geoDataLandskapMapUrl,
    //   bounds: settings.map.tiles.supportTilesBounds as L.LatLngBoundsLiteral,
    //   excludeBounds: BorderHelper.getSvalbardPolygon().geometry
    // };
    // const svalbard: MapOptionsWithBounds = {
    //   name: TopoMap.statensKartverk,
    //   url: settings.map.tiles.statensKartverkMapUrl,
    //   bounds: settings.map.bounds.svalbard.bbox as L.LatLngBoundsLiteral,
    // }
    // const mixGeoDataLandskap = [
    //   { ...arcGisOnlineMap, excludeBounds: NORWEGIAN_BOUNDS },
    //   geoDataLandskapMixMap,
    //   svalbard
    // ];

    switch (topoMap) {
      case TopoMap.statensKartverk:
        return [statensKartverk];
      case TopoMap.openTopo:
        return [openTopoMap];
      case TopoMap.arcGisOnline:
        return [arcGisOnlineMap];
      case TopoMap.geoDataLandskap:
        return [geoDataLandskapMap];
      case TopoMap.mixOpenTopo:
        return [
          { ...openTopoMap, excludeBounds: NORWEGIAN_BOUNDS },
          norwegianMixedMap
        ];
      case TopoMap.mixArcGisOnline:
        return arGisOnlineMixMap;
      // case TopoMap.mixGeoDataLandskap:
      //   return mixGeoDataLandskap;
      // default:
      //   return langKey === LangKey.nb ? mixGeoDataLandskap : [arcGisOnlineMap];
      default:
        return langKey === LangKey.nb ? [statensKartverk] : [arcGisOnlineMap];
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
    // if (this.map) {
    //   this.map.invalidateSize();
    // }
    // window.dispatchEvent(new Event('resize'));
  }

  ngAfterViewInit(): void {
    this.redrawMap();
  }

  // private onPositionUpdate(data: Geoposition) {
  //   this.zone.runOutsideAngular(() => {
  //     if (this.map) {
  //       const latLng = L.latLng({
  //         lat: data.coords.latitude,
  //         lng: data.coords.longitude
  //       });
  //       if (!this.userMarker) {
  //         this.userMarker = new UserMarker(this.map, data);
  //       } else {
  //         this.userMarker.updatePosition(data);
  //       }
  //       if (this.followMode && !this.isDoingMoveAction) {
  //         this.flyToMaxZoom(latLng, !this.firstPositionUpdate);
  //         this.firstPositionUpdate = false;
  //       }
  //     }
  //   });
  // }

  // private flyToMaxZoom(latLng: L.LatLng, usePan = false) {
  //   this.flyTo(
  //     latLng,
  //     Math.max(settings.map.flyToOnGpsZoom, this.map.getZoom()),
  //     usePan
  //   );
  // }

  // private flyTo(latLng: L.LatLng, zoom: number, usePan = false) {
  //   this.isDoingMoveAction = true;
  //   // if (usePan) {
  //   //   this.map.panTo(latLng);
  //   // } else {
  //   //   this.map.flyTo(latLng, zoom);
  //   // }
  //   // Note: Poor performance on flyTo effect, so using setView without animate instead.
  //   this.map.setView(latLng, zoom, { animate: false });
  //   this.isDoingMoveAction = false;
  // }
}
