import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoggedInUser } from '../../models/logged-in-user.model';
import { RegobsAuthService } from '../../../auth/services/regobs-auth.service';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { settings } from '../../../../../settings';
import { map, take } from 'rxjs/operators';
import { ExternalLinkService } from '../../../../core/services/external-link/external-link.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loggedInUser$: Observable<LoggedInUser>;

  constructor(private regobsAuthService: RegobsAuthService, private userSettingService: UserSettingService, private externalLinkService: ExternalLinkService) {
  }

  ngOnInit() {
    this.loggedInUser$ = this.regobsAuthService.loggedInUser$;
  }

  signIn(): Promise<void> {
    return this.regobsAuthService.signIn();
  }

  logout(): Promise<void> {
    return this.regobsAuthService.logout();
  }

  async openMyPage() {
    const myPageUrl = await this.userSettingService.appMode$.pipe(map((appMode) => settings.authConfig[appMode].myPageUrl), take(1)).toPromise();
    this.externalLinkService.openExternalLink(myPageUrl);
  }
}
