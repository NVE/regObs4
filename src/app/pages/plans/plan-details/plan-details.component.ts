import { Component, computed, inject, input } from '@angular/core';
import { GeoJSONService } from 'src/app/core/services/geojson/geojson.service';

/**
 * Detaljer for en turplan.
 * Ideen er at denne kan brukes både på /plans/:id, og kunne brukes i en modal som åpnes fra kartet, når man
 * klikker på en tur i kartet.
 */
@Component({
  selector: 'app-plan-details',
  templateUrl: './plan-details.component.html',
  styleUrls: ['./plan-details.component.css'],
})
export class PlanDetailsComponent {
  geoJSON = inject(GeoJSONService);
  id = input.required<string>();

  metadata = computed(() => this.geoJSON.metadata().find((m) => m.id === this.id()));
}
