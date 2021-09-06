import { Injectable } from '@angular/core';
import { OfflineMapPackage, OfflineTilesMetadata } from './offline-map.model';
import { Progress } from './progress.model';
import moment from 'moment';
import { File, Metadata, Entry } from '@ionic-native/file/ngx';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';
import { BehaviorSubject, from, Observable, Subscription } from 'rxjs';
import { finalize, map, mergeMap, shareReplay, switchMap, take } from 'rxjs/operators';
import { OnReset } from '../../../modules/shared/interfaces/on-reset.interface';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import JSZip from 'jszip';
import { ProgressStep } from './progress-step.model';
import { BackgroundDownloadService } from '../background-download/background-download.service';
import { isAndroidOrIos } from '../../helpers/ionic/platform-helper';
import { AlertController, Platform } from '@ionic/angular';
import { LogLevel } from '../../../modules/shared/services/logging/log-level.model';
import { HelperService } from '../helpers/helper.service';
import { TranslateService } from '@ngx-translate/core';
import { CompoundPackage, Part } from 'src/app/pages/offline-map/metadata.model';

const DEBUG_TAG = 'OfflineMapService';
const METADATA_FILE = 'metadata.json';
const ROOT_MAP_DIR = 'maps';

@Injectable({
  providedIn: 'root'
})
export class OfflineMapService implements OnReset {
  private packages: BehaviorSubject<OfflineMapPackage[]> = new BehaviorSubject([]);
  packages$: Observable<OfflineMapPackage[]> = this.packages.asObservable();

  private downloadAndUnzipProgress: BehaviorSubject<OfflineMapPackage[]> = new BehaviorSubject([]);
  downloadAndUnzipProgress$ = this.downloadAndUnzipProgress.asObservable();

  availableDiskspace: {available: number, used: number };


  private downloadSubscription: Subscription;
  private cancel = false;

  private hasCreatedRootFolder = false;

  constructor(
    private file: File,
    private loggingService: LoggingService,
    private webView: WebView,
    private backgroundDownloadService: BackgroundDownloadService,
    private platform: Platform,
    private helperService: HelperService,
    private translateService: TranslateService,
    private alertController: AlertController,
  ) {
    // Start with map packages already downloaded
    this.getMapPackages().then((packages) => {
      this.packages.next(packages);
    }).catch((err) => {
      this.loggingService.error(err, DEBUG_TAG, 'Failed to get map packages');
    });
    this.packages$.pipe(
      switchMap((packages) => from(this.getDeviceFreeDiskSpace()).pipe(map((available) => ({ 
        available, 
        used: this.calculateTotalOfflinePackagesDiskspaceUsed(packages) 
    }))))).subscribe((val) => {
      setTimeout(() => {
        this.availableDiskspace = val;
      });
    })
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
    const packageNames = await this.getFolderNameWithCompleteFiles(fileEntries.filter((entry) => entry.isDirectory));
    this.loggingService.debug('packageNames', DEBUG_TAG, packageNames);

    // Read all package metadata
    const packages = await Promise.all(packageNames.map((name) => this.getMetadata(name)));

    return packages;
  }

  private calculateTotalOfflinePackagesDiskspaceUsed(packages: OfflineMapPackage[]): number {
    return packages.reduce((pv, cv) => ((cv.downloadComplete && cv.size != null) ? cv.size : 0) + pv, 0);
  }

  private async getFolderNameWithCompleteFiles(folders: Entry[]) : Promise<string[]> {
    return (await Promise.all(folders.map((directoryEntry: Entry) => this.hasCompleteFile(directoryEntry.name).then((result) => result ? directoryEntry.name : null))))
      .filter((packageName) => packageName != null);
  }

