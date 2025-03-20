import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

export enum ExposedHeightType {
  NOT_GIVEN = 0,
  TOP,
  BOTTOM,
  TOP_BOTTOM,
  MIDDLE,
}

@Component({
  selector: 'app-exposed-height',
  imports: [CommonModule, TranslateModule],
  templateUrl: './exposed-height.component.html',
  styles: [
    `
      text {
        fill: var(--safe-text-gray);
        font-style: italic;
      }

      svg + svg {
        margin-left: 8px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/** En figur som viser utsatt høyde over eller under en gitt grenseverdi eller mellom to grenseverdier */
export class ExposedHeightComponent {
  exposedHeightComboTid = input<ExposedHeightType>();
  exposedHeight1 = input<number>();
  exposedHeight2 = input<number>();

  hasHeightValue(): boolean {
    if ((this.exposedHeightComboTid() ?? -1) < 3) {
      return this.exposedHeight1() !== null;
    }
    return this.exposedHeight1() !== null || this.exposedHeight2() !== null;
  }
}
