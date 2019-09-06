import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Subscription } from 'rxjs';
import { switchMap, map, distinctUntilChanged, tap } from 'rxjs/operators';
import { settings } from '../../../../../settings';
import { ObservationService } from '../../../../core/services/observation/observation.service';
import { DataMarshallService } from '../../../../core/services/data-marshall/data-marshall.service';
import { DataLoadService } from '../../../data-load/services/data-load.service';

@Component({
  selector: 'app-update-observations',
  templateUrl: './update-observations.component.html',
  styleUrls: ['./update-observations.component.scss']
})
export class UpdateObservationsComponent implements OnInit, OnDestroy {

  lastUpdated: Date;
  settings = settings;
  isLoading: boolean;
  subscriptions: Subscription[] = [];

  constructor(
    private observationService: ObservationService,
    private dataMarshallService: DataMarshallService,
    private ngZone: NgZone,
    private dataLoadService: DataLoadService) { }

  ngOnInit() {
    this.subscriptions.push(this.observationService.getLastUpdatedForCurrentGeoHazardAsObservable()
      .subscribe((val) => {
        this.ngZone.run(() => {
          this.lastUpdated = val;
        });
      }));
    this.subscriptions.push(this.observationService.dataLoad$.pipe(
      switchMap((id) => this.dataLoadService.getStateAsObservable(id)),
      map((state) => state.isLoading),
      distinctUntilChanged()).subscribe((val) => {
        this.ngZone.run(() => {
          this.isLoading = val;
        });
      }));
  }
  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  async updateOrCancelObservations() {
    if (this.isLoading) {
      this.dataMarshallService.cancelUpdateObservations();
    } else {
      this.isLoading = true;
      await this.observationService.forceUpdateObservationsForCurrentGeoHazard(
        this.dataMarshallService.cancelObservationsPromise
      );
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    }
  }

}
