import { Component, computed, inject, input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GeoJSONService } from 'src/app/core/services/geojson/geojson.service';
import { StaticMapImageComponent } from 'src/app/modules/static-map-image/static-map-image.component';
import { DatePipe } from '@angular/common';
import 'nve-designsystem/components/nve-icon/nve-icon.component.js';
import 'nve-designsystem/components/nve-menu-item/nve-menu-item.component.js';
import 'nve-designsystem/components/nve-button/nve-button.component.js';
import 'nve-designsystem/components/nve-input/nve-input.component.js';
import 'nve-designsystem/components/nve-textarea/nve-textarea.component.js';
import 'nve-designsystem/components/nve-switch/nve-switch.component.js';
import 'nve-designsystem/components/nve-tag/nve-tag.component.js';
/**
 * Detaljer for en turplan.
 * Ideen er at denne kan brukes både på /plans/:id, og kunne brukes i en modal som åpnes fra kartet, når man
 * klikker på en tur i kartet.
 */
@Component({
  selector: 'app-plan-details',
  templateUrl: './plan-details.component.html',
  styleUrls: ['./plan-details.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [StaticMapImageComponent, DatePipe],
})
export class PlanDetailsComponent {
  geoJSON = inject(GeoJSONService);
  id = input.required<string>();

  metadata = computed(() => {
    const a = this.geoJSON.metadata().find((m) => m.id === this.id());
    return a;
  });
}
