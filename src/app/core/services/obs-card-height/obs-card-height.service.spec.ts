import { TestBed } from '@angular/core/testing';

import { ObsCardHeightService } from './obs-card-height.service';

describe('ObsCardHeightService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObsCardHeightService = TestBed.get(ObsCardHeightService);
    expect(service).toBeTruthy();
  });
});
