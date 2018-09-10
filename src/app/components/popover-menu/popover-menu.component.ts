import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-menu',
  templateUrl: './popover-menu.component.html',
  styleUrls: ['./popover-menu.component.scss']
})
export class PopoverMenuComponent implements OnInit {

  constructor(private navController: NavController, private popoverController: PopoverController) { }

  ngOnInit() {
  }

  async closeAndNavigate(url: string) {
    await this.popoverController.dismiss();
    return this.navController.navigateForward(url);
  }

}
