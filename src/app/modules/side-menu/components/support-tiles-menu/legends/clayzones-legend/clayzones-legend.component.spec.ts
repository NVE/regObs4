import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClayzonesLegendComponent } from './clayzones-legend.component';

describe('ClayzonesLegendComponent', () => {
  let component: ClayzonesLegendComponent;
  let fixture: ComponentFixture<ClayzonesLegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClayzonesLegendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClayzonesLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
