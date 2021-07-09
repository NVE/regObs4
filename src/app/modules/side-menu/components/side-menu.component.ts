import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ObservationService } from '../../../core/services/observation/observation.service';
import { UserSettingService } from '../../../core/services/user-setting/user-setting.service';
import { UserSetting } from '../../../core/models/user-settings.model';
import { settings } from '../../../../settings';
import { Subscription } from 'rxjs';
import { ModalController, Platform, NavController } from '@ionic/angular';
import { LegalTermsModalPage } from '../../../pages/modal-pages/legal-terms-modal/legal-terms-modal.page';
import { TopoMap } from '../../../core/models/topo-map.enum';
import {
  EmailComposer,
  EmailComposerOptions
} from '@ionic-native/email-composer/ngx';
import { TranslateService } from '@ngx-translate/core';
import { AppVersionService } from '../../../core/services/app-version/app-version.service';
import { LangKey } from '../../../core/models/langKey';
import { SelectInterface } from '@ionic/core';
import { isAndroidOrIos } from '../../../core/helpers/ionic/platform-helper';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit, OnDestroy {
  userSettings: UserSetting;
  lastUpdated: Date;
  settings = settings;
  TopoMap = TopoMap;
  LangKey = LangKey;
  popupType: SelectInterface;
  isIosOrAndroid: boolean;
  isMobileWeb: boolean;

  private lastUpdateSubscription: Subscription;
  private userSettingSubscription: Subscription;

  constructor(
    private observationService: ObservationService,
    private userSettingService: UserSettingService,
    private modalController: ModalController,
    private emailComposer: EmailComposer,
    private translateService: TranslateService,
    private appVersionService: AppVersionService,
    private platform: Platform,
    private navController: NavController,
    private ngZone: NgZone
  ) {}

  async ngOnInit() {
    this.popupType = isAndroidOrIos(this.platform) ? 'action-sheet' : 'popover';
    this.isIosOrAndroid = isAndroidOrIos(this.platform);
    this.isMobileWeb = this.platform.is('mobileweb');
    this.lastUpdateSubscription = this.observationService
      .getLastUpdatedForCurrentGeoHazardAsObservable()
      .subscribe((val) => {
        this.ngZone.run(() => {
          this.lastUpdated = val;
        });
      });
    this.userSettingSubscription = this.userSettingService.userSetting$.subscribe(
      (val) => {
        this.ngZone.run(() => {
          this.userSettings = val;
        });
      }
    );
  }

  saveUserSettings() {
    this.userSettingService.saveUserSettings(this.userSettings);
  }

  ngOnDestroy(): void {
    if (this.lastUpdateSubscription) {
      this.lastUpdateSubscription.unsubscribe();
    }
    if (this.userSettingSubscription) {
      this.userSettingSubscription.unsubscribe();
    }
  }

  updateObservations() {
    this.observationService.forceUpdateObservationsForCurrentGeoHazard();
  }

  async showLegalTerms() {
    const modal = await this.modalController.create({
      component: LegalTermsModalPage
    });
    modal.present();
  }

  openStartWizard() {
    this.userSettings.showGeoSelectInfo = true;
    this.saveUserSettings();
    this.navController.navigateRoot('start-wizard');
  }

  async contactUs() {
    if (isAndroidOrIos(this.platform)) {
      const translations = await this.translateService
        .get('MENU.CONTACT_SUBJECT')
        .toPromise();
      const email: EmailComposerOptions = {
        to: settings.errorEmailAddress,
        subject: translations,
        isHtml: true
      };
      this.emailComposer.open(email);
    } else {
      window.location.href = 'mailto:regobs@nve.no';
    }
  }

  async contactError() {
    if (isAndroidOrIos(this.platform)) {
      const translations = await this.translateService
        .get(['MENU.ERROR_REPORT_DESCRIPTION', 'MENU.CONTACT_REGOBS_ERROR'])
        .toPromise();
      const appVersion = await this.appVersionService.getAppVersion();
      const email: EmailComposerOptions = {
        to: settings.errorEmailAddress,
        subject:
          `${translations['MENU.CONTACT_REGOBS_ERROR']}: ${
            this.platform.is('ios') ? 'ios' : ''
          }` +
          `${this.platform.is('android') ? 'android' : ''}` +
          ` ${appVersion.version} ${appVersion.buildNumber} ${appVersion.revision}`,
        body: translations['MENU.ERROR_REPORT_DESCRIPTION'],
        isHtml: true
      };
      this.emailComposer.open(email);
    } else {
      window.open(
        'https://forms.office.com/Pages/ResponsePage.aspx?id=DYSNvMlgC0G0-xG4aAZ4DNWEVVcEorZHtmeqQxJTsoVUQ001UkpYUlU0SEwySEpQRkdZMVJDUU1VOCQlQCN0PWcu'
      );
    }
  }
}
