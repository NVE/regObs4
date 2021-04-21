import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { BackgroundDownloadService } from './background-download.service';
import { Progress } from '../offline-map/progress.model';
import { ProgressStep } from '../offline-map/progress-step.model';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
// Zip did not work
// import { Zip } from '@ionic-native/zip/ngx';
import { HttpClient } from '@angular/common/http';
import JSZip from 'jszip';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class BackgroundDownloadNativeService
  implements BackgroundDownloadService {
  constructor(
    private file: File,
    // private zip: Zip,
    private logger: LoggingService,
    private httpClient: HttpClient
  ) {}

  async downloadFile(
    path: string,
    filename: string,
    url: string,
    folder: string,
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
      try {
        const zip = new JSZip();
        const content = await zip.loadAsync(offlinePackage, {
          createFolders: true
        });
        const zipEntries = Object.keys(content.files);
        this.logger.debug(
          'zip entries',
          'background download native',
          zipEntries
        );
        const directories = zipEntries.filter(
          (name) => content.files[name].dir
        );

        this.logger.debug('Creating directories');
        await this.file.createDir(path, folder, true);
        for (const dir of directories) {
          await this.file.createDir(path + folder, dir, true);
          // this.logger.debug(
          //   'created folder',
          //   'background download native',
          //   path + folder + dir
          // );
        }

        let i = 0;
        const files = zipEntries.filter((name) => !content.files[name].dir);
        const mod = Math.floor(files.length / 100);

        const unzipFile = async (fileName: string) => {
          const zippedFile: JSZip.JSZipObject = content.files[fileName];
          const buffer = await zippedFile.async('arraybuffer');
          await this.file.writeFile(path + folder, fileName, buffer, {
            replace: true
          });

          i++;
          if (i % mod === 0) {
            await onProgress({
              percentage: i / files.length, //TODO: report on file size will give better progress estimate
              step: ProgressStep.extractZip,
              description: 'Unzip files'
            });
          }
        };

        this.logger.debug('Unzipping files');
        await from(files)
          .pipe(mergeMap((file) => unzipFile(file), 10))
          .toPromise();

        onComplete();
      } catch (err) {
        onError(err);
      }
      // const file = await this.file.createFile(path, filename, true);
      // file.createWriter(
      //   async (writer) => {
      //     writer.write(offlinePackage);
      //     await this.nativeOnComplete(
      //       path,
      //       filename,
      //       folder,
      //       onComplete,
      //       onProgress,
      //       onError
      //     );
      //   },
      //   (err) => onError(new Error(`${err.code} - ${err.message}`))
      // );
    } catch (err) {
      onError(err);
    }
  }

  private async nativeOnComplete(
    directory: string,
    filename: string,
    folder: string,
    onComplete: () => void,
    onProgress: (progress: Progress) => void,
    onError: (error: Error) => void
  ) {
    await this.unzipFiles(
      directory,
      filename,
      folder,
      onComplete,
      onProgress,
      onError
    );
  }

  private async unzipFiles(
    path: string,
    filename: string,
    folder: string,
    onComplete: () => void,
    onProgress: (progress: Progress) => void,
    onError: (error: Error) => void
  ) {
    const folderToExtract = path + folder;

    // There is a problem with zip plugin as well, so using JSZip instead
    // https://github.com/MobileChromeApps/cordova-plugin-zip/issues/89

    // console.log(`Unzipping file ${fullpath} to ${folder}`);
    // const result = await this.zip.unzip(
    //   fullpathToZip,
    //   folderToExtract,
    //   (progress) => {
    //     onProgress({
    //       percentage: progress.loaded / progress.total,
    //       step: ProgressStep.extractZip,
    //       description: 'Unzip files'
    //     });
    //   }
    // );
    // if (result === 0) {
    //   // console.log(`Unzip complete. Deleting zip file.`);
    //   this.logger.debug(
    //     'Unzip complete. Deleting zip file.',
    //     'bacground-download-native'
    //   );
    //   await this.file.removeFile(path, filename);
    //   this.logger.debug('Zip file deleted', 'bacground-download-native');
    //   onComplete();
    // } else {
    //   onError(Error('Could not extract files!'));
    // }

    try {
      const zip = new JSZip();
      const fileData = await this.file.readAsBinaryString(path, filename);
      const content = await zip.loadAsync(fileData, { createFolders: true });
      const zipEntries = Object.keys(content.files);
      this.logger.debug(
        'zip entries',
        'background download native',
        zipEntries
      );
      const directories = zipEntries.filter((name) => content.files[name].dir);
      const zipFileEntries = zipEntries.filter(
        (name) => !content.files[name].dir
      );
      await this.file.createDir(path, folder, true);
      for (const dir of directories) {
        await this.file.createDir(folderToExtract, dir, true);
      }
      let i = 0;
      for (const entry of zipFileEntries) {
        const fileContent = await zip.file(entry).async('arraybuffer');
        await this.file.writeFile(folderToExtract, entry, fileContent, {
          replace: true
        });
        i++;
        onProgress({
          percentage: i / zipFileEntries.length,
          step: ProgressStep.extractZip,
          description: 'Unzip files'
        });
      }
      onComplete();
    } catch (err) {
      onError(err);
    }
  }

  // cancelDownload(filename: string) {
  //     const promise = this.currentDownloads.get(filename);
  //     if (promise) {
  //         promise.cancel();
  //     }
  //     this.currentDownloads.delete(filename);
  // }

  async deleteFolder(path: string, dirName: string): Promise<void> {
    await this.file
      .removeRecursively(path, dirName)
      .then(() => {
        this.logger.debug(`removed folder: ${path}${dirName}`);
      })
      .catch((err) => {
        this.logger.error(
          err,
          'background download native',
          `remove folder failed: ${path}${dirName}`
        );
      });
  }

  async getFileUrl(path: string, filename: string): Promise<string> {
    this.logger.debug(`getFileUrl, path = ${path}, filename = ${filename}`);
    const directoryEntry = await this.file.resolveDirectoryUrl(path);
    this.logger.debug(`getFileUrl, directoryEntry = ${directoryEntry.toURL}`);
    const targetFile = await this.file.getFile(directoryEntry, filename, {
      create: false
    });
    this.logger.debug(`getFileUrl, targetFile = ${targetFile.toURL}`);
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
