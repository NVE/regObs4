import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPage } from './group.page';

describe('GroupPage', () => {
  let component: GroupPage;
  let fixture: ComponentFixture<GroupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
