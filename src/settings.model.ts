import { Polygon } from 'geojson';
import L from 'leaflet';
import { SupportTile } from './app/core/models/support-tile.model';
import { TopoMapLayer } from './app/core/models/topo-map-layer.enum';
import { TopoMap } from './app/core/models/topo-map.enum';
import { LangKey } from './app/modules/common-core/models';

export interface ITopoMapLayerOptions {
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
};

export interface ITopoMapSettings {
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

export type TopoMapsSettings = {
  [topoMap in TopoMap]: ITopoMapSettings[];
};

interface IMapTileSettings {
  defaultZoom: number;
  minZoom: number;
  minZoomSupportMaps: number;
  maxZoom: number;
  zoomLevelObservationList: number;
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

  supportTiles: SupportTile[];
}

interface IMapSettings {
  tiles: IMapTileSettings;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  search: any;
  mapSearchZoomToLevel: number;
  unknownMapCenter: L.LatLngTuple;
  flyToOnGpsZoom: number;
  maxClusterRadius: number;
  extentColor: string;
  startExtentColor: string;
  endExtentColor: string;
}

interface Language {
  lang: keyof typeof LangKey;
  name: string;
}

export interface ISettings {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  authConfig: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  observations: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  services: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  db: any;
  map: IMapSettings;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dateFormats: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  kdvElements: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  helpTexts: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  images: any;
  orientation: {
    [key: number]: string;
  };
  sentryDsn: string;
  errorEmailAddress: string;
  foregroundUpdateIntervalMs: number;
  backgroundFetchTimeout: number;
  popupDisclamerRefreshTimeMs: number;
  language: {
    fallbackLang: string;
    supportedLanguages: Language[];
  };
  legalUrl: {
    nb: string;
    en: string;
  };
  feedbackWebUrl: string;
}
