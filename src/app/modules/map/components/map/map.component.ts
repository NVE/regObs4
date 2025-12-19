import {
  AfterViewInit,
  Component,
  EventEmitter,
  Injector,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  inject,
  input,
  effect,
  untracked,
  signal,
} from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Position } from '@capacitor/geolocation';
import { Platform } from '@ionic/angular/standalone';
import L from 'leaflet';
import { BehaviorSubject, combineLatest, firstValueFrom, from, fromEventPattern, Subject, timer } from 'rxjs';
import { concatMap, distinctUntilChanged, filter, take, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { isAndroidOrIos } from 'src/app/core/helpers/ionic/platform-helper';
import { MapLayerZIndex } from 'src/app/core/models/maplayer-zindex.enum';
import { TopoMapLayer } from 'src/app/core/models/topo-map-layer.enum';
import { ObserverTripsService } from 'src/app/core/services/observer-trips/observer-trips.service';
import { OfflineMapPackage, OfflineTilesMetadata } from 'src/app/core/services/offline-map/offline-map.model';
import { settings } from '../../../../../settings';
import { UserMarker } from '../../../../core/helpers/leaflet/user-marker/user-marker';
import { TopoMap } from '../../../../core/models/topo-map.enum';
import { UserSetting } from '../../../../core/models/user-settings.model';
import { FullscreenService } from '../../../../core/services/fullscreen/fullscreen.service';
import { GeoPositionService } from '../../../../core/services/geo-position/geo-position.service';
import { OfflineMapService } from '../../../../core/services/offline-map/offline-map.service';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { LoggingService } from '../../../shared/services/logging/logging.service';
import {
  IRegObsTileLayerOptions,
  RegObsOfflineAwareTileLayer,
  RegObsTileLayer,
} from '../../core/classes/regobs-tile-layer';
import { MapSearchService } from '../../services/map-search/map-search.service';
import { MapZoomService } from '../../services/map/map-zoom.service';
import { MapService } from '../../services/map/map.service';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { MapControlsComponent } from '../map-controls/map-controls.component';
import type { FeatureCollection } from 'geojson';
import { GeoJSONService } from 'src/app/core/services/geojson/geojson.service';
import { GeoJSONItem } from 'src/app/core/services/geojson/geojson-item.model';
import { TranslateService } from '@ngx-translate/core';

const DEBUG_TAG = 'MapComponent';

const observerTripsMinZoom = 10;

export const isTopoMapLayer = (mapId: string) => (<string[]>Object.values(TopoMapLayer)).includes(mapId);
const redrawLayersInLayerGroup = (layerGroup: L.LayerGroup) => {
  layerGroup.eachLayer((layer) => {
    if (layer instanceof L.TileLayer) {
      layer.redraw();
    }
  });
};

// Bug in leaflet? When using detectRetina, we need to offset native zooms.
// https://github.com/Leaflet/Leaflet/issues/8850
const getNativeZoomOptions = (map: OfflineTilesMetadata, detectRetina: boolean): L.TileLayerOptions => {
  if (detectRetina && L.Browser.retina) {
    return {
      minNativeZoom: Math.max(0, map.rootTile.z - 1),
      maxNativeZoom: Math.max(0, map.zMax - 1),
    };
  }
  return {
    minNativeZoom: map.rootTile.z,
    maxNativeZoom: map.zMax,
  };
};

const DEFAULT_BASEMAP = settings.map.tiles.topoMaps[TopoMap.default];

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  imports: [LeafletModule, MapControlsComponent],
})
export class MapComponent implements OnInit, OnDestroy, AfterViewInit {
  private userSettingService = inject(UserSettingService);
  private mapService = inject(MapService);
  private mapSearchService = inject(MapSearchService);
  private zone = inject(NgZone);
  private fullscreenService = inject(FullscreenService);
  private loggingService = inject(LoggingService);
  private geoPositionService = inject(GeoPositionService);
  private platform = inject(Platform);
  private mapZoomService = inject(MapZoomService);
  private observerTripsService = inject(ObserverTripsService);
  private geoJSONService = inject(GeoJSONService);
  private translateService = inject(TranslateService);

  readonly showControls = input(true);
  readonly showZoomButtons = input(true);
  readonly showMapSearch = input(true);
  readonly showFullscreenToggle = input(true);
  readonly showGpsCenter = input(true);
  readonly showScale = input(true);
  readonly showSupportMaps = input(true);
  readonly center = input<L.LatLng>();
  readonly zoom = input<number>();
  @Output() mapReady: EventEmitter<L.Map> = new EventEmitter();
  readonly autoActivate = input(true);
  readonly geoTag = input(DEBUG_TAG);
  readonly offlinePackageMode = input(false);
  readonly showObserverTrips = input(false);

