import { UpperCasePipe } from '@angular/common';
import { Component, computed, inject, viewChild, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  NavController,
  Platform,
} from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { add, create } from 'ionicons/icons';
import { map } from 'rxjs/operators';
import { isAndroidOrIos } from 'src/app/core/helpers/ionic/platform-helper';
import { DraftRepositoryService } from 'src/app/core/services/draft/draft-repository.service';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { TripLoggerService } from '../../../../core/services/trip-logger/trip-logger.service';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { GeoIconComponent } from '../geo-icon/geo-icon.component';
import { FormatDatePipe } from '../../pipes/format-date/format-date.pipe';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-add-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.scss'],
  imports: [
    GeoIconComponent,
    IonFab,
    IonFabButton,
    IonFabList,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    TranslatePipe,
    UpperCasePipe,
    FormatDatePipe,
  ],
})
export class AddMenuComponent {
  private draftService = inject(DraftRepositoryService);
  private navController = inject(NavController);
  private tripLoggerService = inject(TripLoggerService);
  private userSettingService = inject(UserSettingService);
  private platform = inject(Platform);

  readonly menuFab = viewChild<IonFab>('menuFab');

  geoHazards = toSignal(this.userSettingService.userSetting$.pipe(map((us) => us.currentGeoHazard)), {
    initialValue: [GeoHazard.Snow],
  });
  showTrip = computed(() => this.geoHazards().indexOf(GeoHazard.Snow) > -1);
  tripStarted = this.tripLoggerService.isTripRunning;
  isIosOrAndroid = isAndroidOrIos(this.platform);

  private draftsSignal = toSignal(this.draftService.drafts$, { initialValue: [] });

  drafts = computed(() =>
    this.draftsSignal()
      .filter((d) => d.syncStatus === SyncStatus.Draft)
      // Sorter fra nyeste til eldste
      .sort((d1, d2) => d2.lastSavedTime - d1.lastSavedTime)
      .map((d) => ({
        id: d.uuid,
        geoHazard: d.registration.GeoHazardTID,
        lastSaved: new Date(d.lastSavedTime),
      }))
  );

  isMyObservations = this.router.url === '/my-observations';

  constructor(private router: Router) {
    addIcons({ add, create });
  }

  getName(geoHazard: GeoHazard): string {
    return GeoHazard[geoHazard];
  }

  closeAndNavigate(url: string): void {
    setTimeout(() => {
      this.closeMenu();
    }, 0);
    this.navController.navigateForward(url);
  }

  createRegistration(geoHazard: GeoHazard): void {
    this.closeAndNavigate(`registration/new/${geoHazard}`);
  }

  editRegistration(id: string): void {
    this.closeAndNavigate(`registration/edit/${id}`);
  }

  closeMenu(): void {
    this.menuFab()?.close();
  }

  startOrStopTrip(tripStarted: boolean): void {
    return tripStarted ? this.tripLoggerService.stopLegacyTrip() : this.closeAndNavigate('legacy-trip');
  }
}
