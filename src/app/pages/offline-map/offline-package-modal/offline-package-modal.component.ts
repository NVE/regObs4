import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, inject } from '@angular/core';
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
import { OfflineMapService } from 'src/app/core/services/offline-map/offline-map.service';
import { Observable } from 'rxjs';
import { OfflineMapPackage } from 'src/app/core/services/offline-map/offline-map.model';
import { takeUntil, tap } from 'rxjs/operators';
import { NgDestoryBase } from 'src/app/core/helpers/observable-helper';
import { getDownloadCompleteDate, isPackageOutdated } from 'src/app/core/services/offline-map/utils';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
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

  @Input() feature: CompoundPackageFeature;
  @Input() packageOnServer: CompoundPackage;
  @Input() offlinePackageStatus$: Observable<OfflineMapPackage>;

  zoom: number;
  center: L.LatLng;
  tileLayer: L.GeoJSON;
  isCheckingAvailableDiskspace: boolean;
  isPackageOutdated: boolean;
  offlinePackageStatusThatTriggersChangeDetection$: Observable<OfflineMapPackage>;

  constructor() {
    super();
    addIcons({ checkmark, stopwatchOutline, cloudDownloadOutline, folderOpenOutline, warningOutline, refresh, trash });
  }

  getDownloadCompleteDate(downloadedPackage: OfflineMapPackage): Date {
    return getDownloadCompleteDate(downloadedPackage);
  }

  ngOnInit(): void {
    this.isCheckingAvailableDiskspace = false;
    this.offlinePackageStatusThatTriggersChangeDetection$ = this.offlinePackageStatus$.pipe(
      tap((packageStatus) => {
        if (packageStatus) {
          //hvis pakken blir slettet, er packageStatus undefined
          this.isPackageOutdated = isPackageOutdated(packageStatus, this.packageOnServer);
          this.logger.debug('isPackageOutdated', DEBUG_TAG, {
            isPackageOutdated: this.isPackageOutdated,
            packageStatus,
            packageOnServer: this.packageOnServer,
          });
        }
      }),
      tap(() => this.cdr.detectChanges())
    );
    this.tileLayer = new L.GeoJSON(this.feature);

    // Set center from package bounds
    const { lat, lng } = this.tileLayer.getBounds().getCenter();
    this.center = new L.LatLng(lat, lng);

    // Use offline map package root tile as zoom level
    const [, , z] = this.packageOnServer.getXYZ();
    this.zoom = z;

    this.offlineMapService.finishedPackageIds$.pipe(takeUntil(this.ngDestroy$)).subscribe((packageName) => {
      if (this.packageOnServer.getName() === packageName) {
        this.dismiss(); //close when package is unzipped and ready to use
      }
    });
  }

  showTileOnMap(map: L.Map) {
    this.tileLayer.addTo(map);
  }

  async startDownload(): Promise<void> {
    this.isCheckingAvailableDiskspace = true;
    this.cdr.detectChanges();

    if (await this.offlineMapService.checkAvailableDiskSpace(this.packageOnServer)) {
      this.offlineMapService.downloadPackage(this.packageOnServer);
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
    this.offlineMapService.removeMapPackageByName(this.packageOnServer.getName());
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
