import { TestBed, inject } from '@angular/core/testing';
import { DateHelperService } from './date-helper.service';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import * as moment from 'moment';
import 'moment-timezone';

describe('DateHelperService', () => {
  let service: DateHelperService;
  let translateService: TranslateService;

  beforeEach(() => {
    translateService = jasmine.createSpyObj('TranslateService', { getTranslation: (lang: string) => of({}) });
    TestBed.configureTestingModule({
      providers: [{ provide: TranslateService, useValue: translateService }, DateHelperService]
    });
  });

  beforeEach(inject([DateHelperService], (dateHelper: DateHelperService) => {
    service = dateHelper;
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('show basic date', async () => {
    const result = await service.formatDate(moment(new Date(2019, 0, 1)), false, true, false);
    expect(result).toEqual('01/01 2019');
  });

  it('different timezone should return timezone', async () => {
    const date = '2019-01-25T03:06:38-04:00';
    const result = await service.formatDateString(date, false, true, true);
    expect(result).toEqual('25/01 2019 03:06 (-04:00)');
  });
});
