import { TestBed } from '@angular/core/testing';

import { DbHelperService } from './db-helper.service';

describe('DbHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DbHelperService = TestBed.get(DbHelperService);
    expect(service).toBeTruthy();
  });
});
