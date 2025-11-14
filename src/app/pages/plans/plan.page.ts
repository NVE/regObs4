import { Component, inject, input } from '@angular/core';
import { GeoJSONService } from 'src/app/core/services/geojson/geojson.service';
import { PlanDetailsComponent } from './plan-details/plan-details.component';

@Component({
  selector: 'app-plan.page',
  template: `
    <!-- TODO: Her må det sikkert legges til en header. Se andre *.page-sider -->
    <app-plan-details [id]="id()"></app-plan-details>
  `,
  imports: [PlanDetailsComponent],
})
export class PlanPage {
  geoJSON = inject(GeoJSONService);
  id = input.required<string>();
}
