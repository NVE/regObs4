import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
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
  imports: [CommonModule, TranslateModule, NgTemplateOutlet],
  templateUrl: './exposed-height.component.html',
  styles: [
    `
      .container {
        display: flex;
      }

      svg {
        width: 65px;
        height: 65px;
      }

      svg:has(text) {
        flex: 1;
        width: 100%;
        height: 65px;
      }

      text {
        fill: var(--safe-text-gray, #666);
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
