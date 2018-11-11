import { TestBed } from '@angular/core/testing';

import { SummaryItemService } from './summary-item.service';

describe('SummaryItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SummaryItemService = TestBed.get(SummaryItemService);
    expect(service).toBeTruthy();
  });
});
