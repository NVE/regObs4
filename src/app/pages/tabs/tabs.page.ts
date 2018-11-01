import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Events, Tabs } from '@ionic/angular';
import { settings } from '../../../settings';
import { Subscription } from 'rxjs';
import { WarningService } from '../../core/services/warning/warning.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit, OnDestroy {
  private subscription: Subscription;
  warningsInView: { count: number; text: string, maxWarning: number };
  fullscreen = false;
  @ViewChild(Tabs) private tabs: Tabs;
  constructor(private events: Events, private warningService: WarningService) {

  }

  ngOnInit(): void {
    this.events.subscribe(settings.events.fullscreenChanged, (isFullscreen) => {
      this.fullscreen = isFullscreen;
    });
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
      this.warningsInView = val;
    });
  }

  getBadge() {
    return (this.warningsInView && this.warningsInView.maxWarning > 0) ? this.warningsInView.text : '';
  }

  getBadgeColor() {
    if (this.warningsInView && this.warningsInView.maxWarning > 0) {
      // return 'warninglevel-' + this.warningsInView.maxWarning;
      // TODO: Comment in when bug is fixed: https://github.com/ionic-team/ionic/issues/14840
      return '';
    } else {
      return '';
    }
  }

  ngOnDestroy(): void {
    this.events.unsubscribe(settings.events.fullscreenChanged);
    this.subscription.unsubscribe();
  }

  tabsChanged(event: CustomEvent) {
    //   const tabElement: HTMLIonTabElement = event.detail.tab;
    //   console.log('[INFO] Tabs changed to: ', tabElement.name);
    //   this.events.publish(settings.events.tabsChanged, tabElement.name);
  }

  ionViewDidEnter() {
    console.log('[INFO] Tabs page ionViewDidEnter');
  }
}
