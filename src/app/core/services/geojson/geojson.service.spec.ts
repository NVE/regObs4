import type { MockedObject } from 'vitest';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { GeoJSONService } from './geojson.service';
import { DatabaseService } from '../database/database.service';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { FeatureCollection } from 'geojson';
import { GeoJSONItem } from './geojson-item.model';

describe('GeoJSONService', () => {
  let service: GeoJSONService;
  let databaseService: MockedObject<DatabaseService>;
  let loggingService: MockedObject<LoggingService>;

  const mockGeoJSON: FeatureCollection = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [10.0, 60.0],
        },
        properties: {
          name: 'Test Point',
        },
      },
    ],
  };

  const mockMetadataItem: GeoJSONItem = {
    id: 'test-id-1',
    name: 'Test GeoJSON',
    date: new Date().getTime(),
  };

  beforeEach(() => {
    const databaseServiceSpy = {
      get: vi.fn().mockName('DatabaseService.get'),
      set: vi.fn().mockName('DatabaseService.set'),
      remove: vi.fn().mockName('DatabaseService.remove'),
    };
    const loggingServiceSpy = {
      debug: vi.fn().mockName('LoggingService.debug'),
      error: vi.fn().mockName('LoggingService.error'),
    };

    TestBed.configureTestingModule({
      providers: [
        GeoJSONService,
        { provide: DatabaseService, useValue: databaseServiceSpy },
        { provide: LoggingService, useValue: loggingServiceSpy },
      ],
    });

    databaseService = TestBed.inject(DatabaseService) as MockedObject<DatabaseService>;
    loggingService = TestBed.inject(LoggingService) as MockedObject<LoggingService>;

    // Default spy returns
    databaseService.get.mockReturnValue(Promise.resolve([]));
    databaseService.set.mockReturnValue(Promise.resolve());
    databaseService.remove.mockReturnValue(Promise.resolve());
  });

  it('should be created', () => {
    service = TestBed.inject(GeoJSONService);
    expect(service).toBeTruthy();
  });

  describe('init', () => {
    it('should load metadata from database on initialization', fakeAsync(() => {
      const existingMetadata: GeoJSONItem[] = [mockMetadataItem];
      databaseService.get.mockReturnValue(Promise.resolve(existingMetadata));

      service = TestBed.inject(GeoJSONService);
      tick();

      expect(databaseService.get).toHaveBeenCalledWith('geojson-metadata');
      expect(service.metadata()).toEqual(existingMetadata);
    }));

    it('should initialize with empty metadata if none exists', fakeAsync(() => {
      databaseService.get.mockReturnValue(Promise.resolve(null));

      service = TestBed.inject(GeoJSONService);
      tick();

      expect(service.metadata()).toEqual([]);
    }));
  });

  describe('save', () => {
    beforeEach(fakeAsync(() => {
      service = TestBed.inject(GeoJSONService);
      tick(); // Complete initialization
      tick(); // Allow effect to run
      databaseService.set.mockClear();
    }));

    it('should save geojson and update metadata', fakeAsync(() => {
      service.save(mockMetadataItem, mockGeoJSON);
      tick();

      expect(databaseService.set).toHaveBeenCalledWith(`geojson:${mockMetadataItem.id}`, mockGeoJSON);
      expect(service.metadata()).toContain(mockMetadataItem);
    }));

    it('should save metadata after adding item', fakeAsync(() => {
      service.save(mockMetadataItem, mockGeoJSON);
      tick();
      tick(); // Allow effect to trigger

      expect(databaseService.set).toHaveBeenCalledWith('geojson-metadata', [mockMetadataItem]);
    }));

    it('should emit changed metadata item', fakeAsync(() => {
      let emittedMetadata: GeoJSONItem | undefined;
      service.changedMetadataItem$.subscribe((metadata) => (emittedMetadata = metadata));

      service.save(mockMetadataItem, mockGeoJSON);
      tick();

      expect(emittedMetadata).toEqual(mockMetadataItem);
    }));

    it('should throw error if save fails', fakeAsync(() => {
      const error = new Error('Save failed');
      databaseService.set.mockReturnValue(Promise.reject(error));

      expect(service.save(mockMetadataItem, mockGeoJSON)).rejects.toEqual(error);
      tick();

      expect(loggingService.error).toHaveBeenCalled();
    }));
  });

  describe('get', () => {
    beforeEach(fakeAsync(() => {
      service = TestBed.inject(GeoJSONService);
      tick();
    }));

    it('should retrieve geojson by id', fakeAsync(() => {
      databaseService.get.mockReturnValue(Promise.resolve(mockGeoJSON));

      service.get(mockMetadataItem.id).then((result) => {
        expect(result).toEqual(mockGeoJSON);
      });
      tick();

      expect(databaseService.get).toHaveBeenCalledWith(`geojson:${mockMetadataItem.id}`);
    }));
  });

  describe('remove', () => {
    beforeEach(fakeAsync(() => {
      service = TestBed.inject(GeoJSONService);
      tick();
      // Add an item first
      service.save(mockMetadataItem, mockGeoJSON);
      tick();
      databaseService.set.mockClear();
    }));

    it('should remove geojson and update metadata', fakeAsync(() => {
      service.remove(mockMetadataItem.id);
      tick();

      expect(databaseService.remove).toHaveBeenCalledWith(`geojson:${mockMetadataItem.id}`);
      expect(service.metadata()).not.toContain(mockMetadataItem);
    }));

    it('should emit removed id', fakeAsync(() => {
      let emittedId: string | undefined;
      service.removedMetadataItemId$.subscribe((id) => (emittedId = id));

      service.remove(mockMetadataItem.id);
      tick();

      expect(emittedId).toBe(mockMetadataItem.id);
    }));

    it('should save updated metadata after removal', fakeAsync(() => {
      service.remove(mockMetadataItem.id);
      tick();
      tick(); // Allow effect to trigger

      expect(databaseService.set).toHaveBeenCalledWith('geojson-metadata', []);
    }));
  });

  describe('changedMetadataItem$', () => {
    beforeEach(fakeAsync(() => {
      service = TestBed.inject(GeoJSONService);
      tick();
    }));

    it('should emit metadata changes', fakeAsync(() => {
      const emittedValues: GeoJSONItem[] = [];
      service.changedMetadataItem$.subscribe((metadata) => emittedValues.push(metadata));

      service.updateMetadata(mockMetadataItem);
      tick();

      expect(emittedValues[emittedValues.length - 1]).toEqual(mockMetadataItem);
    }));
  });
});
