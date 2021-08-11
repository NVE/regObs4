import { Injectable } from '@angular/core';
import { OfflineMapPackage, OfflinePackageMetadata } from './offline-map.model';
import { Progress } from './progress.model';
import moment from 'moment';
import { DirectoryEntry, File, Metadata, Entry } from '@ionic-native/file/ngx';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { OnReset } from '../../../modules/shared/interfaces/on-reset.interface';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import JSZip from 'jszip';
import { ProgressStep } from './progress-step.model';
import { BackgroundDownloadService } from '../background-download/background-download.service';
import { isAndroidOrIos } from '../../helpers/ionic/platform-helper';
import { Platform } from '@ionic/angular';
import { LogLevel } from '../../../modules/shared/services/logging/log-level.model';
import { HelperService } from '../helpers/helper.service';

const DEBUG_TAG = 'OfflineMapService';
const METADATA_FILE = 'metadata.json';

@Injectable({
  providedIn: 'root'
})
export class OfflineMapService implements OnReset {
  private packages: BehaviorSubject<OfflineMapPackage[]> = new BehaviorSubject([]);
  packages$: Observable<OfflineMapPackage[]> = this.packages.asObservable();

  private mapsFolder = 'NOT_READY';
  private unzipProgress: BehaviorSubject<OfflineMapPackage[]> = new BehaviorSubject([]);
  unzipProgress$ = this.unzipProgress.asObservable();

  private downloads: BehaviorSubject<OfflineMapPackage[]> = new BehaviorSubject([]);
  downloads$ = this.downloads.asObservable();

  constructor(
    private file: File,
    private loggingService: LoggingService,
    private webView: WebView,
    private backgroundDownloadService: BackgroundDownloadService,
    private platform: Platform,
    private helperService: HelperService,
  ) {
    // Start with map packages already downloaded
    this.getMapPackages().then((packages) => {
      this.packages.next(packages);
    }).catch((err) => {
      this.loggingService.error(err, DEBUG_TAG, 'Failed to get map packages');
    });
  }

  private async getMapPackages(): Promise<OfflineMapPackage[]> {
    // TODO: Create own provider for fetching offline packages from storage
    if(!isAndroidOrIos(this.platform)) {
      return [];
    }

    const path = await this.getDataDirectoryFileUrl();
    const mapsDir = await this.getRootDirName();

    // Read offline map package names
    const fileEntries = await this.file.listDir(path, mapsDir);
    const folders = fileEntries.filter((entry) => entry.isDirectory);
    const packageNames = folders
      .map((directoryEntry: Entry) => directoryEntry.name);
    this.loggingService.debug('packageNames', DEBUG_TAG, packageNames);
    
    // Read all folder metadata
    const folderMetadata = await Promise.all(folders.map((folder) => this.getDirectoryMetadata(folder)));

    // Read all package metadata
    const metadata = await Promise.all(packageNames.map((name) => this.getMetadata(name)));

    // Map to map package objects
    const packages = packageNames.map((name, i): OfflineMapPackage => {
      return {
        name,
        downloadStart: folderMetadata[i].modificationTime.getTime() / 1000,
        downloadComplete: folderMetadata[i].modificationTime.getTime() / 1000,
        size: folderMetadata[i].size,
        progress: { percentage: 100 },
        maps: metadata[i].maps
      }
    })

    return packages;
  }

  private async getDirectoryMetadata(entry: Entry): Promise<Metadata> {
    return new Promise((resolve, reject) => 
      entry.getMetadata((metadata) => resolve(metadata)
    , (error) => reject(error)));
  }

