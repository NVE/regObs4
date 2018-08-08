import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyObservationsPage } from './my-observations.page';

describe('MyObservationsPage', () => {
  let component: MyObservationsPage;
  let fixture: ComponentFixture<MyObservationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyObservationsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyObservationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
