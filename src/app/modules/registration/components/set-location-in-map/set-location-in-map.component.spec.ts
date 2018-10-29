import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetLocationInMapComponent } from './set-location-in-map.component';

describe('SetLocationInMapComponent', () => {
  let component: SetLocationInMapComponent;
  let fixture: ComponentFixture<SetLocationInMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetLocationInMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetLocationInMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
