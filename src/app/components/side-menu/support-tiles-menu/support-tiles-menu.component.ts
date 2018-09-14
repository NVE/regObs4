import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { UserSettingService } from '../../../core/services/user-setting.service';
import { Events } from '@ionic/angular';
import { GeoHazard } from '../../../core/models/geo-hazard.enum';
import { settings } from '../../../../settings';
import { SupportTile } from '../../../core/models/support-tile.model';

@Component({
  selector: 'app-support-tiles-menu',
  templateUrl: './support-tiles-menu.component.html',
  styleUrls: ['./support-tiles-menu.component.scss']
})
export class SupportTilesMenuComponent implements OnInit, OnDestroy {
  @ViewChild('steepness') steepness;
  @ViewChild('weakenedice') weakenedice;
  @ViewChild('floodzoones') floodzoones;
  @ViewChild('quickclay') quickclay;
  currentGeoHazard: GeoHazard;
  supportTiles: Array<SupportTile>;
  opacityValues = [
    { name: 'SUPPORT_MAP.NO_OPACITY', value: 1.0 },
    { name: '75%', value: 0.75 },
    { name: '50%', value: 0.50 }
  ];

  get legends() {
    return {
      steepness: this.steepness,
      weakenedice: this.weakenedice,
      floodzoones: this.floodzoones,
      quickclay: this.quickclay,
    };
  }

  get geoHazardName() {
    return GeoHazard[this.currentGeoHazard];
  }

  constructor(private userSettingService: UserSettingService, private events: Events) {
    this.supportTiles = [];
  }

  async ngOnInit() {
    this.events.subscribe(settings.events.geoHazardChanged, (geoHazard) => {
      this.init();
    });
    await this.init();
  }

  async onTileChanged(supportTile: SupportTile) {
    console.log('toggle changed for', supportTile.name, supportTile.enabled, supportTile.opacity);
    const userSettings = await this.userSettingService.getUserSettings();
    userSettings.supportTiles = this.supportTiles;
    await this.userSettingService.saveUserSettings(userSettings);
    this.events.publish(settings.events.supportTilesChanged, supportTile);
  }

  async init() {
    const userSettings = await this.userSettingService.getUserSettings();
    this.currentGeoHazard = userSettings.currentGeoHazard;
    this.supportTiles = settings.map.tiles.supportTiles;
    userSettings.supportTiles.forEach((tile) => {
      const supportTile = this.supportTiles.find((x) => x.name === tile.name);
      if (supportTile) {
        supportTile.enabled = tile.enabled;
        supportTile.opacity = tile.opacity;
      }
    });
  }

  ngOnDestroy(): void {
    this.events.unsubscribe(settings.events.geoHazardChanged);
  }
}
