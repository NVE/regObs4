import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as L from 'leaflet';
import { CompoundPackageFeature, CompoundPackage } from '../metadata.model';
import { OfflineMapService } from 'src/app/core/services/offline-map/offline-map.service';
import { Observable } from 'rxjs';
import { OfflineMapPackage } from 'src/app/core/services/offline-map/offline-map.model';
import { takeUntil, tap } from 'rxjs/operators';
import { NgDestoryBase } from 'src/app/core/helpers/observable-helper';

/**
 * Shows detail info about a specific offline map package. From here you may download or delete the package.
 */
@Component({
  templateUrl: './offline-package-modal.component.html',
  styleUrls: ['./offline-package-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfflinePackageModalComponent extends NgDestoryBase implements OnInit {
  @Input() feature: CompoundPackageFeature;
  @Input() packageOnServer: CompoundPackage;
  @Input() offlinePackageStatus$: Observable<OfflineMapPackage>;

  zoom: number;
  center: number[];
  tileLayer: L.GeoJSON;
  isCheckingAvailableDiskspace: boolean;

  offlinePackageStatusThatTriggersChangeDetection$: Observable<OfflineMapPackage>;

  constructor(
    private modalController: ModalController,
    private offlineMapService: OfflineMapService,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.isCheckingAvailableDiskspace = false;
    this.offlinePackageStatusThatTriggersChangeDetection$ = this.offlinePackageStatus$.pipe(
      tap(() => this.cdr.detectChanges())
    );
    this.tileLayer = new L.GeoJSON(this.feature);

    // Set center from package bounds
    const { lat, lng } = this.tileLayer.getBounds().getCenter();
    this.center = [lat, lng];

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

  delete() {
    this.offlineMapService.removeMapPackageByName(this.packageOnServer.getName());
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
