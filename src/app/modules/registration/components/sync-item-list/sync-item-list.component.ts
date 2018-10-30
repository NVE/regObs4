import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { Subscription } from 'rxjs';
import { IRegistration } from '../../models/registration.model';
import { IDataLoad } from '../../../data-load/models/data-load.interface';

@Component({
  selector: 'app-sync-item-list',
  templateUrl: './sync-item-list.component.html',
  styleUrls: ['./sync-item-list.component.scss']
})
export class SyncItemListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private dataLoadSubscription: Subscription;
  registrations: IRegistration[];
  dataLoad: IDataLoad;

  constructor(
    private registrationService: RegistrationService,
    private cdr: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.registrations = [];
    this.subscription = this.registrationService.getRegistrationsToSync().subscribe((val) => {
      this.registrations = val;
      this.cdr.detectChanges();
    });
    this.dataLoadSubscription = this.registrationService.getDataLoadState().subscribe((val) => {
      this.dataLoad = val;
      this.cdr.detectChanges();
    });
  }

  isLoading(reg: IRegistration, index: number) {
    return this.dataLoad && this.dataLoad.isLoading && this.dataLoad.progress === index;
  }

  refresh() {
    this.registrationService.syncRegistrations();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.dataLoadSubscription.unsubscribe();
  }

}
