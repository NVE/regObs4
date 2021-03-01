import { Progress } from './progress.model';

export interface OfflineMap {
  name: string;
  url: string;
  size: number;
  filename: string;
  filePath?: string;
  progress?: Progress;
  downloadStart?: number;
  downloadComplete?: number;
}
