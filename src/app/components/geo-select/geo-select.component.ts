import { Component, OnInit, OnDestroy, Input, NgZone } from '@angular/core';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { GeoHazard } from '../../core/models/geo-hazard.enum';
import { Events } from '@ionic/angular';
import { settings } from '../../../settings';
import { Subscription } from 'rxjs';
import { UserSetting } from '../../core/models/user-settings.model';

@Component({
  selector: 'app-geo-select',
  templateUrl: './geo-select.component.html',
  styleUrls: ['./geo-select.component.scss']
})
export class GeoSelectComponent implements OnInit, OnDestroy {

  geoHazardTypes: Array<GeoHazard[]>;
  isOpen = false;
  currentGeoHazards: GeoHazard[];
  isFullscreen = false;
  private fullscreenChangedHandler: (isFullscreen: boolean) => void;
  private geoHazardSubscription: Subscription;
  private userSettings: UserSetting;

  @Input() inHeader: boolean;

  get size() {
    return this.inHeader && !this.isOpen ? 0.7 : 1.0;
  }

  constructor(
    private userSettingService: UserSettingService,
    private events: Events,
    private ngZone: NgZone) {

    this.fullscreenChangedHandler = (isFullscreen: boolean) => {
      this.ngZone.run(() => {
        this.isFullscreen = isFullscreen; // TODO: Use observable instead
      });
    };
  }

  async ngOnInit() {
    this.geoHazardTypes = [[GeoHazard.Snow], [GeoHazard.Ice], [GeoHazard.Water, GeoHazard.Dirt]];
    this.geoHazardSubscription = this.userSettingService.userSettingObservable$.subscribe((val) => {
      this.ngZone.run(() => {
        this.userSettings = val;
        this.currentGeoHazards = val.currentGeoHazard;
      });
    });
    this.events.subscribe(settings.events.fullscreenChanged, this.fullscreenChangedHandler);
  }

  ngOnDestroy(): void {
    this.events.unsubscribe(settings.events.fullscreenChanged, this.fullscreenChangedHandler);
    if (this.geoHazardSubscription) {
      this.geoHazardSubscription.unsubscribe();
    }
  }

  getNames(geoHazards: GeoHazard[]) {
    return geoHazards.map((geoHazard) => `GEO_HAZARDS.${GeoHazard[geoHazard]}`.toUpperCase());
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  async changeGeoHazard(geoHazards: GeoHazard[]) {
    this.userSettings.currentGeoHazard = geoHazards;
    await this.userSettingService.saveUserSettings(this.userSettings);
    this.ngZone.run(() => {
      this.isOpen = false;
    });
  }
}
