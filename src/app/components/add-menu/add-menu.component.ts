import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { PopoverMenuComponent } from '../popover-menu/popover-menu.component';
import { Fab, PopoverController } from '@ionic/angular';
import { CustomAnimation } from '../../core/animations/custom.animation';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { Subscription } from 'rxjs';
import { UserSetting } from '../../core/models/user-settings.model';
import { GeoHazard } from '../../core/models/geo-hazard.enum';
import { RegistrationService } from '../../modules/registration/services/registration.service';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.scss']
})
export class AddMenuComponent implements OnInit, OnDestroy {
  @ViewChild('menuFab') menuFab: Fab;

  private userSettingSubscription: Subscription;
  private userSettings: UserSetting;

  constructor(
    private popoverController: PopoverController,
    private registrationService: RegistrationService,
    private userSettingService: UserSettingService) { }

  ngOnInit() {
    this.userSettingSubscription = this.userSettingService.userSettingObservable$.subscribe((val) => {
      this.userSettings = val;
    });
  }

  ngOnDestroy(): void {
    this.userSettingSubscription.unsubscribe();
  }

  async showFabMenu(event: Event) {
    if (this.userSettings && this.userSettings.currentGeoHazard === GeoHazard.Avalanche) {
      const ev = {
        ...event, target: {
          ...event.target, getBoundingClientRect: () => {
            return {
              top: (event.target as any).getBoundingClientRect().top - 110,
              left: (<any>event).pageX
            };
          }
        }
      };
      const popover = await this.popoverController.create({
        component: PopoverMenuComponent,
        translucent: false,
        mode: 'md',
        event: ev,
        showBackdrop: true,
        cssClass: 'menu-popover',
      });
      popover.onWillDismiss().then(() => {
        this.menuFab.close();
      });
      return await popover.present();
    } else {
      setTimeout(() => {
        this.menuFab.close();
        this.registrationService.createOrEditRegistrationRoute();
      }, 20);
    }
  }

}
