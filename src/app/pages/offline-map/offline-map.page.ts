import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { OfflineMapService } from '../../core/services/offline-map/offline-map.service';
import { OfflineMapPackage } from '../../core/services/offline-map/offline-map.model';
import { HelperService } from '../../core/services/helpers/helper.service';
import { AlertController, ModalController } from '@ionic/angular';
import { BehaviorSubject, combineLatest, from, Observable, Subject } from 'rxjs';
import { debounceTime, filter, map, shareReplay, switchMap, takeUntil, withLatestFrom } from 'rxjs/operators';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { OfflinePackageModalComponent } from './offline-package-modal/offline-package-modal.component';
import { CompoundPackage, CompoundPackageMetadata, CompoundPackageFeature } from './metadata.model';
import { TranslateService } from '@ngx-translate/core';
import { NgDestoryBase } from 'src/app/core/helpers/observable-helper';

const PACKAGE_INDEX_URL = 'https://offlinemap.blob.core.windows.net/packages/packageIndex_v2.json';
const filledTileOpacity = 0.8;
const notFilledTileOpacity = 0.1;
const documentStyle = getComputedStyle(document.body);
const defaultTileStyle = {
  color: documentStyle.getPropertyValue('--ion-color-primary'),
  opacity: 1,
  fillOpacity: notFilledTileOpacity
};
const downloadedTileStyle = {
  ...defaultTileStyle,
  fillOpacity: filledTileOpacity,
};
const errorTileStyle = {
  ...downloadedTileStyle,
  color: documentStyle.getPropertyValue('--ion-color-danger'),
};

type PackageIndex = CompoundPackageMetadata[];

interface PackageTotals {
  numPackages: number,
  spaceUsed: string
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
  packageTotals$: Observable<PackageTotals>;
  private readonly allPackages$: Observable<OfflineMapPackage[]>;
  private packagesOnServer$: Observable<Map<string, CompoundPackage>>;
  private packagesOnServer: Map<string, CompoundPackage> = new Map();
  showTileCard = true;
  showDownloads = false;
  tilesLayer: L.GeoJSON;
  // Could not get the click handler to only emit once per click, so wrapped this in a subject
  showModal = new Subject<CompoundPackageFeature>();
  isZooming = new BehaviorSubject<boolean>(false);
  featureMap = new Map<string, { feature: CompoundPackageFeature, layer: L.Layer }>();
  progressExpanded = false; //list of packages is expanded
  private downloadOrUnzipInProgressOrFailed = false; //we have packages under download, unzip or that has failed

  constructor(
    private helperService: HelperService,
    private modalController: ModalController,
    private offlineMapService: OfflineMapService,
    private alertController: AlertController,
    private translateService: TranslateService,
    private zone: NgZone,
    http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {
    super();
    // Download package index from azure
    this.packagesOnServer$ = http.get<PackageIndex>(PACKAGE_INDEX_URL).pipe(
      // Map downloaded package index to a packageName => package map
      map((packageIndex) => {
        const nameAndPkg: [string, CompoundPackage][] = packageIndex.map(p => [
          CompoundPackage.GetNameFromXYZ(...p.xyz),
          new CompoundPackage(p)
        ]);
        return new Map(nameAndPkg);
      }),
      shareReplay()
    );

    this.downloadAndUnzipProgress$ = this.offlineMapService.downloadAndUnzipProgress$
      .pipe(map((items) => items.sort(((a, b) => b.downloadStart - a.downloadStart))));
    this.installedPackages$ = this.offlineMapService.packages$
      .pipe(map((downloaded) => new Map(downloaded.map((item) => [this.getFeatureIdForPackage(item), item]))));
    this.allPackages$ = combineLatest([
      this.offlineMapService.downloadAndUnzipProgress$,
      this.offlineMapService.packages$
    ]).pipe((map(([inProgress, downloaded]) => [...inProgress, ...downloaded])));

    this.packageTotals$ = this.allPackages$.pipe(
      map((packages) => {
        let count = 0;
        let space = 0;
        for (const mapPackage of packages) {
          count += 1;
          space += mapPackage.size;
        }
        let spaceWithUnit = '0 MB';
        if (space > 0) {
          spaceWithUnit = this.humanReadableByteSize(space);
        }
        return { numPackages: count, spaceUsed: spaceWithUnit };
      })
    );

    this.downloadAndUnzipProgress$
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((packages) => {
        this.downloadOrUnzipInProgressOrFailed = packages.length > 0;
        this.cdr.markForCheck();
      });
  }

  toggleDownloads() {
    this.showDownloads = !this.showDownloads;
  }

  onMapReady(map: L.Map) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).LEAFLET_MAP = map;

