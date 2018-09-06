import { Component, ViewChild, ElementRef } from '@angular/core';
import { AddMenuComponent } from '../../components/add-menu/add-menu.component';
import { Events, Tabs } from '@ionic/angular';
import { settings } from '../../../settings';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  providers: [AddMenuComponent],
})
export class TabsPage {

  @ViewChild(Tabs) private tabs: Tabs;
  constructor(private addMenu: AddMenuComponent, private events: Events) {

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
