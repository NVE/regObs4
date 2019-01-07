import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { UserSettingService } from '../../../core/services/user-setting/user-setting.service';
import { GeoHazard } from '../../../core/models/geo-hazard.enum';
import { settings } from '../../../../settings';
import { SupportTile } from '../../../core/models/support-tile.model';
import { UserSetting } from '../../../core/models/user-settings.model';

@Component({
  selector: 'app-support-tiles-menu',
  templateUrl: './support-tiles-menu.component.html',
  styleUrls: ['./support-tiles-menu.component.scss']
})
export class SupportTilesMenuComponent implements OnInit, OnDestroy {

  @Input() userSetting: UserSetting;
  @ViewChild('steepness') steepness;
  @ViewChild('weakenedice') weakenedice;
  @ViewChild('floodzoones') floodzoones;
  @ViewChild('clayzones') clayzones;

  get currentGeoHazards(): GeoHazard[] {
    return this.userSetting ? this.userSetting.currentGeoHazard : [];
  }
  get supportTiles(): Array<SupportTile> {
    const tiles = settings.map.tiles.supportTiles;
    if (this.userSetting) {
      for (const tile of (this.userSetting.supportTiles || [])) {
        const supportTile = tiles.find((x) => x.name === tile.name);
        if (supportTile) {
          supportTile.enabled = tile.enabled;
          supportTile.opacity = tile.opacity;
        }
      }
    }
    return tiles;
  }

  opacityValues = [
    { name: 'SUPPORT_MAP.NO_OPACITY', value: 1.0 },
    { name: '75%', value: 0.75 },
    { name: '50%', value: 0.50 },
    { name: '25%', value: 0.25 }
  ];

  get legends() {
    return {
      steepness: this.steepness,
      weakenedice: this.weakenedice,
      floodzoones: this.floodzoones,
      clayzones: this.clayzones,
    };
  }

  getGeoHazardName(geoHazard: GeoHazard) {
    return GeoHazard[geoHazard];
  }

  constructor(private userSettingService: UserSettingService) {
  }

  async ngOnInit() {
  }

  async onTileChanged(supportTile: SupportTile) {
    const currentUserSettingTile = this.userSetting.supportTiles.find((x) => x.name === supportTile.name);
    if (currentUserSettingTile) {
      currentUserSettingTile.enabled = supportTile.enabled;
      currentUserSettingTile.opacity = supportTile.opacity;
    } else {
      this.userSetting.supportTiles.push({ name: supportTile.name, enabled: supportTile.enabled, opacity: supportTile.opacity });
    }
    await this.userSettingService.saveUserSettings(this.userSetting);
  }

  ngOnDestroy(): void {
  }
}
