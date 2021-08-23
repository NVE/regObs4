import { Component } from '@angular/core';
import { OfflineMapService } from '../../core/services/offline-map/offline-map.service';
import { OfflineMapPackage } from '../../core/services/offline-map/offline-map.model';
import { HelperService } from '../../core/services/helpers/helper.service';
import { ActionSheetController, AlertController, ModalController, Platform } from '@ionic/angular';
import { ActionSheetButton } from '@ionic/core';
import { BehaviorSubject, combineLatest, from, Observable, Subject } from 'rxjs';
import { bufferTime, debounceTime, filter, map, shareReplay, switchMap, withLatestFrom } from 'rxjs/operators';
import tiles from "./z8.json";
import * as L from "leaflet";
import { GeoJsonObject } from 'geojson';
import { HttpClient } from '@angular/common/http';
import { OfflinePackageModalComponent } from './offline-package-modal/offline-package-modal.component';
import { CompoundPackageMetadata, FeatureProperties, PackageMetadata } from './metadata.model';
import { Polygon, Feature } from 'geojson';
import { TranslateService } from '@ngx-translate/core';

const PACKAGE_INDEX_URL = "https://offlinemap.blob.core.windows.net/packages/packageIndex.json";
const documentStyle = getComputedStyle(document.body);
const defaultTileStyle = {
  color: documentStyle.getPropertyValue("--ion-color-primary")
};
const errorTileStyle = {
  color: documentStyle.getPropertyValue("--ion-color-danger")
};


interface PackageIndex {
  norgeskart: PackageMetadata[];
  bratthet_med_utlop: PackageMetadata[];
  allInOne: PackageMetadata[];
  statensKartverk: PackageMetadata[];
  'steepness-outlet': PackageMetadata[];
}

@Component({
  selector: 'app-offline-map',
  templateUrl: './offline-map.page.html',
  styleUrls: ['./offline-map.page.scss']
})
export class OfflineMapPage {
  packages$: Observable<OfflineMapPackage[]>;
  downloadAndUnzipProgress$: Observable<OfflineMapPackage[]>;
  private packageIndex$: Observable<PackageIndex>;
  selectedPackage: CompoundPackageMetadata = null;
  packageMap = new Map<string, CompoundPackageMetadata>();
  showTileCard = true;
  showDownloads = false;
  tilesLayer: L.GeoJSON;
  // Could not get the click handler to only emit once per click, so wrapped this in a subject
  showModal = new Subject<Feature<Polygon, FeatureProperties>>();
  isZooming = new BehaviorSubject<boolean>(false);
  featureMap = new Map<string, Feature<Polygon, FeatureProperties>>();

  constructor(
    private helperService: HelperService,
    private actionSheetController: ActionSheetController,
    private platform: Platform,
    private modalController: ModalController,
    private offlineMapService: OfflineMapService,
    private alertController: AlertController,
    private translateService: TranslateService,
    http: HttpClient,
  ) {
    this.packageIndex$ = http.get<PackageIndex>(PACKAGE_INDEX_URL).pipe(shareReplay());
    this.downloadAndUnzipProgress$ = this.offlineMapService.downloadAndUnzipProgress$;
    this.packages$ = combineLatest([
      this.offlineMapService.packages$,
      this.offlineMapService.downloadAndUnzipProgress$
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

      // TODO: Vil ikke dette skje litt vel ofte?? Hver gang en pakke som nedlastes får en endring på progress, så trigges dette...

        this.packageMap = new Map<string, CompoundPackageMetadata>();
        packageIndex.statensKartverk.forEach(p => {
          const [x, y, z] = p.xyz;
          const id = this.getFeatureId(x, y, z);
          const compoundPackage = new CompoundPackageMetadata(p.xyz);
          compoundPackage.addPackage(p);
          this.packageMap.set(id, compoundPackage);
        });

        for(const supportMap of packageIndex['steepness-outlet']) {
          const [x, y, z] = supportMap.xyz;
          const id = this.getFeatureId(x, y, z);
          const existingPackage = this.packageMap.get(id);
          if(existingPackage) {
            existingPackage.addPackage(supportMap);
          }
        }
  
        // const installedPackages = new Map<string, OfflineMapPackage>();
        // packages.forEach(installedPackage => {
        //   const maps = Object.values(installedPackage.maps);
        //   if (maps.length > 0) {
        //     const { x, y, z } = Object.values(installedPackage.maps)[0].rootTile;
        //     const id = this.getFeatureId(x, y, z);
        //     installedPackages.set(id, installedPackage);
        //   }
        // });
        const installedPackages = new Map(packages.map((p) => [this.getFeatureIdForPackage(p), p]));

          try{
            if (this.tilesLayer && map.hasLayer(this.tilesLayer)) {
              map.removeLayer(this.tilesLayer);
            }
          }catch(err) {
            
          }

        this.featureMap = new Map<string, Feature<Polygon, FeatureProperties>>();
  
        this.tilesLayer = new L.GeoJSON(tiles as GeoJsonObject, {
          filter: (feature) => {
            return this.packageMap.has(feature.id as string);
          },
          onEachFeature: (feature: Feature<Polygon, FeatureProperties>, layer) => {
            // TODO: We now also show modal dialog if package is installed or under downloading
            // if (installedPackages.has(feature.id as string)) {
            //   return; 
            // }

            if (this.packageMap.has(feature.id as string)) {
              this.featureMap.set(feature.id as string, feature);
              layer.on("click", () => {
                this.showModal.next(feature);
                // this.showPackageModal(feature);
                // this.selectedPackage = feature.properties["package"];
              });
            }
          }
        });
  
        this.tilesLayer.setStyle(feature => {
          const installedPackage = installedPackages.get(feature.id as string); 
          if (installedPackage != null) {
            if(installedPackage.error) {
              return {
                ...errorTileStyle,
                fillOpacity:  0.8,
              }
            }
            return {
              ...defaultTileStyle,
              fillOpacity: installedPackage.downloadComplete ?  0.8 : 0.5,
            }
          }
  
          return {
            ...defaultTileStyle,
            fillOpacity: 0.1,
          }
        });
        map.addLayer(this.tilesLayer);
    });

    this.showModal.pipe(
      debounceTime(200), 
      withLatestFrom(this.isZooming),
      filter(([_, isZooming]) => !isZooming),
      switchMap(([feature, _]) => from(this.showPackageModal(feature)))
    ).subscribe();

    // This is to avoid pinch-zooming on map triggers click event
    map.on("zoomend", () => {
      this.isZooming.next(false);
    });
    map.on("zoomstart", () => {
      this.isZooming.next(true);
    });
  }

