import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripPage } from './trip.page';

describe('TripPage', () => {
  let component: TripPage;
  let fixture: ComponentFixture<TripPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
