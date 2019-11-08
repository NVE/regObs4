import { Component } from '@angular/core';
import moment from 'moment';
import { NavController } from '@ionic/angular';
import { BasePage } from '../base.page';
import { BasePageService } from '../base-page-service';
import { ActivatedRoute, Route } from '@angular/router';
import { IRegistration } from '../../models/registration.model';

@Component({
  selector: 'app-set-time',
  templateUrl: './set-time.page.html',
  styleUrls: ['./set-time.page.scss'],
})
export class SetTimePage extends BasePage {
  maxDate: string;
  registration: IRegistration;
  localDate: string;

  constructor(
    basePageService: BasePageService,
    activatedRoute: ActivatedRoute,
    private navController: NavController,
  ) {
    super(null, basePageService, activatedRoute);
    this.setToNow();
  }

  onInit() {
    if (this.registration && this.registration.request.DtObsTime) {
      this.localDate = this.registration.request.DtObsTime;
    }
  }
  setToNow() {
    const now = moment().toISOString(true);
    this.maxDate = this.getMaxDateForNow();
    this.localDate = now;
  }

  getMaxDateForNow() {
    // There is an issue when setting max date that when changing hour, the minutes is still max minutes.
    // Workaround is to set minutes to 59.
    return moment().minutes(59).toISOString(true);
  }

  confirm() {
    if (this.registration) {
      this.registration.request.DtObsTime = this.localDate;
      this.navController.navigateRoot('registration/edit/' + this.registration.id);
    }
  }
}
