import { Injectable } from '@angular/core';
import { OfflineMapPackage, OfflineTilesMetadata } from './offline-map.model';
import { Progress } from './progress.model';
import moment from 'moment';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';
import { BehaviorSubject, from, Observable, Subscription } from 'rxjs';
import { finalize, map, mergeMap, switchMap, take } from 'rxjs/operators';
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
import {
  CompoundPackage,
  Part
} from 'src/app/pages/offline-map/metadata.model';
import { OfflineTilesRegistry } from './offline-tiles-registry';

const DEBUG_TAG = 'OfflineMapService';
const METADATA_FILE = 'metadata.json';
const ROOT_MAP_DIR = 'maps';

function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = '';
  new Uint8Array(buffer).forEach((byte) => binary += String.fromCharCode(byte));
  return btoa(binary);
}

@Injectable({
  providedIn: 'root'
})
export class OfflineMapService {
  private packages: BehaviorSubject<OfflineMapPackage[]> = new BehaviorSubject(
    []
  );
  packages$: Observable<OfflineMapPackage[]> = this.packages.asObservable();

  private downloadAndUnzipProgress: BehaviorSubject<OfflineMapPackage[]> =
    new BehaviorSubject([]);
  downloadAndUnzipProgress$ = this.downloadAndUnzipProgress.asObservable();

  availableDiskspace: { available: number; used: number };
  private downloadSubscription: Subscription;
  private cancel = false;

  private rootFileUrl = '';
  offlineTilesRegistry = new OfflineTilesRegistry();

  constructor(
    private loggingService: LoggingService,
    private webView: WebView,
    private backgroundDownloadService: BackgroundDownloadService,
    private platform: Platform,
    private helperService: HelperService,
    private translateService: TranslateService,
    private alertController: AlertController
  ) {
    // Start with map packages already downloaded
    this.getMapPackages()
      .then((packages) => {
        this.packages.next(packages);
      })
      .catch((err) => {
        this.loggingService.error(err, DEBUG_TAG, 'Failed to get map packages');
      });
    this.packages$
      .pipe(
        switchMap((packages) =>
          from(this.getDeviceFreeDiskSpace()).pipe(
            map((available) => ({
              available,
              used: this.calculateTotalOfflinePackagesDiskspaceUsed(packages)
            }))
          )
        )
      )
      .subscribe((val) => {
        setTimeout(() => {
          this.availableDiskspace = val;
        });
      });

    this.packages$.subscribe((packages) =>
      this.registerOfflineMapPackages(packages)
    );
  }

  private async getMapPackages(): Promise<OfflineMapPackage[]> {
    // TODO: Create own provider for fetching offline packages from storage
    if (!isAndroidOrIos(this.platform)) {
      return [];
    }

    // Read offline map package names
    const readDirResult = await Filesystem.readdir({
      path: await this.getRootFileUrl()
    });
    const packageNames = await this.getFolderNameWithCompleteFiles(
      readDirResult.files
    );
    this.loggingService.debug('packageNames', DEBUG_TAG, packageNames);

    // Read all package metadata
    const packages = await Promise.all(
      packageNames.map((name) => this.getMetadata(name))
    );

    return packages;
  }

  private registerOfflineMapPackages(mapPackages: OfflineMapPackage[]) {
    this.loggingService.debug('registerOfflineMapPackages', DEBUG_TAG);

    this.offlineTilesRegistry.clear();
    for (const mapPackage of mapPackages) {
      this.offlineTilesRegistry.add(mapPackage);
    }
  }

  private calculateTotalOfflinePackagesDiskspaceUsed(
    packages: OfflineMapPackage[]
  ): number {
    return packages.reduce(
      (pv, cv) => (cv.downloadComplete && cv.size != null ? cv.size : 0) + pv,
      0
    );
  }

  private async getFolderNameWithCompleteFiles(
    folders: string[]
  ): Promise<string[]> {
    return (
      await Promise.all(
        folders.map((folder: string) =>
          this.hasCompleteFile(folder).then((result) =>
            result ? folder : null
          )
        )
      )
    ).filter((packageName) => packageName != null);
  }

