import { Component, Input } from '@angular/core';
import { RegistrationViewModel } from 'src/app/modules/common-regobs-api';
import { NgFor } from '@angular/common';
import { ObservationListCardComponent } from '../../../../components/observation/observation-list-card/observation-list-card.component';

/**
 * View observation cards in a list
 */
@Component({
  selector: 'app-observation-list-view',
  templateUrl: './observation-list-view.component.html',
  styleUrls: ['./observation-list-view.component.scss'],
  imports: [NgFor, ObservationListCardComponent],
})
export class ObservationListViewComponent {
  @Input() registrations: RegistrationViewModel[];

  trackById(_, obs: RegistrationViewModel) {
    return obs ? obs.RegId : undefined;
  }
}
