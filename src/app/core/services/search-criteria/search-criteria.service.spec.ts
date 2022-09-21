import { TestBed } from '@angular/core/testing';

import { SearchCriteriaService } from './search-criteria.service';

describe('SearchCriteriaService', () => {
  let service: SearchCriteriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchCriteriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
