import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as L from 'leaflet';
import { Polygon, Feature } from 'geojson';
import { CompoundPackageMetadata, FeatureProperties } from '../metadata.model';
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
  @Input() feature: Feature<Polygon, FeatureProperties>;
  @Input() packageOnServer: CompoundPackageMetadata;
  @Input() offlinePackageStatus$: Observable<OfflineMapPackage>;

  zoom = 13;
  center: number[];
  tileLayer: L.GeoJSON;

  constructor(
    private modalController: ModalController,
    private offlineMapService: OfflineMapService
  ) { }

  ngOnInit(): void {
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

  startDownload() {
    this.offlineMapService.downloadPackage(this.packageOnServer);
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
