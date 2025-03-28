import { IonItem, IonSpinner, IonText, IonLabel, IonIcon } from '@ionic/angular/standalone';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { settings } from '../../../../../settings';
import { UpdateObservationsService } from './update-observations.service';
import { NgIf, AsyncPipe, DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { refresh } from 'ionicons/icons';

@Component({
  selector: 'app-update-observations',
  templateUrl: './update-observations.component.html',
  styleUrls: ['./update-observations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonIcon, AsyncPipe, DatePipe, IonItem, IonLabel, IonSpinner, IonText, NgIf, TranslatePipe],
})
export class UpdateObservationsComponent {
  private updateObservationsService = inject(UpdateObservationsService);

  settings = settings;
  lastFetched$ = this.updateObservationsService.lastFetched$;

  constructor() {
    addIcons({ refresh });
  }

  refresh() {
    this.updateObservationsService.setLastFetched(null);
    this.updateObservationsService.requestRefresh();
  }
}
