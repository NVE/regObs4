import { IonItem, IonFab, IonFabButton, IonList, IonLabel } from '@ionic/angular/standalone';
import { Component, OnInit, inject } from '@angular/core';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { UserSetting } from '../../../../core/models/user-settings.model';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { GeoIconComponent } from '../geo-icon/geo-icon.component';
import { GeoNameComponent } from '../geo-name/geo-name.component';

@Component({
  selector: 'app-geo-select',
  templateUrl: './geo-select.component.html',
  styleUrls: ['./geo-select.component.scss'],
  imports: [
    AsyncPipe,
    GeoIconComponent,
    GeoNameComponent,
    IonFab,
    IonFabButton,
    IonItem,
    IonLabel,
    IonList,
    NgFor,
    NgIf,
  ],
})
export class GeoSelectComponent implements OnInit {
  private userSettingService = inject(UserSettingService);

  geoHazardTypes: Array<GeoHazard[]>;
  isOpen = false;
  userSettings$: Observable<UserSetting>;

  ngOnInit(): void {
    this.geoHazardTypes = [[GeoHazard.Snow], [GeoHazard.Ice], [GeoHazard.Water, GeoHazard.Soil]];
    this.userSettings$ = this.userSettingService.userSetting$;
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  async changeGeoHazard(geoHazards: GeoHazard[]): Promise<void> {
    this.isOpen = false;
    const currentSettings = await this.userSettingService.userSetting$.pipe(take(1)).toPromise();
    this.userSettingService.saveUserSettings({
      ...currentSettings,
      currentGeoHazard: geoHazards,
    });
  }
}
