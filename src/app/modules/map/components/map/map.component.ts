import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import Basemap from '@arcgis/core/Basemap';
import esriConfig from '@arcgis/core/config.js';
import Layer from '@arcgis/core/layers/Layer';
import WebTileLayer from '@arcgis/core/layers/WebTileLayer';
import VectorTileLayer from '@arcgis/core/layers/VectorTileLayer';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import ScaleBar from '@arcgis/core/widgets/ScaleBar';
import TileInfo from '@arcgis/core/layers/support/TileInfo';
import { Platform } from '@ionic/angular';
import { Feature, GeometryObject } from '@turf/turf';
import L from 'leaflet';
import {
  BehaviorSubject,
  combineLatest,
  Subject,
  fromEventPattern,
  Observable
} from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  switchMap,
  take,
  takeUntil,
  tap,
  throttleTime
} from 'rxjs/operators';
import { isAndroidOrIos } from 'src/app/core/helpers/ionic/platform-helper';
import { NORWEGIAN_BOUNDS } from 'src/app/core/helpers/leaflet/border-helper';
import { LangKey } from 'src/app/core/models/langKey';
import { TopoMap } from 'src/app/core/models/topo-map.enum';
import { UserSetting } from 'src/app/core/models/user-settings.model';
import { GeoPositionService } from 'src/app/core/services/geo-position/geo-position.service';
import { OfflineMap } from 'src/app/core/services/offline-map/offline-map.model';
import { OfflineMapService } from 'src/app/core/services/offline-map/offline-map.service';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { settings } from 'src/settings';
import { IRegObsTileLayerOptions } from '../../core/classes/regobs-tile-layer';
import { MapService } from '../../services/map/map.service';
import { Point } from '@arcgis/core/geometry';
import { UserMarker } from 'src/app/core/helpers/leaflet/user-marker/user-marker';
import { Geoposition } from '@ionic-native/geolocation/ngx';
import Graphic from '@arcgis/core/Graphic';

const DEBUG_TAG = 'MapComponent';

enum BasemapType {
  RASTER,
  VECTOR,
  GEO_JSON
}
interface MapOptionsWithBounds {
  name: string;
  url: string;
  bounds?: L.LatLngBoundsExpression;
  excludeBounds?: Feature<GeometryObject>;
  type?: BasemapType;
}

/**
 * Appearance of layer types, from bottom to top.
 * Each of them have their own layer group (GroupLayer in ArcGis).
 * Think of them as a slots you can add layers in
 */
 export enum MapLayerType {
  BASE_MAP_OFFLINE,
  BASE_MAP_ONLINE,
  SUPPORT_MAP,
  OBSERVATIONS,
  PREVIOUSLY_USED_LOCATIONS,
  LOCALIZING, //use this to place observations on map, register avalanche start/stop, etc.
  POSITION //GPS positioning marker
}

/**
 * Callback for click events
 */
export interface ClickEventHandler {
  /**
   * If undefined, we didn't hit any graphic in the layer of interest
   */
  (graphic: Graphic | undefined): void;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() showMapControls = true;
  @Input() showUserLocation = true;
  @Input() showScale = true;
  @Input() showSupportMaps = true;
  @Input() center: Point;
  @Input() zoom: number = 7;
  @Output() mapReady: EventEmitter<MapComponent> = new EventEmitter();
  @Input() autoActivate = true;
  @Input() geoTag = DEBUG_TAG;
  @Input() debug = true;
  @Input() isStatic = false;

  drag$: Observable<__esri.MapViewDragEvent> = fromEventPattern(
    (handler) => this.view.on('drag', handler),
    (handler, eventListener) => eventListener.remove()
  );

  private view: MapView;
  private loading: boolean; //TODO: Trenger vi denne?
  private userMarker: UserMarker; //TODO: Tilpass denne
  private firstPositionUpdate = true;
  private ngDestroy$ = new Subject();
  private isDoingMoveAction = false;
  private firstClickOnZoomToUser = true;
  private isActive: BehaviorSubject<boolean>;

  // The <div> where we will place the map
  @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;

  // Zoom level debug
  @ViewChild('zoomLevelNode', { static: true })
  private zoomLevelNode: ElementRef;
  private zlWatcher: { remove(): void };

