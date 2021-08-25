import { Component, NgZone } from '@angular/core';
import { OfflineMapService } from '../../core/services/offline-map/offline-map.service';
import { OfflineMapPackage } from '../../core/services/offline-map/offline-map.model';
import { HelperService } from '../../core/services/helpers/helper.service';
import { AlertController, ModalController } from '@ionic/angular';
import { BehaviorSubject, combineLatest, from, Observable, Subject } from 'rxjs';
import { debounceTime, filter, map, shareReplay, switchMap, takeUntil, withLatestFrom } from 'rxjs/operators';
import tiles from "./z8.json";
import * as L from "leaflet";
import { GeoJsonObject } from 'geojson';
import { HttpClient } from '@angular/common/http';
import { OfflinePackageModalComponent } from './offline-package-modal/offline-package-modal.component';
import { CompoundPackageMetadata, FeatureProperties, PackageMetadata } from './metadata.model';
import { Polygon, Feature } from 'geojson';
import { TranslateService } from '@ngx-translate/core';
import { NgDestoryBase } from 'src/app/core/helpers/observable-helper';

const PACKAGE_INDEX_URL = "https://offlinemap.blob.core.windows.net/packages/packageIndex.json";
const filledTileOpacity = 0.8;
const notFilledTileOpacity = 0.1;
const documentStyle = getComputedStyle(document.body);
const defaultTileStyle = {
  color: documentStyle.getPropertyValue("--ion-color-primary"),
  opacity: 1,
  fillOpacity: notFilledTileOpacity
};
const downloadedTileStyle = {
  ...defaultTileStyle,
  fillOpacity: filledTileOpacity,
};
const errorTileStyle = {
  ...downloadedTileStyle,
  color: documentStyle.getPropertyValue("--ion-color-danger"),
};
const hiddenTileStyle = {
  opacity: 0,
  fillOpacity: 0,
}

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
export class OfflineMapPage extends NgDestoryBase {
  private readonly installedPackages$: Observable<Map<string, OfflineMapPackage>>;
  private installedPackages: Map<string, OfflineMapPackage> = new Map();
  downloadAndUnzipProgress$: Observable<OfflineMapPackage[]>;
  private readonly allPackages$: Observable<OfflineMapPackage[]>;
  private packagesOnServer$: Observable<Map<string, CompoundPackageMetadata>>;
  private packagesOnServer: Map<string, CompoundPackageMetadata> = new Map();
  selectedPackage: CompoundPackageMetadata = null;
  showTileCard = true;
  showDownloads = false;
  tilesLayer: L.GeoJSON;
  // Could not get the click handler to only emit once per click, so wrapped this in a subject
  showModal = new Subject<Feature<Polygon, FeatureProperties>>();
  isZooming = new BehaviorSubject<boolean>(false);
  featureMap = new Map<string, { feature: Feature<Polygon, FeatureProperties>, layer: L.Layer }>();

  constructor(
    private helperService: HelperService,
    private modalController: ModalController,
    private offlineMapService: OfflineMapService,
    private alertController: AlertController,
    private translateService: TranslateService,
    private zone: NgZone,
    http: HttpClient,
  ) {
    super();
    this.packagesOnServer$ = http.get<PackageIndex>(PACKAGE_INDEX_URL).pipe(
      this.convertToCompoundPackageMap(),
      shareReplay(),
      takeUntil(this.ngDestroy$));
    this.downloadAndUnzipProgress$ = this.offlineMapService.downloadAndUnzipProgress$
      .pipe(map((items) => items.sort(((a, b) => b.downloadStart - a.downloadStart))),
      takeUntil(this.ngDestroy$));
    this.installedPackages$ = this.offlineMapService.packages$.pipe(map((downloaded) => new Map(downloaded.map((item) => [this.getFeatureIdForPackage(item), item])), takeUntil(this.ngDestroy$)));
    this.allPackages$ = combineLatest([this.offlineMapService.downloadAndUnzipProgress$, this.offlineMapService.packages$])
      .pipe((map(([inProgress, downloaded]) => [...inProgress, ...downloaded])), takeUntil(this.ngDestroy$));
  }

  toggleDownloads() {
    this.showDownloads = !this.showDownloads
  }

