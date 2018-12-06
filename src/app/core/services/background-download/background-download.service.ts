import { Progress } from '../offline-map/progress.model';

export abstract class BackgroundDownloadService {
  abstract downloadFile(
    path: string,
    filename: string,
    url: string,
    onComplete: () => void,
    onProgress: (progress: Progress) => void,
    onError: (error: Error) => void,
    skipLocationSelector?: boolean
  ): Promise<void>;
  abstract cancelDownload(filename: string);
  abstract deleteFolder(path: string, dirName: string): Promise<void>;
  abstract getFileUrl(path: string, filename: string): Promise<string>;
  abstract selectDowloadFolder(): Promise<string>;
  abstract getAllFiles(path: string, dirName: string): Promise<{ directory: string, name: string, url: string, size: number }[]>;
}
