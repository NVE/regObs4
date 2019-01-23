import { TestBed } from '@angular/core/testing';

import { AnalyticService } from './analytic.service';

describe('AnalyticService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnalyticService = TestBed.get(AnalyticService);
    expect(service).toBeTruthy();
  });
});
