import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ObservationService } from '../../../core/services/observation/observation.service';
import { UserSettingService } from '../../../core/services/user-setting/user-setting.service';
import { UserSetting } from '../../../core/models/user-settings.model';
import { settings } from '../../../../settings';
import { Subscription } from 'rxjs';
import { Platform, NavController } from '@ionic/angular';
import { TopoMap } from '../../../core/models/topo-map.enum';
import {
  EmailComposer,
  EmailComposerOptions
} from '@ionic-native/email-composer/ngx';
import { TranslateService } from '@ngx-translate/core';
import { AppVersionService } from '../../../core/services/app-version/app-version.service';
import { LangKey } from 'src/app/modules/common-core/models';
import { isAndroidOrIos } from 'src/app/core/helpers/ionic/platform-helper';
import { DataMarshallService } from 'src/app/core/services/data-marshall/data-marshall.service';
import { ExternalLinkService } from 'src/app/core/services/external-link/external-link.service';
import { ObserverTripsService } from 'src/app/core/services/observer-trips/observer-trips.service';
import { SelectInterface } from '@ionic/core';
import { FileLoggingService } from 'src/app/modules/shared/services/logging/file-logging.service';


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
  offlineMapsAvailable = false;

  supportedLanguages: {
    lang: string;
    name: string;
    langKey: LangKey;
  }[] = settings.language.supportedLanguages.map((lang) => ({
    ...lang,
    langKey: LangKey[lang.lang]
  }));
  popupType: SelectInterface;
  isIosOrAndroid: boolean;
  isMobileWeb: boolean;

  private lastUpdateSubscription: Subscription;
  private userSettingSubscription: Subscription;

  constructor(
    private observationService: ObservationService,
    private userSettingService: UserSettingService,
    private emailComposer: EmailComposer,
    private translateService: TranslateService,
    private appVersionService: AppVersionService,
    private platform: Platform,
    private navController: NavController,
    private ngZone: NgZone,
    private dataMarshallService: DataMarshallService,
    private externalLinkService: ExternalLinkService,
    public observerTrips: ObserverTripsService,
    private fileLoggingService: FileLoggingService
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
    this.offlineMapsAvailable = isAndroidOrIos(this.platform);
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

  async showLegalTerms(): Promise<void> {
    const url = this.userSettingService.legalUrl;
    this.externalLinkService.openExternalLink(url);
  }

  openStartWizard() {
    this.userSettings.showGeoSelectInfo = true;
    this.saveUserSettings();
    this.navController.navigateRoot('start-wizard');
  }

  async contactUs() {
    const translations = await this.translateService
      .get('MENU.CONTACT_SUBJECT')
      .toPromise();
    this.fileLoggingService.sendLogsByEmail(translations);
  }

  async contactError() {
    if (isAndroidOrIos(this.platform)) {
      const translations = await this.translateService
        .get(['MENU.ERROR_REPORT_DESCRIPTION', 'MENU.CONTACT_REGOBS_ERROR'])
        .toPromise();
      const appVersion = await this.appVersionService.getAppVersion();
      const subject = `${translations['MENU.CONTACT_REGOBS_ERROR']}: ${this.platform.is('ios') ? 'ios' : ''}` +
          `${this.platform.is('android') ? 'android' : ''}` +
          ` ${appVersion.version} ${appVersion.buildNumber} ${appVersion.revision}`;
      this.fileLoggingService.sendLogsByEmail(subject, translations['MENU.ERROR_REPORT_DESCRIPTION']);
    } else {
      window.open(
        'https://forms.office.com/Pages/ResponsePage.aspx?id=DYSNvMlgC0G0-xG4aAZ4DNWEVVcEorZHtmeqQxJTsoVUQ001UkpYUlU0SEwySEpQRkdZMVJDUU1VOCQlQCN0PWcu'
      );
    }
  }

  changeLanguage() {
    //save language setting
    this.userSettingService.saveUserSettings(this.userSettings);

    //load observations from API in new language
    this.observationService.forceUpdateObservationsForCurrentGeoHazard(
      this.dataMarshallService.cancelObservationsPromise
    );
  }
}
