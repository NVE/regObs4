import { Component } from '@angular/core';
import moment from 'moment';
import { NavController } from '@ionic/angular';
import { BasePage } from '../base.page';
import { BasePageService } from '../base-page-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-set-time',
  templateUrl: './set-time.page.html',
  styleUrls: ['./set-time.page.scss']
})
export class SetTimePage extends BasePage {
  maxDate: string;
  localDate: string;

  constructor(
    basePageService: BasePageService,
    activatedRoute: ActivatedRoute,
    private navController: NavController
  ) {
    super(null, basePageService, activatedRoute);
    this.setToNow();
  }

  onInit() {
    if (this.draft && this.draft.registration.DtObsTime) {
      this.localDate = this.draft.registration.DtObsTime;
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

  async isEmpty(): Promise<boolean> {
    return false;
  }

  confirm() {
    if (this.draft) {
      this.draft = {
        ...this.draft,
        registration: {
          ...this.draft.registration,
          DtObsTime: this.localDate || moment().toISOString(true)
        }
      };
      this.navController.navigateRoot('registration/edit/' + this.draft.uuid);
    }
  }
}
