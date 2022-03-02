import { TestBed } from '@angular/core/testing';

import { DraftToRegistrationService } from './draft-to-registration.service';

describe('DraftToRegistrationService', () => {
  let service: DraftToRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DraftToRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
