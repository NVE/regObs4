import { Component, inject, input, CUSTOM_ELEMENTS_SCHEMA, computed, linkedSignal } from '@angular/core';
import {
  IonToolbar,
  IonContent,
  IonBackButton,
  IonTitle,
  IonHeader,
  IonButtons,
  isPlatform,
} from '@ionic/angular/standalone';
import { GeoJSONService } from 'src/app/core/services/geojson/geojson.service';
import { DatePipe } from '@angular/common';
import 'nve-designsystem/components/nve-icon/nve-icon.component.js';
import 'nve-designsystem/components/nve-menu-item/nve-menu-item.component.js';
import 'nve-designsystem/components/nve-button/nve-button.component.js';
import 'nve-designsystem/components/nve-input/nve-input.component.js';
import 'nve-designsystem/components/nve-textarea/nve-textarea.component.js';
import 'nve-designsystem/components/nve-checkbox/nve-checkbox.component.js';
import 'nve-designsystem/components/nve-tag/nve-tag.component.js';
import { TranslatePipe } from '@ngx-translate/core';
import { Router } from '@angular/router';
import L from 'leaflet';
import { LineString, Point } from 'geojson';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { settings } from 'src/settings';
import {
  MapLayersService,
  OfflineCapableMapLayersService,
} from 'src/app/modules/static-map-image/static-tiles.service';

@Component({
  selector: 'app-plan.page',
  templateUrl: './plan.page.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    DatePipe,
    IonContent,
    IonToolbar,
    IonBackButton,
    IonTitle,
    IonHeader,
    IonButtons,
    TranslatePipe,
    LeafletModule,
  ],
  providers: [
    {
      provide: MapLayersService,
      useClass: isPlatform('hybrid') ? OfflineCapableMapLayersService : MapLayersService,
    },
  ],
  styleUrl: './plan.page.css',
})
export class PlanPage {
  geoJSONService = inject(GeoJSONService);
  private mapLayersService = inject(MapLayersService);
  router = inject(Router);
  id = input.required<string>();
  private map?: L.Map;

  private layerGroup = L.layerGroup();

  itemMetadata = computed(() => this.geoJSONService.metadata().find((m) => m.id === this.id()));

  name = linkedSignal<string>(() => this.itemMetadata()?.name || '');
  comment = linkedSignal<string>(() => this.itemMetadata()?.comment || '');
  visibleOnMap = linkedSignal<boolean>(() => this.itemMetadata()?.visibleOnMap || false);

  mapOptions = computed(() => {
    const mapConfig = this.mapLayersService.mapConfig();
    const layersConfig = mapConfig.map((map) => ({
      layerId: map.layer,
      layerConfig: settings.map.tiles.topoMapLayers[map.layer],
    }));
    const layers = layersConfig.map((x) =>
      L.tileLayer(x.layerConfig.url, {
        minZoom: settings.map.tiles.minZoom,
        maxZoom: settings.map.tiles.maxZoom,
        updateWhenIdle: settings.map.tiles.updateWhenIdle,
        ...x.layerConfig.options,
      })
    );
    const mapSettings: L.MapOptions = {
      zoom: settings.map.tiles.zoomLevelObservationList,
      maxZoom: settings.map.tiles.maxZoom,
      minZoom: 8,
      bounceAtZoomLimits: false,
      attributionControl: false,
      zoomControl: false,
      layers,
    };
    return mapSettings;
  });

  async calculateAndCenterMap() {
    const geoJSON = await this.geoJSONService.get(this.id());

    if (!geoJSON || !this.map) return;

    this.layerGroup.clearLayers();
    const geoJsonLayer = L.geoJSON(geoJSON);
    this.layerGroup.addLayer(geoJsonLayer);

    if (!this.map.hasLayer(this.layerGroup)) {
      this.layerGroup.addTo(this.map);
    }

    const lineFeatures = geoJSON.features.map((f) => {
      if (f.geometry && f.geometry.type === 'LineString') {
        return f.geometry as LineString;
      }
      return null;
    });
    const pointFeatures = geoJSON.features.map((f) => {
      if (f.geometry && f.geometry.type === 'Point') {
        return f.geometry as Point;
      }
      return null;
    });

    const lineCoords: [number, number][] = lineFeatures
      .filter((f): f is LineString => f !== null)
      .flatMap((f) => f.coordinates as [number, number][]);

    const pointCoords: [number, number][] = pointFeatures
      .filter((f): f is Point => f !== null)
      .map((f) => f.coordinates as [number, number]);

    const flatCoords: [number, number][] = [...lineCoords, ...pointCoords];

    const latLngs = flatCoords.map(([lng, lat]) => L.latLng(lat, lng));

    this.map.fitBounds(L.latLngBounds(latLngs), { padding: [5, 5] });
  }

  onMapReady(map: L.Map) {
    this.map = map;
    this.calculateAndCenterMap();
  }

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
    await this.geoJSONService.remove(this.id());
    await this.router.navigate(['/plans']);
  }

  async onSave() {
    const itemToUpdate = {
      id: this.id(),
      name: this.name(),
      comment: this.comment(),
      visibleOnMap: this.visibleOnMap(),
      lengthKm: this.itemMetadata()?.lengthKm,
      date: Date.now(),
    };
    this.geoJSONService.updateMetadata(itemToUpdate);
    await this.router.navigate(['/plans']);
  }
}
