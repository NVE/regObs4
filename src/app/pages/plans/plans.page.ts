import { Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { ChangeDetectionStrategy, Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonRouterLinkWithHref,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import 'nve-designsystem/components/nve-button/nve-button.component.js';
import 'nve-designsystem/components/nve-menu/nve-menu.component.js';
import 'nve-designsystem/components/nve-menu-item/nve-menu-item.component.js';
import 'nve-designsystem/components/nve-divider/nve-divider.component.js';
import 'nve-designsystem/components/nve-badge/nve-badge.component.js';
import 'nve-designsystem/components/nve-select/nve-select.component.js';
import 'nve-designsystem/components/nve-option/nve-option.component.js';
import 'nve-designsystem/components/nve-icon/nve-icon.component.js';
import 'nve-designsystem/components/nve-label/nve-label.component.js';
import 'nve-designsystem/components/nve-alert/nve-alert.component.js';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { toGeoJSON } from './utils';
import { GeoJSONService } from 'src/app/core/services/geojson/geojson.service';
import { GeoJSONItem } from 'src/app/core/services/geojson/geojson-item.model';
import { generateShortRandomId } from './utils';
import { DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { HeaderColorDirective } from 'src/app/modules/shared/directives/header-color/header-color.directive';
import { attachOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';

const DEBUG_TAG = 'plans';
let showAlert = true;

@Component({
  selector: 'app-plans',
  templateUrl: './plans.page.html',
  styleUrl: './plans.page.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePipe,
    HeaderColorDirective,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonRouterLinkWithHref,
    IonTitle,
    IonToolbar,
    NgxFileDropModule,
    RouterLink,
    TranslatePipe,
  ],
})
/** Side som viser planer og sporfiler */
export class PlansPage {
  private platform = inject(Platform);
  private router = inject(Router);
  private geoJSON = inject(GeoJSONService);
  private toastController = inject(ToastController);
  private translateService = inject(TranslateService);
  private logger = inject(LoggingService);

  private allowedFileExtensions = ['.gpx', '.geojson', '.json'];

  // Ikke alle Android-telefoner håndterer spesifikke filtyper, så vi tillater alle på mobile plattformer
  acceptFileTypes = Capacitor.isNativePlatform() ? '*' : this.allowedFileExtensions.join(',');

  isMobile = this.platform.is('mobile') || this.platform.is('android') || this.platform.is('ios');
  showAlert = signal(showAlert);

  sortValue = signal<'name' | 'date'>('date');
  visibilityFilter = signal<'all' | 'onlyVisibleOnMap'>('all');
  numberOfPlans = computed(() => this.geoJSON.metadata().length);
  items = computed(() => {
    const sorter = sortFunctions[this.sortValue()];
    const sortedItems = sorter(this.geoJSON.metadata());
    if (this.visibilityFilter() === 'onlyVisibleOnMap') {
      return sortedItems.filter((item) => item.visibleOnMap);
    }
    return sortedItems;
  });

  constructor() {
    addIcons({ attachOutline });
  }

  dismissAlert() {
    showAlert = false;
    this.showAlert.set(false);
  }

  /**
   * Importerer og lagrer sporfiler som GeoJSON-objekter i lokal database
   */
  async onFileDrop(files: NgxFileDropEntry[]) {
    const ignoredOrFailedFiles: string[] = [];

    let lastId: string | undefined;
    for (const { fileEntry, relativePath } of files) {
      if (fileEntry.isFile && this.validateFileExtension(relativePath)) {
        let geojson;
        try {
          geojson = await toGeoJSON(fileEntry);
        } catch (error) {
          this.logger.error(error, DEBUG_TAG, 'Parse file error', { relativePath });
          ignoredOrFailedFiles.push(relativePath);
          continue;
        }

        const id = generateShortRandomId();
        lastId = id;
        const metadata: GeoJSONItem = { id, name: relativePath, date: Date.now(), visibleOnMap: true };
        try {
          await this.geoJSON.save(metadata, geojson);
        } catch (error) {
          this.logger.error(error, DEBUG_TAG, 'Save error', { metadata });
          ignoredOrFailedFiles.push(relativePath);
        }
      } else {
        ignoredOrFailedFiles.push(relativePath);
      }
    }

    if (ignoredOrFailedFiles.length > 0) {
      this.showUploadError(ignoredOrFailedFiles);
    } else if (files.length === 1 && lastId) {
      // Åpne detaljsiden kun når kun EN fil er lastet opp.
      this.router.navigate(['/plans', lastId]);
    }
  }

  private validateFileExtension(filename: string): boolean {
    const extMatch = filename.toLowerCase().match(/(\.[a-z0-9]+)$/);
    const ext = extMatch ? extMatch[1] : '';
    return this.allowedFileExtensions.includes(ext);
  }

  /**
   * Viser feilmelding til brukeren når filtype ikke er tillatt
   */
  private async showUploadError(filenames: string[]): Promise<void> {
    const message = this.translateService.instant('PLANS.UPLOAD_FAILED', {
      filenames: filenames.join(', '),
      allowedFileExtensions: this.allowedFileExtensions.join(', '),
    });
    const toast = await this.toastController.create({
      message,
      duration: 5000,
      color: 'danger',
      position: 'bottom',
      mode: 'md',
    });
    toast.present();
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
