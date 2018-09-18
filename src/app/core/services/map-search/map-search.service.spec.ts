import { TestBed } from '@angular/core/testing';

import { MapSearchService } from './map-search.service';

describe('MapSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapSearchService = TestBed.get(MapSearchService);
    expect(service).toBeTruthy();
  });
});
