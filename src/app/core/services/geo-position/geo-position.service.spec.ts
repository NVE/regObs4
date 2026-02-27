import { TestBed } from '@angular/core/testing';

import { GeoPositionService } from './geo-position.service';

describe.skip('GeoPositionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeoPositionService = TestBed.inject(GeoPositionService);
    expect(service).toBeTruthy();
  });
});
