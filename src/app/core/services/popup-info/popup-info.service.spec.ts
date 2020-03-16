import { TestBed } from '@angular/core/testing';

import { PopupInfoService } from './popup-info.service';
import { TestModule } from '../../../modules/test/test.module';

describe('PopupInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [TestModule]
  }));

  it('should be created', () => {
    const service: PopupInfoService = TestBed.get(PopupInfoService);
    expect(service).toBeTruthy();
  });
});
