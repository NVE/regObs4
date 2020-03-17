import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SupportTile } from '../../../../core/models/support-tile.model';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { setObservableTimeout, NgDestoryBase } from '../../../../core/helpers/observable-helper';
import { Observable, Subscription } from 'rxjs';
import { PopupInfoService } from '../../../../core/services/popup-info/popup-info.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-support-tiles-menu',
  templateUrl: './support-tiles-menu.component.html',
  styleUrls: ['./support-tiles-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupportTilesMenuComponent extends NgDestoryBase {

  private checkSupportMapSubscription: Subscription;

  opacityValues = [
    { name: 'SUPPORT_MAP.NO_OPACITY', value: 1.0 },
    { name: '25%', value: 0.75 },
    { name: '50%', value: 0.50 },
    { name: '75%', value: 0.25 },
  ];

  readonly supportTiles$: Observable<SupportTile[]>;

  constructor(private userSettingService: UserSettingService, private popupInfoService: PopupInfoService) {
    super();
    this.supportTiles$ = this.userSettingService.supportTiles$.pipe(setObservableTimeout());
  }

  trackByMethod(index: number, el: SupportTile) {
    return el.name;
  }

  onTileChanged(supportTile: SupportTile) {
    this.userSettingService.currentSettings = {
      ...this.userSettingService.currentSettings,
      supportTiles: this.checkForDisableSupportTiles(supportTile, this.addOrUpdateSupportTileSettings(supportTile, this.userSettingService.currentSettings.supportTiles)),
    };
  }

  checkForInfoPopup(enabled: boolean) {
    if (this.checkSupportMapSubscription && !this.checkSupportMapSubscription.closed) {
      this.checkSupportMapSubscription.unsubscribe();
    }
    if (enabled) {
      this.checkSupportMapSubscription = this.popupInfoService.checkSupportMapInfoPopup().pipe(takeUntil(this.ngDestroy$)).subscribe();
    }
  }

  addOrUpdateSupportTileSettings(supportTile: SupportTile, currentSupportTileSettings: { name: string; enabled: boolean; opacity: number }[]): { name: string; enabled: boolean; opacity: number }[] {
    return [
      ...currentSupportTileSettings.filter((m) => m.name !== supportTile.name),
      { name: supportTile.name, enabled: supportTile.enabled, opacity: supportTile.opacity }
    ];
  }

  checkForDisableSupportTiles(supportTile: SupportTile, currentSupportTileSettings: { name: string; enabled: boolean; opacity: number }[]): { name: string; enabled: boolean; opacity: number }[] {
    if (supportTile.enabled && supportTile.disableWhenEnabled && supportTile.disableWhenEnabled.length > 0) {
      return currentSupportTileSettings.map((t) => ({ ...t, enabled: (supportTile.disableWhenEnabled.indexOf(t.name) >= 0 ? false : t.enabled) }));
    }
    return [...currentSupportTileSettings];
  }
}
