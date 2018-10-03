import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapListGroupComponent } from './cap-list-group.component';

describe('CapListGroupComponent', () => {
  let component: CapListGroupComponent;
  let fixture: ComponentFixture<CapListGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapListGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapListGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
