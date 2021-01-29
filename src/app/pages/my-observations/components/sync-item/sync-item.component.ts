import { Component, OnInit, Input, OnDestroy, NgZone } from '@angular/core';
import { IRegistration } from '../../../../modules/registration/models/registration.model';
import { Subscription } from 'rxjs';
import { RegistrationService } from '../../../../modules/registration/services/registration.service';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-sync-item',
  templateUrl: './sync-item.component.html',
  styleUrls: ['./sync-item.component.scss']
})
export class SyncItemComponent implements OnInit, OnDestroy {
  @Input() registration: IRegistration;
  @Input() refresh: boolean;
  private subscriptions: Subscription[] = [];
  loading: boolean;

  constructor(
    private registrationService: RegistrationService,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    if (this.refresh) {
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
            this.ngZone.run(() => {
              this.registration = val;
            });
          })
      );
      this.subscriptions.push(
        this.registrationService.getDataLoadState().subscribe((val) => {
          this.ngZone.run(() => {
            this.loading = val.isLoading;
          });
        })
      );
    }
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
