import { TestBed } from '@angular/core/testing';

import { KdvService } from './kdv.service';

describe.skip('KdvService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KdvService = TestBed.inject(KdvService);
    expect(service).toBeTruthy();
  });
});
