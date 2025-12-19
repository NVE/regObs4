import { Platform } from '@ionic/angular';
import { ChangeDetectionStrategy, Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { IonButtons, IonMenuButton, IonRouterLinkWithHref, IonTitle, IonContent } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { HeaderComponent } from 'src/app/modules/shared/components/header/header.component';
import 'nve-designsystem/components/nve-button/nve-button.component.js';
import 'nve-designsystem/components/nve-menu/nve-menu.component.js';
import 'nve-designsystem/components/nve-menu-item/nve-menu-item.component.js';
import 'nve-designsystem/components/nve-divider/nve-divider.component.js';
import 'nve-designsystem/components/nve-badge/nve-badge.component.js';
import 'nve-designsystem/components/nve-select/nve-select.component.js';
import 'nve-designsystem/components/nve-option/nve-option.component.js';
import 'nve-designsystem/components/nve-icon/nve-icon.component.js';
import 'nve-designsystem/components/nve-button/nve-button.component.js';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { toGeoJSON } from './utils';
import { GeoJSONService } from 'src/app/core/services/geojson/geojson.service';
import { GeoJSONItem } from 'src/app/core/services/geojson/geojson-item.model';
import { generateShortRandomId } from './utils';
import { DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import L from 'leaflet';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.page.html',
  styleUrl: './plans.page.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeaderComponent,
    IonButtons,
    DatePipe,
    IonMenuButton,
    IonTitle,
    TranslatePipe,
    TranslatePipe,
    NgxFileDropModule,
    RouterLink,
    IonRouterLinkWithHref,
    IonContent,
  ],
})
/** Side som viser planer og sporfiler */
export class PlansPage {
  private platform = inject(Platform);
  private router = inject(Router);
  private geoJSONService = inject(GeoJSONService);

  isMobile = this.platform.is('mobile') || this.platform.is('android') || this.platform.is('ios');

  sortValue = signal<'name' | 'date'>('date');
  visibilityFilter = signal<'all' | 'onlyVisibleOnMap'>('all');
  items = computed(() => {
    const sorter = sortFunctions[this.sortValue()];
    const sortedItems = sorter(this.geoJSONService.metadata());
    if (this.visibilityFilter() === 'onlyVisibleOnMap') {
      return sortedItems.filter((item) => item.visibleOnMap);
    }
    return sortedItems;
  });

  /**
   * Log GPX filenames when files are dropped in the dropzone
   */
  async onFileDrop(files: NgxFileDropEntry[]) {
    for (const { fileEntry, relativePath } of files) {
      const geojson = await toGeoJSON(fileEntry);
      const id = generateShortRandomId();
      const metadata: GeoJSONItem = { id, name: relativePath, date: Date.now(), visibleOnMap: true };
      await this.geoJSONService.save(metadata, geojson);
      // Åpne detaljsiden kun når en fil er lastet opp.
      if (files.length === 1) {
        this.router.navigate(['/plans', id]);
      }
    }
  }

  async onDetailClick(event: Event, item: GeoJSONItem) {
    event.preventDefault();
    await this.updateGeojsonItemToShowOnMap(item.id);
    this.router.navigate([item.id]);
  }

  async updateGeojsonItemToShowOnMap(id: string) {
    const geoJSON = await this.geoJSONService.get(id);
    const geoJsonLayer = L.geoJSON(geoJSON);
    const bounds = geoJsonLayer.getBounds();

    this.geoJSONService.geojsonItemToShowOnMap.set(bounds);
  }

  /**
   * Hånderer sorting når bruker endrer valg i select
   */
  onSortChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const value = select.value as 'name' | 'date';
    this.sortValue.set(value);
  }

  /**
   * Hånderer visning av planer filter når bruker endrer valg i select
   */
  onVisibilityFilterChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const value = select.value as 'all' | 'onlyVisibleOnMap';
    this.visibilityFilter.set(value);
  }
}

/**
 * Sorterer basert på navn, alfabetisk
 */
export function sortByName(items: GeoJSONItem[]) {
  return items.toSorted((a, b) => a.name.localeCompare(b.name));
}

/**
 * Sorterer basert på dato, nyeste først
 */
export function sortByDate(items: GeoJSONItem[]) {
  return items.toSorted((a, b) => {
    if (a.date && b.date) {
      return b.date - a.date;
    }
    if (!a.date && !b.date) {
      return 0;
    }
    return a.date ? -1 : 1;
  });
}

const sortFunctions = {
  name: sortByName,
  date: sortByDate,
} as const;
