import { Polygon } from 'geojson';
import * as L from 'leaflet';
import { TopoMapLayer } from './app/core/models/topo-map-layer.enum';
import { TopoMap } from './app/core/models/topo-map.enum';

interface ITopoMapLayerOptions {
  url: string;
  options?: L.TileLayerOptions;
  supportsOffline?: boolean;
}

type TopoMapLayersSettings = {
  [mapLayer in TopoMapLayer]: ITopoMapLayerOptions;
}

interface ITopoMapSettings {
  layer: keyof typeof TopoMapLayer;
  options?: L.TileLayerOptions;
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
  topoMapLayers: TopoMapLayersSettings;
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
