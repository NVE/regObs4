import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-no-legend',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<p>{{ 'SUPPORT_MAP.NO_LEGEND' | translate }}</p>`,
  imports: [TranslatePipe],
})
export class NoLegendComponent {}