  constructor(
    private zone: NgZone,
    private logger: LoggingService,
    private mapService: MapService,
    private offlineMapService: OfflineMapService,
    private platform: Platform,
    private geoPositionService: GeoPositionService,
    private userSettingService: UserSettingService
  ) {}

  async ngOnInit(): Promise<void> {
    esriConfig.assetsPath = '/assets';
    this.zone.runOutsideAngular(() => {
      const start = performance.now();
      this.initializeMap().then(() => {
        // Setup user location marker and tracking
        if (this.showUserLocation) {
          this.initTrackUserPositionMarker();
        }

        this.logger.debug(`center = ${this.center}`);
        //TODO: SJekk om dette kallet bør være her
        if (this.center) {
          this.view.center = this.center;
        }

        this.userSettingService.userSetting$
          .pipe(takeUntil(this.ngDestroy$))
          .subscribe((userSetting) => {
            this.updateLayers(userSetting);
            // if (userSetting.showMapCenter) {
            //   this.updateMapView(); //TODO
            // }
          });

        this.zone.run(() => {
          this.logger.debug(
            'Map loaded in ' + (performance.now() - start) + ' ms'
          );
          this.onMapReady();
        });
      });
    });
    this.isActive = new BehaviorSubject(this.autoActivate);
    try {
      if (this.center === undefined || this.zoom === undefined) {
        const currentView = await this.mapService.mapView$
          .pipe(take(1))
          .toPromise();
        if (currentView && currentView.center) {
          this.firstPositionUpdate = false;
          if (this.center === undefined) {
            this.view.center = currentView.center;
          }
          if (this.zoom === undefined) {
            this.view.zoom = currentView.zoom;
          }
        }
      }
    } finally {
      this.loading = false;
    }
  }

  onMapReady(): void {
    if (this.showScale) {
      const scaleBar = new ScaleBar({
        view: this.view,
        unit: 'metric'
      });
      this.view.ui.add(scaleBar, {
        position: 'bottom-left'
      });
    }
  }

  ngOnDestroy(): void {
    if (this.view) {
      this.view.destroy(); // destroy the map view
    }
    this.geoPositionService.stopTrackingComponent(DEBUG_TAG);
    this.ngDestroy$.next();
    this.ngDestroy$.complete();

    if (this.zlWatcher) {
      this.zlWatcher.remove();
    }
  }

  private getMaxZoom(detectRetina: boolean) {
    return detectRetina && L.Browser.retina
      ? settings.map.tiles.maxZoom + 2
      : settings.map.tiles.maxZoom;
  }

  private setZoom(minZoom: number, maxZoom: number): void {
    const constraints = this.view.constraints;
    constraints.minZoom = minZoom ? minZoom : settings.map.tiles.minZoom;
    constraints.maxZoom = maxZoom ? maxZoom : settings.map.tiles.maxZoom;
  }

  private getTileLayerDefaultOptions(
    userSetting: UserSetting
  ): IRegObsTileLayerOptions {
    return {
      minZoom: settings.map.tiles.minZoom,
      maxZoom: this.getMaxZoom(userSetting.useRetinaMap),
      maxNativeZoom: settings.map.tiles.maxZoom,
      detectRetina: userSetting.useRetinaMap,
      updateWhenIdle: settings.map.tiles.updateWhenIdle,
      edgeBufferTiles: settings.map.tiles.edgeBufferTiles
    };
  }

  private updateLayers(userSetting: UserSetting): void {
    this.zone.runOutsideAngular(() => {
      this.setZoom(null, this.getMaxZoom(userSetting.useRetinaMap));
      this.view.map.basemap = this.createBaseMap(userSetting);
      this.applySupportMaps(userSetting);
      this.mapReady.emit(this);
    });
  }

  private createBaseMap(userSetting: UserSetting): Basemap {
    const mapOptions = this.getMapOptions(
      userSetting.topoMap,
      userSetting.language
    );
    const baseLayers: Layer[] = [];

    for (const mapOption of mapOptions) {
      // TODO: Handle overlapping basemap layers (excludeBounds)
      // const topoTilesLayer = topoMap.excludeBounds
      //   ? new RegObsTileLayer(topoMap.url, {
      //       ...this.getTileLayerDefaultOptions(userSetting),
      //       bounds: topoMap.bounds,
      //       excludeBounds: topoMap.excludeBounds
      //     })
      //   : L.tileLayer(topoMap.url, {
      //       ...this.getTileLayerDefaultOptions(userSetting),
      //       bounds: topoMap.bounds
      //     });
      baseLayers.push(this.createBaselayer(mapOption));
    }
    
    const map = new Basemap({
      baseLayers: this.createLayerGroups(),
      id: mapOptions.map((m) => m.name).join(',')
    });
    const onlineBaseMapLayerGroup = this.getLayerGroup(MapLayerType.BASE_MAP_ONLINE, map);
    onlineBaseMapLayerGroup.addMany(baseLayers);
    return map;
  }

