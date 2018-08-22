import { Component, OnInit } from '@angular/core';
import { UserSettingService } from '../../core/services/user-setting.service';
import { GeoHazard } from '../../core/models/geo-hazard.enum';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-geo-select',
  templateUrl: './geo-select.component.html',
  styleUrls: ['./geo-select.component.scss']
})
export class GeoSelectComponent implements OnInit {

  geoHazardTypes: Array<string>;
  isOpen = false;
  currentGeoHazard: string;

  constructor(private userSettingService: UserSettingService, private events: Events) { }

  async ngOnInit() {
    this.geoHazardTypes = Object.keys(GeoHazard).map(key => GeoHazard[key]).filter(value => typeof value === 'string') as string[];
    this.currentGeoHazard = await this.getCurrentGeoHazard();
  }

  async getCurrentGeoHazard() {
    const userSettings = await this.userSettingService.getUserSettings();
    return GeoHazard[userSettings.currentGeoHazard];
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  async changeGeoHazard(geoHazard: string) {
    const userSettings = await this.userSettingService.getUserSettings();
    userSettings.currentGeoHazard = GeoHazard[geoHazard];
    await this.userSettingService.saveUserSettings(userSettings);
    this.currentGeoHazard = geoHazard;
    this.isOpen = false;
    this.events.publish('geoHazard:changed', GeoHazard[geoHazard]);
  }
}
