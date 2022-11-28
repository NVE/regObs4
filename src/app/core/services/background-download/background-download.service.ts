import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DownloadProgress } from './download-progress';

@Injectable()
export abstract class BackgroundDownloadService {
  abstract download(
     url: string
  ): Observable<DownloadProgress>
  // abstract downloadFile(
  //   path: string,
  //   filename: string,
  //   url: string,
  //   onComplete: () => void,
  //   onProgress: (progress: Progress) => void,
  //   onError: (error: Error) => void,
  //   skipLocationSelector?: boolean
  // ): Promise<void>;
  // abstract cancelDownload(filename: string);
  // abstract deleteFolder(path: string, dirName: string): Promise<void>;
  // abstract getFileUrl(path: string, filename: string): Promise<string>;
  // abstract selectDowloadFolder(): Promise<string>;
  // abstract getAllFiles(path: string, dirName: string): Promise<{ directory: string, name: string, url: string, size: number }[]>;
  // abstract downloadToDataUrl(url: string, type: string): Promise<{ dataUrl: string, size: number }>;
}
