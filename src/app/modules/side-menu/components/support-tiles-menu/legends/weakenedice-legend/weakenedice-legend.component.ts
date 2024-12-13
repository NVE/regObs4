import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-weakenedice-legend',
  templateUrl: './weakenedice-legend.component.html',
  styleUrls: ['./weakenedice-legend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule, TranslateModule],
})
export class WeakenediceLegendComponent {}
