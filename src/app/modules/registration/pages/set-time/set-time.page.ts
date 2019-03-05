import { Component } from '@angular/core';
import * as moment from 'moment';
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
    this.maxDate = now;
    this.localDate = now;
  }

  confirm() {
    if (this.registration) {
      this.registration.request.DtObsTime = this.localDate;
      this.navController.navigateRoot('registration/edit/' + this.registration.id);
    }
  }
}
