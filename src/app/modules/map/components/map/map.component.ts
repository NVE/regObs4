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
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import ScaleBar from '@arcgis/core/widgets/ScaleBar';
import { Platform } from '@ionic/angular';
import { Feature, GeometryObject } from '@turf/turf';
import L from 'leaflet';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { switchMap, take, takeUntil } from 'rxjs/operators';
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

const DEBUG_TAG = 'MapComponent';
const OFFLINE_LAYER = 'OfflineLayer';

interface MapOptionsWithBounds {
  name: string;
  url: string;
  bounds?: L.LatLngBoundsExpression;
  excludeBounds?: Feature<GeometryObject>;
  vector?: boolean;
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
  @Input() zoom: number;
  @Output() mapReady: EventEmitter<MapView> = new EventEmitter();
  @Input() autoActivate = true;
  @Input() geoTag = DEBUG_TAG;
  @Input() debug = true;

  private view: MapView;
  private loading: boolean; //TODO: Trenger vi denne?
  private userMarker: UserMarker; //TODO: Tilpass denne
  private firstPositionUpdate = true;
  private ngDestroy$ = new Subject();
  private followMode = true;
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
        this.logger.debug(`center = ${this.center}`);
        if (this.center) {
          this.view.center = this.center;
        }

        this.userSettingService.userSetting$
          .pipe(takeUntil(this.ngDestroy$))
          .subscribe((userSetting) => {
            this.configureTileLayers(userSetting);
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

    this.mapService.followMode$
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((mode: boolean) => {
        this.followMode = mode;
        this.logger.debug(
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
              this.flyTo(latLng, this.view.zoom, true);
            }
            this.firstClickOnZoomToUser = false;
          }
        });
      });

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

  private configureTileLayers(userSetting: UserSetting): void {
    this.zone.runOutsideAngular(() => {
      // this.tilesLayer.clearLayers();
      this.setZoom(null, this.getMaxZoom(userSetting.useRetinaMap));
      this.view.map.basemap = this.createBaseMap(userSetting);
      this.applySupportMaps(userSetting, this.view.map);
    });
  }

  private createBaseMap(userSetting: UserSetting): Basemap {
    const mapOptions = this.getMapOptions(
      userSetting.topoMap,
      userSetting.language
    );
    const baseLayers: Layer[] = [];

    for (const topoMap of mapOptions) {
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
      let layer: Layer;
      if (topoMap.vector) {
        layer = new VectorTileLayer({
          id: topoMap.name,
          url: topoMap.url
          //TODO: Støtt excludeBounds, så lag ikke overlapper
        });
      } else {
        layer = new WebTileLayer({
          id: topoMap.name,
          urlTemplate: topoMap.url
        });
      }
      baseLayers.push(layer);
    }
    return new Basemap({
      baseLayers: baseLayers,
      id: mapOptions.map((m) => m.name).join(',')
    });
  }

  private applySupportMaps(userSetting: UserSetting, map: Map): void {
    const layersToRemove: Layer[] = [];
    map.layers.forEach((layer) => {
      if (layer instanceof WebTileLayer) {
        layersToRemove.push(layer);
      }
    });
    map.layers.removeMany(layersToRemove);

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
        map.layers.add(layer);
      }
    }
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
    const geoDataTerrengVector: MapOptionsWithBounds = {
      name: TopoMap.geoDataTerrengVector,
      url: settings.map.tiles.geoDataTerrengVectorMapUrl,
      vector: true
    };

    //TODO: Kan vi forenkle dette, f.eks. ved å legge alle kartvalgene i en Map nøkla på TopoMap enum?
    switch (topoMap) {
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

  async initializeMap(): Promise<void> {
    const container = this.mapViewEl.nativeElement;
    const map = new Map();
    this.view = new MapView({
      map: map,
      container,
      zoom: 7,
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

    // Zoom level debug
    if (this.debug) {
      this.zlWatcher = this.view.watch('zoom', (zoom) => {
        this.zoomLevelNode.nativeElement.innerText = zoom;
      });
    }

    if (isAndroidOrIos(this.platform)) {
      this.initOfflineMaps();
    }

    this.view
      .when(() => {
        this.createExtentWatcher(this.view);
        this.loading = false;
        this.mapReady.emit(this.view);
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
        }
      }
    });
  }

  componentIsActive(isActive: boolean): void {
    this.isActive.next(isActive);
  }

  private async initOfflineMaps() {
    this.logger.debug('initOfflineMaps(): ', DEBUG_TAG);
    await this.offlineMapService.initWebServer();

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
    const layer = new VectorTileLayer({
      id: offlineMap.name,
      url: `http://localhost:8080/${offlineMap.name}/root.json`
    });
    let offlineGroupLayer = this.getOfflineGroupLayer();
    if (!offlineGroupLayer) {
      //we create a separate layer group for offline map layers
      offlineGroupLayer = new GroupLayer({ id: OFFLINE_LAYER });
      this.view.map.layers.add(offlineGroupLayer, 0); //put it below observations icon layer
    } else {
      this.removeOfflineLayer(offlineMap); //remove previous version of layer if any
    }
    offlineGroupLayer.add(layer);
    this.logger.debug(`Nytt kartlag lagt til: ${offlineMap.name}`);
  }

  private getOfflineGroupLayer(): GroupLayer {
    return this.view.map.layers.find(
      (layer: Layer) => layer.id === OFFLINE_LAYER
    ) as GroupLayer;
  }

  private removeOfflineLayer(
    mapPackage: OfflineMap,
    offlineGroupLayer?: GroupLayer
  ): void {
    if (!offlineGroupLayer) {
      offlineGroupLayer = this.getOfflineGroupLayer();
    }
    if (offlineGroupLayer) {
      offlineGroupLayer.layers.forEach((layer) => {
        if (mapPackage.name === layer.id) {
          layer.destroy();
          this.logger.debug(`Offline layer '${layer.id}' destroyed`);
        }
      });
    }
  }

  private onPositionUpdate(data: Geoposition) {
    this.zone.runOutsideAngular(() => {
      if (this.view) {
        const latLng = L.latLng({
          lat: data.coords.latitude,
          lng: data.coords.longitude
        });
        if (!this.userMarker) {
          this.userMarker = new UserMarker(this.view, data);
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
      Math.max(settings.map.flyToOnGpsZoom, this.view.zoom),
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
    this.view.goTo(
      new Point({
        latitude: latLng.lat,
        longitude: latLng.lng,
        spatialReference: { wkid: 25833 }
      })
    );
    this.isDoingMoveAction = false;
  }
}
