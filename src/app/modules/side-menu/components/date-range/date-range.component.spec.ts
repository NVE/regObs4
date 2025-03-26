import { TestBed } from '@angular/core/testing';
import { DateRangeComponent } from './date-range.component';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTestLogger } from 'src/app/modules/shared/services/logging/test-logging.service';
import { ActivatedRoute } from '@angular/router';

describe('DateRangeComponent', () => {
  let component: DateRangeComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideTranslateService(), provideTestLogger(), { provide: ActivatedRoute, useValue: undefined }],
    });
    const fixture = TestBed.createComponent(DateRangeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