  public async downloadPackage(
    packageMetadataCombined: CompoundPackage,
    checkAvailableDiskSpace = false
  ): Promise<void> {
    if (checkAvailableDiskSpace) {
      //TODO: Ask user to prefer saving to external SD card if available?
      const availableSpace = await this.checkAvailableDiskSpace(
        packageMetadataCombined
      );
      if (!availableSpace) {
        return;
      }
    }

    if (await this.isPermissionToSaveFilesDenied()) {
      return;
    }

    const mapPackage = this.createOfflineMapPackage(packageMetadataCombined);

    // Add new map package to progress subject
    this.downloadAndUnzipProgress.next([
      ...this.downloadAndUnzipProgress.value,
      mapPackage
    ]);

    if (this.downloadSubscription == null) {
      //Start downlaod if not anyting currently downloading
      this.startDownloadNextItemInQueue();
    }
  }

  private async isPermissionToSaveFilesDenied(): Promise<boolean> {
    if (!this.platform.is('android')) {
      return false; //this check is only required in Android
    }
    const permissionStatus = await Filesystem.checkPermissions();
    if (permissionStatus.publicStorage !== 'granted') {
      const permissionStatusAfterRequest =
        await Filesystem.requestPermissions();
      if (permissionStatusAfterRequest.publicStorage !== 'granted') {
        this.loggingService.debug(
          `Permission to save files = ${permissionStatusAfterRequest.publicStorage}`,
          DEBUG_TAG
        );
        return true;
      }
    }
    return false;
  }

