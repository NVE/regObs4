import { TestBed } from '@angular/core/testing';

import { OfflineDbService } from './offline-db.service';

xdescribe('OfflineDbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OfflineDbService = TestBed.get(OfflineDbService);
    expect(service).toBeTruthy();
  });
});
