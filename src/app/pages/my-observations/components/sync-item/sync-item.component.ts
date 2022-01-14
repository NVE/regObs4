import { Component, OnInit, Input, OnDestroy, NgZone, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { IRegistration } from '../../../../modules/registration/models/registration.model';
import { Subscription } from 'rxjs';
import { RegistrationService } from '../../../../modules/registration/services/registration.service';
import { map, filter } from 'rxjs/operators';
import { RegistrationStatus } from 'src/app/modules/registration/models/registrationStatus.enum';

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
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {

    this.isDraft = this.registration.status === RegistrationStatus.Draft;
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
          this.isDraft = this.registration.status === RegistrationStatus.Draft;
          this.cdr.detectChanges();
        })
    );
    this.subscriptions.push(
      this.registrationService.getDataLoadState().subscribe((val) => {
        this.loading = val.isLoading;
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
