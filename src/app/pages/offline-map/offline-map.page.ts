import { Component, OnInit } from '@angular/core';
import { OfflineMapService } from '../../core/services/offline-map/offline-map.service';
import { OfflineMapPackage } from '../../core/services/offline-map/offline-map.model';
import { HelperService } from '../../core/services/helpers/helper.service';
import { ActionSheetController } from '@ionic/angular';
import { ActionSheetButton } from '@ionic/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-offline-map',
  templateUrl: './offline-map.page.html',
  styleUrls: ['./offline-map.page.scss']
})
export class OfflineMapPage {
  unzipStatus$: Observable<OfflineMapPackage>;

  constructor(
    public offlineMapService: OfflineMapService,
    private helperService: HelperService,
    private actionSheetController: ActionSheetController
  ) {}

  humanReadableByteSize(bytes: number): string {
    if (isNaN(bytes)) {
      return '';
    }
    return this.helperService.humanReadableByteSize(bytes);
  }

  getPercentage(map: OfflineMapPackage): number {
    const progress = this.offlineMapService.getUnzipProgress(map.name);
    return Math.round((progress ? progress : 0) * 100);
  }

  // TODO: Is this method used?
  deleteMap(map: OfflineMapPackage): Promise<void> {
    return this.offlineMapService.removeMapPackage(map);
  }

  async cancelUnzip(map: OfflineMapPackage): Promise<void> {
    await this.offlineMapService.removeMapPackage(map);
  }

  isDownloading(map: OfflineMapPackage): boolean {
    return map.downloadStart && !map.downloadComplete;
  }

  isDownloaded(map: OfflineMapPackage): boolean {
    return !!map.downloadComplete;
  }

  async loadFile(files: FileList): Promise<void> {
    const file = files[0];
    if (file) {
      await this.offlineMapService.registerMapPackage(file, file.name);
    }
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
          this.offlineMapService.removeMapPackage(map);
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
