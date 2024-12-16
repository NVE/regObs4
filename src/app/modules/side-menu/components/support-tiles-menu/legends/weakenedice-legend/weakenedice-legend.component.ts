import { IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-weakenedice-legend',
  templateUrl: './weakenedice-legend.component.html',
  styleUrls: ['./weakenedice-legend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonCol, IonGrid, IonRow, TranslateModule],
})
export class WeakenediceLegendComponent {}
