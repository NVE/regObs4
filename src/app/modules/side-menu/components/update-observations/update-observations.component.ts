import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { settings } from '../../../../../settings';
import { UpdateObservationsService } from './update-observations.service';

@Component({
  selector: 'app-update-observations',
  templateUrl: './update-observations.component.html',
  styleUrls: ['./update-observations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateObservationsComponent {
  settings = settings;
  lastFetched$: Observable<Date>;

  constructor(private updateObservationsService: UpdateObservationsService) {
    this.lastFetched$ = updateObservationsService.lastFetched$;
  }

  refresh() {
    this.updateObservationsService.setLastFetched(null);
    this.updateObservationsService.requestRefresh();
  }
}
