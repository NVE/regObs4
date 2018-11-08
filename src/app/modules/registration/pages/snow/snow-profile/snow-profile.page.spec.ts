import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnowProfilePage } from './snow-profile.page';

describe('SnowProfilePage', () => {
  let component: SnowProfilePage;
  let fixture: ComponentFixture<SnowProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnowProfilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnowProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
