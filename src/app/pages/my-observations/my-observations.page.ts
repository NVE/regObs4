import { Component, OnInit, ChangeDetectorRef, ViewChild, OnDestroy } from '@angular/core';
import { RegistrationService } from '../../modules/registration/services/registration.service';
import { ObservationService } from '../../core/services/observation/observation.service';
import { IRegistration } from '../../modules/registration/models/registration.model';
import { Observable, Subscription } from 'rxjs';
import { RegObsObservation } from '../../core/models/regobs-observation.model';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { map, tap } from 'rxjs/operators';
import { LoginService } from '../../core/services/login/login.service';
import { Refresher, InfiniteScroll, NavController } from '@ionic/angular';
import { SyncItemListComponent } from '../../modules/registration/components/sync-item-list/sync-item-list.component';
import { LoggedInUser } from '../../core/services/login/logged-in-user.model';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-my-observations',
  templateUrl: './my-observations.page.html',
  styleUrls: ['./my-observations.page.scss'],
})
export class MyObservationsPage implements OnInit, OnDestroy {
  registrations: RegObsObservation[];
  @ViewChild(Refresher) refresher: Refresher;
  @ViewChild(SyncItemListComponent) syncList: SyncItemListComponent;
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;

  private subscription: Subscription;
  private user: User;

  constructor(
    private observationService: ObservationService,
    private cdr: ChangeDetectorRef,
    private userSettingService: UserSettingService,
    private navContoller: NavController,
    private loginService: LoginService) { }

  async ngOnInit() {
    this.registrations = [];
    const loggedInUser = await this.loginService.getLoggedInUser();
    if (!loggedInUser.isLoggedIn) {
      this.navContoller.navigateRoot('/');
    } else {
      this.user = loggedInUser.user;
      this.subscription = this.observationService.getUserObservationsAsObservable().subscribe((val) => {
        this.registrations = val;
        this.infiniteScroll.complete();
        this.cdr.detectChanges();
      });
    }
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  doRefresh() {
    this.syncList.refresh();
    setTimeout(() => {
      this.refresher.complete();
    }, 5000);
  }

  async loadData() {
    const pageNumber = Math.floor(this.registrations.length / 10.0);
    const userSettings = await this.userSettingService.getUserSettings();
    await this.observationService.updateObservationsForCurrentUser(
      userSettings.appMode, this.user, userSettings.language, pageNumber);
  }

  trackByRegId(index: number, obs: RegObsObservation) {
    return obs ? obs.RegId : undefined;
  }

}
