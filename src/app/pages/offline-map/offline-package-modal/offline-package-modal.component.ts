import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as L from 'leaflet';
import { CompoundPackageFeature, CompoundPackage } from '../metadata.model';
import { OfflineMapService } from 'src/app/core/services/offline-map/offline-map.service';
import { Observable } from 'rxjs';
import { OfflineMapPackage } from 'src/app/core/services/offline-map/offline-map.model';
import { tap } from 'rxjs/operators';

/**
 * Shows detail info about a specific offline map package. From here you may download or delete the package.
 */
@Component({
  templateUrl: './offline-package-modal.component.html',
  styleUrls: ['./offline-package-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfflinePackageModalComponent implements OnInit {
  @Input() feature: CompoundPackageFeature;
  @Input() packageOnServer: CompoundPackage;
  @Input() offlinePackageStatus$: Observable<OfflineMapPackage>;

  zoom = 13;
  center: number[];
  tileLayer: L.GeoJSON;
  isCheckingAvailableDiskspace:boolean;

  offlinePackageStatusThatTriggersChangeDetection$: Observable<OfflineMapPackage>;

  constructor(
    private modalController: ModalController,
    private offlineMapService: OfflineMapService,
    private cdr: ChangeDetectorRef,
  ) {
   }

  ngOnInit(): void {
    this.isCheckingAvailableDiskspace = false;
    this.offlinePackageStatusThatTriggersChangeDetection$ = this.offlinePackageStatus$.pipe(
      tap(() => this.cdr.detectChanges() ));
    this.tileLayer = new L.GeoJSON(this.feature);
    const { lat, lng } = this.tileLayer.getBounds().getCenter();
    this.center = [lat, lng];
  }

  showTileOnMap(map: L.Map) {
    this.tileLayer.addTo(map);
    setTimeout(() => {
      map.fitBounds(this.tileLayer.getBounds(), {
        padding: [8, 16]
      });
    }, 50);
  }

  async startDownload(): Promise<void> {
    this.isCheckingAvailableDiskspace = true;
    this.cdr.detectChanges();

    if(await this.offlineMapService.checkAvailableDiskSpace(this.packageOnServer)) {
      this.offlineMapService.downloadPackage(this.packageOnServer);
    }
    this.isCheckingAvailableDiskspace = false;
    this.cdr.detectChanges();

    //this.dismiss(); //TODO: Skal vi lukke denne når vi starter nedlasting?
    // window.open(this.package.properties.url, '_blank');
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
      'dismissed': true
    })
  }
}