  //creates a layer group for each layer type we support, to ensure the right appearance of different layer types
  private createLayerGroups(): GroupLayer[] {
    const layerGroups: GroupLayer[] = [];
    for (const layerType in MapLayerType) {
      const id = MapLayerType[layerType];
      layerGroups.push(new GroupLayer({ id: id}))
    }
    return layerGroups;
  }

  getLayerGroup(type: MapLayerType, map?: Basemap): GroupLayer {
    const id = MapLayerType[type];
    if (!map) {
      map = this.view.map.basemap;
    }
    return map.baseLayers.find(
      (layer: Layer) => layer.id === id
    ) as GroupLayer;
  }

  addLayer(layer: Layer, type: MapLayerType): void {
    const group = this.getLayerGroup(type);
    group.layers.add(layer);
  }

  private createBaselayer(options: MapOptionsWithBounds): Layer {
      //TODO: Støtt excludeBounds, så lag ikke overlapper
      switch (options.type) {
      case BasemapType.GEO_JSON:
        return new GeoJSONLayer({
          id: options.name,
          url: options.url
        });
      case BasemapType.VECTOR:
        return new VectorTileLayer({
          id: options.name,
          url: options.url
        });
      default: {
        return new WebTileLayer({
          id: options.name,
          urlTemplate: options.url
        });
      }
    }
  }

  private applySupportMaps(userSetting: UserSetting): void {
    const group = this.getLayerGroup(MapLayerType.SUPPORT_MAP);
    group.removeAll()

    for (const supportTile of this.userSettingService.getSupportTilesOptions(
      userSetting
    )) {
      if (supportTile.enabled) {
        const layer = new WebTileLayer({
          id: supportTile.name,
          urlTemplate: supportTile.url,
          opacity: supportTile.opacity
        });

        //TODO: Flere valg for støttekart
        // const supportMapTileLayer = L.tileLayer(supportTile.url, {
        //   ...this.getTileLayerDefaultOptions(userSetting),
        //   updateInterval: 600,
        //   keepBuffer: 0,
        //   updateWhenIdle: true,
        //   minZoom: settings.map.tiles.minZoomSupportMaps,
        //   bounds: <any>settings.map.tiles.supportTilesBounds
        // });
        // supportMapTileLayer.setOpacity(supportTile.opacity);
        // supportMapTileLayer.addTo(this.tilesLayer);
        group.add(layer);
      }
    }
  }

  private getMapOptions(
    topoMap: TopoMap,
    langKey: LangKey
  ): MapOptionsWithBounds[] {
    const noOnlineMap: MapOptionsWithBounds = {
      name: TopoMap.noOnlineMap,
      url: settings.map.tiles.noOnlineMapUrl,
      type: BasemapType.GEO_JSON
    };
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
    const geoDataTerrengVector: MapOptionsWithBounds = {
      name: TopoMap.geoDataTerrengVector,
      url: settings.map.tiles.geoDataTerrengVectorMapUrl,
      type: BasemapType.VECTOR
    };

    //TODO: Kan vi forenkle dette, f.eks. ved å legge alle kartvalgene i en Map nøkla på TopoMap enum?
    switch (topoMap) {
      case TopoMap.noOnlineMap:
        return [noOnlineMap];
      case TopoMap.statensKartverk:
        return [statensKartverk];
      case TopoMap.openTopo:
        return [openTopoMap];
      case TopoMap.arcGisOnline:
        return [arcGisOnlineMap];
      case TopoMap.geoDataLandskap:
        return [geoDataLandskapMap];
      case TopoMap.mixOpenTopo: //TODO: Hvorfor har man ikke definert denne lenger opp slik som for arGisOnlineMixMap?
        return [
          { ...openTopoMap, excludeBounds: NORWEGIAN_BOUNDS },
          norwegianMixedMap
        ];
      case TopoMap.mixArcGisOnline:
        return arGisOnlineMixMap;
      case TopoMap.geoDataTerrengVector:
        return [geoDataTerrengVector];
      default:
        return langKey === LangKey.nb ? [statensKartverk] : [arcGisOnlineMap];
    }
  }

