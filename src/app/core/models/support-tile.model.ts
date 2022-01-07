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

// export class SupportTileMenuSelection implements SupportTile {
//   private enabled: boolean;
//   private subTile?: SubTile;

//   constructor(tile: SupportTile) {
//     this.enabled = tile.enabled;
//     this.subTile = tile.subTile;
//   }

//   get checked(): boolean {
//     if (this.enabled || this.subTile?.enabled) {
//       return true;
//     }
//     return false;
//   }

//   set checked(checked: boolean) {
//     this.enabled = checked;
//     if (this.subTile) {
//       this.subTile.enabled = false;
//     }
//   }
// }

// export class SupportTileMenuSelection2 implements SupportTile {
//   private enabled: boolean;
//   private subTile?: SubTile;

//   constructor(tile: SupportTile) {
//     this.enabled = tile.enabled;
//     this.subTile = tile.subTile;
//   }

//   get checked(): boolean {
//     if (this.enabled || this.subTile?.enabled) {
//       return true;
//     }
//     return false;
//   }

//   set checked(checked: boolean) {
//     this.enabled = checked;
//     if (this.subTile) {
//       this.subTile.enabled = false;
//     }
//   }
// }

