import { CompoundPackageMetadata } from '../../../pages/offline-map/metadata.model';
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
  compoundPackageMetadata?: CompoundPackageMetadata;
}
