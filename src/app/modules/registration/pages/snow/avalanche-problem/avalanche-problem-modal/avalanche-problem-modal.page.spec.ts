import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvalancheProblemModalPage } from './avalanche-problem-modal.page';

describe('AvalancheProblemModalPage', () => {
  let component: AvalancheProblemModalPage;
  let fixture: ComponentFixture<AvalancheProblemModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvalancheProblemModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvalancheProblemModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
