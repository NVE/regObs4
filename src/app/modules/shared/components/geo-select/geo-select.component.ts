import { Component, OnInit, OnDestroy, Input, NgZone } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { trigger, state, transition, animate, keyframes, style } from '@angular/animations';
import { FullscreenService } from '../../../../core/services/fullscreen/fullscreen.service';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { UserSetting } from '../../../../core/models/user-settings.model';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';

@Component({
  selector: 'app-geo-select',
  templateUrl: './geo-select.component.html',
  styleUrls: ['./geo-select.component.scss'],
})
export class GeoSelectComponent implements OnInit, OnDestroy {

  geoHazardTypes: Array<GeoHazard[]>;
  isOpen = false;

  private geoHazardSubscription: Subscription;
  userSettings: UserSetting;

  constructor(
    private userSettingService: UserSettingService,
    private fullscreenService: FullscreenService,
    private ngZone: NgZone) {
  }

  ngOnInit() {
    this.geoHazardTypes = [[GeoHazard.Snow], [GeoHazard.Ice], [GeoHazard.Water, GeoHazard.Dirt]];
    this.geoHazardSubscription = this.userSettingService.userSettingObservable$.subscribe((val) => {
      this.ngZone.run(() => {
        this.userSettings = val;
      });
    });
  }

  ngOnDestroy(): void {
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

  changeGeoHazard(geoHazards: GeoHazard[]) {
    this.isOpen = false;
    this.userSettings.currentGeoHazard = geoHazards;
    this.userSettingService.saveUserSettings(this.userSettings);
  }
}
