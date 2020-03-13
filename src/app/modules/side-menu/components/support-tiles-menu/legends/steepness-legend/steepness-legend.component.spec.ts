import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SteepnessLegendComponent } from './steepness-legend.component';

describe('SteepnessLegendComponent', () => {
  let component: SteepnessLegendComponent;
  let fixture: ComponentFixture<SteepnessLegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SteepnessLegendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SteepnessLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
