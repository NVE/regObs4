import { Component, ViewChild, OnDestroy, OnInit, NgZone } from '@angular/core';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { IonSlides, NavController, Platform } from '@ionic/angular';
import { LangKey, GeoHazard } from 'src/app/modules/common-core/models';
import { animations } from './start-wizard.animations';
import { Subject, timer, interval, Subscription } from 'rxjs';
import { takeUntil, skipWhile, switchMap, take } from 'rxjs/operators';
import { settings } from '../../../settings';
import { UserSetting } from 'src/app/core/models/user-settings.model';
import { isAndroidOrIos } from 'src/app/core/helpers/ionic/platform-helper';

@Component({
  selector: 'app-start-wizard',
  templateUrl: './start-wizard.page.html',
  styleUrls: ['./start-wizard.page.scss'],
  animations: animations,
})
export class StartWizardPage implements OnInit, OnDestroy {
  @ViewChild(IonSlides) slides: IonSlides;
  GeoHazard = GeoHazard;
  LangKey = LangKey;
  state: string;
  reachedEnd = false;
  reachedStart = true;
  showLegalIcon = false;
  visibleStarNumber = -1;
  language: LangKey;
  legalUrl: string;
  userSettings: UserSetting;
  supportedLanguages: {
    lang: string;
    name: string;
    langKey: LangKey;
  }[] = settings.language.supportedLanguages.map((lang) => ({
    ...lang,
    langKey: LangKey[lang.lang],
  }));
  isIosOrAndroid: boolean;
  isDesktop: boolean;

  private ngDestroy$ = new Subject<void>();
  private activeIndex = new Subject<number>();
  private isIncreasing = true;
  private userSettingSubscription: Subscription;

  constructor(
    private userSettingService: UserSettingService,
    private navController: NavController,
    private ngZone: NgZone,
    private platform: Platform
  ) {}

  async ngOnInit() {
    this.isIosOrAndroid = isAndroidOrIos(this.platform);
    this.isDesktop = this.platform.is('desktop');

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
      this.initStarIndexCounter();
      this.setPageIndex(0);
    });
  }

  async saveLanguage() {
    const userSettings = await this.userSettingService.userSetting$.pipe(take(1)).toPromise();
    this.userSettingService.saveUserSettings({
      ...userSettings,
      language: this.language,
    });
  }

  private setPageIndex(index: number) {
    setTimeout(() => {
      this.resetVisibleStars();
      this.state = `page_${index}`;
      this.activeIndex.next(index);
    }, 0);
  }

  private resetVisibleStars() {
    this.visibleStarNumber = -1;
    this.isIncreasing = true;
  }

  ngOnDestroy(): void {
    if (this.userSettingSubscription) {
      this.userSettingSubscription.unsubscribe();
    }
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }

  slideNext() {
    this.reachedStart = false;
    if (!isAndroidOrIos(this.platform)) {
      this.slides.slideNext();
    } else {
      timer(700)
        .pipe(takeUntil(this.ngDestroy$))
        .subscribe(() => {
          if (this.slides) {
            this.slides.slideNext();
          }
        });
    }
  }

  slidePrev() {
    this.slides.slidePrev();
  }

  async start() {
    if (this.reachedEnd) {
      const userSettings = await this.userSettingService.userSetting$.pipe(take(1)).toPromise();
      this.userSettingService.saveUserSettings({
        ...userSettings,
        completedStartWizard: true,
      });
      this.navController.navigateRoot('/');
    } else {
      this.slides.slideTo(5, 200);
    }
  }

  async ionSlideTransitionStart() {
    const index = await this.slides.getActiveIndex();
    this.setPageIndex(index);
  }

  ionSlideReachEnd() {
    this.reachedEnd = true;
    setTimeout(() => {
      this.showLegalIcon = true;
      // Crazy ios bug to get animation on spinner.. :o
    }, 0);
  }

  ionSlideReachStart() {
    this.reachedStart = true;
  }

  ionSlidePrevStart() {
    this.reachedEnd = false;
  }

  private initStarIndexCounter() {
    this.activeIndex
      .pipe(
        switchMap((index) => interval(700).pipe(skipWhile(() => index !== 4))),
        takeUntil(this.ngDestroy$)
      )
      .subscribe(() => {
        if (this.isIncreasing && this.visibleStarNumber >= 6) {
          // Count to 6 to add an extra pause on the end
          this.isIncreasing = false;
        }
        if (!this.isIncreasing && this.visibleStarNumber < 0) {
          // Count to -1 to add an extra pause on the start
          this.isIncreasing = true;
        }
        if (this.isIncreasing) {
          this.visibleStarNumber++;
        } else {
          this.visibleStarNumber--;
        }
      });
  }
}
