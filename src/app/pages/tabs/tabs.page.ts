import { Component, ViewChild, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Events, Tabs, Platform } from '@ionic/angular';
import { settings } from '../../../settings';
import { Subscription, Observable } from 'rxjs';
import { WarningService } from '../../core/services/warning/warning.service';
import { map } from 'rxjs/operators';
import { FullscreenService } from '../../core/services/fullscreen/fullscreen.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit, OnDestroy {
  private subscription: Subscription;
  warningsInView: { count: number; text: string, maxWarning: number };
  isIos: boolean;
  isAndroid: boolean;
  fullscreen$: Observable<boolean>;

  get showBadge() {
    return this.warningsInView && this.warningsInView.maxWarning > 0;
  }

  get badgeColor() {
    return 'warninglevel-' + this.warningsInView.maxWarning;
  }

  get badgeText() {
    return this.warningsInView.maxWarning;
  }


  @ViewChild(Tabs) private tabs: Tabs;
  constructor(
    private events: Events,
    private fullscreenService: FullscreenService,
    private platform: Platform,
    private warningService: WarningService,
    private ngZone: NgZone) {
    this.isIos = this.platform.is('ios');
    this.isAndroid = this.platform.is('android');
    this.fullscreen$ = this.fullscreenService.isFullscreen$;
  }

  ngOnInit(): void {
    this.subscription = this.warningService.warningGroupInMapViewObservable$.pipe(map((warningsInView) => {
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
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  tabsChanged(event: CustomEvent) {
    const tabElement: HTMLIonTabElement = event.detail.tab;
    console.log('[INFO] Tabs changed to: ', tabElement.tab);
    this.events.publish(settings.events.tabsChanged, tabElement.tab);
  }

  async ionViewDidEnter() {
    console.log('[INFO] Tabs page ionViewDidEnter');
    const selectedTab = await this.tabs.getSelected();
    if (selectedTab) {
      this.events.publish(settings.events.tabsChanged, selectedTab.tab);
    }
  }

  ionViewWillLeave() {
    console.log('[INFO] Tabs page ionViewWillLeave');
    this.events.publish(settings.events.tabsChanged, '');
  }
}
