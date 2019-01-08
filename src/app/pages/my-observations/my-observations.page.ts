import { Component, OnInit, ViewChild, OnDestroy, NgZone } from '@angular/core';
import { ObservationService } from '../../core/services/observation/observation.service';
import { Subscription } from 'rxjs';
import { UserSettingService } from '../../core/services/user-setting/user-setting.service';
import { LoginService } from '../../modules/login/services/login.service';
import { IonInfiniteScroll, NavController, IonVirtualScroll } from '@ionic/angular';
import { ObserverResponseDto, RegistrationViewModel } from '../../modules/regobs-api/models';
import { RegistrationService } from '../../modules/registration/services/registration.service';
import * as moment from 'moment';
import { take } from 'rxjs/operators';
// import { ObsCardHeightService } from '../../core/services/obs-card-height/obs-card-height.service';

@Component({
  selector: 'app-my-observations',
  templateUrl: './my-observations.page.html',
  styleUrls: ['./my-observations.page.scss'],
})
export class MyObservationsPage implements OnInit, OnDestroy {
  registrations: RegistrationViewModel[];
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;
  private registrationSubscription: Subscription;
  private user: ObserverResponseDto;
  // theBoundCallback: Function;
  loaded = false;
  refreshFunc: Function;

  constructor(
    private observationService: ObservationService,
    private ngZone: NgZone,
    private userSettingService: UserSettingService,
    private navContoller: NavController,
    private registrationService: RegistrationService,
    // private obsCardHeightService: ObsCardHeightService,
    private loginService: LoginService) {
    this.refreshFunc = this.refresh.bind(this);
  }

  refresh(cancelPromise: Promise<any>) {
    return this.registrationService.syncRegistrations(cancelPromise).then(() =>
      this.loadPage(0, cancelPromise));
  }

  async ngOnInit() {
    // this.theBoundCallback = this.getItemHeight.bind(this);
    this.registrations = [];
    const loggedInUser = await this.loginService.getLoggedInUser();
    if (!loggedInUser.isLoggedIn) {
      this.navContoller.navigateRoot('/');
    } else {
      this.user = loggedInUser.user;
      this.registrationSubscription = this.observationService.getUserObservationsAsObservable().subscribe((val) => {
        this.ngZone.run(() => {
          this.mergeRegistrations(val);
        });
        if (!this.loaded) {
          setTimeout(() => {
            this.registrations = [...val];
            setTimeout(() => {
              this.ngZone.run(() => {
                this.loaded = true;
              });
            }, 500);
          }, 500);
        }
      });
      this.loadPage(0);
    }
  }

  ngOnDestroy(): void {
    if (this.registrationSubscription) {
      this.registrationSubscription.unsubscribe();
    }
  }

  loadData() {
    const pageNumber = Math.floor(this.registrations.length / 10.0);
    return this.loadPage(pageNumber);
  }

  private mergeRegistrations(updatedRegistrations: RegistrationViewModel[]) {
    for (const item of updatedRegistrations) {
      const existingRegistration = this.registrations.find((x) => x.RegID === item.RegID);
      if (existingRegistration) {
        if (moment(item.DtChangeTime).isAfter(moment(existingRegistration.DtChangeTime))) {
          const index = this.registrations.indexOf(existingRegistration);
          this.registrations[index] = item;
          if (this.loaded) {
            this.virtualScroll.checkRange(index, 1);
          }
        }
      } else {
        const index = this.registrations.findIndex((val) => moment(item.DtObsTime).isSameOrAfter(moment(val.DtObsTime)));
        this.registrations.splice(index >= 0 ? index : 0, 0, item);
        if (this.loaded) {
          this.virtualScroll.checkRange(index);
        }
      }
    }
  }

  // getItemHeight(item: RegistrationViewModel, index: number) {
  //   return this.obsCardHeightService.getHeight(item.RegID);
  // }

  private async loadPage(pageNumber: number, cancel?: Promise<any>) {
    const userSettings = await this.userSettingService.getUserSettings();
    const updatedRegistrations = await this.observationService.updateObservationsForCurrentUser(
      userSettings.appMode, this.user, userSettings.language, pageNumber, cancel);
    this.ngZone.run(() => {
      this.mergeRegistrations(updatedRegistrations);
      this.infiniteScroll.complete();
    });
  }

  // trackByRegId(index: number, obs: RegistrationViewModel) {
  //   return obs ? obs.RegID : undefined;
  // }

}
