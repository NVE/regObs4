import { TestBed } from '@angular/core/testing';

import { AppResetService } from './app-reset.service';

describe('AppResetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppResetService = TestBed.get(AppResetService);
    expect(service).toBeTruthy();
  });
});
