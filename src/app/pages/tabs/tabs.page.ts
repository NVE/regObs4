import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { AddMenuComponent } from '../../components/add-menu/add-menu.component';
import { Events, Tabs } from '@ionic/angular';
import { settings } from '../../../settings';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  providers: [AddMenuComponent],
})
export class TabsPage implements OnInit, OnDestroy {

  fullscreen = false;
  @ViewChild(Tabs) private tabs: Tabs;
  constructor(private addMenu: AddMenuComponent, private events: Events) {

  }

  ngOnInit(): void {
    this.events.subscribe(settings.events.fullscreenChanged, (isFullscreen) => {
      this.fullscreen = isFullscreen;
    });
  }

  ngOnDestroy(): void {
    this.events.unsubscribe(settings.events.fullscreenChanged);
  }

  toggleAddMenu() {
    this.addMenu.toggle();
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
