import { Platform } from '@ionic/angular';
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { IonButtons, IonMenuButton, IonTitle } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { HeaderComponent } from 'src/app/modules/shared/components/header/header.component';
import 'nve-designsystem/components/nve-button/nve-button.component.js';
import 'nve-designsystem/components/nve-icon/nve-icon.component.js';
import 'nve-designsystem/components/nve-message-card/nve-message-card.component.js';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { toGeoJSON } from './utils';
import { GeoJSONService } from 'src/app/core/services/geojson/geojson.service';
import { GeoJSONItem } from 'src/app/core/services/geojson/geojson-item.model';
import { generateShortRandomId } from './utils';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.page.html',
  styleUrl: './plans.page.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HeaderComponent, IonButtons, IonMenuButton, IonTitle, TranslatePipe, TranslatePipe, NgxFileDropModule],
})
/** Side som viser planer og sporfiler */
export class PlansPage {
  private platform = inject(Platform);
  private geoJSON = inject(GeoJSONService);

  isMobile = this.platform.is('mobile') || this.platform.is('android') || this.platform.is('ios');
  items = this.geoJSON.metadata;

  /**
   * Log GPX filenames when files are dropped in the dropzone
   */
  async onFileDrop(files: NgxFileDropEntry[]) {
    for (const { fileEntry, relativePath } of files) {
      const geojson = await toGeoJSON(fileEntry);
      const metadata: GeoJSONItem = {
        id: generateShortRandomId(),
        name: relativePath,
        date: Date.now(),
      };
      await this.geoJSON.save(metadata, geojson);
    }
  }
}
