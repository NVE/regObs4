import { ChangeDetectionStrategy, Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, input } from '@angular/core';
import { IonIcon, ModalController, ToastController } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';
import { AppEventCategory } from 'src/app/modules/analytics/enums/app-event-category.enum';
import { AppEventAction } from 'src/app/modules/analytics/enums/app-event-action.enum';
import { toSignal } from '@angular/core/rxjs-interop';
import { RegistrationViewModel } from 'src/app/modules/common-regobs-api';
import { Clipboard } from '@capacitor/clipboard';
import { TranslateService } from '@ngx-translate/core';
import { UserSettingService } from 'src/app/core/services/user-setting/user-setting.service';
import { AnalyticService } from 'src/app/modules/analytics/services/analytic.service';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { settings } from 'src/settings';
import { firstValueFrom } from 'rxjs';
import { RouterLink } from '@angular/router';
import { RegistrationEditButtonComponent } from '../registration-edit-button/registration-edit-button.component';
import { eyeOutline, shareSocial } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-observation-actions',
  imports: [IonIcon, TranslatePipe, RouterLink, RegistrationEditButtonComponent],
  templateUrl: './observation-actions.component.html',
  styleUrl: './observation-actions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
/**
 * Felles knapperad for observasjonskort og detaljside for observasjon
 */
export class ObservationActionsComponent {
  private userSettingService = inject(UserSettingService);
  private analyticService = inject(AnalyticService);
  private logger = inject(LoggingService);
  private toastController = inject(ToastController);
  private translateService = inject(TranslateService);
  modalController = inject(ModalController);

  readonly registration = input.required<RegistrationViewModel>();
  readonly showGoToDetails = input<boolean>();

  private userSettings = toSignal(this.userSettingService.userSetting$, { requireSync: true });
  private baseUrl = settings.services.regObs.webUrl[this.userSettings().appMode];
  private registrationUrl = computed(() => `${this.baseUrl}/Registration/${this.registration().RegId}`);

  constructor() {
    addIcons({
      eyeOutline,
      shareSocial,
    });
  }

  private async canShareNative(): Promise<boolean> {
    if (!Capacitor.isNativePlatform()) {
      return false;
    }
    const canShareResult = await Share.canShare();
    return canShareResult.value;
  }

  async share(): Promise<void> {
    const url = this.registrationUrl();
    this.analyticService.trackEvent(
      AppEventCategory.Observations,
      AppEventAction.Share,
      url,
      this.registration().RegId
    );
    if (await this.canShareNative()) {
      Share.share({
        url,
      });
    } else {
      Clipboard.write({ string: url });
      const toastText = await firstValueFrom(this.translateService.get('REGISTRATION.COPIED_TO_CLIPBOARD'));
      const toast = await this.toastController.create({
        message: toastText,
        mode: 'md',
        duration: 2000,
      });
      toast.present();
    }
  }
}