  public async downloadPackage(filename: string, url: string, sizeInMb: number): Promise<void> {
    //TODO: Ask user to prefer saving to external SD card if available?
    if(isAndroidOrIos(this.platform)) {
      const availableStorageSpace = await this.getDeviceFreeDiskSpace();

      const neededSpace = sizeInMb * 1000 * 1000 * 2; // How well is the compression? Multiplied by 2 to be safe.
      // Maybe save uncompressed size in package metadata??
      this.loggingService.debug(`Available storage is ${this.helperService.humanReadableByteSize(availableStorageSpace)}. 
      Needs ${this.helperService.humanReadableByteSize(neededSpace)}`, DEBUG_TAG);
      
      if(availableStorageSpace < neededSpace) {
        this.loggingService.log('Not enough disk space to save and extract package', null , LogLevel.Warning, DEBUG_TAG);
        // TODO: Display error to user
        return;
      }
    }

    const name = filename.replace('.zip', '');
    const mapPackage = await this.registerMapPackage(name, filename, sizeInMb);
    this.backgroundDownloadService.download(url).subscribe(async (downloadProgress) => {
      switch(downloadProgress.state) {
        case 'IN_PROGRESS':
          if(downloadProgress.total !== mapPackage.size) {
            mapPackage.size = downloadProgress.total;
            this.updatePackageMetadata(mapPackage);
          }
          this.onProgress(mapPackage, {step: ProgressStep.download,
            percentage: downloadProgress.progress,
            description: 'Downloading...'});
          break;
        case 'DONE':
             const file = downloadProgress.content;
             const root = await this.getRootFileUrl();
             mapPackage.size = file.size;
             this.updatePackageMetadata(mapPackage);
            await this.unzipFile(
                  file,
                  root,
                  name,
                  () => this.onUnzipComplete(mapPackage),
                  (progress) => this.onProgress(mapPackage, progress),
                  (error) => this.onUnzipError(name, error)
            );
          break;
        default:
          break;
      }
    }, (err) => this.onUnzipError(name, err));
  }

  private updatePackageMetadata(metadata: OfflineMapPackage) {
    const unzipProgress = this.unzipProgress.value.filter(p => p.name !== metadata.name);
    this.unzipProgress.next([
      ...unzipProgress,
      metadata
    ]);
  }

  private getDeviceFreeDiskSpace(externalStorage: boolean = false): Promise<number> {
    return new Promise((resolve, reject) => {
      (window as any).DiskSpacePlugin.info({ location: externalStorage ? 2 : 1 }, (success) => resolve(success.free), (err) => reject(err));
    });
  }

  private addMapPackage(newPackage: OfflineMapPackage) {
    const packages = this.packages.value;
    this.packages.next([
      ...packages,
      newPackage
    ]);
  }

  async removeMapPackage(packageToRemove: OfflineMapPackage) {
    const root = await this.getRootFileUrl();
    await this.deleteDirectory(root, packageToRemove.name);
    const packages = this.packages.value.filter(mapPackage => mapPackage.name !== packageToRemove.name);
    this.packages.next(packages);
  }

  /**
   * @returns map package metadata
   */
  private async getMetadata(packageName: string): Promise<OfflinePackageMetadata> {
    this.loggingService.debug('Reading metadata for package:', DEBUG_TAG, packageName);
    const path = await this.getMapPackageFileUrl(packageName);
    this.loggingService.debug('Metadata path:', DEBUG_TAG, path);
    const data = await this.file.readAsText(path, METADATA_FILE);
    const metadata = JSON.parse(data) as OfflinePackageMetadata;
    this.loggingService.debug('Metadata:', DEBUG_TAG, data);

    // Set map urls
    Object.values(metadata.maps).forEach(m => {
      const fileUrl = path + m.path;
      m.url = this.webView.convertFileSrc(fileUrl);
    });

    return metadata;
  }

  async registerMapPackage(name: string, filename: string, sizeInMb: number): Promise<OfflineMapPackage> {
    const mapPackage: OfflineMapPackage = {
      name: name,
      size: sizeInMb * 1000 * 1000,
      filename: filename,
      downloadStart: moment().unix(),
      progress: { percentage: 0, step: ProgressStep.download, description: 'Downloading...' },
      downloadComplete: null,
      maps: {}
    };

    // Start tracking unzip progress
    const progress = this.unzipProgress.value;
    progress.push(mapPackage);
    this.unzipProgress.next(progress);
    return mapPackage;
  }

  async unzipFile(
    zipFile: Blob,
    path: string,
    folder: string,
    onComplete: () => void,
    onProgress: (progress: Progress) => void,
    onError: (error: Error) => void
  ): Promise<void> {
    try {
      const zip = new JSZip();
      const content = await zip.loadAsync(zipFile, {
        createFolders: true
      });
      const zipEntries = Object.keys(content.files);
      this.loggingService.debug(
        'zip entries',
        DEBUG_TAG,
        zipEntries
      );
      const directories = zipEntries.filter((name) => content.files[name].dir);

      this.loggingService.debug('Creating directories');
      await this.file.createDir(path, folder, true);
      const root = `${path}/${folder}`;
      for (const dir of directories) {
        await this.file.createDir(root, dir, true);
      }

      let i = 0;
      const files = zipEntries.filter((name) => !content.files[name].dir);
      const mod = Math.floor(files.length / 100);

      const unzipFile = async (fileName: string) => {
        const zippedFile: JSZip.JSZipObject = content.files[fileName];
        const buffer = await zippedFile.async('arraybuffer');
        await this.file.writeFile(root, fileName, buffer, {
          replace: true
        });

        i++;
        if (i % mod === 0) {
          this.loggingService.debug(
            `Har pakket ut ${i} av ${files.length} filer. ${i / files.length}%`,
            DEBUG_TAG
          );

          await onProgress({
            percentage: i / files.length, //TODO: report on file size will give better progress estimate
            step: ProgressStep.extractZip,
            description: 'Unzip files'
          });
        }
      };

      this.loggingService.debug('Unzipping files');
      await from(files)
        .pipe(mergeMap((file) => unzipFile(file), 10))
        .toPromise();
      onComplete();
    } catch (err) {
      onError(err);
    }
  }

