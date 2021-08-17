import { Component } from '@angular/core';
import { OfflineMapService } from '../../core/services/offline-map/offline-map.service';
import { OfflineMapPackage } from '../../core/services/offline-map/offline-map.model';
import { HelperService } from '../../core/services/helpers/helper.service';
import { ActionSheetController, ModalController, Platform } from '@ionic/angular';
import { ActionSheetButton } from '@ionic/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { bufferTime, map, shareReplay } from 'rxjs/operators';
import tiles from "./z8.json";
import * as L from "leaflet";
import { GeoJsonObject } from 'geojson';
import { HttpClient } from '@angular/common/http';
import { OfflinePackageModalComponent } from './offline-package-modal/offline-package-modal.component';
import { PackageMetadata } from './metadata.model';
import { Polygon, Feature } from 'geojson';

const PACKAGE_INDEX_URL = "https://offlinemap.blob.core.windows.net/packages/packageIndex.json";
const documentStyle = getComputedStyle(document.body);
const defaultTileStyle = {
  color: documentStyle.getPropertyValue("--ion-color-primary")
};



interface PackageIndex {
  norgeskart: PackageMetadata[];
  bratthet_med_utlop: PackageMetadata[];
  allInOne: PackageMetadata[];
}

@Component({
  selector: 'app-offline-map',
  templateUrl: './offline-map.page.html',
  styleUrls: ['./offline-map.page.scss']
})
export class OfflineMapPage {
  packages$: Observable<OfflineMapPackage[]>;
  private packageIndex$: Observable<PackageIndex>;
  selectedPackage: PackageMetadata = null;
  showTileCard = true;
  showDownloads = false;
  tilesLayer: L.GeoJSON;
  // Could not get the click handler to only emit once per click, so wrapped this in a subject
  showModal = new Subject<Feature<Polygon, PackageMetadata>>();

  constructor(
    private helperService: HelperService,
    private actionSheetController: ActionSheetController,
    private platform: Platform,
    private modalController: ModalController,
    private offlineMapService: OfflineMapService,
    http: HttpClient,
  ) {
    this.packageIndex$ = http.get<PackageIndex>(PACKAGE_INDEX_URL).pipe(shareReplay());

    this.packages$ = combineLatest([
      this.offlineMapService.packages$,
      this.offlineMapService.unzipProgress$
    ]).pipe(map(([packages, unzipping]) => [...packages, ...unzipping]
      .sort((a, b) => b.downloadStart - a.downloadStart)));
  }

  toggleDownloads() {
    this.showDownloads = !this.showDownloads
  }

  onMapReady(map: L.Map) {
    (window as any).LEAFLET_MAP = map;

    map.setZoom(7);

    combineLatest([
      this.packageIndex$,
      this.packages$
    ]).subscribe(([packageIndex, packages]) => {
      try {
        console.log("Packages", JSON.stringify(packages));

        const packageMap = new Map<string, PackageMetadata>();
        packageIndex.allInOne.forEach(p => {
          const [x, y, z] = p.xyz;
          const id = `(${x}, ${y}, ${z})`;
          packageMap.set(id, p);
        });
  
        const installedPackages = new Map<string, OfflineMapPackage>();
        // installedPackages.set("(133, 73, 8)", {name: "test", maps: {}});
        packages.forEach(installedPackage => {
          const maps = Object.values(installedPackage.maps);
          if (maps.length > 0) {
            const { x, y, z } = Object.values(installedPackage.maps)[0].rootTile;
            const id = `(${x}, ${y}, ${z})`;
            installedPackages.set(id, installedPackage);
          }
        });
  
        tiles.features.forEach(f => {
          if (packageMap.has(f.id)) {
            f.properties = {
              ...f.properties,
              ...packageMap.get(f.id)
            }
          }
        });
  
        if (this.tilesLayer) {
          map.removeLayer(this.tilesLayer);
        }
  
        this.tilesLayer = new L.GeoJSON(tiles as GeoJsonObject, {
          filter: (feature) => {
            return packageMap.has(feature.id as string);
          },
          onEachFeature: (feature: Feature<Polygon, PackageMetadata>, layer) => {
            // TODO: We now also show modal dialog if package is installed or under downloading
            // if (installedPackages.has(feature.id as string)) {
            //   return; 
            // }

            if (packageMap.has(feature.id as string)) {
              layer.on("click", () => {
                this.showModal.next(feature);
                // this.showPackageModal(feature);
                // this.selectedPackage = feature.properties["package"];
              });
            }
          }
        });
  
        this.tilesLayer.setStyle(feature => {
          if (installedPackages.has(feature.id as string)) {
            return {
              ...defaultTileStyle,
              fillOpacity: 0.8,
            }
          }
  
          return {
            ...defaultTileStyle,
            fillOpacity: 0.1,
          }
        })
  
        map.addLayer(this.tilesLayer);
      } catch (error) {
        console.error("Failed to create offline package map");
        console.error(error);
      }
    });

    this.showModal.pipe(bufferTime(200)).subscribe(buffer => {
      if (buffer.length === 1 && buffer[0] != null) {
        this.showPackageModal(buffer[0]);
      }
    });

    // TODO
    // Forsøk på å forhindre at pinch-zooming trigger
    // click event, kombinert med if-setninga over.
    // Kan sikkert fikses bedre på en annen måte, løste heller
    // ikke problemet helt.
    map.on("zoomend", () => {
      this.showModal.next(null);
    });
    map.on("zoomstart", () => {
      this.showModal.next(null);
    });
  }

  async showPackageModal(feature: Feature<Polygon, PackageMetadata>) {
    const modal = await this.modalController.create({
      component: OfflinePackageModalComponent,
      componentProps: {
        packageOnServer: feature,
        packages$: this.packages$
      },
      swipeToClose: true,
      mode: "ios"
    });
    await modal.present();
  }

  humanReadableByteSize(bytes: number): string {
    if (isNaN(bytes)) {
      return '';
    }
    return this.helperService.humanReadableByteSize(bytes);
  }

  getPercentage(map: OfflineMapPackage): number {
    return Math.round((map.progress ? map.progress.percentage : 0) * 100);
  }

  deleteMap(map: OfflineMapPackage): Promise<void> {
    return this.offlineMapService.removeMapPackageByName(map.name);
  }

  async cancelUnzip(map: OfflineMapPackage): Promise<void> {
    await this.offlineMapService.removeMapPackageByName(map.name);
  }

  isDownloading(map: OfflineMapPackage): boolean {
    return map.downloadStart && !map.downloadComplete;
  }

  isDownloaded(map: OfflineMapPackage): boolean {
    return !!map.downloadComplete;
  }

  closeTileCard() {
    this.selectedPackage = null;
  }

  async presentActionSheet(map: OfflineMapPackage): Promise<void> {
    const header = map.name;
    const subHeader = this.humanReadableByteSize(map.size);
    const buttons: ActionSheetButton[] = [];
    if (this.isDownloaded(map)) {
      buttons.push({
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.offlineMapService.removeMapPackageByName(map.name);
        }
      });
    } else if (this.isDownloading(map)) {
      buttons.push({
        text: 'Avbryt',
        icon: 'close',
        handler: () => {
          this.cancelUnzip(map);
        }
      });
    }

    buttons.push({
      text: 'Lukk',
      role: 'cancel'
    });

    const actionSheet = await this.actionSheetController.create({
      header,
      subHeader,
      buttons
    });
    await actionSheet.present();
  }
}
