import { IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-clayzones-legend',
  templateUrl: './clayzones-legend.component.html',
  styleUrls: ['./clayzones-legend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonCol, IonGrid, IonRow, TranslatePipe],
})
export class ClayzonesLegendComponent {}
