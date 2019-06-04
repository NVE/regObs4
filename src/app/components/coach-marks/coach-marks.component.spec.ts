import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachMarksComponent } from './coach-marks.component';

describe('CoachMarksComponent', () => {
  let component: CoachMarksComponent;
  let fixture: ComponentFixture<CoachMarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachMarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
