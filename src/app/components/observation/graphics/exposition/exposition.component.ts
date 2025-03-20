import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-exposition',
  imports: [TranslateModule],
  templateUrl: './exposition.component.svg',
  styles: [
    `
      text {
        font-family: 'Roboto Light', sans-serif;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/** En figur som viser utsatt himmelretning */
export class ExpositionComponent {
  /** Himmelretning som flagg, f.eks. 00111110 */
  value = input.required<string>();

  /** Overskrift */
  text = input<string>();
}
