import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal } from '@angular/core';
import { IonButtons, IonMenuButton, IonTitle } from '@ionic/angular/standalone';
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
import 'nve-designsystem/components/nve-message-card/nve-message-card.component.js';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { toGeoJSON } from './gpx';
import { GeoJSONService } from 'src/app/core/services/geojson/geojson.service';
import { GeoJSONItem } from 'src/app/core/services/geojson/geojson-item.model';
import { generateShortRandomId } from './utils';
import { DatePipe } from '@angular/common';

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
  ],
})
/** Side som viser planer og sporfiler */
export class PlansPage implements OnInit {
  private geoJSON = inject(GeoJSONService);
  showImportmessage = signal<boolean>(false);

  items = this.geoJSON.metadata;
  sortValue = signal<'name' | 'date'>('date');

  ngOnInit() {
    this.sort(this.sortValue());
  }
  /**
   * Log GPX filenames when files are dropped in the dropzone
   */
  async onFileDrop(files: NgxFileDropEntry[]) {
    for (const { fileEntry, relativePath } of files) {
      const geojson = await toGeoJSON(fileEntry);
      const metadata: GeoJSONItem = { id: generateShortRandomId(), name: relativePath, date: Date.now() };
      await this.geoJSON.save(metadata, geojson);
    }
  }

  /**
   * Sorterer basert på navn, alfabetisk
   */
  sortByName() {
    this.items.set(
      this.items()
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
    );
  }

  /**
   * Sorterer basert på dato, nyeste først
   */
  sortByDate() {
    this.items.set(
      this.items()
        .slice()
        .sort((a, b) => {
          if (a.date && b.date) {
            return b.date - a.date;
          }
          if (!a.date && !b.date) {
            return 0;
          }
          return a.date ? -1 : 1;
        })
    );
  }

  /**
   * Sorterer basert på valgt verdi
   * @param value 'name' | 'date'
   */
  sort(value: 'name' | 'date') {
    if (value === 'name') {
      this.sortByName();
    } else {
      this.sortByDate();
    }
  }

  /**
   * Hånderer sorting når bruker endrer valg i select
   */
  onSortChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const value = select.value as 'name' | 'date';
    this.sortValue.set(value);
    this.sort(value);
  }
}
