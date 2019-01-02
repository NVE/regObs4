import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningListItemComponent } from './warning-list-item.component';

describe('WarningListItemComponent', () => {
  let component: WarningListItemComponent;
  let fixture: ComponentFixture<WarningListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarningListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
