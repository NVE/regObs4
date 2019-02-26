import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggedInUser } from '../../models/logged-in-user.model';
import { LoginService } from '../../services/login.service';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { settings } from '../../../../../settings';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  loggedInUser: LoggedInUser;

  private subscription: Subscription;
  userProfileUrl: string;
  changePasswordUrl: string;

  constructor(
    private loginService: LoginService,
    private userSettingService: UserSettingService,
    private ngZone: NgZone) { }

  ngOnInit() {
    this.subscription = this.loginService.loggedInUser$.subscribe((loggedInUser) => {
      this.ngZone.run(() => {
        this.loggedInUser = loggedInUser;
        this.setUrls();
      });
    });
    this.setUrls();
  }

  private async setUrls() {
    const userSettings = await this.userSettingService.getUserSettings();
    const serviceBaseUrl = settings.services.regObs.serviceUrl[userSettings.appMode];
    const webBaseUrl = settings.services.regObs.webUrl[userSettings.appMode];
    this.ngZone.run(() => {
      this.changePasswordUrl = `${serviceBaseUrl}${settings.services.regObs
        .changePasswordUrl.replace('{email}', this.loggedInUser ? this.loggedInUser.email : '')}`;
      this.userProfileUrl = `${webBaseUrl}${settings.services.regObs.viewProfileUrl}`;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  isLoggedIn(loggedInUser: LoggedInUser) {
    return loggedInUser && loggedInUser.isLoggedIn;
  }

  logout() {
    return this.loginService.logout();
  }

}
