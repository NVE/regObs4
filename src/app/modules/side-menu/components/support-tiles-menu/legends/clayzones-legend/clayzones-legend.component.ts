import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-clayzones-legend',
  templateUrl: './clayzones-legend.component.html',
  styleUrls: ['./clayzones-legend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule, TranslateModule],
})
export class ClayzonesLegendComponent {}
