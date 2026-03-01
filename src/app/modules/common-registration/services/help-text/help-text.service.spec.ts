import { TestBed } from '@angular/core/testing';

import { HelpTextService } from './help-text.service';

xdescribe('HelpTextService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HelpTextService = TestBed.inject(HelpTextService);
    expect(service).toBeTruthy();
  });
});
