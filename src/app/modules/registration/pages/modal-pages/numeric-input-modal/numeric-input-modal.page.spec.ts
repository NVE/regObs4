import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericInputModalPage } from './numeric-input-modal.page';

describe('NumericInputModalPage', () => {
  let component: NumericInputModalPage;
  let fixture: ComponentFixture<NumericInputModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumericInputModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumericInputModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
