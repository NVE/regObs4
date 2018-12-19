import { Component, OnInit, ViewChild, OnDestroy, NgZone } from '@angular/core';
import { ObservationService } from '../../core/services/observation/observation.service';
import { Subscription, Subject } from 'rxjs';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { LoginService } from '../../modules/login/services/login.service';
import { IonRefresher, IonInfiniteScroll, NavController, VirtualScroll } from '@ionic/angular';
import { ObserverResponseDto, RegistrationViewModel } from '../../modules/regobs-api/models';
import { RegistrationService } from '../../modules/registration/services/registration.service';
import { take } from 'rxjs/operators';
// import { ObsCardHeightService } from '../../core/services/obs-card-height/obs-card-height.service';

@Component({
  selector: 'app-my-observations',
  templateUrl: './my-observations.page.html',
  styleUrls: ['./my-observations.page.scss'],
})
export class MyObservationsPage implements OnInit, OnDestroy {
  registrations: RegistrationViewModel[];
  @ViewChild(IonRefresher) refresher: IonRefresher;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(VirtualScroll) virtualScroll: VirtualScroll;

  private subscription: Subscription;
  private user: ObserverResponseDto;
  showCancel = false;
  private cancelSubject: Subject<boolean>;
  // theBoundCallback: Function;
  loaded = false;

  constructor(
    private observationService: ObservationService,
    private ngZone: NgZone,
    private userSettingService: UserSettingService,
    private navContoller: NavController,
    private registrationService: RegistrationService,
    // private obsCardHeightService: ObsCardHeightService,
    private loginService: LoginService) {
  }

  async ngOnInit() {
    // this.theBoundCallback = this.getItemHeight.bind(this);
    this.cancelSubject = new Subject<boolean>();
    this.registrations = [];
    const loggedInUser = await this.loginService.getLoggedInUser();
    if (!loggedInUser.isLoggedIn) {
      this.navContoller.navigateRoot('/');
    } else {
      this.user = loggedInUser.user;
      setTimeout(() => {
        this.subscription = this.observationService.getUserObservationsAsObservable().subscribe((val) => {
          this.ngZone.run(() => {
            this.registrations = val;
          });
          if (!this.loaded) {
            // NOTE: This is a hack to get correct height of virtual items
            setTimeout(() => {
              this.registrations = [...val];
              this.loaded = true;
            }, 500);
          }
        });
        this.loadPage(0);
      }, 200);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  doRefresh() {
    this.ngZone.run(() => {
      this.showCancel = true;
    });
    const cancelPromise = this.getCancelPromise();
    this.registrationService.syncRegistrations(cancelPromise).then(() =>
      this.loadPage(0, cancelPromise)).then(() => {
        this.ngZone.run(() => {
          this.showCancel = false;
          this.refresher.complete();
        });
      });
  }

  cancel() {
    this.cancelSubject.next(true);
  }

  private getCancelPromise() {
    return this.cancelSubject.asObservable().pipe(take(1)).toPromise();
  }

  loadData() {
    const pageNumber = Math.floor(this.registrations.length / 10.0);
    return this.loadPage(pageNumber);
  }

  // getItemHeight(item: RegistrationViewModel, index: number) {
  //   return this.obsCardHeightService.getHeight(item.RegID);
  // }

  async loadPage(pageNumber: number, cancel?: Promise<any>) {
    const userSettings = await this.userSettingService.getUserSettings();
    await this.observationService.updateObservationsForCurrentUser(
      userSettings.appMode, this.user, userSettings.language, pageNumber, cancel);
    this.infiniteScroll.complete();
  }

  // trackByRegId(index: number, obs: RegistrationViewModel) {
  //   return obs ? obs.RegID : undefined;
  // }

}
