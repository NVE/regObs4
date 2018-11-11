import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { Subscription } from 'rxjs';
import { IRegistration } from '../../models/registration.model';
import { UserGroupService } from '../../../../core/services/user-group/user-group.service';
import { ObserverGroupDto } from '../../../regobs-api/models';
import { RegistrationTid } from '../../models/registrationTid.enum';
import { GeoHazard } from '../../../../core/models/geo-hazard.enum';
import { ISummaryItem } from '../../components/summary-item/summary-item.model';
import { ActivatedRoute } from '@angular/router';
import { EmailComposer, EmailComposerOptions } from '@ionic-native/email-composer/ngx';
import { TranslateService } from '@ngx-translate/core';
import { settings } from '../../../../../settings';
import { RegistrationStatus } from '../../models/registrationStatus.enum';
import { SummaryItemService } from '../../services/summary-item.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss'],
})
export class OverviewPage implements OnInit, OnDestroy {
  registration: IRegistration;
  userGroups: ObserverGroupDto[] = [];
  RegistationTid = RegistrationTid;
  private userGroupSubscription: Subscription;
  GeoHazard = GeoHazard;
  RegistrationStatus = RegistrationStatus;
  summaryItems: Array<ISummaryItem> = [];

  constructor(
    private registrationService: RegistrationService,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private summaryItemService: SummaryItemService,
    private emailComposer: EmailComposer,
    private translateService: TranslateService,
    private userGroupService: UserGroupService) {
  }

  async ngOnInit() {
    this.userGroupSubscription = this.userGroupService.getUserGroupsAsObservable().subscribe((userGroups) => {
      this.userGroups = userGroups;
      this.initSummaryItems().then(() => {
        this.cdr.detectChanges();
      });
    });
    this.userGroupService.updateUserGroups();
  }

  ngOnDestroy(): void {
    if (this.userGroupSubscription) {
      this.userGroupSubscription.unsubscribe();
    }
  }

  async ionViewDidEnter() {
    await this.initSummaryItems();
  }

  private getRegistration() {
    if (this.activatedRoute.snapshot.params['id']) {
      return this.registrationService.getSavedRegistrationById(this.activatedRoute.snapshot.params['id']);
    } else {
      return this.registrationService.getCurrentRegistration();
    }
  }

  private async initSummaryItems() {
    this.registration = await this.getRegistration();
    if (!this.registration) {
      this.registration = await this.registrationService.createNewRegistration();
      await this.registrationService.saveRegistration(this.registration);
    }
    this.summaryItems = await this.summaryItemService.getSummaryItems(this.registration);
    this.cdr.detectChanges();
  }

  ionViewWillLeave() {
  }

  // private async getEmailAddress() {
  //   const userSetting = await this.userSettingService.getUserSettings();
  //   switch (userSetting.currentGeoHazard) {
  //     case GeoHazard.Snow:
  //       return 'snoskredvarsling@nve.no';
  //     case GeoHazard.Ice:
  //       return 'isvarsling@nve.no';
  //     case GeoHazard.Water:
  //       return 'flomvarsling@nve.no';
  //     case GeoHazard.Dirt:
  //       return 'jordskredvarsling@nve.no';
  //   }
  // }

  async openForEdit() {
    this.registration.status = RegistrationStatus.Draft;
    await this.registrationService.saveRegistration(this.registration);
  }

  async sendEmail() {
    const translations = await this.translateService
      .get(['REGISTRATION.EMAIL.SUBJECT', 'REGISTRATION.EMAIL.BODY']).toPromise();
    const base64string = btoa(JSON.stringify(this.registration));
    const email: EmailComposerOptions = {
      to: settings.errorEmailAddress,
      attachments: [
        'base64:registration.json//' + base64string,
      ],
      subject: translations['REGISTRATION.EMAIL.SUBJECT'],
      body: translations['REGISTRATION.EMAIL.BODY'],
      isHtml: true
    };
    this.emailComposer.open(email);
  }
}
