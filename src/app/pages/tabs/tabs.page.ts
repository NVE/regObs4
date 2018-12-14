import { Component, ViewChild, OnInit, OnDestroy, NgZone } from '@angular/core';
import { IonTabs, Platform } from '@ionic/angular';
import { Subscription, Observable } from 'rxjs';
import { WarningService } from '../../core/services/warning/warning.service';
import { map } from 'rxjs/operators';
import { FullscreenService } from '../../core/services/fullscreen/fullscreen.service';
import { TabService } from '../../core/services/tab/tab.service';
import { TabName } from '../../core/services/tab/tab-name.enum';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { GeoHazard } from '../../core/models/geo-hazard.enum';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit, OnDestroy {
  private warningGroupInMapViewSubscription: Subscription;
  private currentGeoHazardSubscription: Subscription;

  warningsInView: { count: number; text: string, maxWarning: number };
  isIos: boolean;
  isAndroid: boolean;
  fullscreen$: Observable<boolean>;
  showTrips = false;

  get showBadge() {
    return this.warningsInView && this.warningsInView.maxWarning > 0;
  }

  get badgeColor() {
    return 'warninglevel-' + this.warningsInView.maxWarning;
  }

  get badgeText() {
    return this.warningsInView.maxWarning;
  }


  @ViewChild(IonTabs) private tabs: IonTabs;
  constructor(
    private fullscreenService: FullscreenService,
    private platform: Platform,
    private warningService: WarningService,
    private userSettingService: UserSettingService,
    private tabService: TabService,
    private ngZone: NgZone) {
    this.isIos = this.platform.is('ios');
    this.isAndroid = this.platform.is('android');
    this.fullscreen$ = this.fullscreenService.isFullscreen$;
  }

  ngOnInit(): void {
    this.warningGroupInMapViewSubscription = this.warningService.warningGroupInMapViewObservable$.pipe(map((warningsInView) => {
      const allWarnings = [...warningsInView.center, ...warningsInView.viewBounds];
      return {
        count: allWarnings.length,
        text: allWarnings.length > 9 ? '9+' : allWarnings.length.toString(),
        maxWarning: Math.max(
          ...(allWarnings.map((g) => {
            const maxFromWarnings = g.warnings.map((w) => w.warningLevel);
            return Math.max(...maxFromWarnings);
          }))
        ),
      };
    })).subscribe((val) => {
      this.ngZone.run(() => {
        this.warningsInView = val;
      });
    });

    this.currentGeoHazardSubscription = this.userSettingService.currentGeoHazardObservable$.subscribe((val) => {
      this.ngZone.run(() => {
        this.showTrips = val.indexOf(GeoHazard.Snow) >= 0;
      });
    });
  }

  ngOnDestroy(): void {
    this.warningGroupInMapViewSubscription.unsubscribe();
    this.currentGeoHazardSubscription.unsubscribe();
  }

  tabsChanged(event: CustomEvent) {
    const tabElement: HTMLIonTabElement = event.detail.tab;
    console.log('[INFO] Tabs changed to: ', tabElement.tab);
    const tabName = tabElement.tab as TabName;
    this.tabService.tabChange(tabName, true);
  }

  async ionViewDidEnter() {
    console.log('[INFO] Tabs page ionViewDidEnter');
    const selectedTab = await this.tabs.tabBar.selectedTab;
    if (selectedTab) {
      const tabName = selectedTab as TabName;
      this.tabService.tabChange(tabName, true);
    }
  }

  async ionViewWillLeave() {
    console.log('[INFO] Tabs page ionViewWillLeave');
    const selectedTab = await this.tabs.tabBar.selectedTab;
    if (selectedTab) {
      const tabName = selectedTab as TabName;
      this.tabService.tabChange(tabName, false);
    }
  }
}
