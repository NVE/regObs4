import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationListPage } from './observation-list.page';

describe('ObservationListPage', () => {
  let component: ObservationListPage;
  let fixture: ComponentFixture<ObservationListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
