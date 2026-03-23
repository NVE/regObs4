import {
  ChangeDetectorRef,
  Component,
  OnInit,
  OnDestroy,
  inject,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { UserSetting } from '../../core/models/user-settings.model';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
  LoadingController,
  NavController,
} from '@ionic/angular/standalone';
import { KdvService } from '../../modules/common-registration/registration.services';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import * as version from '../../../environments/version.json';
import { AppVersion } from '../../core/models/app-version.model';
import { Subscription, firstValueFrom } from 'rxjs';
import { LoggingService } from '../../modules/shared/services/logging/logging.service';
import { LogLevel } from '../../modules/shared/services/logging/log-level.model';
import { AppResetService } from '../../modules/shared/services/app-reset/app-reset.service';
import { FileLoggingService } from '../../modules/shared/services/logging/file-logging.service';
import {
  ConfirmationModalService,
  PopupResponse,
} from '../../core/services/confirmation-modal/confirmation-modal.service';
import { HeaderColorDirective } from '../../modules/shared/directives/header-color/header-color.directive';
import { SelectComponent } from '../../modules/shared/components/input/select/select.component';
import { FormsModule } from '@angular/forms';
import { FormatDatePipe } from '../../modules/shared/pipes/format-date/format-date.pipe';
import { addIcons } from 'ionicons';
import { refresh, mailOutline, medkit } from 'ionicons/icons';
import { Capacitor } from '@capacitor/core';

const DEBUG_TAG = 'UserSettingsPage';
const TAPS_TO_ENABLE_TEST_MODE = 7;

@Component({
  selector: 'app-user-settings',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-settings.page.html',
  styleUrls: ['./user-settings.page.scss'],
  imports: [
    FormatDatePipe,
    FormsModule,
    HeaderColorDirective,
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonText,
    IonTitle,
    IonToggle,
    IonToolbar,
    SelectComponent,
    TranslatePipe,
  ],
})
export class UserSettingsPage implements OnInit, OnDestroy {
  private userSettingService = inject(UserSettingService);
  private kdvService = inject(KdvService);
  private loggingService = inject(LoggingService);
  private translateService = inject(TranslateService);
  private loadingController = inject(LoadingController);
  private appResetService = inject(AppResetService);
  private navController = inject(NavController);
  private fileLoggingService = inject(FileLoggingService);
  private confirmationModalService = inject(ConfirmationModalService);
  private cdr = inject(ChangeDetectorRef);

  isNativePlatform = Capacitor.isNativePlatform();
  userSettings!: UserSetting;
  isUpdating = signal(false);
  private subscriptions: Subscription[] = [];
  private versionClicks = 0;
  version: AppVersion = version;

  appModeOptions = [
    { id: 'PROD', text: 'Regobs' },
    { id: 'DEMO', text: 'Demo Regobs' },
    {
      id: 'TEST',
      text: 'Test Regobs',
    },
  ];

  constructor() {
    addIcons({ refresh, mailOutline, medkit });
  }

  async ngOnInit() {
    this.versionClicks = 0;
    this.subscriptions.push(
      this.userSettingService.userSetting$.subscribe((val) => {
        this.userSettings = val;
        this.cdr.markForCheck();
      })
    );
  }

  ngOnDestroy(): void {
    this.stopSubscriptions();
  }

  private stopSubscriptions() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
    this.subscriptions = [];
  }

  versionClick() {
    this.versionClicks++;
    if (this.versionClicks >= TAPS_TO_ENABLE_TEST_MODE && !this.userSettings.featureToggleDeveloperMode) {
      this.userSettings.featureToggleDeveloperMode = true;
      this.updateSettings();
    }
  }

  updateSettings() {
    this.userSettingService.saveUserSettings(this.userSettings);
  }

  async updateDropdowns() {
    this.isUpdating.set(true);
    this.kdvService.update();
    await this.showKdvElementsUpdated(true);
    this.isUpdating.set(false);
  }

  async sendLogs() {
    this.fileLoggingService.sendLogsByEmail();
  }

  async showKdvElementsUpdated(ok: boolean) {
    return await this.confirmationModalService.askForConfirmation({
      message: ok ? 'SETTINGS.DROPDOWNS_UPDATED' : 'SETTINGS.DROPDOWNS_FAILED',
      buttons: [
        {
          text: 'ALERT.OK',
          role: PopupResponse.CONFIRM,
        },
      ],
    });
  }

  async confirmReset() {
    return await this.confirmationModalService.askForConfirmation({
      message: 'SETTINGS.CONFIRM_RESET',
      buttons: [
        {
          text: 'ALERT.OK',
          handler: () => this.reset(),
          role: PopupResponse.CONFIRM,
        },
        {
          text: 'ALERT.CANCEL',
          role: PopupResponse.CANCEL,
        },
      ],
    });
  }

  async reset() {
    const message = await firstValueFrom(this.translateService.get('SETTINGS.RESETTING'));
    const loading = await this.loadingController.create({
      message,
    });
    loading.present();
    this.isUpdating.set(true);
    // TODO: Implement some kind of subscription manager to stop all subscriptions and resubscribe when complete
    try {
      await this.doReset();
    } catch (err) {
      let e;
      if (err instanceof Error) {
        e = err;
      } else if (typeof err == 'string') {
        e = new Error(err);
      }
      this.loggingService.log('Could not reset db', e, LogLevel.Warning, DEBUG_TAG);
    }
    this.isUpdating.set(false);
    loading.dismiss();
    this.navController.navigateRoot('start-wizard');
  }

  private async doReset() {
    this.stopSubscriptions();
    return await this.appResetService.resetApp();
  }
}
