import { Progress } from '../offline-map/progress.model';
import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { CancelPromise } from './cancel-promise.model';
import { BackgroundDownloadService } from './background-download.service';

@Injectable()
export class BackgroundDownloadNativeService implements BackgroundDownloadService {


    currentDownloads: Map<string, CancelPromise>;

    constructor(private file: File) {
        this.currentDownloads = new Map();
    }

    init() { }

    async downloadFile(
        filename: string,
        url: string,
        onComplete: () => void,
        onProgress: (progress: Progress) => void,
        onError: (error: Error) => void,
        skipLocationSelector?: boolean
    ): Promise<void> {
        const directoryEntry = await this.file.resolveDirectoryUrl(this.file.dataDirectory);
        const targetFile = await this.file.getFile(directoryEntry, filename, { create: true });
        const downloader = new (<any>window).BackgroundTransfer.BackgroundDownloader();
        const download = downloader.createDownload(url, targetFile, filename);
        const promise = download.startAsync().then(() => {
            this.currentDownloads.delete(filename);
            onComplete();
        }, (error) => {
            this.currentDownloads.delete(filename);
            onError(Error(error));
        }, onProgress);
        this.currentDownloads.set(filename, promise);
    }

    cancelDownload(directory: string, filename: string) {
        const promise = this.currentDownloads.get(filename);
        if (promise) {
            promise.cancel();
        }
        this.currentDownloads.delete(filename);
        return Promise.resolve();
    }

    deleteFile(directory: string, filename: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const directoryEntry = await this.file.resolveDirectoryUrl(this.file.dataDirectory);
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

    // TODO: Implement clear all files on reset
}
