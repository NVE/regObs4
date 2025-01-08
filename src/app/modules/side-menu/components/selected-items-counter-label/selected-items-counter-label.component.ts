import { IonLabel } from '@ionic/angular/standalone';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

const toNumber = (v?: number | null): number => (v == null ? 0 : v);

@Component({
  selector: 'app-selected-items-counter-label',
  templateUrl: './selected-items-counter-label.component.html',
  styleUrls: ['./selected-items-counter-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonLabel, TranslatePipe],
})
export class SelectedItemsCounterLabelComponent {
  readonly selectedItemsCount = input(0, { transform: toNumber });
}
