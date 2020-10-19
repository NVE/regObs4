import { Injectable } from '@angular/core';
import { BackgroundDownloadService } from './background-download.service';

@Injectable()
export class BackgroundDownloadWebService implements BackgroundDownloadService {

  // downloadFile(
  //     path: string,
  //     filename: string,
  //     url: string,
  //     onComplete: () => void,
  //     onProgress: (progress: Progress) => void,
  //     onError: (error: Error) => void,
  //     skipLocationSelector?: boolean
  // ): Promise<void> {
  //     const request = new HttpRequest('GET', url, {
  //         reportProgress: true,
  //         responseType: 'blob'
  //     });
  //     const subscription = this.httpClient.request(request).subscribe(async event => {
  //         // progress
  //         if (event.type === HttpEventType.DownloadProgress) {
  //             onProgress({ percentage: (event.loaded / event.total), step: ProgressStep.download, description: 'Downloading' });
  //         }
  //         // finished
  //         if (event.type === HttpEventType.Response) {
  //             this.removeSubscription(filename);

  //             if (event.ok) {
  //                 this.saveFile(filename, (event.body as Blob));
  //                 onComplete();
  //             } else {
  //                 onError(Error(`Could not download from url: ${url}. Message: ${event.statusText}`));
  //             }
  //         }
  //     });
  //     this.currentDownloads.set(filename, subscription);
  //     return Promise.resolve();
  // }

  // cancelDownload(filename: string) {
  //     this.removeSubscription(filename);
  // }

  // private saveFile(url: string, data: Blob) {
  //     return nSQL(NanoSql.TABLES.OFFLINE_ASSET.name)
  //         .query('upsert', { url, data, type: 'image/png' })
  //         .exec();
  // }

  // async deleteFile(directory: string, filename: string): Promise<void> {
  //     await nSQL(NanoSql.TABLES.OFFLINE_ASSET.name)
  //         .query('delete', { url: filename })
  //         .exec();
  // }

  // private removeSubscription(filename: string) {
  //     const subscription = this.currentDownloads.get(filename);
  //     if (subscription) {
  //         subscription.unsubscribe();
  //         this.currentDownloads.delete(filename);
  //     }
  // }

  // async getFileUrl(directory: string, filename: string): Promise<string> {
  //     const files = await nSQL(NanoSql.TABLES.OFFLINE_ASSET.name)
  //         .query('select', { name: filename })
  //         .exec() as { name: string, data: Blob }[];
  //     if (files.length > 0) {
  //         return URL.createObjectURL(files[0].data);
  //     } else {
  //         throw new Error(`File ${filename} not found!`);
  //     }
  // }

  // deleteFolder(path: string, dirName: string): Promise<void> {
  //     return Promise.resolve();
  // }

  selectDowloadFolder() {
    return Promise.resolve('');
  }

  // getAllFiles(path: string, dirName: string): Promise<{ directory: string, name: string, url: string, size: number }[]> {
  //     return Promise.resolve([]);
  // }

  // async downloadToDataUrl(url: string, type: string): Promise<{ dataUrl: string, size: number }> {
  //     const headers = new HttpHeaders({ 'Content-Type': type });
  //     const blob = await this.httpClient.get(url, {
  //         responseType: 'blob', headers
  //     }).toPromise();
  //     return DataUrlHelper.toDataUrlWithSize(blob, type);
  // }

}
