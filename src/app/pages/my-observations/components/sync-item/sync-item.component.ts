import { Component, OnInit, Input, OnDestroy, NgZone, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { IRegistration, SyncStatus } from 'src/app/modules/common-registration/registration.models';
import { ProgressService } from 'src/app/modules/common-registration/registration.services';
import { Subscription } from 'rxjs';
import { RegistrationService } from '../../../../modules/registration/services/registration.service';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-sync-item',
  templateUrl: './sync-item.component.html',
  styleUrls: ['./sync-item.component.scss'],changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SyncItemComponent implements OnInit, OnDestroy {
  @Input() registration: IRegistration;
  private subscriptions: Subscription[] = [];
  loading: boolean;
  isDraft = false;

  constructor(
    private registrationService: RegistrationService,
    private progressService: ProgressService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
   
    this.isDraft = this.registration.syncStatus === SyncStatus.Draft;
    this.loading = !this.isDraft;
      this.subscriptions.push(
        this.registrationService
          .getRegistrationsToSync()
          .pipe(
            map((val: IRegistration[]) =>
              val.find((item) => item.id === this.registration.id)
            ),
            filter((x) => !!x)
          )
          .subscribe((val) => {      
              this.registration = val;
              this.isDraft = this.registration.syncStatus === SyncStatus.Draft;
              this.cdr.detectChanges();
          })
      );
      this.subscriptions.push(
        this.progressService.registrationSyncProgress$.subscribe((val) => {
            this.loading = val.inProgress;
            this.cdr.detectChanges();
        })
      );
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  getLocationName(reg: IRegistration) {
    return reg.request.ObsLocation
      ? reg.request.ObsLocation.LocationName ||
          reg.request.ObsLocation.LocationDescription
      : '';
  }
}
