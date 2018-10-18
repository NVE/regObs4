import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { Observable } from 'rxjs';
import { IRegistration } from '../../models/registration.model';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss'],
})
export class OverviewPage implements OnInit {
  registration$: Observable<IRegistration>;
  showSendButtons: boolean;
  constructor(
    private registrationService: RegistrationService,
    private cdr: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.registration$ = this.registrationService.registrationForCurrentGeoHazard$.pipe(tap((val) => {
      console.log('Registration changed', val);
      this.cdr.detectChanges();
    }));
  }

  ionViewDidEnter() {
    this.showSendButtons = true;
  }

  ionViewWillLeave() {
    this.showSendButtons = false;
  }
}