  private startDownloadNextItemInQueue() {
    const nextInQueue = this.downloadAndUnzipProgress.value.filter(
      (p) => p.progress.step === ProgressStep.pending
    )[0];
    if (nextInQueue != null) {
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
    this.downloadAndUnzipPart(
      offlineMapPackage.name,
      parts[0],
      parts,
      offlineMapPackage,
      0,
      parts.length
    );
  }

  public cancelDownloadPackage(offlineMapPackage: OfflineMapPackage) {
    if (offlineMapPackage.progress.step === ProgressStep.pending) {
      this.removePackageFromDownloadAndProgress(offlineMapPackage);
    } else if (offlineMapPackage.error) {
      this.onCancelled(offlineMapPackage);
    } else if (
      offlineMapPackage.progress.step === ProgressStep.download ||
      offlineMapPackage.progress.step === ProgressStep.extractZip
    ) {
      this.cancel = true;
      this.downloadSubscription?.unsubscribe();
    }
  }

  private removePackageFromDownloadAndProgress(
    offlineMapPackage: OfflineMapPackage
  ) {
    this.downloadAndUnzipProgress.next(
      this.downloadAndUnzipProgress.value.filter(
        (mapPackage) => mapPackage.name !== offlineMapPackage.name
      )
    );
  }

  private downloadAndUnzipPart(
    name: string,
    part: Part,
    parts: Part[],
    mapPackage: OfflineMapPackage,
    partNumber: number,
    totalParts: number
  ) {
    const subfolder = part.name;
    const folder = `${name}/${subfolder}`;
    this.downloadSubscription = this.backgroundDownloadService
      .download(part.url)
      .pipe(
        finalize(() => {
          if (this.cancel) {
            this.onCancelled(mapPackage);
          }
        })
      )
      .subscribe(
        async (downloadProgress) => {
          switch (downloadProgress.state) {
            case 'IN_PROGRESS':
              this.onProgress(mapPackage, {
                step: ProgressStep.download,
                percentage: this.calculateTotalProgress(
                  downloadProgress.progress,
                  partNumber,
                  totalParts,
                  'Downloading'
                ),
                description: `Download part ${partNumber + 1}/${totalParts}`
              });
              break;
            case 'DONE':
              const file = downloadProgress.content;
              const root = await this.getRootFileUrl();
              await this.unzipFile(
                file,
                root,
                folder,
                () =>
                  this.onUnzipStepComplete(
                    name,
                    parts,
                    mapPackage,
                    partNumber,
                    totalParts
                  ),
                (progress) =>
                  this.onProgress(mapPackage, {
                    step: ProgressStep.extractZip,
                    percentage: this.calculateTotalProgress(
                      progress,
                      partNumber,
                      totalParts,
                      'Unzipping'
                    ),
                    description: `Unzip ${partNumber + 1}/${totalParts}`
                  }),
                (error) => this.onUnzipOrDownloadError(mapPackage, error, false)
              );
              break;
            default:
              break;
          }
        },
        (err) => this.onUnzipOrDownloadError(mapPackage, err, true)
      );
  }

  public calculateTotalProgress(
    currentProgress: number,
    currentPart: number,
    totalParts: number,
    partOfStep: 'Downloading' | 'Unzipping'
  ) {
    const stepsForEachPart = 2; // Download and unzip
    const totalPartsOfWork = totalParts * stepsForEachPart;
    const currentPartOfWork =
      (currentPart * stepsForEachPart +
        (partOfStep === 'Downloading' ? 0 : 1)) /
      totalPartsOfWork;
    const progressForTotalParts =
      currentProgress / totalPartsOfWork + currentPartOfWork;
    return progressForTotalParts;
  }

  private onUnzipStepComplete(
    name: string,
    parts: Part[],
    mapPackage: OfflineMapPackage,
    partNumber: number,
    totalParts: number
  ) {
    if (this.cancel) {
      this.onCancelled(mapPackage);
      return;
    }

    const nextPart = partNumber + 1;
    if (nextPart < totalParts) {
      this.downloadAndUnzipPart(
        name,
        parts[nextPart],
        parts,
        mapPackage,
        nextPart,
        totalParts
      );
    } else {
      this.onDownloadAndUnzipComplete(mapPackage);
    }
  }

  public async checkAvailableDiskSpace(
    packageMetadataCombined: CompoundPackage
  ): Promise<boolean> {
    if (isAndroidOrIos(this.platform) && this.availableDiskspace != null) {
      const neededSpace = await this.getNeededDiskSpaceForPackage(
        packageMetadataCombined
      );

      this.loggingService.debug(
        `Available storage is ${this.helperService.humanReadableByteSize(
          this.availableDiskspace.available
        )}. 
      Needs ${this.helperService.humanReadableByteSize(neededSpace)}`,
        DEBUG_TAG
      );

      if (this.availableDiskspace.available < neededSpace) {
        this.loggingService.log(
          'Not enough disk space to save and extract package',
          null,
          LogLevel.Warning,
          DEBUG_TAG
        );

        await this.showNotEnoughDiskSpaceAvailableErrorMessage();
        return false;
      }
    } else {
      return Promise.resolve(true);
    }
    return true;
  }

  public async getNeededDiskSpaceForPackage(
    packageMetadataCombined: CompoundPackage,
    compressionFactor = 1.1
  ): Promise<number> {
    const neededSpaceForCurrentPackage =
      packageMetadataCombined.getSizeInMiB() * 1024 * 1024 * compressionFactor;

    const neededSpaceForItemsInQueue = await this.downloadAndUnzipProgress$
      .pipe(
        take(1),
        map((items) =>
          items
            .filter((x) => x.downloadComplete == null && x.error == null)
            .reduce((pv, cv) => (pv += cv.size * compressionFactor), 0)
        )
      )
      .toPromise();

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
          text: translations['ALERT.OK']
        }
      ]
    });
    alert.present();
  }

  private async showDownloadOrUnzipErrorMessage(isDownloading: boolean) {
    const messageKey = isDownloading
      ? 'OFFLINE_MAP.DOWNLOAD_ERROR_MESSAGE'
      : 'OFFLINE_MAP.UNZIP_ERROR_MESSAGE';
    const translations = await this.translateService
      .get([messageKey, 'ALERT.OK'])
      .toPromise();
    const alert = await this.alertController.create({
      message: translations[messageKey],
      buttons: [
        {
          text: translations['ALERT.OK']
        }
      ]
    });
    alert.present();
  }

  private getDeviceFreeDiskSpace(externalStorage = false): Promise<number> {
    if (!isAndroidOrIos(this.platform)) {
      return Promise.resolve(0);
    }

    return new Promise((resolve, reject) => {
      (window as any)?.DiskSpacePlugin?.info(
        { location: externalStorage ? 2 : 1 },
        (success) => resolve(success.free),
        (err) => reject(err)
      );
    });
  }

  private addMapPackage(newPackage: OfflineMapPackage) {
    const packages = this.packages.value;
    this.packages.next([...packages, newPackage]);
  }

  async removeMapPackageByName(packageNameToRemove: string) {
    // Delete files
    const root = await this.getRootFileUrl();
    await this.deleteDirectory(root, packageNameToRemove);
    // Remove package from installed packages subject list
    this.packages.next(
      this.packages.value.filter(
        (mapPackage) => mapPackage.name !== packageNameToRemove
      )
    );
    // Also remove any pending / downloading packages in progress
    this.downloadAndUnzipProgress.next(
      this.downloadAndUnzipProgress.value.filter(
        (mapPackage) => mapPackage.name !== packageNameToRemove
      )
    );
  }

  private async readCompleteFile(
    packageName: string
  ): Promise<{ size: number; downloadComplete: number }> {
    const path = await this.getCompleteFileUrl(packageName);
    try {
      const fileContent = await Filesystem.readFile({
        path,
        encoding: Encoding.ASCII
      });
      const fileStat = await Filesystem.stat({ path });
      return { size: +fileContent, downloadComplete: fileStat.mtime / 1000 };
    } catch (error) {
      const niceError = new Error(`Couldn't read COMPLETE file: ${path}`);
      niceError.stack = error.stack;
      throw niceError;
    }
  }

  private async hasCompleteFile(packageName: string): Promise<boolean> {
    try {
      const path = await this.getCompleteFileUrl(packageName);
      const uri = (await Filesystem.stat({ path })).uri;
      this.loggingService.debug(
        `Package '${packageName}' has complete file: ${uri}`,
        DEBUG_TAG
      );
      return true;
    } catch (err) {
      // throws error if file does not exist
      return false;
    }
  }

  private async getMapsInPackageFolder(packageName: string): Promise<string[]> {
    const path = await this.getMapPackageFileUrl(packageName);
    const filenames = await (await Filesystem.readdir({ path })).files;
    return filenames.filter((filename) => filename != 'COMPLETE'); //TODO: Hack, assumes that all files in folder is a directory unless it has name 'COMPLETE'
  }

  /**
   * @returns map package metadata
   */
  private async getMetadata(packageName: string): Promise<OfflineMapPackage> {
    this.loggingService.debug(
      'Reading metadata for package:',
      DEBUG_TAG,
      packageName
    );
    const path = await this.getMapPackageFileUrl(packageName);
    const completeFile = await this.readCompleteFile(packageName);

    const offlineMapPackage: OfflineMapPackage = {
      name: packageName,
      downloadComplete: completeFile.downloadComplete,
      size: completeFile.size,
      maps: {}
    };

    const maps = await this.getMapsInPackageFolder(packageName);
    for (const map of maps) {
      const metadataPath = `${path}/${map}/${METADATA_FILE}`;
      this.loggingService.debug('Metadata path:', DEBUG_TAG, metadataPath);
      const readFileResult = await Filesystem.readFile({
        path: metadataPath,
        encoding: Encoding.UTF8
      });
      const metadata = JSON.parse(readFileResult.data) as OfflineTilesMetadata;
      this.loggingService.debug('Metadata:', DEBUG_TAG, metadata);

      offlineMapPackage.maps[map] = {
        ...metadata,
        url: this.webView.convertFileSrc(`${path}/${map}`)
      };
    }

    this.loggingService.debug(
      'Offline map package metadata: ',
      DEBUG_TAG,
      offlineMapPackage
    );

    return offlineMapPackage;
  }

  private createOfflineMapPackage(
    compoundPackageMetadata: CompoundPackage
  ): OfflineMapPackage {
    const mapPackage: OfflineMapPackage = {
      name: compoundPackageMetadata.getName(),
      size: compoundPackageMetadata.getSizeInMiB() * 1024 * 1024,
      downloadStart: moment().unix(),
      progress: {
        percentage: 0,
        step: ProgressStep.pending,
        description: 'In queue...'
      },
      downloadComplete: null,
      maps: {},
      compoundPackageMetadata
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
      this.loggingService.debug('zip entries', DEBUG_TAG, zipEntries);

      // if(!isAndroidOrIos(this.platform)) {
      //   throw Error('Unzip file not implemented on web!')
      // }
      const root = `${path}/${folder}`;
      let i = 0;
      const files = zipEntries.filter((name) => !content.files[name].dir);
      const mod = Math.floor(files.length / 100);

      const unzipFile = async (fileName: string) => {
        if (this.cancel) {
          return;
        }
        const zippedFile: JSZip.JSZipObject = content.files[fileName];
        const blob: Blob = await zippedFile.async('blob');

        if (isAndroidOrIos(this.platform)) {
          const buffer = await blob.arrayBuffer();
          const base64 = arrayBufferToBase64(buffer);
          await Filesystem.writeFile({
            path: `${root}/${fileName}`,
            data: base64,
            recursive: true
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
    const unzipProgress = this.downloadAndUnzipProgress.value.filter(
      (p) => p.name !== metadata.name
    );
    this.downloadAndUnzipProgress.next([...unzipProgress, metadata]);
  }

  private async onUnzipOrDownloadError(
    metadata: OfflineMapPackage,
    error: Error,
    isDownloading: boolean
  ) {
    this.loggingService.error(
      error,
      DEBUG_TAG,
      `Error downloading map ${metadata.name}`
    );
    metadata.error = error || new Error('Unknown error');
    metadata.progress.description = 'Error';
    const unzipProgress = this.downloadAndUnzipProgress.value.filter(
      (p) => p.name !== metadata.name
    );
    this.downloadAndUnzipProgress.next([...unzipProgress, metadata]);
    this.resetCancelAndStartNextItemInQueue();
    this.showDownloadOrUnzipErrorMessage(isDownloading);
  }

  private async onDownloadAndUnzipComplete(mapPackage: OfflineMapPackage) {
    if (!isAndroidOrIos(this.platform)) {
      this.onUnzipOrDownloadError(
        mapPackage,
        new Error('Offline maps for web not implemented!'),
        false
      );
      return;
    }
    mapPackage.downloadComplete = moment().unix();
    mapPackage.progress = { percentage: 1.0 };

    // Store new combined metadata
    const path = await this.getCompleteFileUrl(mapPackage.name);
    await Filesystem.writeFile({
      path,
      data: `${mapPackage.size}`,
      encoding: Encoding.ASCII
    });

    // Remove from progress tracking
    const unzipProgress = this.downloadAndUnzipProgress.value.filter(
      (p) => p.name !== mapPackage.name
    );
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
  private async getDataDirectory(): Promise<Directory.Data> {
    // if (this.platform.is('android')) {
    //     const userSettings = await this.userSettingService.getUserSettings();
    //     // TODO: Prefer save offline map on SD card? Show a dialog to ask if user wants to save on external directory?
    //     if (false) {
    //         return this.file.externalDataDirectory;
    //     }
    // }
    return Directory.Data;
  }

  /**
   * Get file url to the root directory
   * containing all map packages.
   *
   * @returns file url as string, without trailing /
   */
  private async getRootFileUrl(): Promise<string> {
    if (this.rootFileUrl === '') {
      const dataDirectory = await this.getDataDirectory();
      const readDirResult = await Filesystem.readdir({
        path: '',
        directory: dataDirectory
      });
      if (!readDirResult.files.includes(ROOT_MAP_DIR)) {
        await Filesystem.mkdir({
          path: ROOT_MAP_DIR,
          directory: dataDirectory
        });
      }
      const uriResult = await Filesystem.getUri({
        path: ROOT_MAP_DIR,
        directory: dataDirectory
      });
      this.rootFileUrl = uriResult.uri;

      if (this.rootFileUrl.endsWith('/')) {
        this.rootFileUrl = this.rootFileUrl.slice(0, -1);
      }
    }
    return this.rootFileUrl;
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

  /**
   * Get file url to COMPLETE file in map package
   *
   * @param name - map package name
   * @returns file url as string
   */
  private async getCompleteFileUrl(packageName: string): Promise<string> {
    const path = await this.getMapPackageFileUrl(packageName);
    return `${path}/COMPLETE`;
  }

  private async deleteDirectory(path: string, dirName: string): Promise<void> {
    if (!isAndroidOrIos(this.platform)) {
      return;
    }
    const folderUrl = `${path}/${dirName}`;
    await Filesystem.rmdir({ path: folderUrl, recursive: true })
      .then(() => {
        this.loggingService.debug(`removed folder: ${folderUrl}`);
      })
      .catch((err) => {
        this.loggingService.error(
          err,
          'background download native',
          `remove folder failed: ${folderUrl}`
        );
      });
  }

  //TODO: Kan vi bruke disse til noe? Dette blir kalt når brukeren trykker "resett app" i innstillinger, så her må alle kartpakker slettes fra disk..
  // appOnReset(): void | Promise<any> {}
  // appOnResetComplete(): void | Promise<any> {}
}
