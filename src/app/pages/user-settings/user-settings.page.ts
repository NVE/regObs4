import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { UserSetting } from '../../core/models/user-settings.model';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { LangKey } from 'src/app/modules/common-core/models';
import { KdvService } from 'src/app/modules/common-registration/registration.services';
import { TranslateService } from '@ngx-translate/core';
import { AppVersionService } from '../../core/services/app-version/app-version.service';
import { AppVersion } from '../../core/models/app-version.model';
import { Subscription } from 'rxjs';
import { LoggingService } from '../../modules/shared/services/logging/logging.service';
import { LogLevel } from '../../modules/shared/services/logging/log-level.model';
import { AppResetService } from '../../modules/shared/services/app-reset/app-reset.service';
import { SelectOption } from '../../modules/shared/components/input/select/select-option.model';
import { settings } from '../../../settings';
import { FileLoggingService } from 'src/app/modules/shared/services/logging/file-logging.service';

const DEBUG_TAG = 'UserSettingsPage';
const TAPS_TO_ENABLE_TEST_MODE = 7;

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.page.html',
  styleUrls: ['./user-settings.page.scss']
})
export class UserSettingsPage implements OnInit, OnDestroy {
  userSettings: UserSetting;
  LangKey = LangKey;
  showAdvanced = false;
  isUpdating = false;
  version: AppVersion;
  private subscriptions: Subscription[] = [];
  private versionClicks = 0;
  supportedLanguages: {
    lang: string;
    name: string;
    langKey: LangKey;
  }[] = settings.language.supportedLanguages.map((lang) => ({
    ...lang,
    langKey: LangKey[lang.lang]
  }));

  get appModeOptions() {
    const options: SelectOption[] = [
      { id: 'PROD', text: 'Regobs' },
      { id: 'DEMO', text: 'Demo Regobs' },
      {
        id: 'TEST',
        text: 'Test Regobs',
        disabled: !this.userSettings.featureToggleDeveloperMode
      }
    ];
    return options;
  }

  constructor(
    private userSettingService: UserSettingService,
    private kdvService: KdvService,
    private ngZone: NgZone,
    private loggingService: LoggingService,
    private translateService: TranslateService,
    private alertController: AlertController,
    private appVersionService: AppVersionService,
    private loadingController: LoadingController,
    private appResetService: AppResetService,
    private navController: NavController,
    private fileLoggingService: FileLoggingService
  ) {}

  async ngOnInit() {
    this.versionClicks = 0;
    this.subscriptions.push(
      this.userSettingService.userSetting$.subscribe((val) => {
        this.ngZone.run(() => {
          this.userSettings = val;
        });
      })
    );
    const appver = await this.appVersionService.getAppVersion();
    this.ngZone.run(() => {
      this.version = appver;
    });
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

  async toggleAdvanced() {
    this.showAdvanced = !this.showAdvanced;
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
    const translations = await this.translateService
      .get(['SETTINGS.DROPDOWNS_UPDATED', 'SETTINGS.DROPDOWNS_FAILED', 'ALERT.OK'])
      .toPromise();
    const alert = await this.alertController.create({
      message: ok ? translations['SETTINGS.DROPDOWNS_UPDATED'] : translations['SETTINGS.DROPDOWNS_FAILED'],
      buttons: [translations['ALERT.OK']]
    });
    alert.present();
    return alert.onDidDismiss();
  }

  async confirmReset() {
    const translations = await this.translateService.get(['SETTINGS.CONFIRM_RESET', 'ALERT.OK', 'ALERT.CANCEL']).toPromise();
    const alert = await this.alertController.create({
      message: translations['SETTINGS.CONFIRM_RESET'],
      buttons: [
        {
          text: translations['ALERT.OK'],
          handler: () => this.reset()
        },
        {
          text: translations['ALERT.CANCEL'],
          role: 'cancel'
        }
      ]
    });
    alert.present();
  }

  async reset() {
    const message = await this.translateService.get('SETTINGS.RESETTING').toPromise();
    const loading = await this.loadingController.create({
      message
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
    return this.appResetService.resetApp();
  }
}