  private getPackageName(x : number, y : number, z : number) {
    return `${x}-${y}-${z}`;
  }

  private getFeatureId(x : number, y : number, z : number) {
    return `(${x}, ${y}, ${z})`;
  }

  private getFeatureIdFromXYZ(xyz: number[]) {
    const [x, y, z] = xyz;
    return this.getFeatureId(x, y, z);
  }

  private getFeatureIdForPackage(map: OfflineMapPackage): string {
    if(map.compoundPackageMetadata) {
      return this.getFeatureIdFromXYZ(map.compoundPackageMetadata.getXYZ());
    }
    if(map.maps['statensKartverk']) {
      const rootTile = map.maps['statensKartverk'].rootTile;
      return this.getFeatureId(rootTile.x, rootTile.y, rootTile.z);
    }
    return '';
  }

  async showPackageModal(feature: Feature<Polygon, FeatureProperties>) {
    const [x, y, z] = feature.properties.xyz;
    const modal = await this.modalController.create({
      component: OfflinePackageModalComponent,
      componentProps: {
        feature: feature,
        packageOnServer: this.packageMap.get(feature.id as string),
        offlinePackageStatus$: this.packages$.pipe(
          map(packages => packages.find(p => p.name === this.getPackageName(x, y, z)))),
      },
      swipeToClose: true,
      mode: "ios"
    });
    await modal.present();
  }

  showPackageModalForPackage(map: OfflineMapPackage) {
    const feature = this.featureMap.get(this.getFeatureIdFromXYZ(map.compoundPackageMetadata.getXYZ()));
    if(feature) {
      this.showPackageModal(feature);
    }
  }

  humanReadableByteSize(bytes: number): string {
    if (isNaN(bytes)) {
      return '';
    }
    return this.helperService.humanReadableByteSize(bytes, false);
  }

  getPercentage(map: OfflineMapPackage): number {
    return Math.round((map.progress ? map.progress.percentage : 0) * 100);
  }

  async cancelOrDelete(map: OfflineMapPackage, event: Event) {
    event.stopPropagation();
    if (this.isDownloaded(map)) {
      // TODO: Are you su
      const toTranslate = ['DIALOGS.ARE_YOU_SURE', 'DIALOGS.CANCEL', 'DIALOGS.OK'];
      const translations = await this.translateService
        .get(toTranslate)
        .toPromise();
      const alert = await this.alertController.create({
        header: translations['DIALOGS.ARE_YOU_SURE'],
        message: translations['DIALOGS.ARE_YOU_SURE'],
        buttons: [
          {
            text: translations['DIALOGS.CANCEL'],
            role: 'cancel'
          },
          {
            text: translations['DIALOGS.OK'],
            handler: () => {
              this.offlineMapService.removeMapPackageByName(map.name);
            }
          }
        ]
      });
      alert.present();
    }else{
      this.offlineMapService.cancelDownloadPackage(map);
    }
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

  // async presentActionSheet(map: OfflineMapPackage): Promise<void> {
  //   const header = map.name;
  //   const subHeader = this.humanReadableByteSize(map.size);
  //   const buttons: ActionSheetButton[] = [];
  //   if (this.isDownloaded(map)) {
  //     buttons.push({
  //       text: 'Delete',
  //       role: 'destructive',
  //       icon: 'trash',
  //       handler: () => {
  //         this.offlineMapService.removeMapPackageByName(map.name);
  //       }
  //     });
  //   } else if (this.isDownloading(map)) {
  //     buttons.push({
  //       text: 'Avbryt',
  //       icon: 'close',
  //       handler: () => {
  //         this.cancelUnzip(map);
  //       }
  //     });
  //   }

  //   buttons.push({
  //     text: 'Lukk',
  //     role: 'cancel'
  //   });

  //   const actionSheet = await this.actionSheetController.create({
  //     header,
  //     subHeader,
  //     buttons
  //   });
  //   await actionSheet.present();
  // }
}
