import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SteepnessOutletLegendComponent } from './steepness-outlet-legend.component';

describe('SteepnessOutletLegendComponent', () => {
  let component: SteepnessOutletLegendComponent;
  let fixture: ComponentFixture<SteepnessOutletLegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SteepnessOutletLegendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SteepnessOutletLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
