import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SteepnessLegendComponent } from './steepness-legend.component';
import { SteepnessCommonLegendComponent } from '../steepness-common-legend/steepness-common-legend.component';

import { TestModule } from '../../../../../test/test.module';

describe('SteepnessLegendComponent', () => {
  let component: SteepnessLegendComponent;
  let fixture: ComponentFixture<SteepnessLegendComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [SteepnessCommonLegendComponent, SteepnessLegendComponent],
    }).compileComponents();
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
