import { Polygon } from 'geojson';
import * as L from 'leaflet';
import { TopoMapLayer } from './app/core/models/topo-map-layer.enum';
import { TopoMap } from './app/core/models/topo-map.enum';

interface ITopoMapLayerOptions {
  url: string;

  /**
   * Default tile layer options.
   *
   * NB: map.component.ts also has a getTileLayerDefaultOptions method
   * that defines some defaults.
   */
  options?: L.TileLayerOptions;

  /**
   * Setting this to true will use the RegobsOfflineAwareTileLayer class
   * when creating the leaflet layer if on a device that supports offline maps.
   */
  supportsOffline?: boolean;
}

type TopoMapLayersSettings = {
  [mapLayer in TopoMapLayer]: ITopoMapLayerOptions;
}

interface ITopoMapSettings {
  layer: keyof typeof TopoMapLayer;

  /**
   * TileLayerOptions to override "default" tile layer options
   * defined for each topo map layer.
   */
  options?: L.TileLayerOptions;

  /**
   * Exclude bounds.
   *
   * Used by RegobsTileLayer to avoid loading double base map tiles.
   * Why not just use the bounds defined under topoMapLayers?
   * Answer: Leaflet needs a rectangular bounding box.
   * These bounds are much more detailed.
   */
  excludeBounds?: Polygon[];
}

type TopoMapsSettings = {
  [topoMap in TopoMap]: ITopoMapSettings[]
}

interface IMapTileSettings {
  defaultZoom: number;
  minZoom: number;
  minZoomSupportMaps: number;
  maxZoom: number;
  zoomLevelObservationList: number;
  edgeBufferTiles: number;
  updateWhenIdle: boolean;

  /**
   * Base map layers used in the app.
   */
  topoMapLayers: TopoMapLayersSettings;

  /**
   * Selectable maps in the app side menu.
   * Uses one or more topoMapLayers.
   */
  topoMaps: TopoMapsSettings;

  supportTiles: any;
  supportTilesBounds: L.LatLngTuple[];
}

interface IMapSettings {
  tiles: IMapTileSettings;
  search: any;
  mapSearchZoomToLevel: number;
  unknownMapCenter: L.LatLngTuple;
  flyToOnGpsZoom: number;
  maxClusterRadius: number;
}

export interface ISettings {
  authConfig: any;
  observations: any;
  services: any;
  db: any;
  map: IMapSettings;
  gps: any;
  dateFormats: any;
  kdvElements: any;
  helpTexts: any;
  images: any;
  sentryDsn: string;
  errorEmailAddress: string;
  foregroundUpdateIntervalMs: number;
  backgroundFetchTimeout: number;
  popupDisclamerRefreshTimeMs: number;
  googleAnalytics: any;
  language: any;
}
