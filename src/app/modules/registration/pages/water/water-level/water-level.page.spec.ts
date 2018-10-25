import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterLevelPage } from './water-level.page';

describe('WaterLevelPage', () => {
  let component: WaterLevelPage;
  let fixture: ComponentFixture<WaterLevelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterLevelPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterLevelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
