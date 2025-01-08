import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, inject, input } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonRow,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import * as L from 'leaflet';
import { CompoundPackageFeature, CompoundPackage } from '../metadata.model';
import { OfflineMapService } from '../../../core/services/offline-map/offline-map.service';
import { Observable } from 'rxjs';
import { OfflineMapPackage } from '../../../core/services/offline-map/offline-map.model';
import { takeUntil, tap } from 'rxjs/operators';
import { NgDestoryBase } from '../../../core/helpers/observable-helper';
import { getDownloadCompleteDate, isPackageOutdated } from '../../../core/services/offline-map/utils';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';
import { NgIf, NgStyle, AsyncPipe, DecimalPipe, DatePipe } from '@angular/common';
import { MapComponent } from '../../../modules/map/components/map/map.component';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import {
  checkmark,
  stopwatchOutline,
  cloudDownloadOutline,
  folderOpenOutline,
  warningOutline,
  refresh,
  trash,
} from 'ionicons/icons';
import { LogLevel } from '../../../modules/shared/services/logging/log-level.model';

const DEBUG_TAG = 'OfflinePackageModalComponent';

/**
 * Shows detail info about a specific offline map package. From here you may download or delete the package.
 */
@Component({
  templateUrl: './offline-package-modal.component.html',
  styleUrls: ['./offline-package-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    DatePipe,
    DecimalPipe,
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonRow,
    IonTitle,
    IonToolbar,
    MapComponent,
    NgIf,
    NgStyle,
    TranslatePipe,
  ],
})
export class OfflinePackageModalComponent extends NgDestoryBase implements OnInit {
  private modalController = inject(ModalController);
  private offlineMapService = inject(OfflineMapService);
  private cdr = inject(ChangeDetectorRef);
  private logger = inject(LoggingService);

  readonly feature = input.required<CompoundPackageFeature>();
  readonly packageOnServer = input.required<CompoundPackage>();
  readonly offlinePackageStatus$ = input.required<Observable<OfflineMapPackage>>();

  zoom = 10; // Just as a fallback value
  center?: L.LatLng;
  tileLayer?: L.GeoJSON;
  isCheckingAvailableDiskspace?: boolean;
  isPackageOutdated?: boolean;
  offlinePackageStatusThatTriggersChangeDetection$?: Observable<OfflineMapPackage>;

  constructor() {
    super();
    addIcons({ checkmark, stopwatchOutline, cloudDownloadOutline, folderOpenOutline, warningOutline, refresh, trash });
  }

  getDownloadCompleteDate(downloadComplete: NonNullable<OfflineMapPackage['downloadComplete']>): Date | undefined {
    return getDownloadCompleteDate(downloadComplete);
  }

  ngOnInit(): void {
    const offlinePackageStatus$ = this.offlinePackageStatus$();
    if (offlinePackageStatus$ == null) {
      this.logger.log('Required input offlinePackageStatus$ not specified.', undefined, LogLevel.Error, DEBUG_TAG);
      return;
    }

    const packageOnServer = this.packageOnServer();
    if (!packageOnServer) {
      this.logger.log('Required input packageOnServer not specified.', undefined, LogLevel.Error, DEBUG_TAG);
      return;
    }

    this.isCheckingAvailableDiskspace = false;
    this.offlinePackageStatusThatTriggersChangeDetection$ = offlinePackageStatus$.pipe(
      tap((packageStatus) => {
        if (packageStatus) {
          //hvis pakken blir slettet, er packageStatus undefined
          this.isPackageOutdated = isPackageOutdated(packageStatus, this.packageOnServer());
          this.logger.debug('isPackageOutdated', DEBUG_TAG, {
            isPackageOutdated: this.isPackageOutdated,
            packageStatus,
            packageOnServer: this.packageOnServer(),
          });
        }
      }),
      tap(() => this.cdr.detectChanges())
    );
    this.tileLayer = new L.GeoJSON(this.feature());

    // Set center from package bounds
    const { lat, lng } = this.tileLayer.getBounds().getCenter();
    this.center = new L.LatLng(lat, lng);

    // Use offline map package root tile as zoom level
    const [, , z] = packageOnServer.getXYZ();
    this.zoom = z;

    this.offlineMapService.finishedPackageIds$.pipe(takeUntil(this.ngDestroy$)).subscribe((packageName) => {
      if (this.packageOnServer()?.getName() === packageName) {
        this.dismiss(); //close when package is unzipped and ready to use
      }
    });
  }

  showTileOnMap(map: L.Map) {
    if (this.tileLayer) {
      this.tileLayer.addTo(map);
    }
  }

  async startDownload(): Promise<void> {
    this.isCheckingAvailableDiskspace = true;
    this.cdr.detectChanges();

    if (await this.offlineMapService.checkAvailableDiskSpace(this.packageOnServer())) {
      this.offlineMapService.downloadPackage(this.packageOnServer());
    }
    this.isCheckingAvailableDiskspace = false;
    this.cdr.detectChanges();
  }

  getPercentage(map: OfflineMapPackage): number {
    return Math.round((map.progress ? map.progress.percentage : 0) * 100);
  }

  cancel(map: OfflineMapPackage) {
    this.offlineMapService.cancelDownloadPackage(map);
  }

  async delete() {
    const packageOnServer = this.packageOnServer();
    if (packageOnServer) {
      this.offlineMapService.removeMapPackageByName(packageOnServer.getName());
    } else {
      this.logger.log('No package to delete', undefined, LogLevel.Warning, DEBUG_TAG);
    }
  }

  async update() {
    await this.delete();
    this.startDownload();
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
