import { IonLabel } from '@ionic/angular/standalone';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-selected-items-counter-label',
  templateUrl: './selected-items-counter-label.component.html',
  styleUrls: ['./selected-items-counter-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonLabel, TranslatePipe],
})
export class SelectedItemsCounterLabelComponent {
  @Input() selectedItemsCount: number;
}
