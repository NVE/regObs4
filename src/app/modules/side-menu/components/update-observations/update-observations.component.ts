import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SearchRegistrationService } from 'src/app/core/services/search-registration/search-registration.service';
import { settings } from '../../../../../settings';

@Component({
  selector: 'app-update-observations',
  templateUrl: './update-observations.component.html',
  styleUrls: ['./update-observations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateObservationsComponent implements OnInit, OnDestroy {
  settings = settings;
  readonly isLoading$: Observable<boolean>;
  subscriptions: Subscription[] = [];
  lastFetched: Date;

  constructor(
    private searchRegistrationService: SearchRegistrationService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.isLoading$ = searchRegistrationService.isFetchingData$;
    this.searchRegistrationService.lastFetched$.pipe(
      tap((lastFetched) => {
        this.lastFetched = lastFetched;
        this.changeDetectorRef.markForCheck();
      })
    ).subscribe();

  }

  ngOnInit() {
    // TODO: Sjekk at det er greit å fjerne dette
    // this.subscriptions.push(
    //   this.observationService.dataLoad$
    //     .pipe(
    //       switchMap((id) => this.dataLoadService.getStateAsObservable(id)),
    //       map((state) => state.isLoading),
    //       distinctUntilChanged()
    //     )
    //     .subscribe((val) => {
    //       this.ngZone.run(() => {
    //         this.isLoading = val;
    //       });
    //     })
    // );
  }
  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  async updateOrCancelObservations() {
    //TODO: Support cancel
    // if (this.isLoading) {
    //   this.dataMarshallService.cancelUpdateObservations();
    // } else {
    //   this.isLoading = true;
    this.searchRegistrationService.requestSearch();
    // await this.observationService.forceUpdateObservationsForCurrentGeoHazard(
    //   this.dataMarshallService.cancelObservationsPromise
    // );
    // setTimeout(() => {
    //   this.isLoading = false;
    // }, 500);
    // }
  }
}
