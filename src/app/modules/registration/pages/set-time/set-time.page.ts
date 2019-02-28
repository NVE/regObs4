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

  constructor(
    basePageService: BasePageService,
    activatedRoute: ActivatedRoute,
    private navController: NavController,
  ) {
    super(null, basePageService, activatedRoute);
  }

  onInit() {
    this.maxDate = moment().toISOString(true);
    if (this.registration && !this.registration.request.DtObsTime) {
      this.registration.request.DtObsTime = this.maxDate;
    }
  }
  setToNow() {
    if (this.registration) {
      const now = moment().toISOString(true);
      this.maxDate = now;
      this.registration.request.DtObsTime = now;
    }
  }

  confirm() {
    if (this.registration) {
      this.navController.navigateRoot('registration/edit/' + this.registration.id);
    }
  }
}
