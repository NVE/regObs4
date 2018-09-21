import { Injectable } from '@angular/core';
import { BackgroundDownloadService } from './background-download.service';
import { Progress } from '../offline-map/progress.model';
import { HttpRequest, HttpClient, HttpEventType } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { nSQL } from 'nano-sql';

const tableName = 'webfiles';

@Injectable()
export class BackgroundDownloadWebService implements BackgroundDownloadService {


    currentDownloads: Map<string, Subscription>;

    constructor(private httpClient: HttpClient) {
        this.currentDownloads = new Map();
    }

    init() {
        nSQL(tableName)
            .model([
                { key: 'name', type: 'string', props: ['pk'] },
                { key: 'data', type: 'blob' },
            ]);
    }

    downloadFile(
        path: string,
        filename: string,
        url: string,
        onComplete: () => void,
        onProgress: (progress: Progress) => void,
        onError: (error: Error) => void,
        skipLocationSelector?: boolean
    ): Promise<void> {
        const request = new HttpRequest('GET', url, {
            reportProgress: true,
            responseType: 'blob'
        });
        const subscription = this.httpClient.request(request).subscribe(async event => {
            // progress
            if (event.type === HttpEventType.DownloadProgress) {
                onProgress({ bytesReceived: event.loaded, totalBytesToReceive: event.total });
            }
            // finished
            if (event.type === HttpEventType.Response) {
                this.removeSubscription(filename);

                if (event.ok) {
                    this.saveFile(filename, (event.body as Blob));
                    onComplete();
                } else {
                    onError(Error(`Could not download from url: ${url}. Message: ${event.statusText}`));
                }
            }
        });
        this.currentDownloads.set(filename, subscription);
        return Promise.resolve();
    }

    cancelDownload(filename: string) {
        this.removeSubscription(filename);
    }

    private saveFile(name: string, data: Blob) {
        return nSQL(tableName)
            .query('upsert', { name, data })
            .exec();
    }

    async deleteFile(directory: string, filename: string): Promise<void> {
        await nSQL(tableName)
            .query('delete', { name: filename })
            .exec();
    }

    private removeSubscription(filename: string) {
        const subscription = this.currentDownloads.get(filename);
        if (subscription) {
            subscription.unsubscribe();
            this.currentDownloads.delete(filename);
        }
    }

    async getFileUrl(directory: string, filename: string): Promise<string> {
        const files = await nSQL(tableName)
            .query('select', { name: filename })
            .exec() as { name: string, data: Blob }[];
        if (files.length > 0) {
            return URL.createObjectURL(files[0].data);
        } else {
            throw new Error(`File ${filename} not found!`);
        }
    }

    deleteFolder(path: string, dirName: string): Promise<void> {
        return Promise.resolve();
    }

    selectDowloadFolder() {
        return Promise.resolve('');
    }

    getAllFiles(path: string, dirName: string): Promise<{ directory: string, name: string, url: string }[]> {
        return Promise.resolve([]);
    }

}
