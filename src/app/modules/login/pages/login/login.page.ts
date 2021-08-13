import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoggedInUser } from '../../models/logged-in-user.model';
import { RegobsAuthService } from '../../../auth/services/regobs-auth.service';
import { UserSettingService } from '../../../../core/services/user-setting/user-setting.service';
import { settings } from '../../../../../settings';
import { map, take } from 'rxjs/operators';
import { ExternalLinkService } from '../../../../core/services/external-link/external-link.service';
import { LangKey } from '../../../../core/models/langKey';
import { UserGroupService } from '../../../../core/services/user-group/user-group.service';
import { MyPageData, ObserverGroupDto } from '../../../regobs-api/models';
import * as RegobsApi from 'src/app/modules/regobs-api/services';
import { StarRatingHelper } from '../../../../components/competence/star-helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
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
       } 
    ]
  }

  geoHazards = [
     {
       GeoHazardTID: 10,
       GeoHazardName: 'GEO_HAZARDS.SNOW'
     },
     {
       GeoHazardTID: 20,
       GeoHazardName: 'GEO_HAZARDS.DIRT'
     },
     {
       GeoHazardTID: 60,
       GeoHazardName: 'GEO_HAZARDS.WATER'
     },
     {
       GeoHazardTID: 70,
       GeoHazardName: 'GEO_HAZARDS.ICE'
     },
  ]

  constructor(
    private regobsAuthService: RegobsAuthService,
    private userSettingService: UserSettingService,
    private externalLinkService: ExternalLinkService,
    private userGroupService: UserGroupService,
    private accountApiService: RegobsApi.AccountService,
  ) {}

  ngOnInit(): void {
    this.loggedInUser$ = this.regobsAuthService.loggedInUser$;
    this.userGroups$ = this.userGroupService.getUserGroupsAsObservable();
    //TODO - Implement API call for MyPage in api version 5
    //this.myPage$ = this.accountApiService.AccountGetMyPageData();
    this.myPage$ = of(this.myPageSampleData);
    this.userGroupService.updateUserGroups();
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

  getCompetenceFromGeoHazard(geohazardTID: number) : number {
    const competence = this.myPageSampleData.Competence.find( x => x.GeohazardTID == geohazardTID);
    if (competence != null) {
      return StarRatingHelper.getStarRating(competence.CompetenceTID); 
    }
    else {
      return 0;
    }
  }

}
