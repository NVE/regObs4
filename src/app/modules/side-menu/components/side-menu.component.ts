import { Component, OnInit, OnDestroy, NgZone, inject, computed } from '@angular/core';
import { UserSettingService } from '../../../core/services/user-setting/user-setting.service';
import { UserSetting } from '../../../core/models/user-settings.model';
import { settings } from '../../../../settings';
import { combineLatest, distinctUntilChanged, firstValueFrom, map, Observable, Subscription } from 'rxjs';
import {
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuToggle,
  IonSelect,
  IonSelectOption,
  IonToggle,
  NavController,
  IonRouterLink,
} from '@ionic/angular/standalone';
import { TopoMap } from '../../../core/models/topo-map.enum';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import version from '../../../../environments/version.json';
import { LangKey } from 'src/app/modules/common-core/models';
import { ExternalLinkService } from 'src/app/core/services/external-link/external-link.service';
import { ObserverTripsService } from 'src/app/core/services/observer-trips/observer-trips.service';
import { SelectInterface } from '@ionic/core';
import { FileLoggingService } from 'src/app/modules/shared/services/logging/file-logging.service';
import { Capacitor } from '@capacitor/core';
import { NgIf, NgFor, AsyncPipe, UpperCasePipe } from '@angular/common';
import { UserLoginComponent } from './user-login/user-login.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SupportTilesMenuComponent } from './support-tiles-menu/support-tiles-menu.component';
import { ExternalLinkComponent } from '../../shared/components/external-link/external-link.component';
import { addIcons } from 'ionicons';
import {
  settingsOutline,
  globeOutline,
  downloadOutline,
  informationCircleOutline,
  trailSignOutline,
  bugOutline,
  mailOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  imports: [
    AsyncPipe,
    ExternalLinkComponent,
    FormsModule,
    IonIcon,
    IonItem,
    IonItemDivider,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenuToggle,
    IonSelect,
    IonSelectOption,
    IonToggle,
    NgFor,
    NgIf,
    RouterLink,
    SupportTilesMenuComponent,
    TranslatePipe,
    UpperCasePipe,
    UserLoginComponent,
    IonRouterLink,
  ],
})
export class SideMenuComponent implements OnInit, OnDestroy {
  private userSettingService = inject(UserSettingService);
  private translateService = inject(TranslateService);
  private navController = inject(NavController);
  private ngZone = inject(NgZone);
  private externalLinkService = inject(ExternalLinkService);
  private fileLoggingService = inject(FileLoggingService);

  userSettings?: UserSetting;
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
  selectLanguageLabel$?: Observable<string>;
  isNativePlatform = computed(() => Capacitor.isNativePlatform());
  popupType: SelectInterface = this.isNativePlatform() ? 'action-sheet' : 'popover';
  observerTrips: ObserverTripsService;

  private userSettingSubscription?: Subscription;

  constructor() {
    const observerTrips = inject(ObserverTripsService);

    this.observerTrips = observerTrips;
    addIcons({
      settingsOutline,
      globeOutline,
      downloadOutline,
      informationCircleOutline,
      trailSignOutline,
      bugOutline,
      mailOutline,
    });
  }

  legalTermsUrl = computed(() => this.userSettingService.legalUrl);

  async ngOnInit() {
    this.userSettingSubscription = this.userSettingService.userSetting$.subscribe((val) => {
      this.ngZone.run(() => {
        this.userSettings = val;
      });
    });
    this.offlineMapsAvailable = this.isNativePlatform();
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
    if (this.userSettings) {
      this.userSettingService.saveUserSettings(this.userSettings);
    }
  }

  ngOnDestroy(): void {
    if (this.userSettingSubscription) {
      this.userSettingSubscription.unsubscribe();
    }
  }

  openStartWizard() {
    if (this.userSettings) {
      this.userSettings.showGeoSelectInfo = true;
      this.saveUserSettings();
    }
  }

  async contact(subjectMessage: string, descriptionMessage: string, additionalSubjectText?: string) {
    if (this.isNativePlatform()) {
      const translations = await firstValueFrom(this.translateService.get([subjectMessage, descriptionMessage]));
      const subject = translations[subjectMessage] + (additionalSubjectText || '');
      const body = translations[descriptionMessage];
      this.fileLoggingService.sendLogsByEmail(subject, body);
    }
  }

  async contactUs() {
    this.contact('MENU.CONTACT_SUBJECT', 'MENU.CONTACT_DESCRIPTION');
  }

  contactError() {
    let additionalSubjectText;
    if (this.isNativePlatform()) {
      additionalSubjectText = ` : ${Capacitor.getPlatform()} ${version.version} ${version.buildNumber} ${
        version.revision
      }`;
    }
    this.contact('MENU.CONTACT_REGOBS_ERROR', 'MENU.ERROR_REPORT_DESCRIPTION', additionalSubjectText);
  }
}
