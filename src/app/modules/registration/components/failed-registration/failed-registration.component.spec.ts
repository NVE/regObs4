import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedRegistrationComponent } from './failed-registration.component';

describe('FailedRegistrationComponent', () => {
  let component: FailedRegistrationComponent;
  let fixture: ComponentFixture<FailedRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FailedRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FailedRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
