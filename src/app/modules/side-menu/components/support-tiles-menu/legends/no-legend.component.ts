import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-no-legend',
  template: `<p>{{ 'SUPPORT_MAP.NO_LEGEND' | translate }}</p>`,
  imports: [TranslateModule],
})
export class NoLegendComponent {}
