import { IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-floodzones-legend',
  templateUrl: './floodzones-legend.component.html',
  styleUrls: ['./floodzones-legend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonCol, IonGrid, IonRow, TranslateModule],
})
export class FloodzonesLegendComponent {}
