import { Injectable, effect, inject, signal } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import { FeatureCollection } from 'geojson';
import { GeoJSONItem } from './geojson-item.model';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { cleanFeatureCollection } from 'src/app/pages/plans/geojson';

const DEBUG_TAG = 'GeoJSON';

@Injectable({
  providedIn: 'root',
})
export class GeoJSONService {
  private db = inject(DatabaseService);
  private logger = inject(LoggingService);

  metadata = signal<GeoJSONItem[]>([]);
  readonly metadata$ = toObservable(this.metadata);
  private initialized = false;

  constructor() {
    this.init();

    effect(() => {
      const metadata = this.metadata();
      if (!this.initialized) return;
      this.saveMetadata(metadata);
    });
  }

  private async init() {
    this.logger.debug('Init', DEBUG_TAG);
    const items = await this.getMetadata();
    if (items && items.length > 0) {
      this.metadata.set(items);
    }
    setTimeout(() => (this.initialized = true)); // For å unngå en første unødvendig lagring i effecten
  }

  private async saveMetadata(items: GeoJSONItem[]) {
    this.logger.debug('Saving metadata', DEBUG_TAG, { n: items.length });
    await this.db.set('geojson-metadata', items);
  }

  private getMetadata() {
    this.logger.debug('Reading metadata', DEBUG_TAG);
    return this.db.get<GeoJSONItem[]>('geojson-metadata');
  }

  /**
   * Save a geojson object with a given id
   * @param id unique id for the geojson
   * @param geojson the geojson object
   */
  async save(metadata: GeoJSONItem, geojson: FeatureCollection): Promise<void> {
    this.logger.debug('Save', DEBUG_TAG, { metadata });
    try {
      cleanFeatureCollection(geojson);
    } catch (error) {
      this.logger.error(error, DEBUG_TAG, 'Error in cleaning process, but object may be mutated - half cleaned');
    }

    try {
      await this.db.set(`geojson:${metadata.id}`, geojson);
      this.metadata.update((items) => [...items, metadata]);
    } catch (error) {
      this.logger.error(error, DEBUG_TAG, 'Could not save', { metadata, geojson });
      throw error;
    }
  }

  /**
   * Get a geojson object by id
   * @param id unique id for the geojson
   */
  async get(id: GeoJSONItem['id']): Promise<FeatureCollection> {
    this.logger.debug('Get', DEBUG_TAG, { id });
    return this.db.get<FeatureCollection>(`geojson:${id}`);
  }

  /**
   * Remove a geojson object by id
   * @param id unique id for the geojson
   */
  async remove(id: GeoJSONItem['id']): Promise<void> {
    this.logger.debug('Remove', DEBUG_TAG, { id });
    await this.db.remove(`geojson:${id}`);
    this.metadata.update((items) => items.filter((item) => item.id !== id));
  }

  /**
   * List all geojson ids
   */
  // async listIds(): Promise<GeoJSONItem['id'][]> {
  //   const keys = await this.db.keys();
  //   return keys.filter((k) => k.startsWith('geojson:')).map((k) => k.replace('geojson:', ''));
  // }
}
