import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-selected-items-counter-label',
  templateUrl: './selected-items-counter-label.component.html',
  styleUrls: ['./selected-items-counter-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedItemsCounterLabelComponent {
  @Input() selectedItemsCount: number;
}
