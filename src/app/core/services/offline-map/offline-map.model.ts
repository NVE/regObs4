import { Progress } from './progress.model';

export interface OfflineTilesMetadata {
  path: string,
  rootTile: {
    z: number,
    x: number,
    y: number
  },
  zMax: number,
  url?: string
}

export interface OfflinePackageMetadata {
  maps: {
    [id: string]: OfflineTilesMetadata
  }
}

export interface OfflineMapPackage extends OfflinePackageMetadata {
  name: string;
  url?: string;
  size?: number;
  filename?: string;
  filePath?: string;
  progress?: Progress;
  downloadStart?: number;
  downloadComplete?: number;
}
