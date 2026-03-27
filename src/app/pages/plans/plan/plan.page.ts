import {
  Component,
  inject,
  input,
  CUSTOM_ELEMENTS_SCHEMA,
  computed,
  linkedSignal,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
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
import 'nve-designsystem/components/nve-tag/nve-tag.component.js';
import 'nve-designsystem/components/nve-switch/nve-switch.component.js';
import { TranslatePipe } from '@ngx-translate/core';
import { NavigationEnd, Router } from '@angular/router';
import { HeaderColorDirective } from 'src/app/modules/shared/directives/header-color/header-color.directive';
import L from 'leaflet';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { settings } from 'src/settings';
import {
  MapLayersService,
  OfflineCapableMapLayersService,
} from 'src/app/modules/static-map-image/static-tiles.service';
import { GeoJSONItem } from 'src/app/core/services/geojson/geojson-item.model';
import { MapService } from 'src/app/modules/map/services/map/map.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { delay, filter } from 'rxjs';
import { getGeoJsonFeatureStyle, createGeoJsonPointMarker } from '../geojson-styles';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';

const DEBUG_TAG = 'PlanPage';

@Component({
  selector: 'app-plan.page',
  templateUrl: './plan.page.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    DatePipe,
    HeaderColorDirective,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    LeafletModule,
    TranslatePipe,
  ],
  providers: [
    {
      provide: MapLayersService,
      useClass: isPlatform('hybrid') ? OfflineCapableMapLayersService : MapLayersService,
    },
  ],
  styleUrl: './plan.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanPage {
  geoJSON = inject(GeoJSONService);
  private mapLayersService = inject(MapLayersService);
  router = inject(Router);
  private mapService = inject(MapService);
  private logger = inject(LoggingService);

  id = input.required<string>();

  itemMetadata = computed<GeoJSONItem>(
    () => this.geoJSON.metadata().find((m) => m.id === this.id()) || { id: this.id(), date: Date.now(), name: '' }
  );

  name = linkedSignal<string>(() => this.itemMetadata().name);
  comment = linkedSignal<string>(() => this.itemMetadata().comment || '');
  visibleOnMap = computed(() => this.itemMetadata().visibleOnMap || false);
  isEditMode = signal(false);
  isEditable = computed(() => !this.isEditMode());

  private bounds = signal<L.LatLngBounds | undefined>(undefined);
  hasBounds = computed(() => this.bounds() !== undefined);

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
      minZoom: 2,
      bounceAtZoomLimits: false,
      attributionControl: false,
      zoomControl: false,
      layers,
    };
    return mapSettings;
  });

  map?: L.Map;

  constructor() {
    // Hvis man har hatt denne siden åpen og navigert bort feks med "Gå til kartutsnitt"-knappen,
    // deretter bruker browser til å navigere tilbake til plan-siden igjen, så vises ikke kartet riktig.
    // Ved å kalle invalidateSize oppdateres kartutsnittet til å vises riktig igjen.
    this.router.events
      .pipe(
        takeUntilDestroyed(),
        filter((e) => e instanceof NavigationEnd),
        delay(100)
      )
      .subscribe(() => {
        if (this.map) {
          this.map.invalidateSize();
        }
      });
  }

  private async calculateAndCenterMap(map: L.Map) {
    const geoJSON = await this.geoJSON.get(this.id());
    if (!geoJSON) {
      this.logger.error(null, DEBUG_TAG, 'Could not load geojson', { id: this.id() });
      return;
    }

    const geoJsonLayer = L.geoJSON(geoJSON, {
      style: getGeoJsonFeatureStyle,
      pointToLayer: (_, latlng) => createGeoJsonPointMarker(latlng),
    });

    const bounds = geoJsonLayer.getBounds();
    if (bounds && bounds.isValid()) {
      this.bounds.set(bounds);
      geoJsonLayer.addTo(map);
      map.fitBounds(bounds, { padding: [5, 5] });
    } else {
      let bbString;
      try {
        bbString = bounds.toBBoxString();
      } catch (error) {
        // Pass - Dette virker sikkert ikke om bounds ikke er gyldig ?
      }
      this.logger.error(null, DEBUG_TAG, 'Invalid bounds', { id: this.id(), bbString });
    }
  }

  onMapReady(map: L.Map) {
    this.map = map;
    this.calculateAndCenterMap(map);
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
    this.geoJSON.updateMetadata({ ...this.itemMetadata(), visibleOnMap: checked });
  }

  async onRemove() {
    await this.geoJSON.remove(this.id());
    this.router.navigate(['/plans']);
  }

  onSave(event: SubmitEvent) {
    event.preventDefault();

    const itemToUpdate = {
      id: this.id(),
      name: this.name(),
      comment: this.comment(),
      visibleOnMap: this.visibleOnMap(),
      lengthKm: this.itemMetadata()?.lengthKm,
      date: Date.now(),
    };
    this.geoJSON.updateMetadata(itemToUpdate);
    this.isEditMode.set(false);
  }

  goToExtent() {
    const bounds = this.bounds();
    if (!bounds) {
      return;
    }

    this.mapService.requestMapViewChange({ bounds, center: bounds.getCenter() });
    // La kartet få mulighet til å lytte og oppdatere kartutsnittet før vi navigerer
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 200);
  }
}
