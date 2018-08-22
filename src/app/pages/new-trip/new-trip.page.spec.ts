import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTripPage } from './new-trip.page';

describe('NewTripPage', () => {
  let component: NewTripPage;
  let fixture: ComponentFixture<NewTripPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTripPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTripPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
