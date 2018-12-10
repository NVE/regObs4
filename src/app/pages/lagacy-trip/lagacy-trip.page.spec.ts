import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LagacyTripPage } from './lagacy-trip.page';

describe('LagacyTripPage', () => {
  let component: LagacyTripPage;
  let fixture: ComponentFixture<LagacyTripPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LagacyTripPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LagacyTripPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
