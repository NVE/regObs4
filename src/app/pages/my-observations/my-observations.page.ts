import { Component, OnInit, ChangeDetectorRef, ViewChild, OnDestroy } from '@angular/core';
import { ObservationService } from '../../core/services/observation/observation.service';
import { Subscription } from 'rxjs';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { LoginService } from '../../core/services/login/login.service';
import { Refresher, InfiniteScroll, NavController } from '@ionic/angular';
import { SyncItemListComponent } from '../../modules/registration/components/sync-item-list/sync-item-list.component';
import { ObserverResponseDto, RegistrationViewModel } from '../../modules/regobs-api/models';

@Component({
  selector: 'app-my-observations',
  templateUrl: './my-observations.page.html',
  styleUrls: ['./my-observations.page.scss'],
})
export class MyObservationsPage implements OnInit, OnDestroy {
  registrations: RegistrationViewModel[];
  @ViewChild(Refresher) refresher: Refresher;
  @ViewChild(SyncItemListComponent) syncList: SyncItemListComponent;
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;

  private subscription: Subscription;
  private user: ObserverResponseDto;

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

  trackByRegId(index: number, obs: RegistrationViewModel) {
    return obs ? obs.RegID : undefined;
  }

}
