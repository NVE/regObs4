import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoggedInUser } from '../../models/logged-in-user.model';
import { RegobsAuthService } from '../../../auth/services/regobs-auth.service';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { settings } from '../../../../../settings';
import { map, switchMap, take } from 'rxjs/operators';
import { ExternalLinkService } from '../../../../core/services/external-link/external-link.service';
import { LangKey } from 'src/app/modules/common-core/models';
import { UserGroupService } from '../../../../core/services/user-group/user-group.service';
import { StarRatingHelper } from '../../../../components/competence/star-helper';
import { AccountService, MyPageData, ObserverGroupDto } from 'src/app/modules/common-regobs-api';
import { ModalController } from '@ionic/angular';
import { EditPictureInfoModalComponent } from '../../../edit-picture-info-modal/edit-picture-info-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.html',
  styleUrls: ['./user-information.scss'],
})
export class UserInformation implements OnInit {
  loggedInUser$: Observable<LoggedInUser>;
  userGroups$: Observable<ObserverGroupDto[]>;
  myPage$: Observable<MyPageData>;

  myPageSampleData: MyPageData = {
    Competence: [
      {
        GeohazardTID: 10,
        CompetenceTID: 310,
      },
      {
        GeohazardTID: 20,
        CompetenceTID: 420,
      },
      {
        GeohazardTID: 60,
        CompetenceTID: 610,
      },
    ],
  };

  geoHazards = [
    {
      GeoHazardTID: 10,
      GeoHazardName: 'GEO_HAZARDS.SNOW',
    },
    {
      GeoHazardTID: 20,
      GeoHazardName: 'GEO_HAZARDS.DIRT',
    },
    {
      GeoHazardTID: 60,
      GeoHazardName: 'GEO_HAZARDS.WATER',
    },
    {
      GeoHazardTID: 70,
      GeoHazardName: 'GEO_HAZARDS.ICE',
    },
  ];
  copyright$: Observable<string>;
  photographer$: Observable<string>;

  constructor(
    private regobsAuthService: RegobsAuthService,
    private userSettingService: UserSettingService,
    private externalLinkService: ExternalLinkService,
    private userGroupService: UserGroupService,
    private accountApiService: AccountService,
    public modalController: ModalController,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loggedInUser$ = this.regobsAuthService.loggedInUser$;
    this.userGroups$ = this.userGroupService.getUserGroupsAsObservable();
    //TODO - Implement API call for MyPage in api version 5
    //this.myPage$ = this.accountApiService.AccountGetMyPageData();
    this.myPage$ = of(this.myPageSampleData);
    this.userGroupService.updateUserGroups();
    this.copyright$ = this.userSettingService.userSetting$.pipe(
      switchMap((userSetting) =>
        userSetting.copyright
          ? of(userSetting.copyright)
          : this.loggedInUser$.pipe(map((LoggedInUser) => LoggedInUser.email))
      )
    );
    this.photographer$ = this.userSettingService.userSetting$.pipe(
      switchMap((userSetting) =>
        userSetting.photographer
          ? of(userSetting.photographer)
          : this.loggedInUser$.pipe(map((LoggedInUser) => LoggedInUser.email))
      )
    );
  }

  navigateBack() {
    const prevUrl = localStorage.getItem('prevUrl') || '/';
    this.router.navigateByUrl(prevUrl);
  }

  signIn(): Promise<void> {
    return this.regobsAuthService.signIn();
  }

  logout(): Promise<void> {
    return this.regobsAuthService.logout();
  }

  async openMyPage(tag = ''): Promise<void> {
    const myPageUrl = await this.userSettingService.appMode$
      .pipe(
        map((appMode) => settings.authConfig[appMode].myPageUrl),
        take(1)
      )
      .toPromise();
    const currentLangKey = await this.userSettingService.language$.pipe(take(1)).toPromise();
    const locale = this.getSupportedMyPageLocales(currentLangKey);
    this.externalLinkService.openExternalLink(`${myPageUrl}/SubPage?Culture=${locale}&tag=${tag}`);
  }

  private getSupportedMyPageLocales(langKey: LangKey) {
    if (langKey === LangKey.nb || langKey === LangKey.nn) {
      return 'nb-NO';
    }
    return 'en';
  }

  getCompetenceFromGeoHazard(geohazardTID: number): number {
    const competence = this.myPageSampleData.Competence.find((x) => x.GeohazardTID == geohazardTID);
    if (competence != null) {
      return StarRatingHelper.getStarRating(competence.CompetenceTID);
    } else {
      return 0;
    }
  }

  async saveCopyrightAndPhotographer(copyright: string, photographer: string) {
    const userSettings = await this.userSettingService.userSetting$.pipe(take(1)).toPromise();
    userSettings.copyright = copyright;
    userSettings.photographer = photographer;
    this.userSettingService.saveUserSettings(userSettings);
  }

  async presentModal() {
    const copyright = await this.copyright$.pipe(take(1)).toPromise();
    const photographer = await this.photographer$.pipe(take(1)).toPromise();
    const modal = await this.modalController.create({
      component: EditPictureInfoModalComponent,
      componentProps: {
        copyright: copyright,
        photographer: photographer,
      },
      cssClass: 'editCopyrightModal',
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data != null) {
      await this.saveCopyrightAndPhotographer(data.copyright, data.photographer);
    }
  }
}