  onMapReady(map: L.Map) {
    (window as any).LEAFLET_MAP = map;

    map.setZoom(7);

    this.tilesLayer = new L.GeoJSON(tiles as GeoJsonObject, {
      style: hiddenTileStyle,
      onEachFeature: (feature: Feature<Polygon, FeatureProperties>, layer) => {
               this.featureMap.set(feature.id as string, { feature, layer });
               layer.on("click", () => {
                  if(this.packagesOnServer.has(feature.id as string) || this.installedPackages.has(feature.id as string)) {
                    this.showModal.next(feature);
                  }
               });
      }
    });

    map.addLayer(this.tilesLayer);

    combineLatest([this.installedPackages$, this.packagesOnServer$]).subscribe(([installedPackages, packagesOnServer]) => {
      this.installedPackages = installedPackages;
      this.packagesOnServer = packagesOnServer;
      this.setStyleForPackages();
    });

    this.downloadAndUnzipProgress$.subscribe((itemsWithProgress) => {
      this.zone.runOutsideAngular(() => {
        for(let item of itemsWithProgress) {
          this.setStyleForProgressOrDownloadedPackage(item);
        }
      });
    });

    this.showModal.pipe(
      debounceTime(200), 
      withLatestFrom(this.isZooming),
      filter(([_, isZooming]) => !isZooming),
      switchMap(([feature, _]) => from(this.showPackageModal(feature)))
    ).subscribe();

    // This is to avoid pinch-zooming on map triggers click event
    map.on("dragend zoomend", () => {
      this.isZooming.next(false);
    });
    map.on("dragstart zoomstart", () => {
      this.isZooming.next(true);
    });
  }

  private setStyleForPackages() {
    for(let [_, item] of this.installedPackages) {
      this.setStyleForProgressOrDownloadedPackage(item);
    }
    for(let [key, _] of this.packagesOnServer) {
      if(!this.installedPackages.has(key)) {
        this.setStyleForFeature(key, defaultTileStyle);
      }
    }
  }

  private setStyleForFeature(id: string, style: L.PathOptions) {
    const feature = this.featureMap.get(id);
    if(feature) {
      const polyline = (feature.layer as L.Polyline);
      polyline.setStyle(style);
    }
  }

  private setStyleForProgressOrDownloadedPackage(item: OfflineMapPackage) {
    const id = this.getFeatureIdForPackage(item);
    if(item.error) {
      this.setStyleForFeature(id, errorTileStyle);
    }else{
      const fillOpacity = item.downloadComplete ? filledTileOpacity : this.getProgressOpacity(item); 
      this.setStyleForFeature(id, { ...defaultTileStyle, fillOpacity });
    }
  }

  private getProgressOpacity(item: OfflineMapPackage) {
    const progressValue = (item.progress ? (item.progress.percentage / 2.0) : 0) + 0.4;
    return Math.min(progressValue, filledTileOpacity);
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

  private convertToCompoundPackageMap(): (src: Observable<PackageIndex>) => Observable<Map<string, CompoundPackageMetadata>> {
    return (src) => src.pipe(map((packageIndex) => {
       const packageMap = new Map<string, CompoundPackageMetadata>();
        packageIndex.statensKartverk.forEach(p => {
          const [x, y, z] = p.xyz;
          const id = this.getFeatureId(x, y, z);
          const compoundPackage = new CompoundPackageMetadata(p.xyz);
          compoundPackage.addPackage(p);
          packageMap.set(id, compoundPackage);
        });

        for(const supportMap of packageIndex['steepness-outlet']) {
          const [x, y, z] = supportMap.xyz;
          const id = this.getFeatureId(x, y, z);
          const existingPackage = packageMap.get(id);
          if(existingPackage) {
            existingPackage.addPackage(supportMap);
          }
        }
        return packageMap;
    }));
  }

  async showPackageModal(feature: Feature<Polygon, FeatureProperties>) {
    const [x, y, z] = feature.properties.xyz;
    const modal = await this.modalController.create({
      component: OfflinePackageModalComponent,
      componentProps: {
        feature: feature,
        packageOnServer: this.packagesOnServer.get(feature.id as string),
        offlinePackageStatus$: this.allPackages$.pipe(
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
      this.showPackageModal(feature.feature);
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
}
