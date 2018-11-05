import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetAvalanchePositionPage } from './set-avalanche-position.page';

describe('SetAvalanchePositionPage', () => {
  let component: SetAvalanchePositionPage;
  let fixture: ComponentFixture<SetAvalanchePositionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetAvalanchePositionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetAvalanchePositionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
