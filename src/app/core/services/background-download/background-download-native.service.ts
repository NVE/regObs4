import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { BackgroundDownloadService } from './background-download.service';
import { Progress } from '../offline-map/progress.model';
import { ProgressStep } from '../offline-map/progress-step.model';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { Zip } from '@ionic-native/zip/ngx';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BackgroundDownloadNativeService
  implements BackgroundDownloadService {
  constructor(
    private file: File,
    private zip: Zip,
    private logger: LoggingService,
    private httpClient: HttpClient
  ) {}

  async downloadFile(
    path: string,
    filename: string,
    url: string,
    onComplete: () => void,
    onProgress: (progress: Progress) => void,
    onError: (error: Error) => void
  ): Promise<void> {
    // TODO: Background download plugin should be used to get proper Download manager that can run in backround
    // but this plugin is not maintained https://github.com/sgrebnov/cordova-plugin-background-download
    // const directoryEntry = await this.file.resolveDirectoryUrl(path);
    // const targetFile = await this.file.getFile(directoryEntry, filename, {
    //   create: true
    // });
    // const downloader = new (<any>(
    //   window
    // )).BackgroundTransfer.BackgroundDownloader();
    // const download = downloader.createDownload(url, targetFile, filename);
    // const promise = download.startAsync().then(
    //   async () => {
    //     await this.nativeOnComplete(
    //       path,
    //       filename,
    //       onComplete,
    //       onProgress,
    //       onError
    //     );
    //   },
    //   (error) => {
    //     this.currentDownloads.delete(filename);
    //     onError(Error(error));
    //   },
    //   (progress) => {
    //     onProgress({
    //       percentage: progress.bytesReceived / progress.totalBytesToRecieve,
    //       step: ProgressStep.download,
    //       description: 'Downloading'
    //     });
    //   }
    // );
    try {
      const offlinePackage = await this.httpClient
        .get(url, { responseType: 'blob' })
        .toPromise();
      const file = await this.file.createFile(path, filename, true);
      file.createWriter(
        async (writer) => {
          writer.write(offlinePackage);
          await this.nativeOnComplete(
            path,
            filename,
            onComplete,
            onProgress,
            onError
          );
        },
        (err) => onError(new Error(`${err.code} - ${err.message}`))
      );
    } catch (err) {
      onError(err);
    }
  }

  private async nativeOnComplete(
    directory: string,
    filename: string,
    onComplete: () => void,
    onProgress: (progress: Progress) => void,
    onError: (error: Error) => void
  ) {
    await this.unzipFiles(directory, filename, onComplete, onProgress, onError);
  }

  private async unzipFiles(
    path: string,
    filename: string,
    onComplete: () => void,
    onProgress: (progress: Progress) => void,
    onError: (error: Error) => void
  ) {
    const fullpath = path + '/' + filename;
    const folder = fullpath.replace('.zip', '');
    // console.log(`Unzipping file ${fullpath} to ${folder}`);
    const result = await this.zip.unzip(fullpath, folder, (progress) => {
      onProgress({
        percentage: progress.loaded / progress.total,
        step: ProgressStep.extractZip,
        description: 'Unzip files'
      });
    });
    if (result === 0) {
      // console.log(`Unzip complete. Deleting zip file.`);
      this.logger.debug(
        'Unzip complete. Deleting zip file.',
        'bacground-download-native'
      );
      await this.file.removeFile(path, filename);
      this.logger.debug('Zip file deleted', 'bacground-download-native');
      onComplete();
    } else {
      onError(Error('Could not extract files!'));
    }
  }

  // cancelDownload(filename: string) {
  //     const promise = this.currentDownloads.get(filename);
  //     if (promise) {
  //         promise.cancel();
  //     }
  //     this.currentDownloads.delete(filename);
  // }

  // async deleteFolder(path: string, dirName: string): Promise<void> {
  //     await this.file.removeRecursively(path, dirName);
  // }

  async getFileUrl(path: string, filename: string): Promise<string> {
    const directoryEntry = await this.file.resolveDirectoryUrl(path);
    const targetFile = await this.file.getFile(directoryEntry, filename, {
      create: false
    });
    return targetFile.toURL();
  }

  selectDowloadFolder(): Promise<string> {
    // if (this.platform.is('android')) {
    //     const userSettings = await this.userSettingService.getUserSettings();
    //     // TODO: Prefer save offline map on SD card? Show a dialog to ask if user wants to save on external directory?
    //     if (false) {
    //         return this.file.externalDataDirectory;
    //     }
    // }
    return Promise.resolve(this.file.dataDirectory);
  }

  // async getAllFiles(path: string, dirName: string): Promise<Array<{ directory: string, name: string, url: string, size: number }>> {
  //     const directoryEntry = await this.file.resolveDirectoryUrl(path);
  //     const folder = await this.file.getDirectory(directoryEntry, dirName, { create: false });
  //     const entries = await this.getEntries(folder);
  //     const result: { directory: string, name: string, url: string, size: number }[] = [];
  //     for (const entry of entries) {
  //         if (entry.isDirectory) {
  //             const files = await this.getAllFiles(path, entry.fullPath);
  //             result.push(...files);
  //         } else {
  //             const fileSize = await this.getFileSize(entry);
  //             result.push({ directory: dirName, name: entry.name, url: entry.toURL(), size: fileSize });
  //         }
  //     }
  //     return result;
  // }

  // async downloadToDataUrl(url: string, type: string): Promise<{ dataUrl: string, size: number }> {
  //     const directory = this.platform.is('ios') ? this.file.tempDirectory : this.file.dataDirectory;
  //     const filename = utils.uuid();
  //     const path = `${directory}${filename}`;
  //     const fileResult: FileEntry = await this.http.downloadFile(url, {}, {}, path);
  //     const blob = await this.getFileBlob(fileResult);
  //     blob.type = type;
  //     const result = await DataUrlHelper.toDataUrlWithSize(blob, type);
  //     await this.file.removeFile(directory, filename);
  //     return result;
  // }

  // private getFileBlob(file: FileEntry) {
  //     return new Promise<IFile>((resolve, reject) =>
  //         file.file((success) => resolve(success), (_) => reject(Error('Could not get file'))));
  // }

  // private getFileSize(file: Entry) {
  //     if (!file) {
  //         return 0;
  //     } else {
  //         return new Promise<number>((resolve) =>
  //             file.getMetadata((success) => resolve(success.size), (_) => resolve(0)));
  //     }
  // }

  // private getEntries(folder: DirectoryEntry): Promise<Entry[]> {
  //     return new Promise<Entry[]>((resolve, reject) => {
  //         const reader = folder.createReader();
  //         reader.readEntries((entries) => {
  //             resolve(entries);
  //         }, (error) => {
  //             reject(error);
  //         });
  //     });
  // }
}
