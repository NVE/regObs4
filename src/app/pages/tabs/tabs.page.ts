import { Component } from '@angular/core';
import { AddMenuComponent } from '../../components/add-menu/add-menu.component';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  providers: [AddMenuComponent],
})
export class TabsPage {

  constructor(private addMenu: AddMenuComponent) {

  }

  toggleAddMenu() {
    this.addMenu.toggle();
  }
}
