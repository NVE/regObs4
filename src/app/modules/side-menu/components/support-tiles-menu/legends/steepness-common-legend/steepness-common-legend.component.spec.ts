import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SteepnessCommonLegendComponent } from './steepness-common-legend.component';
import { TestModule } from '../../../../../test/test.module';

describe('SteepnessCommonLegendComponent', () => {
  let component: SteepnessCommonLegendComponent;
  let fixture: ComponentFixture<SteepnessCommonLegendComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [TestModule],
        declarations: [SteepnessCommonLegendComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SteepnessCommonLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
