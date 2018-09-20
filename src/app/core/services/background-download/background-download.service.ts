import { Progress } from '../offline-map/progress.model';

export abstract class BackgroundDownloadService {
  abstract init();
  abstract downloadFile(
    filename: string,
    url: string,
    onComplete: () => void,
    onProgress: (progress: Progress) => void,
    onError: (error: Error) => void,
    skipLocationSelector?: boolean
  ): Promise<void>;
  abstract cancelDownload(directory: string, filename: string): Promise<void>;
  abstract deleteFile(directory: string, filename: string): Promise<void>;
}
