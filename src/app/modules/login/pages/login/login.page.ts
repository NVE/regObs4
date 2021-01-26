import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoggedInUser } from '../../models/logged-in-user.model';
import { RegobsAuthService } from '../../../auth/services/regobs-auth.service';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { settings } from '../../../../../settings';
import { map, take } from 'rxjs/operators';
import { ExternalLinkService } from '../../../../core/services/external-link/external-link.service';
import { LangKey } from '../../../../core/models/langKey';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  loggedInUser$: Observable<LoggedInUser>;

  constructor(
    private regobsAuthService: RegobsAuthService,
    private userSettingService: UserSettingService,
    private externalLinkService: ExternalLinkService
  ) {}

  ngOnInit(): void {
    this.loggedInUser$ = this.regobsAuthService.loggedInUser$;
  }

  signIn(): Promise<void> {
    return this.regobsAuthService.signIn();
  }

  logout(): Promise<void> {
    return this.regobsAuthService.logout();
  }

  async openMyPage(): Promise<void> {
    const myPageUrl = await this.userSettingService.appMode$
      .pipe(
        map((appMode) => settings.authConfig[appMode].myPageUrl),
        take(1)
      )
      .toPromise();
    const currentLangKey = await this.userSettingService.language$
      .pipe(take(1))
      .toPromise();
    this.externalLinkService.openExternalLink(
      `${myPageUrl}?Culture=${this.getSupportedMyPageLocales(currentLangKey)}`
    );
  }

  private getSupportedMyPageLocales(langKey: LangKey) {
    if (langKey === LangKey.nb || langKey === LangKey.nn) {
      return 'nb-NO';
    }
    return 'en';
  }
}
