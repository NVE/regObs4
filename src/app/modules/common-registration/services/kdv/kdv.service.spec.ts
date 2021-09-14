import { TestBed } from '@angular/core/testing';

import { KdvService } from './kdv.service';

xdescribe('KdvService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KdvService = TestBed.get(KdvService);
    expect(service).toBeTruthy();
  });
});
