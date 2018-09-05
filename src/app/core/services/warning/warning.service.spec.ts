import { TestBed, inject } from '@angular/core/testing';

import { WarningService } from './warning.service';

describe('WarningService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WarningService]
    });
  });

  it('should be created', inject([WarningService], (service: WarningService) => {
    expect(service).toBeTruthy();
  }));
});