  /**
   * Om kartet skal tilpasse seg bounds fra mapservice under oppstarten, eller ikke.
   * Hvis ikke kartet tilpasser seg bounds styres første kartutsnitt bare fra zoom og center.
   */
  readonly fitBounds = input(true);

  /**
   * Update MapService.mapView$ when extent changes.
   *
   * NB: Changes to this input after map init are not reflected.
   */
  readonly updateMapViewOnExtentChange = input(false);

  /**
   * Set to true to show the user location in map.
   * NB: activateFollowModeOnStartup controls if the map should start following the user or not.
   */
  readonly showUserLocation = input(Capacitor.isNativePlatform());
  /**
   * Set to true to start the map in follow mode.
   * This has no effect if showUserLocation is false.
   */
  readonly activateFollowModeOnStartup = input(false);

  readonly metadataName = signal<string | undefined>(undefined);
  readonly metadataDescription = signal<string | undefined>(undefined);

  /**
   * Holds all active geojson layers and handler info, keyed by unique id (e.g. trip id)
   */
  private geojsonLayers = new Map<
    string,
    {
      /**
       * Leaflet layer with GeoJSON FeatureCollection
       */
      layer: L.Layer;
      /**
       * Save event handler so it can be removed if the layer is removed
       */
      showGeojsonWhenZoomedIn: () => void;
    }
  >();

  private map?: L.Map;
  private layerGroup = L.layerGroup();
  private offlineTopoLayerGroup = L.layerGroup();
  private offlineSupportMapLayerGroup = L.layerGroup();
  private userMarker?: UserMarker;
  private ngDestroy$ = new Subject<void>();
  private followMode = true;
  private isDoingMoveAction = false;
  private firstClickOnZoomToUser = true;
  private isActive: BehaviorSubject<boolean>;
  private offlineMapService?: OfflineMapService;
  private bounds?: L.LatLngBounds;

  options = signal<L.MapOptions | undefined>(undefined);

