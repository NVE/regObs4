import { TestBed } from '@angular/core/testing';

import { AppModeService } from './app-mode.service';

xdescribe('AppModeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppModeService = TestBed.get(AppModeService);
    expect(service).toBeTruthy();
  });
});
