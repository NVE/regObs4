import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';

import { CheckDaysOrWeeksBackComponent } from './check-days-or-weeks-back.component';

describe('CheckDaysOrWeeksBackComponent', () => {
  let component: CheckDaysOrWeeksBackComponent;
  let fixture: ComponentFixture<CheckDaysOrWeeksBackComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [provideTranslateService()],
      imports: [CheckDaysOrWeeksBackComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckDaysOrWeeksBackComponent);
    fixture.componentRef.setInput('daysBack', 2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
