import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateObservationsComponent } from './update-observations.component';

describe('UpdateObservationsComponent', () => {
  let component: UpdateObservationsComponent;
  let fixture: ComponentFixture<UpdateObservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateObservationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateObservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
