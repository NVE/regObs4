import { Component, OnInit, Input, OnDestroy, NgZone } from '@angular/core';
import { IRegistration, ProgressService } from '@varsom-regobs-common/registration';
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
    private progressService: ProgressService,
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
        this.progressService.registrationSyncProgress$.subscribe((val) => {
          this.ngZone.run(() => {
            this.loading = val.inProgress;
          });
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
