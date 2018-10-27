import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DamagePage } from './damage.page';

describe('DamagePage', () => {
  let component: DamagePage;
  let fixture: ComponentFixture<DamagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DamagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DamagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