  public async downloadPackage(packageMetadataCombined: CompoundPackage, checkAvailableDiskSpace = false): Promise<void> {

    if(checkAvailableDiskSpace) {
      //TODO: Ask user to prefer saving to external SD card if available?
      const availableSpace = await this.checkAvailableDiskSpace(packageMetadataCombined);
      if(!availableSpace) {
        return;
      }
   }

    const name = packageMetadataCombined.getName();
    const mapPackage = this.createOfflineMapPackage(packageMetadataCombined);

    // Add new map package to progress subject
    this.downloadAndUnzipProgress.next([...this.downloadAndUnzipProgress.value,  mapPackage]);

    if(this.downloadSubscription == null) {
      //Start downlaod if not anyting currently downloading
      this.startDownloadNextItemInQueue();
    }
    
  }

  private startDownloadNextItemInQueue() {
    const nextInQueue = this.downloadAndUnzipProgress.value.filter((p => 
        p.progress.step === ProgressStep.pending))[0];
    if(nextInQueue != null) {
      this.onProgress(nextInQueue, {
        step: ProgressStep.download,
        percentage: 0,
        description: ''
      });

      this.startDownloadPackage(nextInQueue);
    }
  }

  private startDownloadPackage(offlineMapPackage: OfflineMapPackage) {
     // Find all zip-files (urls) to download and unzip
     const parts = offlineMapPackage.compoundPackageMetadata.getParts();

     // Start recursive download and unzip
     this.downloadAndUnzipPart(offlineMapPackage.name, parts[0], parts, offlineMapPackage, 0, parts.length);
  }

  public cancelDownloadPackage(offlineMapPackage: OfflineMapPackage) {

    if(offlineMapPackage.progress.step === ProgressStep.pending) {
       this.removePackageFromDownloadAndProgress(offlineMapPackage);
    } else if(offlineMapPackage.error) {
      this.onCancelled(offlineMapPackage);
    } else if(offlineMapPackage.progress.step === ProgressStep.download || offlineMapPackage.progress.step === ProgressStep.extractZip) {

      this.cancel = true;
      this.downloadSubscription?.unsubscribe();
    }
  }

  private removePackageFromDownloadAndProgress(offlineMapPackage: OfflineMapPackage) {
    this.downloadAndUnzipProgress.next(this.downloadAndUnzipProgress.value.filter(mapPackage => mapPackage.name !== offlineMapPackage.name));
  }

  private downloadAndUnzipPart(name: string, part: Part, parts: Part[], mapPackage: OfflineMapPackage, partNumber: number, totalParts: number) {
    const subfolder = part.name;
    const folder = `${name}/${subfolder}`;
    this.downloadSubscription = this.backgroundDownloadService.download(part.url).pipe(finalize(() => {
      if(this.cancel) {
        this.onCancelled(mapPackage);
      }
    })).subscribe(async (downloadProgress) => {
      switch(downloadProgress.state) {
        case 'IN_PROGRESS':
          this.onProgress(mapPackage, {step: ProgressStep.download,
            percentage: this.calculateTotalProgress(downloadProgress.progress, partNumber, totalParts, 'Downloading'),
            description: `Download part ${partNumber+1}/${totalParts}`});
          break;
        case 'DONE':
             const file = downloadProgress.content;
             const root = await this.getRootFileUrl();
            await this.unzipFile(
                  file,
                  root,
                  folder,
                  () => this.onUnzipStepComplete(name, parts, mapPackage, partNumber, totalParts),
                  (progress) => this.onProgress(mapPackage, {step: ProgressStep.extractZip,
                    percentage: this.calculateTotalProgress(progress, partNumber, totalParts, 'Unzipping'),
                    description: `Unzip ${partNumber+1}/${totalParts}`}),
                  (error) => this.onUnzipOrDownloadError(mapPackage, error, false)
            );
          break;
        default:
          break;
      }
    }, (err) => this.onUnzipOrDownloadError(mapPackage, err, true));
  }

  public calculateTotalProgress(currentProgress: number, currentPart: number, totalParts: number, partOfStep: 'Downloading' | 'Unzipping') {
    const stepsForEachPart = 2; // Download and unzip
    const totalPartsOfWork = totalParts * stepsForEachPart;
    const currentPartOfWork = ((currentPart * stepsForEachPart) + (partOfStep === 'Downloading' ? 0 : 1)) / totalPartsOfWork;
    const progressForTotalParts = (currentProgress / totalPartsOfWork) + (currentPartOfWork);
    return progressForTotalParts;
  }

