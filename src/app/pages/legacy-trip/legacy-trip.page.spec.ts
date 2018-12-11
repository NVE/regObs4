import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegacyTripPage } from './legacy-trip.page';

describe('LegacyTripPage', () => {
  let component: LegacyTripPage;
  let fixture: ComponentFixture<LegacyTripPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LegacyTripPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegacyTripPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
