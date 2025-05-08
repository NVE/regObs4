import { IonToolbar, IonBackButton, IonTitle, IonHeader, IonButton, IonButtons } from '@ionic/angular/standalone';
import { Component, inject, computed } from '@angular/core';
import { FullscreenService } from '../../../../core/services/fullscreen/fullscreen.service';
import { TripLoggerService } from '../../../../core/services/trip-logger/trip-logger.service';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { AppMode } from 'src/app/modules/common-core/models';
import { NgIf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { optionsOutline } from 'ionicons/icons';
import { toSignal } from '@angular/core/rxjs-interop';
import { HeaderColorDirective } from '../../directives/header-color/header-color.directive';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    HeaderColorDirective,
    IonBackButton,
    IonButton,
    IonButtons,
    IonHeader,
    IonTitle,
    IonToolbar,
    NgIf,
    TranslatePipe,
  ],
})
export class HeaderComponent {
  private fullscreenService = inject(FullscreenService);
  private tripLoggerService = inject(TripLoggerService);
  private userSettingService = inject(UserSettingService);

  readonly defaultTitle = Capacitor.isNativePlatform() ? 'Varsom' : '';

  tripRunning = toSignal(this.tripLoggerService.isTripRunning$, { initialValue: false });
  private appMode = toSignal(this.userSettingService.appMode$, { initialValue: AppMode.Prod });
  private isFullscreen = toSignal(this.fullscreenService.isFullscreen$, { initialValue: false });
  showHeader = computed(() => !this.isFullscreen());

  get tripRunning$() {
    return this.tripLoggerService.getLegacyTripAsObservable();
  }

  headerColor = computed(() => (this.tripRunning() ? 'trip-running' : this.appMode().toLowerCase()));

  constructor() {
    addIcons({ optionsOutline });
  }

  endTrip() {
    this.tripLoggerService.stopLegacyTrip();
  }
}
