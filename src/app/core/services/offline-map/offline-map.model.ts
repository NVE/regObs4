import { CompoundPackage } from '../../../pages/offline-map/metadata.model';
import { Progress } from './progress.model';

export interface OfflineTilesMetadata {
  mapId: string,
  rootTile: {
    z: number,
    x: number,
    y: number
  },
  zMax: number,
  template: string,
  url?: string;
}

export interface OfflinePackageMetadata {
  // TODO: Do we need ids both here and in OfflineTilesMetadata?
  // Should this be an array?
  maps: {
    [id: string]: OfflineTilesMetadata
  }
}

export interface OfflineMapPackage extends OfflinePackageMetadata {
  name: string;
  size?: number;
  progress?: Progress;
  downloadStart?: number; //in epoch seconds
  downloadComplete?: number; //in epoch seconds
  error?: Error; // Error occured when download/unzip
  compoundPackageMetadata?: CompoundPackage;
}