  initializeMap(): Promise<unknown> {
    const container = this.mapViewEl.nativeElement;
    const map = new Map();
    this.view = new MapView({
      map: map,
      container,
      zoom: this.zoom,
      spatialReference: {
        wkid: 3857
      },
      constraints: {
        // If not specified, lods is read from the Map/MapLayers.
        // As we start the map with no layers loaded we should specify
        // the lods. Not specifying can lead to zoom = -1.
        lods: TileInfo.create().lods
      },
      center: [10.5, 60],
      ui: {
        components: []
      }
      // center: initialView.target, //TODO: Get from URL
      // zoom: initialView.zoom, //TODO: Get from URL
      // constraints: {
      //   minZoom: 2,
      //   geometry: new Extent({
      //     xmin: -2500000,
      //     ymin: 5500000,
      //     xmax: 3000000,
      //     ymax: 9000000,
      //     spatialReference: { wkid: 25833 }
      //   })
      // }
    });

    if (this.isStatic) {
      this.view.navigation.mouseWheelZoomEnabled = false;
      this.view.navigation.browserTouchPanEnabled = false;
      //Disable the default +/- key-down gestures
      this.view.on('key-down', function (event) {
        const prohibitedKeys = ['+', '-', 'Shift', '_', '='];
        const keyPressed = event.key;
        if (prohibitedKeys.indexOf(keyPressed) !== -1) {
          event.stopPropagation();
        }
      });
      //Disable the default mouse-wheel behavior
      this.view.on('mouse-wheel', function (event) {
        event.stopPropagation();
      });
      //Disable zooming via double-click
      this.view.on('double-click', function (event) {
        event.stopPropagation();
      });
      //Disable pinch zoom and panning
      this.view.on('drag', function (event) {
        event.stopPropagation();
      });
    }

    if (isAndroidOrIos(this.platform)) {
      this.initOfflineMaps();
    }

    return this.view
      .when(() => {
        this.createExtentWatcher(this.view);
        this.loading = false;
      })
      .catch((reason) => {
        this.logger.error(reason, 'Error in initializeMap');
      });
  }

  private createExtentWatcher(view: MapView) {
    view.watch('stationary', (isStationary: boolean) => {
      if (isStationary) {
        //if the panning or zooming has stopped, update url
        if (view) {
          this.mapService.updateMapView({
            bounds: this.view.extent,
            center: this.view.center,
            zoom: this.view.zoom
          });

          // Zoom level debug
          if (this.debug) {
            let zoom = 'Ikke gitt';
            try {
              zoom = this.view.zoom.toFixed(3);
            } catch (error) {}
            this.zoomLevelNode.nativeElement.innerText = zoom;
          }
        }
      }
    });
  }

  componentIsActive(isActive: boolean): void {
    this.isActive.next(isActive);
  }

  private async initOfflineMaps() {
    this.logger.debug('initOfflineMaps(): ', DEBUG_TAG);
    this.offlineMapService.initWebServer();

    this.offlineMapService.mapAdded$().subscribe((mapPackage) => {
      this.logger.debug(
        `Nytt kart pakket ut og klar for lasting: ${mapPackage.name}`
      );
      this.addOfflineLayer(mapPackage); //add new maps when they are available
    });

    this.offlineMapService.mapRemoved$().subscribe((mapPackage) => {
      this.logger.debug(
        `Kartpakke slettet av bruker, vil fjerne kartlag: ${mapPackage.name}`
      );
      this.removeOfflineLayer(mapPackage); //remove map layer when the user removes a package
    });

    for (const mapPackage of await this.offlineMapService.listOfflineMaps()) {
      this.addOfflineLayer(mapPackage); //add maps already on disk
    }
  }

  private async addOfflineLayer(offlineMap: OfflineMap) {
    this.logger.debug(`laster offline kartlag: ${offlineMap.name}`);
    this.removeOfflineLayer(offlineMap); //remove previous version of layer if any
    const layer = new VectorTileLayer({
      id: offlineMap.name,
      url: `http://localhost:8080/${offlineMap.name}/root.json`
    });
    let offlineGroupLayer = this.getLayerGroup(MapLayerType.BASE_MAP_OFFLINE);
    offlineGroupLayer.add(layer);
    this.logger.debug(`Nytt kartlag lagt til: ${offlineMap.name}`);
  }

