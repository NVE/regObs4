import { TestBed } from '@angular/core/testing';

import { RegistrationRepositoryService } from './registration-repository.service';

xdescribe('RegistrationRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistrationRepositoryService = TestBed.get(RegistrationRepositoryService);
    expect(service).toBeTruthy();
  });
});
