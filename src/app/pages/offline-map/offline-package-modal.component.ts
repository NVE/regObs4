import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as L from 'leaflet';
import * as turf from '@turf/turf';
import { Polygon, Feature } from 'geojson';
import { PackageMetadata } from './metadata.model';
import { OfflineMapService } from 'src/app/core/services/offline-map/offline-map.service';
import { ExternalLinkService } from 'src/app/core/services/external-link/external-link.service';

@Component({
  template: `
    <ion-header translucent>
      <ion-toolbar>
        <ion-title>Kartpakke {{package.properties.xyz[0]}}-{{package.properties.xyz[1]}}-{{package.properties.xyz[2]}}</ion-title>
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
          <ion-col class="right">Produsert:</ion-col>
          <ion-col>{{ package.properties.lastModified }}</ion-col>
        </ion-row>
        <ion-row>
          <ion-col class="right">Størrelse:</ion-col>
          <ion-col>{{ package.properties.sizeInMb }} MB</ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-button
              expand="block"
              color="varsom-orange"
            ><a [href]="package.properties.url">Last ned</a></ion-button>
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
  @Input() package: Feature<Polygon, PackageMetadata>;

  zoom = 13;
  center: number[];
  tileLayer: L.GeoJSON;

  constructor(
    private modalController: ModalController,
    private externalLinkService: ExternalLinkService,
    private offlineMapService: OfflineMapService
  ) { }

  ngOnInit(): void {
    this.tileLayer = new L.GeoJSON(this.package);
    const { lat, lng } = this.tileLayer.getBounds().getCenter();
    this.center = [lat, lng];
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
    // this.offlineMapService.downloadPackage(
    //   this.package.properties.name,
    //   this.package.properties.url
    // );
    // this.dismiss();
    // window.open(this.package.properties.url, '_blank');
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    })
  }

}
