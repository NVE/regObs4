import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningListHeaderComponent } from './warning-list-header.component';

describe('WarningListHeaderComponent', () => {
  let component: WarningListHeaderComponent;
  let fixture: ComponentFixture<WarningListHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarningListHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
