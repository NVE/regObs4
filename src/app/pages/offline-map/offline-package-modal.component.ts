import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as L from 'leaflet';
import { Polygon, Feature } from 'geojson';
import { PackageMetadata } from './metadata.model';
import { OfflineMapService } from 'src/app/core/services/offline-map/offline-map.service';
import { ExternalLinkService } from 'src/app/core/services/external-link/external-link.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OfflineMapPackage } from 'src/app/core/services/offline-map/offline-map.model';

@Component({
  template: `
    <ion-header translucent>
      <ion-toolbar>
        <ion-title>Kartpakke {{packageOnServer.properties.xyz[0]}}-{{packageOnServer.properties.xyz[1]}}-{{packageOnServer.properties.xyz[2]}}</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">Lukk</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="map-container">
        <app-map
          [showMapControls]="false"
          [showUserLocation]="false"
          [showSupportMaps]="false"
          [center]="center"
          [zoom]="zoom"
          (mapReady)="showTileOnMap($event)"
        ></app-map>
      </div>
      <ion-grid>
        <ion-row>
          <ion-col>Produsert: </ion-col>
          <ion-col>{{ packageOnServer.properties.lastModified }}</ion-col>
        </ion-row>
        <ion-row>
          <ion-col>Størrelse:</ion-col>
          <ion-col>{{ packageOnServer.properties.sizeInMb }} MB</ion-col>
        </ion-row>
        <div *ngIf="downloadedPackage$ | async as downloadedPackage">
          <ion-row>
            <ion-col>Status: </ion-col>
            <ion-col>
              {{ downloadedPackage.progress?.description }}
              <div *ngIf="!downloadedPackage.downloadComplete">({{getPercentage(downloadedPackage) +'%' }})</div>
              <div *ngIf="!!downloadedPackage.downloadComplete">Lastet ned {{ downloadedPackage.downloadComplete | formatDate:true:false:true | async }} </div>
              <ion-icon *ngIf="!!downloadedPackage.downloadComplete" name="checkmark"></ion-icon>
              <ion-icon *ngIf="downloadedPackage.progress?.step === 0" name="cloud-download-outline"></ion-icon>
              <ion-icon *ngIf="downloadedPackage.progress?.step === 1" name="folder-open-outline"></ion-icon>
            </ion-col>
          </ion-row>
          <ion-row *ngIf="!!downloadedPackage.downloadComplete">
            <ion-col>
              <ion-button (click)="delete()" expand="block" color="danger">Slett</ion-button>
            </ion-col>
          </ion-row>
          <ion-row *ngIf="!downloadedPackage.downloadComplete">
            <ion-col>
              <ion-button expand="block" color="danger">Avbryt nedlasting (TODO)</ion-button>
            </ion-col>
          </ion-row>
        </div>
        <ion-row *ngIf="!(downloadedPackage$ | async)">
          <ion-col>
            <ion-button
              (click)="startDownload()"
              expand="block"
              color="varsom-orange"
            >Last ned</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  styles: [
    `
    .map-container {
      padding: 16px;
      height: calc(100vw - 32px);
    }
    
    .right {
      text-align: right;
    }

    `
  ],
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
