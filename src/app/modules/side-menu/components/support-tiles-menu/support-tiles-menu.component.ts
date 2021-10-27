import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SupportTile, SupportTileStore } from '../../../../core/models/support-tile.model';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import {
  setObservableTimeout,
  NgDestoryBase
} from '../../../../core/helpers/observable-helper';
import { Observable, Subscription } from 'rxjs';
import { PopupInfoService } from '../../../../core/services/popup-info/popup-info.service';
import { takeUntil, take } from 'rxjs/operators';

interface PopupSubscription {
  subscription: Subscription,
  checker: (name: string) => Observable<void>,
  condition: (tile: SupportTile) => boolean,
}

@Component({
  selector: 'app-support-tiles-menu',
  templateUrl: './support-tiles-menu.component.html',
  styleUrls: ['./support-tiles-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupportTilesMenuComponent extends NgDestoryBase {
  private checkSupportMap: PopupSubscription;
  private checkOfflineSupportMaps: {[mapName: string]: PopupSubscription} = {};

  opacityValues = [
    { name: 'SUPPORT_MAP.NO_OPACITY', value: 1.0 },
    { name: '25%', value: 0.75 },
    { name: '50%', value: 0.5 },
    { name: '75%', value: 0.25 }
  ];

  readonly supportTiles$: Observable<SupportTile[]>;

  constructor(
    private userSettingService: UserSettingService,
    private popupInfoService: PopupInfoService
  ) {
    super();
    this.supportTiles$ = this.userSettingService.supportTiles$.pipe(
      setObservableTimeout()
    );

    this.checkSupportMap = {
      subscription: undefined,
      checker: popupInfoService.checkSupportMapInfoPopup,
      condition: (_) => true,
    };
  }

  trackByMethod(index: number, el: SupportTile) {
    return el.name;
  }

  async onTileChanged(supportTile: SupportTile) {
    if (supportTile.checked) {
      this.onSubTileChanged(supportTile);
    } else {
      if (supportTile.subTile) {
        supportTile.subTile.enabled = false;
      }
      supportTile.enabled = false;
      this.saveSettings(supportTile);
    }
  }

  async onSubTileChanged(supportTile: SupportTile) {
    if (supportTile.subTile) {
      supportTile.subTile.enabled = supportTile.subTile.checked;
      let subTile = {
        ...supportTile.subTile,
        opacity: supportTile.opacity,
        geoHazardId: supportTile.geoHazardId
      };
      this.checkForInfoPopup(supportTile.subTile.enabled, subTile);
    }
    supportTile.enabled = !this.isChildActive(supportTile);
    this.saveSettings(supportTile);
    this.checkForInfoPopup(supportTile.enabled, supportTile);
  }

  async saveSettings(supportTile: SupportTile) {
    const currentSettings = await this.userSettingService.userSetting$
    .pipe(take(1))
    .toPromise();
    this.userSettingService.saveUserSettings({
      ...currentSettings,
      supportTiles: this.addOrUpdateSupportTileSettings(
        supportTile,
        currentSettings.supportTiles
      )
    });
  }

  isChildActive(supportTile: SupportTile): boolean {
    if (supportTile.subTile) {
      return supportTile.subTile.enabled
    }
    return false;
  }

  isTileActive(supportTile: SupportTile): boolean {
    return supportTile.enabled || this.isChildActive(supportTile);
  }

  checkForInfoPopup(enabled: boolean, supportTile: SupportTile = null) {
    if (!(supportTile.name in this.checkOfflineSupportMaps)) {
      this.checkOfflineSupportMaps[supportTile.name] = {
        subscription: undefined,
        checker: this.popupInfoService.checkOfflineSupportMapInfoPopup,
        condition: (tile) => !tile.availableOffline,
      }
    }
    [this.checkSupportMap, this.checkOfflineSupportMaps[supportTile.name]].forEach((checkMap) => {
      if (checkMap.subscription && !checkMap.subscription.closed) {
        checkMap.subscription.unsubscribe();
      } else if (this.checkOfflineSupportMaps)
      if (enabled && checkMap.condition(supportTile)) {
        checkMap.subscription = checkMap
          .checker.bind(this.popupInfoService)(supportTile.name)
          .pipe(takeUntil(this.ngDestroy$))
          .subscribe();
      }
    });
  }

  addOrUpdateSupportTileSettings(
    supportTile: SupportTile,
    currentSupportTileSettings: {
      name: string;
      enabled: boolean;
      opacity: number;
    }[]
  ): SupportTileStore[] {
    let storeTile = {
      opacity: supportTile.opacity,
      name: supportTile.name,
      enabled: supportTile.enabled,
      checked: supportTile.checked,
    };
    if (supportTile.subTile) {
      storeTile["subTile"] = {
        name: supportTile.subTile.name,
        enabled: supportTile.subTile.enabled,
        checked: supportTile.subTile.checked,
      }
    }
    return [
      ...currentSupportTileSettings.filter((m) => m.name !== supportTile.name) as SupportTile[],
      storeTile,
    ];
  }
}
