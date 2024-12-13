import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-selected-items-counter-label',
  templateUrl: './selected-items-counter-label.component.html',
  styleUrls: ['./selected-items-counter-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonicModule, TranslateModule],
})
export class SelectedItemsCounterLabelComponent {
  @Input() selectedItemsCount: number;
}
