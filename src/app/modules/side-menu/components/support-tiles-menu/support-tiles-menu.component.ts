import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SubTile, SupportTile, SupportTileStore } from '../../../../core/models/support-tile.model';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import {
  setObservableTimeout,
  NgDestoryBase
} from '../../../../core/helpers/observable-helper';
import { firstValueFrom, Observable, Subscription } from 'rxjs';
import { PopupInfoService } from '../../../../core/services/popup-info/popup-info.service';
import { takeUntil, take } from 'rxjs/operators';
import { IonCheckbox } from '@ionic/angular';

interface PopupSubscription {
  subscription: Subscription,
  checker: (name: string) => Observable<void>,
  condition: (tile: SubTile) => boolean,
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
  private subTileInstantiation: Subscription;

  opacityValues = [
    { name: 'SUPPORT_MAP.NO_OPACITY', value: 1.0 },
    { name: '25%', value: 0.75 },
    { name: '50%', value: 0.5 },
    { name: '75%', value: 0.25 }
  ];

  readonly supportTilesWithSubTiles$: Observable<SupportTile[]>;

  constructor(
    private userSettingService: UserSettingService,
    private popupInfoService: PopupInfoService
  ) {
    super();
    this.supportTilesWithSubTiles$ = this.userSettingService.supportTilesWithSubTiles$.pipe(
      setObservableTimeout()
    );

    // this.subTileInstantiation = this.supportTilesWithSubTiles$.subscribe((supportTiles) => {
    //   supportTiles.forEach(
    //     (supportTile) => this.onSubTileChanged(supportTile)
    //   );
    //   this.subTileInstantiation.unsubscribe();
    // });

    this.checkSupportMap = {
      subscription: undefined,
      checker: popupInfoService.checkSupportMapInfoPopup,
      condition: (_) => true,
    };
  }

  ngOnDestroy() {
    for (const checkMap of Object.values(this.checkOfflineSupportMaps).concat([this.checkSupportMap])) {
      if (checkMap.subscription && !checkMap.subscription.closed) {
        checkMap.subscription.unsubscribe();
      }
    }
  }

  trackByMethod(index: number, el: SupportTile) {
    return el.name;
  }

  isChecked(layer: SupportTile): boolean {
    if (layer.enabled || layer.subTile?.enabled) {
      console.log(`SUPPORTLAYER-MENU: isChecked returns true for ${layer.name} layer.enabled = ${layer.enabled}, layer.subTile.enabled = ${layer.subTile?.enabled}`);
      return true;
    }
    console.log(`SUPPORTLAYER-MENU: isChecked returns false for ${layer.name}`);
    return false;
  }

  async onTileChanged(layer: SupportTile, event: CustomEvent) {
    console.log(`SUPPORTLAYER-MENU: onTileChanged for ${layer.name}. layer.enabled = ${layer.enabled}. New value = ${event.detail.checked}`);
    const checkBox = (<any>event.target) as IonCheckbox;
    layer.enabled = checkBox.checked;
    if (layer.subTile) {
      console.log(`SUPPORTLAYER-MENU: onTileChanged for ${layer.name}. Disabling sublayer`);
      layer.subTile.enabled = false;
    }
    this.saveSettings(layer);
  }
  // async onTileChanged(supportTile: SupportTile, event: CustomEvent) {
  //   if (supportTile.checked) {
  //     this.onSubTileChanged(supportTile);
  //   } else {
  //     if (supportTile.subTile) {
  //       supportTile.subTile.enabled = false;
  //     }
  //     supportTile.enabled = false;
  //     this.saveSettings(supportTile);
  //   }
  // }

  // async onSubTileChanged(supportTile: SupportTile, event: CustomEvent) {
  //   if (supportTile.subTile?.enabled != supportTile.subTile?.checked) {
  //     supportTile.subTile.enabled = supportTile.subTile.checked;
  //     this.checkForInfoPopup(supportTile.subTile);
  //   }
  //   if (supportTile.enabled == this.isChildActive(supportTile)) {
  //     supportTile.enabled = !this.isChildActive(supportTile);
  //     this.checkForInfoPopup(supportTile);
  //   }
  //   this.saveSettings(supportTile);
  // }

  async saveSettings(supportTile: SupportTile) {
    const currentSettings = await firstValueFrom(this.userSettingService.userSetting$);
    this.userSettingService.saveUserSettings({
      ...currentSettings,
      supportTiles: this.addOrUpdateSupportTileSettings(
        supportTile,
        currentSettings.supportTiles
      )
    });
  }

  isChildActive(supportTile: SupportTile): boolean {
    return !!supportTile.subTile?.enabled;
  }

  isTileActive(supportTile: SupportTile): boolean {
    return supportTile.enabled || this.isChildActive(supportTile);
  }

  checkForInfoPopup(layer: SubTile = null) {
    if (!(layer.name in this.checkOfflineSupportMaps)) {
      this.checkOfflineSupportMaps[layer.name] = {
        subscription: undefined,
        checker: this.popupInfoService.checkOfflineSupportMapInfoPopup,
        condition: (tile) => !tile.availableOffline,
      };
    }
    [this.checkSupportMap, this.checkOfflineSupportMaps[layer.name]].forEach((checkMap) => {
      if (checkMap.subscription && !checkMap.subscription.closed) {
        checkMap.subscription.unsubscribe();
      }
      if (layer.enabled && checkMap.condition(layer)) {
        checkMap.subscription = checkMap
          .checker.bind(this.popupInfoService)(layer.name)
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
    const storeTile = {
      opacity: supportTile.opacity,
      name: supportTile.name,
      enabled: supportTile.enabled,
      checked: supportTile.checked,
    };
    if (supportTile.subTile) {
      storeTile['subTile'] = {
        name: supportTile.subTile.name,
        enabled: supportTile.subTile.enabled,
        checked: supportTile.subTile.checked,
      };
    }
    return [
      ...currentSupportTileSettings.filter((m) => m.name !== supportTile.name) as SupportTile[],
      storeTile,
    ];
  }
}
