import { IonItem, IonSpinner, IonText, IonButton, IonLabel } from '@ionic/angular/standalone';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { settings } from '../../../../../settings';
import { UpdateObservationsService } from './update-observations.service';
import { NgIf, AsyncPipe, DatePipe } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-update-observations',
  templateUrl: './update-observations.component.html',
  styleUrls: ['./update-observations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    DatePipe,
    IonButton,
    IonItem,
    IonLabel,
    IonSpinner,
    IonText,
    NgIf,
    SvgIconComponent,
    TranslateModule,
  ],
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
