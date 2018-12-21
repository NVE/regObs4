import { TestBed } from '@angular/core/testing';

import { AppVersionService } from './app-version.service';

describe('AppVersionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppVersionService = TestBed.get(AppVersionService);
    expect(service).toBeTruthy();
  });
});
