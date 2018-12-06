import { TestBed } from '@angular/core/testing';

import { FullscreenService } from './fullscreen.service';

describe('FullscreenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FullscreenService = TestBed.get(FullscreenService);
    expect(service).toBeTruthy();
  });
});
