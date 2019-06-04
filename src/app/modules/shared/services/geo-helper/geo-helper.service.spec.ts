import { TestBed } from '@angular/core/testing';

import { GeoHelperService } from './geo-helper.service';

describe('GeoHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeoHelperService = TestBed.get(GeoHelperService);
    expect(service).toBeTruthy();
  });
});
