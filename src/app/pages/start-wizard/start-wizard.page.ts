import { Component, inject, CUSTOM_ELEMENTS_SCHEMA, ElementRef, viewChild } from '@angular/core';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import {
  IonButton,
  IonFooter,
  IonSelect,
  IonToolbar,
  Platform,
  IonLabel,
  IonSelectOption,
  NavController,
} from '@ionic/angular/standalone';
import { LangKey, GeoHazard } from '../../modules/common-core/models';
import { settings } from '../../../settings';
import { TranslatePipe } from '@ngx-translate/core';
import { Capacitor } from '@capacitor/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SwiperContainer } from 'swiper/element';

@Component({
  selector: 'app-start-wizard',
  templateUrl: './start-wizard.page.html',
  styleUrls: ['./start-wizard.page.scss'],
  imports: [IonButton, IonFooter, IonToolbar, TranslatePipe, IonLabel, IonSelect, IonSelectOption],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StartWizardPage {
  readonly swiper = viewChild<ElementRef<SwiperContainer>>('swiper');

  private userSettingService = inject(UserSettingService);
  private navController = inject(NavController);
  private platform = inject(Platform);

  GeoHazard = GeoHazard;
  LangKey = LangKey;
  currentSlideIndex = 0;
  language = toSignal(this.userSettingService.language$, { initialValue: LangKey.nb });
  legalUrl = this.userSettingService.legalUrl;
  userSettings = toSignal(this.userSettingService.userSetting$);
  supportedLanguages: {
    lang: string;
    name: string;
    langKey: LangKey;
  }[] = settings.language.supportedLanguages.map((language) => ({
    ...language,
    langKey: LangKey[language.lang],
  }));
  isIosOrAndroid = Capacitor.isNativePlatform();
  isDesktop = this.platform.is('desktop');

  saveLanguage(event: CustomEvent) {
    const selectedLang = event.detail.value;
    this.userSettingService.updateUserSettings({ language: selectedLang });
  }

  onSlideChange(event: any) {
    this.currentSlideIndex = event.detail[0].activeIndex;
  }

  finishOnboarding() {
    const userSettings = this.userSettings();
    if (this.currentSlideIndex === 5 && userSettings) {
      this.userSettingService.saveUserSettings({
        ...userSettings,
        completedStartWizard: true,
      });
      this.navController.navigateRoot('/');
    } else {
      this.swiper()?.nativeElement.swiper.slideTo(5);
    }
  }
}
