import { TestBed } from '@angular/core/testing';

import { DataLoadService } from './data-load.service';

describe('DataLoadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataLoadService = TestBed.get(DataLoadService);
    expect(service).toBeTruthy();
  });
});
