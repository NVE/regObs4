import { Component, OnInit } from '@angular/core';
import { OfflineMapService } from '../../core/services/offline-map/offline-map.service';
import { OfflineMap } from '../../core/services/offline-map/offline-map.model';
import { HelperService } from '../../core/services/helpers/helper.service';
import { ActionSheetController } from '@ionic/angular';
import { ActionSheetButton } from '@ionic/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-offline-map',
  templateUrl: './offline-map.page.html',
  styleUrls: ['./offline-map.page.scss']
})
export class OfflineMapPage implements OnInit {
  availableMapsToDownload$: Observable<OfflineMap[]>;
  downloadedMaps$: Observable<OfflineMap[]>;

  constructor(
    private offlineMapService: OfflineMapService,
    private helperService: HelperService,
    private actionSheetController: ActionSheetController
  ) {}

  ngOnInit(): void {
    this.availableMapsToDownload$ = this.offlineMapService.createAvailableOfflineMapsToDownload$();
    this.downloadedMaps$ = this.offlineMapService.createDownloadedOfflineMaps$();
  }

  humanReadableByteSize(bytes: number): string {
    return this.helperService.humanReadableByteSize(bytes);
  }

  async downloadMap(map: OfflineMap): Promise<void> {
    await this.offlineMapService.downloadMap(map);
  }

  getPercentage(map: OfflineMap): number {
    return Math.round(
      (map.progress && map.progress.percentage ? map.progress.percentage : 0) *
        100
    );
  }

  deleteMap(map: OfflineMap): Promise<void> {
    return this.offlineMapService.remove(map);
  }

  async cancelDownload(map: OfflineMap): Promise<void> {
    await this.offlineMapService.cancelDownload(map);
  }

  isDownloading(map: OfflineMap): boolean {
    return map.downloadStart && !map.downloadComplete;
  }

  isDownloaded(map: OfflineMap): boolean {
    return !!map.downloadComplete;
  }

  async presentActionSheet(map: OfflineMap): Promise<void> {
    const header = map.name;
    const subHeader = this.humanReadableByteSize(map.size);
    const buttons: ActionSheetButton[] = [];
    if (this.isDownloaded(map)) {
      buttons.push({
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.offlineMapService.remove(map).then(() => {
            // console.log('map deleted');
          });
        }
      });
    } else if (this.isDownloading(map)) {
      buttons.push({
        text: 'Avbryt',
        icon: 'close',
        handler: () => {
          this.cancelDownload(map);
        }
      });
    } else {
      buttons.push({
        text: 'Download',
        icon: 'download',
        handler: () => {
          this.downloadMap(map).then(() => {
            // console.log('Start downloading map');
          });
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
