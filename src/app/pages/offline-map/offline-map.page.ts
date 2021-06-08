import { Component, NgZone, OnInit } from '@angular/core';
import { OfflineMapService } from '../../core/services/offline-map/offline-map.service';
import { OfflineMap } from '../../core/services/offline-map/offline-map.model';
import { HelperService } from '../../core/services/helpers/helper.service';
import { ActionSheetController } from '@ionic/angular';
import { ActionSheetButton } from '@ionic/core';
import { Observable, Subject } from 'rxjs';
import { UserSetting } from 'src/app/core/models/user-settings.model';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-offline-map',
  templateUrl: './offline-map.page.html',
  styleUrls: ['./offline-map.page.scss']
})
export class OfflineMapPage implements OnInit {
  downloadedMaps$: Observable<OfflineMap[]>;
  unzipStatus$: Observable<OfflineMap>;
  userSettings: UserSetting;
  private ngDestroy$ = new Subject();

  constructor(
    private offlineMapService: OfflineMapService,
    private helperService: HelperService,
    private actionSheetController: ActionSheetController,
    private userSettingService: UserSettingService,
    private ngZone: NgZone
  ) {}

  async ngOnInit(): Promise<void> {
    this.userSettingService.userSetting$
    .pipe(takeUntil(this.ngDestroy$))
    .subscribe((settings) => {
      this.ngZone.run(() => {
        this.userSettings = settings;
      });
    });

    this.downloadedMaps$ = await this.offlineMapService.getOfflineMaps$();
  }

  saveUserSettings() {
    this.userSettingService.saveUserSettings(this.userSettings);
  }

  ngOnDestroy() {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  humanReadableByteSize(bytes: number): string {
    if (isNaN(bytes)) {
      return '';
    }
    return this.helperService.humanReadableByteSize(bytes);
  }

  getPercentage(map: OfflineMap): number {
    const progress = this.offlineMapService.getUnzipProgress(map.name);
    return Math.round((progress ? progress : 0) * 100);
  }

  deleteMap(map: OfflineMap): Promise<void> {
    return this.offlineMapService.removeMap(map);
  }

  async cancelUnzip(map: OfflineMap): Promise<void> {
    await this.offlineMapService.removeMap(map);
  }

  isDownloading(map: OfflineMap): boolean {
    return map.downloadStart && !map.downloadComplete;
  }

  isDownloaded(map: OfflineMap): boolean {
    return !!map.downloadComplete;
  }

  async loadFile(files: FileList): Promise<void> {
    const file = files[0];
    if (file) {
      await this.offlineMapService.registerMapPackage(file, file.name);
    }
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
          this.offlineMapService.removeMap(map).then(() => {
            // console.log('map deleted');
          });
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
