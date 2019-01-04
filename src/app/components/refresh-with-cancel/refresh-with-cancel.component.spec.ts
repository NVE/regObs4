import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshWithCancelComponent } from './refresh-with-cancel.component';

describe('RefreshWithCancelComponent', () => {
  let component: RefreshWithCancelComponent;
  let fixture: ComponentFixture<RefreshWithCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefreshWithCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefreshWithCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
