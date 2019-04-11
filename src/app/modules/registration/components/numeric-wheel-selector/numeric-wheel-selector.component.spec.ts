import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericWheelSelectorComponent } from './numeric-wheel-selector.component';

describe('NumericWheelSelectorComponent', () => {
  let component: NumericWheelSelectorComponent;
  let fixture: ComponentFixture<NumericWheelSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumericWheelSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumericWheelSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
