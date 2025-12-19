import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { GeoJSONService } from './geojson.service';
import { DatabaseService } from '../database/database.service';
import { LoggingService } from 'src/app/modules/shared/services/logging/logging.service';
import { FeatureCollection } from 'geojson';
import { GeoJSONItem } from './geojson-item.model';

describe('GeoJSONService', () => {
  let service: GeoJSONService;
  let databaseService: jasmine.SpyObj<DatabaseService>;
  let loggingService: jasmine.SpyObj<LoggingService>;

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
    const databaseServiceSpy = jasmine.createSpyObj('DatabaseService', ['get', 'set', 'remove']);
    const loggingServiceSpy = jasmine.createSpyObj('LoggingService', ['debug', 'error']);

    TestBed.configureTestingModule({
      providers: [
        GeoJSONService,
        { provide: DatabaseService, useValue: databaseServiceSpy },
        { provide: LoggingService, useValue: loggingServiceSpy },
      ],
    });

    databaseService = TestBed.inject(DatabaseService) as jasmine.SpyObj<DatabaseService>;
    loggingService = TestBed.inject(LoggingService) as jasmine.SpyObj<LoggingService>;

    // Default spy returns
    databaseService.get.and.returnValue(Promise.resolve([]));
    databaseService.set.and.returnValue(Promise.resolve());
    databaseService.remove.and.returnValue(Promise.resolve());
  });

  it('should be created', () => {
    service = TestBed.inject(GeoJSONService);
    expect(service).toBeTruthy();
  });

  describe('init', () => {
    it('should load metadata from database on initialization', fakeAsync(() => {
      const existingMetadata: GeoJSONItem[] = [mockMetadataItem];
      databaseService.get.and.returnValue(Promise.resolve(existingMetadata));

      service = TestBed.inject(GeoJSONService);
      tick();

      expect(databaseService.get).toHaveBeenCalledWith('geojson-metadata');
      expect(service.metadata()).toEqual(existingMetadata);
    }));

    it('should initialize with empty metadata if none exists', fakeAsync(() => {
      databaseService.get.and.returnValue(Promise.resolve(null));

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
      databaseService.set.calls.reset();
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
      databaseService.set.and.returnValue(Promise.reject(error));

      expectAsync(service.save(mockMetadataItem, mockGeoJSON)).toBeRejectedWith(error);
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
      databaseService.get.and.returnValue(Promise.resolve(mockGeoJSON));

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
      databaseService.set.calls.reset();
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
