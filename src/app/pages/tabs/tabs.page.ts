import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subscription, Observable } from 'rxjs';
import { WarningService } from '../../core/services/warning/warning.service';
import { distinctUntilChanged, filter, map, share } from 'rxjs/operators';
import { FullscreenService } from '../../core/services/fullscreen/fullscreen.service';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { GeoHazard } from 'src/app/modules/common-core/models';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SearchCriteriaService } from 'src/app/core/services/search-criteria/search-criteria.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit, OnDestroy {
  private warningGroupInMapViewSubscription: Subscription;
  private currentGeoHazardSubscription: Subscription;

  warningsInView: {
    count: number;
    text: string;
    maxWarning: number;
    hasEmergencyWarning: boolean;
  };
  isIos: boolean;
  isAndroid: boolean;
  fullscreen$: Observable<boolean>;
  showTrips = false;

  get showBadge(): boolean {
    return this.warningsInView && this.warningsInView.maxWarning > 0;
  }

  get badgeColor(): string {
    return 'warninglevel-' + this.warningsInView.maxWarning;
  }

  get badgeText(): string {
    return `${this.warningsInView.maxWarning}${this.warningsInView.hasEmergencyWarning ? '!' : ''}`;
  }

  selectedTab$: Observable<string>;

  constructor(
    private fullscreenService: FullscreenService,
    private searchCriteriaService: SearchCriteriaService,
    private platform: Platform,
    private warningService: WarningService,
    private userSettingService: UserSettingService,
    private ngZone: NgZone,
    location: Location,
    router: Router
  ) {
    this.isIos = this.platform.is('ios');
    this.isAndroid = this.platform.is('android');
    this.fullscreen$ = this.fullscreenService.isFullscreen$;
    this.selectedTab$ = router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => location.path()),
      distinctUntilChanged(),
      map((path) => {
        this.shouldTransferQueryParams(path);
        return this.parseTabFromPath(path);
      }),
      share() // All tabs subscribe to this, so share amongst subscribers
    );
  }

  private parseTabFromPath(path: string) {
    if (path.indexOf('observation-list') > -1) {
      return 'observation-list';
    }
    if (path.indexOf('warning-list') > -1) {
      return 'warning-list';
    }
    return 'home';
  }

  private shouldTransferQueryParams(path: string) {
    if (path == '' || path == '/observation-list' || path == '/warning-list') {
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
    this.warningGroupInMapViewSubscription.unsubscribe();
    this.currentGeoHazardSubscription.unsubscribe();
  }
}
