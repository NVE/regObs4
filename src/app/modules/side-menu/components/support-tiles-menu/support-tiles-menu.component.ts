import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SupportTile } from '../../../../core/models/support-tile.model';
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
  checker: () => Observable<void>,
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
  private checkOfflineSupportMap: PopupSubscription;

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
    this.checkOfflineSupportMap = {
      subscription: undefined,
      checker: popupInfoService.checkOfflineSupportMapInfoPopup,
      condition: (tile) => !tile.availableOffline,
    };
  }

  trackByMethod(index: number, el: SupportTile) {
    return el.name;
  }

  async onTileChanged(supportTile: SupportTile) {
    const currentSettings = await this.userSettingService.userSetting$
      .pipe(take(1))
      .toPromise();
    this.userSettingService.saveUserSettings({
      ...currentSettings,
      supportTiles: this.checkForDisableSupportTiles(
        supportTile,
        this.addOrUpdateSupportTileSettings(
          supportTile,
          currentSettings.supportTiles
        )
      )
    });
  }

  checkForInfoPopup(enabled: boolean, supportTile: SupportTile = null) {
    [this.checkSupportMap, this.checkOfflineSupportMap].forEach((checkMap) => {
      if (checkMap.subscription && !checkMap.subscription.closed) {
        checkMap.subscription.unsubscribe();
      }
      if (enabled && checkMap.condition(supportTile)) {
        checkMap.subscription = checkMap
          .checker.bind(this.popupInfoService)()
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
  ): { name: string; enabled: boolean; opacity: number }[] {
    return [
      ...currentSupportTileSettings.filter((m) => m.name !== supportTile.name),
      {
        name: supportTile.name,
        enabled: supportTile.enabled,
        opacity: supportTile.opacity
      }
    ];
  }

  checkForDisableSupportTiles(
    supportTile: SupportTile,
    currentSupportTileSettings: {
      name: string;
      enabled: boolean;
      opacity: number;
    }[]
  ): { name: string; enabled: boolean; opacity: number }[] {
    if (
      supportTile.enabled &&
      supportTile.disableWhenEnabled &&
      supportTile.disableWhenEnabled.length > 0
    ) {
      return currentSupportTileSettings.map((t) => ({
        ...t,
        enabled:
          supportTile.disableWhenEnabled.indexOf(t.name) >= 0
            ? false
            : t.enabled
      }));
    }
    return [...currentSupportTileSettings];
  }
}
