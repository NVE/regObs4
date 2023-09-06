import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { UserSettingService } from '../../../core/services/user-setting/user-setting.service';
import { UserSetting } from '../../../core/models/user-settings.model';
import { settings } from '../../../../settings';
import { firstValueFrom, Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';
import { TopoMap } from '../../../core/models/topo-map.enum';
import { TranslateService } from '@ngx-translate/core';
import { AppVersionService } from '../../../core/services/app-version/app-version.service';
import { LangKey } from 'src/app/modules/common-core/models';
import { ExternalLinkService } from 'src/app/core/services/external-link/external-link.service';
import { ObserverTripsService } from 'src/app/core/services/observer-trips/observer-trips.service';
import { SelectInterface } from '@ionic/core';
import { FileLoggingService } from 'src/app/modules/shared/services/logging/file-logging.service';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit, OnDestroy {
  userSettings: UserSetting;
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
    langKey: LangKey[lang.lang],
  }));
  popupType: SelectInterface;
  isIosOrAndroid: boolean;
  isMobileWeb: boolean;
  observerTrips: ObserverTripsService;

  private userSettingSubscription: Subscription;

  constructor(
    private userSettingService: UserSettingService,
    private translateService: TranslateService,
    private appVersionService: AppVersionService,
    private navController: NavController,
    private ngZone: NgZone,
    private externalLinkService: ExternalLinkService,
    observerTrips: ObserverTripsService,
    private fileLoggingService: FileLoggingService
  ) {
    this.observerTrips = observerTrips;
  }

  async ngOnInit() {
    this.popupType = Capacitor.isNativePlatform() ? 'action-sheet' : 'popover';
    this.userSettingSubscription = this.userSettingService.userSetting$.subscribe((val) => {
      this.ngZone.run(() => {
        this.userSettings = val;
      });
    });
    this.offlineMapsAvailable = Capacitor.isNativePlatform();
  }

  saveUserSettings() {
    this.userSettingService.saveUserSettings(this.userSettings);
  }

  ngOnDestroy(): void {
    if (this.userSettingSubscription) {
      this.userSettingSubscription.unsubscribe();
    }
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

  async contact(subjectMessage: string, descriptionMessage: string, additionalSubjectText?: string) {
    if (Capacitor.isNativePlatform()) {
      const translations = await firstValueFrom(this.translateService.get([subjectMessage, descriptionMessage]));
      const subject = translations[subjectMessage] + (additionalSubjectText || '');
      const body = translations[descriptionMessage];
      this.fileLoggingService.sendLogsByEmail(subject, body);
    } else {
      window.open(
        'https://forms.office.com/Pages/ResponsePage.aspx?id=DYSNvMlgC0G0-xG4aAZ4DNWEVVcEorZHtmeqQxJTsoVUQ001UkpYUlU0SEwySEpQRkdZMVJDUU1VOCQlQCN0PWcu'
      );
    }
  }

  async contactUs() {
    this.contact('MENU.CONTACT_SUBJECT', 'MENU.CONTACT_DESCRIPTION');
  }

  async contactError() {
    let additionalSubjectText;
    if (Capacitor.isNativePlatform()) {
      const appVersion = await this.appVersionService.getAppVersion();
      additionalSubjectText = ` : ${Capacitor.getPlatform()} ${appVersion.version} ${appVersion.buildNumber} ${
        appVersion.revision
      }`;
    }
    this.contact('MENU.CONTACT_REGOBS_ERROR', 'MENU.ERROR_REPORT_DESCRIPTION', additionalSubjectText);
  }

  changeLanguage() {
    //save language setting
    this.userSettingService.saveUserSettings(this.userSettings);
  }
}
