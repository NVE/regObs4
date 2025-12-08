import { Component, inject, input, CUSTOM_ELEMENTS_SCHEMA, computed, linkedSignal, signal } from '@angular/core';
import { IonToolbar, IonContent, IonBackButton, IonTitle, IonHeader, IonButtons } from '@ionic/angular/standalone';
import { GeoJSONService } from 'src/app/core/services/geojson/geojson.service';
import { DatePipe } from '@angular/common';
import 'nve-designsystem/components/nve-icon/nve-icon.component.js';
import 'nve-designsystem/components/nve-menu-item/nve-menu-item.component.js';
import 'nve-designsystem/components/nve-button/nve-button.component.js';
import 'nve-designsystem/components/nve-input/nve-input.component.js';
import 'nve-designsystem/components/nve-textarea/nve-textarea.component.js';
import 'nve-designsystem/components/nve-switch/nve-switch.component.js';
import 'nve-designsystem/components/nve-tag/nve-tag.component.js';
import { TranslatePipe } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plan.page',
  templateUrl: './plan.page.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [DatePipe, IonContent, IonToolbar, IonBackButton, IonTitle, IonHeader, IonButtons, TranslatePipe],
  styleUrl: './plan.page.css',
})
export class PlanPage {
  geoJSON = inject(GeoJSONService);
  router = inject(Router);
  id = input.required<string>();

  itemMetadata = computed(() => this.geoJSON.metadata().find((m) => m.id === this.id()));

  name = linkedSignal<string>(() => this.itemMetadata()?.name || '');
  comment = linkedSignal<string>(() => this.itemMetadata()?.comment || '');
  visibleOnMap = linkedSignal<boolean>(() => this.itemMetadata()?.visibleOnMap || false);
  uploading = signal(false);

  onNameChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.name.set(value);
  }

  onCommentChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.comment.set(value);
  }
  onVisibleOnMapChange(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.visibleOnMap.set(checked);
  }

  async onRemove() {
    if (this.uploading()) return;
    this.uploading.set(true);
    await this.geoJSON.remove(this.id());
    this.uploading.set(false);
    await this.router.navigate(['/plans']);
  }

  async onSave() {
    if (this.uploading()) return;
    const itemToUpdate = {
      id: this.id(),
      name: this.name(),
      comment: this.comment(),
      visibleOnMap: this.visibleOnMap(),
      date: Date.now(),
    };
    this.uploading.set(true);
    await this.geoJSON.updateMetadata(itemToUpdate);
    this.uploading.set(false);
  }
}
