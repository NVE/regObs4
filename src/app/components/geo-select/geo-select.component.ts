import { Component, OnInit, ElementRef, ViewChild, OnDestroy, Input } from '@angular/core';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { GeoHazard } from '../../core/models/geo-hazard.enum';
import { Events, Fab, FabButton } from '@ionic/angular';
import { settings } from '../../../settings';

@Component({
  selector: 'app-geo-select',
  templateUrl: './geo-select.component.html',
  styleUrls: ['./geo-select.component.scss']
})
export class GeoSelectComponent implements OnInit, OnDestroy {

  geoHazardTypes: Array<GeoHazard>;
  isOpen = false;
  currentGeoHazard: GeoHazard;
  isFullscreen = false;

  @Input() inHeader: boolean;

  constructor(private userSettingService: UserSettingService, private events: Events) { }

  async ngOnInit() {
    this.geoHazardTypes = Object.keys(GeoHazard)
      .filter(key => !isNaN(Number(GeoHazard[key])))
      .map((key) => GeoHazard[key]);
    this.currentGeoHazard = await this.getCurrentGeoHazard();
    this.events.subscribe(settings.events.fullscreenChanged, (isFullscreen: boolean) => {
      this.isFullscreen = isFullscreen; // TODO: Use css calculated variable instead
    });
  }

  ngOnDestroy(): void {
    this.events.unsubscribe(settings.events.fullscreenChanged);
  }

  async getCurrentGeoHazard() {
    const userSettings = await this.userSettingService.getUserSettings();
    return userSettings.currentGeoHazard;
  }

  getName(geoHazard: GeoHazard) {
    return `GEO_HAZARDS.${GeoHazard[geoHazard]}`.toUpperCase();
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  async changeGeoHazard(geoHazard: GeoHazard) {
    const userSettings = await this.userSettingService.getUserSettings();
    userSettings.currentGeoHazard = geoHazard;
    await this.userSettingService.saveUserSettings(userSettings);
    this.currentGeoHazard = geoHazard;
    this.isOpen = false;
    this.events.publish(settings.events.geoHazardChanged, GeoHazard[geoHazard]);
  }
}