  private onUnzipStepComplete(name: string, parts: Part[], mapPackage: OfflineMapPackage, partNumber: number, totalParts: number) {
    if(this.cancel) {
      this.onCancelled(mapPackage);
      return;
    }

    const nextPart = partNumber + 1;
    if(nextPart < totalParts) {
      this.downloadAndUnzipPart(name, parts[nextPart], parts, mapPackage, nextPart, totalParts);
    }else{
      this.onDownloadAndUnzipComplete(mapPackage);
    }
  }

  public async checkAvailableDiskSpace(packageMetadataCombined: CompoundPackage): Promise<boolean> {
    if(isAndroidOrIos(this.platform) && this.availableDiskspace != null) {

      const neededSpace = await this.getNeededDiskSpaceForPackage(packageMetadataCombined);

      this.loggingService.debug(`Available storage is ${this.helperService.humanReadableByteSize(this.availableDiskspace.available)}. 
      Needs ${this.helperService.humanReadableByteSize(neededSpace)}`, DEBUG_TAG);
      
      if(this.availableDiskspace.available < neededSpace) {
        this.loggingService.log('Not enough disk space to save and extract package', null , LogLevel.Warning, DEBUG_TAG);

        await this.showNotEnoughDiskSpaceAvailableErrorMessage();
        return false;
      }
    }else {
      return Promise.resolve(true);
    }
    return true;
  }

  public async getNeededDiskSpaceForPackage(packageMetadataCombined: CompoundPackage, compressionFactor: number = 1.10) : Promise<number> {
    const neededSpaceForCurrentPackage = packageMetadataCombined.getSizeInMiB() * 1024 * 1024 * compressionFactor; 

    const neededSpaceForItemsInQueue = await this.downloadAndUnzipProgress$.pipe(take(1), map((items) => items.filter((x) => x.downloadComplete == null && x.error == null)
                        .reduce((pv, cv) => pv += (cv.size * compressionFactor), 0))).toPromise();
    
    return neededSpaceForCurrentPackage + neededSpaceForItemsInQueue;
  }

  private async showNotEnoughDiskSpaceAvailableErrorMessage() {
    const translations = await this.translateService
      .get(['OFFLINE_MAP.DISKSPACE_ERROR_MESSAGE', 'ALERT.OK'])
      .toPromise();
    const alert = await this.alertController.create({
      message: translations['OFFLINE_MAP.DISKSPACE_ERROR_MESSAGE'],
      buttons: [
        {
          text: translations['ALERT.OK'],
        },
      ]
    });
    alert.present();
  }

  private async showDownloadOrUnzipErrorMessage(isDownloading: boolean) {
    const messageKey = isDownloading ? 'OFFLINE_MAP.DOWNLOAD_ERROR_MESSAGE' : 'OFFLINE_MAP.UNZIP_ERROR_MESSAGE'
    const translations = await this.translateService
      .get([messageKey, 'ALERT.OK'])
      .toPromise();
    const alert = await this.alertController.create({
      message: translations[messageKey],
      buttons: [
        {
          text: translations['ALERT.OK'],
        },
      ]
    });
    alert.present();
  }

