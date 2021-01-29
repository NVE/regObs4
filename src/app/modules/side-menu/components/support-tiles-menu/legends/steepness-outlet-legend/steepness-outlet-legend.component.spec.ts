import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SteepnessOutletLegendComponent } from './steepness-outlet-legend.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { SteepnessCommonLegendComponent } from '../steepness-common-legend/steepness-common-legend.component';
import { TranslateModule } from '@ngx-translate/core';

describe('SteepnessOutletLegendComponent', () => {
  let component: SteepnessOutletLegendComponent;
  let fixture: ComponentFixture<SteepnessOutletLegendComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [SharedModule, TranslateModule.forRoot()],
        declarations: [
          SteepnessCommonLegendComponent,
          SteepnessOutletLegendComponent
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SteepnessOutletLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
