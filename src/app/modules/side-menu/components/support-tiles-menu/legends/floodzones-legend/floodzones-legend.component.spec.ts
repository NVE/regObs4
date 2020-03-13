import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloodzonesLegendComponent } from './floodzones-legend.component';

describe('FloodzonesLegendComponent', () => {
  let component: FloodzonesLegendComponent;
  let fixture: ComponentFixture<FloodzonesLegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloodzonesLegendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloodzonesLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
