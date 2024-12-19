import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-no-legend',
  template: `<p>{{ 'SUPPORT_MAP.NO_LEGEND' | translate }}</p>`,
  imports: [TranslatePipe],
})
export class NoLegendComponent {}
