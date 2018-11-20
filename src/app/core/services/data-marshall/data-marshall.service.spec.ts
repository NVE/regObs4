import { TestBed } from '@angular/core/testing';

import { DataMarshallService } from './data-marshall.service';

describe('DataMarshallService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataMarshallService = TestBed.get(DataMarshallService);
    expect(service).toBeTruthy();
  });
});
