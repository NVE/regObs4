import { TestBed } from '@angular/core/testing';

import { RegobsAuthService } from './regobs-auth.service';

describe('RegobsAuthService', () => {
  let service: RegobsAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegobsAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