  constructor() {
    // Update map view when map center input changes
    effect(() => {
      const center = this.center();
      untracked(() => {
        if (center && this.map) {
          this.map.setView(center);
        }
      });
    });

    const injector = inject(Injector);

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      _rawPanBy: function (offset: any) {
        if (this._mapPane) {
          L.DomUtil.setPosition(this._mapPane, this._getMapPanePos().subtract(offset));
        }
      },
    });

    this.isActive = new BehaviorSubject(false);
  }

  ngOnInit() {
    this.mapService.showUserLocation = this.showUserLocation();
    this.mapService.followMode = this.showUserLocation() && this.activateFollowModeOnStartup();

    const autoActivate = this.autoActivate();
    if (!this.isActive.value && autoActivate) {
      this.isActive.next(autoActivate);
    }

    this.initMapOptions();
  }

  async initMapOptions() {
    const currentView = await firstValueFrom(this.mapService.mapView$);
    this.bounds = currentView?.bounds;

    this.options.set({
      zoom: this.zoom() || currentView?.zoom || settings.map.tiles.defaultZoom,
      maxZoom: settings.map.tiles.maxZoom,
      minZoom: settings.map.tiles.minZoom,
      center: this.center() || currentView?.center || L.latLng(settings.map.unknownMapCenter),
      bounceAtZoomLimits: false,
      attributionControl: false,
      zoomControl: false,
      maxBounds: [
        [90.0, -180.0],
        [-90, 180.0],
      ],
      maxBoundsViscosity: 1.0,
    });
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
    this.metadataName.set(undefined);
    this.metadataDescription.set(undefined);
  }

  /**
   * Add a single geojson layer by id.
   * @param map Leaflet map
   * @param id Unique id for the geojson layer
   * @param geojson FeatureCollection to add
   * @param metadata Metadata associated with the geojson layer
   */
  private async addGeojsonLayer(map: L.Map, id: string, geojson: FeatureCollection, metadata?: GeoJSONItem) {
    const pointIcon = L.icon({
      iconUrl: '/assets/icon/map/prev-used-place.svg',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      shadowUrl: 'leaflet/marker-shadow.png',
      shadowSize: [41, 41],
    });
    const geojsonLayer = L.geoJSON(geojson, {
      style: { dashArray: '4', color: 'red', stroke: true, weight: 3 },
      pointToLayer: (_, latlng) => {
        return L.marker(latlng, { icon: pointIcon });
      },
    });

    // Add an invisible layer with wider stroke for easier interaction
    const extraTapRadiusLayer = L.geoJSON(geojson, {
      style: { color: 'rgba(0,0,0,0)', weight: 30, stroke: true },
    });

    const layer: L.Layer = L.featureGroup([geojsonLayer, extraTapRadiusLayer]);

    // Add layer to map if zoom is sufficient
    if (map.getZoom() >= observerTripsMinZoom) {
      layer.addTo(map);
    }

    // Click handler for this geojson
    // Obsturer har navn og beskrivelse i properties i geoJSON-objektet, og ikke i metadata-objektet
    const setMetadata = (e: L.LeafletMouseEvent) => {
      const missingName = this.translateService.instant('PLANS.MISSING_NAME');
      const missingDescription = this.translateService.instant('PLANS.MISSING_COMMENT');
      const name = metadata?.name || e.propagatedFrom?.feature?.properties?.navn || missingName;
      const description = metadata?.comment || e.propagatedFrom?.feature?.properties?.beskrivelse || missingDescription;
      this.metadataName.set(name);
      this.metadataDescription.set(description);
    };

    // Zoom handler for this geojson
    const showGeojsonLayerWhenZoomedIn = () => {
      const zoomLevel = map.getZoom();
      if (zoomLevel < observerTripsMinZoom) {
        if (map.hasLayer(layer)) map.removeLayer(layer);
      } else {
        if (!map.hasLayer(layer)) map.addLayer(layer);
      }
    };

    layer.on('click', setMetadata);
    map.on('zoomend', showGeojsonLayerWhenZoomedIn);

    // Store layer and event handler info for this id
    this.geojsonLayers.set(id, {
      layer,
      showGeojsonWhenZoomedIn: showGeojsonLayerWhenZoomedIn,
    });
  }

  /**
   * Remove a single geojson layer by id and clean up event handlers.
   * @param map Leaflet map
   * @param id Unique id for the geojson layer
   */
  private removeGeojsonLayer(map: L.Map, id: string) {
    const entry = this.geojsonLayers.get(id);
    if (entry) {
      if (map.hasLayer(entry.layer)) map.removeLayer(entry.layer);
      entry.layer.off(); // Remove all event listeners
      // Clean up event listeners
      map.off('zoomend', entry.showGeojsonWhenZoomedIn);
      this.geojsonLayers.delete(id);
    }
  }

  onLeafletMapReady(map: L.Map) {
    //TODO: Denne metoden er altfor lang, splitte opp i flere funksjoner!
    this.map = map;
    if (this.showScale()) {
      L.control.scale({ imperial: false }).addTo(map);
    }

    // Det virker som kartet noen ganger kan zoome til hele verden om vi kaller
    // fitBounds uten noe timeout først. Med en timeout fungerer det fint.
    timer(50)
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe(() => {
        // Invalidate map size before we set bounds in case map container size has changed
        map.invalidateSize({ animate: false, noMoveStart: true, debounceMoveend: true });

        if (this.bounds && this.fitBounds()) {
          map.fitBounds(this.bounds, { animate: false, noMoveStart: true });
        }

        // Si fra til map service hva oppdatert extent er etter at kartet er tegnet.
        this.updateMapView();
      });

    if (this.showObserverTrips()) {
      // For backward compatibility, use a single id if only one geojson is provided
      this.observerTripsService.geojson$.pipe(takeUntil(this.ngDestroy$)).subscribe((geojson) => {
        if (geojson) {
          this.addGeojsonLayer(map, 'obsturer', geojson);
        } else {
          this.removeGeojsonLayer(map, 'obsturer');
        }
      });
    }

    this.offlineTopoLayerGroup.addTo(map);
    this.layerGroup.addTo(map);
    this.offlineSupportMapLayerGroup.addTo(map);

    if (this.offlinePackageMode()) {
      // Style all online maps grayscale.
      // We need the dom element that contains the layer to use css and add a grayscale filter.
      // After the load event, getContainer returns the container, earlier, it may return null or undefined.
      map.on('load layeradd', () => {
        this.layerGroup.eachLayer((l: L.Layer) => {
          if (l instanceof L.TileLayer) {
            const container = l.getContainer();
            if (container) {
              container.style.filter = 'grayscale(100%)';
            }
          }
        });
      });
    }

    this.userSettingService.userSetting$.pipe(takeUntil(this.ngDestroy$)).subscribe((userSetting) => {
      this.configureTileLayers(userSetting, map);
    });

    this.mapService.followMode$.pipe(takeUntil(this.ngDestroy$)).subscribe((val) => {
      this.followMode = val;
      this.loggingService.debug(`Follow mode changed to: ${this.followMode}`, DEBUG_TAG);
    });

    this.mapSearchService.mapSearchClick$.pipe(takeUntil(this.ngDestroy$)).subscribe((item) => {
      this.disableFollowMode();
      this.zone.runOutsideAngular(() => {
        const latLng = item instanceof L.LatLng ? item : item.latlng;
        this.flyTo(latLng, settings.map.mapSearchZoomToLevel);
      });
    });
    this.mapService.centerMapToUser$.pipe(takeUntil(this.ngDestroy$)).subscribe(() => {
      this.geoPositionService.choosePositionMethod(DEBUG_TAG);

      this.zone.runOutsideAngular(() => {
        if (this.userMarker) {
          const currentPosition = this.userMarker.getPosition();
          const latLng = L.latLng(currentPosition.coords.latitude, currentPosition.coords.longitude);
          if (this.followMode || this.firstClickOnZoomToUser) {
            // Follow mode is allready true or first click, zoom in
            this.flyToMaxZoom(latLng);
          } else {
            // Use existing zoom
            this.flyTo(latLng, map.getZoom());
          }
          this.firstClickOnZoomToUser = false;
        }
      });
    });

    this.zone.runOutsideAngular(() => {
      map.on('movestart', () => this.onMapMove());
      map.on('zoomstart', () => this.onMapMove());
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
        this.startStopTrackingWhenActive();
      });

    this.mapZoomService.zoomInRequest$.pipe(takeUntil(this.ngDestroy$)).subscribe(() => this.map?.zoomIn());
    this.mapZoomService.zoomOutRequest$.pipe(takeUntil(this.ngDestroy$)).subscribe(() => this.map?.zoomOut());

    this.zone.runOutsideAngular(() => {
      this.startInvalidateSizeMapTimer();

      // this.updateMapViewOnExtentChange er en input, og kan i prinsippet endre seg.
      // Tror ikke vi bruker dette i dag, men hvis vi starter med det, så bør denne if-sjekken fjernes..
      if (this.updateMapViewOnExtentChange()) {
        fromEventPattern(
          (handler) => map.on('resize moveend zoomend', handler),
          (handler) => map.off('resize moveend zoomend', handler)
        )
          .pipe(takeUntil(this.ngDestroy$))
          .subscribe(() => {
            this.updateMapView();
          });
      }
    });

    this.addGeoJsonLayers(map);

    if (isAndroidOrIos(this.platform)) {
      this.initOfflineMaps();
    }

    // Redraw map whenever component is active. If we don't do this some map
    // tiles are gray and not loaded after we naviagate back to the map
    this.isActive
      .pipe(
        distinctUntilChanged(),
        filter((isActive) => isActive === true),
        takeUntil(this.ngDestroy$)
      )
      .subscribe(() => this.redrawMap());

    this.mapReady.emit(map);
  }

  // Henter alle lagrede geoJSON-objekter og oppretter et kartlag for hver av dem
  private async addGeoJsonLayers(map: L.Map) {
    // Endre eller legg til geoJSON-lag når metadata endres
    this.geoJSONService.changedMetadataItem$
      .pipe(
        takeUntil(this.ngDestroy$),
        concatMap((metadata) => from(this.updateGeoJsonLayer(map, metadata)))
      )
      .subscribe();

    // Fjern geoJSON-lag når metadata slettes
    this.geoJSONService.removedMetadataItemId$.pipe(takeUntil(this.ngDestroy$)).subscribe((id) => {
      this.loggingService.debug(`GeoJSON med id = ${id} er slettet, fjerner kartlaget`, DEBUG_TAG, { id });
      this.removeGeojsonLayer(map, id);
    });

    // Tegn alle lagrede geoJSON-objekter ved oppstart
    const allMetadata = this.geoJSONService.metadata();
    for (const metadata of allMetadata) {
      if (metadata.visibleOnMap) {
        const geojson = await this.geoJSONService.get(metadata.id);
        if (geojson) {
          this.addGeojsonLayer(map, metadata.id, geojson, metadata);
        }
      }
    }
  }

  // Oppdaterer et GeoJSON-lag i kartet basert på endrede metadata
  private async updateGeoJsonLayer(map: L.Map, metadata: GeoJSONItem) {
    this.removeGeojsonLayer(map, metadata.id);

    if (metadata.visibleOnMap) {
      const geojson = await this.geoJSONService.get(metadata.id);
      if (geojson) {
        this.loggingService.debug(
          `GeoJson med id = ${metadata.id} er ny eller endret. Tegner sporet (på nytt)`,
          DEBUG_TAG,
          { metadata }
        );
        this.addGeojsonLayer(map, metadata.id, geojson, metadata);
      }
    } else {
      this.loggingService.debug(`GeoJson med id = ${metadata.id} er deaktivert. Fjernet sporet`, DEBUG_TAG, {
        metadata,
      });
    }
  }

  private async initOfflineMaps() {
    if (this.offlineMapService == null) {
      throw new Error('OfflineMapService needs to be provided to use offline maps');
    }
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
    if (this.map == null) {
      throw new Error('Map not initialized');
    }

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
      zIndex: this.offlinePackageMode() ? MapLayerZIndex.Top : MapLayerZIndex.OfflineBackgroundLayer,
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
      zIndex: this.offlinePackageMode() ? MapLayerZIndex.Top + 1 : MapLayerZIndex.OfflineSupportLayer,
      detectRetina,
    });
    this.offlineSupportMapLayerGroup.addLayer(layer);
  }

  private startStopTrackingWhenActive() {
    this.isActive.pipe(distinctUntilChanged(), takeUntil(this.ngDestroy$)).subscribe((active) => {
      if (active) {
        this.geoPositionService.startTrackingComponent(this.geoTag());
      } else {
        this.geoPositionService.stopTrackingComponent(this.geoTag());
      }
    });
  }

  private onMapMove() {
    this.disableFollowMode();
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
    if (this.map && this.updateMapViewOnExtentChange() && this.isActive.value) {
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
      maxZoom: settings.map.tiles.maxZoom,
      detectRetina: useRetinaMap,
      updateWhenIdle: settings.map.tiles.updateWhenIdle,
    };
  }

  private configureTileLayers(userSetting: UserSetting, map: L.Map) {
    const useRetinaMap = userSetting.useRetinaMap && L.Browser.retina;

    this.zone.runOutsideAngular(() => {
      this.layerGroup.clearLayers();
      map.setMaxZoom(useRetinaMap ? settings.map.tiles.maxZoom - 1 : settings.map.tiles.maxZoom);

      for (const layer of this.getTopoMapLayers(userSetting.topoMap, useRetinaMap)) {
        layer.addTo(this.layerGroup);
      }

      for (const supportMap of this.userSettingService.getSupportTilesOptions(userSetting)) {
        if (!supportMap.enabled) {
          continue;
        }

        const options: L.TileLayerOptions = {
          ...this.getTileLayerDefaultOptions(userSetting.useRetinaMap),
          zIndex: MapLayerZIndex.OnlineSupportLayer,
          updateInterval: 600,
          keepBuffer: 0,
          updateWhenIdle: true,
          minZoom: settings.map.tiles.minZoomSupportMaps,
          bounds: supportMap.bounds,
          zoomOffset: supportMap.zoomOffset || 0, // zoomOffset is not required, so set it to 0 if it is undefined
        };

        if (supportMap.maxNativeZoom) {
          let maxNativeZoom = supportMap.maxNativeZoom;

          if (useRetinaMap) {
            // https://github.com/Leaflet/Leaflet/issues/8850
            maxNativeZoom = maxNativeZoom - 1;
          }

          options.maxNativeZoom = maxNativeZoom;
        }

        const layer = this.createSupportMapTileLayer(supportMap.name, supportMap.url, options);
        const opacity = supportMap.opacity != null ? supportMap.opacity : 1;
        layer.setOpacity(opacity);
        layer.addTo(this.layerGroup);
      }
    });
  }

  private createSupportMapTileLayer(name: string, url: string, options: L.TileLayerOptions): RegObsTileLayer {
    if (isAndroidOrIos(this.platform) && this.offlineMapService) {
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

      if (useRetinaMap && options.maxNativeZoom) {
        // https://github.com/Leaflet/Leaflet/issues/8850
        options.maxNativeZoom = options.maxNativeZoom - 1;
      }

      if (defaultLayerSettings.supportsOffline && isAndroidOrIos(this.platform) && this.offlineMapService) {
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
      this.map.invalidateSize({ animate: false, noMoveStart: true, debounceMoveend: true });
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
          this.flyToMaxZoom(latLng);
        }
      }
    });
  }

  private flyToMaxZoom(latLng: L.LatLng) {
    const currentZoom = this.map?.getZoom() || 0;
    this.flyTo(latLng, Math.max(settings.map.flyToOnGpsZoom, currentZoom));
  }

  private flyTo(latLng: L.LatLng, zoom: number) {
    if (this.map == null) {
      throw new Error('Map not initialized');
    }

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
