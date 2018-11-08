import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvalancheProblemPage } from './avalanche-problem.page';

describe('AvalancheProblemPage', () => {
  let component: AvalancheProblemPage;
  let fixture: ComponentFixture<AvalancheProblemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvalancheProblemPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvalancheProblemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
