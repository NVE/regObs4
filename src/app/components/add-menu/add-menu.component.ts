import { Component, OnInit, ViewChild, OnDestroy, NgZone } from '@angular/core';
import { PopoverMenuComponent } from '../popover-menu/popover-menu.component';
import { Fab, PopoverController, NavController } from '@ionic/angular';
import { CustomAnimation } from '../../core/animations/custom.animation';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { Subscription } from 'rxjs';
import { UserSetting } from '../../core/models/user-settings.model';
import { GeoHazard } from '../../core/models/geo-hazard.enum';
import { RegistrationService } from '../../modules/registration/services/registration.service';
import { IRegistration } from '../../modules/registration/models/registration.model';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.scss']
})
export class AddMenuComponent implements OnInit, OnDestroy {
  @ViewChild('menuFab') menuFab: Fab;

  private userSettingSubscription: Subscription;
  private registrationSubscription: Subscription;
  private userSettings: UserSetting;
  private drafts: IRegistration[] = [];

  constructor(
    private popoverController: PopoverController,
    private registrationService: RegistrationService,
    private ngZone: NgZone,
    private navController: NavController,
    private userSettingService: UserSettingService) { }

  ngOnInit() {
    this.userSettingSubscription = this.userSettingService.userSettingObservable$.subscribe((val) => {
      this.ngZone.run(() => {
        this.userSettings = val;
      });
    });
    this.registrationSubscription = this.registrationService.drafts$.subscribe((val) => {
      this.ngZone.run(() => {
        this.drafts = val;
      });
    });
  }

  ngOnDestroy(): void {
    if (this.userSettingSubscription) {
      this.userSettingSubscription.unsubscribe();
    }
    if (this.registrationSubscription) {
      this.registrationSubscription.unsubscribe();
    }
  }

  async showFabMenu(event: Event) {
    const anyDrafts = this.userSettings && this.drafts.some((x) => this.userSettings.currentGeoHazard.indexOf(x.geoHazard) >= 0);
    const show = !this.userSettings || !(this.userSettings.currentGeoHazard[0] === GeoHazard.Ice) || anyDrafts;
    if (show) {
      const ev = {
        ...event, target: {
          ...event.target, getBoundingClientRect: () => {
            return {
              top: (event.target as any).getBoundingClientRect().top - 160,
              left: (<any>event).pageX
            };
          }
        }
      };
      // const ev = event;
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
        this.navController.navigateForward('registration/obs-location?geoHazard=' + GeoHazard.Ice);
      }, 20);
    }
  }

}