  private onProgress(metadata: OfflineMapPackage, progress: Progress) {
    metadata.progress = progress;
    const unzipProgress = this.unzipProgress.value.filter(p => p.name !== metadata.name);
    this.unzipProgress.next([
      ...unzipProgress,
      metadata
    ]);
  }

  private async onUnzipError(name: string, error: Error) {
    this.loggingService.error(
      error,
      DEBUG_TAG,
      `Error downloading map ${name}`
    );
    //TODO: Delete files?
    //    await this.deleteMapFromDb(name);
    // TODO: Mark map with error?
  }

  private async onUnzipComplete(mapPackage: OfflineMapPackage) {
    mapPackage.downloadComplete = moment().unix();
    mapPackage.progress = { percentage: 1.0 };
    
    // Remove from progress tracking
    const unzipProgress = this.unzipProgress.value.filter(p => p.name !== mapPackage.name);
    this.unzipProgress.next(unzipProgress);

    const secondsSpent = mapPackage.downloadComplete - mapPackage.downloadStart;
    const rate = mapPackage.size / 1024 / secondsSpent;
    this.loggingService.debug(
      `Unzip of ${mapPackage.name} finished in ${secondsSpent}s. Speed: ${rate}kb/s`,
      DEBUG_TAG
    );

    // Add metadata from map package
    const metadata = await this.getMetadata(mapPackage.name);
    mapPackage.maps = metadata.maps;

    this.addMapPackage(mapPackage);
  }

  //#region Directories and file urls

  /**
   * Get file url for data directory
   * 
   * @returns file url as string, with trailing /
   */
  private async getDataDirectoryFileUrl(): Promise<string> {
    // if (this.platform.is('android')) {
    //     const userSettings = await this.userSettingService.getUserSettings();
    //     // TODO: Prefer save offline map on SD card? Show a dialog to ask if user wants to save on external directory?
    //     if (false) {
    //         return this.file.externalDataDirectory;
    //     }
    // }
    if(this.file && this.file.dataDirectory) {
      const fileUrl = this.file.dataDirectory;
      console.assert(fileUrl.endsWith('/'), 'Data Directory does not end with /.');
      return fileUrl;
    }
    return undefined;
  }

  /**
   * Get root directory folder name
   * 
   * @returns directory name as string
   */
  private async getRootDirName(): Promise<string> {
    const dirname = 'maps';
    if (this.mapsFolder === 'NOT_READY') {
      const dataFolder = await this.getDataDirectoryFileUrl();
      await this.file.createDir(dataFolder, dirname, true);
      this.mapsFolder = dirname;
    }
    return this.mapsFolder;
  }

  /**
   * Get file url to the root directory 
   * containing all map packages.
   * 
   * @returns file url as string, without trailing /
   */
  private async getRootFileUrl(): Promise<string> {
    const dataDir = await this.getDataDirectoryFileUrl();
    const mapsDir = await this.getRootDirName();
    return dataDir + mapsDir;
  }

  /**
   * Get file url to map package
   * 
   * @param name - map package name
   * @returns file url as string
   */
  private async getMapPackageFileUrl(name: string): Promise<string> {
    const root = await this.getRootFileUrl();
    return `${root}/${name}`;
  }

  //#endregion

  private async deleteDirectory(path: string, dirName: string): Promise<void> {
    await this.file
      .removeRecursively(path, dirName)
      .then(() => {
        this.loggingService.debug(`removed folder: ${path}/${dirName}`);
      })
      .catch((err) => {
        this.loggingService.error(
          err,
          'background download native',
          `remove folder failed: ${path}${dirName}`
        );
      });
  }

  //TODO: Kan vi bruke disse til noe?
  appOnReset(): void | Promise<any> {}
  appOnResetComplete(): void | Promise<any> {}
}
