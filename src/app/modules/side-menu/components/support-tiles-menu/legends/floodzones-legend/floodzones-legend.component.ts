import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-floodzones-legend',
  templateUrl: './floodzones-legend.component.html',
  styleUrls: ['./floodzones-legend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule, TranslateModule],
})
export class FloodzonesLegendComponent {}
