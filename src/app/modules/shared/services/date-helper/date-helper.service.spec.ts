import { TestBed } from '@angular/core/testing';

import { DateHelperService } from './date-helper.service';

describe('DateHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DateHelperService = TestBed.get(DateHelperService);
    expect(service).toBeTruthy();
  });
});
