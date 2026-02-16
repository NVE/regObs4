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

const alertDismissedKey = 'regobs-plans-alert-dismissed';

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

  private allowedFileExtensions = ['.gpx', '.geojson', '.json'];

  // Ikke alle Android-telefoner håndterer spesifikke filtyper, så vi tillater alle på mobile plattformer
  acceptFileTypes = Capacitor.isNativePlatform() ? '*' : this.allowedFileExtensions.join(',');

  isMobile = this.platform.is('mobile') || this.platform.is('android') || this.platform.is('ios');
  showAlert = signal(!localStorage.getItem(alertDismissedKey));

  sortValue = signal<'name' | 'date'>('date');
  visibilityFilter = signal<'all' | 'onlyVisibleOnMap'>('all');
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
    localStorage.setItem(alertDismissedKey, 'true');
  }

  /**
   * Importerer og lagrer sporfiler som GeoJSON-objekter i lokal database
   */
  async onFileDrop(files: NgxFileDropEntry[]) {
    const ignoredFiles: string[] = [];

    for (const { fileEntry, relativePath } of files) {
      if (fileEntry.isFile && this.validateFileExtension(relativePath)) {
        const geojson = await toGeoJSON(fileEntry);
        const id = generateShortRandomId();
        const metadata: GeoJSONItem = { id, name: relativePath, date: Date.now(), visibleOnMap: true };
        await this.geoJSON.save(metadata, geojson);
        // Åpne detaljsiden kun når en fil er lastet opp.
        if (files.length === 1) {
          this.router.navigate(['/plans', id]);
        }
      } else {
        ignoredFiles.push(relativePath);
      }
    }
    if (ignoredFiles.length > 0) {
      this.showFileTypeError(ignoredFiles);
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
  private async showFileTypeError(filenames: string[]): Promise<void> {
    const message = this.translateService.instant('PLANS.WRONG_FILE_TYPE', {
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
