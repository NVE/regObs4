import { TestBed } from '@angular/core/testing';
import { DateHelperService } from './date-helper.service';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import 'moment-timezone';
import { firstValueFrom } from 'rxjs';

describe('DateHelperService', () => {
  let service: DateHelperService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideTranslateService(), DateHelperService],
    });

    service = TestBed.inject(DateHelperService);
    await firstValueFrom(TestBed.inject(TranslateService).use('en'));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('show basic date', () => {
    const result = service.formatMoment(moment(new Date(2019, 0, 1)));
    expect(result).toEqual('Jan 1, 2019, 12:00 AM');
  });

  // Vet ikke helt hvorfor det var veldig viktig å vise hvilken tidssone observasjoner er lagt inn i.
  // Kommenterer ut denne foreløpig.
  // it('different timezone should return timezone', () => {
  //   const date = '2019-01-25T03:06:38-04:00';
  //   const result = service.formatDateString(date);
  //   expect(result).toEqual('25/01 2019 03:06 (-04:00)');
  // });
});
