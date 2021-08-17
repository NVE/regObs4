import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as L from 'leaflet';
import { Polygon, Feature } from 'geojson';
import { PackageMetadata } from '../metadata.model';
import { OfflineMapService } from 'src/app/core/services/offline-map/offline-map.service';
import { ExternalLinkService } from 'src/app/core/services/external-link/external-link.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OfflineMapPackage } from 'src/app/core/services/offline-map/offline-map.model';

/**
 * Shows detail info about a specific offline map package. From here you may download or delete the package.
 */
@Component({
  templateUrl: './offline-package-modal.component.html',
  styleUrls: ['./offline-package-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfflinePackageModalComponent implements OnInit {
  @Input() packageOnServer: Feature<Polygon, PackageMetadata>;
  @Input() packages$: Observable<OfflineMapPackage[]>; //packages already downloaded or under downloading

  zoom = 13;
  center: number[];
  tileLayer: L.GeoJSON;
  downloadedPackage$: Observable<OfflineMapPackage>; //selected package if already downloaded or under downloading

  constructor(
    private modalController: ModalController,
    private externalLinkService: ExternalLinkService,
    private offlineMapService: OfflineMapService
  ) { }

  ngOnInit(): void {
    this.tileLayer = new L.GeoJSON(this.packageOnServer);
    const { lat, lng } = this.tileLayer.getBounds().getCenter();
    this.center = [lat, lng];
    
    this.downloadedPackage$ = this.packages$.pipe(
      map(packages => packages.filter(p => p.name === this.getPackageName())[0]));    
  }

  showTileOnMap(map: L.Map) {
    console.log("showTileOnMap");
    this.tileLayer.addTo(map);
    setTimeout(() => {
      map.fitBounds(this.tileLayer.getBounds(), {
        padding: [8, 16]
      });
    }, 50);
  }

  startDownload() {
    this.offlineMapService.downloadPackage(
      this.packageOnServer.properties.name,
      this.packageOnServer.properties.url,
      this.packageOnServer.properties.sizeInMb
    );
    //this.dismiss(); //TODO: Skal vi lukke denne når vi starter nedlasting?
    // window.open(this.package.properties.url, '_blank');
  }

  getPercentage(map: OfflineMapPackage): number {
    return Math.round((map.progress ? map.progress.percentage : 0) * 100);
  }

  delete() {
    this.offlineMapService.removeMapPackageByName(this.getPackageName());
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    })
  }

  private getPackageName(): string {
    return this.packageOnServer.properties.name.replace('.zip', '');
  }
}
