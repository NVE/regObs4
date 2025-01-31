import { Component, NgZone, OnDestroy, OnInit, inject } from '@angular/core';
import { IonBadge, IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs, Platform } from '@ionic/angular/standalone';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FullscreenService } from '../../core/services/fullscreen/fullscreen.service';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { GeoHazard } from '../../modules/common-core/models';
import { SearchCriteriaService } from '../../core/services/search-criteria/search-criteria.service';
import { WarningService } from '../../core/services/warning/warning.service';
import { TABS, TabsService } from './tabs.service';
import { NgIf, AsyncPipe } from '@angular/common';
import { CoachMarksMainScreenComponent } from '../../components/coach-marks/coach-marks-main-screen/coach-marks-main-screen.component';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { map as mapIcon, list, warning } from 'ionicons/icons';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [
    AsyncPipe,
    // CoachMarksMainScreenComponent,
    IonBadge,
    IonIcon,
    IonLabel,
    IonTabBar,
    IonTabButton,
    IonTabs,
    NgIf,
    TranslatePipe,
  ],
})
export class TabsPage implements OnInit, OnDestroy {
  private fullscreenService = inject(FullscreenService);
  private searchCriteriaService = inject(SearchCriteriaService);
  private warningService = inject(WarningService);
  private userSettingService = inject(UserSettingService);
  private ngZone = inject(NgZone);
  private tabsService = inject(TabsService);

  private warningGroupInMapViewSubscription?: Subscription;
  private currentGeoHazardSubscription?: Subscription;
  readonly selectedTab$: Observable<TABS | null>;

  isFullscreen = toSignal(this.fullscreenService.isFullscreen$, { initialValue: false });

  warningsInView?: {
    count: number;
    text: string;
    maxWarning: number;
    hasEmergencyWarning: boolean;
  };
  showTrips = false;

  get showBadge(): boolean {
    if (this.warningsInView) {
      return this.warningsInView.maxWarning > 0;
    }
    return false;
  }

  get badgeColor(): string {
    if (this.warningsInView) {
      return 'warninglevel-' + this.warningsInView.maxWarning;
    }
    return 'warninglevel-0';
  }

  get badgeText(): string {
    if (this.warningsInView) {
      return `${this.warningsInView.maxWarning}${this.warningsInView.hasEmergencyWarning ? '!' : ''}`;
    }
    return '0'; // Ikke vurdert
  }

  constructor() {
    this.selectedTab$ = this.tabsService.selectedTab$;
    combineLatest([this.searchCriteriaService.searchCriteria$, this.tabsService.selectedTab$]).subscribe(([, tab]) =>
      this.applyCurrentQueryParams(tab)
    );
    addIcons({ map: mapIcon, list, warning });
  }

  private applyCurrentQueryParams(path: TABS | null) {
    if (path == TABS.HOME || path == TABS.OBSERVATION_LIST || path == TABS.WARNING_LIST) {
      this.searchCriteriaService.applyQueryParams();
    }
  }

  ngOnInit(): void {
    this.warningGroupInMapViewSubscription = this.warningService.warningGroupInMapViewObservable$
      .pipe(
        map((warningsInView) => {
          const allWarnings = [...warningsInView.center, ...warningsInView.viewBounds];
          const allMaxWarnings = allWarnings.map((g) => g.getMaxWarning(0));
          const maxWarning = Math.max(...allMaxWarnings.map((x) => x.max));
          const hasEmergencyWarning = allMaxWarnings.some((x) => x.max === maxWarning && x.hasWarning);
          return {
            count: allWarnings.length,
            text: allWarnings.length > 9 ? '9+' : allWarnings.length.toString(),
            maxWarning,
            hasEmergencyWarning,
          };
        })
      )
      .subscribe((val) => {
        this.ngZone.run(() => {
          this.warningsInView = val;
        });
      });

    this.currentGeoHazardSubscription = this.userSettingService.currentGeoHazard$.subscribe((val) => {
      this.ngZone.run(() => {
        this.showTrips = val.indexOf(GeoHazard.Snow) >= 0;
      });
    });
  }

  ngOnDestroy(): void {
    if (this.warningGroupInMapViewSubscription) {
      this.warningGroupInMapViewSubscription.unsubscribe();
    }
    if (this.currentGeoHazardSubscription) {
      this.currentGeoHazardSubscription.unsubscribe();
    }
  }
}
