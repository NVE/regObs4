import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SteepnessCommonLegendComponent } from './steepness-common-legend.component';

describe('SteepnessCommonLegendComponent', () => {
  let component: SteepnessCommonLegendComponent;
  let fixture: ComponentFixture<SteepnessCommonLegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SteepnessCommonLegendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SteepnessCommonLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
