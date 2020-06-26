import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { UserSetting } from '../../../../core/models/user-settings.model';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-geo-select',
  templateUrl: './geo-select.component.html',
  styleUrls: ['./geo-select.component.scss'],
})
export class GeoSelectComponent implements OnInit {

  geoHazardTypes: Array<GeoHazard[]>;
  isOpen = false;
  userSettings$: Observable<UserSetting>;

  constructor(private userSettingService: UserSettingService) {
  }

  ngOnInit() {
    this.geoHazardTypes = [[GeoHazard.Snow], [GeoHazard.Ice], [GeoHazard.Water, GeoHazard.Dirt]];
    this.userSettings$ = this.userSettingService.userSetting$;
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  async changeGeoHazard(geoHazards: GeoHazard[]) {
    this.isOpen = false;
    const currentSettings = await this.userSettingService.userSetting$.pipe(take(1)).toPromise();
    this.userSettingService.saveUserSettings({
      ...currentSettings,
      currentGeoHazard: geoHazards,
    });
  }
}
