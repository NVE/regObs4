import { Injectable, effect, inject, signal } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import { GeoJSONItem } from './geojson-item.model';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { cleanFeatureCollection } from 'src/app/pages/plans/geojson';
import { length } from '@turf/turf';
import { Subject } from 'rxjs';

const DEBUG_TAG = 'GeoJSON';

@Injectable({
  providedIn: 'root',
})
export class GeoJSONService {
  private db = inject(DatabaseService);
  private logger = inject(LoggingService);
  private initialized = false;
  private metadata_ = signal<GeoJSONItem[]>([]);
  private changedMetadataItem = new Subject<GeoJSONItem>();
  private removedMetadataItemId = new Subject<string>();

  /** Metadata for alle lagrede spor */
  metadata = this.metadata_.asReadonly();

  /** Lytt på denne for å få beskjed om nye eller endrede spor */
  changedMetadataItem$ = this.changedMetadataItem.asObservable();

  /** Lytt på denne for å få beskjed om slettede spor */
  removedMetadataItemId$ = this.removedMetadataItemId.asObservable();

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
      this.metadata_.set(items);
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
   * Kalkulerer lengden av LineString features i et GeoJSON objekt
   * @param geojson
   * @returns lengde i kilometer
   */
  private calculateLengthKm(geojson: Feature<Geometry, GeoJsonProperties>[]): number {
    return geojson.reduce((sum, feature) => sum + length(feature), 0);
  }

  /**
   * Updates metadata for a given item
   * @param item the geojson item to update
   */
  updateMetadata(item: GeoJSONItem) {
    this.metadata_.update((items) => {
      const other = items.filter((x) => x.id !== item.id);
      return [...other, item];
    });
    this.changedMetadataItem.next(item);
  }

  /**
   * Save a geojson object with a given id
   * @param metadata metadata for the geojson
   * @param geojson geojson object
   */
  async save(metadata: GeoJSONItem, geojson: FeatureCollection): Promise<void> {
    this.logger.debug('Save', DEBUG_TAG, { metadata });
    try {
      cleanFeatureCollection(geojson);
    } catch (error) {
      this.logger.error(error, DEBUG_TAG, 'Error in cleaning process, but object may be mutated - half cleaned');
    }

    try {
      const lineFeatures = geojson.features.filter((f) => f.geometry.type === 'LineString');

      if (lineFeatures.length) {
        const lengthKm = this.calculateLengthKm(lineFeatures);
        metadata.lengthKm = lengthKm;
      }

      await this.db.set(`geojson:${metadata.id}`, geojson);
      this.metadata_.update((items) => [...items, metadata]);
      this.changedMetadataItem.next(metadata);
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
    this.metadata_.update((items) => items.filter((item) => item.id !== id));
    this.removedMetadataItemId.next(id);
  }
}
