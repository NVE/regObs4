import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { RegistrationService } from '../../modules/registration/services/registration.service';

@Component({
  selector: 'app-popover-menu',
  templateUrl: './popover-menu.component.html',
  styleUrls: ['./popover-menu.component.scss']
})
export class PopoverMenuComponent implements OnInit {

  constructor(
    private navController: NavController,
    private popoverController: PopoverController,
    private registrationService: RegistrationService) { }

  ngOnInit() {
  }

  async closeAndNavigate(url: string) {
    await this.popoverController.dismiss();
    return this.navController.navigateForward(url);
  }

  async createRegistration() {
    await this.popoverController.dismiss();
    this.registrationService.createOrEditRegistrationRoute();
  }

}
