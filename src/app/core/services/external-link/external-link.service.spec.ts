import { TestBed } from '@angular/core/testing';

import { ExternalLinkService } from './external-link.service';

describe('ExternalLinkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExternalLinkService = TestBed.get(ExternalLinkService);
    expect(service).toBeTruthy();
  });
});
