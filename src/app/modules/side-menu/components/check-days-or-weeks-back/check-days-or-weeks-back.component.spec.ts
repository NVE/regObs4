import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { CheckDaysOrWeeksBackComponent } from './check-days-or-weeks-back.component';

describe('CheckDaysOrWeeksBackComponent', () => {
  let component: CheckDaysOrWeeksBackComponent;
  let fixture: ComponentFixture<CheckDaysOrWeeksBackComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), CheckDaysOrWeeksBackComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckDaysOrWeeksBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
