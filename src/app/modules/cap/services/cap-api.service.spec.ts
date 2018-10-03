import { TestBed } from '@angular/core/testing';

import { CapApiService } from './cap-api.service';

describe('CapApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CapApiService = TestBed.get(CapApiService);
    expect(service).toBeTruthy();
  });
});
