import { Component, ViewChild, OnDestroy, OnInit, NgZone, ElementRef } from '@angular/core';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { NavController, Platform } from '@ionic/angular';
import { LangKey, GeoHazard } from 'src/app/modules/common-core/models';
import { animations } from './start-wizard.animations';
import { Subject, interval, Subscription } from 'rxjs';
import { takeUntil, skipWhile, switchMap, take } from 'rxjs/operators';
import { settings } from '../../../settings';
import { UserSetting } from 'src/app/core/models/user-settings.model';
import { SwiperContainer } from 'swiper/element';

@Component({
  selector: 'app-start-wizard',
  templateUrl: './start-wizard.page.html',
  styleUrls: ['./start-wizard.page.scss'],
  animations: animations,
})
export class StartWizardPage implements OnInit, OnDestroy {
  @ViewChild('slides') slides: ElementRef<SwiperContainer>;
  GeoHazard = GeoHazard;
  LangKey = LangKey;
  state: string;
  reachedEnd = false;
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

  async start() {
    if (this.reachedEnd) {
      const userSettings = await this.userSettingService.userSetting$.pipe(take(1)).toPromise();
      this.userSettingService.saveUserSettings({
        ...userSettings,
        completedStartWizard: true,
      });
      this.navController.navigateRoot('/');
    } else {
      this.slides.nativeElement.swiper.slideTo(5, 200);
    }
  }

  ionSlideTransitionStart(event) {
    const [swiper] = event.detail;
    const index = swiper.activeIndex;
    this.setPageIndex(index);
  }

  ionSlideReachEnd() {
    this.reachedEnd = true;
    setTimeout(() => {
      this.showLegalIcon = true;
      // Crazy ios bug to get animation on spinner.. :o
    }, 0);
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
