import { SupportTileLegendLoaderComponent } from 'src/app/modules/side-menu/components/support-tiles-menu/legends/support-tile-legend-loader/support-tile-legend-loader.component';
import { GeoHazard } from './geo-hazard.enum';

export interface SupportTile extends SubTile {
  opacity: number;
  geoHazardId: GeoHazard;
  subTile?: SubTile;
}

export interface SubTile extends SubTileStore {
  description: string;
  url: string;
  availableOffline?: boolean;
}

export interface SupportTileStore extends SubTileStore {
  opacity: number;
  subTile?: SubTileStore;
}

export interface SubTileStore {
  name: string;
  enabled: boolean;
  checked: boolean;
}