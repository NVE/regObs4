import { Polygon } from 'geojson';
import { BaseMapLayer } from './app/core/models/basemap-layer.enum';
import { TopoMap } from './app/core/models/topo-map.enum';

interface IBaseMapLayerOptions {
  url: string;
  options?: L.TileLayerOptions;
  supportsOffline?: boolean;
}

type IBaseMapLayersSettings = {
  [mapLayer in BaseMapLayer]: IBaseMapLayerOptions;
}

interface IBaseMapSettings {
  layer: keyof typeof BaseMapLayer;
  options?: L.TileLayerOptions;
  excludeBounds?: Polygon[];
}

type IBaseMapsSettings = {
  [baseMap in TopoMap]: IBaseMapSettings[]
}

interface IMapTileSettings {
  defaultZoom: number;
  minZoom: number;
  minZoomSupportMaps: number;
  maxZoom: number;
  zoomLevelObservationList: number;
  edgeBufferTiles: number;
  updateWhenIdle: boolean;
  baseMapLayers: IBaseMapLayersSettings;
  baseMaps: IBaseMapsSettings;
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
