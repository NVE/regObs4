import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoggedInUser } from '../../models/logged-in-user.model';
import { RegobsAuthService } from '../../../auth/services/regobs-auth.service';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { settings } from '../../../../../settings';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loggedInUser$: Observable<LoggedInUser>;

  myPageUrl$: Observable<string>;

  constructor(private regobsAuthService: RegobsAuthService, private userSettingService: UserSettingService) {
  }

  ngOnInit() {
    this.loggedInUser$ = this.regobsAuthService.loggedInUser$;
    this.myPageUrl$ = this.userSettingService.appMode$.pipe(map((appMode) => settings.authConfig[appMode].myPageUrl));
  }

  signIn(): Promise<void> {
    return this.regobsAuthService.signIn();
  }

  logout(): Promise<void> {
    return this.regobsAuthService.logout();
  }
}
