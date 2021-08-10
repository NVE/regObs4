import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoggedInUser } from '../../models/logged-in-user.model';
import { RegobsAuthService } from '../../../auth/services/regobs-auth.service';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { settings } from '../../../../../settings';
import { map, switchMap, take } from 'rxjs/operators';
import { ExternalLinkService } from '../../../../core/services/external-link/external-link.service';
import { LangKey } from '../../../../core/models/langKey';
import { ModalController } from '@ionic/angular';
import { EditModalComponent } from '../../../edit-modal/edit-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  loggedInUser$: Observable<LoggedInUser>;
  copyright$: Observable<string>;
  photographer$: Observable<string>;

  constructor(
    private regobsAuthService: RegobsAuthService,
    private userSettingService: UserSettingService,
    private externalLinkService: ExternalLinkService,
    public modalController: ModalController
  ) {}

  ngOnInit(): void {
    this.loggedInUser$ = this.regobsAuthService.loggedInUser$;
    this.copyright$ = this.userSettingService.userSetting$.pipe(switchMap((userSetting) => userSetting.copyright ? of(userSetting.copyright)
    : this.loggedInUser$.pipe(map( (LoggedInUser) => LoggedInUser.email ))))
    this.photographer$ = this.userSettingService.userSetting$.pipe(switchMap((userSetting) => userSetting.photographer ? of(userSetting.photographer)
    : this.loggedInUser$.pipe(map((LoggedInUser) => LoggedInUser.email))))
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

  async saveCopyright(copyright: string, photographer: string) {
    const userSettings = await this.userSettingService.userSetting$.pipe(take(1)).toPromise();
    userSettings.copyright = copyright;
    userSettings.photographer = photographer;
    this.userSettingService.saveUserSettings(userSettings);
  }

  async presentModal() {
    const copyright = await this.copyright$.pipe(take(1)).toPromise();
    const photographer = await this.photographer$.pipe(take(1)).toPromise();
    const modal =await this.modalController.create({
      component: EditModalComponent,
      componentProps: {
        copyright: copyright,
        photographer: photographer
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data && data.copyright && data.photographer) {
      await this.saveCopyright(data.copyright, data.photographer);
    }
  }
}
