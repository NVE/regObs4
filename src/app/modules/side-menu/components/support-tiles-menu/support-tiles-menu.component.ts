import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SupportTile } from '../../../../core/models/support-tile.model';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { setObservableTimeout } from '../../../../core/helpers/observable-helper';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-support-tiles-menu',
  templateUrl: './support-tiles-menu.component.html',
  styleUrls: ['./support-tiles-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupportTilesMenuComponent {

  // @ViewChild('steepness', { static: true }) steepness;
  // @ViewChild('weakenedice', { static: true }) weakenedice;
  // @ViewChild('floodzoones', { static: true }) floodzoones;
  // @ViewChild('clayzones', { static: true }) clayzones;

  // get currentGeoHazards(): GeoHazard[] {
  //   return this.userSetting ? this.userSetting.currentGeoHazard : [];
  // }
  // get supportTiles(): Array<SupportTile> {
  //   const tiles = settings.map.tiles.supportTiles;
  //   if (this.userSetting) {
  //     for (const tile of (this.userSetting.supportTiles || [])) {
  //       const supportTile = tiles.find((x) => x.name === tile.name);
  //       if (supportTile) {
  //         supportTile.enabled = tile.enabled;
  //         supportTile.opacity = tile.opacity;
  //       }
  //     }
  //   }
  //   return tiles;
  // }

  opacityValues = [
    { name: 'SUPPORT_MAP.NO_OPACITY', value: 1.0 },
    { name: '25%', value: 0.75 },
    { name: '50%', value: 0.50 },
    { name: '75%', value: 0.25 },
  ];

  // get legends() {
  //   return {
  //     steepness: this.steepness,
  //     weakenedice: this.weakenedice,
  //     floodzoones: this.floodzoones,
  //     clayzones: this.clayzones,
  //   };
  // }

  // getGeoHazardName(geoHazard: GeoHazard) {
  //   return GeoHazard[geoHazard];
  // }

  readonly supportTiles$: Observable<SupportTile[]>;

  constructor(private userSettingService: UserSettingService) {
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