    map.setZoom(7);

    this.tilesLayer = new L.GeoJSON(null, {
      onEachFeature: (feature: CompoundPackageFeature, layer) => {
        this.featureMap.set(feature.id as string, { feature, layer });
        layer.on('click', () => {
          if(this.packagesOnServer.has(feature.id as string) || this.installedPackages.has(feature.id as string)) {
            this.showModal.next(feature);
          }
        });
      }
    });

    map.addLayer(this.tilesLayer);

    this.packagesOnServer$.subscribe(packageMap => {
      packageMap.forEach((mapPackage) => {
        this.tilesLayer.addData(mapPackage.getFeature());
      });
    });

    combineLatest([
      this.installedPackages$,
      this.packagesOnServer$
    ])
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe(([installedPackages, packagesOnServer]) => {
        this.installedPackages = installedPackages;
        this.packagesOnServer = packagesOnServer;
        this.setStyleForPackages();
      });

    this.downloadAndUnzipProgress$.pipe(takeUntil(this.ngDestroy$)).subscribe((itemsWithProgress) => {
      this.zone.runOutsideAngular(() => {
        for(const item of itemsWithProgress) {
          this.setStyleForProgressOrDownloadedPackage(item);
        }
      });
    });

    this.showModal.pipe(
      debounceTime(200),
      withLatestFrom(this.isZooming),
      filter(([, isZooming]) => !isZooming),
      switchMap(([feature, ]) => from(this.showPackageModal(feature))),
      takeUntil(this.ngDestroy$)
    ).subscribe();

    // This is to avoid pinch-zooming on map triggers click event
    map.on('dragend zoomend', () => {
      this.isZooming.next(false);
    });
    map.on('dragstart zoomstart', () => {
      this.isZooming.next(true);
    });
  }

  private setStyleForPackages() {
    for(const [, item] of this.installedPackages) {
      this.setStyleForProgressOrDownloadedPackage(item);
    }
    for(const [key, ] of this.packagesOnServer) {
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
    if (item.error) {
      this.setStyleForFeature(id, errorTileStyle);
    } else {
      const fillOpacity = item.downloadComplete ? 0 : this.getProgressOpacity(item);
      this.setStyleForFeature(id, { ...defaultTileStyle, fillOpacity });
    }
  }

  private getProgressOpacity(item: OfflineMapPackage) {
    const progressValue = (item.progress ? (item.progress.percentage / 2.0) : 0) + 0.4;
    return Math.min(progressValue, filledTileOpacity);
  }

  private getFeaturePropertyId(x: number, y: number, z: number) {
    return CompoundPackage.GetNameFromXYZ(x, y, z);
  }

  private getFeatureIdForPackage(map: OfflineMapPackage): string {
    if(map.compoundPackageMetadata) {
      return this.getFeaturePropertyId(...map.compoundPackageMetadata.getXYZ());
    }
    const firstMap = Object.keys(map.maps)[0];
    if(map.maps[firstMap]) {
      const rootTile = map.maps[firstMap].rootTile;
      return this.getFeaturePropertyId(rootTile.x, rootTile.y, rootTile.z);
    }
    return '';
  }


  async showPackageModal(feature: CompoundPackageFeature) {
    const compoundPackage = this.packagesOnServer.get(feature.id as string);
    const name = compoundPackage.getName();
    const modal = await this.modalController.create({
      component: OfflinePackageModalComponent,
      componentProps: {
        feature: feature,
        packageOnServer: compoundPackage,
        offlinePackageStatus$: this.allPackages$.pipe(
          map(packages => packages.find(p => p.name === name))),
      },
      swipeToClose: true,
      mode: 'ios'
    });
    await modal.present();
  }

  showPackageModalForPackage(map: OfflineMapPackage) {
    const feature = this.featureMap.get(map.compoundPackageMetadata.getName());
    if(feature) {
      this.showPackageModal(feature.feature);
    }
  }

  humanReadableByteSize(bytes: number): string {
    if (isNaN(bytes)) {
      return '';
    }
    return this.helperService.humanReadableByteSize(bytes, true);
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

  getSpaceAvailable(): string {
    return this.humanReadableByteSize(this.offlineMapService.availableDiskspace?.available);
  }

  /**
   * @returns true if we can expand the progress list
   */
  isExpandable(): boolean {
    return this.downloadOrUnzipInProgressOrFailed && !this.progressExpanded;
  }

  /**
   * @returns true if we can collaps the progress list
   */
  isCollapsable(): boolean {
    return this.downloadOrUnzipInProgressOrFailed && this.progressExpanded;
  }
}
