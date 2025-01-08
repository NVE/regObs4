import { Component, OnInit, inject } from '@angular/core';
import { firstValueFrom, Observable, of } from 'rxjs';
import { LoggedInUser } from '../../models/logged-in-user.model';
import { RegobsAuthService } from '../../../auth/services/regobs-auth.service';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { settings } from '../../../../../settings';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { ExternalLinkService } from '../../../../core/services/external-link/external-link.service';
import { LangKey } from 'src/app/modules/common-core/models';
import { UserGroupService } from '../../../../core/services/user-group/user-group.service';
import { StarRatingHelper } from '../../../../components/competence/star-helper';
import { AccountService, MyPageData, ObserverGroupDto } from 'src/app/modules/common-regobs-api';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { EditPictureInfoModalComponent } from '../../../edit-picture-info-modal/edit-picture-info-modal.component';
import { Router } from '@angular/router';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { HeaderColorDirective } from '../../../shared/directives/header-color/header-color.directive';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.page.html',
  styleUrls: ['./user-information.page.scss'],
  imports: [
    AsyncPipe,
    HeaderColorDirective,
    IonBackButton,
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonLabel,
    IonRow,
    IonText,
    IonTitle,
    IonToolbar,
    NgFor,
    NgIf,
    TranslatePipe,
  ],
})
export class UserInformation implements OnInit {
  private regobsAuthService = inject(RegobsAuthService);
  private userSettingService = inject(UserSettingService);
  private externalLinkService = inject(ExternalLinkService);
  private userGroupService = inject(UserGroupService);
  private accountApiService = inject(AccountService);
  modalController = inject(ModalController);
  private router = inject(Router);

  loggedInUser$!: Observable<LoggedInUser>;
  userGroups$!: Observable<ObserverGroupDto[]>;
  myPage$!: Observable<MyPageData>;

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
  copyright$!: Observable<string>;
  photographer$!: Observable<string>;

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
          : this.regobsAuthService.loggedInUser$.pipe(map((LoggedInUser) => LoggedInUser.email as string))
      )
    );
    this.photographer$ = this.userSettingService.userSetting$.pipe(
      switchMap((userSetting) =>
        userSetting.photographer
          ? of(userSetting.photographer)
          : this.regobsAuthService.loggedInUser$.pipe(map((LoggedInUser) => LoggedInUser.email as string))
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
    const myPageUrl = await firstValueFrom(
      this.userSettingService.appMode$.pipe(map((appMode) => settings.authConfig[appMode].myPageUrl))
    );
    const currentLangKey = await firstValueFrom(this.userSettingService.language$);
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
    const competence = this.myPageSampleData?.Competence?.find((x) => x.GeohazardTID == geohazardTID);
    if (competence != null) {
      return StarRatingHelper.getStarRating(competence.CompetenceTID) || 0;
    } else {
      return 0;
    }
  }

  async saveCopyrightAndPhotographer(copyright: string, photographer: string) {
    const userSettings = await firstValueFrom(this.userSettingService.userSetting$);
    userSettings.copyright = copyright;
    userSettings.photographer = photographer;
    this.userSettingService.saveUserSettings(userSettings);
  }

  async presentModal() {
    const copyright = await firstValueFrom(this.copyright$);
    const photographer = await firstValueFrom(this.photographer$);
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
