import { Component, OnInit, ViewChild, OnDestroy, NgZone } from '@angular/core';
import { ObservationService } from '../../core/services/observation/observation.service';
import { Subscription, Subject } from 'rxjs';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { LoginService } from '../../modules/login/services/login.service';
import { Refresher, InfiniteScroll, NavController } from '@ionic/angular';
import { ObserverResponseDto, RegistrationViewModel } from '../../modules/regobs-api/models';
import { RegistrationService } from '../../modules/registration/services/registration.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-my-observations',
  templateUrl: './my-observations.page.html',
  styleUrls: ['./my-observations.page.scss'],
})
export class MyObservationsPage implements OnInit, OnDestroy {
  registrations: RegistrationViewModel[];
  @ViewChild(Refresher) refresher: Refresher;
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;

  private subscription: Subscription;
  private user: ObserverResponseDto;
  showCancel = false;
  private cancelSubject: Subject<boolean>;

  constructor(
    private observationService: ObservationService,
    private ngZone: NgZone,
    private userSettingService: UserSettingService,
    private navContoller: NavController,
    private registrationService: RegistrationService,
    private loginService: LoginService) { }

  async ngOnInit() {
    this.cancelSubject = new Subject<boolean>();
    this.registrations = [];
    const loggedInUser = await this.loginService.getLoggedInUser();
    if (!loggedInUser.isLoggedIn) {
      this.navContoller.navigateRoot('/');
    } else {
      this.user = loggedInUser.user;
      this.subscription = this.observationService.getUserObservationsAsObservable().subscribe((val) => {
        this.ngZone.run(() => {
          this.registrations = val;
          this.infiniteScroll.complete();
        });
      });
    }
    this.loadPage(0);
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

  async loadPage(pageNumber: number, cancel?: Promise<any>) {
    const userSettings = await this.userSettingService.getUserSettings();
    return this.observationService.updateObservationsForCurrentUser(
      userSettings.appMode, this.user, userSettings.language, pageNumber, cancel);
  }

  trackByRegId(index: number, obs: RegistrationViewModel) {
    return obs ? obs.RegID : undefined;
  }

}