  private removeOfflineLayer(
    mapPackage: OfflineMap
  ): void {
    const offlineLayerGroup = this.getLayerGroup(MapLayerType.BASE_MAP_OFFLINE);
    if (offlineLayerGroup) {
      offlineLayerGroup.layers.forEach((layer) => {
        if (mapPackage.name === layer.id) {
          layer.destroy();
          this.logger.debug(`Offline layer '${layer.id}' destroyed`);
        }
      });
    }
  }

  private initHeadingTracking() {
    this.geoPositionService.currentHeading$
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((heading) => {
        this.userMarker.setHeading(heading);
      });
  }

  goToPoint(point: Point) {
    return this.view.goTo(
      {
        center: point,
        zoom: Math.max(settings.map.flyToOnGpsZoom, this.view.zoom)
      },
      { animate: true, duration: 200 }
    );
  }

  private goToPosition(pos: Geoposition) {
    return this.goToPoint(new Point({latitude: pos.coords.latitude, longitude: pos.coords.longitude}));
  }

  private createOrUpdateUserMarker(pos: Geoposition) {
    if (this.userMarker == null) {
      this.userMarker = new UserMarker(this.view, pos);
      this.initHeadingTracking();
    } else {
      this.userMarker.updatePosition(pos);
    }
  }

  /**
   * When the gelocation observable emits a new value the user position should change.
   * If followMode is activated, the map should follow the user position.
   *
   * Geolocation itself are not triggered by this component.
   * It can be triggered by two things:
   *   - Clicking on the "position" button
   *   - Having the mapcenter box visible
   */
  private initTrackUserPositionMarker() {
    combineLatest([
      this.geoPositionService.currentPosition$.pipe(
        // Skip unchanged positions
        distinctUntilChanged((x, y) => x.timestamp === y.timestamp),
        // Only get new positions every 250 ms.
        // Without this, the goTo animation failed when the position
        // was changed during an animation. The throttle time should
        // probably be a bit more than the animation time to let the
        // animation finish before the next position is updated.
        throttleTime(250),
        tap((pos) => this.createOrUpdateUserMarker(pos))
      ),
      this.mapService.followMode$
    ])
      .pipe(
        takeUntil(this.ngDestroy$),
        // When we have both an updated marker, and followMode = true,
        // we should go to the user position.
        filter(([, fm]) => fm === true),
        switchMap(([pos]) => this.goToPosition(pos)),
        switchMap(() => this.stopFollowModeOnDrag$())
      )
      .subscribe();
  }

  /**
   * Listen to map 'drag' events and set followMode to false
   * when the event fires.
   *
   * We may need to listen to other events as well;
   * the scroll event does not cancel the followMode.
   */
  private stopFollowModeOnDrag$() {
    return this.drag$.pipe(
      take(1),
      tap(() => {
        this.logger.debug('User dragged map, stopping followMode', DEBUG_TAG);
        this.mapService.followMode = false;
      })
    );
  }

  private flyTo(pos: Geoposition, zoom: number, opts = {}) {
    this.view.goTo(
      {
        center: [pos.coords.longitude, pos.coords.latitude],
        zoom
      },
      opts
    );
  }

  /**
   * Listen for click events on graphics on a specific layer
   * @param layer the layer of interest
   * @param eventHandler if map was clicked we will call back to you through this
   */
  createClickEventHandler(layer: Layer, eventHandler: ClickEventHandler) {
    this.view.on('click', (event) => {
      const screenPoint = {
        x: event.x,
        y: event.y
      };
      // Search for graphics at the clicked location
      this.view
        .hitTest(screenPoint, { include: [layer] })
        .then((response) => {
          if (response.results.length) {
            const graphic = response.results.filter((result) => {
              return result.graphic.layer === layer; // check if the graphic belongs to the layer of interest
            })[0].graphic;
            eventHandler(graphic); //we hit a graphic on this layer
          } else {
            eventHandler(undefined); //we didn't hit anything
          }
        })
        .catch((err) => {
          this.logger.error(
            err,
            DEBUG_TAG,
            `Click event failed: ${err}`
          );
        });
    });
  }

  getCenter(): Point {
    return this.view.center;
  }
}
