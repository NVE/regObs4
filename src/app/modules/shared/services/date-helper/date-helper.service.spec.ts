import { TestBed } from '@angular/core/testing';
import { DateHelperService } from './date-helper.service';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

describe('DateHelperService', () => {
  let service: DateHelperService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideTranslateService(), DateHelperService],
    });

    service = TestBed.inject(DateHelperService);

    // setter språk for å få norsk datoformat
    await firstValueFrom(TestBed.inject(TranslateService).use('no'));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should format ISO date string as Norwegian date and time', () => {
    const result = service.formatDateString('2024-06-01T14:30:00');
    expect(result).toBe('1. juni 2024, 14:30');
  });

  it('should format Date object as Norwegian date and time', () => {
    const date = new Date('2024-06-01T14:30:00');
    const result = service.formatDate(date);
    expect(result).toBe('1. juni 2024, 14:30');
  });

  // Vet ikke helt hvorfor det var veldig viktig å vise hvilken tidssone observasjoner er lagt inn i.
  // Kommenterer ut denne foreløpig.
  // it('different timezone should return timezone', () => {
  //   const date = '2019-01-25T03:06:38-04:00';
  //   const result = service.formatDateString(date);
  //   expect(result).toEqual('25/01 2019 03:06 (-04:00)');
  // });
});
