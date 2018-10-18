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
  registration: IRegistration;
  maxDate: string;

  private subscription: Subscription;

  constructor(
    private registrationService: RegistrationService,
    private cdr: ChangeDetectorRef,
    private navController: NavController) { }

  ngOnInit() {
    this.maxDate = moment().toISOString(true);
    this.subscription = this.registrationService.registrationForCurrentGeoHazard$.subscribe(async (reg) => {
      if (reg) {
        this.registration = reg;
      } else {
        this.registration = await this.registrationService.createNewRegistration();
        this.registration.DtObsTime = moment().toISOString(true);
      }
      this.cdr.detectChanges();
    });
  }

  updateDate(event: any) {
    if (typeof event.detail.value === 'string') {
      return;
    }
    const day: number = event.detail.value.day.value;
    const month: number = event.detail.value.month.value;
    const year: number = event.detail.value.year.value;
    const hour: number = event.detail.value.hour.value;
    const minute: number = event.detail.value.minute.value;
    this.registration.DtObsTime = moment()
      .day(day)
      .month(month)
      .year(year)
      .hour(hour)
      .minute(minute)
      .second(0)
      .toISOString(true);
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setToNow() {
    const now = moment().toISOString(true);
    this.maxDate = now;
    this.registration.DtObsTime = now;
    this.cdr.detectChanges();
  }

  async confirm() {
    await this.registrationService.saveRegistration(this.registration);
    this.navController.navigateForward('registration');
  }
}
