import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { IonSlides, NavController } from '@ionic/angular';
import { GeoHazard } from '../../core/models/geo-hazard.enum';
import { LangKey } from '../../core/models/langKey';
import { animations } from './start-wizard.animations';
import { Subject, timer, interval } from 'rxjs';
import { takeUntil, skipWhile, switchMap } from 'rxjs/operators';
import { settings } from '../../../settings';

@Component({
  selector: 'app-start-wizard',
  templateUrl: './start-wizard.page.html',
  styleUrls: ['./start-wizard.page.scss'],
  animations: animations,
})

export class StartWizardPage implements OnInit, OnDestroy {
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;
  GeoHazard = GeoHazard;
  LangKey = LangKey;
  state: string;
  reachedEnd = false;
  showLegalIcon = false;
  visibleStarNumber = -1;
  recreate = true;
  language: LangKey;
  supportedLanguages: { lang: string, name: string, langKey: LangKey }[] =
    settings.language.supportedLanguages.map((lang) => ({ ...lang, langKey: LangKey[lang.lang] }));


  private ngDestroy$ = new Subject();
  private activeIndex = new Subject<number>();
  private isIncreasing = true;

  constructor(
    private userSettingService: UserSettingService,
    private navController: NavController,
  ) { }

  ionViewWillEnter() {
    this.recreate = true;
    this.state = 'x';
    setTimeout(() => { // Hack to get ion-slides working after app reset
      this.language = this.userSettingService.currentSettings.language;
      this.recreate = false;
      this.initStarIndexCounter();
      this.setPageIndex(0);
    });
  }

  ngOnInit() {
  }

  saveLanguage() {
    this.userSettingService.currentSettings = {
      ...this.userSettingService.currentSettings,
      language: this.language,
    };
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
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
    this.recreate = true;
  }

  slideNext() {
    timer(700).pipe(takeUntil(this.ngDestroy$)).subscribe(() => {
      if (this.slides) {
        this.slides.slideNext();
      }
    });
  }

  start() {
    if (this.reachedEnd) {
      this.userSettingService.currentSettings = {
        ...this.userSettingService.currentSettings,
        completedStartWizard: true,
      };
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

  ionSlidePrevStart() {
    this.reachedEnd = false;
  }

  private initStarIndexCounter() {
    this.activeIndex.pipe(
      switchMap((index) =>
        interval(700).pipe(
          skipWhile(() => index !== 4))),
      takeUntil(this.ngDestroy$)).subscribe(() => {
        if (this.isIncreasing && this.visibleStarNumber >= 6) { // Count to 6 to add an extra pause on the end
          this.isIncreasing = false;
        }
        if (!this.isIncreasing && this.visibleStarNumber < 0) { // Count to -1 to add an extra pause on the start
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
