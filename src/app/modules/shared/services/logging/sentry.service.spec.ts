import { TestBed } from '@angular/core/testing';

import { SentryService } from './sentry.service';

describe('SentryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SentryService = TestBed.get(SentryService);
    expect(service).toBeTruthy();
  });
});
