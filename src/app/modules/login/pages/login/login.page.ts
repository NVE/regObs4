import { Component, OnInit, NgZone } from '@angular/core';
import { timer } from 'rxjs';
import { LoggedInUser } from '../../models/logged-in-user.model';
import { LoginService } from '../../services/login.service';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { settings } from '../../../../../settings';
import { NavController } from '@ionic/angular';
import { NgDestoryBase } from '../../../../core/helpers/observable-helper';
import { takeUntil, switchMap, map } from 'rxjs/operators';
import { AppMode } from '../../../../core/models/app-mode.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends NgDestoryBase implements OnInit {
  loggedInUser: LoggedInUser;
  userProfileUrl: string;
  changePasswordUrl: string;

  constructor(
    private loginService: LoginService,
    private userSettingService: UserSettingService,
    private navController: NavController,
    private ngZone: NgZone) {
    super();
  }

  ngOnInit() {
    this.userSettingService.appMode$.pipe(
      switchMap((appMode) =>
        this.loginService.loggedInUser$.pipe(map((loggedInUser) => ({ appMode, loggedInUser })))),
      takeUntil(this.ngDestroy$)).subscribe((result) => {
        this.ngZone.run(() => {
          this.loggedInUser = result.loggedInUser;
          this.setUrls(result.appMode, result.loggedInUser);
        });
      });
  }

  private setUrls(appMode: AppMode, loggedInUser: LoggedInUser) {
    const serviceBaseUrl = settings.services.regObs.serviceUrl[appMode];
    const webBaseUrl = settings.services.regObs.webUrl[appMode];
    this.changePasswordUrl = `${serviceBaseUrl}${settings.services.regObs
      .changePasswordUrl.replace('{email}', this.loggedInUser ? this.loggedInUser.email : '')}`;
    this.userProfileUrl = `${webBaseUrl}${settings.services.regObs.viewProfileUrl}`;
  }

  isLoggedIn(loggedInUser: LoggedInUser) {
    return loggedInUser && loggedInUser.isLoggedIn;
  }

  logout() {
    return this.loginService.logout();
  }

  onLoginSuccess() {
    timer(1000).pipe(takeUntil(this.ngDestroy$)).subscribe(() => {
      this.navController.navigateRoot('/');
    });
  }

}
