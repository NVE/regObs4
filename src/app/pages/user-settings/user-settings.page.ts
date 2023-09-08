import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { UserSetting } from '../../core/models/user-settings.model';
import { NavController, LoadingController, Platform } from '@ionic/angular';
import { KdvService } from 'src/app/modules/common-registration/registration.services';
import { TranslateService } from '@ngx-translate/core';
import * as version from '../../../environments/version.json';
import { AppVersion } from '../../core/models/app-version.model';
import { Observable, Subscription, firstValueFrom } from 'rxjs';
import { LoggingService } from '../../modules/shared/services/logging/logging.service';
import { LogLevel } from '../../modules/shared/services/logging/log-level.model';
import { AppResetService } from '../../modules/shared/services/app-reset/app-reset.service';
import { SelectOption } from '../../modules/shared/components/input/select/select-option.model';
import { FileLoggingService } from 'src/app/modules/shared/services/logging/file-logging.service';
import { BreakpointService } from 'src/app/core/services/breakpoint.service';
import {
  ConfirmationModalService,
  PopupResponse,
} from '../../core/services/confirmation-modal/confirmation-modal.service';

const DEBUG_TAG = 'UserSettingsPage';
const TAPS_TO_ENABLE_TEST_MODE = 7;

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.page.html',
  styleUrls: ['./user-settings.page.scss'],
})
export class UserSettingsPage implements OnInit, OnDestroy {
  userSettings: UserSetting;
  isUpdating = false;
  version$: Observable<AppVersion>;
  private subscriptions: Subscription[] = [];
  private versionClicks = 0;
  isDesktopView: boolean;
  isDesktopPlatform: boolean;
  version: AppVersion = version;

  get appModeOptions() {
    const options: SelectOption[] = [
      { id: 'PROD', text: 'Regobs' },
      { id: 'DEMO', text: 'Demo Regobs' },
      {
        id: 'TEST',
        text: 'Test Regobs',
        disabled: !this.userSettings.featureToggleDeveloperMode,
      },
    ];
    return options;
  }

  constructor(
    private userSettingService: UserSettingService,
    private kdvService: KdvService,
    private ngZone: NgZone,
    private loggingService: LoggingService,
    private translateService: TranslateService,
    private loadingController: LoadingController,
    private appResetService: AppResetService,
    private navController: NavController,
    private fileLoggingService: FileLoggingService,
    private breakpointService: BreakpointService,
    private platform: Platform,
    private confirmationModalService: ConfirmationModalService
  ) {}

  async ngOnInit() {
    if (this.platform.is('desktop')) {
      this.isDesktopPlatform = true;
    }
    this.breakpointService.isDesktopView().subscribe((isDesktop) => {
      this.isDesktopView = isDesktop;
    });
    this.versionClicks = 0;
    this.subscriptions.push(
      this.userSettingService.userSetting$.subscribe((val) => {
        this.ngZone.run(() => {
          this.userSettings = val;
        });
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
    this.isUpdating = true;
    this.kdvService.update();
    await this.showKdvElementsUpdated(true);
    this.ngZone.run(() => {
      this.isUpdating = false;
    });
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
    this.isUpdating = true;
    // TODO: Implement some kind of subscription manager to stop all subscriptions and resubscribe when complete
    try {
      await this.doReset();
    } catch (err) {
      this.loggingService.log('Could not reset db', err, LogLevel.Warning, DEBUG_TAG);
    }
    this.ngZone.run(() => {
      this.isUpdating = false;
      loading.dismiss();
      this.navController.navigateRoot('start-wizard');
    });
  }

  private async doReset() {
    this.stopSubscriptions();
    return await this.appResetService.resetApp();
  }
}
