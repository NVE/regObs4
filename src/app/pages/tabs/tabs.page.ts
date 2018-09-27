import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Events, Tabs } from '@ionic/angular';
import { settings } from '../../../settings';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit, OnDestroy {

  fullscreen = false;
  @ViewChild(Tabs) private tabs: Tabs;
  constructor(private events: Events) {

  }

  ngOnInit(): void {
    this.events.subscribe(settings.events.fullscreenChanged, (isFullscreen) => {
      this.fullscreen = isFullscreen;
    });
  }

  ngOnDestroy(): void {
    this.events.unsubscribe(settings.events.fullscreenChanged);
  }

  tabsChanged(event: CustomEvent) {
    const tabElement: HTMLIonTabElement = event.detail.tab;
    console.log('[INFO] Tabs changed to: ', tabElement.name);
    this.events.publish(settings.events.tabsChanged, tabElement.name);
  }

  ionViewDidEnter() {
    console.log('[INFO] Tabs page ionViewDidEnter');
  }
}
