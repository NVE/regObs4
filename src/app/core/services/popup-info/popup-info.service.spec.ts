import { TestBed } from '@angular/core/testing';

import { PopupInfoService } from './popup-info.service';
import { TestModule } from '../../../modules/test/test.module';
import moment from 'moment';

describe('PopupInfoService', () => {
  let service: PopupInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
    });
    service = TestBed.inject(PopupInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('checkLastTimestamp should return true when null', () => {
    const result = service.checkLastTimestamp(0, null, true);
    expect(result).toBeTrue();
  });

  it('checkLastTimestamp should return true when undefined', () => {
    const result = service.checkLastTimestamp(0, undefined, true);
    expect(result).toBeTrue();
  });

  it('checkLastTimestamp should return true when limit is 0', () => {
    const result = service.checkLastTimestamp(0, moment().unix(), true);
    expect(result).toBeTrue();
  });

  it('checkLastTimestamp should return false when limit is 1000ms', () => {
    const result = service.checkLastTimestamp(1000, moment().unix(), true);
    expect(result).toBeFalse();
  });
});
