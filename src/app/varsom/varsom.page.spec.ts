import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VarsomPage } from './varsom.page';

describe('VarsomPage', () => {
  let component: VarsomPage;
  let fixture: ComponentFixture<VarsomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VarsomPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VarsomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
