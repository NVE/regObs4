import {
  Component,
  OnDestroy,
  OnInit,
  NgZone,
  inject,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewChild,
  ElementRef,
} from '@angular/core';
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
import { Subject, Subscription, firstValueFrom } from 'rxjs';
import { SvgIconComponent } from 'angular-svg-icon';
import { take } from 'rxjs/operators';
import { settings } from '../../../settings';
import { UserSetting } from '../../core/models/user-settings.model';
import { TranslatePipe } from '@ngx-translate/core';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-start-wizard',
  templateUrl: './start-wizard.page.html',
  styleUrls: ['./start-wizard.page.scss'],
  imports: [IonButton, IonFooter, IonToolbar, TranslatePipe, SvgIconComponent, IonLabel, IonSelect, IonSelectOption],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StartWizardPage implements OnInit, OnDestroy {
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;

  private userSettingService = inject(UserSettingService);
  private navController = inject(NavController);
  private ngZone = inject(NgZone);
  private platform = inject(Platform);

  GeoHazard = GeoHazard;
  LangKey = LangKey;
  currentSlideIndex = 0;
  state?: string; //TODO: aner ikke hva dette brukes til
  language?: LangKey;
  legalUrl?: string;
  userSettings?: UserSetting;
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

  private ngDestroy$ = new Subject<void>();
  private userSettingSubscription?: Subscription;

  async ngOnInit() {
    this.userSettingSubscription = this.userSettingService.userSetting$.subscribe((val) => {
      this.ngZone.run(() => {
        this.userSettings = val;
        this.legalUrl = this.userSettingService.legalUrl;
      });
    });
  }

  ionViewWillEnter() {
    this.state = 'x';
    this.userSettingService.userSetting$.pipe(take(1)).subscribe((us) => {
      this.language = us.language;
    });
  }

  async saveLanguage() {
    if (this.language) {
      this.userSettingService.updateUserSettings({ language: this.language });
    }
  }

  onSlideChange(event: any) {
    this.currentSlideIndex = event.detail[0].activeIndex;
  }

  async finishOnboarding() {
    if (this.currentSlideIndex === 5) {
      const userSettings = await firstValueFrom(this.userSettingService.userSetting$);
      this.userSettingService.saveUserSettings({
        ...userSettings,
        completedStartWizard: true,
      });
      this.navController.navigateRoot('/');
    } else {
      this.swiperRef?.nativeElement.swiper.slideTo(5);
    }
  }

  ngOnDestroy(): void {
    if (this.userSettingSubscription) {
      this.userSettingSubscription.unsubscribe();
    }
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }
}
