import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { UserSettingService } from '../../../core/services/user-setting/user-setting.service';
import { UserSetting } from '../../../core/models/user-settings.model';
import { settings } from '../../../../settings';
import { combineLatest, distinctUntilChanged, firstValueFrom, map, Observable, Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';
import { TopoMap } from '../../../core/models/topo-map.enum';
import { TranslateService } from '@ngx-translate/core';
import version from '../../../../environments/version.json';
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
  standalone: false,
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

  /**
   * If EN is selected, label is only 'Language'. If eg. NB is selected, emits 'Språk / Language'.
   */
  selectLanguageLabel$: Observable<string>;

  popupType: SelectInterface = Capacitor.isNativePlatform() ? 'action-sheet' : 'popover';
  observerTrips: ObserverTripsService;

  private userSettingSubscription: Subscription;

  constructor(
    private userSettingService: UserSettingService,
    private translateService: TranslateService,
    private navController: NavController,
    private ngZone: NgZone,
    private externalLinkService: ExternalLinkService,
    observerTrips: ObserverTripsService,
    private fileLoggingService: FileLoggingService
  ) {
    this.observerTrips = observerTrips;
  }

  async ngOnInit() {
    this.userSettingSubscription = this.userSettingService.userSetting$.subscribe((val) => {
      this.ngZone.run(() => {
        this.userSettings = val;
      });
    });
    this.offlineMapsAvailable = Capacitor.isNativePlatform();
    this.selectLanguageLabel$ = this.getSelectLanguageLabel$();
  }

  private getSelectLanguageLabel$() {
    const enLanguageSelected$ = this.userSettingService.userSetting$.pipe(
      map((settings) => settings.language === LangKey.en),
      distinctUntilChanged()
    );

    const languageText$ = this.translateService.stream('SETTINGS.LANGUAGE');

    return combineLatest([enLanguageSelected$, languageText$]).pipe(
      map(([enSelected, translatedLabel]) => (enSelected ? translatedLabel : `${translatedLabel} / Language`))
    );
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

  contactError() {
    let additionalSubjectText;
    if (Capacitor.isNativePlatform()) {
      additionalSubjectText = ` : ${Capacitor.getPlatform()} ${version.version} ${version.buildNumber} ${
        version.revision
      }`;
    }
    this.contact('MENU.CONTACT_REGOBS_ERROR', 'MENU.ERROR_REPORT_DESCRIPTION', additionalSubjectText);
  }

  changeLanguage() {
    //save language setting
    this.userSettingService.saveUserSettings(this.userSettings);
  }
}
