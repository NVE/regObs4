import { GeoHazard } from 'src/app/modules/common-core/models';
import * as L from 'leaflet';

export interface SupportTile extends SubTile {
  opacity: L.TileLayerOptions['opacity'];
  geoHazardId: GeoHazard;
  subTile?: SubTile;
}

export interface SubTile extends SubTileStore {
  description: string;
  url: string;
  availableOffline?: boolean;
  bounds: L.TileLayerOptions['bounds'];
  maxNativeZoom?: L.TileLayerOptions['maxNativeZoom'];
}

export interface SupportTileStore extends SubTileStore {
  opacity: L.TileLayerOptions['opacity'];
  subTile?: SubTileStore;
}

export interface SubTileStore {
  name: string;
  enabled: boolean;
  checked: boolean;
}
