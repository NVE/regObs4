import { Progress } from '../offline-map/progress.model';
import { Injectable } from '@angular/core';
import { File, DirectoryEntry, Entry } from '@ionic-native/file/ngx';
import { CancelPromise } from './cancel-promise.model';
import { BackgroundDownloadService } from './background-download.service';
import { Zip } from '@ionic-native/zip/ngx';
import { Platform } from '@ionic/angular';
import { UserSettingService } from '../user-setting/user-setting.service';

@Injectable()
export class BackgroundDownloadNativeService implements BackgroundDownloadService {

    currentDownloads: Map<string, CancelPromise>;

    constructor(
        private file: File,
        private zip: Zip,
        private platform: Platform,
        private userSettingService: UserSettingService) {
        this.currentDownloads = new Map();
    }

    init() { }

    async downloadFile(
        path: string,
        filename: string,
        url: string,
        onComplete: () => void,
        onProgress: (progress: Progress) => void,
        onError: (error: Error) => void,
        skipLocationSelector?: boolean
    ): Promise<void> {
        const directoryEntry = await this.file.resolveDirectoryUrl(path);
        const targetFile = await this.file.getFile(directoryEntry, filename, { create: true });
        const downloader = new (<any>window).BackgroundTransfer.BackgroundDownloader();
        const download = downloader.createDownload(url, targetFile, filename);
        const promise = download.startAsync().then(() => {
            this.nativeOnComplete(path, filename, onComplete, onProgress, onError);
        }, (error) => {
            this.currentDownloads.delete(filename);
            onError(Error(error));
        }, onProgress);
        this.currentDownloads.set(filename, promise);
    }

    private nativeOnComplete(
        directory: string,
        filename: string,
        onComplete: () => void,
        onProgress: (progress: Progress) => void,
        onError: (error: Error) => void
    ) {
        this.currentDownloads.delete(filename);
        this.unzipFiles(directory, filename, onComplete, onProgress, onError);
    }

    private async unzipFiles(path: string,
        filename: string,
        onComplete: () => void,
        onProgress: (progress: Progress) => void,
        onError: (error: Error) => void) {
        const fullpath = path + '/' + filename;
        const folder = fullpath.replace('.zip', '');
        console.log(`Unzipping file ${fullpath} to ${folder}`);
        const result = await this.zip.unzip(fullpath, folder, (progress) => {
            onProgress({ totalBytesToReceive: progress.loaded, bytesReceived: progress.total });
        });
        if (result === 0) {
            console.log(`Unzip complete. Deleting zip file.`);
            await this.deleteFile(path, filename);
            onComplete();
        } else {
            onError(Error('Could not extract files!'));
        }
    }

    cancelDownload(filename: string) {
        const promise = this.currentDownloads.get(filename);
        if (promise) {
            promise.cancel();
        }
        this.currentDownloads.delete(filename);
    }

    deleteFile(path: string, filename: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const directoryEntry = await this.file.resolveDirectoryUrl(path);
            try {
                const targetFile = await this.file.getFile(directoryEntry, filename, { create: false });
                targetFile.remove(() => {
                    resolve();
                }, (error) => {
                    console.error(error);
                    resolve();
                });
            } catch (error) {
                console.error(error);
                resolve();
            }
        });
    }

    async deleteFolder(path: string, dirName: string): Promise<void> {
        await this.file.removeRecursively(path, dirName);
    }

    async getFileUrl(path: string, filename: string): Promise<string> {
        const directoryEntry = await this.file.resolveDirectoryUrl(path);
        const targetFile = await this.file.getFile(directoryEntry, filename, { create: false });
        return targetFile.toURL();
    }

    async selectDowloadFolder(): Promise<string> {
        if (this.platform.is('android')) {
            const userSettings = await this.userSettingService.getUserSettings();
            // TODO: Prefer save offline map on SD card?
            if (false) {
                return this.file.externalDataDirectory;
            }
        }
        return this.file.dataDirectory;
    }

    async getAllFiles(path: string, dirName: string): Promise<Array<{ directory: string, name: string, url: string }>> {
        const directoryEntry = await this.file.resolveDirectoryUrl(path);
        const folder = await this.file.getDirectory(directoryEntry, dirName, { create: false });
        const entries = await this.getEntries(folder);
        const result: { directory: string, name: string, url: string }[] = [];
        for (const entry of entries) {
            if (entry.isDirectory) {
                const files = await this.getAllFiles(path, entry.fullPath);
                result.push(...files);
            } else {
                result.push({ directory: dirName, name: entry.name, url: entry.toURL() });
            }
        }
        return result;
    }

    private getEntries(folder: DirectoryEntry): Promise<Entry[]> {
        return new Promise<Entry[]>((resolve, reject) => {
            const reader = folder.createReader();
            reader.readEntries((entries) => {
                resolve(entries);
            }, (error) => {
                reject(error);
            });
        });
    }

    // private async getAllFilesForDirectory(path: string, dirName: string) {
    //     return new Promise<Array<{ directory: string, name: string, url: string }>>(async (resolve, reject) => {
    //         const directoryEntry = await this.file.resolveDirectoryUrl(path);
    //         const folder = await this.file.getDirectory(directoryEntry, dirName, { create: false });
    //         const reader = folder.createReader();
    //         reader.readEntries((entries) => {
    //             const result: { directory: string, name: string, url: string }[] = [];
    //             entries.forEach(async (entry) => {
    //                 if (entry.isFile) {
    //                     result.push({ directory: dirName, name: entry.name, url: entry.toURL() });
    //                 }
    //             });
    //             resolve(result);
    //         }, (error) => {
    //             reject(error);
    //         });
    //     });
    // }

    // TODO: Implement clear all files on reset
}
