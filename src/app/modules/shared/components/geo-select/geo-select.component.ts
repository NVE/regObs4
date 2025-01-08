import { IonItem, IonFab, IonFabButton, IonList, IonLabel } from '@ionic/angular/standalone';
import { Component, inject } from '@angular/core';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { GeoHazard } from 'src/app/modules/common-core/models';
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
export class GeoSelectComponent {
  private userSettingService = inject(UserSettingService);

  geoHazardTypes = [[GeoHazard.Snow], [GeoHazard.Ice], [GeoHazard.Water, GeoHazard.Soil]];
  isOpen = false;
  userSettings$ = this.userSettingService.userSetting$;

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  async changeGeoHazard(geoHazards: GeoHazard[]): Promise<void> {
    this.isOpen = false;
    this.userSettingService.updateUserSettings({ currentGeoHazard: geoHazards });
  }
}
