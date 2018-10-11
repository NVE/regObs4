import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationsDaysBackComponent } from './observations-days-back.component';

describe('ObservationsDaysBackComponent', () => {
  let component: ObservationsDaysBackComponent;
  let fixture: ComponentFixture<ObservationsDaysBackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationsDaysBackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationsDaysBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
