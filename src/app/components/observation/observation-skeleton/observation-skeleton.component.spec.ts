import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationSkeletonComponent } from './observation-skeleton.component';

describe('ObservationSkeletonComponent', () => {
  let component: ObservationSkeletonComponent;
  let fixture: ComponentFixture<ObservationSkeletonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationSkeletonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
