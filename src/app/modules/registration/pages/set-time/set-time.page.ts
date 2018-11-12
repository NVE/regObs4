import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { IRegistration } from '../../models/registration.model';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-set-time',
  templateUrl: './set-time.page.html',
  styleUrls: ['./set-time.page.scss'],
})
export class SetTimePage implements OnInit, OnDestroy {
  maxDate: string;
  date: string;

  constructor(
    private registrationService: RegistrationService,
    private navController: NavController) { }

  async ngOnInit() {
    this.maxDate = moment().toISOString(true);
    const reg = await this.registrationService.getCurrentRegistration();
    if (reg && reg.request.DtObsTime) {
      this.date = reg.request.DtObsTime;
    } else {
      this.date = moment().toISOString(true);
    }
  }

  ngOnDestroy(): void {
  }

  setToNow() {
    const now = moment().toISOString(true);
    this.maxDate = now;
    this.date = now;
  }

  async confirm() {
    const currentRegistration = await this.registrationService.getCurrentRegistration();
    currentRegistration.request.DtObsTime = this.date;
    await this.registrationService.saveRegistration(currentRegistration);
    this.navController.navigateForward('registration/edit/' + currentRegistration.id);
  }
}
