import { TestBed } from '@angular/core/testing';

import { PostOrDeleteRegistrationService } from './post-delete-registration.service';

describe('PostOrDeleteRegistrationService', () => {
  let service: PostOrDeleteRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostOrDeleteRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