  private getDeviceFreeDiskSpace(externalStorage: boolean = false): Promise<number> {
    if(!isAndroidOrIos(this.platform)) {
      return Promise.resolve(0);
    }

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

  async removeMapPackageByName(packageNameToRemove: string) {
    // Delete files
    const root = await this.getRootFileUrl();
    await this.deleteDirectory(root, packageNameToRemove);
    // Remove package from installed packages subject list
    this.packages.next(this.packages.value.filter(mapPackage => mapPackage.name !== packageNameToRemove));
    // Also remove any pending / downloading packages in progress
    this.downloadAndUnzipProgress.next(this.downloadAndUnzipProgress.value.filter(mapPackage => mapPackage.name !== packageNameToRemove));
  }

  private async readCompleteFile(packageName: string): Promise<{ size: number, downloadComplete: number }> {
    const path = await this.getMapPackageFileUrl(packageName);
    const completeFile = await this.file.resolveLocalFilesystemUrl(`${path}/COMPLETE`);
    const doneSize = await this.file.readAsText(path, 'COMPLETE');
    return new Promise((resolve, reject) => {
      completeFile.getMetadata((success) => resolve({ size: +doneSize, downloadComplete: success.modificationTime.getTime() / 1000  }), (err) => reject(err));
    });
  }

  private async hasCompleteFile(packageName: string): Promise<boolean> {
    try{
    const path = await this.getMapPackageFileUrl(packageName);
    return await this.file.checkFile(`${path}/`, 'COMPLETE');
    }catch(err) {
      // throws error if file does not exist
      return false;
    }
  }

  private async getMapsInPackageFolder(packageName: string): Promise<string[]> {
    const rootFileUrl = await this.getRootFileUrl();
    const fileEntries = await this.file.listDir(rootFileUrl, packageName);
    return fileEntries.filter((entry) => entry.isDirectory).map((entry) => entry.name);
  }

  /**
   * @returns map package metadata
   */
  private async getMetadata(packageName: string): Promise<OfflineMapPackage> {
    this.loggingService.debug('Reading metadata for package:', DEBUG_TAG, packageName);
    const path = await this.getMapPackageFileUrl(packageName);
    const completeFile = await this.readCompleteFile(packageName);

    const offlineMapPackage: OfflineMapPackage = {
      name: packageName,
      downloadComplete: completeFile.downloadComplete,
      size: completeFile.size,
      maps: {},
    };

    const maps = await this.getMapsInPackageFolder(packageName);
    for(let map of maps) {
      const metadataPath = `${path}/${map}`;
      this.loggingService.debug('Metadata path:', DEBUG_TAG, metadataPath);
      const data = await this.file.readAsText(metadataPath, METADATA_FILE);
      const metadata = JSON.parse(data) as OfflineTilesMetadata;
      this.loggingService.debug('Metadata:', DEBUG_TAG, metadata);

      offlineMapPackage.maps[map] = { ...metadata, url: this.webView.convertFileSrc(`${path}/${map}`) };
    }

    this.loggingService.debug('Offline map package metadata: ', DEBUG_TAG, offlineMapPackage);

    return offlineMapPackage;
  }

  private createOfflineMapPackage(compoundPackageMetadata: CompoundPackage): OfflineMapPackage {
    const mapPackage: OfflineMapPackage = {
      name: compoundPackageMetadata.getName(),
      size: compoundPackageMetadata.getSizeInMiB() * 1024 * 1024,
      downloadStart: moment().unix(),
      progress: { percentage: 0, step: ProgressStep.pending, description: 'In queue...' },
      downloadComplete: null,
      maps: {},
      compoundPackageMetadata,
    };
    return mapPackage;
  }

  async unzipFile(
    zipFile: Blob,
    path: string,
    folder: string,
    onComplete: () => void,
    onProgress: (progress: number) => void,
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

      // if(!isAndroidOrIos(this.platform)) {
      //   throw Error('Unzip file not implemented on web!')
      // }

      this.loggingService.debug(`Creating directories path: ${path}. Folder: ${folder}`);
      if(folder.indexOf('/') >= 0) {
        await this.file.createDir(path, folder.split('/')[0], true); //Create package folder (f.eks 135-74-8)
      }
      await this.file.createDir(path, folder, true);
      const root = `${path}/${folder}`;
      for (const dir of directories) {
        await this.file.createDir(root, dir, true);
      }

      let i = 0;
      const files = zipEntries.filter((name) => !content.files[name].dir);
      const mod = Math.floor(files.length / 100);

      const unzipFile = async (fileName: string) => {
        if(this.cancel) {
          return;
        }
        const zippedFile: JSZip.JSZipObject = content.files[fileName];
        const buffer = await zippedFile.async('arraybuffer');

        if(isAndroidOrIos(this.platform)){
          await this.file.writeFile(root, fileName, buffer, {
            replace: true
          });
        }

        i++;
        if (i % mod === 0) {
          this.loggingService.debug(
            `Har pakket ut ${i} av ${files.length} filer. ${i / files.length}%`,
            DEBUG_TAG
          );

          onProgress(i / files.length);
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
    const unzipProgress = this.downloadAndUnzipProgress.value.filter(p => p.name !== metadata.name);
    this.downloadAndUnzipProgress.next([
      ...unzipProgress,
      metadata
    ]);
  }

  private async onUnzipOrDownloadError(metadata: OfflineMapPackage, error: Error, isDownloading: boolean) {
    this.loggingService.error(
      error,
      DEBUG_TAG,
      `Error downloading map ${metadata.name}`
    );
    metadata.error = error || new Error('Unknown error');
    metadata.progress.description = 'Error';
    const unzipProgress = this.downloadAndUnzipProgress.value.filter(p => p.name !== metadata.name);
    this.downloadAndUnzipProgress.next([
      ...unzipProgress,
      metadata
    ]);
    this.resetCancelAndStartNextItemInQueue();
    this.showDownloadOrUnzipErrorMessage(isDownloading);
  }

  private async onDownloadAndUnzipComplete(mapPackage: OfflineMapPackage) {
    if(!isAndroidOrIos(this.platform)) {
      this.onUnzipOrDownloadError(mapPackage, new Error('Offline maps for web not implemented!'), false);
      return;
    }


    mapPackage.downloadComplete = moment().unix();
    mapPackage.progress = { percentage: 1.0 };

    // Store new combined metadata
    const path = await this.getMapPackageFileUrl(mapPackage.name);
    await this.file.writeFile(path, 'COMPLETE', `${mapPackage.size}`);

    
    // Remove from progress tracking
    const unzipProgress = this.downloadAndUnzipProgress.value.filter(p => p.name !== mapPackage.name);
    this.downloadAndUnzipProgress.next(unzipProgress);

    // Start any pending downloads
    this.resetCancelAndStartNextItemInQueue();

    const secondsSpent = mapPackage.downloadComplete - mapPackage.downloadStart;
    const rate = mapPackage.size / 1024 / secondsSpent;
    this.loggingService.debug(
      `Unzip of ${mapPackage.name} finished in ${secondsSpent}s. Speed: ${rate}kb/s`,
      DEBUG_TAG
    );

    // Add metadata from map package
    const newPackage = await this.getMetadata(mapPackage.name);
    setTimeout(() => {
      this.addMapPackage(newPackage);
    });
  }

  private onCancelled(mapPackage: OfflineMapPackage) {
    this.removeMapPackageByName(mapPackage.name);
    this.resetCancelAndStartNextItemInQueue();
  }

  private resetCancelAndStartNextItemInQueue() {
    this.cancel = false;
    this.downloadSubscription = null;
    this.startDownloadNextItemInQueue();
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
    if(!this.hasCreatedRootFolder) {
      const dataFolder = await this.getDataDirectoryFileUrl();
      await this.file.createDir(dataFolder, ROOT_MAP_DIR, true);
      this.hasCreatedRootFolder = true;
    }
    return ROOT_MAP_DIR;
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
    if(!isAndroidOrIos(this.platform)) {
      return;
    }

    await this.file
      .removeRecursively(path, dirName)
      .then(() => {
        this.loggingService.debug(`removed folder: ${path}/${dirName}`);
      })
      .catch((err) => {
        this.loggingService.error(
          err,
          'background download native',
          `remove folder failed: ${path}/${dirName}`
        );
      });
  }

  //TODO: Kan vi bruke disse til noe? Dette blir kalt når brukeren trykker "resett app" i innstillinger, så her må alle kartpakker slettes fra disk..
  appOnReset(): void | Promise<any> {}
  appOnResetComplete(): void | Promise<any> {}
}
